"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour
        </Link>
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-8">Mentions Légales</h1>

      <Card className="bg-zinc-950/70 border-white/10 backdrop-blur-xl">
        <CardContent className="p-6 md:p-8 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Éditeur de la plateforme</h2>
            <p className="mb-2">La plateforme SaaS AdPass est éditée et exploitée par :</p>
            <ul className="list-disc pl-5 space-y-1 text-white">
              <li><strong>AdPass Technologies Inc.</strong></li>
              <li>Contact de support : <a href="mailto:support@adpass.co" className="text-indigo-400 hover:underline">support@adpass.co</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Hébergement technique</h2>
            <p className="mb-2">L&apos;hébergement de l&apos;infrastructure web est assuré par :</p>
            <ul className="list-disc pl-5 space-y-1 text-white">
              <li><strong>Vercel Inc.</strong></li>
              <li>Adresse : 440 N Barranca Ave #4133, Covina, CA 91723</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Propriété intellectuelle et marques</h2>
            <p>
              L&apos;ensemble des éléments graphiques, textuels, informatiques et conceptuels constituant la plateforme,
              y compris mais sans s&apos;y limiter, les interfaces, le code source et la structure, sont la propriété exclusive
              d&apos;AdPass Technologies Inc.
            </p>
            <p className="mt-4">
              Les dénominations commerciales <strong className="text-white">AdPass</strong>, <strong className="text-white">ChillVault</strong> et <strong className="text-white">PassLocker</strong>
              sont des marques protégées. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie
              des éléments de la plateforme, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
