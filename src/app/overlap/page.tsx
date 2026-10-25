"use client";

import React, { useState } from "react";
import Link from "next/link";
import { OVERLAP_ALERTS, OverlapAlert } from "@/data/mockData";
import {
  AlertTriangle,
  CheckCircle2,
  Users,
  Link2,
  ArrowRight,
  ShieldCheck,
  Building,
  Check,
  ChevronRight,
  ExternalLink,
  Info,
} from "lucide-react";

export default function OverlapInvestigationPage() {
  const [alerts, setAlerts] = useState<OverlapAlert[]>(OVERLAP_ALERTS);
  const [linkedStatus, setLinkedStatus] = useState<Record<string, boolean>>({});
  const [assignedOwner, setAssignedOwner] = useState<Record<string, string>>({});
  const [selectedCaseForModal, setSelectedCaseForModal] = useState<OverlapAlert | null>(null);

  const handleLinkCases = (alertId: string, ownerName?: string) => {
    const owner = ownerName || "Smt. Jayashree Ramanathan (Coordination Officer)";
    setLinkedStatus((prev) => ({ ...prev, [alertId]: true }));
    setAssignedOwner((prev) => ({ ...prev, [alertId]: owner }));
    setSelectedCaseForModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-red-700">
            Automated Cross-Bureau Collision Radar
          </div>
          <h1 className="text-xl font-bold text-[#0F1E36] tracking-tight">
            Overlap Investigation & Inter-Bureau Coordination
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Intelligent detection of concurrent complaints, investigations, and regulatory inquiries relating to the same institution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-red-100 text-red-800 border border-red-300 px-3 py-1.5 rounded font-semibold font-mono">
            {alerts.length} Potential Overlaps Flagged
          </span>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 text-xs text-amber-900">
        <div className="flex items-center gap-2 font-bold mb-1">
          <Info className="w-4 h-4 text-amber-700" />
          <span>Statutory Directive on Cross-Bureau Coordination</span>
        </div>
        <p>
          Per AICTE Vigilance & Grievance Manual guidelines, when multiple Bureaus/Cells (e.g., Regulation Bureau and PGRC) receive complaints against the same technical institution, proceedings must be linked and assigned a designated Coordination Owner to avoid duplication of notices or conflicting findings.
        </p>
      </div>

      {/* List of Overlap Alerts */}
      <div className="space-y-6">
        {alerts.map((alert) => {
          const isLinked = linkedStatus[alert.id];
          const owner = assignedOwner[alert.id];

          return (
            <div
              key={alert.id}
              className={`bg-white border rounded-lg overflow-hidden shadow-xs transition ${
                isLinked ? "border-emerald-400 bg-emerald-50/10" : "border-red-400"
              }`}
            >
              {/* Alert Header */}
              <div
                className={`p-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  isLinked
                    ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                    : "bg-red-50 border-red-200 text-red-950"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border border-gray-300 text-[#0F1E36]">
                      PID: {alert.permanentId}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        isLinked
                          ? "bg-emerald-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {alert.matchConfidence}% Match Confidence
                    </span>
                    {isLinked && (
                      <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Cases Linked</span>
                      </span>
                    )}
                  </div>
                  <h2 className="text-base font-bold mt-1 text-[#0F1E36]">
                    {alert.institutionName}
                  </h2>
                </div>

                {/* Action button */}
                <div>
                  {isLinked ? (
                    <div className="p-2.5 bg-white border border-emerald-300 rounded text-xs text-emerald-900 font-medium">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Cases linked successfully. Coordination owner assigned.</span>
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5">
                        Designated Owner: <strong>{owner}</strong>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedCaseForModal(alert)}
                      className="px-4 py-2 bg-[#0B4F9C] hover:bg-[#073a75] text-white rounded text-xs font-bold transition flex items-center gap-2 shadow-xs"
                    >
                      <Link2 className="w-4 h-4" />
                      <span>Link Cases & Assign Owner</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Side-by-Side Comparison */}
              <div className="p-5">
                <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                  Side-by-Side Docket Comparison (PGRC vs RB)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Case A: PGRC */}
                  <div className="bg-blue-50/40 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                      <span className="font-bold text-blue-900">
                        {alert.caseA.bureau}
                      </span>
                      <span className="font-mono text-gray-600 text-[11px]">
                        Received: {alert.caseA.dateOfReceipt}
                      </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div>
                        <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                          Case Docket Number
                        </span>
                        <Link
                          href={`/cases/case-01`}
                          className="font-mono font-bold text-[#0B4F9C] hover:underline flex items-center gap-1"
                        >
                          <span>{alert.caseA.caseId}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>

                      <div>
                        <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                          Subject / Nature of Complaint
                        </span>
                        <p className="font-semibold text-gray-900">{alert.caseA.category}</p>
                      </div>

                      <div className="pt-2 border-t border-blue-100 flex items-center justify-between">
                        <div>
                          <span className="text-gray-500 text-[10px] block">Assigned Officer</span>
                          <span className="font-semibold text-gray-800">
                            {alert.caseA.officer}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] block">Current Status</span>
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                            {alert.caseA.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Case B: Regulation Bureau */}
                  <div className="bg-purple-50/40 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center justify-between pb-2 border-b border-purple-200">
                      <span className="font-bold text-purple-900">
                        {alert.caseB.bureau}
                      </span>
                      <span className="font-mono text-gray-600 text-[11px]">
                        Received: {alert.caseB.dateOfReceipt}
                      </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div>
                        <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                          Case Docket Number
                        </span>
                        <Link
                          href={`/cases/case-02`}
                          className="font-mono font-bold text-purple-700 hover:underline flex items-center gap-1"
                        >
                          <span>{alert.caseB.caseId}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>

                      <div>
                        <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                          Subject / Nature of Complaint
                        </span>
                        <p className="font-semibold text-gray-900">{alert.caseB.category}</p>
                      </div>

                      <div className="pt-2 border-t border-purple-100 flex items-center justify-between">
                        <div>
                          <span className="text-gray-500 text-[10px] block">Assigned Officer</span>
                          <span className="font-semibold text-gray-800">
                            {alert.caseB.officer}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] block">Current Status</span>
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                            {alert.caseB.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Reasons */}
                <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs">
                  <div className="font-bold text-gray-800 mb-2">
                    Automated Match Verification Grounds:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                    {alert.matchReasons.map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B4F9C] flex-shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Linking Cases & Assigning Coordination Owner */}
      {selectedCaseForModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-gray-300 shadow-xl max-w-md w-full p-6 text-xs text-gray-800">
            <div className="flex items-center gap-2 text-[#0B4F9C] font-bold text-sm mb-2">
              <Link2 className="w-5 h-5" />
              <span>Link Cases & Assign Coordination Owner</span>
            </div>
            <p className="text-gray-600 mb-3">
              Confirm cross-bureau docket linking for{" "}
              <strong>{selectedCaseForModal.institutionName}</strong> (PID:{" "}
              {selectedCaseForModal.permanentId}).
            </p>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Designate Coordination Officer <span className="text-red-600">*</span>
                </label>
                <select
                  id="modal-owner-select"
                  defaultValue="Smt. Jayashree Ramanathan (Coordination Officer)"
                  className="w-full border border-gray-300 rounded p-2 text-xs bg-white text-gray-900"
                >
                  <option value="Smt. Jayashree Ramanathan (Coordination Officer)">
                    Smt. Jayashree Ramanathan (Deputy Director, Coordination Cell)
                  </option>
                  <option value="Dr. Sunita Deshmukh (PGRC Officer)">
                    Dr. Sunita Deshmukh (Assistant Director, PGRC)
                  </option>
                  <option value="Shri R. K. Srivastava (RB Officer)">
                    Shri R. K. Srivastava (Senior Hearing Officer, Regulation Bureau)
                  </option>
                  <option value="Prof. (Dr.) Rajive Kumar (Member Secretary)">
                    Prof. (Dr.) Rajive Kumar (Competent Authority / Member Secretary)
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Joint Hearing / Committee Directives
                </label>
                <textarea
                  rows={3}
                  defaultValue="Both Bureaus to merge relevant evidence. Standing Hearing Committee summons to be served jointly on 05-11-2026."
                  className="w-full border border-gray-300 rounded p-2 text-xs text-gray-900"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => setSelectedCaseForModal(null)}
                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const selectEl = document.getElementById("modal-owner-select") as HTMLSelectElement;
                  handleLinkCases(selectedCaseForModal.id, selectEl?.value);
                }}
                className="px-4 py-1.5 bg-[#0B4F9C] text-white rounded font-bold hover:bg-[#073a75]"
              >
                Link Cases
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
