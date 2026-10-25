"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { COMPLAINT_CASES, ComplaintCase, ActionHistoryItem } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { AICaseCopilot } from "@/components/copilot/AICaseCopilot";
import {
  ArrowLeft,
  Building,
  User,
  Calendar,
  Clock,
  FileText,
  AlertTriangle,
  Sparkles,
  Download,
  Share2,
  Send,
  ArrowRightLeft,
  ShieldAlert,
  CheckCircle2,
  FileCheck,
  Check,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

export default function CaseDetailsPage() {
  const params = useParams();
  const caseIdParam = params?.id as string;

  const initialCase =
    COMPLAINT_CASES.find((c) => c.id === caseIdParam || c.caseId === caseIdParam) ||
    COMPLAINT_CASES[0];

  const [currentCase, setCurrentCase] = useState<ComplaintCase>(initialCase);
  const [activeModal, setActiveModal] = useState<"status" | "transfer" | "escalate" | "link" | null>(null);
  const [successToast, setSuccessToast] = useState<string>("");
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(true);

  // Modal form states
  const [newStatus, setNewStatus] = useState<ComplaintCase["status"]>(currentCase.status);
  const [statusRemark, setStatusRemark] = useState<string>("");

  const [transferTargetBureau, setTransferTargetBureau] = useState<string>("Regulation Bureau (RB)");
  const [transferReason, setTransferReason] = useState<string>("");

  const [escalateTarget, setEscalateTarget] = useState<string>("Member Secretary, AICTE (Competent Authority)");
  const [escalateReason, setEscalateReason] = useState<string>("");

  const [linkCaseId, setLinkCaseId] = useState<string>("AICTE/RB/2026/01192");
  const [linkNotes, setLinkNotes] = useState<string>("");

  const handleUpdateStatus = () => {
    const updatedHistory: ActionHistoryItem = {
      id: `act-${Date.now()}`,
      dateTime: "25-10-2026 21:35 IST",
      bureau: currentCase.bureau,
      officer: currentCase.assignedOfficer,
      actionTaken: `Status updated to ${newStatus}`,
      remarks: statusRemark || "Routine status review conducted by assigned desk officer.",
      nextAction: "Next review scheduled per Citizen Charter guidelines.",
    };

    setCurrentCase((prev) => ({
      ...prev,
      status: newStatus,
      lastAction: `Status updated to ${newStatus}`,
      lastActionDate: "25-10-2026",
      actionHistory: [updatedHistory, ...prev.actionHistory],
    }));

    setActiveModal(null);
    setStatusRemark("");
    setSuccessToast(`Case status successfully updated to ${newStatus}.`);
    setTimeout(() => setSuccessToast(""), 4000);
  };

  const handleTransfer = () => {
    const transferEntry = {
      fromBureau: currentCase.bureau,
      toBureau: transferTargetBureau,
      transferDate: "25-10-2026",
      transferredBy: currentCase.assignedOfficer,
      reason: transferReason || "Jurisdictional re-alignment following cross-bureau review.",
    };

    const updatedHistory: ActionHistoryItem = {
      id: `act-${Date.now()}`,
      dateTime: "25-10-2026 21:36 IST",
      bureau: currentCase.bureau,
      officer: currentCase.assignedOfficer,
      actionTaken: `Case transferred to ${transferTargetBureau}`,
      remarks: transferEntry.reason,
      nextAction: `Inward receipt and dossier verification by ${transferTargetBureau}`,
    };

    setCurrentCase((prev) => ({
      ...prev,
      status: "Transferred",
      bureau: transferTargetBureau as any,
      lastAction: `Transferred to ${transferTargetBureau}`,
      lastActionDate: "25-10-2026",
      transferHistory: [transferEntry, ...(prev.transferHistory || [])],
      actionHistory: [updatedHistory, ...prev.actionHistory],
    }));

    setActiveModal(null);
    setTransferReason("");
    setSuccessToast(`Case successfully transferred to ${transferTargetBureau}.`);
    setTimeout(() => setSuccessToast(""), 4000);
  };

  const handleEscalate = () => {
    const escalationEntry = {
      escalatedTo: escalateTarget,
      escalationDate: "25-10-2026",
      escalatedBy: currentCase.assignedOfficer,
      level: "Level 3 - Competent Authority",
      reason: escalateReason || "SLA compliance threshold breached; institutional non-responsiveness.",
    };

    const updatedHistory: ActionHistoryItem = {
      id: `act-${Date.now()}`,
      dateTime: "25-10-2026 21:37 IST",
      bureau: "AICTE Executive Secretariat",
      officer: currentCase.assignedOfficer,
      actionTaken: `Case escalated to ${escalateTarget}`,
      remarks: escalationEntry.reason,
      nextAction: "Special review hearing by Standing Hearing Committee (SHC)",
    };

    setCurrentCase((prev) => ({
      ...prev,
      status: "Escalated",
      isSlaBreached: true,
      lastAction: `Escalated to ${escalateTarget}`,
      lastActionDate: "25-10-2026",
      escalationHistory: [escalationEntry, ...(prev.escalationHistory || [])],
      actionHistory: [updatedHistory, ...prev.actionHistory],
    }));

    setActiveModal(null);
    setEscalateReason("");
    setSuccessToast(`Case formally escalated to ${escalateTarget}.`);
    setTimeout(() => setSuccessToast(""), 4000);
  };

  const handleLinkCase = () => {
    setCurrentCase((prev) => ({
      ...prev,
      isOverlapping: true,
      overlappingCaseIds: Array.from(new Set([...(prev.overlappingCaseIds || []), linkCaseId])),
    }));

    setActiveModal(null);
    setSuccessToast(`Case successfully linked with ${linkCaseId}. Coordination alert active.`);
    setTimeout(() => setSuccessToast(""), 4000);
  };

  const handleCopilotAcceptAction = (
    actionText: string,
    bureau: string,
    deadline: string
  ) => {
    const newActionItem: ActionHistoryItem = {
      id: `act-copilot-${Date.now()}`,
      dateTime: "25-10-2026 21:55 IST",
      bureau: bureau || currentCase.bureau,
      officer: `${currentCase.assignedOfficer} (via AI Case Copilot)`,
      actionTaken: actionText,
      remarks: `Recommendation accepted by officer via AI Copilot advisory engine. Compliance target: ${deadline}.`,
      nextAction: `Follow-up verification and compliance docket review on ${deadline}.`,
    };

    setCurrentCase((prev) => ({
      ...prev,
      lastAction: actionText,
      lastActionDate: "25-10-2026",
      actionHistory: [newActionItem, ...prev.actionHistory],
    }));

    setSuccessToast(
      `Recommendation accepted. Action recorded in case history timeline.`
    );
    setTimeout(() => setSuccessToast(""), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Back button & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-200 gap-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/cases" className="hover:text-[#0B4F9C] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Case Tracker</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-mono text-gray-800 font-semibold">{currentCase.caseId}</span>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsCopilotOpen(!isCopilotOpen)}
            className="px-3 py-1.5 bg-[#0F1E36] hover:bg-black text-white rounded text-xs font-semibold transition shadow-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>AI Case Copilot</span>
          </button>
          <button
            onClick={() => setActiveModal("status")}
            className="px-3 py-1.5 bg-[#0B4F9C] text-white rounded text-xs font-semibold hover:bg-[#073a75] transition shadow-xs flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Update Status</span>
          </button>
          <button
            onClick={() => setActiveModal("transfer")}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50 transition flex items-center gap-1.5"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-purple-600" />
            <span>Transfer Case</span>
          </button>
          <button
            onClick={() => setActiveModal("escalate")}
            className="px-3 py-1.5 bg-white border border-red-300 text-red-700 rounded text-xs font-semibold hover:bg-red-50 transition flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            <span>Escalate Case</span>
          </button>
          <button
            onClick={() => setActiveModal("link")}
            className="px-3 py-1.5 bg-amber-50 border border-amber-300 text-amber-900 rounded text-xs font-semibold hover:bg-amber-100 transition flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Link Related Case</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-emerald-800 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Overlap alert banner if case is overlapping */}
      {currentCase.isOverlapping && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 text-xs text-red-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <strong className="text-red-900 uppercase tracking-wide">
                Active Cross-Bureau Overlap Flagged
              </strong>
              <p className="text-red-800 mt-0.5">
                This case has identified parallel proceedings with:{" "}
                <span className="font-mono font-bold">
                  {currentCase.overlappingCaseIds?.join(", ") || "AICTE/RB/2026/01192"}
                </span>
                . Coordinated disposition is required to avoid contradictory directives.
              </p>
            </div>
          </div>
          <Link
            href="/overlap"
            className="px-3 py-1.5 bg-red-700 text-white rounded font-semibold text-xs hover:bg-red-800 whitespace-nowrap shadow-xs"
          >
            Inspect in Overlap Radar
          </Link>
        </div>
      )}

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Case Information, Complaint Text, AI Brief, Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Primary Case Details Panel */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-200 gap-2">
              <div>
                <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">
                  CASE DOCKET NUMBER
                </span>
                <h2 className="text-lg font-bold font-mono text-[#0B4F9C]">
                  {currentCase.caseId}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={currentCase.status} />
                {currentCase.isSlaBreached && (
                  <span className="px-2 py-0.5 rounded text-[11px] bg-red-100 text-red-800 border border-red-300 font-bold">
                    SLA OVERDUE
                  </span>
                )}
              </div>
            </div>

            {/* Key Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-xs border-b border-gray-100">
              <div>
                <span className="text-gray-500 text-[11px] block">Date of Receipt</span>
                <span className="font-semibold text-gray-900 font-mono">
                  {currentCase.dateOfReceipt}
                </span>
              </div>
              <div>
                <span className="text-gray-500 text-[11px] block">Prescribed SLA Target</span>
                <span className="font-semibold text-gray-900 font-mono">
                  {currentCase.expectedDisposalDate}
                </span>
              </div>
              <div>
                <span className="text-gray-500 text-[11px] block">Present Bureau/Cell</span>
                <span className="font-semibold text-gray-900">{currentCase.bureau}</span>
              </div>
              <div>
                <span className="text-gray-500 text-[11px] block">Assigned Officer</span>
                <span className="font-semibold text-gray-900">{currentCase.assignedOfficer}</span>
              </div>
            </div>

            {/* Category */}
            <div className="pt-3 text-xs">
              <span className="text-gray-500 text-[11px] block font-semibold">
                Nature / Category of Grievance
              </span>
              <p className="font-bold text-gray-900 mt-0.5">{currentCase.category}</p>
            </div>

            {/* Full Complaint Description */}
            <div className="mt-4 pt-3 border-t border-gray-100 text-xs">
              <span className="text-gray-500 text-[11px] block font-semibold">
                Substantive Complaint Description
              </span>
              <div className="mt-1.5 p-3.5 bg-gray-50 border border-gray-200 rounded text-gray-800 leading-relaxed font-sans">
                {currentCase.description}
              </div>
            </div>
          </div>

          {/* Card 2: AI-Assisted Case Brief (Clearly Labelled Advisory) */}
          <div className="bg-amber-50/60 border border-amber-300 rounded-lg p-4 text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold pb-2 border-b border-amber-200">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>AI-ASSISTED CASE BRIEF (ADVISORY ONLY — NOT LEGAL FINDING)</span>
            </div>
            <p className="mt-2 text-amber-950 leading-relaxed">
              {currentCase.advisoryAiBrief}
            </p>
            <div className="mt-2 pt-2 border-t border-amber-200/80 text-[10px] text-amber-800 flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              <span>
                Generated via AICTE Automated Rule & NLP Engine. Final statutory determination rests strictly with the Competent Authority.
              </span>
            </div>
          </div>

          {/* Card 3: Vertical Action History Timeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Chronological Action History Timeline
              </h3>
              <span className="text-[11px] text-gray-500 font-mono">
                {currentCase.actionHistory.length} Recorded Actions
              </span>
            </div>

            <div className="relative mt-4 pl-4 border-l-2 border-blue-200 space-y-6">
              {currentCase.actionHistory.map((item, index) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0B4F9C] border-2 border-white shadow-xs" />

                  <div className="bg-gray-50 hover:bg-slate-50 border border-gray-200 rounded p-3.5 text-xs transition">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-gray-500 pb-1.5 border-b border-gray-200 gap-1 text-[11px]">
                      <span className="font-mono font-bold text-[#0B4F9C]">
                        {item.dateTime}
                      </span>
                      <span className="font-semibold text-gray-700">
                        {item.bureau} • {item.officer}
                      </span>
                    </div>

                    <div className="mt-2">
                      <div className="font-bold text-gray-900">
                        Action Taken: {item.actionTaken}
                      </div>
                      <div className="text-gray-700 mt-1">
                        <strong>Official Remarks:</strong> {item.remarks}
                      </div>
                      <div className="text-blue-900 font-medium mt-1">
                        <strong>Next Action Required:</strong> {item.nextAction}
                      </div>
                    </div>

                    {item.documentRef && (
                      <div className="mt-2.5 pt-2 border-t border-gray-200 flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-[11px] text-[#0B4F9C] font-mono hover:underline cursor-pointer">
                          {item.documentRef}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Institution Summary, Documents, Transfer/Escalation Logs */}
        <div className="space-y-6">
          {/* Institution Dossier Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">
                Institution Summary
              </span>
              <Link
                href={`/institutions/${currentCase.permanentId}`}
                className="text-[11px] text-[#0B4F9C] hover:underline font-semibold"
              >
                View 360° Profile →
              </Link>
            </div>

            <div className="mt-3 space-y-2 text-gray-800">
              <div>
                <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                  Institution Name
                </span>
                <span className="font-bold text-gray-950 text-sm">
                  {currentCase.institutionName}
                </span>
              </div>

              <div>
                <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                  AICTE Permanent ID
                </span>
                <span className="font-mono font-bold text-[#0B4F9C] bg-blue-50 px-1.5 py-0.5 rounded">
                  {currentCase.permanentId}
                </span>
              </div>

              <div>
                <span className="text-gray-500 text-[10px] uppercase font-semibold block">
                  Campus Address
                </span>
                <span className="text-gray-700">{currentCase.institutionAddress}</span>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-gray-500">Region:</span>
                <span className="font-semibold text-gray-900">{currentCase.region}</span>
              </div>
            </div>
          </div>

          {/* Mock Documents Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">
                Case Documents & Notices ({currentCase.documents.length})
              </span>
              <button
                onClick={() => alert("Upload dialog: Only signed PDF/A documents with digital token are permitted.")}
                className="text-[11px] text-[#0B4F9C] hover:underline font-semibold"
              >
                + Upload Notice
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {currentCase.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-2.5 bg-gray-50 border border-gray-200 rounded hover:bg-blue-50/40 transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileCheck className="w-4 h-4 text-[#0B4F9C] flex-shrink-0" />
                    <div className="truncate">
                      <div className="font-medium text-gray-900 truncate" title={doc.name}>
                        {doc.name}
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono">
                        {doc.size} • {doc.dateUploaded}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading signed copy of ${doc.name}...`)}
                    className="p-1.5 text-gray-500 hover:text-[#0B4F9C]"
                    title="Download document"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Transfer History Log */}
          {currentCase.transferHistory && currentCase.transferHistory.length > 0 && (
            <div className="bg-purple-50/50 border border-purple-200 rounded-lg p-4 shadow-xs text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900 block pb-2 border-b border-purple-200">
                Inter-Bureau Transfer Record
              </span>
              <div className="mt-2 space-y-2">
                {currentCase.transferHistory.map((t, idx) => (
                  <div key={idx} className="p-2 bg-white rounded border border-purple-200 text-purple-950">
                    <div className="flex justify-between font-mono text-[10px] text-purple-700">
                      <span>{t.transferDate}</span>
                      <span>By: {t.transferredBy.split(",")[0]}</span>
                    </div>
                    <div className="mt-1 font-semibold">
                      {t.fromBureau} ➔ {t.toBureau}
                    </div>
                    <div className="mt-1 text-[11px] text-gray-600">
                      <strong>Reason:</strong> {t.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Escalation History Log */}
          {currentCase.escalationHistory && currentCase.escalationHistory.length > 0 && (
            <div className="bg-red-50/50 border border-red-200 rounded-lg p-4 shadow-xs text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-900 block pb-2 border-b border-red-200">
                Statutory Escalation Record
              </span>
              <div className="mt-2 space-y-2">
                {currentCase.escalationHistory.map((e, idx) => (
                  <div key={idx} className="p-2 bg-white rounded border border-red-200 text-red-950">
                    <div className="flex justify-between font-mono text-[10px] text-red-700">
                      <span>{e.escalationDate}</span>
                      <span>{e.level}</span>
                    </div>
                    <div className="mt-1 font-semibold text-red-900">
                      To: {e.escalatedTo}
                    </div>
                    <div className="mt-1 text-[11px] text-gray-600">
                      <strong>Grounds:</strong> {e.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: Update Status */}
      {activeModal === "status" && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-gray-300 shadow-xl max-w-md w-full p-6 text-xs text-gray-800">
            <h3 className="font-bold text-sm text-[#0F1E36] mb-3">
              Update Docket Status — {currentCase.caseId}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Select New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ComplaintCase["status"])}
                  className="w-full border border-gray-300 rounded p-2 text-xs bg-white text-gray-900"
                >
                  <option value="Pending">Pending (Amber)</option>
                  <option value="Under Process">Under Process (Blue)</option>
                  <option value="Disposed">Disposed (Green)</option>
                  <option value="Transferred">Transferred (Purple)</option>
                  <option value="Escalated">Escalated (Red)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Official Order / Scrutiny Remarks <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={3}
                  value={statusRemark}
                  onChange={(e) => setStatusRemark(e.target.value)}
                  placeholder="Enter detailed reasons, compliance verification note, or disposal summary..."
                  className="w-full border border-gray-300 rounded p-2 text-xs text-gray-900"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-1.5 bg-[#0B4F9C] text-white rounded font-semibold hover:bg-[#073a75]"
              >
                Save Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Transfer Case */}
      {activeModal === "transfer" && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-gray-300 shadow-xl max-w-md w-full p-6 text-xs text-gray-800">
            <h3 className="font-bold text-sm text-purple-900 mb-3 flex items-center gap-1.5">
              <ArrowRightLeft className="w-4 h-4 text-purple-700" />
              <span>Inter-Bureau Case Transfer</span>
            </h3>
            <p className="text-gray-600 mb-3">
              Route this docket to another Bureau/Cell or Regional Office with complete evidence dossier.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Target Bureau / Office</label>
                <select
                  value={transferTargetBureau}
                  onChange={(e) => setTransferTargetBureau(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-xs bg-white text-gray-900"
                >
                  <option value="Regulation Bureau (RB)">Regulation Bureau (RB)</option>
                  <option value="Public Grievance Redressal Cell (PGRC)">Public Grievance Redressal Cell (PGRC)</option>
                  <option value="Western Regional Office (WRO - Mumbai)">Western Regional Office (WRO)</option>
                  <option value="Northern Regional Office (NRO - Kanpur)">Northern Regional Office (NRO)</option>
                  <option value="Southern Regional Office (SRO - Chennai)">Southern Regional Office (SRO)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Reason for Transfer & Jurisdiction Note <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={3}
                  value={transferReason}
                  onChange={(e) => setTransferReason(e.target.value)}
                  placeholder="State why this complaint falls under the purview of the receiving Bureau/Cell..."
                  className="w-full border border-gray-300 rounded p-2 text-xs text-gray-900"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleTransfer}
                className="px-4 py-1.5 bg-purple-700 text-white rounded font-semibold hover:bg-purple-800"
              >
                Execute Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Escalate Case */}
      {activeModal === "escalate" && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-gray-300 shadow-xl max-w-md w-full p-6 text-xs text-gray-800">
            <h3 className="font-bold text-sm text-red-900 mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>Formal Escalation to Competent Authority</span>
            </h3>
            <p className="text-gray-600 mb-3">
              Trigger high-level intervention due to SLA breach, persistent non-compliance, or major regulatory infractions.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Escalation Destination</label>
                <select
                  value={escalateTarget}
                  onChange={(e) => setEscalateTarget(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-xs bg-white text-gray-900"
                >
                  <option value="Prof. (Dr.) Rajive Kumar, Member Secretary, AICTE">
                    Prof. (Dr.) Rajive Kumar, Member Secretary, AICTE
                  </option>
                  <option value="Chairman, All India Council for Technical Education">
                    Chairman, AICTE
                  </option>
                  <option value="Standing Hearing Committee (SHC) Bench">
                    Standing Hearing Committee (SHC) Special Bench
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Escalation Note & Evidence Summary <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={3}
                  value={escalateReason}
                  onChange={(e) => setEscalateReason(e.target.value)}
                  placeholder="Enter grounds for immediate intervention by Competent Authority..."
                  className="w-full border border-gray-300 rounded p-2 text-xs text-gray-900"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleEscalate}
                className="px-4 py-1.5 bg-red-700 text-white rounded font-semibold hover:bg-red-800"
              >
                Confirm Escalation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Link Related Case */}
      {activeModal === "link" && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-gray-300 shadow-xl max-w-md w-full p-6 text-xs text-gray-800">
            <h3 className="font-bold text-sm text-amber-900 mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Link with Related Docket</span>
            </h3>
            <p className="text-gray-600 mb-3">
              Establish cross-bureau docket linking so that findings and show-cause replies are mutually visible to both officers.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Related Docket Number</label>
                <input
                  type="text"
                  value={linkCaseId}
                  onChange={(e) => setLinkCaseId(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-xs text-gray-900 font-mono"
                  placeholder="e.g. AICTE/RB/2026/01192"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Inter-Bureau Tagging Note</label>
                <textarea
                  rows={2}
                  value={linkNotes}
                  onChange={(e) => setLinkNotes(e.target.value)}
                  placeholder="Brief note on how these two proceedings overlap..."
                  className="w-full border border-gray-300 rounded p-2 text-xs text-gray-900"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-gray-200">
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLinkCase}
                className="px-4 py-1.5 bg-amber-700 text-white rounded font-semibold hover:bg-amber-800"
              >
                Establish Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Case Copilot */}
      <AICaseCopilot
        caseIdOrDocket={currentCase.caseId}
        permanentId={currentCase.permanentId}
        initialIsOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onAcceptAction={handleCopilotAcceptAction}
      />
    </div>
  );
}
