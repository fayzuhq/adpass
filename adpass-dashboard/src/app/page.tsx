"use client";

import { Copy, TrendingUp, CheckCircle2, Lock, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { mockDashboardMetrics, mockQuickLinks, mockChartData, mockRecentActivities } from "@/lib/mockData";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DashboardPage() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    // Small delay to trigger the height animation
    const timer = setTimeout(() => {
      setChartLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue, voici un aperçu de vos performances.</p>
      </div>

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Solde disponible</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{formatCurrency(mockDashboardMetrics.balance)}</div>
            <p className="text-xs text-success flex items-center mt-1">
              +{mockDashboardMetrics.balanceWeeklyChange}% cette semaine
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gains du jour</CardTitle>
            <Flame className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{formatCurrency(mockDashboardMetrics.todayEarnings)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Dernière mise à jour il y a 5 min
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clics totaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{mockDashboardMetrics.totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Taux de conversion moyen: {mockDashboardMetrics.conversionRate}%
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Commission {mockDashboardMetrics.commissionTier}</CardTitle>
            <Badge variant="default">Jusqu&apos;à 55%</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-xs mb-2 mt-2">
              <span className="text-muted-foreground">Progression Palier Élite (Jusqu&apos;à 65%)</span>
              <span className="font-mono">{mockDashboardMetrics.tierProgress} / {mockDashboardMetrics.tierGoal}</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                style={{ width: `${(mockDashboardMetrics.tierProgress / mockDashboardMetrics.tierGoal) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique et Activités (Prend 2/3 de l'espace sur grand écran) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activité sur 7 jours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full flex items-end justify-between gap-2 pt-10">
                {mockChartData.map((data, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1 group relative h-full justify-end">
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono bg-card border border-border px-2 py-1 rounded absolute -top-8 whitespace-nowrap z-10 pointer-events-none">
                      {data.day}: {formatCurrency(data.earnings)}
                    </div>
                    {/* Barre du graph */}
                    <div className="w-full bg-white/5 rounded-t-sm relative group-hover:bg-white/10 transition-colors h-full flex items-end overflow-hidden">
                      <div
                        className="w-full bg-gradient-to-t from-indigo-600 to-purple-400 rounded-t-sm transition-all duration-1000 ease-out"
                        style={{ height: chartLoaded ? `${(data.value / 120) * 100}%` : '0%' }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground truncate w-full text-center">{data.day.substring(0, 3)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dernières activités</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Heure</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Commission</TableHead>
                    <TableHead className="text-center">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRecentActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="text-muted-foreground">{activity.time}</TableCell>
                      <TableCell>
                        <Badge variant={activity.type === "NSFW" ? "nsfw" : "outline"}>
                          {activity.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium">
                        {activity.commission > 0 ? `+${formatCurrency(activity.commission)}` : '-'}
                      </TableCell>
                      <TableCell className="text-center">
                        {activity.status === "completed" ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-success">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmé
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs text-orange-500">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /> En attente
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Accès Rapide (Sidebar droite) */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight">Accès Rapide</h3>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Flame className="w-4 h-4 text-primary" />
                  Lien Chill
                </CardTitle>
                <Badge variant="success" className="text-[10px]">{mockQuickLinks.chill.badge}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-black/40 rounded-lg flex items-center justify-between border border-white/5 mb-3">
                <span className="font-mono text-sm truncate text-muted-foreground">{mockQuickLinks.chill.url}</span>
              </div>
              <Button
                className={`w-full transition-all ${copiedLink === mockQuickLinks.chill.url ? "" : "bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] active:scale-95 border-none text-white"}`}
                onClick={() => handleCopy(mockQuickLinks.chill.url)}
                variant={copiedLink === mockQuickLinks.chill.url ? "success" : "default"}
              >
                {copiedLink === mockQuickLinks.chill.url ? (
                  <><CheckCircle2 className="w-4 h-4 mr-2" /> Copié !</>
                ) : (
                  <><Copy className="w-4 h-4 mr-2" /> Copier le lien</>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-pink-500/20 bg-pink-500/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lock className="w-4 h-4 text-pink-500" />
                  Lien NSFW
                </CardTitle>
                <Badge variant="nsfw" className="text-[10px]">{mockQuickLinks.nsfw.badge}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-black/40 rounded-lg flex items-center justify-between border border-white/5 mb-3">
                <span className="font-mono text-sm truncate text-muted-foreground">{mockQuickLinks.nsfw.url}</span>
              </div>
              <Button
                className={`w-full transition-all ${copiedLink === mockQuickLinks.nsfw.url ? "bg-green-600 text-white hover:bg-green-700" : "bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:shadow-[0_0_15px_rgba(244,63,94,0.5)] active:scale-95 border-none text-white"}`}
                onClick={() => handleCopy(mockQuickLinks.nsfw.url)}
              >
                {copiedLink === mockQuickLinks.nsfw.url ? (
                  <><CheckCircle2 className="w-4 h-4 mr-2" /> Copié !</>
                ) : (
                  <><Copy className="w-4 h-4 mr-2" /> Copier le lien</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
