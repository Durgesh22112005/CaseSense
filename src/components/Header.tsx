"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Bell, ShieldAlert, LogOut, ChevronDown, CheckCircle2, User } from "lucide-react";

export const Header: React.FC = () => {
  const { user, role, switchRole, logout } = useAuth();
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [showRoleDropdown, setShowRoleDropdown] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentDateTime(`${day}-${month}-${year} | ${hours}:${minutes}:${seconds} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const roles: UserRole[] = [
    "Coordination Officer",
    "PGRC Officer",
    "RB Officer",
    "Regional Officer",
    "Admin",
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-none">
      {/* Official Government Top Bar */}
      <div className="bg-[#0b1a30] text-gray-200 text-xs px-6 py-1.5 flex justify-between items-center border-b border-blue-950 font-sans">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white tracking-wider">
            GOVERNMENT OF INDIA
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-300">MINISTRY OF EDUCATION</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-300">ALL INDIA COUNCIL FOR TECHNICAL EDUCATION</span>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <span>{currentDateTime || "25-10-2026 | 21:30:00 IST"}</span>
          <span className="bg-red-900/60 text-red-200 px-2 py-0.5 rounded text-[11px] font-mono border border-red-800">
            SECURE INTRANET
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Emblem representation */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded border border-gray-300 bg-white flex flex-col items-center justify-center p-1 text-center shadow-xs">
              <span className="text-[10px] font-bold text-[#0B4F9C] leading-none tracking-tighter">
                AICTE
              </span>
              <span className="text-[7px] text-gray-500 font-serif leading-none mt-0.5">
                NEW DELHI
              </span>
            </div>
            <div>
              <h1 className="text-base font-bold text-[#0F1E36] leading-tight tracking-tight">
                Integrated Institution Complaint Monitoring and Status Dashboard
              </h1>
              <p className="text-xs text-gray-600">
                Single-Window Cross-Bureau Redressal, Compliance & Overlap Detection System
              </p>
            </div>
          </div>
        </div>

        {/* Right Action & Profile controls */}
        <div className="flex items-center gap-3">
          {/* Overlap notification trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-[#0B4F9C] hover:bg-gray-100 rounded-md transition-colors"
              title="Bureau Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50 text-xs text-gray-700">
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 font-semibold text-[#0F1E36] flex items-center justify-between">
                  <span>Bureau Alerts (3)</span>
                  <span className="text-[11px] text-red-600 font-medium">Critical</span>
                </div>
                <div className="divide-y divide-gray-100">
                  <Link
                    href="/overlap"
                    onClick={() => setShowNotifications(false)}
                    className="block p-3 hover:bg-amber-50"
                  >
                    <p className="font-semibold text-red-800">Potential Overlap Detected</p>
                    <p className="text-gray-600 mt-0.5">
                      Sunrise Institute of Technology (PID: 1-43928104) has parallel cases in PGRC and RB.
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">18-10-2026 14:20 IST</p>
                  </Link>
                  <Link
                    href="/cases/case-05"
                    onClick={() => setShowNotifications(false)}
                    className="block p-3 hover:bg-red-50"
                  >
                    <p className="font-semibold text-red-700">SLA Breach Escalation</p>
                    <p className="text-gray-600 mt-0.5">
                      Case #AICTE/RB/2026/01244 overdue by 27 days. Escalated to Member Secretary.
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">16-10-2026 10:15 IST</p>
                  </Link>
                </div>
                <div className="p-2 text-center bg-gray-50 border-t border-gray-200">
                  <Link
                    href="/overlap"
                    onClick={() => setShowNotifications(false)}
                    className="text-[#0B4F9C] font-medium hover:underline text-xs"
                  >
                    View All 14 Overlap Alerts
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher for Evaluator Convenience */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-300 rounded-md text-xs font-medium text-[#0F1E36] hover:bg-gray-200 transition"
            >
              <User className="w-3.5 h-3.5 text-[#0B4F9C]" />
              <span>Role: <strong className="text-[#0B4F9C]">{role}</strong></span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-50 text-xs">
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 text-gray-500 font-medium">
                  Switch Active Role (Demo)
                </div>
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-blue-50 transition ${
                      role === r ? "bg-blue-50/80 font-bold text-[#0B4F9C]" : "text-gray-700"
                    }`}
                  >
                    <span>{r}</span>
                    {role === r && <CheckCircle2 className="w-3.5 h-3.5 text-[#0B4F9C]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Info */}
          <div className="text-right border-l border-gray-200 pl-3">
            <p className="text-xs font-semibold text-gray-900 leading-tight">
              {user?.name}
            </p>
            <p className="text-[11px] text-gray-500 leading-tight">
              {user?.designation}
            </p>
          </div>

          {/* Logout */}
          <Link
            href="/login"
            onClick={logout}
            className="p-2 text-gray-500 hover:text-red-700 hover:bg-gray-100 rounded-md transition"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};
