"use client";

import { useState } from "react";
import { User, Shield, BellRing, Save, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { mockSettings } from "@/lib/mockData";

export default function SettingsPage() {
  const [profile, setProfile] = useState(mockSettings.profile);
  const [webhook, setWebhook] = useState(mockSettings.webhook);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(mockSettings.twoFactorEnabled);

  const [isTestSuccess, setIsTestSuccess] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleTestWebhook = () => {
    setIsTestSuccess(true);
    setTimeout(() => setIsTestSuccess(false), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Réglages</h1>
        <p className="text-muted-foreground">Gérez les informations de votre compte et vos préférences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* Section Profil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Profil utilisateur
            </CardTitle>
            <CardDescription>Mettez à jour vos informations de connexion et votre profil.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom d&apos;utilisateur</label>
                <Input
                  value={profile.username}
                  onChange={(e) => setProfile({...profile, username: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Adresse Email</label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  required
                />
              </div>
            </div>
            {profile.email !== mockSettings.profile.email && (
              <div className="space-y-2 pt-2 border-t border-white/5 animate-in fade-in duration-300">
                <label className="text-sm font-medium text-orange-400">Mot de passe actuel requis pour valider le nouvel email</label>
                <Input type="password" required placeholder="Votre mot de passe actuel" />
              </div>
            )}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <label className="text-sm font-medium">Nouveau mot de passe</label>
              <Input type="password" placeholder="Laissez vide pour conserver l&apos;actuel" />
              <p className="text-xs text-muted-foreground">Un code OTP sera envoyé par email.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section Webhook */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellRing className="w-5 h-5 text-primary" /> Notifications Discord
            </CardTitle>
            <CardDescription>Recevez une notification instantanée à chaque nouvelle vente.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">URL du Webhook Discord</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="url"
                  value={webhook}
                  onChange={(e) => setWebhook(e.target.value)}
                  className="font-mono text-sm"
                  placeholder="https://discord.com/api/webhooks/..."
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleTestWebhook}
                  className="shrink-0"
                >
                  {isTestSuccess ? (
                    <span className="flex items-center text-success"><CheckCircle2 className="w-4 h-4 mr-2" /> Message envoyé</span>
                  ) : "Tester l'envoi"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Le bot AdPass enverra un message enrichi pour chaque conversion confirmée.</p>
            </div>
          </CardContent>
        </Card>

        {/* Section Sécurité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Sécurité du compte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="space-y-0.5">
                <label className="text-sm font-medium text-foreground">Authentification à deux facteurs (2FA)</label>
                <p className="text-xs text-muted-foreground">Sécurisez vos demandes de retrait avec un code généré par l&apos;application.</p>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-4 pt-4">
          {isSaved && (
            <span className="text-sm text-success flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2" /> Modifications enregistrées
            </span>
          )}
          <Button type="submit" size="lg">
            <Save className="w-4 h-4 mr-2" /> Enregistrer les modifications
          </Button>
        </div>
      </form>
    </div>
  );
}
