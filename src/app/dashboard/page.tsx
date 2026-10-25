"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { AICaseCopilot } from "@/components/copilot/AICaseCopilot";
import {
  AlertTriangle,
  FileText,
  Clock,
  RotateCw,
  CheckCircle,
  ArrowRightLeft,
  ShieldAlert,
  ArrowUpRight,
  ExternalLink,
  Users,
  Check,
  Calendar,
  Filter,
  Sparkles,
  Bot,
  Plus,
  Building2,
  ChevronRight,
  X,
  LogOut,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const { logout } = useAuth();
  const [coordinationAssigned, setCoordinationAssigned] = useState<boolean>(false);
  const [selectedOwner, setSelectedOwner] = useState<string>("Smt. Jayashree Ramanathan (Coordination Officer)");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [isCopilotDrawerOpen, setIsCopilotDrawerOpen] = useState<boolean>(false);
  const [copilotDecision, setCopilotDecision] = useState<string>("");

  // Workload chart data matching reference
  const workloadData = [
    { bureau: "PGRC", pending: 120, underProcess: 180, disposed: 160 },
    { bureau: "RB", pending: 95, underProcess: 150, disposed: 130 },
    { bureau: "Regional Office", pending: 60, underProcess: 90, disposed: 80 },
    { bureau: "Other Bureaus", pending: 37, underProcess: 66, disposed: 51 },
  ];

  const handleAssignOwner = () => {
    setCoordinationAssigned(true);
    setIsAssignModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-12">
      {/* Topbar matching reference */}
      <header className="glass border-b border-slate-200 px-5 py-3 flex items-center justify-between sticky top-0 z-20 bg-white/95 backdrop-blur-md">
        <div>
          <h1 className="font-bold text-lg text-slate-900 leading-tight">Command Center</h1>
          <p className="text-xs text-slate-500">
            Real-time monitoring of institution complaints across RB, PGRC and Bureaus
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/overlap"
            className="hidden xl:flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs hover:border-red-300 transition"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full pulse-dot"></span>
            <span className="text-xs font-semibold text-red-600">7 Active Coordination Alerts</span>
          </Link>

          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Register Complaint</span>
          </button>



          {/* Direct Sign Out Navigation */}
          <Link
            href="/signout"
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 hover:border-red-300 rounded-xl text-xs font-semibold transition shadow-xs"
            title="Sign Out of Portal"
          >
            <LogOut className="w-3.5 h-3.5 text-red-600" />
            <span>Sign Out</span>
          </Link>
        </div>
      </header>

      <div className="p-5 space-y-6 max-w-7xl mx-auto">
        {/* Hero Alert matching reference */}
        <section className="bg-white rounded-3xl border border-red-200 glow-red p-5 transition">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[11px] font-black px-2 py-1 rounded-lg tracking-wider">
                  PRIORITY
                </span>
                <h2 className="font-bold text-red-700 text-lg">Cross-Bureau Overlap Detected</h2>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                <strong>Sunrise Institute of Technology</strong> has active cases in both{" "}
                <strong>PGRC</strong> and <strong>Regulation Bureau</strong>.
              </p>

              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
                  AICTE ID Match: 100%
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
                  Name Similarity: 94%
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
                  Location Match: Yes
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
                  Text Similarity: 81%
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/overlap"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-xs flex items-center gap-1.5"
              >
                <span>Open Investigation</span>
              </Link>
              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold transition shadow-xs"
              >
                {coordinationAssigned ? `Assigned to ${selectedOwner.split(" ")[1]}` : "Assign Coordination Owner"}
              </button>
            </div>
          </div>
        </section>

        {/* KPI Strip matching reference */}
        <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 font-medium">Total Cases</p>
            <p className="text-2xl font-black text-slate-900 mt-1">1,284</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 font-medium">Pending</p>
            <p className="text-2xl font-black text-amber-600 mt-1">312</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 font-medium">Under Process</p>
            <p className="text-2xl font-black text-blue-600 mt-1">486</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 font-medium">Disposed</p>
            <p className="text-2xl font-black text-green-600 mt-1">421</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 font-medium">SLA Breach</p>
            <p className="text-2xl font-black text-red-600 mt-1">20</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 font-medium">Overlap Alerts</p>
            <p className="text-2xl font-black text-orange-600 mt-1">7</p>
          </div>
        </section>

        {/* 2-Column Section: Coordination Queue + Embedded AI Case Copilot */}
        <section className="grid xl:grid-cols-3 gap-6">
          {/* Coordination Queue */}
          <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Today&apos;s Coordination Queue</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  AI-ranked cases requiring immediate officer attention
                </p>
              </div>
              <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold border border-blue-100">
                Auto-prioritized
              </span>
            </div>

            <div className="space-y-3">
              {/* Card 1: Risk 92 */}
              <div className="border border-red-200 bg-red-50 rounded-2xl p-4 hover:shadow-xs transition">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <Link
                      href="/cases/case-02"
                      className="font-semibold text-sm text-slate-900 hover:text-blue-600 hover:underline"
                    >
                      RB-2026-2210 • Sunrise Institute of Technology
                    </Link>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Norms Violation • RB • Pending beyond timeline
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-red-600 text-white px-2 py-1 rounded-lg">
                    RISK 92
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 font-medium">
                  Overlap with PGRC-2026-1042. Joint review recommended.
                </p>
              </div>

              {/* Card 2: Risk 74 */}
              <div className="border border-amber-200 bg-amber-50 rounded-2xl p-4 hover:shadow-xs transition">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <Link
                      href="/cases/case-01"
                      className="font-semibold text-sm text-slate-900 hover:text-blue-600 hover:underline"
                    >
                      PGRC-2026-1188 • Global Engineering College
                    </Link>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Fee Complaint • PGRC • Approaching deadline
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-amber-500 text-white px-2 py-1 rounded-lg">
                    RISK 74
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 font-medium">
                  Similar complaint detected from another stakeholder.
                </p>
              </div>

              {/* Card 3: Risk 58 */}
              <div className="border border-blue-200 bg-blue-50 rounded-2xl p-4 hover:shadow-xs transition">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <Link
                      href="/cases/case-04"
                      className="font-semibold text-sm text-slate-900 hover:text-blue-600 hover:underline"
                    >
                      RO-2026-0451 • Nova Technical Institute
                    </Link>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Faculty Grievance • Regional Office • Transferred
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-blue-600 text-white px-2 py-1 rounded-lg">
                    RISK 58
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 font-medium">
                  Awaiting acknowledgment from concerned Regional Office.
                </p>
              </div>
            </div>
          </div>

          {/* AI Case Copilot embedded card matching reference */}
          <div className="bg-slate-900 text-slate-200 rounded-3xl p-5 flex flex-col justify-between shadow-xs border border-slate-800">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold leading-tight">AI Case Copilot</h3>
                    <p className="text-[11px] text-slate-400">Explainable decision support</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCopilotDrawerOpen(true)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium underline flex items-center gap-1"
                  title="Expand Interactive Copilot Drawer"
                >
                  <span>Expand</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-slate-800 rounded-2xl p-4 text-sm space-y-3 border border-slate-700/60">
                <p className="text-white font-semibold">Case: RB-2026-2210</p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  <span className="text-blue-400 font-semibold">Summary:</span> Complaint alleges
                  violation of AICTE norms at Sunrise Institute of Technology.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  <span className="text-amber-400 font-semibold">Overlap:</span> PGRC case for the
                  same institution is active.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  <span className="text-green-400 font-semibold">Suggested action:</span> Link cases,
                  appoint coordination owner, and schedule joint verification.
                </p>
              </div>
            </div>

            <div>
              {copilotDecision && (
                <div className="p-2 mb-2 bg-blue-900/60 border border-blue-500 rounded-xl text-blue-200 text-xs text-center font-medium">
                  {copilotDecision}
                </div>
              )}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    setCopilotDecision("Recommendation Accepted. Action recorded in case history.")
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => setCopilotDecision("Recommendation Rejected by officer.")}
                  className="bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-xl text-sm font-semibold transition"
                >
                  Reject
                </button>
              </div>

              <p className="text-[11px] text-slate-400 mt-3 text-center leading-tight">
                AI recommendations are advisory. Authorized officers retain final decision authority.
              </p>
            </div>
          </div>
        </section>

        {/* Charts Section matching reference */}
        <section className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 lg:col-span-2 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 mb-4">
              Bureau Workload & Disposal Performance
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workloadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="bureau" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "11px",
                      border: "none",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="underProcess" fill="#3b82f6" name="Under Process" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="disposed" fill="#22c55e" name="Disposed" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 mb-4">Region-wise Risk Heatmap</h3>
            <div className="grid grid-cols-2 gap-3 text-center text-xs font-semibold">
              <div className="bg-red-100 text-red-700 rounded-xl p-4">
                Southern
                <br />
                <span className="text-lg font-black mt-1 block">High</span>
              </div>
              <div className="bg-amber-100 text-amber-700 rounded-xl p-4">
                Western
                <br />
                <span className="text-lg font-black mt-1 block">Medium</span>
              </div>
              <div className="bg-green-100 text-green-700 rounded-xl p-4">
                Northern
                <br />
                <span className="text-lg font-black mt-1 block">Low</span>
              </div>
              <div className="bg-amber-100 text-amber-700 rounded-xl p-4">
                Eastern
                <br />
                <span className="text-lg font-black mt-1 block">Medium</span>
              </div>
            </div>
          </div>
        </section>

        {/* Institution 360 Risk Profile section matching reference */}
        <section className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Institution 360° Risk Profile</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Sunrise Institute of Technology • AICTE Permanent ID: 1-496299171 • Pune / Western Region
              </p>
            </div>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
              HIGH RISK
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Active Cases</p>
              <p className="text-2xl font-black text-slate-900 mt-1">3</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Repeat Categories</p>
              <p className="text-2xl font-black text-slate-900 mt-1">2</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Bureaus Involved</p>
              <p className="text-2xl font-black text-blue-600 mt-1">2</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Coordination Alerts</p>
              <p className="text-2xl font-black text-orange-600 mt-1">1</p>
            </div>
          </div>

          <div className="mt-5 grid lg:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            <div>
              <h4 className="font-semibold text-sm text-slate-900 mb-3">Case Movement Timeline</h4>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-slate-800 text-xs sm:text-sm">
                      PGRC complaint received
                    </p>
                    <p className="text-xs text-slate-500">12 Oct 2026 • Ragging & fee complaint registered</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-amber-500 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-slate-800 text-xs sm:text-sm">
                      Assigned for verification
                    </p>
                    <p className="text-xs text-slate-500">13 Oct 2026 • PGRC desk officer assigned</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-red-600 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-slate-800 text-xs sm:text-sm">RB case detected</p>
                    <p className="text-xs text-slate-500">18 Oct 2026 • Norms violation inspection report received</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-purple-600 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-slate-800 text-xs sm:text-sm">Overlap alert raised</p>
                    <p className="text-xs text-slate-500">20 Oct 2026 • Coordination required between PGRC & RB</p>
                  </div>
                </li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-slate-900 mb-3">Linked Cases</h4>
              <div className="space-y-3">
                <Link
                  href="/cases/case-01"
                  className="border border-slate-200 rounded-2xl p-4 block hover:border-blue-300 hover:bg-slate-50/50 transition"
                >
                  <p className="font-semibold text-sm text-blue-700">PGRC-2026-1042</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Unapproved Fees & Certificates • PGRC • Under Process
                  </p>
                </Link>
                <Link
                  href="/cases/case-02"
                  className="border border-slate-200 rounded-2xl p-4 block hover:border-blue-300 hover:bg-slate-50/50 transition"
                >
                  <p className="font-semibold text-sm text-purple-700">RB-2026-2210</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Norms Violation • Regulation Bureau • Pending
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal for Assigning Coordination Owner */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full p-6 text-xs text-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900">Assign Coordination Owner</span>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-slate-600 my-3 text-xs">
              Appoint an authorized officer to coordinate overlapping proceedings for{" "}
              <strong>Sunrise Institute of Technology</strong> across PGRC and Regulation Bureau.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Coordination Officer
                </label>
                <select
                  value={selectedOwner}
                  onChange={(e) => setSelectedOwner(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs bg-white text-slate-900"
                >
                  <option value="Smt. Jayashree Ramanathan (Coordination Officer)">
                    Smt. Jayashree Ramanathan (Coordination Officer)
                  </option>
                  <option value="Dr. Sunita Deshmukh (PGRC Officer)">
                    Dr. Sunita Deshmukh (PGRC Officer)
                  </option>
                  <option value="Shri R. K. Srivastava (RB Officer)">
                    Shri R. K. Srivastava (RB Officer)
                  </option>
                  <option value="Dr. R. Sharma (Coordination Officer)">
                    Dr. R. Sharma (Coordination Officer)
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Coordination Directives
                </label>
                <textarea
                  rows={3}
                  defaultValue="Convene joint review between PGRC and Regulation Bureau. Consolidate show cause notices to avoid contradictory rulings."
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignOwner}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
              >
                Confirm Designation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Registering New Complaint */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-lg w-full p-6 text-xs text-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-base text-slate-900">+ Register New Institution Complaint</span>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Complaint registered successfully. Assigned Inward Tracking Docket #AICTE/PGRC/2026/05102.");
                setIsRegisterModalOpen(false);
              }}
              className="space-y-3 mt-4"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Institution Name / AICTE Permanent ID <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="Sunrise Institute of Technology (PID: 1-496299171)"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Inward Bureau</label>
                  <select className="w-full border border-slate-300 rounded-xl p-2.5 text-xs bg-white text-slate-900">
                    <option>Public Grievance Redressal Cell (PGRC)</option>
                    <option>Regulation Bureau (RB)</option>
                    <option>Regional Office (Western)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select className="w-full border border-slate-300 rounded-xl p-2.5 text-xs bg-white text-slate-900">
                    <option>Norms Violation / Faculty Deficit</option>
                    <option>Fee Surcharge & Certificates</option>
                    <option>Infrastructure Deficiencies</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Complaint Particulars</label>
                <textarea
                  rows={3}
                  placeholder="Enter substantive facts, affected batches, and evidence summary..."
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Slide-over Full AI Case Copilot */}
      <AICaseCopilot
        caseIdOrDocket="AICTE/PGRC/2026/04821"
        permanentId="1-496299171"
        initialIsOpen={isCopilotDrawerOpen}
        onClose={() => setIsCopilotDrawerOpen(false)}
      />
    </div>
  );
}
