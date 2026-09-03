import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07080B] flex flex-col items-center justify-center p-6 text-center">
      <div className="inline-block bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-muted-foreground mb-6">
        Erreur 404
      </div>
      <h1 className="text-5xl font-bold mb-4 tracking-tight">Page introuvable</h1>
      <p className="text-muted-foreground max-w-sm mb-10">
        Le lien que vous avez suivi est peut-être rompu, ou la page a été supprimée.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center">
        <Link
          href="/"
          className="bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/dashboard"
          className="bg-white/5 border border-white/10 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 active:scale-95 transition-all"
        >
          Aller au Dashboard
        </Link>
      </div>
    </div>
  );
}
