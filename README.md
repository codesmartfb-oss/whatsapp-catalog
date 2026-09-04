# WhatsApp Catalog

Catalogue e-commerce installable individuellement chez chaque commerçant.

## Stack
- PHP 8.2+
- PDO + SQLite
- HTML/CSS
- TypeScript pour les interactions navigateur, compilé en JavaScript pour la production
- Apache/LAMP
- Architecture MVC légère et sans framework obligatoire

## Fonctionnalités V1
- Installation en une étape
- Compte administrateur sécurisé
- Catalogue public mobile-first
- Produits, catégories, prix FCFA, stock et images
- Recherche
- Fiche produit
- Bouton WhatsApp avec message prérempli
- Dashboard avec vues et événements
- Paramètres boutique
- Protection CSRF et mots de passe via l'API native PHP

## Installation
1. Uploader le projet sur un hébergement PHP/Apache.
2. Vérifier `pdo_sqlite` et les droits d'écriture sur `data/` et `uploads/products/`.
3. Ouvrir `/install.php`.
4. Créer la boutique, le numéro WhatsApp et le compte administrateur.
5. Se connecter via `/login.php`.

Chaque installation possède son propre fichier `data/catalog.sqlite` : aucune donnée client n'est partagée avec une autre installation.

## TypeScript
Le fichier source est `src/app.ts`. Le fichier `public/js/app.js` est la version distribuée au navigateur. Node.js n'est pas requis en production.

## Sécurité
Les données SQLite sont protégées par `.htaccess`, les uploads refusent l'exécution de scripts et les mots de passe utilisent `password_hash()`/`password_verify()`.
