"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AdminSidebar from "@/components/AdminSidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage = pathname === "/" || pathname === "/auth";
  const isAdminPage = pathname.startsWith("/admin");

  if (isPublicPage) {
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
