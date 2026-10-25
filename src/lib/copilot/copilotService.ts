import {
  COPILOT_MOCK_CASES,
  CopilotCaseData,
  generateFallbackCopilotData,
} from "./mockCopilotData";
import { COMPLAINT_CASES, INSTITUTIONS } from "@/data/mockData";

export interface CopilotChatResponse {
  answer: string;
  sourceContext: string;
  timestamp: string;
  confidenceScore: number;
}

/**
 * Service Layer for AI Case Copilot.
 * Architecture Note:
 * For the SIH prototype, this service uses high-fidelity simulated intelligence with a 1-2s response delay.
 * To integrate live Gemini 1.5 Pro / Flash or OpenAI API in production, simply replace the mock resolver
 * in queryCopilot() with a fetch call to your backend API route (/api/copilot/chat).
 */
export class CopilotService {
  /**
   * Fetch structured Copilot advisory profile for a given case
   */
  public static async getCaseCopilotData(
    caseIdOrDocket: string
  ): Promise<CopilotCaseData> {
    // Simulate brief initial advisory synthesis
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Exact match in mock dictionary
    if (COPILOT_MOCK_CASES[caseIdOrDocket]) {
      return COPILOT_MOCK_CASES[caseIdOrDocket];
    }

    // Try finding by internal ID (e.g. "case-01") in COMPLAINT_CASES
    const foundCase = COMPLAINT_CASES.find(
      (c) => c.id === caseIdOrDocket || c.caseId === caseIdOrDocket
    );

    if (foundCase) {
      if (COPILOT_MOCK_CASES[foundCase.caseId]) {
        return COPILOT_MOCK_CASES[foundCase.caseId];
      }
      return generateFallbackCopilotData(
        foundCase.caseId,
        foundCase.permanentId,
        foundCase.institutionName,
        foundCase.bureau,
        foundCase.category,
        foundCase.status
      );
    }

    // Default to the flagship SIH case
    return COPILOT_MOCK_CASES["AICTE/PGRC/2026/04821"];
  }

  /**
   * Fetch Copilot data for an institution 360 context
   */
  public static async getInstitutionCopilotData(
    permanentId: string
  ): Promise<CopilotCaseData> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const relatedCase = COMPLAINT_CASES.find(
      (c) => c.permanentId === permanentId
    );

    if (relatedCase && COPILOT_MOCK_CASES[relatedCase.caseId]) {
      return COPILOT_MOCK_CASES[relatedCase.caseId];
    }

    const inst = INSTITUTIONS.find((i) => i.permanentId === permanentId);
    return generateFallbackCopilotData(
      relatedCase ? relatedCase.caseId : `AICTE/PID/${permanentId}`,
      permanentId,
      inst ? inst.name : "Technical Institution",
      relatedCase ? relatedCase.bureau : "Central Monitoring Cell",
      relatedCase ? relatedCase.category : "Cross-Bureau Oversight Dossier",
      relatedCase ? relatedCase.status : "Under Process"
    );
  }

  /**
   * Ask Copilot a question with simulated 1-2 second loading delay
   */
  public static async queryCopilot(
    caseIdOrDocket: string,
    userQuestion: string
  ): Promise<CopilotChatResponse> {
    // Simulate 1.2 to 1.6 second inference latency with professional feel
    const delay = Math.floor(Math.random() * 400) + 1200;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const caseData = await this.getCaseCopilotData(caseIdOrDocket);
    const qLower = userQuestion.toLowerCase().trim();

    // Check knowledge base patterns
    let bestMatch = caseData.qaKnowledge.find((item) =>
      item.questionPattern.some((kw) => qLower.includes(kw))
    );

    let answerText = "";

    if (bestMatch) {
      answerText = bestMatch.answer;
    } else if (qLower.includes("overlap") || qLower.includes("duplicate")) {
      answerText = caseData.overlapAnalysis.hasOverlap
        ? `Advisory Finding: This case has verified cross-bureau overlap (${caseData.overlapAnalysis.confidence}% confidence) with concurrent proceedings in other cells. A designated coordination owner must be appointed to avoid issuing contradictory directives to ${caseData.institutionName}.`
        : `Advisory Finding: No critical cross-bureau overlap has been flagged for this docket. Proceedings are isolated to ${caseData.currentBureau}.`;
    } else if (qLower.includes("action") || qLower.includes("next") || qLower.includes("recommend")) {
      answerText = `Recommended Course of Action: ${caseData.nextActionRecommendation.action} Target Deadline: ${caseData.nextActionRecommendation.suggestedDeadline}. Rationale: ${caseData.nextActionRecommendation.reason}`;
    } else if (qLower.includes("sla") || qLower.includes("timeline") || qLower.includes("delay")) {
      answerText = `SLA Advisory Assessment: Current status is '${caseData.slaStatus}'. ${caseData.pendingDuration}. Ensure statutory compliance before the Citizen Charter window expires.`;
    } else if (qLower.includes("risk") || qLower.includes("critical") || qLower.includes("hazard")) {
      answerText = `Key Identified Risks: 1) ${caseData.keyRisks[0] || "Compliance divergence"} 2) ${caseData.keyRisks[1] || "Institutional non-responsiveness"} 3) ${caseData.keyRisks[2] || "Procedural delay"}.`;
    } else if (qLower.includes("history") || qLower.includes("institution")) {
      answerText = `Institution Dossier: ${caseData.institutionName} (AICTE PID: ${caseData.permanentId}). Maintained under ${caseData.currentBureau} oversight. Classified with ${caseData.urgencyLevel} priority monitoring.`;
    } else {
      answerText = `Advisory Summary: For case ${caseData.caseId} (${caseData.institutionName}), the recommended priority is ${caseData.nextActionRecommendation.action}. Please review the Overlap and Next Action tabs for detailed regulatory citations.`;
    }

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return {
      answer: answerText,
      sourceContext: `${caseData.caseId} • ${caseData.currentBureau}`,
      timestamp: `${hours}:${minutes} IST`,
      confidenceScore: caseData.overlapAnalysis.confidence || 92,
    };
  }
}
