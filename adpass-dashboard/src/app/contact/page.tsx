"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Clock, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Retraits",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ message: "Message envoyé, notre équipe vous répondra sous 24h." });
    setFormData({ name: "", email: "", subject: "Retraits", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour
        </Link>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contactez-nous</h1>
        <p className="text-muted-foreground">Une question sur vos paiements ? Un bug technique ? Notre équipe de support est là pour vous aider rapidement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-zinc-950/70 border-white/10 backdrop-blur-xl">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Email direct</h3>
                  <a href="mailto:support@adpass.co" className="text-sm text-muted-foreground hover:text-primary transition-colors">support@adpass.co</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Temps de réponse</h3>
                  <p className="text-sm text-muted-foreground">Moyenne &lt; 24h (Lun-Ven)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Statut du support</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-sm text-success">En ligne</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-zinc-950/70 border-white/10 backdrop-blur-xl">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pseudo / Nom</label>
                    <Input
                      required
                      placeholder="Votre pseudo affilié"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email de contact</label>
                    <Input
                      required
                      type="email"
                      placeholder="nom@exemple.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sujet de votre demande</label>
                  <select
                    className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  >
                    <option value="Retraits">Questions sur les retraits / Paiements</option>
                    <option value="Modération">Modération d&apos;un lien</option>
                    <option value="Bug">Signaler un bug technique</option>
                    <option value="Partenariat">Demande de partenariat</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Votre message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Décrivez votre problème en détail..."
                    className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto px-8 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] active:scale-95 transition-all text-white border-none">
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
