export interface ActionHistoryItem {
  id: string;
  dateTime: string;
  bureau: string;
  officer: string;
  actionTaken: string;
  remarks: string;
  nextAction: string;
  documentRef?: string;
}

export interface CaseDocument {
  id: string;
  name: string;
  dateUploaded: string;
  uploadedBy: string;
  size: string;
  type: string;
}

export interface ComplaintCase {
  id: string;
  caseId: string;
  permanentId: string;
  institutionName: string;
  institutionAddress: string;
  district: string;
  state: string;
  region: string;
  category: string;
  bureau: "Regulation Bureau (RB)" | "Public Grievance Redressal Cell (PGRC)" | "Approval Bureau" | "Regional Office (WRO)" | "Regional Office (SRO)";
  assignedOfficer: string;
  assignedOfficerRole: string;
  dateOfReceipt: string;
  status: "Pending" | "Under Process" | "Disposed" | "Transferred" | "Escalated";
  lastAction: string;
  lastActionDate: string;
  nextAction: string;
  expectedDisposalDate: string;
  slaDaysRemaining: number;
  isSlaBreached: boolean;
  isOverlapping: boolean;
  overlappingCaseIds?: string[];
  description: string;
  advisoryAiBrief: string;
  actionHistory: ActionHistoryItem[];
  documents: CaseDocument[];
  transferHistory: {
    fromBureau: string;
    toBureau: string;
    transferDate: string;
    transferredBy: string;
    reason: string;
  }[];
  escalationHistory: {
    escalatedTo: string;
    escalationDate: string;
    escalatedBy: string;
    level: string;
    reason: string;
  }[];
}

export interface InstitutionProfile {
  permanentId: string;
  name: string;
  address: string;
  district: string;
  state: string;
  region: string;
  pinCode: string;
  headOfInstitution: string;
  contactEmail: string;
  contactPhone: string;
  approvedIntake: number;
  programTypes: string[];
  riskLevel: "Low" | "Moderate" | "High";
  totalComplaints: number;
  activeComplaints: number;
  disposedComplaints: number;
  hasOverlappingCases: boolean;
}

export interface OverlapAlert {
  id: string;
  institutionName: string;
  permanentId: string;
  matchConfidence: number;
  status: "Under Review" | "Linked" | "Resolved";
  coordinationOwner?: string;
  caseA: {
    caseId: string;
    bureau: string;
    category: string;
    officer: string;
    dateOfReceipt: string;
    status: string;
  };
  caseB: {
    caseId: string;
    bureau: string;
    category: string;
    officer: string;
    dateOfReceipt: string;
    status: string;
  };
  matchReasons: string[];
}

export const INSTITUTIONS: InstitutionProfile[] = [
  {
    permanentId: "1-43928104",
    name: "Sunrise Institute of Technology",
    address: "Survey No. 42/1, Rajiv Gandhi Infotech Park, Phase 3, Hinjewadi",
    district: "Pune",
    state: "Maharashtra",
    region: "Western Region",
    pinCode: "411057",
    headOfInstitution: "Dr. Arvind S. Kulkarni (Director)",
    contactEmail: "director@sunrise-tech.edu.in",
    contactPhone: "+91 20 2293 8400",
    approvedIntake: 720,
    programTypes: ["Engineering & Technology (UG/PG)", "Management (MBA)"],
    riskLevel: "High",
    totalComplaints: 8,
    activeComplaints: 2,
    disposedComplaints: 6,
    hasOverlappingCases: true,
  },
  {
    permanentId: "1-28941021",
    name: "Bharati National College of Engineering",
    address: "B.G. Road, Hulimavu Gate, Bannerghatta Main Road",
    district: "Bengaluru Urban",
    state: "Karnataka",
    region: "South-Western Region",
    pinCode: "560076",
    headOfInstitution: "Prof. (Dr.) Manjunath Hegde",
    contactEmail: "principal@bharatinational.ac.in",
    contactPhone: "+91 80 2658 9200",
    approvedIntake: 960,
    programTypes: ["Engineering & Technology", "MCA"],
    riskLevel: "Moderate",
    totalComplaints: 5,
    activeComplaints: 1,
    disposedComplaints: 4,
    hasOverlappingCases: false,
  },
  {
    permanentId: "1-90123841",
    name: "Apex Institute of Pharmacy & Research",
    address: "NH-24, Sitapur Road, Bakshi Ka Talab",
    district: "Lucknow",
    state: "Uttar Pradesh",
    region: "Northern Region",
    pinCode: "226021",
    headOfInstitution: "Dr. Rajeshwar Prasad Mishra",
    contactEmail: "apex.pharmacy@lucknowinst.org",
    contactPhone: "+91 522 278 4110",
    approvedIntake: 240,
    programTypes: ["Pharmacy (B.Pharm/M.Pharm)"],
    riskLevel: "Low",
    totalComplaints: 3,
    activeComplaints: 1,
    disposedComplaints: 2,
    hasOverlappingCases: false,
  },
  {
    permanentId: "1-38294012",
    name: "Vidyapeeth Academy of Management Studies",
    address: "Plot 14, Block DP, Sector V, Bidhannagar",
    district: "Kolkata",
    state: "West Bengal",
    region: "Eastern Region",
    pinCode: "700091",
    headOfInstitution: "Dr. Ananya Roychowdhury",
    contactEmail: "registrar@vidyapeeth-mgmt.edu.in",
    contactPhone: "+91 33 2357 6620",
    approvedIntake: 300,
    programTypes: ["Management (PGDM)", "Executive PGDM"],
    riskLevel: "High",
    totalComplaints: 11,
    activeComplaints: 3,
    disposedComplaints: 8,
    hasOverlappingCases: true,
  },
  {
    permanentId: "1-55829103",
    name: "Kaveri Polytechnic & Skill Institute",
    address: "Avinashi Road, Civil Aerodrome Post, Peelamedu",
    district: "Coimbatore",
    state: "Tamil Nadu",
    region: "Southern Region",
    pinCode: "641004",
    headOfInstitution: "Er. K. Murugan",
    contactEmail: "principal@kaveripolytech.edu.in",
    contactPhone: "+91 422 257 3190",
    approvedIntake: 480,
    programTypes: ["Diploma Engineering", "Vocational Studies"],
    riskLevel: "Low",
    totalComplaints: 2,
    activeComplaints: 1,
    disposedComplaints: 1,
    hasOverlappingCases: false,
  },
  {
    permanentId: "1-72940192",
    name: "Dharohar Technical Campus",
    address: "Koba Circle, Gandhinagar Bypass Road",
    district: "Gandhinagar",
    state: "Gujarat",
    region: "Central Region",
    pinCode: "382010",
    headOfInstitution: "Dr. Bhavesh V. Patel",
    contactEmail: "admin@dharohartech.org",
    contactPhone: "+91 79 2328 7100",
    approvedIntake: 600,
    programTypes: ["Engineering", "Architecture"],
    riskLevel: "Moderate",
    totalComplaints: 4,
    activeComplaints: 1,
    disposedComplaints: 3,
    hasOverlappingCases: false,
  },
];

export const COMPLAINT_CASES: ComplaintCase[] = [
  {
    id: "case-01",
    caseId: "AICTE/PGRC/2026/04821",
    permanentId: "1-43928104",
    institutionName: "Sunrise Institute of Technology",
    institutionAddress: "Phase 3, Hinjewadi, Pune, Maharashtra 411057",
    district: "Pune",
    state: "Maharashtra",
    region: "Western Region",
    category: "Unapproved Fee Surcharge & Withholding of Original Certificates",
    bureau: "Public Grievance Redressal Cell (PGRC)",
    assignedOfficer: "Dr. Sunita Deshmukh",
    assignedOfficerRole: "Assistant Director (PGRC)",
    dateOfReceipt: "04-10-2026",
    status: "Under Process",
    lastAction: "Explanation letter issued to Principal; 7-day compliance window given",
    lastActionDate: "18-10-2026",
    nextAction: "Scrutiny of College submission and Student representation",
    expectedDisposalDate: "15-11-2026",
    slaDaysRemaining: 21,
    isSlaBreached: false,
    isOverlapping: true,
    overlappingCaseIds: ["AICTE/RB/2026/01192"],
    description:
      "A collective grievance signed by 38 final-year B.Tech students alleging that the college administration is demanding an unauthorized Rs. 35,000 'Development & Lab Maintenance Cess' not approved by the Fee Regulatory Authority (FRA) and withholding original 10th/12th marks cards and Leaving Certificates upon refusal to pay.",
    advisoryAiBrief:
      "ADVISORY ANALYSIS ONLY: High correlation (81%) with simultaneous regulatory deficiency proceedings filed by Regulation Bureau (RB). Potential systemic administrative coercion. It is strongly recommended to tag this case with RB Case #AICTE/RB/2026/01192 and summon joint hearing to prevent contradictory orders.",
    actionHistory: [
      {
        id: "act-1",
        dateTime: "04-10-2026 11:15 IST",
        bureau: "Central Registry / Inward Cell",
        officer: "Shri M. N. Rao, Inward Superintendent",
        actionTaken: "Grievance received via National Grievance Portal (CPGRAMS/AICTE)",
        remarks: "Petition registered and prima facie verified. Complainants verified via DigiLocker ID.",
        nextAction: "Route to Public Grievance Redressal Cell for preliminary scrutiny",
      },
      {
        id: "act-2",
        dateTime: "07-10-2026 15:40 IST",
        bureau: "Public Grievance Redressal Cell (PGRC)",
        officer: "Dr. Sunita Deshmukh, Assistant Director (PGRC)",
        actionTaken: "Admitted into Scrutiny under APH Chapter VII Norms",
        remarks: "Withholding certificates is a direct violation of AICTE Public Notice Advt No. AICTE/P&AP/10(01)/2019.",
        nextAction: "Issue formal query notice to Institute Director",
      },
      {
        id: "act-3",
        dateTime: "18-10-2026 14:20 IST",
        bureau: "Public Grievance Redressal Cell (PGRC)",
        officer: "Dr. Sunita Deshmukh, Assistant Director (PGRC)",
        actionTaken: "Explanation letter issued to Principal; 7-day compliance window given",
        remarks: "Institute directed to present physical student ledgers and release withheld certificates within 7 calendar days.",
        nextAction: "Scrutiny of College submission and Student representation",
        documentRef: "AICTE_PGRC_Notice_04821.pdf",
      },
    ],
    documents: [
      {
        id: "doc-1",
        name: "Student_Petition_38_Signatures_Redacted.pdf",
        dateUploaded: "04-10-2026",
        uploadedBy: "Central Registry",
        size: "2.4 MB",
        type: "Complaint Dossier",
      },
      {
        id: "doc-2",
        name: "AICTE_Formal_Explanation_Notice_04821.pdf",
        dateUploaded: "18-10-2026",
        uploadedBy: "Dr. Sunita Deshmukh",
        size: "480 KB",
        type: "Official Notice",
      },
    ],
    transferHistory: [],
    escalationHistory: [],
  },
  {
    id: "case-02",
    caseId: "AICTE/RB/2026/01192",
    permanentId: "1-43928104",
    institutionName: "Sunrise Institute of Technology",
    institutionAddress: "Phase 3, Hinjewadi, Pune, Maharashtra 411057",
    district: "Pune",
    state: "Maharashtra",
    region: "Western Region",
    category: "Infrastructure Deficiencies & Faculty Cadre Ratio Non-Compliance",
    bureau: "Regulation Bureau (RB)",
    assignedOfficer: "Shri R. K. Srivastava",
    assignedOfficerRole: "Senior Hearing Officer (RB)",
    dateOfReceipt: "11-10-2026",
    status: "Pending",
    lastAction: "Surprise inspection report received from Western Regional Office (WRO)",
    lastActionDate: "20-10-2026",
    nextAction: "Issuance of Show Cause Notice under Approval Process Handbook Clause 8.2",
    expectedDisposalDate: "25-11-2026",
    slaDaysRemaining: 31,
    isSlaBreached: false,
    isOverlapping: true,
    overlappingCaseIds: ["AICTE/PGRC/2026/04821"],
    description:
      "Regulatory inspection trigger following Western Regional Office surprise audit report noting 22% faculty deficit against sanctioned intake, non-functional fire safety clearances in academic block C, and unapproved alteration of building floor area ratio.",
    advisoryAiBrief:
      "ADVISORY ANALYSIS ONLY: Overlap alert triggered with PGRC Case #AICTE/PGRC/2026/04821. Same institution (PID: 1-43928104). Both cases indicate systemic non-compliance with AICTE Approval Process Handbook. Recommend merging for Stand-Alone Hearing Committee (SHC).",
    actionHistory: [
      {
        id: "act-101",
        dateTime: "11-10-2026 10:00 IST",
        bureau: "Regulation Bureau (RB)",
        officer: "Shri R. K. Srivastava, Senior Hearing Officer",
        actionTaken: "Case docket opened based on WRO inspection dossier",
        remarks: "Western Regional Office submitted physical audit report with photographic evidence.",
        nextAction: "Review audit findings against Approval Process Handbook 2026-27",
      },
      {
        id: "act-102",
        dateTime: "20-10-2026 16:30 IST",
        bureau: "Regulation Bureau (RB)",
        officer: "Shri R. K. Srivastava, Senior Hearing Officer",
        actionTaken: "Surprise inspection report received from Western Regional Office (WRO)",
        remarks: "Significant deficiencies confirmed in Computer Science & Mechanical Engineering cadres.",
        nextAction: "Issuance of Show Cause Notice under Approval Process Handbook Clause 8.2",
        documentRef: "WRO_Audit_Report_Sunrise_Oct2026.pdf",
      },
    ],
    documents: [
      {
        id: "doc-101",
        name: "WRO_Inspection_Audit_Report_Oct2026.pdf",
        dateUploaded: "20-10-2026",
        uploadedBy: "Western Regional Office",
        size: "8.1 MB",
        type: "Inspection Report",
      },
    ],
    transferHistory: [],
    escalationHistory: [],
  },
  {
    id: "case-03",
    caseId: "AICTE/RB/2026/01084",
    permanentId: "1-28941021",
    institutionName: "Bharati National College of Engineering",
    institutionAddress: "Bannerghatta Main Road, Bengaluru, Karnataka 560076",
    district: "Bengaluru Urban",
    state: "Karnataka",
    region: "South-Western Region",
    category: "Unapproved Course Introduction / Seat Augmentation",
    bureau: "Regulation Bureau (RB)",
    assignedOfficer: "Smt. Jayashree Ramanathan",
    assignedOfficerRole: "Deputy Director (RB)",
    dateOfReceipt: "12-08-2026",
    status: "Disposed",
    lastAction: "Final Compliance order issued with penalty of Rs. 2,00,000 paid by Institution",
    lastActionDate: "15-10-2026",
    nextAction: "Matter closed and archived in Permanent Institution Register",
    expectedDisposalDate: "15-10-2026",
    slaDaysRemaining: 0,
    isSlaBreached: false,
    isOverlapping: false,
    description:
      "Institute had announced unauthorized intake in Artificial Intelligence & Data Science prior to receiving final letter of approval (LoA) from the Council.",
    advisoryAiBrief:
      "ADVISORY ANALYSIS ONLY: Institution has fully remitted council penalty and restored intake to approved limits. Complied within stipulated time frame.",
    actionHistory: [
      {
        id: "act-201",
        dateTime: "12-08-2026 10:10 IST",
        bureau: "Central Registry",
        officer: "Shri M. N. Rao",
        actionTaken: "Complaint registered from state CET cell",
        remarks: "Discrepancy in seat matrix reported.",
        nextAction: "Referral to Regulation Bureau",
      },
      {
        id: "act-202",
        dateTime: "15-10-2026 17:00 IST",
        bureau: "Regulation Bureau (RB)",
        officer: "Smt. Jayashree Ramanathan",
        actionTaken: "Final Compliance order issued with penalty of Rs. 2,00,000 paid by Institution",
        remarks: "Challan verified via AICTE treasury portal. Case marked closed.",
        nextAction: "Matter closed and archived in Permanent Institution Register",
      },
    ],
    documents: [
      {
        id: "doc-201",
        name: "Final_Disposal_Order_AICTE_RB_1084.pdf",
        dateUploaded: "15-10-2026",
        uploadedBy: "Smt. Jayashree Ramanathan",
        size: "1.2 MB",
        type: "Disposal Order",
      },
    ],
    transferHistory: [],
    escalationHistory: [],
  },
  {
    id: "case-04",
    caseId: "AICTE/PGRC/2026/04719",
    permanentId: "1-90123841",
    institutionName: "Apex Institute of Pharmacy & Research",
    institutionAddress: "NH-24, Sitapur Road, Lucknow, Uttar Pradesh 226021",
    district: "Lucknow",
    state: "Uttar Pradesh",
    region: "Northern Region",
    category: "Non-Payment of Prescribed 7th CPC Faculty Stoppages & Arrears",
    bureau: "Regional Office (WRO)",
    assignedOfficer: "Dr. Alok Verma",
    assignedOfficerRole: "Regional Officer (NRO)",
    dateOfReceipt: "19-09-2026",
    status: "Transferred",
    lastAction: "Transferred from PGRC to Northern Regional Office (NRO) for on-site records verification",
    lastActionDate: "12-10-2026",
    nextAction: "Regional Director to dispatch two-member enquiry committee",
    expectedDisposalDate: "20-11-2026",
    slaDaysRemaining: 26,
    isSlaBreached: false,
    isOverlapping: false,
    description:
      "Petition submitted by 9 assistant professors stating non-disbursement of basic salary components and deduction of EPF without deposit to EPFO account for 6 consecutive months.",
    advisoryAiBrief:
      "ADVISORY ANALYSIS ONLY: Involves financial audit of college bank accounts. Correctly transferred to Regional Office for physical inspection under Section 10(n) of AICTE Act.",
    actionHistory: [
      {
        id: "act-301",
        dateTime: "19-09-2026 12:00 IST",
        bureau: "PGRC",
        officer: "Dr. Sunita Deshmukh",
        actionTaken: "Faculty grievance registered",
        remarks: "Initial summons to management produced incomplete salary slips.",
        nextAction: "Transfer to Regional Office for physical audit",
      },
      {
        id: "act-302",
        dateTime: "12-10-2026 11:30 IST",
        bureau: "PGRC",
        officer: "Dr. Sunita Deshmukh",
        actionTaken: "Transferred from PGRC to Northern Regional Office (NRO) for on-site records verification",
        remarks: "Physical verification needed. Dossier forwarded with approval of Advisor-I.",
        nextAction: "Regional Director to dispatch two-member enquiry committee",
      },
    ],
    documents: [
      {
        id: "doc-301",
        name: "Transfer_Memo_PGRC_to_NRO_4719.pdf",
        dateUploaded: "12-10-2026",
        uploadedBy: "Dr. Sunita Deshmukh",
        size: "340 KB",
        type: "Inter-Bureau Transfer Memo",
      },
    ],
    transferHistory: [
      {
        fromBureau: "Public Grievance Redressal Cell (PGRC)",
        toBureau: "Northern Regional Office (NRO)",
        transferDate: "12-10-2026",
        transferredBy: "Dr. Sunita Deshmukh, Assistant Director (PGRC)",
        reason: "Matter requires physical inspection of salary registers, bank disbursement scrolls, and EPF records.",
      },
    ],
    escalationHistory: [],
  },
  {
    id: "case-05",
    caseId: "AICTE/RB/2026/01244",
    permanentId: "1-38294012",
    institutionName: "Vidyapeeth Academy of Management Studies",
    institutionAddress: "Sector V, Salt Lake, Kolkata, West Bengal 700091",
    district: "Kolkata",
    state: "West Bengal",
    region: "Eastern Region",
    category: "Operating Unapproved Distance Education & Off-Campus Study Centres",
    bureau: "Regulation Bureau (RB)",
    assignedOfficer: "Shri R. K. Srivastava",
    assignedOfficerRole: "Senior Hearing Officer (RB)",
    dateOfReceipt: "14-07-2026",
    status: "Escalated",
    lastAction: "Case exceeded 60-day threshold; automatically escalated to Member Secretary",
    lastActionDate: "16-10-2026",
    nextAction: "Standing Hearing Committee (SHC) special meeting scheduled for final withdrawal of approval",
    expectedDisposalDate: "28-09-2026",
    slaDaysRemaining: -27,
    isSlaBreached: true,
    isOverlapping: true,
    overlappingCaseIds: ["AICTE/PGRC/2026/04112"],
    description:
      "Public notice breach: The institution was found running unapproved franchise learning centers under the guise of corporate PGDM diplomas in Ranchi, Patna, and Siliguri without AICTE/UGC DEC approvals.",
    advisoryAiBrief:
      "ADVISORY ANALYSIS ONLY: CRITICAL SLA BREACH (+27 days overdue). Institution failed to attend two consecutive hearings. Automatic escalation matrix triggered to Member Secretary.",
    actionHistory: [
      {
        id: "act-401",
        dateTime: "14-07-2026 14:00 IST",
        bureau: "Central Registry",
        officer: "Shri M. N. Rao",
        actionTaken: "Grievance received from Eastern Regional Council",
        remarks: "Evidence of hoardings and newspaper flyers attached.",
        nextAction: "Regulation Bureau scrutiny",
      },
      {
        id: "act-402",
        dateTime: "16-10-2026 10:15 IST",
        bureau: "AICTE Automated SLA Engine",
        officer: "System Administrator",
        actionTaken: "Case exceeded 60-day threshold; automatically escalated to Member Secretary",
        remarks: "Notice issued to Member Secretary and Chairman per Clause 9 of AICTE Vigilance Manual.",
        nextAction: "Standing Hearing Committee (SHC) special meeting scheduled for final withdrawal of approval",
      },
    ],
    documents: [
      {
        id: "doc-401",
        name: "Eastern_Regional_Flyer_Evidence.pdf",
        dateUploaded: "14-07-2026",
        uploadedBy: "Eastern Regional Council",
        size: "4.3 MB",
        type: "Evidence Dossier",
      },
      {
        id: "doc-402",
        name: "SLA_Breach_Escalation_Order_MS.pdf",
        dateUploaded: "16-10-2026",
        uploadedBy: "System SLA Engine",
        size: "210 KB",
        type: "Escalation Notice",
      },
    ],
    transferHistory: [],
    escalationHistory: [
      {
        escalatedTo: "Prof. (Dr.) Rajive Kumar, Member Secretary, AICTE",
        escalationDate: "16-10-2026",
        escalatedBy: "Automated Governance SLA Engine",
        level: "Level 3 - Competent Authority",
        reason: "Delay beyond prescribed 60 days without disposal; consecutive non-appearance by institution.",
      },
    ],
  },
  {
    id: "case-06",
    caseId: "AICTE/PGRC/2026/04902",
    permanentId: "1-55829103",
    institutionName: "Kaveri Polytechnic & Skill Institute",
    institutionAddress: "Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641004",
    district: "Coimbatore",
    state: "Tamil Nadu",
    region: "Southern Region",
    category: "Non-Transparent Internal Assessment & Examination Malpractice",
    bureau: "Public Grievance Redressal Cell (PGRC)",
    assignedOfficer: "Dr. Sunita Deshmukh",
    assignedOfficerRole: "Assistant Director (PGRC)",
    dateOfReceipt: "16-10-2026",
    status: "Pending",
    lastAction: "Initial scrutiny conducted; clarification sought from State Board of Technical Education",
    lastActionDate: "21-10-2026",
    nextAction: "Await SBTE reply regarding question paper leak allegations",
    expectedDisposalDate: "30-11-2026",
    slaDaysRemaining: 36,
    isSlaBreached: false,
    isOverlapping: false,
    description:
      "Diploma mechanical students reported manipulation in internal continuous assessment marks following student union elections.",
    advisoryAiBrief:
      "ADVISORY ANALYSIS ONLY: Matter under state technical board purview. Verify whether institutional grievance redressal committee (IGRC) has rendered judgment.",
    actionHistory: [
      {
        id: "act-501",
        dateTime: "16-10-2026 15:30 IST",
        bureau: "PGRC",
        officer: "Dr. Sunita Deshmukh",
        actionTaken: "Initial scrutiny conducted; clarification sought from State Board of Technical Education",
        remarks: "Notice issued to Controller of Examinations, Directorate of Technical Education, Chennai.",
        nextAction: "Await SBTE reply regarding question paper leak allegations",
      },
    ],
    documents: [
      {
        id: "doc-501",
        name: "Student_Affidavit_Coimbatore.pdf",
        dateUploaded: "16-10-2026",
        uploadedBy: "Central Registry",
        size: "1.1 MB",
        type: "Affidavit",
      },
    ],
    transferHistory: [],
    escalationHistory: [],
  },
  {
    id: "case-07",
    caseId: "AICTE/RB/2026/01301",
    permanentId: "1-72940192",
    institutionName: "Dharohar Technical Campus",
    institutionAddress: "Gandhinagar Bypass Road, Gandhinagar, Gujarat 382010",
    district: "Gandhinagar",
    state: "Gujarat",
    region: "Central Region",
    category: "Non-Fulfillment of Mandatory Library Titles & Digital Lab Norms",
    bureau: "Regulation Bureau (RB)",
    assignedOfficer: "Shri R. K. Srivastava",
    assignedOfficerRole: "Senior Hearing Officer (RB)",
    dateOfReceipt: "02-10-2026",
    status: "Under Process",
    lastAction: "Institution submitted digital invoices for 1,200 books; awaiting verification",
    lastActionDate: "19-10-2026",
    nextAction: "Expert committee to cross-check publisher ISBN numbers and e-journal subscriptions",
    expectedDisposalDate: "15-11-2026",
    slaDaysRemaining: 21,
    isSlaBreached: false,
    isOverlapping: false,
    description:
      "Annual EVC inspection reported 45% shortfall in required library journals and missing subscriptions for IEEE/ScienceDirect databases.",
    advisoryAiBrief:
      "ADVISORY ANALYSIS ONLY: Institute has furnished proof of purchase. Verification underway with National Digital Library of India (NDLI).",
    actionHistory: [
      {
        id: "act-601",
        dateTime: "02-10-2026 10:00 IST",
        bureau: "Regulation Bureau (RB)",
        officer: "Shri R. K. Srivastava",
        actionTaken: "EVC Deficiency Notice issued",
        remarks: "Deficiency notice delivered via institute portal.",
        nextAction: "Await compliance upload",
      },
      {
        id: "act-602",
        dateTime: "19-10-2026 14:00 IST",
        bureau: "Regulation Bureau (RB)",
        officer: "Shri R. K. Srivastava",
        actionTaken: "Institution submitted digital invoices for 1,200 books; awaiting verification",
        remarks: "Scrutiny committee scheduled for 28-10-2026.",
        nextAction: "Expert committee to cross-check publisher ISBN numbers and e-journal subscriptions",
      },
    ],
    documents: [
      {
        id: "doc-601",
        name: "Library_Compliance_Invoices_Dharohar.pdf",
        dateUploaded: "19-10-2026",
        uploadedBy: "Institute Admin",
        size: "3.2 MB",
        type: "Compliance Proof",
      },
    ],
    transferHistory: [],
    escalationHistory: [],
  },
];

export const OVERLAP_ALERTS: OverlapAlert[] = [
  {
    id: "ov-01",
    institutionName: "Sunrise Institute of Technology",
    permanentId: "1-43928104",
    matchConfidence: 96,
    status: "Under Review",
    caseA: {
      caseId: "AICTE/PGRC/2026/04821",
      bureau: "Public Grievance Redressal Cell (PGRC)",
      category: "Unapproved Fee Surcharge & Withholding of Original Certificates",
      officer: "Dr. Sunita Deshmukh",
      dateOfReceipt: "04-10-2026",
      status: "Under Process",
    },
    caseB: {
      caseId: "AICTE/RB/2026/01192",
      bureau: "Regulation Bureau (RB)",
      category: "Infrastructure Deficiencies & Faculty Cadre Ratio Non-Compliance",
      officer: "Shri R. K. Srivastava",
      dateOfReceipt: "11-10-2026",
      status: "Pending",
    },
    matchReasons: [
      "AICTE Permanent ID match: 1-43928104 (Exact Deterministic Match)",
      "Institution-name similarity: 94% ('Sunrise Institute of Technology' vs 'Sunrise Inst. of Tech, Pune')",
      "Location match: Hinjewadi Phase 3, Pune, Maharashtra (Western Region)",
      "Complaint-text similarity: 81% (Cross-references to illegal fees & lack of requisite faculty/facilities)",
    ],
  },
  {
    id: "ov-02",
    institutionName: "Vidyapeeth Academy of Management Studies",
    permanentId: "1-38294012",
    matchConfidence: 91,
    status: "Under Review",
    caseA: {
      caseId: "AICTE/RB/2026/01244",
      bureau: "Regulation Bureau (RB)",
      category: "Operating Unapproved Distance Education & Off-Campus Study Centres",
      officer: "Shri R. K. Srivastava",
      dateOfReceipt: "14-07-2026",
      status: "Escalated",
    },
    caseB: {
      caseId: "AICTE/PGRC/2026/04112",
      bureau: "Public Grievance Redressal Cell (PGRC)",
      category: "False Placement Claims & Unaccredited Degree Award in Distance Wing",
      officer: "Dr. Sunita Deshmukh",
      dateOfReceipt: "22-07-2026",
      status: "Under Process",
    },
    matchReasons: [
      "AICTE Permanent ID match: 1-38294012 (Verified)",
      "Institution-name similarity: 98% (Kolkata Salt Lake Campus)",
      "Location match: Kolkata, West Bengal (Eastern Region)",
      "Complaint-text similarity: 79% (Both relate to unauthorized executive and off-campus operations)",
    ],
  },
];

export const KPI_DATA = {
  totalCases: 1482,
  pending: 312,
  underProcess: 548,
  disposed: 584,
  transferred: 38,
  slaBreach: 42,
  overlapAlerts: 14,
};

export const BUREAU_WORKLOAD_DATA = [
  { bureau: "Regulation Bureau (RB)", active: 380, disposed: 290, pending: 90 },
  { bureau: "PGRC", active: 310, disposed: 215, pending: 95 },
  { bureau: "Approval Bureau", active: 110, disposed: 80, pending: 30 },
  { bureau: "Policy & Academic", active: 58, disposed: 45, pending: 13 },
  { bureau: "Regional Offices", active: 140, disposed: 95, pending: 45 },
];

export const CASE_STATUS_DATA = [
  { name: "Disposed", value: 584, color: "#15803D" },
  { name: "Under Process", value: 548, color: "#0B4F9C" },
  { name: "Pending", value: 312, color: "#D97706" },
  { name: "Transferred", value: 38, color: "#7E22CE" },
  { name: "Escalated", value: 42, color: "#B91C1C" },
];

export const AGEING_ANALYSIS_DATA = [
  { range: "0 - 15 Days", count: 410, fill: "#15803D" },
  { range: "16 - 30 Days", count: 285, fill: "#0B4F9C" },
  { range: "31 - 60 Days", count: 125, fill: "#D97706" },
  { range: "60+ Days (Breach)", count: 42, fill: "#B91C1C" },
];

export const REGIONAL_REPORT_DATA = [
  { region: "Western Region (WRO - Mumbai)", total: 382, active: 165, disposed: 217, overlapCount: 5, breachCount: 9 },
  { region: "Northern Region (NRO - Kanpur)", total: 310, active: 138, disposed: 172, overlapCount: 3, breachCount: 11 },
  { region: "Southern Region (SRO - Chennai)", total: 295, active: 110, disposed: 185, overlapCount: 2, breachCount: 6 },
  { region: "South-Western Region (SWRO - Bangalore)", total: 245, active: 95, disposed: 150, overlapCount: 2, breachCount: 7 },
  { region: "Eastern Region (ERO - Kolkata)", total: 160, active: 82, disposed: 78, overlapCount: 2, breachCount: 8 },
  { region: "Central Region (CRO - Bhopal)", total: 90, active: 38, disposed: 52, overlapCount: 0, breachCount: 1 },
];
