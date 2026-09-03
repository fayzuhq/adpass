"use client";

import { useState } from "react";
import { Check, X, Copy, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { mockAdminPayouts } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState(mockAdminPayouts);
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);

  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedPayoutId, setSelectedPayoutId] = useState<string | null>(null);
  const [txid, setTxid] = useState("");

  const handleCopy = (wallet: string) => {
    navigator.clipboard.writeText(wallet);
    setCopiedWallet(wallet);
    setTimeout(() => setCopiedWallet(null), 2000);
  };

  const openPayModal = (id: string) => {
    setSelectedPayoutId(id);
    setTxid("");
    setPayModalOpen(true);
  };

  const handleMarkPaid = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPayoutId) {
      setPayouts(payouts.map(p => p.id === selectedPayoutId ? { ...p, status: "paid" } : p));
      setPayModalOpen(false);
    }
  };

  const handleReject = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir rejeter cette demande ? Le solde sera recrédité à l'affilié.")) {
      setPayouts(payouts.map(p => p.id === id ? { ...p, status: "rejected" } : p));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Demandes de retraits</h1>
        <p className="text-muted-foreground">Traitez et validez les paiements crypto des affiliés.</p>
      </div>

      <Card className="border-rose-500/20">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-rose-500/10 hover:bg-transparent">
                <TableHead>Date</TableHead>
                <TableHead>Affilié</TableHead>
                <TableHead className="text-right">Montant</TableHead>
                <TableHead>Réseau Crypto</TableHead>
                <TableHead>Adresse Wallet</TableHead>
                <TableHead className="text-center">Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map((payout) => (
                <TableRow key={payout.id} className="border-rose-500/10 hover:bg-white/5">
                  <TableCell className="text-xs text-muted-foreground">{payout.date}</TableCell>
                  <TableCell className="font-medium text-foreground">{payout.affiliate}</TableCell>
                  <TableCell className="text-right font-mono font-bold text-rose-100">{formatCurrency(payout.amount)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-indigo-300 border-indigo-400/30">
                      {payout.crypto}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground bg-black/30 px-2 py-1 rounded w-24 truncate">
                        {payout.wallet}
                      </span>
                      <button
                        onClick={() => handleCopy(payout.wallet)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        title="Copier l'adresse"
                      >
                        {copiedWallet === payout.wallet ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {payout.status === "pending" && <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/10">En attente</Badge>}
                    {payout.status === "paid" && <Badge variant="outline" className="text-success border-success/30 bg-success/10">Payé</Badge>}
                    {payout.status === "rejected" && <Badge variant="outline" className="text-danger border-danger/30 bg-danger/10">Rejeté</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    {payout.status === "pending" && (
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="success" size="sm" className="h-8 px-2" onClick={() => openPayModal(payout.id)} title="Marquer comme payé">
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button variant="danger" size="sm" className="h-8 px-2" onClick={() => handleReject(payout.id)} title="Rejeter">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal isOpen={payModalOpen} onClose={() => setPayModalOpen(false)} title="Confirmer le paiement">
        <form className="space-y-6" onSubmit={handleMarkPaid}>
          <div className="space-y-2">
            <label className="text-sm font-medium">TXID / Hash de transaction (Optionnel)</label>
            <Input
              placeholder="Ex: 0x123abc..."
              value={txid}
              onChange={(e) => setTxid(e.target.value)}
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">Fournir le TXID aide l&apos;affilié à suivre son paiement sur la blockchain.</p>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button variant="ghost" type="button" onClick={() => setPayModalOpen(false)}>Annuler</Button>
            <Button variant="success" type="submit">Confirmer le paiement</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
