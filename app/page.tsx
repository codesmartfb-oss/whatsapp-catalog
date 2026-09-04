import Link from "next/link";

const features = [
  ["📱", "Catalogue mobile", "Une boutique pensée d'abord pour les clients sur téléphone."],
  ["💬", "Commandes WhatsApp", "Chaque produit ouvre une conversation WhatsApp avec un message prérempli."],
  ["🔗", "Lien partageable", "Partagez votre catalogue sur WhatsApp, Instagram, Facebook ou votre bio."],
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-black tracking-tight">WhatsApp<span className="text-green-600">Catalog</span></div>
          <Link href="/dashboard" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">Ouvrir le dashboard</Link>
        </nav>
        <div className="grid gap-14 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-5 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">🇨🇮 Pensé pour les e-commerçants ivoiriens</div>
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">Votre catalogue.<br /><span className="text-green-600">Vos ventes sur WhatsApp.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Créez une boutique en ligne simple, professionnelle et partageable. Vos clients consultent vos produits et commandent directement sur WhatsApp.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="rounded-xl bg-green-600 px-6 py-4 font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-700">Créer mon catalogue →</Link>
              <Link href="/shop/demo" className="rounded-xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-900 hover:bg-slate-50">Voir une démo</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/60">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 font-black">MB</div><div><div className="font-bold">Ma Boutique</div><div className="text-xs text-slate-400">Abidjan, Côte d'Ivoire</div></div></div>
              <div className="mt-5 rounded-xl bg-slate-900 p-3 text-sm text-slate-400">🔎 Rechercher un produit...</div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {["Sneakers Air", "Robe élégante", "Sac premium", "Montre Classic"].map((p, i) => <div key={p} className="overflow-hidden rounded-xl bg-white text-slate-900"><div className="flex h-28 items-center justify-center bg-slate-100 text-4xl">{["👟", "👗", "👜", "⌚"][i]}</div><div className="p-3"><div className="font-bold">{p}</div><div className="mt-1 text-sm font-black text-green-600">{[35000,15000,25000,45000][i].toLocaleString("fr-FR")} FCFA</div></div></div>)}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">{features.map(([icon,title,text]) => <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6"><div className="text-2xl">{icon}</div><h2 className="mt-4 font-black">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>)}</div>
      </section>
    </main>
  );
}
