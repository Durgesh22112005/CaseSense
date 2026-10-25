"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INSTITUTIONS, InstitutionProfile } from "@/data/mockData";
import { Search, Building2, AlertTriangle, ExternalLink, ShieldCheck, MapPin } from "lucide-react";

export default function InstitutionsIndexPage() {
  const [search, setSearch] = useState<string>("");

  const filtered = INSTITUTIONS.filter((inst) => {
    const q = search.toLowerCase();
    return (
      inst.name.toLowerCase().includes(q) ||
      inst.permanentId.toLowerCase().includes(q) ||
      inst.state.toLowerCase().includes(q) ||
      inst.district.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#0B4F9C]">
            AICTE Permanent Institution Directory
          </div>
          <h1 className="text-xl font-bold text-[#0F1E36] tracking-tight">
            Institution 360° Consolidated Dossiers
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Holistic cross-bureau view of approved technical institutions, regulatory compliance history, and grievance density.
          </p>
        </div>

        <div>
          <Link
            href="/institutions/1-43928104"
            className="px-3 py-1.5 bg-[#0B4F9C] text-white rounded text-xs font-semibold hover:bg-[#073a75] transition shadow-xs flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Open Sunrise Institute of Technology (Featured Case)</span>
          </Link>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search institution by name, AICTE Permanent ID (PID: 1-XXXXXXXX), district, or state..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0B4F9C]"
          />
        </div>
      </div>

      {/* Institutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((inst) => (
          <div
            key={inst.permanentId}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#0B4F9C] hover:shadow-sm transition flex flex-col justify-between text-xs"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[11px] font-bold text-[#0B4F9C] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                  PID: {inst.permanentId}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    inst.riskLevel === "High"
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : inst.riskLevel === "Moderate"
                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                      : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  }`}
                >
                  {inst.riskLevel} Risk
                </span>
              </div>

              <h2 className="font-bold text-gray-900 mt-2 text-sm leading-snug">
                {inst.name}
              </h2>

              <p className="text-gray-500 text-[11px] mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <span>
                  {inst.district}, {inst.state} ({inst.region})
                </span>
              </p>

              {inst.hasOverlappingCases && (
                <div className="mt-2.5 p-2 bg-red-50 border border-red-200 rounded flex items-center gap-1.5 text-red-900 font-semibold text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                  <span>Concurrent RB & PGRC proceedings active</span>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100 text-center font-mono">
                <div className="bg-gray-50 p-1.5 rounded">
                  <div className="text-gray-400 text-[10px]">TOTAL</div>
                  <div className="font-bold text-gray-800">{inst.totalComplaints}</div>
                </div>
                <div className="bg-amber-50 p-1.5 rounded text-amber-900">
                  <div className="text-amber-700 text-[10px]">ACTIVE</div>
                  <div className="font-bold">{inst.activeComplaints}</div>
                </div>
                <div className="bg-emerald-50 p-1.5 rounded text-emerald-900">
                  <div className="text-emerald-700 text-[10px]">DISPOSED</div>
                  <div className="font-bold">{inst.disposedComplaints}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <Link
                href={`/institutions/${inst.permanentId}`}
                className="w-full py-1.5 bg-gray-100 hover:bg-[#0B4F9C] hover:text-white text-gray-700 font-semibold rounded text-center block transition text-xs"
              >
                Open 360° Profile →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
