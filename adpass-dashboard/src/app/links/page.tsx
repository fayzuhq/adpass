"use client";

import { useState } from "react";
import { Plus, Copy, CheckCircle2, Search, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";
import { Switch } from "@/components/ui/switch";
import { formatCurrency } from "@/lib/utils";
import { mockLinks } from "@/lib/mockData";
import { useLinksStore } from "@/lib/store";
import { toast } from "@/components/ui/use-toast";
import { AffiliateLink } from "@/types";

type Link = typeof mockLinks[0];

const LinksTable = ({ typeFilter, links, onCopy, onToggle, copiedLink, searchQuery }: { typeFilter: "all" | "chill" | "nsfw", links: Link[], onCopy: (url: string) => void, onToggle: (id: string) => void, copiedLink: string | null, searchQuery: string }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  let filteredLinks = typeFilter === "all" ? links : links.filter(l => l.type === typeFilter);

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredLinks = filteredLinks.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.url.toLowerCase().includes(q)
    );
  }

  if (sortConfig) {
    filteredLinks = [...filteredLinks].sort((a: Link, b: Link) => {
      const key = sortConfig.key as keyof Link;
      const valA = a[key];
      const valB = b[key];
      if (valA !== undefined && valB !== undefined && valA < valB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (valA !== undefined && valB !== undefined && valA > valB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom du lien</TableHead>
          <TableHead>URL Trackée</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('clicks')}>
            <div className="flex items-center justify-end gap-1">Clics <ArrowUpDown className="w-3 h-3" /></div>
          </TableHead>
          <TableHead className="text-right cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('sales')}>
            <div className="flex items-center justify-end gap-1">Ventes <ArrowUpDown className="w-3 h-3" /></div>
          </TableHead>
          <TableHead className="text-right cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('earnings')}>
            <div className="flex items-center justify-end gap-1">Gains <ArrowUpDown className="w-3 h-3" /></div>
          </TableHead>
          <TableHead className="text-center">Statut</TableHead>
          <TableHead className="text-center">Actif</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredLinks.map((link) => (
          <TableRow key={link.id} className={!link.active ? "opacity-60" : ""}>
            <TableCell className="font-medium text-foreground">{link.name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground bg-black/30 px-2 py-1 rounded">
                  {/* Remove main domain, just show the path or use the full mock domain which is now updated */}
                  {link.url}
                </span>
                <button
                  onClick={() => onCopy(link.url)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copiedLink === link.url ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={link.type === "nsfw" ? "nsfw" : "outline"} className={link.type === "chill" ? "text-primary border-primary/30" : ""}>
                {link.type === "nsfw" ? "NSFW Locker" : "Whop Intégré"}
              </Badge>
            </TableCell>
            <TableCell className="text-right font-mono">{link.clicks.toLocaleString()}</TableCell>
            <TableCell className="text-right font-mono">{link.sales}</TableCell>
            <TableCell className="text-right font-mono font-medium text-success">
              {formatCurrency(link.earnings)}
            </TableCell>
            <TableCell className="text-center">
              {link.moderationStatus === 'pending' ? (
                <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/10">En attente</Badge>
              ) : (
                <Badge variant="outline" className="text-success border-success/30 bg-success/10">Actif</Badge>
              )}
            </TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center">
                <Switch checked={link.active} onCheckedChange={() => onToggle(link.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default function LinksPage() {
  const { links, setLinks, addLink } = useLinksStore();
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const [newLinkType, setNewLinkType] = useState<"chill" | "nsfw">("chill");
  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkSlug, setNewLinkSlug] = useState("");
  const [newLinkDestination, setNewLinkDestination] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    toast({ message: "Lien copié dans le presse-papier" });
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const toggleLinkActive = (id: string) => {
    setLinks((prev) => prev.map((link) => link.id === id ? { ...link, active: !link.active } : link));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Mes liens</h1>
          <p className="text-muted-foreground">Gérez vos liens d&apos;affiliation et suivez leurs performances.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Créer un nouveau lien
        </Button>
      </div>

      <Card>
        <CardContent className="p-0 sm:p-6">
          <div className="p-4 sm:p-0 mb-6 flex flex-col sm:flex-row justify-between gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-lg w-full sm:w-auto">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">Tous les liens</TabsTrigger>
                <TabsTrigger value="chill" className="data-[state=active]:bg-primary data-[state=active]:text-white">Liens Chill</TabsTrigger>
                <TabsTrigger value="nsfw" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">Liens NSFW</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Rechercher une campagne ou URL..."
                className="pl-9 bg-white/5 border-white/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

            <TabsContent value="all" className="m-0"><LinksTable typeFilter="all" links={links} onCopy={handleCopy} onToggle={toggleLinkActive} copiedLink={copiedLink} searchQuery={searchQuery} /></TabsContent>
            <TabsContent value="chill" className="m-0"><LinksTable typeFilter="chill" links={links} onCopy={handleCopy} onToggle={toggleLinkActive} copiedLink={copiedLink} searchQuery={searchQuery} /></TabsContent>
            <TabsContent value="nsfw" className="m-0"><LinksTable typeFilter="nsfw" links={links} onCopy={handleCopy} onToggle={toggleLinkActive} copiedLink={copiedLink} searchQuery={searchQuery} /></TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Créer un nouveau lien">
        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();

          const domain = newLinkType === 'chill' ? 'chillvault.co/v/' : 'passlocker.net/v/';
          const fullUrl = `https://${domain}${newLinkSlug || `generated-${Date.now().toString().slice(-4)}`}`;

          const newLinkId = `link-${Date.now()}`;
          const newLinkItem = {
            id: newLinkId,
            name: newLinkName || "Nouveau Lien",
            url: fullUrl,
            type: newLinkType,
            destination: newLinkDestination || "https://example.com",
            clicks: 0,
            sales: 0,
            earnings: 0,
            conversionRate: 0,
            moderationStatus: 'pending' as const,
            createdAt: new Date().toISOString().split('T')[0],
            active: true
          };

          const newAdminLink = {
            id: newLinkId,
            date: new Date().toISOString().split('T')[0],
            affiliate: "Raph_Affiliate",
            name: newLinkName || "Nouveau Lien",
            campaign: newLinkName || "Nouveau Lien",
            type: newLinkType,
            url: fullUrl,
            destination: newLinkDestination || "https://example.com",
            status: "pending",
            clicks: 0,
            sales: 0,
            earnings: 0,
            conversionRate: 0,
            moderationStatus: 'pending' as const,
            active: true,
            createdAt: new Date().toISOString().split('T')[0]
          };

          addLink(newLinkItem, newAdminLink);
          toast({ message: "Lien soumis pour modération" });

          setNewLinkName("");
          setNewLinkSlug("");
          setNewLinkDestination("");
          setIsModalOpen(false);
        }}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Nom de campagne</label>
            <Input
              placeholder="Ex: Campagne Twitter Média"
              value={newLinkName}
              onChange={(e) => setNewLinkName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Type de lien</label>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${newLinkType === 'chill' ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                onClick={() => setNewLinkType('chill')}
              >
                <div className="font-semibold mb-1 text-primary">Chill (Whop)</div>
                <div className="text-xs text-muted-foreground">Redirection standard vers un produit Whop.</div>
              </div>
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${newLinkType === 'nsfw' ? 'border-pink-500 bg-pink-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                onClick={() => setNewLinkType('nsfw')}
              >
                <div className="font-semibold mb-1 text-pink-500">NSFW Locker</div>
                <div className="text-xs text-muted-foreground">Locker de contenu avec vérification d&apos;âge.</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Slug personnalisé</label>
            <div className="flex items-center">
              <span className="bg-white/5 border border-white/10 border-r-0 rounded-l-md px-3 py-2 text-sm text-muted-foreground h-10 flex items-center">
                {newLinkType === 'chill' ? 'chillvault.co/v/' : 'passlocker.net/v/'}
              </span>
              <Input
                className="rounded-l-none border-l-0"
                placeholder="mon-slug"
                value={newLinkSlug}
                onChange={(e) => setNewLinkSlug(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">URL de destination finale</label>
            <Input
              type="url"
              placeholder="https://..."
              value={newLinkDestination}
              onChange={(e) => setNewLinkDestination(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Annuler</Button>
            <Button type="submit">Générer le lien</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
