"use client";

import { useState } from "react";
import { Globe, Percent, Save, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [config, setConfig] = useState({
    domainChill: "chillvault.co",
    domainNsfw: "passlocker.net",
    tierStandard: 40,
    tierPro: 55,
    tierElite: 65,
    minPayout: 20
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Configuration globale</h1>
        <p className="text-muted-foreground">Gérez les paramètres maîtres de la plateforme AdPass.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* Domaines */}
        <Card className="border-rose-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-rose-500" /> Domaines Actifs
            </CardTitle>
            <CardDescription>Les domaines utilisés pour générer les liens des affiliés.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-indigo-400">Domaine Chill</label>
                <Input
                  value={config.domainChill}
                  onChange={(e) => setConfig({...config, domainChill: e.target.value})}
                  className="font-mono text-sm border-indigo-500/30 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-rose-400">Domaine NSFW</label>
                <Input
                  value={config.domainNsfw}
                  onChange={(e) => setConfig({...config, domainNsfw: e.target.value})}
                  className="font-mono text-sm border-rose-500/30 focus:ring-rose-500"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Paliers & Retraits */}
        <Card className="border-rose-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-rose-500" /> Règles Financières
            </CardTitle>
            <CardDescription>Configurez les paliers de commission et les limites de retrait.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Palier Standard (%)</label>
                <Input
                  type="number"
                  value={config.tierStandard}
                  onChange={(e) => setConfig({...config, tierStandard: parseInt(e.target.value)})}
                  className="font-mono"
                  min={1}
                  max={99}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-indigo-300">Palier Pro (%)</label>
                <Input
                  type="number"
                  value={config.tierPro}
                  onChange={(e) => setConfig({...config, tierPro: parseInt(e.target.value)})}
                  className="font-mono border-indigo-500/30"
                  min={1}
                  max={99}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-400">Palier Élite (%)</label>
                <Input
                  type="number"
                  value={config.tierElite}
                  onChange={(e) => setConfig({...config, tierElite: parseInt(e.target.value)})}
                  className="font-mono border-purple-500/30"
                  min={1}
                  max={99}
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2 max-w-sm">
               <label className="text-sm font-medium">Seuil minimum de retrait (€)</label>
                <Input
                  type="number"
                  value={config.minPayout}
                  onChange={(e) => setConfig({...config, minPayout: parseInt(e.target.value)})}
                  className="font-mono text-rose-100"
                  min={1}
                  required
                />
            </div>
          </CardContent>
        </Card>

        {/* Zone de Danger */}
        <Card className="border-danger/30 bg-danger/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-danger">
              <AlertTriangle className="w-5 h-5" /> Mode Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-danger/20">
              <div className="space-y-0.5">
                <label className="text-sm font-medium text-rose-100">Désactiver l&apos;accès affilié</label>
                <p className="text-xs text-danger/80">Bloque temporairement l&apos;accès au dashboard pour tous les affiliés.</p>
              </div>
              <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-4 pt-4">
          {isSaved && (
            <span className="text-sm text-success flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2" /> Configurations enregistrées
            </span>
          )}
          <Button type="submit" size="lg" className="bg-rose-600 hover:bg-rose-700 text-white border-none shadow-[0_0_15px_rgba(225,29,72,0.3)]">
            <Save className="w-4 h-4 mr-2" /> Enregistrer les configurations
          </Button>
        </div>
      </form>
    </div>
  );
}
