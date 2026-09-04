import type { Metadata } from "next";

const products = [
  { name: "Sneakers Air", price: 35000, emoji: "👟", description: "Sneakers tendance et confortables." },
  { name: "Robe élégante", price: 15000, emoji: "👗", description: "Une robe parfaite pour vos sorties." },
  { name: "Sac premium", price: 25000, emoji: "👜", description: "Sac chic pour tous les jours." },
  { name: "Montre Classic", price: 45000, emoji: "⌚", description: "Design classique et élégant." },
];

export const metadata: Metadata = { title: "Ma Boutique — Catalogue WhatsApp" };

function whatsappUrl(product: typeof products[number]) {
  const text = `Bonjour, je suis intéressé(e) par ${product.name} à ${product.price.toLocaleString("fr-FR")} FCFA. Est-il disponible ?`;
  return `https://wa.me/2250700000000?text=${encodeURIComponent(text)}`;
}

export default async function Shop({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <main className="min-h-screen bg-slate-50"><div className="mx-auto max-w-5xl px-4 py-8 sm:px-6"><header className="rounded-3xl bg-slate-950 p-7 text-white"><div className="flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-xl font-black">MB</div><div><h1 className="text-2xl font-black">Ma Boutique</h1><p className="text-sm text-slate-400">📍 Abidjan · Catalogue WhatsApp</p></div></div><p className="mt-6 max-w-xl text-slate-300">Découvrez nos produits et commandez facilement directement sur WhatsApp.</p></header><div className="mt-6"><div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-400">🔎 Rechercher un produit...</div></div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map(product => <article key={product.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex h-44 items-center justify-center bg-slate-100 text-7xl">{product.emoji}</div><div className="p-4"><h2 className="font-black">{product.name}</h2><p className="mt-1 min-h-10 text-sm text-slate-500">{product.description}</p><p className="mt-3 text-lg font-black text-green-600">{product.price.toLocaleString("fr-FR")} FCFA</p><a href={whatsappUrl(product)} target="_blank" rel="noreferrer" className="mt-4 block rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-green-700">Commander sur WhatsApp</a></div></article>)}</div><p className="py-10 text-center text-xs text-slate-400">Boutique « {slug} » · Propulsé par WhatsAppCatalog</p></div></main>;
}
