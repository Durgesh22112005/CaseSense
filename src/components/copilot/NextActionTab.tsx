"use client";

import React, { useState } from "react";
import { CopilotCaseData } from "@/lib/copilot/mockCopilotData";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  AlertTriangle,
  Building,
  Check,
  RotateCcw,
} from "lucide-react";

interface NextActionTabProps {
  data: CopilotCaseData;
  onAcceptAction?: (actionText: string, bureau: string, deadline: string) => void;
}

export const NextActionTab: React.FC<NextActionTabProps> = ({
  data,
  onAcceptAction,
}) => {
  const [decisionState, setDecisionState] = useState<
    "idle" | "accepted" | "rejected" | "review"
  >("idle");

  const rec = data.nextActionRecommendation;

  const handleAccept = () => {
    setDecisionState("accepted");
    if (onAcceptAction) {
      onAcceptAction(rec.action, rec.responsibleBureau, rec.suggestedDeadline);
    }
  };

  const handleReject = () => {
    setDecisionState("rejected");
  };

  const handleReview = () => {
    setDecisionState("review");
  };

  return (
    <div className="space-y-4 text-xs text-gray-800">
      {/* Recommended Action Card */}
      <div className="bg-white border-2 border-blue-500 rounded-lg p-3.5 space-y-2.5">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#0B4F9C]">
            AI Recommended Course of Action
          </span>
          <span className="text-[10px] bg-blue-100 text-[#0B4F9C] font-mono px-2 py-0.5 rounded font-bold">
            ADVISORY
          </span>
        </div>

        <div className="text-sm font-bold text-[#0F1E36] leading-snug">
          {rec.action}
        </div>

        <div className="p-2.5 bg-gray-50 border border-gray-200 rounded text-[11px] text-gray-700 space-y-1">
          <span className="font-bold text-gray-900 block">Regulatory Justification:</span>
          <p className="leading-relaxed">{rec.reason}</p>
        </div>

        {/* Responsible Bureau & Deadline Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-[11px]">
          <div>
            <span className="text-gray-500 text-[10px] uppercase font-semibold block">
              Lead Bureau / Cell
            </span>
            <span className="font-semibold text-gray-900 mt-0.5 block">
              {rec.responsibleBureau}
            </span>
          </div>

          <div>
            <span className="text-gray-500 text-[10px] uppercase font-semibold block">
              Target Deadline
            </span>
            <span className="font-mono font-bold text-red-700 mt-0.5 block flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-red-600" />
              <span>{rec.suggestedDeadline}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Escalation Recommendation Notice if Available */}
      {rec.escalationRecommendation && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            <span>Conditional Escalation Trigger</span>
          </div>
          <p className="text-[11px] text-amber-900 leading-relaxed">
            {rec.escalationRecommendation}
          </p>
        </div>
      )}

      {/* Decision Status Banners */}
      {decisionState === "accepted" && (
        <div className="p-3 bg-emerald-50 border border-emerald-400 rounded-lg text-emerald-950 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Recommendation accepted. Action recorded in case history.</span>
          </div>
          <p className="text-[11px] text-emerald-800">
            A new operational milestone was added to the case timeline with current timestamp.
          </p>
        </div>
      )}

      {decisionState === "rejected" && (
        <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-red-900 text-[11px]">
          <div className="font-bold flex items-center gap-1.5 text-red-800">
            <XCircle className="w-4 h-4 text-red-600" />
            <span>Recommendation rejected by officer.</span>
          </div>
          <p className="mt-0.5">Custom action can be logged manually via the Case Details docket.</p>
        </div>
      )}

      {decisionState === "review" && (
        <div className="p-3 bg-blue-50 border border-blue-300 rounded-lg text-blue-900 text-[11px]">
          <div className="font-bold flex items-center gap-1.5 text-blue-800">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Marked for Senior Officer Review.</span>
          </div>
          <p className="mt-0.5">Dossier flagged for discussion during upcoming Bureau Scrutiny meeting.</p>
        </div>
      )}

      {/* Action Decision Buttons */}
      <div className="space-y-2 pt-1">
        <button
          onClick={handleAccept}
          className={`w-full py-2.5 rounded text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs ${
            decisionState === "accepted"
              ? "bg-emerald-700 text-white"
              : "bg-[#0B4F9C] hover:bg-[#073a75] text-white"
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{decisionState === "accepted" ? "Recommendation Accepted" : "Accept Recommendation"}</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleReject}
            className="py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded text-xs font-semibold transition"
          >
            Reject Recommendation
          </button>
          <button
            onClick={handleReview}
            className="py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded text-xs font-semibold transition"
          >
            Mark for Review
          </button>
        </div>
      </div>
    </div>
  );
};
