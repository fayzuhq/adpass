"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ConfidentialitePage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour
        </Link>
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-8">Politique de Confidentialité</h1>

      <Card className="bg-zinc-950/70 border-white/10 backdrop-blur-xl">
        <CardContent className="p-6 md:p-8 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Données collectées</h2>
            <p>
              Dans le cadre de l&apos;utilisation de notre plateforme, nous collectons certaines données nécessaires
              au bon fonctionnement de nos services. Cela inclut vos identifiants de compte (email, pseudonyme),
              vos adresses de wallet crypto pour le paiement des commissions, ainsi que votre adresse IP
              et votre User-Agent. Ces données techniques sont primordiales pour la prévention des fraudes et
              le tracking fiable des conversions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Utilisation des données</h2>
            <p>
              Les données recueillies sont exploitées exclusivement dans le but d&apos;assurer l&apos;exécution de nos services.
              Nous les utilisons pour authentifier votre accès, traiter vos demandes de retraits, prévenir toute activité
              abusive ou frauduleuse, et établir des statistiques de conversion globales et anonymisées.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Partage des données</h2>
            <p>
              AdPass prend votre vie privée au sérieux. Nous nous engageons formellement à ne pas revendre, échanger
              ou louer vos données personnelles à des tiers à des fins commerciales ou publicitaires. Vos informations
              ne sont partagées qu&apos;avec nos partenaires techniques stricts (comme nos prestataires de paiement) dans la
              seule mesure requise pour opérer la plateforme.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Sécurité et conservation des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles conformes aux standards de l&apos;industrie
              pour protéger vos données contre les accès non autorisés ou les fuites. Nous conservons vos informations
              tant que votre compte est actif. Vous pouvez demander la suppression de votre compte et l&apos;effacement de vos
              données à tout moment en contactant notre support.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
