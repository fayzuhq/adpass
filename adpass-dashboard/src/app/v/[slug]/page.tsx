"use client";

import { useState, useEffect, use } from "react";
import { AlertTriangle, Lock, PlayCircle, Star, CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { useLinksStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

const pricingPlans = [
  { id: "trial", label: "Essai 3 jours", priceText: "1 € / 3 jours", badge: "POPULAIRE", price: 1 },
  { id: "weekly", label: "Hebdo", priceText: "9,99 € / semaine", price: 9.99 },
  { id: "monthly", label: "Mensuel", priceText: "27,99 € / mois", badge: "-35%", price: 27.99 },
  { id: "yearly", label: "Annuel", priceText: "41,99 € / an", badge: "-87%", originalPrice: "335,88 €", price: 41.99 },
];

export default function LockerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { links } = useLinksStore();
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(pricingPlans[0]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Timer logic
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!isAgeVerified) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      return Math.floor((endOfDay.getTime() - now.getTime()) / 1000);
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [isAgeVerified]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // Link metadata
  const foundLink = links.find((l) => l.url.includes(slug));
  const pageTitle = foundLink ? foundLink.name : "Pack Exclusif VIP";
  const destinationUrl = (foundLink && 'destination' in foundLink) ? foundLink.destination as string : "https://example.com/success";

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      toast({ message: "Paiement validé !" });

      // Simulate unlock redirect
      setTimeout(() => {
        window.location.href = destinationUrl;
      }, 500);
    }, 2000);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length > 2) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setExpiry(val);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 3) val = val.slice(0, 3);
    setCvc(val);
  };

  return (
    <div className="relative min-h-screen bg-[#07080B] text-foreground overflow-hidden font-sans">

      {/* Background Fake Gallery (Blurred) */}
      <div className={`absolute inset-0 transition-all duration-1000 ${isAgeVerified ? 'blur-xl opacity-30 select-none pointer-events-none' : 'blur-3xl opacity-20'}`}>
        <header className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
              <Lock className="w-4 h-4 text-rose-500" />
            </div>
            <span className="font-bold text-xl tracking-tight">PassLocker</span>
            <Badge variant="outline" className="text-rose-500 border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold tracking-widest ml-2">
              18+ EXCLUSIF
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-zinc-400 hidden sm:block">Galerie Privée</span>
            <div className="w-10 h-10 rounded-full bg-zinc-800" />
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-8 space-y-12">
          <h1 className="text-4xl font-bold text-white">{pageTitle}</h1>

          <div className="aspect-video w-full bg-zinc-950 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
             <PlayCircle className="w-32 h-32 text-white/50 relative z-10" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="aspect-square bg-zinc-900 rounded-xl relative border border-white/5 overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 bg-black/20" />
                 <Lock className="w-6 h-6 text-rose-500/60 relative z-10" />
               </div>
             ))}
          </div>
        </main>
      </div>

      {/* 18+ Age Gate Overlay */}
      {!isAgeVerified && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="max-w-md w-full bg-zinc-950 border border-rose-500/20 p-8 rounded-3xl shadow-[0_0_50px_rgba(244,63,94,0.15)] text-center">
            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-rose-500" />
            </div>
            <Badge variant="outline" className="text-rose-500 border-rose-500/30 bg-rose-500/10 mb-4 px-3 py-1 text-sm font-bold tracking-widest">
              AVERTISSEMENT +18
            </Badge>
            <h2 className="text-2xl font-bold text-white mb-4">Contenu Réservé aux Adultes</h2>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Ce site contient des contenus sexuellement explicites. Vous devez avoir 18 ans ou l&apos;âge légal de la majorité dans votre juridiction pour y accéder.
              En cliquant sur &quot;J&apos;ai plus de 18 ans&quot;, vous confirmez être majeur et consentez à visionner ce type de contenu.
            </p>
            <div className="space-y-3">
              <Button
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-6 rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:scale-[1.02] active:scale-95 transition-all text-base"
                onClick={() => setIsAgeVerified(true)}
              >
                J&apos;ai plus de 18 ans — Accéder au contenu
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-white"
                onClick={() => window.location.href = "https://www.google.com"}
              >
                Quitter
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Paywall Overlay */}
      {isAgeVerified && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-4xl bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-700">

            <div className="p-6 sm:p-10">
              <div className="text-center mb-8">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">CHOISIS TA FORMULE</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Column: Timer & Trust */}
                <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    OFFRE DE LANCEMENT
                  </div>

                  <div>
                    <div className="text-5xl tabular-nums font-mono font-bold text-white tracking-tighter mb-2">
                      {String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
                    </div>
                    <p className="text-muted-foreground">Se termine à minuit</p>
                  </div>

                  <div className="flex flex-col items-center lg:items-start pt-6 border-t border-white/5 w-full">
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-300 font-medium">4,9/5 par des milliers de membres</p>
                  </div>
                </div>

                {/* Right Column: Pricing & Benefits */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    {pricingPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPlan.id === plan.id ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.15)] scale-[1.02]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                        onClick={() => setSelectedPlan(plan)}
                      >
                        {plan.badge && (
                          <span className={`absolute -top-3 right-4 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${selectedPlan.id === plan.id ? 'bg-indigo-500 text-white' : 'bg-zinc-700 text-white'}`}>
                            {plan.badge}
                          </span>
                        )}
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPlan.id === plan.id ? 'border-indigo-500' : 'border-zinc-600'}`}>
                            {selectedPlan.id === plan.id && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold ${selectedPlan.id === plan.id ? 'text-indigo-100' : 'text-zinc-300'}`}>{plan.label}</h3>
                          </div>
                          <div className="text-right">
                            {plan.originalPrice && <div className="text-xs text-muted-foreground line-through">{plan.originalPrice}</div>}
                            <div className="font-mono font-bold text-white">{plan.priceText}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-white/5">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                      <span className="text-sm text-zinc-300">Déblocage instantané, zéro attente</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                      <span className="text-sm text-zinc-300">Accès illimité sur tous vos appareils</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                      <span className="text-sm text-zinc-300">Résiliable en 1 clic à tout moment</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <Button
                      className="w-full py-7 text-lg font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-rose-500 text-white rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-[1.02] active:scale-95 transition-all border-none"
                      onClick={() => setIsPaymentModalOpen(true)}
                    >
                      Commencer pour {selectedPlan.price} € →
                    </Button>
                    <p className="text-center text-[10px] text-muted-foreground mt-4 leading-relaxed">
                      Sans engagement, résiliable à tout moment.<br/>
                      Paiement sécurisé : Carte, Apple Pay, Crypto.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Fake Payment Modal */}
      <Modal isOpen={isPaymentModalOpen} onClose={() => !isProcessing && setIsPaymentModalOpen(false)} title="Paiement Sécurisé">
        <form onSubmit={handleProcessPayment} className="space-y-6">

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">Formule choisie</p>
              <p className="font-semibold">{selectedPlan.label}</p>
            </div>
            <div className="text-xl font-mono font-bold">{selectedPlan.price} €</div>
          </div>

          <Button type="button" className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-6 rounded-xl flex items-center justify-center gap-2">
            Payer avec <strong>Apple Pay</strong>
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs">ou par carte bancaire</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400">Numéro de carte</label>
              <div className="relative">
                <Input required placeholder="0000 0000 0000 0000" className="pl-10 pr-20 font-mono" disabled={isProcessing} value={cardNumber} onChange={handleCardNumberChange} />
                <CreditCard className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <div className="absolute right-3 top-2.5 flex gap-1 select-none pointer-events-none">
                  <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">VISA</span>
                  <span className="bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">MC</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">Expiration</label>
                <Input required placeholder="MM/AA" className="font-mono" disabled={isProcessing} value={expiry} onChange={handleExpiryChange} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">CVC</label>
                <Input required placeholder="123" className="font-mono" type="password" disabled={isProcessing} value={cvc} onChange={handleCvcChange} />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full py-6 text-base font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   Traitement sécurisé...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Payer {selectedPlan.price} € et Débloquer
                </span>
              )}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
