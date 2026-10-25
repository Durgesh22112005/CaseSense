"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CopilotCaseData } from "@/lib/copilot/mockCopilotData";
import {
  AlertTriangle,
  Link2,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Users,
  Check,
  ExternalLink,
} from "lucide-react";

interface OverlapAnalysisTabProps {
  data: CopilotCaseData;
  onAssignOwner?: () => void;
}

export const OverlapAnalysisTab: React.FC<OverlapAnalysisTabProps> = ({
  data,
  onAssignOwner,
}) => {
  const [assignedStatus, setAssignedStatus] = useState<string>("");
  const overlap = data.overlapAnalysis;

  const handleAssignClick = () => {
    setAssignedStatus("Assigned to Smt. Jayashree Ramanathan (Coordination Officer)");
    if (onAssignOwner) onAssignOwner();
  };

  return (
    <div className="space-y-4 text-xs text-gray-800">
      {/* Formal Warning Banner if Confidence > 80% */}
      {overlap.hasOverlap && overlap.confidence >= 80 && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-3 text-red-950 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span className="font-bold text-xs uppercase tracking-tight text-red-900">
              Potential Overlapping Cases Detected. Coordination Required.
            </span>
          </div>
          <p className="text-[11px] text-red-900 leading-relaxed font-medium">
            AICTE Cross-Bureau Engine detected concurrent active proceedings on this institution.
            Issuing isolated orders risks contradictory regulatory rulings.
          </p>
        </div>
      )}

      {/* Overlap Confidence Indicator Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <span className="text-[10px] uppercase font-bold text-gray-500">
            Automated Match Confidence
          </span>
          <span
            className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
              overlap.confidence >= 80
                ? "bg-red-100 text-red-800 border border-red-300"
                : "bg-emerald-100 text-emerald-800 border border-emerald-300"
            }`}
          >
            {overlap.confidence}% Match
          </span>
        </div>

        {/* Confidence Meter Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 mt-2.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              overlap.confidence >= 80 ? "bg-red-600" : "bg-[#0B4F9C]"
            }`}
            style={{ width: `${overlap.confidence}%` }}
          />
        </div>
      </div>

      {/* Match Reasons Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
        <div className="text-[10px] uppercase font-bold text-gray-700">
          Deterministic & Semantic Match Parameters
        </div>
        <ul className="space-y-1.5 text-[11px] text-gray-700">
          {overlap.matchReasons.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0B4F9C] flex-shrink-0 mt-0.5" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Linked Cases List */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
        <div className="text-[10px] uppercase font-bold text-gray-700 flex items-center justify-between">
          <span>Identified Parallel Dockets ({overlap.linkedCases.length})</span>
          <span className="font-mono text-gray-500">Cross-Bureau</span>
        </div>

        {overlap.linkedCases.length === 0 ? (
          <p className="text-[11px] text-gray-500 italic py-2">
            No active concurrent dockets found for this institution.
          </p>
        ) : (
          <div className="space-y-2 pt-1">
            {overlap.linkedCases.map((lc, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-gray-50 border border-gray-200 rounded text-[11px] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#0B4F9C]">
                    {lc.caseId}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-semibold text-[10px]">
                    {lc.status}
                  </span>
                </div>
                <div className="text-gray-900 font-medium">{lc.bureau}</div>
                <div className="text-gray-600 text-[10px]">{lc.category}</div>
                <div className="text-gray-500 text-[10px] pt-1 border-t border-gray-200">
                  Officer: <strong>{lc.officer}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Notice if Assigned */}
      {assignedStatus && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded text-emerald-900 text-[11px] font-medium flex items-center gap-1.5">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{assignedStatus}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col gap-2">
        <Link
          href="/overlap"
          className="w-full py-2 bg-[#0F1E36] hover:bg-black text-white rounded text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Review Linked Cases in Radar</span>
        </Link>

        <button
          onClick={handleAssignClick}
          className="w-full py-2 bg-white border border-[#0B4F9C] text-[#0B4F9C] hover:bg-blue-50 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition"
        >
          <Users className="w-3.5 h-3.5" />
          <span>Assign Coordination Owner</span>
        </button>
      </div>
    </div>
  );
};
