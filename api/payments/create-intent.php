<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . (getenv('CORS_ORIGIN') ?: '*'));
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function jsonResponse(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    exit;
}

function requireEnv(string $name): string
{
    $value = getenv($name);
    if ($value === false || trim($value) === '') {
        jsonResponse(['error' => 'Server not configured'], 500);
    }
    return trim($value);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);
$plans = ['Estudiante', 'Medico Veterinario', 'Muestra Comercial'];
$plan = is_array($input) ? ($input['plan'] ?? null) : null;
$fullName = is_array($input) ? trim((string) ($input['fullName'] ?? '')) : '';
$email = is_array($input) ? trim((string) ($input['email'] ?? '')) : '';
$amountUsd = is_array($input) ? ($input['amountUsd'] ?? null) : null;

if (!in_array($plan, $plans, true) || strlen($fullName) < 2 || strlen($fullName) > 120 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 160 ||
    !is_numeric($amountUsd) || (float) $amountUsd <= 0 || (float) $amountUsd > 1000) {
    jsonResponse(['error' => 'Invalid input'], 400);
}

$boldSecret = requireEnv('BOLD_SECRET_KEY');
$boldIdentityKey = requireEnv('BOLD_IDENTITY_KEY');
$usdToCop = (float) (getenv('USD_TO_COP') ?: '4000');
$reference = 'IVEC-' . strtoupper(base_convert((string) time(), 10, 36)) . '-' . strtoupper(bin2hex(random_bytes(3)));
$amountCop = (int) round((float) $amountUsd * $usdToCop);
$signature = hash('sha256', $reference . $amountCop . 'COP' . $boldSecret);

try {
    $database = mysqlConnection();
    $id = bin2hex(random_bytes(16));
    $statement = $database->prepare(
        'INSERT INTO registrations (id, plan, full_name, email, amount_usd, currency, payment_method, payment_status, reference) ' .
        'VALUES (:id, :plan, :full_name, :email, :amount_usd, :currency, :payment_method, :payment_status, :reference)',
    );
    $statement->execute([
        'id' => $id,
        'plan' => $plan,
        'full_name' => $fullName,
        'email' => $email,
        'amount_usd' => round((float) $amountUsd, 2),
        'currency' => 'USD',
        'payment_method' => 'bold',
        'payment_status' => 'pending',
        'reference' => $reference,
    ]);
} catch (Throwable $error) {
    error_log('MySQL insert failed: ' . $error->getMessage());
    jsonResponse(['error' => 'DB error'], 500);
}

jsonResponse([
    'id' => $id,
    'reference' => $reference,
    'bold' => [
        'amount' => $amountCop,
        'currency' => 'COP',
        'integritySignature' => $signature,
        'identityKey' => $boldIdentityKey,
    ],
]);
