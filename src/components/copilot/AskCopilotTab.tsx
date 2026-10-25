"use client";

import React, { useState, useRef, useEffect } from "react";
import { CopilotCaseData } from "@/lib/copilot/mockCopilotData";
import { CopilotService, CopilotChatResponse } from "@/lib/copilot/copilotService";
import {
  Send,
  Sparkles,
  User,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "copilot";
  text: string;
  timestamp: string;
  confidence?: number;
}

interface AskCopilotTabProps {
  data: CopilotCaseData;
}

export const AskCopilotTab: React.FC<AskCopilotTabProps> = ({ data }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "copilot",
      text: `AICTE Case Copilot active for ${data.caseId} (${data.institutionName}). You can query cross-bureau overlap grounds, recommended statutory next steps, or regulatory precedents.`,
      timestamp: "Just now",
      confidence: 96,
    },
  ]);

  const [inputQuery, setInputQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Why are these cases marked as overlapping?",
    "What action should PGRC take next?",
    "Is this case likely to breach SLA?",
    "Summarize the institution’s complaint history.",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")} IST`;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend.trim(),
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const response: CopilotChatResponse = await CopilotService.queryCopilot(
        data.caseId,
        textToSend
      );

      const copilotMsg: ChatMessage = {
        id: `copilot-${Date.now()}`,
        sender: "copilot",
        text: response.answer,
        timestamp: response.timestamp,
        confidence: response.confidenceScore,
      };

      setMessages((prev) => [...prev, copilotMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "copilot",
        text: "Error retrieving advisory response. Please verify network access or select from suggested prompts.",
        timestamp: timeStr,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[520px] text-xs">
      {/* Suggested Questions Pills */}
      <div className="pb-2 border-b border-gray-200">
        <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1.5">
          Suggested Officer Inquiries
        </span>
        <div className="flex flex-wrap gap-1.5">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="text-left text-[11px] bg-blue-50/80 hover:bg-blue-100 text-[#0B4F9C] border border-blue-200 rounded px-2.5 py-1 transition disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[90%] rounded-lg p-3 text-xs leading-relaxed ${
                m.sender === "user"
                  ? "bg-[#0B4F9C] text-white"
                  : "bg-white border border-gray-200 text-gray-800 shadow-xs"
              }`}
            >
              <div className="flex items-center gap-1.5 pb-1 text-[10px] opacity-75 border-b border-white/20 mb-1.5">
                {m.sender === "user" ? (
                  <>
                    <User className="w-3 h-3" />
                    <span>Authorized AICTE Officer</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-[#0B4F9C]" />
                    <span className="font-bold text-[#0B4F9C]">AI Case Copilot</span>
                    {m.confidence && (
                      <span className="ml-auto font-mono text-[9px] bg-blue-100 text-blue-900 px-1 rounded">
                        {m.confidence}% Confidence
                      </span>
                    )}
                  </>
                )}
              </div>
              <div className="whitespace-pre-wrap">{m.text}</div>
            </div>
            <span className="text-[9px] text-gray-400 mt-0.5 px-1 font-mono">
              {m.timestamp}
            </span>
          </div>
        ))}

        {/* Professional Government Skeleton Loader */}
        {isLoading && (
          <div className="flex flex-col items-start space-y-1">
            <div className="bg-white border border-blue-200 rounded-lg p-3 max-w-[85%] w-full shadow-xs space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] text-[#0B4F9C] font-bold">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>Synthesizing cross-bureau regulations & case history...</span>
              </div>
              <div className="space-y-1.5 animate-pulse">
                <div className="h-2.5 bg-blue-100 rounded w-full"></div>
                <div className="h-2.5 bg-blue-100 rounded w-5/6"></div>
                <div className="h-2.5 bg-blue-100 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box & Disclaimer */}
      <div className="pt-2 border-t border-gray-200 space-y-1.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-1.5"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isLoading}
            placeholder="Ask about this case, institution, status, or overlap..."
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-xs text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#0B4F9C] disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="p-2 bg-[#0B4F9C] hover:bg-[#073a75] disabled:bg-gray-300 text-white rounded transition shadow-xs"
            title="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-gray-500 text-center leading-tight">
          AI output is advisory only. Final decision rests with the authorized AICTE officer.
        </p>
      </div>
    </div>
  );
};
