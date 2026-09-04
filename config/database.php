<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;

    if (!extension_loaded('pdo_sqlite')) {
        throw new RuntimeException('L’extension PHP PDO_SQLITE est requise.');
    }
    if (!is_dir(dirname(DB_PATH))) mkdir(dirname(DB_PATH), 0755, true);

    $pdo = new PDO('sqlite:' . DB_PATH);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->exec('PRAGMA foreign_keys = ON');
    return $pdo;
}

function installed(): bool
{
    if (!file_exists(DB_PATH)) return false;
    try {
        return (bool) db()->query("SELECT name FROM sqlite_master WHERE type='table' AND name='settings'")->fetchColumn();
    } catch (Throwable) { return false; }
}
