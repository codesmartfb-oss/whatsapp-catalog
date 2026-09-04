<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/database.php';

function e(?string $value): string { return htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8'); }
function redirect(string $url): never { header('Location: ' . $url); exit; }
function csrf(): string { return $_SESSION['csrf'] ??= bin2hex(random_bytes(32)); }
function verify_csrf(): void { if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['_csrf'] ?? '')) { http_response_code(419); exit('Requête invalide.'); } }
function setting(string $key, string $default = ''): string {
    $stmt = db()->prepare('SELECT value FROM settings WHERE key = ?'); $stmt->execute([$key]);
    return (string)($stmt->fetchColumn() ?: $default);
}
function save_setting(string $key, string $value): void {
    db()->prepare('INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value')->execute([$key,$value]);
}
function money(float|int $price): string { return number_format((float)$price, 0, ',', ' ') . ' FCFA'; }
function slugify(string $text): string {
    $text = iconv('UTF-8','ASCII//TRANSLIT//IGNORE',$text) ?: $text;
    $text = strtolower(trim(preg_replace('/[^a-z0-9]+/','-', $text), '-'));
    return $text ?: 'produit';
}
function whatsapp_link(string $number, string $product, float $price, int $quantity = 1): string {
    $number = preg_replace('/\D+/', '', $number);
    $message = "Bonjour, je suis intéressé(e) par {$product} à " . money($price) . ". Quantité : {$quantity}. Est-il disponible ?";
    return 'https://wa.me/' . $number . '?text=' . rawurlencode($message);
}
function require_auth(): void { if (empty($_SESSION['user_id'])) redirect('/login.php'); }
