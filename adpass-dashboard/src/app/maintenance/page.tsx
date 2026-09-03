"use client";

import { Wrench } from "lucide-react";
import Link from "next/link";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#07080B] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mb-8 border border-rose-500/20 shadow-[0_0_50px_rgba(244,63,94,0.15)] animate-pulse">
        <Wrench className="w-12 h-12 text-rose-500" />
      </div>
      <h1 className="text-4xl font-bold mb-4 tracking-tight">Maintenance en cours</h1>
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        La plateforme affiliée est momentanément inaccessible pour optimisation. Nous serons de retour très vite.
      </p>

      <Link href="/auth" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
        ← Retourner à l&apos;accueil
      </Link>
    </div>
  );
}
