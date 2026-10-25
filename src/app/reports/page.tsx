"use client";

import React, { useState } from "react";
import {
  BUREAU_WORKLOAD_DATA,
  REGIONAL_REPORT_DATA,
  AGEING_ANALYSIS_DATA,
  INSTITUTIONS,
  COMPLAINT_CASES,
  OVERLAP_ALERTS,
} from "@/data/mockData";
import {
  FileText,
  Download,
  Printer,
  BarChart2,
  PieChart,
  Calendar,
  Building,
  CheckCircle,
  AlertTriangle,
  Clock,
  Layers,
} from "lucide-react";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<
    "bureau" | "region" | "institution" | "ageing" | "disposal" | "overlap"
  >("bureau");

  const [dateRange, setDateRange] = useState<string>("FY 2026-27");
  const [downloadSuccess, setDownloadSuccess] = useState<string>("");

  const handleExport = (format: "PDF" | "Excel") => {
    setDownloadSuccess(`Generating official AICTE ${format} report for ${dateRange}...`);
    setTimeout(() => {
      setDownloadSuccess("");
      if (format === "PDF") {
        window.print();
      } else {
        alert("AICTE_Consolidated_MIS_Report_2026.xlsx exported successfully to your downloads.");
      }
    }, 1200);
  };

  const tabs = [
    { id: "bureau", label: "Bureau-wise Report" },
    { id: "region", label: "Region-wise Report" },
    { id: "institution", label: "Institution Complaint History" },
    { id: "ageing", label: "Pending Case Ageing" },
    { id: "disposal", label: "Disposal Rate & Efficiency" },
    { id: "overlap", label: "Overlap & Duplicate Cases" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#0B4F9C]">
            Statutory AICTE Management Information System (MIS)
          </div>
          <h1 className="text-xl font-bold text-[#0F1E36] tracking-tight">
            Comprehensive Reports & Compliance Analytics
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Quarterly and annual performance metrics for Ministry of Education, Parliamentary Questions, and AICTE Council meetings.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport("PDF")}
            className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-red-600" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => handleExport("Excel")}
            className="px-3 py-1.5 bg-[#15803D] text-white rounded text-xs font-semibold hover:bg-emerald-800 flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-blue-50 border border-blue-300 rounded text-blue-900 text-xs font-medium flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="bg-white border border-gray-200 rounded-lg p-1.5 flex flex-wrap gap-1 shadow-xs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
              activeTab === tab.id
                ? "bg-[#0B4F9C] text-white shadow-xs"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Bureau-wise Report */}
      {activeTab === "bureau" && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <div>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Bureau / Cell Workload & Disposal Summary
              </h2>
              <p className="text-[11px] text-gray-500">
                Breakdown of receipts, disposals, and pending inventories across AICTE functional units
              </p>
            </div>
            <span className="text-[11px] font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
              Period: FY 2026-27 (Up to Oct 2026)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F1E36] text-white">
                <tr>
                  <th className="py-2.5 px-3">Bureau / Cell Name</th>
                  <th className="py-2.5 px-3 text-center">Total Received</th>
                  <th className="py-2.5 px-3 text-center">Disposed Cases</th>
                  <th className="py-2.5 px-3 text-center">Under Process</th>
                  <th className="py-2.5 px-3 text-center">Pending Scrutiny</th>
                  <th className="py-2.5 px-3 text-right">Disposal Rate (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {BUREAU_WORKLOAD_DATA.map((b, idx) => {
                  const total = b.active + b.disposed + b.pending;
                  const rate = ((b.disposed / total) * 100).toFixed(1);
                  return (
                    <tr key={idx} className="hover:bg-slate-50 font-mono">
                      <td className="py-3 px-3 font-sans font-semibold text-gray-900">
                        {b.bureau}
                      </td>
                      <td className="py-3 px-3 text-center text-gray-900">{total}</td>
                      <td className="py-3 px-3 text-center text-emerald-700 font-bold">
                        {b.disposed}
                      </td>
                      <td className="py-3 px-3 text-center text-blue-700">{b.active}</td>
                      <td className="py-3 px-3 text-center text-amber-700">{b.pending}</td>
                      <td className="py-3 px-3 text-right font-bold text-[#0B4F9C]">
                        {rate}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-100 font-bold font-mono border-t-2 border-gray-300">
                <tr>
                  <td className="py-2.5 px-3 font-sans">TOTAL CONSOLIDATED</td>
                  <td className="py-2.5 px-3 text-center">1,482</td>
                  <td className="py-2.5 px-3 text-center text-emerald-800">584</td>
                  <td className="py-2.5 px-3 text-center text-blue-800">548</td>
                  <td className="py-2.5 px-3 text-center text-amber-800">312</td>
                  <td className="py-2.5 px-3 text-right text-[#0B4F9C]">39.4%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Region-wise Report */}
      {activeTab === "region" && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <div>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Region-wise Grievance Distribution & SLA Compliance
              </h2>
              <p className="text-[11px] text-gray-500">
                Performance across Western, Northern, Southern, South-Western, Eastern, and Central Regional Offices
              </p>
            </div>
            <span className="text-[11px] font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
              National Jurisdiction
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F1E36] text-white">
                <tr>
                  <th className="py-2.5 px-3">AICTE Regional Office</th>
                  <th className="py-2.5 px-3 text-center">Total Inward</th>
                  <th className="py-2.5 px-3 text-center">Disposed</th>
                  <th className="py-2.5 px-3 text-center">Active Docket</th>
                  <th className="py-2.5 px-3 text-center">Overlaps Detected</th>
                  <th className="py-2.5 px-3 text-center">SLA Breaches (&gt;60d)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-mono">
                {REGIONAL_REPORT_DATA.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-sans font-semibold text-gray-900">
                      {r.region}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-gray-900">{r.total}</td>
                    <td className="py-3 px-3 text-center text-emerald-700">{r.disposed}</td>
                    <td className="py-3 px-3 text-center text-blue-700">{r.active}</td>
                    <td className="py-3 px-3 text-center text-red-700 font-bold">
                      {r.overlapCount}
                    </td>
                    <td className="py-3 px-3 text-center text-red-600 font-bold">
                      {r.breachCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Institution Complaint History */}
      {activeTab === "institution" && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <div>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Institution Complaint Frequency & Risk Register
              </h2>
              <p className="text-[11px] text-gray-500">
                Comprehensive historical track record of high-frequency complaint institutions
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F1E36] text-white">
                <tr>
                  <th className="py-2.5 px-3">Permanent ID</th>
                  <th className="py-2.5 px-3">Institution Name</th>
                  <th className="py-2.5 px-3">State & Region</th>
                  <th className="py-2.5 px-3 text-center">Total Lifetime Grievances</th>
                  <th className="py-2.5 px-3 text-center">Active Dockets</th>
                  <th className="py-2.5 px-3 text-center">Risk Level</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {INSTITUTIONS.map((inst) => (
                  <tr key={inst.permanentId} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-[#0B4F9C]">
                      {inst.permanentId}
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-900">{inst.name}</td>
                    <td className="py-3 px-3 text-gray-600">
                      {inst.state} ({inst.region})
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-gray-900">
                      {inst.totalComplaints}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-amber-800">
                      {inst.activeComplaints}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          inst.riskLevel === "High"
                            ? "bg-red-100 text-red-800 border border-red-300"
                            : inst.riskLevel === "Moderate"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        }`}
                      >
                        {inst.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <a
                        href={`/institutions/${inst.permanentId}`}
                        className="text-[#0B4F9C] font-semibold hover:underline"
                      >
                        View 360° →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Pending Case Ageing Analysis */}
      {activeTab === "ageing" && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <div>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Pending Case Ageing Analysis & Timeline Audit
              </h2>
              <p className="text-[11px] text-gray-500">
                Evaluation of case progression against statutory Citizen Charter SLAs (30 days enquiry, 60 days disposal)
              </p>
            </div>
            <span className="text-[11px] bg-red-100 text-red-900 px-2 py-0.5 rounded font-mono font-bold">
              42 Cases Beyond 60-Day SLA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            {AGEING_ANALYSIS_DATA.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                <div className="text-[11px] font-semibold text-gray-500 uppercase">
                  {item.range}
                </div>
                <div className="text-2xl font-bold font-mono mt-1 text-gray-900">
                  {item.count} Cases
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  {idx === 0
                    ? "Normal processing timeline"
                    : idx === 1
                    ? "Notice window active"
                    : idx === 2
                    ? "First reminder issued"
                    : "Automated escalation triggered"}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-700">
            <h3 className="font-bold text-gray-900 mb-2">Ageing Cases Requiring Immediate Disposal Orders:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span className="font-mono text-[#0B4F9C] font-semibold">AICTE/RB/2026/01244</span> (Vidyapeeth Academy) — <strong>87 days elapsed</strong> (+27 days breach). Escalated to Member Secretary.
              </li>
              <li>
                <span className="font-mono text-[#0B4F9C] font-semibold">AICTE/PGRC/2026/04112</span> (Vidyapeeth Academy Distance Wing) — <strong>79 days elapsed</strong> (+19 days breach).
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 5: Disposal Rate */}
      {activeTab === "disposal" && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <div>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Overall Redressal & Disposal Efficiency
              </h2>
              <p className="text-[11px] text-gray-500">
                Year-on-year disposal comparisons and Bureau resolution benchmarks
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950">
              <span className="text-[11px] font-bold uppercase text-emerald-800">
                Overall Disposal Rate
              </span>
              <div className="text-3xl font-bold font-mono mt-1 text-emerald-900">
                39.4%
              </div>
              <p className="text-[11px] text-emerald-700 mt-1">
                584 of 1,482 dockets fully concluded with formal orders.
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-950">
              <span className="text-[11px] font-bold uppercase text-blue-800">
                Average Resolution Time
              </span>
              <div className="text-3xl font-bold font-mono mt-1 text-blue-900">
                34.2 Days
              </div>
              <p className="text-[11px] text-blue-700 mt-1">
                Well within statutory ceiling of 45 calendar days.
              </p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-950">
              <span className="text-[11px] font-bold uppercase text-purple-800">
                Compliance Recovery Amount
              </span>
              <div className="text-3xl font-bold font-mono mt-1 text-purple-900">
                ₹ 42.50 Lakh
              </div>
              <p className="text-[11px] text-purple-700 mt-1">
                Penalties and student fee refunds secured in FY 2026-27.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Overlap & Duplicate Cases */}
      {activeTab === "overlap" && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <div>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Cross-Bureau Overlap & Deduplication Register
              </h2>
              <p className="text-[11px] text-gray-500">
                Log of identified parallel complaints between Regulation Bureau (RB) and PGRC
              </p>
            </div>
            <span className="text-[11px] bg-red-100 text-red-900 px-2 py-0.5 rounded font-mono font-bold">
              14 Overlaps Flagged in FY 2026-27
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F1E36] text-white">
                <tr>
                  <th className="py-2.5 px-3">Institution Name</th>
                  <th className="py-2.5 px-3">Permanent ID</th>
                  <th className="py-2.5 px-3">PGRC Case Ref</th>
                  <th className="py-2.5 px-3">RB Case Ref</th>
                  <th className="py-2.5 px-3 text-center">Match Confidence</th>
                  <th className="py-2.5 px-3">Coordination Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {OVERLAP_ALERTS.map((ov) => (
                  <tr key={ov.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-semibold text-gray-900">
                      {ov.institutionName}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#0B4F9C]">
                      {ov.permanentId}
                    </td>
                    <td className="py-3 px-3 font-mono text-blue-800">
                      {ov.caseA.caseId}
                    </td>
                    <td className="py-3 px-3 font-mono text-purple-800">
                      {ov.caseB.caseId}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-red-700">
                      {ov.matchConfidence}%
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                        {ov.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
