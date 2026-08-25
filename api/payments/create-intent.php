<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . (getenv('CORS_ORIGIN') ?: '*'));
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

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

function supabaseRequest(string $method, string $url, string $serviceKey, ?array $body = null): array
{
    $curl = curl_init($url);
    $headers = [
        'apikey: ' . $serviceKey,
        'Authorization: Bearer ' . $serviceKey,
        'Content-Type: application/json',
        'Accept: application/json',
        'Prefer: return=representation',
    ];
    curl_setopt_array($curl, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => $headers,
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
        jsonResponse(['error' => 'DB error'], 500);
    }
    return $response === '' ? [] : (json_decode($response, true, 512, JSON_THROW_ON_ERROR) ?: []);
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

$supabaseUrl = rtrim(requireEnv('SUPABASE_URL'), '/');
$serviceKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
$boldSecret = requireEnv('BOLD_SECRET_KEY');
$boldIdentityKey = requireEnv('BOLD_IDENTITY_KEY');
$usdToCop = (float) (getenv('USD_TO_COP') ?: '4000');
$reference = 'IVEC-' . strtoupper(base_convert((string) time(), 10, 36)) . '-' . strtoupper(bin2hex(random_bytes(3)));
$amountCop = (int) round((float) $amountUsd * $usdToCop);
$signature = hash('sha256', $reference . $amountCop . 'COP' . $boldSecret);

$rows = supabaseRequest('POST', $supabaseUrl . '/rest/v1/registrations?select=id,reference', $serviceKey, [
    'plan' => $plan,
    'full_name' => $fullName,
    'email' => $email,
    'amount_usd' => round((float) $amountUsd, 2),
    'currency' => 'USD',
    'payment_method' => 'bold',
    'payment_status' => 'pending',
    'reference' => $reference,
]);

$row = $rows[0] ?? null;
if (!is_array($row)) {
    jsonResponse(['error' => 'DB error'], 500);
}

jsonResponse([
    'id' => $row['id'] ?? null,
    'reference' => $row['reference'] ?? $reference,
    'bold' => [
        'amount' => $amountCop,
        'currency' => 'COP',
        'integritySignature' => $signature,
        'identityKey' => $boldIdentityKey,
    ],
]);
