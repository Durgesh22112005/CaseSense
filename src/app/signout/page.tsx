"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  CheckCircle2,
  LogIn,
  Shield,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function SignOutPage() {
  const { logout, user } = useAuth();

  // Ensure session is cleared when visiting signout page
  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe]/60 via-[#f0fdf4]/50 to-[#dcfce7]/60 flex flex-col items-center justify-center p-4">
      {/* Container */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 text-white text-center relative">
          <div className="w-14 h-14 mx-auto mb-3 bg-emerald-500/20 border border-emerald-400/40 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold rounded-full border border-emerald-400/30 uppercase tracking-wider mb-2">
            Session Terminated
          </span>
          <h1 className="text-xl font-bold tracking-tight">Signed Out Successfully</h1>
          <p className="text-xs text-slate-300 mt-1">
            AICTE Case Intelligence Command Center (CICC)
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Security Notice Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Government Security Compliance</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your officer session has been safely closed. Any temporary session tokens and advisory queues for{" "}
              <strong className="text-slate-900 font-semibold">{user?.name || "Dr. R. Sharma"}</strong> have been securely cleared from this workstation.
            </p>
          </div>

          {/* Action Cards */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Authentication Portal
            </p>

            {/* Option: Sign In as Authorized Officer */}
            <Link
              href="/login"
              className="flex items-center justify-between p-4 bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-300 rounded-xl text-emerald-950 group transition shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#529367] text-white flex items-center justify-center shadow-xs">
                  <LogIn className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-emerald-950 group-hover:text-emerald-800 transition">
                    Sign In as Authorized Officer
                  </p>
                  <p className="text-xs text-emerald-700/80">
                    Return to login gateway with pre-provisioned security credentials
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          {/* Prototype Footer Note */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Prototype Pixel • SIH 2026</span>
            <Link
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline inline-flex items-center gap-1"
            >
              Command Center Preview <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
