<?php
declare(strict_types=1);
require_once __DIR__ . '/config/database.php';
if (installed()) redirect('/login.php');
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $shop = trim($_POST['shop_name'] ?? ''); $phone = trim($_POST['whatsapp'] ?? '');
        $email = trim($_POST['email'] ?? ''); $password = (string)($_POST['password'] ?? '');
        if ($shop === '' || $phone === '' || !filter_var($email,FILTER_VALIDATE_EMAIL) || strlen($password) < 8) throw new RuntimeException('Remplissez les champs correctement. Mot de passe : 8 caractères minimum.');
        if (!is_dir(dirname(DB_PATH))) mkdir(dirname(DB_PATH),0755,true); if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR,0755,true);
        $pdo = db();
        $pdo->exec("CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL DEFAULT ''); CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT UNIQUE NOT NULL,password_hash TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,slug TEXT UNIQUE NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT,category_id INTEGER NULL,name TEXT NOT NULL,slug TEXT UNIQUE NOT NULL,description TEXT NOT NULL DEFAULT '',price REAL NOT NULL DEFAULT 0,stock INTEGER NOT NULL DEFAULT 0,image TEXT NULL,is_active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL); CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT,type TEXT NOT NULL,product_id INTEGER NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);");
        $stmt=$pdo->prepare('INSERT INTO users(email,password_hash) VALUES(?,?)'); $stmt->execute([$email,password_hash($password,PASSWORD_DEFAULT)]);
        foreach(['shop_name'=>$shop,'whatsapp_number'=>preg_replace('/\D+/','',$phone),'installed'=>'1','tagline'=>'Votre catalogue en ligne','currency'=>'FCFA'] as $k=>$v) save_setting($k,$v);
        redirect('/login.php');
    } catch (Throwable $e) { $error=$e->getMessage(); }
}
?><!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Installation · <?=e(APP_NAME)?></title><link rel="stylesheet" href="/public/css/app.css"></head><body><main class="auth"><section class="panel"><span class="badge">Installation</span><h1>Votre catalogue WhatsApp</h1><p class="muted">Une installation indépendante pour votre boutique.</p><?php if($error): ?><div class="alert"><?=e($error)?></div><?php endif; ?><form method="post"><label>Nom de la boutique<input name="shop_name" required></label><label>WhatsApp<input name="whatsapp" placeholder="2250700000000" required></label><label>Email administrateur<input type="email" name="email" required></label><label>Mot de passe<input type="password" name="password" minlength="8" required></label><button class="btn primary">Installer</button></form></section></main></body></html>