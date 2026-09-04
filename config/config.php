<?php
declare(strict_types=1);

const APP_NAME = 'WhatsApp Catalog';
const DB_PATH = __DIR__ . '/../data/catalog.sqlite';
const UPLOAD_DIR = __DIR__ . '/../uploads/products/';
const UPLOAD_URL = 'uploads/products/';

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_set_cookie_params([
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    ]);
    session_start();
}
