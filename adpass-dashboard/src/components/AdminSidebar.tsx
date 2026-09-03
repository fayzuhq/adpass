"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Link as LinkIcon, Users, Wallet, Settings, LogOut, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLinksStore, usePayoutsStore } from "@/lib/store";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { adminLinks } = useLinksStore();
  const { adminPayouts } = usePayoutsStore();

  const pendingLinksCount = adminLinks.filter((l) => l.status === "pending").length;
  const pendingPayoutsCount = adminPayouts.filter((p) => p.status === "pending").length;

  const navigation = [
    { name: "Vue d'ensemble", href: "/admin", icon: LayoutDashboard },
    { name: "Modération des liens", href: "/admin/links", icon: LinkIcon, badge: pendingLinksCount > 0 ? pendingLinksCount : undefined },
    { name: "Gestion des affiliés", href: "/admin/affiliates", icon: Users },
    { name: "Demandes de retraits", href: "/admin/payouts", icon: Wallet, badge: pendingPayoutsCount > 0 ? pendingPayoutsCount : undefined, badgeColor: "orange" },
    { name: "Configuration", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-white/10 fixed left-0 top-0 bottom-0 bg-[#07080B] flex flex-col z-40">
      {/* Logo & Badge */}
      <div className="p-6 flex flex-col gap-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="bg-rose-500 p-2 rounded-xl">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">AdPass</span>
        </Link>
        <div className="flex justify-center">
          <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-[0_0_15px_rgba(244,63,94,0.15)]">
            ADMIN COCKPIT
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
                isActive
                  ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground border border-transparent"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-rose-500" : "")} />
              <span className="flex-1">{item.name}</span>

              {item.badge && (
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center",
                  item.badgeColor === "orange"
                    ? "bg-orange-500/20 text-orange-500 border border-orange-500/30"
                    : "bg-rose-500/20 text-rose-500 border border-rose-500/30"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 mt-auto border-t border-white/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white font-bold shadow-[0_0_10px_rgba(244,63,94,0.3)]">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-foreground text-rose-100">Super Admin</p>
            <p className="text-xs text-muted-foreground truncate">admin@adpass.co</p>
          </div>
          <Link href="/auth" className="text-muted-foreground hover:text-rose-500 transition-colors">
            <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
