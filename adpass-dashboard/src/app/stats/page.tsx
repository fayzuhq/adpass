"use client";

import { useState } from "react";
import { BarChart3, Globe2, Users, MousePointerClick } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { mockStats } from "@/lib/mockData";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StatsPage() {
  const [timeframe, setTimeframe] = useState("7d");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Statistiques</h1>
          <p className="text-muted-foreground">Analysez vos performances en détail.</p>
        </div>

        <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full sm:w-auto">
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-lg">
            <TabsTrigger value="24h" className="data-[state=active]:bg-primary data-[state=active]:text-white">24h</TabsTrigger>
            <TabsTrigger value="7d" className="data-[state=active]:bg-primary data-[state=active]:text-white">7 jours</TabsTrigger>
            <TabsTrigger value="30d" className="data-[state=active]:bg-primary data-[state=active]:text-white">30 jours</TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">Tout</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
              <MousePointerClick className="w-4 h-4" />
              Earnings Per Click (EPC)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-mono">{formatCurrency(mockStats.epc)}</div>
            <p className="text-sm text-muted-foreground mt-2">Moyenne générée par clic unique</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Top Liens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStats.topLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted-foreground w-4">{index + 1}.</span>
                    <span className="text-sm font-medium">{link.name}</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-success">
                    {formatCurrency(link.earnings)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-primary" />
              Top Pays & Régions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {mockStats.topRegions.map((region, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span>{region.name}</span>
                    <span className="font-mono text-muted-foreground">{region.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${region.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Sources de trafic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {mockStats.topSources.map((source, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span>{source.name}</span>
                    <span className="font-mono text-muted-foreground">{source.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${source.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
