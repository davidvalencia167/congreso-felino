<?php
declare(strict_types=1);

function mysqlConnection(): PDO
{
    $host = getenv('MYSQL_HOST') ?: '';
    $database = getenv('MYSQL_DATABASE') ?: '';
    $user = getenv('MYSQL_USER') ?: '';
    $password = getenv('MYSQL_PASSWORD') ?: '';
    $port = getenv('MYSQL_PORT') ?: '3306';

    if ($host === '' || $database === '' || $user === '') {
        throw new RuntimeException('MySQL is not configured');
    }

    $dsn = 'mysql:host=' . $host . ';port=' . $port . ';dbname=' . $database . ';charset=utf8mb4';
    return new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
}
