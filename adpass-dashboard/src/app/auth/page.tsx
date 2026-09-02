"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="relative min-h-screen bg-[#07080B] flex items-center justify-center overflow-hidden">
      {/* Background with Grid and Radial Halo */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-[#07080B]/80 to-[#07080B] animate-pulse duration-[4000ms]" />

      <div className="relative z-10 w-full max-w-md px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour à l&apos;accueil
          </Link>
        </div>

        <div className="backdrop-blur-xl bg-zinc-950/70 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">

          <div className="p-8">
            <div className="flex justify-center mb-8">
              <div className="bg-primary p-3 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                <Flame className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-8">
              {mode === "login" ? "Bon retour parmi nous" : "Créer votre compte"}
            </h2>

            {/* Tab Selector */}
            <div className="flex p-1 bg-zinc-900/50 rounded-lg mb-8 border border-white/5">
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === "login" ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
                onClick={() => setMode("login")}
              >
                Se connecter
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === "signup" ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
                onClick={() => setMode("signup")}
              >
                S&apos;inscrire
              </button>
            </div>

            {/* Forms */}
            <div className="relative">
              {mode === "login" ? (
                <form className="space-y-4 animate-in slide-in-from-left-4 fade-in duration-300" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Email ou Pseudo</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="nom@exemple.com"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-muted-foreground">Mot de passe</label>
                      <Link href="#" className="text-xs text-primary hover:text-indigo-400 transition-colors">Mot de passe oublié ?</Link>
                    </div>
                    <input
                      type="password"
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <button className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-medium py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] active:scale-95 transition-all mt-6">
                    Se connecter
                  </button>
                </form>
              ) : (
                <form className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Pseudo affilié</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="cool_affiliate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="nom@exemple.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Mot de passe</label>
                    <input
                      type="password"
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    <div className="flex gap-1 mt-2">
                      <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-success w-1/4"></div></div>
                      <div className="h-1 flex-1 bg-white/10 rounded-full"></div>
                      <div className="h-1 flex-1 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-2">
                    <input type="checkbox" className="mt-1 bg-zinc-900 border-white/10 text-primary focus:ring-primary rounded" />
                    <label className="text-xs text-muted-foreground leading-tight">
                      J&apos;accepte les <Link href="#" className="text-primary hover:underline">Conditions Générales d&apos;Utilisation</Link> et je certifie avoir plus de 18 ans pour le contenu NSFW.
                    </label>
                  </div>
                  <button className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-medium py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] active:scale-95 transition-all mt-4">
                    Créer mon compte
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
