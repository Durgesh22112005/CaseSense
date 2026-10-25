"use client";

import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";
import {
  Sparkles,
  Info,
  X,
  Users,
  Compass,
  ChevronDown,
  Shield,
  LogIn,
  Lock,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  // Selected authorized officer role
  const [selectedRole, setSelectedRole] = useState<UserRole>("Coordination Officer");
  const [identifier, setIdentifier] = useState<string>("dr.r.sharma@aicte-india.org");
  const [password, setPassword] = useState<string>("••••••••••••");
  const [language, setLanguage] = useState<string>("English");
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(true);

  // Pre-provisioned authorized AICTE officer credentials
  const roleProfiles: Record<UserRole, { email: string; name: string; designation: string }> = {
    "Coordination Officer": {
      email: "dr.r.sharma@aicte-india.org",
      name: "Dr. R. Sharma",
      designation: "Coordination Officer (CICC Cell)",
    },
    "RB Officer": {
      email: "rk.srivastava@aicte-india.org",
      name: "Shri R. K. Srivastava",
      designation: "Regulation Bureau (RB)",
    },
    "PGRC Officer": {
      email: "sunita.deshmukh@aicte-india.org",
      name: "Dr. Sunita Deshmukh",
      designation: "Public Grievance Redressal Cell",
    },
    "Regional Officer": {
      email: "alok.verma@aicte-india.org",
      name: "Dr. Alok Verma",
      designation: "Western Regional Office",
    },
    Admin: {
      email: "member.secretary@aicte-india.org",
      name: "Prof. (Dr.) Rajive Kumar",
      designation: "Member Secretary / Admin",
    },
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole;
    setSelectedRole(newRole);
    setIdentifier(roleProfiles[newRole]?.email || "");
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login(identifier, selectedRole);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dcfce7]/60 via-[#f0fdf4]/50 to-[#e0f2fe]/60 flex flex-col justify-between font-sans text-slate-800 relative selection:bg-emerald-100">
      {/* Top Center Title matching reference */}
      <div className="pt-6 px-4 text-center">
        <h1 className="text-xs sm:text-sm font-medium text-slate-700 tracking-wide">
          AICTE Integrated Institution Complaint Monitoring & Status Dashboard
        </h1>
      </div>

      {/* Main Login Card Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md sm:max-w-lg bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-sm space-y-5">
          {/* Card Header */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Welcome
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sign in to access your authorized officer dashboard
            </p>
          </div>

          {/* Prototype Mode Banner matching reference */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-blue-900 block text-xs">Prototype Mode</span>
              <p className="text-blue-800 text-[11px] mt-0.5">
                External registration is restricted. Pre-provisioned officer credentials are authenticated directly against the AICTE directory. Select your designated role below and click <strong>&quot;Sign In&quot;</strong>.
              </p>
            </div>
          </div>

          {/* LOGIN FORM (No sign-up option) */}
          <form onSubmit={handleSignIn} className="space-y-4 text-xs">
            {/* Select Role */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Select Authorized Role
              </label>
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={handleRoleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition cursor-pointer font-medium"
                >
                  <option value="Coordination Officer">
                    Coordination Officer (Dr. R. Sharma)
                  </option>
                  <option value="RB Officer">
                    Regulation Bureau Officer (Shri R. K. Srivastava)
                  </option>
                  <option value="PGRC Officer">
                    PGRC Officer (Dr. Sunita Deshmukh)
                  </option>
                  <option value="Regional Officer">
                    Regional Officer (Dr. Alok Verma)
                  </option>
                  <option value="Admin">
                    Member Secretary / Admin (Prof. Rajive Kumar)
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Email / Official ID / Mobile */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Email / Official NIC ID / Mobile
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your official identifier"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition font-mono text-[11px]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your security credentials"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition"
                required
              />
            </div>

            {/* Language */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिन्दी)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Sign In Primary Action Button matching template */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#529367] hover:bg-[#437d55] text-white rounded-xl font-semibold text-sm transition shadow-xs flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </div>

            {/* Secondary Actions matching template */}
            <div className="flex items-center justify-between text-xs pt-1 px-1">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="font-semibold text-[#4d8b62] hover:underline flex items-center gap-1"
              >
                <span>Login with OTP</span>
              </button>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" /> Authorized Officers Only
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Footer matching reference template */}
      <footer className="pb-6 px-4 text-center">
        <p className="text-[11px] text-slate-400">
          Powered by AI • Integrated AICTE Inter-Bureau Coordination • Secure & Authorized Access Only
        </p>
      </footer>

      {/* Floating Project Info button to reopen Welcome modal if closed */}
      {!isWelcomeModalOpen && (
        <button
          onClick={() => setIsWelcomeModalOpen(true)}
          className="fixed bottom-4 right-4 bg-white/90 hover:bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full shadow-md text-xs font-medium flex items-center gap-1.5 transition z-30"
          title="View SIH Project Information"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Project Info</span>
        </button>
      )}

      {/* POPUP MODAL matching reference template */}
      {isWelcomeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              onClick={() => setIsWelcomeModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Welcome to AICTE Case Intelligence
              </h2>
            </div>

            {/* Section 1: SIH 2026 Details (Green Box) */}
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Smart India Hackathon 2026</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-y-1.5 text-slate-700 text-[11px] pt-1">
                <span className="font-semibold text-slate-500">Problem ID:</span>
                <span className="font-semibold text-slate-900">SIH2026 / AICTE-CICC</span>

                <span className="font-semibold text-slate-500">Project:</span>
                <span className="font-medium text-slate-900 leading-tight">
                  Integrated Institution Complaint Monitoring & Status Dashboard
                </span>

                <span className="font-semibold text-slate-500">Status:</span>
                <span className="font-bold text-emerald-700">Prototype Active</span>
              </div>
            </div>

            {/* Section 2: Development Team (Blue Box) */}
            <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Development Team</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-y-1 text-slate-700 text-[11px] pt-1">
                <span className="font-semibold text-slate-500">Team Name:</span>
                <span className="font-semibold text-slate-900">Prototype Pixel</span>

                <span className="font-semibold text-slate-500">Target Dept:</span>
                <span className="font-medium text-slate-900">
                  AICTE Regulation Bureau & PGRC Cell
                </span>
              </div>
            </div>

            {/* Section 3: Explore the Prototype (Pink/Purple Box) */}
            <div className="bg-[#fdf2f8] border border-[#fbcfe8] rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 text-pink-900 font-bold">
                <Shield className="w-4 h-4 text-pink-600" />
                <span>Explore the Prototype</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 text-[11px] pt-0.5">
                <li className="flex items-start gap-1.5">
                  <span className="text-pink-600 font-bold">•</span>
                  <span>Cross-bureau overlap detection across RB, PGRC, and Regional Desks</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-pink-600 font-bold">•</span>
                  <span>
                    <strong>AI Case Copilot:</strong> Explainable advisory engine for coordination decisions
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-pink-600 font-bold">•</span>
                  <span>Institution 360° risk telemetry and multi-channel audit trail</span>
                </li>
              </ul>
            </div>

            {/* Modal Action Button matching template */}
            <div className="pt-2">
              <button
                onClick={() => setIsWelcomeModalOpen(false)}
                className="w-full py-3 bg-[#15803d] hover:bg-[#166534] text-white rounded-xl font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2"
              >
                <span>Got it! Let&apos;s Explore</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading portal...</div>}>
      <LoginForm />
    </Suspense>
  );
}
