<?php
declare(strict_types=1);

function ensureSupportedPhp(): void
{
    if (PHP_VERSION_ID >= 80400) {
        return;
    }

    http_response_code(503);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Unsupported PHP version';
    exit;
}
