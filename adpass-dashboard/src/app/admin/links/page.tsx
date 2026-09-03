"use client";

import { useState } from "react";
import { ExternalLink, Check, X, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { useLinksStore } from "@/lib/store";
import { toast } from "@/components/ui/use-toast";

export default function AdminLinksPage() {
  const { adminLinks, updateLinkStatus } = useLinksStore();
  const [activeTab, setActiveTab] = useState("pending");
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleApprove = (id: string) => {
    updateLinkStatus(id, "active");
    toast({ message: "Statut du lien mis à jour" });
  };

  const openRejectModal = (id: string) => {
    setSelectedLinkId(id);
    setRejectReason("");
    setRejectModalOpen(true);
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLinkId) {
      updateLinkStatus(selectedLinkId, "rejected");
      toast({ message: "Statut du lien mis à jour" });
      setRejectModalOpen(false);
    }
  };

  const renderTable = (filterStatus: string) => {
    let filtered = adminLinks.filter((l) => l.status === filterStatus);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((l) =>
        (l.affiliate?.toLowerCase().includes(q)) ||
        (l.campaign?.toLowerCase().includes(q)) ||
        (l.destination?.toLowerCase().includes(q))
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow className="border-rose-500/10 hover:bg-transparent">
            <TableHead>Date</TableHead>
            <TableHead>Affilié</TableHead>
            <TableHead>Campagne</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Domaine/Slug</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Aucun lien trouvé dans cette catégorie.</TableCell>
            </TableRow>
          ) : filtered.map((link) => (
            <TableRow key={link.id} className="border-rose-500/10 hover:bg-white/5">
              <TableCell className="text-xs text-muted-foreground">{link.date}</TableCell>
              <TableCell className="font-medium">{link.affiliate}</TableCell>
              <TableCell>{link.campaign}</TableCell>
              <TableCell>
                <Badge variant={link.type === "nsfw" ? "nsfw" : "outline"} className={link.type === "chill" ? "text-indigo-400 border-indigo-400/30 bg-indigo-400/10" : "bg-rose-500/10 text-rose-400 border-rose-500/30"}>
                  {link.type.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="font-mono text-xs">{link.url}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 border-white/10" onClick={() => window.open(link.destination, '_blank')}>
                    <ExternalLink className="w-4 h-4 mr-1" /> Tester
                  </Button>
                  {filterStatus === "pending" && (
                    <>
                      <Button variant="success" size="sm" className="h-8 px-2" onClick={() => handleApprove(link.id)}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button variant="danger" size="sm" className="h-8 px-2" onClick={() => openRejectModal(link.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Modération des liens</h1>
        <p className="text-muted-foreground">Validez ou rejetez les liens générés par les affiliés.</p>
      </div>

      <Card className="border-rose-500/20">
        <CardContent className="p-0 sm:p-6">
          <div className="p-4 sm:p-0 mb-6 flex flex-col sm:flex-row justify-between gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-lg w-full sm:w-auto">
                <TabsTrigger value="pending" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">En attente de validation</TabsTrigger>
                <TabsTrigger value="active" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Liens actifs</TabsTrigger>
                <TabsTrigger value="rejected" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Liens rejetés</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Rechercher par affilié, campagne..."
                className="pl-9 bg-white/5 border-white/10 border-rose-500/10 focus:ring-rose-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

            <TabsContent value="pending" className="m-0">{renderTable("pending")}</TabsContent>
            <TabsContent value="active" className="m-0">{renderTable("active")}</TabsContent>
            <TabsContent value="rejected" className="m-0">{renderTable("rejected")}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Modal isOpen={rejectModalOpen} onClose={() => setRejectModalOpen(false)} title="Rejeter le lien">
        <form className="space-y-6" onSubmit={handleReject}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Motif du refus</label>
            <Input
              placeholder="Ex: Contenu ne respectant pas les CGU"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Ce motif sera visible par l&apos;affilié.</p>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button variant="ghost" type="button" onClick={() => setRejectModalOpen(false)}>Annuler</Button>
            <Button variant="danger" type="submit">Confirmer le rejet</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
