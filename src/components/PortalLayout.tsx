"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";

export const PortalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signout";

  if (isAuthPage) {
    return <main className="min-h-screen bg-slate-100">{children}</main>;
  }

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
