<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . (getenv('CORS_ORIGIN') ?: '*'));
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, OPTIONS');
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

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$reference = trim((string) ($_GET['reference'] ?? ''));
if (!preg_match('/^IVEC-[A-Z0-9]+-[A-F0-9]{6}$/', $reference)) {
    jsonResponse(['error' => 'Invalid reference'], 400);
}

try {
    $database = mysqlConnection();
    $statement = $database->prepare(
        'SELECT payment_status, provider_transaction_id FROM registrations WHERE reference = :reference LIMIT 1',
    );
    $statement->execute(['reference' => $reference]);
    $registration = $statement->fetch();
} catch (Throwable $error) {
    error_log('MySQL status select failed: ' . $error->getMessage());
    jsonResponse(['error' => 'DB error'], 500);
}

if ($registration === false) {
    jsonResponse(['error' => 'Registration not found'], 404);
}

jsonResponse([
    'reference' => $reference,
    'status' => $registration['payment_status'],
    'transactionId' => $registration['provider_transaction_id'],
]);