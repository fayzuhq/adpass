"use client";

import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import { useSettingsStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { maintenanceMode } = useSettingsStore();

  const publicRoutes = ['/', '/auth', '/cgu', '/confidentialite', '/mentions-legales', '/docs', '/contact', '/maintenance'];
  const isPublicPage = publicRoutes.includes(pathname);
  const isAdminPage = pathname.startsWith("/admin");
  const isMaintenancePage = pathname === "/maintenance";

  useEffect(() => {
    if (maintenanceMode && !isAdminPage && !isPublicPage && !isMaintenancePage) {
      router.push("/maintenance");
    }
  }, [maintenanceMode, isAdminPage, isPublicPage, isMaintenancePage, router, pathname]);

  if (isPublicPage || isMaintenancePage) {
    return (
      <main className="flex-1 w-full min-h-screen flex flex-col">
        {children}
      </main>
    );
  }

  if (isAdminPage) {
    return (
      <>
        <AdminSidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-10 ml-64 overflow-y-auto min-h-screen selection:bg-rose-500/30">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 lg:p-10 ml-64 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </>
  );
}
