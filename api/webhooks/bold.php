<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

header('Content-Type: text/plain; charset=utf-8');

function respond(string $message, int $status): never
{
    http_response_code($status);
    echo $message;
    exit;
}

function requireEnv(string $name): string
{
    $value = getenv($name);
    if ($value === false || trim($value) === '') {
        error_log($name . ' not configured');
        respond('Server not configured', 500);
    }
    return trim($value);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond('Method not allowed', 405);
}

$secret = requireEnv('BOLD_SECRET_KEY');
$rawBody = file_get_contents('php://input');
$providedSignature = trim($_SERVER['HTTP_X_BOLD_SIGNATURE'] ?? '');
$expectedSignature = hash('sha256', $rawBody . $secret);
if ($providedSignature === '' || !hash_equals($expectedSignature, $providedSignature)) {
    respond('Invalid signature', 401);
}

try {
    $payload = json_decode($rawBody, true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond('Invalid JSON', 400);
}

$eventType = strtoupper((string) ($payload['type'] ?? ''));
$data = $payload['data'] ?? [];
$metadata = is_array($data) && is_array($data['metadata'] ?? null) ? $data['metadata'] : [];
$reference = $metadata['reference'] ?? null;
$paymentId = is_array($data) ? ($data['payment_id'] ?? null) : null;
if (!is_string($reference) || $reference === '') {
    respond('Missing reference', 400);
}

try {
    $database = mysqlConnection();
    $statement = $database->prepare('SELECT * FROM registrations WHERE reference = :reference LIMIT 1');
    $statement->execute(['reference' => $reference]);
    $registration = $statement->fetch();
} catch (Throwable $error) {
    error_log('MySQL select failed: ' . $error->getMessage());
    respond('Database error', 500);
}
if ($registration === false) {
    respond('Registration not found', 404);
}
if (($registration['payment_status'] ?? '') === 'paid') {
    respond('Already paid', 200);
}

$newStatus = str_contains($eventType, 'APPROVED') ? 'paid' :
    (str_contains($eventType, 'REJECT') || str_contains($eventType, 'VOID') || str_contains($eventType, 'FAIL') ? 'failed' : 'pending');

try {
    $statement = $database->prepare(
        'UPDATE registrations SET payment_status = :payment_status, provider_transaction_id = :transaction_id ' .
        'WHERE id = :id',
    );
    $statement->execute([
        'payment_status' => $newStatus,
        'transaction_id' => is_string($paymentId) ? $paymentId : null,
        'id' => $registration['id'],
    ]);
} catch (Throwable $error) {
    error_log('MySQL update failed: ' . $error->getMessage());
    respond('Database error', 500);
}

if ($newStatus === 'paid' && filter_var($registration['email'] ?? '', FILTER_VALIDATE_EMAIL)) {
    $subject = 'Confirmacion de pago - IVEC 2026 (' . $reference . ')';
    $message = 'Hola ' . ($registration['full_name'] ?? '') . ", tu pago para el plan " .
        ($registration['plan'] ?? '') . ' fue confirmado via Bold. Referencia: ' . $reference . '.';
    $headers = "Content-Type: text/plain; charset=UTF-8\r\n" .
        'From: ' . (getenv('MAIL_FROM') ?: 'no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
    @mail($registration['email'], $subject, $message, $headers);
}

respond('ok', 200);
