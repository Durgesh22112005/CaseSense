export interface CopilotCaseData {
  caseId: string;
  permanentId: string;
  institutionName: string;
  summaryBullets: string[];
  category: string;
  urgencyLevel: "Low" | "Medium" | "High" | "Critical";
  currentBureau: string;
  pendingDuration: string;
  slaStatus: string;
  keyRisks: string[];
  overlapAnalysis: {
    hasOverlap: boolean;
    confidence: number;
    matchReasons: string[];
    linkedCases: {
      caseId: string;
      bureau: string;
      category: string;
      status: string;
      officer: string;
    }[];
    warningMessage?: string;
  };
  nextActionRecommendation: {
    action: string;
    reason: string;
    responsibleBureau: string;
    suggestedDeadline: string;
    escalationRecommendation?: string;
  };
  qaKnowledge: {
    questionPattern: string[];
    answer: string;
  }[];
}

export const COPILOT_MOCK_CASES: Record<string, CopilotCaseData> = {
  "AICTE/PGRC/2026/04821": {
    caseId: "AICTE/PGRC/2026/04821",
    permanentId: "1-43928104",
    institutionName: "Sunrise Institute of Technology",
    summaryBullets: [
      "Collective grievance signed by 38 final-year B.Tech students concerning unauthorized Rs. 35,000 'Development & Lab Maintenance Cess'.",
      "College administration has withheld original 10th/12th marks cards and migration certificates upon refusal of fee payment.",
      "7-day compliance window served on 18-10-2026 without full physical ledger submission by the management."
    ],
    category: "Unapproved Fee Surcharge & Withholding of Original Certificates",
    urgencyLevel: "High",
    currentBureau: "Public Grievance Redressal Cell (PGRC)",
    pendingDuration: "21 days elapsed since receipt",
    slaStatus: "Within Citizen Charter SLA (24 days remaining before 45-day deadline)",
    keyRisks: [
      "High probability of contradictory directives due to parallel Regulation Bureau inquiry (Case #AICTE/RB/2026/01192).",
      "Immediate academic jeopardy for graduating students unable to register for national placement/higher studies without certificates.",
      "Institutional non-compliance with AICTE Public Notice Advt No. AICTE/P&AP/10(01)/2019."
    ],
    overlapAnalysis: {
      hasOverlap: true,
      confidence: 96,
      matchReasons: [
        "AICTE Permanent ID match: 1-43928104 (Exact Deterministic Match)",
        "Institution-name similarity: 94% ('Sunrise Institute of Technology' vs 'Sunrise Inst. of Tech, Pune')",
        "Location match: Hinjewadi Phase 3, Pune, Maharashtra (Western Region)",
        "Complaint-text similarity: 81% (Cross-references administrative coercion and non-compliance with AICTE regulations)"
      ],
      linkedCases: [
        {
          caseId: "AICTE/RB/2026/01192",
          bureau: "Regulation Bureau (RB)",
          category: "Infrastructure Deficiencies & Faculty Cadre Ratio Non-Compliance",
          status: "Pending Scrutiny",
          officer: "Shri R. K. Srivastava (Senior Hearing Officer)"
        }
      ],
      warningMessage: "Potential overlapping cases detected. Coordination required."
    },
    nextActionRecommendation: {
      action: "Convene Joint Standing Hearing Committee (SHC) summons with Regulation Bureau (RB) and freeze certificate withholding.",
      reason: "Synchronizes the student fee grievance with the on-site faculty deficit findings, preventing conflicting institutional penalties and ensuring immediate release of student certificates.",
      responsibleBureau: "Coordination Cell / Joint Committee (RB + PGRC)",
      suggestedDeadline: "05-11-2026",
      escalationRecommendation: "If institution management fails to appear at joint hearing or produce certificates by 05-11-2026, invoke Approval Process Handbook Clause 8.2 to reduce sanctioned intake by 25% for Academic Year 2027-28."
    },
    qaKnowledge: [
      {
        questionPattern: ["why", "overlap", "overlapping", "marked"],
        answer: "This case is marked as overlapping with 96% confidence because both PGRC and Regulation Bureau (RB) have concurrent active dockets for Sunrise Institute of Technology (PID: 1-43928104). The complaints originate from the same Hinjewadi campus, and textual analysis reveals shared references to institutional coercion and regulatory non-compliance."
      },
      {
        questionPattern: ["action", "pgrc", "take", "next"],
        answer: "PGRC should immediately coordinate with Shri R. K. Srivastava (RB) to issue a Joint Hearing Notice. Concurrently, an interim compliance direction should be dispatched requiring the Principal to release withheld original certificates within 48 hours under AICTE Public Notice Advt No. AICTE/P&AP/10(01)/2019."
      },
      {
        questionPattern: ["sla", "breach", "likely", "timeline"],
        answer: "This case is currently within the 45-day Citizen Charter SLA with 24 days remaining. However, if the joint hearing is delayed beyond 10-11-2026, it enters the Amber Caution zone (30+ days). Immediate scheduling prevents SLA breach."
      },
      {
        questionPattern: ["history", "institution", "complaint", "summarize"],
        answer: "Sunrise Institute of Technology (PID: 1-43928104) has 8 total lifetime complaints recorded in the AICTE Permanent Register: 6 disposed (related to hostel mess and lab equipment in 2024-2025) and 2 currently active (the current student fee grievance and a faculty deficit regulatory inquiry). The institution is flagged with a 'High Risk' profile."
      }
    ]
  },
  "AICTE/RB/2026/01192": {
    caseId: "AICTE/RB/2026/01192",
    permanentId: "1-43928104",
    institutionName: "Sunrise Institute of Technology",
    summaryBullets: [
      "Western Regional Office (WRO) surprise physical inspection revealed 22% faculty deficit against sanctioned intake.",
      "Non-functional fire safety clearances documented in academic block C.",
      "Unapproved floor area modifications noted in violation of approved architectural drawings."
    ],
    category: "Infrastructure Deficiencies & Faculty Cadre Ratio Non-Compliance",
    urgencyLevel: "High",
    currentBureau: "Regulation Bureau (RB)",
    pendingDuration: "14 days elapsed since inspection receipt",
    slaStatus: "Within Scrutiny Timeline (31 days remaining)",
    keyRisks: [
      "Concurrent student fee dispute in PGRC (#AICTE/PGRC/2026/04821) points to severe institutional governance failure.",
      "Life safety compliance defect (expired fire NOC).",
      "Deficient cadred teaching staff undermining academic delivery quality."
    ],
    overlapAnalysis: {
      hasOverlap: true,
      confidence: 96,
      matchReasons: [
        "AICTE Permanent ID match: 1-43928104 (Exact Deterministic Match)",
        "Institution-name similarity: 94%",
        "Location match: Pune, Maharashtra (Western Region)",
        "Complaint-text similarity: 81%"
      ],
      linkedCases: [
        {
          caseId: "AICTE/PGRC/2026/04821",
          bureau: "Public Grievance Redressal Cell (PGRC)",
          category: "Unapproved Fee Surcharge & Withholding of Original Certificates",
          status: "Under Process",
          officer: "Dr. Sunita Deshmukh (Assistant Director)"
        }
      ],
      warningMessage: "Potential overlapping cases detected. Coordination required."
    },
    nextActionRecommendation: {
      action: "Issue formal Show Cause Notice under Approval Process Handbook Clause 8.2 and merge proceedings with PGRC Case #04821.",
      reason: "Provides consolidated institutional scrutiny before the Standing Hearing Committee (SHC) so that approval sanctions and student grievances are addressed simultaneously.",
      responsibleBureau: "Regulation Bureau (RB)",
      suggestedDeadline: "02-11-2026",
      escalationRecommendation: "In case of non-rectification of faculty deficit within 15 days of notice, recommend intake reduction or 'No Admission' category for AY 2027-28."
    },
    qaKnowledge: [
      {
        questionPattern: ["why", "overlap", "overlapping"],
        answer: "This regulatory docket coincides with PGRC Case #AICTE/PGRC/2026/04821 concerning unauthorized fees. The AICTE overlap engine flagged 96% match confidence across PID 1-43928104, Hinjewadi campus address, and shared administrative non-compliance."
      },
      {
        questionPattern: ["action", "take", "next"],
        answer: "Issue Show Cause Notice citing Clause 8.2 of the Approval Process Handbook with 10 days to furnish certified salary registers, EPF statements, and revised municipal fire safety clearances."
      },
      {
        questionPattern: ["sla", "breach"],
        answer: "The case is on track with 31 days remaining on the statutory clock. Progress is currently satisfactory provided notice is issued by 02-11-2026."
      },
      {
        questionPattern: ["history", "institution"],
        answer: "The institution has 8 lifetime complaints and is in the 'High Risk' bracket. Prior compliance undertakings were submitted in 2025 regarding hostel facilities."
      }
    ]
  },
  "AICTE/RB/2026/01244": {
    caseId: "AICTE/RB/2026/01244",
    permanentId: "1-38294012",
    institutionName: "Vidyapeeth Academy of Management Studies",
    summaryBullets: [
      "Operating unapproved distance education and off-campus franchise study centres in Ranchi, Patna, and Siliguri.",
      "Institution failed to appear before two consecutive scrutiny panels.",
      "Severe timeline breach (+27 days past statutory 60-day limit)."
    ],
    category: "Operating Unapproved Distance Education & Off-Campus Study Centres",
    urgencyLevel: "Critical",
    currentBureau: "Regulation Bureau (RB)",
    pendingDuration: "87 days elapsed (SLA breached)",
    slaStatus: "CRITICAL BREACH (+27 days overdue)",
    keyRisks: [
      "Continued fraudulent admission of students into unaccredited programs.",
      "Contempt of Council summons and deliberate procedural evasion.",
      "Potential public litigation / PIL against AICTE regulatory inaction."
    ],
    overlapAnalysis: {
      hasOverlap: true,
      confidence: 91,
      matchReasons: [
        "AICTE Permanent ID match: 1-38294012 (Verified)",
        "Institution-name similarity: 98%",
        "Location match: Salt Lake, Kolkata, West Bengal (Eastern Region)",
        "Complaint-text similarity: 79%"
      ],
      linkedCases: [
        {
          caseId: "AICTE/PGRC/2026/04112",
          bureau: "Public Grievance Redressal Cell (PGRC)",
          category: "False Placement Claims & Unaccredited Degree Award in Distance Wing",
          status: "Under Process",
          officer: "Dr. Sunita Deshmukh"
        }
      ],
      warningMessage: "Potential overlapping cases detected. Coordination required."
    },
    nextActionRecommendation: {
      action: "Convene Special Standing Hearing Committee (SHC) Bench with Member Secretary and initiate public advisory notice.",
      reason: "Statutory 60-day disposal ceiling has been breached by 27 days. Institution has boycotted prior notices.",
      responsibleBureau: "Office of the Member Secretary & Competent Authority",
      suggestedDeadline: "28-10-2026",
      escalationRecommendation: "Immediate withdrawal of AICTE approval for PGDM programs and publication of cautionary notice in national dailies."
    },
    qaKnowledge: [
      {
        questionPattern: ["why", "overlap", "overlapping"],
        answer: "This case overlaps with PGRC Case #AICTE/PGRC/2026/04112 (91% confidence). Both proceedings concern unauthorized PGDM distance education franchises operated by Vidyapeeth Academy (PID: 1-38294012)."
      },
      {
        questionPattern: ["action", "take", "next"],
        answer: "Immediate ex-parte determination by the Standing Hearing Committee (SHC) chaired by Member Secretary, AICTE."
      },
      {
        questionPattern: ["sla", "breach"],
        answer: "CRITICAL SLA BREACH: Case is 27 days past the statutory 60-day ceiling (total duration 87 days). Mandatory escalation has already been triggered to Member Secretary."
      },
      {
        questionPattern: ["history", "institution"],
        answer: "Vidyapeeth Academy has 11 lifetime complaints and is classified as 'High Risk'. 3 active dockets currently exist across Eastern Regional Office and RB."
      }
    ]
  }
};

/**
 * Fallback generator for any case not explicitly in the static dictionary
 */
export function generateFallbackCopilotData(
  caseId: string,
  permanentId?: string,
  institutionName?: string,
  bureau?: string,
  category?: string,
  status?: string
): CopilotCaseData {
  const isSlaCritical = status === "Escalated" || category?.includes("Unapproved");
  const hasOverlap = !!(caseId.includes("04821") || caseId.includes("01192") || caseId.includes("01244"));

  return {
    caseId,
    permanentId: permanentId || "1-43928104",
    institutionName: institutionName || "Technical Institution",
    summaryBullets: [
      `Official complaint docket registered under ${bureau || "AICTE Redressal Bureau"}.`,
      `Nature of grievance involves ${category || "regulatory compliance and institutional governance standards"}.`,
      `Current formal processing status is recorded as '${status || "Under Process"}' with inquiry documents attached.`
    ],
    category: category || "Institutional Governance & Compliance Norms",
    urgencyLevel: isSlaCritical ? "Critical" : "Medium",
    currentBureau: bureau || "AICTE Bureau / Cell",
    pendingDuration: "18 days elapsed since formal receipt",
    slaStatus: isSlaCritical
      ? "SLA breach / escalation threshold reached"
      : "Within Citizen Charter norms (22 days remaining)",
    keyRisks: [
      "Potential compliance divergence with Approval Process Handbook regulations.",
      "Delays in institutional submission could trigger mandatory escalation to Regional Committee.",
      "Cross-bureau cross-checking advised against AICTE Permanent Registry."
    ],
    overlapAnalysis: {
      hasOverlap,
      confidence: hasOverlap ? 94 : 32,
      matchReasons: hasOverlap
        ? [
            `AICTE Permanent ID match: ${permanentId || "1-43928104"} (Exact Deterministic Match)`,
            "Institution-name similarity: 94%",
            "Administrative regional jurisdiction match"
          ]
        : ["No primary deterministic overlap detected on permanent institution ID."],
      linkedCases: hasOverlap
        ? [
            {
              caseId: "AICTE/RB/2026/01192",
              bureau: "Regulation Bureau (RB)",
              category: "Infrastructure & Faculty Deficiencies",
              status: "Under Process",
              officer: "Shri R. K. Srivastava"
            }
          ]
        : [],
      warningMessage: hasOverlap
        ? "Potential overlapping cases detected. Coordination required."
        : undefined
    },
    nextActionRecommendation: {
      action: "Conduct formal documentary verification and issue standard clarification memorandum.",
      reason: "Ensures evidence-backed disposal in accordance with natural justice and AICTE Redressal Regulations.",
      responsibleBureau: bureau || "Assigned Bureau Desk",
      suggestedDeadline: "08-11-2026",
      escalationRecommendation: "In case of non-response within 15 days, refer docket to the Regional Hearing Committee."
    },
    qaKnowledge: [
      {
        questionPattern: ["why", "overlap", "overlapping"],
        answer: hasOverlap
          ? "This institution has parallel proceedings active across both regulatory and public grievance channels with shared PID and institutional jurisdiction."
          : "No significant overlap detected. This case is currently localized to the assigned bureau desk without cross-cell conflicts."
      },
      {
        questionPattern: ["action", "take", "next"],
        answer: "Verify institution compliance documentation and schedule preliminary desk hearing with authorized representative."
      },
      {
        questionPattern: ["sla", "breach"],
        answer: isSlaCritical
          ? "Case requires high-priority monitoring to avoid further delay beyond statutory ceilings."
          : "Case is operating within the prescribed Citizen Charter timeline."
      },
      {
        questionPattern: ["history", "institution"],
        answer: `Permanent ID ${permanentId || "1-43928104"} maintains complete archival records in the AICTE Permanent Institution Register.`
      }
    ]
  };
}
