-- Unified application database for all microservices
CREATE DATABASE IF NOT EXISTS appdb;
USE appdb;

-- Security tokens (security-ms)
CREATE TABLE IF NOT EXISTS security_tokens (
  token_id CHAR(36) PRIMARY KEY,
  token_value CHAR(8) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMP NOT NULL,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_token_value (token_value),
  INDEX idx_expires_at (expires_at),
  INDEX idx_is_active (is_active),
  INDEX idx_created_at (created_at)
);

-- Customers (clients-ms)
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);

-- Email logs (emails-ms)
CREATE TABLE IF NOT EXISTS email_logs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  recipient_email VARCHAR(255) NOT NULL,
  email_subject VARCHAR(255) NOT NULL,
  email_body TEXT,
  client_id INT,
  status ENUM('received','sent','failed') DEFAULT 'received',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sent_at TIMESTAMP NULL,
  INDEX idx_recipient (recipient_email),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_client_id (client_id)
);

-- Parameters (clients-ms)
CREATE TABLE IF NOT EXISTS params (
  `key` VARCHAR(100) PRIMARY KEY,
  `value` VARCHAR(255) NOT NULL
);

-- Insert default parameters
INSERT INTO params (`key`, `value`) VALUES ('send_welcome_email', 'true')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);
