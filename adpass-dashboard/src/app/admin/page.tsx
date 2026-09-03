"use client";

import { TrendingUp, Users, MousePointerClick, Wallet, CheckCircle2, UserPlus, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { mockAdminStats, mockAdminEvents } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminOverviewPage() {
  const chillPercentage = (mockAdminStats.chillVolume / mockAdminStats.totalVolume) * 100;
  const nsfwPercentage = (mockAdminStats.nsfwVolume / mockAdminStats.totalVolume) * 100;

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'signup': return <UserPlus className="w-4 h-4 text-indigo-400" />;
      case 'payout': return <Wallet className="w-4 h-4 text-success" />;
      case 'link': return <LinkIcon className="w-4 h-4 text-rose-400" />;
      default: return <CheckCircle2 className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Vue d&apos;ensemble</h1>
        <p className="text-muted-foreground">Performances globales de la plateforme AdPass.</p>
      </div>

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-rose-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Volume d&apos;affaires global</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{formatCurrency(mockAdminStats.totalVolume)}</div>
            <p className="text-xs text-success flex items-center mt-1">
              +{mockAdminStats.volumeChange}% ce mois-ci
            </p>
          </CardContent>
        </Card>

        <Card className="border-rose-500/20 bg-rose-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-rose-500">Marge Nette (AdPass)</CardTitle>
            <Wallet className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-rose-50">{formatCurrency(mockAdminStats.netMargin)}</div>
            <p className="text-xs text-rose-500/80 mt-1">
              Commission plateforme
            </p>
          </CardContent>
        </Card>

        <Card className="border-rose-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clics totaux réseau</CardTitle>
            <MousePointerClick className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{mockAdminStats.totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Conversion moyenne {mockAdminStats.avgConversion}%
            </p>
          </CardContent>
        </Card>

        <Card className="border-rose-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Affiliés actifs</CardTitle>
            <Users className="h-4 w-4 text-rose-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{mockAdminStats.activeAffiliates}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Comptes vérifiés
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume Split */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-rose-500/10">
            <CardHeader>
              <CardTitle>Répartition du Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <div className="text-sm font-medium text-indigo-400">Chill (Whop)</div>
                    <div className="text-xl font-mono font-bold">{formatCurrency(mockAdminStats.chillVolume)}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{chillPercentage.toFixed(1)}%</div>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 mb-6 overflow-hidden">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${chillPercentage}%` }}></div>
                </div>

                <div className="flex justify-between items-end mb-2">
                  <div>
                    <div className="text-sm font-medium text-rose-400">NSFW (Locker)</div>
                    <div className="text-xl font-mono font-bold">{formatCurrency(mockAdminStats.nsfwVolume)}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{nsfwPercentage.toFixed(1)}%</div>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${nsfwPercentage}%` }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Events Table */}
        <div className="lg:col-span-2">
          <Card className="border-rose-500/10 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                Derniers événements en direct
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="text-right">Heure</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAdminEvents.map((event) => (
                    <TableRow key={event.id} className="border-white/5 hover:bg-white/5">
                      <TableCell>
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          {getEventIcon(event.type)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{event.message}</TableCell>
                      <TableCell className="text-right text-muted-foreground text-xs">{event.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
