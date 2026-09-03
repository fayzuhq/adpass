"use client";

import { useState } from "react";
import { Wallet, ArrowUpRight, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { formatCurrency } from "@/lib/utils";
import { mockPayouts } from "@/lib/mockData";
import { usePayoutsStore } from "@/lib/store";

export default function PayoutsPage() {
  const { history, addPayoutRequest } = usePayoutsStore();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [cryptoSelect, setCryptoSelect] = useState<"USDT" | "LTC">("USDT");
  const [walletAddress, setWalletAddress] = useState("");

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseFloat(withdrawAmount) < 20) return;

    const newId = `wd-${Date.now()}`;
    const date = new Date().toISOString().split("T")[0];
    const amount = parseFloat(withdrawAmount);

    const newRequest = {
      id: newId,
      date,
      amount,
      crypto: cryptoSelect,
      address: walletAddress.substring(0, 4) + "..." + walletAddress.substring(walletAddress.length - 4),
      status: "pending"
    };

    const newAdminRequest = {
      id: newId,
      date,
      affiliate: "Raph_Affiliate",
      amount,
      crypto: cryptoSelect,
      wallet: walletAddress,
      status: "pending"
    };

    addPayoutRequest(newRequest, newAdminRequest);
    setIsWithdrawModalOpen(false);
    setWithdrawAmount("");
    setWalletAddress("");
  };

  const StatusIcon = ({ status }: { status: string }) => {
    switch(status) {
      case 'completed': return <Badge variant="success" className="gap-1 bg-success/20 text-success hover:bg-success/30"><CheckCircle2 className="w-3 h-3" /> Validé</Badge>;
      case 'pending': return <Badge variant="warning" className="gap-1 bg-orange-500/20 text-orange-500 hover:bg-orange-500/30"><Clock className="w-3 h-3" /> En attente</Badge>;
      case 'rejected': return <Badge variant="danger" className="gap-1 bg-danger/20 text-danger hover:bg-danger/30"><XCircle className="w-3 h-3" /> Rejeté</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Paiements</h1>
          <p className="text-muted-foreground">Gérez vos retraits et consultez l&apos;historique.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-success/30 bg-success/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-success flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Solde disponible (retirable)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="text-4xl font-bold font-mono text-white">
                {formatCurrency(mockPayouts.available)}
              </div>
              <Button onClick={() => setIsWithdrawModalOpen(true)} className="w-full sm:w-auto bg-success hover:bg-success/90 text-white">
                <ArrowUpRight className="w-4 h-4 mr-2" /> Demander un retrait
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-500 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Solde en attente (validation)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-mono text-white/80">
              {formatCurrency(mockPayouts.pending)}
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> En cours de vérification par nos équipes.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Historique des retraits
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Adresse (Tronquée)</TableHead>
                <TableHead className="text-center">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="text-muted-foreground">{new Date(req.date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell className="font-mono font-medium text-foreground">{formatCurrency(req.amount)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-white/5">{req.crypto}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{req.address}</TableCell>
                  <TableCell className="text-center">
                    <StatusIcon status={req.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} title="Demander un retrait">
        <form onSubmit={handleWithdrawSubmit} className="space-y-6">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="text-primary w-5 h-5 shrink-0" />
            <p className="text-sm text-primary/90">Le seuil minimum de retrait est de 20,00 €. Les paiements sont traités sous 24 à 48h.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Montant à retirer (€)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 font-mono text-muted-foreground">€</span>
              <Input
                type="number"
                min="20"
                max={mockPayouts.available}
                step="0.01"
                required
                className="pl-8 font-mono"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Cryptomonnaie</label>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${cryptoSelect === 'USDT' ? 'border-success bg-success/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                onClick={() => setCryptoSelect('USDT')}
              >
                <div className="font-bold flex items-center justify-between">USDT <Badge variant="outline" className="text-[10px]">TRC-20</Badge></div>
              </div>
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${cryptoSelect === 'LTC' ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                onClick={() => setCryptoSelect('LTC')}
              >
                <div className="font-bold flex items-center justify-between">Litecoin <Badge variant="outline" className="text-[10px]">LTC</Badge></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Adresse du portefeuille ({cryptoSelect})</label>
            <Input
              type="text"
              required
              className="font-mono text-sm"
              placeholder={`Ex: ${cryptoSelect === 'USDT' ? 'T...' : 'L...'}`}
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button variant="ghost" type="button" onClick={() => setIsWithdrawModalOpen(false)}>Annuler</Button>
            <Button type="submit" variant="success">Confirmer le retrait</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
