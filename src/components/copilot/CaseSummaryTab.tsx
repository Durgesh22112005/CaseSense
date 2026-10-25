"use client";

import React from "react";
import { CopilotCaseData } from "@/lib/copilot/mockCopilotData";
import {
  FileText,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Building,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface CaseSummaryTabProps {
  data: CopilotCaseData;
}

export const CaseSummaryTab: React.FC<CaseSummaryTabProps> = ({ data }) => {
  const getUrgencyBadge = (level: string) => {
    switch (level) {
      case "Critical":
        return "bg-red-100 text-red-900 border-red-300 font-bold";
      case "High":
        return "bg-amber-100 text-amber-900 border-amber-300 font-bold";
      case "Medium":
        return "bg-blue-100 text-blue-900 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="space-y-4 text-xs text-gray-800">
      {/* Primary Key Metadata Grid */}
      <div className="grid grid-cols-2 gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div>
          <span className="text-[10px] uppercase font-semibold text-gray-500 block">
            Urgency Rating
          </span>
          <span
            className={`inline-block px-2 py-0.5 rounded text-[11px] border mt-1 ${getUrgencyBadge(
              data.urgencyLevel
            )}`}
          >
            {data.urgencyLevel} Priority
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-semibold text-gray-500 block">
            Current Bureau / Cell
          </span>
          <span className="font-semibold text-gray-900 line-clamp-1 mt-1" title={data.currentBureau}>
            {data.currentBureau}
          </span>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <span className="text-[10px] uppercase font-semibold text-gray-500 block">
            Pending Duration
          </span>
          <span className="font-semibold text-gray-900 mt-0.5 block">
            {data.pendingDuration}
          </span>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <span className="text-[10px] uppercase font-semibold text-gray-500 block">
            SLA Compliance
          </span>
          <span
            className={`font-semibold mt-0.5 block ${
              data.slaStatus.includes("CRITICAL") || data.slaStatus.includes("breach")
                ? "text-red-700"
                : "text-emerald-700"
            }`}
          >
            {data.slaStatus}
          </span>
        </div>
      </div>

      {/* Complaint Category */}
      <div className="border border-gray-200 rounded-lg p-3 bg-white">
        <span className="text-[10px] uppercase font-semibold text-gray-500 block">
          Categorized Subject of Grievance
        </span>
        <div className="font-bold text-gray-900 mt-1">{data.category}</div>
      </div>

      {/* 3-Bullet AI Executive Summary */}
      <div className="border border-gray-200 rounded-lg p-3 bg-white space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F1E36] pb-1.5 border-b border-gray-100">
          <FileText className="w-3.5 h-3.5 text-[#0B4F9C]" />
          <span>Synthesized Case Summary</span>
        </div>
        <ul className="space-y-2 text-[11px] text-gray-700">
          {data.summaryBullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B4F9C] flex-shrink-0 mt-1.5" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Key Identified Risks */}
      <div className="border border-red-200 rounded-lg p-3 bg-red-50/40 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-red-950 pb-1.5 border-b border-red-200">
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          <span>Statutory & Operational Risks</span>
        </div>
        <ul className="space-y-1.5 text-[11px] text-red-900">
          {data.keyRisks.map((risk, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <AlertCircle className="w-3 h-3 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{risk}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
