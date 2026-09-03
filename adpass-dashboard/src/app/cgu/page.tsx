"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function CguPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour
        </Link>
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-8">Conditions Générales d&apos;Utilisation — AdPass</h1>

      <Card className="bg-zinc-950/70 border-white/10 backdrop-blur-xl">
        <CardContent className="p-6 md:p-8 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Objet de la plateforme et inscription</h2>
            <p>
              AdPass agit comme un intermédiaire fournissant des outils de monétisation (content locking) pour ses affiliés.
              Pour vous inscrire et utiliser nos services, notamment pour diffuser des offres adultes (NSFW),
              vous certifiez expressément avoir plus de 18 ans au moment de la création de votre compte.
              Toute fausse déclaration entraînera la clôture définitive du compte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Cloisonnement strict Chill / NSFW</h2>
            <p>
              AdPass utilise des domaines isolés afin de respecter les normes de nos annonceurs.
              Il est strictement obligatoire d&apos;utiliser le domaine <span className="text-rose-400 font-mono">passlocker.net</span> pour
              tout contenu adulte (NSFW). L&apos;utilisation du domaine <span className="text-indigo-400 font-mono">chillvault.co</span> pour
              du contenu NSFW est formellement interdite et sera sanctionnée par une suspension immédiate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Qualité du trafic & Lutte contre la fraude</h2>
            <p>
              Nous opérons une politique de tolérance zéro envers la fraude. Sont formellement interdits :
              l&apos;usage de bots, les fermes à clics, l&apos;utilisation automatisée de Proxy/VPN pour simuler des conversions,
              ainsi que toute technique visant à tromper nos systèmes ou ceux de nos partenaires.
              En cas d&apos;abus constaté, AdPass se réserve le droit de geler immédiatement les fonds de l&apos;affilié sans préavis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Modalités de paiement</h2>
            <p>
              Les commissions générées peuvent être retirées sous réserve d&apos;atteindre le seuil minimum de 20,00 €.
              Les retraits sont traités sous 24 à 48 heures ouvrées et sont effectués en cryptomonnaie (USDT réseau TRC-20 ou Litecoin).
              L&apos;affilié est seul responsable de l&apos;exactitude de l&apos;adresse de portefeuille saisie.
              AdPass se décharge de toute responsabilité en cas de perte de fonds due à une erreur de saisie d&apos;adresse par l&apos;affilié.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Suspension et résiliation de compte</h2>
            <p>
              Nous nous réservons le droit de suspendre ou de résilier tout compte affilié à notre entière discrétion,
              notamment en cas de violation avérée des présentes CGU ou d&apos;inactivité prolongée (plus de 12 mois consécutifs sans connexion).
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
