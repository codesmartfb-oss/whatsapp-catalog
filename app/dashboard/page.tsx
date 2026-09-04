"use client";

import { useState } from "react";
import Link from "next/link";

const initialProducts = [
  { id: 1, name: "Sneakers Air", price: 35000, category: "Chaussures", stock: 12 },
  { id: 2, name: "Robe élégante", price: 15000, category: "Mode", stock: 8 },
  { id: 3, name: "Sac premium", price: 25000, category: "Accessoires", stock: 5 },
];

export default function Dashboard() {
  const [products, setProducts] = useState(initialProducts);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function addProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !price) return;
    setProducts([...products, { id: Date.now(), name: name.trim(), price: Number(price), category: "Nouveau", stock: 1 }]);
    setName(""); setPrice(""); setOpen(false);
  }

  return <main className="min-h-screen bg-slate-50">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><Link href="/" className="text-xl font-black">WhatsApp<span className="text-green-600">Catalog</span></Link><Link href="/shop/demo" className="text-sm font-bold text-slate-600 hover:text-slate-900">Voir ma boutique ↗</Link></div></header>
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-bold text-green-600">TABLEAU DE BORD</p><h1 className="mt-2 text-3xl font-black">Bonjour 👋</h1><p className="mt-2 text-slate-500">Gérez votre catalogue et transformez vos visiteurs en clients.</p></div><button onClick={() => setOpen(true)} className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700">+ Ajouter un produit</button></div>
      <div className="mt-8 grid gap-4 md:grid-cols-3"><Stat label="Produits" value={products.length.toString()} /><Stat label="Vues du catalogue" value="1 284" /><Stat label="Clics WhatsApp" value="97" /></div>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-center"><div><h2 className="font-black">Ma boutique</h2><p className="mt-1 text-sm text-slate-500">whatsappcatalog.app/shop/demo</p></div><div className="flex gap-2"><button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold">Copier le lien</button><button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white">Partager WhatsApp</button></div></div></div>
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="flex items-center justify-between border-b border-slate-100 p-6"><h2 className="font-black">Produits</h2><span className="text-sm text-slate-500">{products.length} produits</span></div><div className="divide-y divide-slate-100">{products.map(p => <div key={p.id} className="flex items-center justify-between gap-4 p-5"><div className="flex min-w-0 items-center gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">📦</div><div><div className="font-bold">{p.name}</div><div className="text-sm text-slate-500">{p.category} · {p.stock} en stock</div></div></div><div className="font-black">{p.price.toLocaleString("fr-FR")} FCFA</div></div>)}</div></div>
    </div>
    {open && <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-950/40 p-6"><form onSubmit={addProduct} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-xl font-black">Ajouter un produit</h2><button type="button" onClick={() => setOpen(false)} className="text-slate-400">✕</button></div><label className="mt-6 block text-sm font-bold">Nom<input value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-green-500" placeholder="Ex. Nike Air Max" /></label><label className="mt-4 block text-sm font-bold">Prix (FCFA)<input type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-green-500" placeholder="35000" /></label><button className="mt-6 w-full rounded-xl bg-green-600 p-3 font-bold text-white hover:bg-green-700">Ajouter</button></form></div>}
  </main>;
}

function Stat({label, value}: {label: string; value: string}) { return <div className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>; }
