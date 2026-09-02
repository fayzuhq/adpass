"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Flame, Lock, Zap, Shield, Wallet, Link as LinkIcon, ChevronDown, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#07080B] text-foreground overflow-x-hidden scroll-smooth selection:bg-indigo-500/30"
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.06), transparent 40%)`
        }}
      />

      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating Header */}
      <header className="sticky top-4 mx-auto max-w-5xl rounded-full backdrop-blur-xl bg-zinc-950/70 border border-white/10 px-6 py-3 z-50 flex items-center justify-between shadow-2xl animate-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">AdPass</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#fonctionnement" className="hover:text-white transition-colors">Fonctionnement</a>
          <a href="#outils" className="hover:text-white transition-colors">Outils</a>
          <a href="#paliers" className="hover:text-white transition-colors">Paliers</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/auth" className="text-sm font-medium hover:text-indigo-400 transition-colors hidden sm:block">
            Se connecter
          </Link>
          <Link href="/auth" className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] active:scale-95 transition-all">
            Devenir affilié
          </Link>
        </div>
      </header>

      <main className="relative z-10 pt-24 pb-32">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-32 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Plateforme d&apos;affiliation SaaS
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 max-w-4xl leading-[1.1]">
            Transforme ton audience en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500">
              revenus récurrents.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Monétise ton trafic chill ou NSFW avec notre technologie de content locking. Des paiements crypto ultra-rapides et jusqu&apos;à 65% de commission.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href="/auth" className="bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-zinc-200 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 group">
              Démarrer maintenant
              <Zap className="w-4 h-4 group-hover:text-indigo-600 transition-colors" />
            </Link>
            <Link href="/dashboard" className="bg-white/5 border border-white/10 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center">
              Voir la démo
            </Link>
          </div>
        </section>

        {/* Animated Flow & Cockpit Mockup */}
        <section id="fonctionnement" className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Un flux simple. Des résultats massifs.</h2>
            <p className="text-muted-foreground">Une intégration invisible pour vos utilisateurs, rentable pour vous.</p>
          </div>

          {/* Flow Diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-24">
            <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl w-full md:w-64 text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <LinkIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">1. Ton audience</h3>
              <p className="text-xs text-muted-foreground">Ils cliquent sur ton lien</p>
            </div>

            <div className="hidden md:block w-16 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-[slide_2s_ease-in-out_infinite]" />
            </div>

            <div className="bg-indigo-950/30 border border-indigo-500/30 p-6 rounded-2xl w-full md:w-64 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/50">
                  <Lock className="w-5 h-5 text-indigo-400 animate-pulse" />
                </div>
                <h3 className="font-semibold text-indigo-100 mb-1">2. Cadenas AdPass</h3>
                <p className="text-xs text-indigo-300/70">Ils complètent une offre</p>
              </div>
            </div>

            <div className="hidden md:block w-16 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-[slide_2s_ease-in-out_infinite_0.5s]" />
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl w-full md:w-64 text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Wallet className="w-5 h-5 text-success" />
              </div>
              <h3 className="font-semibold mb-1">3. Ta destination</h3>
              <p className="text-xs text-muted-foreground">Tu encaisses, ils accèdent</p>
            </div>
          </div>

          {/* Cockpit Mockup */}
          <div className="relative mx-auto max-w-4xl rounded-xl border border-white/10 bg-[#0D0E15] shadow-2xl overflow-hidden">
            {/* macOS header */}
            <div className="bg-zinc-900/80 px-4 py-3 border-b border-white/5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs text-muted-foreground font-medium">Dashboard AdPass</div>
            </div>
            {/* Body */}
            <div className="p-6 md:p-8 bg-[url('/grid.svg')] bg-center">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Gains du jour</div>
                    <div className="text-3xl font-mono font-bold flex items-center gap-3">
                      €428.50 <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">+12.4%</span>
                    </div>
                  </div>
                  {/* Fake Graph */}
                  <div className="bg-white/5 border border-white/10 p-5 rounded-lg h-32 flex items-end justify-between gap-1">
                    {[30, 45, 25, 60, 40, 75, 55, 90, 65, 100].map((h, i) => (
                      <div key={i} className="w-full h-full flex items-end bg-indigo-500/20 rounded-t-sm hover:bg-indigo-500/40 transition-colors relative group overflow-hidden">
                        <div className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-sm transition-all duration-1000 ease-out" style={{ height: `${h}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-64 bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="text-sm font-medium mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Live Feed
                  </div>
                  <div className="space-y-3">
                    {[
                      { c: "FR", a: "0.42", t: "il y a 2s" },
                      { c: "US", a: "0.85", t: "il y a 14s" },
                      { c: "BE", a: "0.38", t: "il y a 1m" },
                      { c: "CH", a: "0.55", t: "il y a 3m" },
                    ].map((feed, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{feed.c} • {feed.t}</span>
                        <span className="font-mono text-success">+€{feed.a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section id="outils" className="max-w-5xl mx-auto px-6 py-24">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">La façon moderne de monétiser</h2>
            <p className="text-muted-foreground">Tout ce dont tu as besoin, sans la complexité.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
            <div className="md:col-span-2 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 group hover:bg-zinc-900/80 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Lock className="w-24 h-24 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Double moteur Chill / Locker</h3>
              <p className="text-muted-foreground text-sm max-w-sm mb-4">Domaines isolés pour le contenu classique et NSFW. Un routage intelligent pour maximiser la conversion selon la source.</p>
              <div className="flex gap-2">
                <span className="text-[10px] font-mono bg-white/10 px-2 py-1 rounded">chillvault.co</span>
                <span className="text-[10px] font-mono bg-danger/20 text-danger-foreground px-2 py-1 rounded">passlocker.net</span>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 group hover:bg-zinc-900/80 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300">
              <Wallet className="w-8 h-8 text-success mb-4" />
              <h3 className="text-lg font-bold mb-2">Paiements Crypto</h3>
              <p className="text-muted-foreground text-sm">Retraits rapides en USDT et LTC. Zéro friction, sécurité maximale.</p>
            </div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 group hover:bg-zinc-900/80 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300">
              <Shield className="w-8 h-8 text-indigo-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Validation Sécurisée</h3>
              <p className="text-muted-foreground text-sm">Anti-bot et vérification de complétion des offres en temps réel.</p>
            </div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 group hover:bg-zinc-900/80 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300">
              <Zap className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Paliers Progressifs</h3>
              <p className="text-muted-foreground text-sm">Débloque jusqu&apos;à 65% de commission en augmentant ton volume.</p>
            </div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 group hover:bg-zinc-900/80 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300">
              <LinkIcon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Lien Unique</h3>
              <p className="text-muted-foreground text-sm">Un seul lien intelligent pour débloquer tout ton contenu de façon optimisée.</p>
            </div>

            <div className="md:col-span-2 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 group hover:bg-zinc-900/80 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-end relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <h3 className="text-xl font-bold mb-2 relative z-10">Webhooks & Notifications</h3>
               <p className="text-muted-foreground text-sm relative z-10">Connecte ton Discord ou Telegram pour recevoir des alertes de conversion instantanées.</p>
            </div>
          </div>
        </section>

        {/* Paliers */}
        <section id="paliers" className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Plus tu génères, plus tu gagnes.</h2>
            <p className="text-muted-foreground">Notre système de paliers récompense les affiliés performants.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Débutant", rev: "0 - 1000€", pct: "40%", color: "text-zinc-400" },
              { name: "Pro", rev: "1000 - 5000€", pct: "55%", color: "text-indigo-400", highlight: true },
              { name: "Élite", rev: "5000€+", pct: "65%", color: "text-purple-400" }
            ].map((tier, i) => (
              <div key={i} className={`p-8 rounded-2xl border ${tier.highlight ? 'bg-indigo-950/20 border-indigo-500/30 relative' : 'bg-zinc-900/30 border-white/5'}`}>
                {tier.highlight && <div className="absolute -top-3 inset-x-0 flex justify-center"><span className="bg-indigo-500 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider">Populaire</span></div>}
                <div className={`text-xl font-bold mb-2 ${tier.color}`}>{tier.name}</div>
                <div className="text-sm text-muted-foreground mb-6">Volume: <span className="font-mono">{tier.rev}</span></div>
                <div className="text-5xl font-bold font-mono mb-6">{tier.pct}</div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-success" /> Retraits standards</li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-success" /> Support email</li>
                  {i > 0 && <li className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-success" /> Payouts prioritaires</li>}
                  {i > 1 && <li className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-success" /> Manager dédié</li>}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Est-ce vraiment gratuit ?", a: "Oui, la plateforme est 100% gratuite. Nous nous rémunérons en gardant un pourcentage sur les offres complétées (la différence entre votre palier et 100%)." },
              { q: "Comment fonctionne la modération du contenu NSFW ?", a: "Les liens générés pour le NSFW utilisent un domaine isolé (passlocker.net) avec des avertissements explicites avant l'accès, respectant ainsi nos conditions et celles de nos annonceurs." },
              { q: "Quand puis-je retirer mes cryptos ?", a: "Les retraits sont traités sous 24-48h pour les paliers Débutant, et en moins de 12h pour les paliers Pro et Élite. Minimum de retrait : 20 € / 20 USDT." }
            ].map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-lg bg-zinc-900/30 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40" : "max-h-0"}`}
                >
                  <div className="p-4 pt-0 text-muted-foreground text-sm border-t border-white/5 mt-2">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer & CTA */}
      <footer className="relative border-t border-white/10 bg-zinc-950 pt-24 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Bottom CTA */}
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold mb-6">Prêt à maximiser tes revenus ?</h2>
            <Link href="/auth" className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-zinc-200 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Créer mon compte gratuitement
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-t border-white/10 pt-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Flame className="w-5 h-5 text-primary" />
                <span className="font-bold">AdPass</span>
              </div>
              <p className="text-xs text-muted-foreground">© 2026 AdPass Inc.<br/>Tous droits réservés.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Plateforme</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/auth" className="hover:text-white transition-colors">Connexion</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Inscription</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Démo Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-white transition-colors">CGU</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Mentions légales</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Discord</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Keyframes for custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}} />
    </div>
  );
}
