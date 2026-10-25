"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { INSTITUTIONS, COMPLAINT_CASES, OVERLAP_ALERTS } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { AICaseCopilot } from "@/components/copilot/AICaseCopilot";
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  AlertTriangle,
  FileText,
  Clock,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";

export default function Institution360Page() {
  const params = useParams();
  const pidParam = params?.id as string;
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);

  const institution =
    INSTITUTIONS.find(
      (inst) => inst.permanentId === pidParam || inst.name.toLowerCase().includes(pidParam?.toLowerCase() || "")
    ) || INSTITUTIONS[0];

  const relatedCases = COMPLAINT_CASES.filter(
    (c) => c.permanentId === institution.permanentId
  );

  const overlapAlert = OVERLAP_ALERTS.find(
    (ov) => ov.permanentId === institution.permanentId
  );

  // Consolidated cross-bureau action timeline
  const crossBureauActions = [
    {
      date: "20-10-2026 16:30 IST",
      bureau: "Regulation Bureau (RB)",
      officer: "Shri R. K. Srivastava",
      caseId: "AICTE/RB/2026/01192",
      action: "Surprise inspection report received from WRO citing 22% faculty deficit and safety defects.",
      type: "Inspection Action",
    },
    {
      date: "18-10-2026 14:20 IST",
      bureau: "Public Grievance Redressal Cell (PGRC)",
      officer: "Dr. Sunita Deshmukh",
      caseId: "AICTE/PGRC/2026/04821",
      action: "Formal explanation letter served regarding withholding student certificates and unapproved fees.",
      type: "Grievance Notice",
    },
    {
      date: "11-10-2026 10:00 IST",
      bureau: "Regulation Bureau (RB)",
      officer: "Shri R. K. Srivastava",
      caseId: "AICTE/RB/2026/01192",
      action: "Regulatory enquiry docket opened following regional vigilance tip-off.",
      type: "Case Registration",
    },
    {
      date: "04-10-2026 11:15 IST",
      bureau: "Public Grievance Redressal Cell (PGRC)",
      officer: "Central Registry",
      caseId: "AICTE/PGRC/2026/04821",
      action: "CPGRAMS collective student petition registered against management.",
      type: "Case Registration",
    },
    {
      date: "28-04-2026 12:00 IST",
      bureau: "Approval Bureau",
      officer: "Advisor-I (Approval)",
      caseId: "AICTE/AB/2026/09201",
      action: "Extension of Approval (EoA) granted for Academic Year 2026-27 with conditional faculty undertakings.",
      type: "Statutory Approval",
    },
    {
      date: "15-11-2025 15:00 IST",
      bureau: "Public Grievance Redressal Cell (PGRC)",
      officer: "Dr. Sunita Deshmukh",
      caseId: "AICTE/PGRC/2025/03120",
      action: "Hostel mess sanitation complaint resolved following institution compliance undertaking.",
      type: "Disposed Matter",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-200 gap-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/institutions" className="hover:text-[#0B4F9C] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Institution Directory</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-semibold text-gray-800">{institution.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="px-3 py-1.5 bg-[#0F1E36] hover:bg-black text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>AI Case Copilot</span>
          </button>
          {overlapAlert && (
            <Link
              href="/overlap"
              className="px-3 py-1.5 bg-red-100 text-red-800 border border-red-300 rounded text-xs font-semibold hover:bg-red-200 flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>Overlap Alert Active ({overlapAlert.matchConfidence}%)</span>
            </Link>
          )}
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-[#0B4F9C] text-white rounded text-xs font-semibold hover:bg-[#073a75]"
          >
            Download Official Dossier (PDF)
          </button>
        </div>
      </div>

      {/* Institution Master Profile Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between pb-4 border-b border-gray-200 gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-[#0B4F9C] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                AICTE PID: {institution.permanentId}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                  institution.riskLevel === "High"
                    ? "bg-red-100 text-red-800 border border-red-300"
                    : institution.riskLevel === "Moderate"
                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                }`}
              >
                {institution.riskLevel} Risk Profile
              </span>
            </div>
            <h1 className="text-xl font-bold text-gray-950 mt-1.5">
              {institution.name}
            </h1>
            <p className="text-xs text-gray-600 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span>
                {institution.address}, {institution.district}, {institution.state} - {institution.pinCode}
              </span>
            </p>
          </div>

          <div className="flex gap-3 text-center text-xs font-mono">
            <div className="p-2.5 bg-gray-50 border border-gray-200 rounded min-w-[90px]">
              <div className="text-[10px] text-gray-500 font-sans">TOTAL CASES</div>
              <div className="text-lg font-bold text-gray-900">{institution.totalComplaints}</div>
            </div>
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded min-w-[90px] text-amber-900">
              <div className="text-[10px] text-amber-700 font-sans">ACTIVE</div>
              <div className="text-lg font-bold">{institution.activeComplaints}</div>
            </div>
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded min-w-[90px] text-emerald-900">
              <div className="text-[10px] text-emerald-700 font-sans">DISPOSED</div>
              <div className="text-lg font-bold">{institution.disposedComplaints}</div>
            </div>
          </div>
        </div>

        {/* Institution Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
          <div>
            <span className="text-[11px] text-gray-500 block font-semibold">Head of Institution</span>
            <span className="font-semibold text-gray-900">{institution.headOfInstitution}</span>
          </div>
          <div>
            <span className="text-[11px] text-gray-500 block font-semibold">Administrative Region</span>
            <span className="font-semibold text-gray-900">{institution.region}</span>
          </div>
          <div>
            <span className="text-[11px] text-gray-500 block font-semibold">Sanctioned Intake</span>
            <span className="font-semibold text-gray-900 font-mono">
              {institution.approvedIntake} Seats / Year
            </span>
          </div>
          <div>
            <span className="text-[11px] text-gray-500 block font-semibold">Approved Programs</span>
            <span className="font-semibold text-gray-900">
              {institution.programTypes.join(", ")}
            </span>
          </div>
        </div>
      </div>

      {/* Active and Historical Cases Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Cases Relating to this Institution ({relatedCases.length} Registered Dockets)
            </h2>
            <p className="text-[11px] text-gray-500">
              Consolidated view across Regulation Bureau (RB) and Public Grievance Redressal Cell (PGRC)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F1E36] text-white">
              <tr>
                <th className="py-2.5 px-3">Case ID</th>
                <th className="py-2.5 px-3">Bureau / Cell</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Assigned Officer</th>
                <th className="py-2.5 px-3">Date Received</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {relatedCases.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-[#0B4F9C]">
                    <Link href={`/cases/${c.id}`} className="hover:underline">
                      {c.caseId}
                    </Link>
                    {c.isOverlapping && (
                      <span className="ml-1.5 px-1 py-0.2 text-[9px] bg-red-100 text-red-800 rounded font-sans font-bold border border-red-300">
                        OVERLAP
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-semibold text-gray-800">{c.bureau}</td>
                  <td className="py-3 px-3 text-gray-700 max-w-[250px]">{c.category}</td>
                  <td className="py-3 px-3 text-gray-700">{c.assignedOfficer}</td>
                  <td className="py-3 px-3 font-mono text-gray-600">{c.dateOfReceipt}</td>
                  <td className="py-3 px-3">
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={`/cases/${c.id}`}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-[#0B4F9C] hover:text-white rounded border border-gray-300 transition text-[11px] font-semibold text-[#0B4F9C]"
                    >
                      View Docket
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Cross-Bureau Action Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <div>
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Complete Cross-Bureau Action Timeline
            </h2>
            <p className="text-[11px] text-gray-500">
              Synchronized chronological movement of approvals, inspection reports, grievance notices, and compliance orders
            </p>
          </div>
          <span className="text-[11px] font-mono text-gray-500">
            Cross-Bureau Unified Audit Trail
          </span>
        </div>

        <div className="relative mt-5 pl-4 border-l-2 border-blue-300 space-y-5">
          {crossBureauActions.map((act, index) => (
            <div key={index} className="relative group text-xs">
              {/* Dot */}
              <div
                className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs ${
                  act.bureau.includes("Regulation")
                    ? "bg-purple-600"
                    : act.bureau.includes("PGRC")
                    ? "bg-[#0B4F9C]"
                    : "bg-emerald-600"
                }`}
              />

              <div className="bg-gray-50 border border-gray-200 rounded p-3 hover:bg-slate-50 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-gray-500 pb-1.5 border-b border-gray-200 gap-1 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gray-800">{act.date}</span>
                    <span className="font-mono text-[#0B4F9C] font-semibold">[{act.caseId}]</span>
                  </div>
                  <span className="font-semibold text-gray-700">
                    {act.bureau} • {act.officer}
                  </span>
                </div>

                <div className="mt-2 text-gray-800">
                  <span className="font-bold text-gray-900 block">{act.type}:</span>
                  <p className="mt-0.5">{act.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Case Copilot */}
      <AICaseCopilot
        permanentId={institution.permanentId}
        caseIdOrDocket={relatedCases[0]?.caseId || "AICTE/PGRC/2026/04821"}
        initialIsOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />
    </div>
  );
}
