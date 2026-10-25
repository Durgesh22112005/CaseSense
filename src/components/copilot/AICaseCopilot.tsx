"use client";

import React, { useState, useEffect } from "react";
import { CopilotCaseData } from "@/lib/copilot/mockCopilotData";
import { CopilotService } from "@/lib/copilot/copilotService";
import { CaseSummaryTab } from "./CaseSummaryTab";
import { OverlapAnalysisTab } from "./OverlapAnalysisTab";
import { NextActionTab } from "./NextActionTab";
import { AskCopilotTab } from "./AskCopilotTab";
import {
  Sparkles,
  X,
  ChevronRight,
  Maximize2,
  Minimize2,
  Building,
  FileText,
  AlertTriangle,
  Send,
  HelpCircle,
  Shield,
  Layers,
} from "lucide-react";

interface AICaseCopilotProps {
  caseIdOrDocket?: string;
  permanentId?: string;
  initialIsOpen?: boolean;
  onClose?: () => void;
  onAcceptAction?: (actionText: string, bureau: string, deadline: string) => void;
  className?: string;
}

export const AICaseCopilot: React.FC<AICaseCopilotProps> = ({
  caseIdOrDocket = "AICTE/PGRC/2026/04821",
  permanentId,
  initialIsOpen = true,
  onClose,
  onAcceptAction,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialIsOpen);
  const [activeTab, setActiveTab] = useState<
    "summary" | "overlap" | "action" | "ask"
  >("summary");
  const [copilotData, setCopilotData] = useState<CopilotCaseData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingData(true);

    const loadData = async () => {
      try {
        let data: CopilotCaseData;
        if (permanentId && !caseIdOrDocket) {
          data = await CopilotService.getInstitutionCopilotData(permanentId);
        } else {
          data = await CopilotService.getCaseCopilotData(caseIdOrDocket);
        }
        if (isMounted) {
          setCopilotData(data);
          setIsLoadingData(false);
        }
      } catch (err) {
        if (isMounted) setIsLoadingData(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [caseIdOrDocket, permanentId]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (!nextState && onClose) {
      onClose();
    }
  };

  const tabs = [
    { id: "summary", label: "Case Summary" },
    { id: "overlap", label: "Overlap Analysis" },
    { id: "action", label: "Next Action" },
    { id: "ask", label: "Ask Copilot" },
  ];

  return (
    <>
      {/* Floating Copilot Launcher Pill (when collapsed) */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="fixed bottom-6 right-6 z-40 bg-[#0F1E36] hover:bg-[#0B4F9C] text-white px-4 py-2.5 rounded-full shadow-lg border border-blue-900 flex items-center gap-2.5 transition transform hover:scale-105 select-none"
          title="Open AI Case Copilot"
        >
          <div className="w-6 h-6 rounded-full bg-[#0B4F9C] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
              <span>AI Case Copilot</span>
              {copilotData?.overlapAnalysis.hasOverlap && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </div>
            <div className="text-[10px] text-gray-300 font-mono leading-tight">
              {caseIdOrDocket}
            </div>
          </div>
        </button>
      )}

      {/* Slide-over Backdrop on mobile/tablet */}
      {isOpen && (
        <div
          onClick={handleToggle}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Main Copilot Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] md:w-[440px] bg-white border-l border-gray-300 shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${className}`}
        aria-label="AI Case Copilot Panel"
      >
        {/* Panel Official Header */}
        <div className="bg-[#0F1E36] text-white p-4 flex items-center justify-between border-b border-blue-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B4F9C] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold tracking-tight">AI Case Copilot</h2>
                <span className="text-[9px] bg-blue-900 text-blue-200 px-1.5 py-0.2 rounded font-mono border border-blue-800">
                  INTERNAL ADVISORY
                </span>
              </div>
              <p className="text-[10px] text-gray-300">
                Advisory support for authorized AICTE officers
              </p>
            </div>
          </div>

          <button
            onClick={handleToggle}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#182C4E] rounded transition"
            title="Collapse Copilot"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Context Ribbon */}
        <div className="bg-[#EBF3FC] px-4 py-2 border-b border-blue-200 flex items-center justify-between text-xs text-[#0F1E36]">
          <div className="truncate pr-2">
            <span className="text-[10px] uppercase font-bold text-gray-500 block">
              Active Context
            </span>
            <span className="font-mono font-bold text-[#0B4F9C] text-xs">
              {copilotData?.caseId || caseIdOrDocket}
            </span>
            <span className="text-[11px] text-gray-700 ml-1.5 truncate">
              • {copilotData?.institutionName || "Sunrise Institute of Technology"}
            </span>
          </div>

          <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-blue-300 text-gray-700 flex-shrink-0">
            PID: {copilotData?.permanentId || "1-43928104"}
          </span>
        </div>

        {/* 4 Tabs Navigation Bar */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-2 pt-2 gap-1 text-xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 px-1 text-center font-semibold text-[11px] rounded-t border-b-2 transition ${
                  isActive
                    ? "bg-white text-[#0B4F9C] border-[#0B4F9C] shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-transparent"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
          {isLoadingData ? (
            <div className="p-6 space-y-3 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          ) : copilotData ? (
            <>
              {activeTab === "summary" && <CaseSummaryTab data={copilotData} />}
              {activeTab === "overlap" && <OverlapAnalysisTab data={copilotData} />}
              {activeTab === "action" && (
                <NextActionTab
                  data={copilotData}
                  onAcceptAction={onAcceptAction}
                />
              )}
              {activeTab === "ask" && <AskCopilotTab data={copilotData} />}
            </>
          ) : (
            <div className="text-center py-10 text-gray-500 text-xs">
              No advisory data available for this context.
            </div>
          )}
        </div>

        {/* Panel Footer */}
        <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between text-[10px] text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-[#0B4F9C]" />
            <span>AICTE AI Advisory Engine v2.4</span>
          </div>
          <span className="font-mono">Govt. of India</span>
        </div>
      </aside>
    </>
  );
};
