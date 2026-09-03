"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Link as LinkIcon, BarChart3, Wallet, Settings, LogOut, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Mes liens", href: "/links", icon: LinkIcon },
  { name: "Statistiques", href: "/stats", icon: BarChart3 },
  { name: "Paiements", href: "/payouts", icon: Wallet },
  { name: "Réglages", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/10 fixed left-0 top-0 bottom-0 bg-background/95 backdrop-blur-md flex flex-col z-40">
      {/* Logo & Tier */}
      <div className="p-6 flex flex-col gap-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-xl">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">AdPass</span>
        </Link>
        <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Palier</span>
          <Badge variant="default" className="text-[10px] uppercase">Palier Pro — 55%</Badge>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 mt-auto border-t border-white/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold">
            RA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-foreground">Raph_Affiliate</p>
            <p className="text-xs text-muted-foreground truncate">raph@adpass-partner.com</p>
          </div>
          <Link href="/auth" className="text-muted-foreground hover:text-danger transition-colors">
            <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
