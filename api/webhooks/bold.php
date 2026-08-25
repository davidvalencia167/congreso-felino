<?php
declare(strict_types=1);

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

function supabaseRequest(string $method, string $url, string $serviceKey, ?array $body = null): array
{
    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => [
            'apikey: ' . $serviceKey,
            'Authorization: Bearer ' . $serviceKey,
            'Content-Type: application/json',
            'Accept: application/json',
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
    ]);
    if ($body !== null) {
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($body, JSON_THROW_ON_ERROR));
    }

    $response = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $error = curl_error($curl);
    curl_close($curl);
    if ($response === false || $error !== '' || $status < 200 || $status >= 300) {
        error_log('Supabase request failed: ' . ($error ?: $response));
        respond('Database error', 500);
    }
    return $response === '' ? [] : (json_decode($response, true, 512, JSON_THROW_ON_ERROR) ?: []);
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

$supabaseUrl = rtrim(requireEnv('SUPABASE_URL'), '/');
$serviceKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
$rows = supabaseRequest(
    'GET',
    $supabaseUrl . '/rest/v1/registrations?reference=eq.' . rawurlencode($reference) . '&select=*',
    $serviceKey,
);
$registration = $rows[0] ?? null;
if (!is_array($registration)) {
    respond('Registration not found', 404);
}
if (($registration['payment_status'] ?? '') === 'paid') {
    respond('Already paid', 200);
}

$newStatus = str_contains($eventType, 'APPROVED') ? 'paid' :
    (str_contains($eventType, 'REJECT') || str_contains($eventType, 'VOID') || str_contains($eventType, 'FAIL') ? 'failed' : 'pending');

supabaseRequest(
    'PATCH',
    $supabaseUrl . '/rest/v1/registrations?id=eq.' . rawurlencode((string) $registration['id']),
    $serviceKey,
    [
        'payment_status' => $newStatus,
        'provider_transaction_id' => is_string($paymentId) ? $paymentId : null,
    ],
);

if ($newStatus === 'paid' && filter_var($registration['email'] ?? '', FILTER_VALIDATE_EMAIL)) {
    $subject = 'Confirmacion de pago - IVEC 2026 (' . $reference . ')';
    $message = 'Hola ' . ($registration['full_name'] ?? '') . ", tu pago para el plan " .
        ($registration['plan'] ?? '') . ' fue confirmado via Bold. Referencia: ' . $reference . '.';
    $headers = "Content-Type: text/plain; charset=UTF-8\r\n" .
        'From: ' . (getenv('MAIL_FROM') ?: 'no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
    @mail($registration['email'], $subject, $message, $headers);
}

respond('ok', 200);
