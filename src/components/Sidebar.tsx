"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  FolderOpen,
  Building2,
  AlertTriangle,
  ShieldAlert,
  Bot,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    {
      name: "Command Center",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Case Tracker",
      href: "/cases",
      icon: FolderOpen,
    },
    {
      name: "Institution 360°",
      href: "/institutions",
      icon: Building2,
    },
    {
      name: "Overlap Investigation",
      href: "/overlap",
      icon: AlertTriangle,
    },
    {
      name: "SLA Risk Engine",
      href: "/reports",
      icon: ShieldAlert,
    },
    {
      name: "AI Case Copilot",
      href: "/dashboard?copilot=true",
      icon: Bot,
    },
    {
      name: "Reports",
      href: "/reports",
      icon: BarChart3,
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 p-4 space-y-2 sticky top-0 h-screen flex-shrink-0 select-none border-r border-slate-800 z-30">
      {/* Brand Header */}
      <Link href="/dashboard" className="flex items-center gap-3 px-2 py-3 hover:opacity-95 transition">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-sm">
          AI
        </div>
        <div>
          <p className="text-white font-bold leading-tight text-base tracking-tight">AICTE CICC</p>
          <p className="text-[11px] text-slate-400 leading-tight">Case Intelligence Command Center</p>
        </div>
      </Link>

      {/* Navigation List */}
      <nav className="space-y-1.5 mt-3 text-sm flex-1 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && !item.href.includes("?") && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition ${
                isActive
                  ? "bg-[#1d4ed8] text-white shadow-sm font-semibold"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Card with Sign Out & Sign Up */}
      <div className="mt-auto pt-3 bg-slate-800/90 rounded-2xl p-3.5 border border-slate-700/60 shadow-xs space-y-2.5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <p className="text-[11px] text-slate-400 font-medium">Logged in Officer</p>
            </div>
            <p className="text-white font-semibold text-sm mt-0.5">
              {user?.name || "Dr. R. Sharma"}
            </p>
            <p className="text-[11px] text-slate-400">
              {user?.designation || "Coordination Officer"}
            </p>
          </div>
        </div>

        {/* Action Button: Sign Out */}
        <div className="pt-1">
          <Link
            href="/signout"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 hover:border-red-600 rounded-xl text-xs font-semibold transition"
            title="Sign out of AICTE CICC"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
