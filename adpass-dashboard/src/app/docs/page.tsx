"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Link as LinkIcon, Wallet, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">Documentation Affilié</h1>
      </div>

      <div className="space-y-6">
        <Card className="bg-zinc-950/70 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-indigo-400" />
              Guide de démarrage rapide
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Pour créer votre premier lien, rendez-vous dans la section <strong>&quot;Mes liens&quot;</strong> de votre dashboard et cliquez sur <strong>&quot;Créer un nouveau lien&quot;</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <h4 className="font-bold text-white mb-2">Modèle Chill (Whop)</h4>
                <p className="text-sm">Redirection standard. Idéal pour du contenu grand public, formations ou accès communautés. Utilise le domaine <span className="font-mono text-indigo-300">chillvault.co</span>.</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <h4 className="font-bold text-white mb-2">Modèle NSFW (Locker)</h4>
                <p className="text-sm">Locker avec vérification d&apos;âge stricte avant accès. Obligatoire pour tout contenu adulte. Utilise le domaine <span className="font-mono text-rose-300">passlocker.net</span>.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950/70 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Paliers de commissions
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p className="mb-4">Votre pourcentage de commission évolue automatiquement à la fin de chaque mois calendaire selon le volume de ventes généré.</p>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex flex-col">
                  <span className="font-bold text-white">Standard</span>
                  <span className="text-xs">Volume : 0 - 1000€</span>
                </div>
                <span className="font-mono font-bold text-xl text-zinc-300">40%</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/30">
                <div className="flex flex-col">
                  <span className="font-bold text-indigo-300">Pro</span>
                  <span className="text-xs text-indigo-400/70">Volume : 1000 - 5000€</span>
                </div>
                <span className="font-mono font-bold text-xl text-indigo-400">55%</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                <div className="flex flex-col">
                  <span className="font-bold text-purple-300">Élite</span>
                  <span className="text-xs text-purple-400/70">Volume : +5000€</span>
                </div>
                <span className="font-mono font-bold text-xl text-purple-400">65%</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950/70 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-success" />
              Guide des retraits Crypto
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Pour garantir des paiements rapides et anonymes, nous n&apos;utilisons que les cryptomonnaies.
              Le retrait minimum est fixé à <strong>20,00 €</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>USDT (Tether) :</strong> Uniquement sur le réseau <span className="font-mono text-white">TRC-20</span> (Tron). Ne retirez pas sur ERC-20 ou BEP-20.</li>
              <li><strong>Litecoin (LTC) :</strong> Faibles frais de réseau, idéal pour les petits retraits.</li>
            </ul>
            <p className="text-sm bg-white/5 p-3 rounded border border-white/10">
              <strong className="text-white">Note sur le TXID :</strong> Une fois votre paiement validé par notre équipe, un TXID (Hash de transaction) apparaîtra dans votre historique. Vous pourrez l&apos;utiliser sur un explorateur de blocs pour suivre votre virement.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950/70 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Intégration Webhooks Discord
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Connectez votre serveur Discord pour recevoir des notifications en temps réel pour chaque vente.
              Rendez-vous dans <strong>&quot;Réglages&quot;</strong> pour coller l&apos;URL de votre Webhook.
            </p>
            <div className="bg-[#07080B] p-4 rounded-lg border border-white/10">
              <p className="text-xs text-muted-foreground mb-2">Format du payload envoyé (JSON) :</p>
              <pre className="text-[10px] sm:text-xs font-mono text-indigo-300 overflow-x-auto">
{`{
  "embeds": [{
    "title": "🎉 Nouvelle conversion AdPass !",
    "color": 6514321,
    "fields": [
      { "name": "Campagne", "value": "Twitter Promo", "inline": true },
      { "name": "Gain", "value": "+1.42 €", "inline": true }
    ]
  }]
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
