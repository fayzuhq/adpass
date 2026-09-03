"use client";

import { useState } from "react";
import { UserX, UserCheck, DollarSign, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { useAffiliatesStore } from "@/lib/store";

export default function AdminAffiliatesPage() {
  const { affiliates, setAffiliates } = useAffiliatesStore();

  const [balanceModalOpen, setBalanceModalOpen] = useState(false);
  const [selectedAffiliateId, setSelectedAffiliateId] = useState<string | null>(null);
  const [balanceAdjustment, setBalanceAdjustment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleToggleSuspend = (id: string) => {
    setAffiliates(affiliates.map(a => {
      if (a.id === id) {
        return { ...a, status: a.status === "active" ? "suspended" : "active" };
      }
      return a;
    }));
  };

  const handleTierChange = (id: string, newTier: string) => {
    setAffiliates(affiliates.map(a => a.id === id ? { ...a, tier: newTier as "Standard" | "Pro" | "Élite" } : a));
  };

  const openBalanceModal = (id: string) => {
    setSelectedAffiliateId(id);
    setBalanceAdjustment("");
    setBalanceModalOpen(true);
  };

  const handleAdjustBalance = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(balanceAdjustment);
    if (selectedAffiliateId && !isNaN(amount)) {
      setAffiliates(affiliates.map(a => {
        if (a.id === selectedAffiliateId) {
          return { ...a, balance: a.balance + amount };
        }
        return a;
      }));
      setBalanceModalOpen(false);
    }
  };

  let filteredAffiliates = affiliates;

  if (statusFilter !== "all") {
    filteredAffiliates = filteredAffiliates.filter(a => a.status === statusFilter);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredAffiliates = filteredAffiliates.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q)
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Gestion des affiliés</h1>
        <p className="text-muted-foreground">Administrez les comptes, ajustez les paliers et les soldes.</p>
      </div>

      <Card className="border-rose-500/20">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Rechercher un pseudo ou email..."
              className="pl-9 bg-white/5 border-white/10 border-rose-500/10 focus:ring-rose-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="bg-black/50 border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-rose-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs uniquement</option>
            <option value="suspended">Suspendus uniquement</option>
          </select>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-rose-500/10 hover:bg-transparent">
                <TableHead>Utilisateur</TableHead>
                <TableHead>Date d&apos;inscription</TableHead>
                <TableHead className="text-right">Liens</TableHead>
                <TableHead className="text-right">Solde</TableHead>
                <TableHead className="text-right">Total généré</TableHead>
                <TableHead>Palier</TableHead>
                <TableHead className="text-center">Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAffiliates.map((affiliate) => (
                <TableRow key={affiliate.id} className="border-rose-500/10 hover:bg-white/5">
                  <TableCell>
                    <div className="font-medium text-foreground">{affiliate.name}</div>
                    <div className="text-xs text-muted-foreground">{affiliate.email}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">{affiliate.date}</TableCell>
                  <TableCell className="text-right font-mono text-xs">{affiliate.links}</TableCell>
                  <TableCell className="text-right font-mono font-medium text-success">{formatCurrency(affiliate.balance)}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground text-xs">{formatCurrency(affiliate.totalGenerated)}</TableCell>
                  <TableCell>
                    <select
                      className="bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:ring-1 focus:ring-rose-500"
                      value={affiliate.tier}
                      onChange={(e) => handleTierChange(affiliate.id, e.target.value)}
                    >
                      <option value="Standard">Standard (40%)</option>
                      <option value="Pro">Pro (55%)</option>
                      <option value="Élite">Élite (65%)</option>
                    </select>
                  </TableCell>
                  <TableCell className="text-center">
                    {affiliate.status === "active" ? (
                      <Badge variant="outline" className="text-success border-success/30 bg-success/10">Actif</Badge>
                    ) : (
                      <Badge variant="outline" className="text-danger border-danger/30 bg-danger/10">Suspendu</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 px-2 border-white/10" onClick={() => openBalanceModal(affiliate.id)}>
                        <DollarSign className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={affiliate.status === "active" ? "outline" : "success"}
                        size="sm"
                        className={`h-8 px-2 ${affiliate.status === "active" ? "text-danger hover:text-danger border-white/10" : ""}`}
                        onClick={() => handleToggleSuspend(affiliate.id)}
                        title={affiliate.status === "active" ? "Suspendre" : "Réactiver"}
                      >
                        {affiliate.status === "active" ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal isOpen={balanceModalOpen} onClose={() => setBalanceModalOpen(false)} title="Ajuster le solde">
        <form className="space-y-6" onSubmit={handleAdjustBalance}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Montant à ajuster (en €)</label>
            <Input
              type="number"
              step="0.01"
              placeholder="Ex: 50.00 ou -20.00"
              value={balanceAdjustment}
              onChange={(e) => setBalanceAdjustment(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Utilisez une valeur négative pour débiter.</p>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button variant="ghost" type="button" onClick={() => setBalanceModalOpen(false)}>Annuler</Button>
            <Button variant="default" className="bg-rose-600 hover:bg-rose-700 text-white" type="submit">Confirmer l&apos;ajustement</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
