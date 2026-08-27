CREATE TABLE registrations (
    id CHAR(36) NOT NULL PRIMARY KEY,
    plan VARCHAR(80) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL,
    amount_usd DECIMAL(10, 2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    payment_method VARCHAR(20) NOT NULL DEFAULT 'bold',
    payment_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    reference VARCHAR(80) NOT NULL UNIQUE,
    provider_transaction_id VARCHAR(160) NULL,
    notes TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX registrations_email_idx (email),
    INDEX registrations_status_idx (payment_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
