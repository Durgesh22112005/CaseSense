# AICTE Integrated Institution Complaint Monitoring & Status Dashboard

> **A Single-Window Cross-Bureau Redressal, Compliance & Overlap Detection System for the All India Council for Technical Education (AICTE)**
> *Smart India Hackathon (SIH) High-Impact Prototype*

---

## 🏛️ Project Overview

Technical institutions under the purview of AICTE frequently receive complaints and regulatory notices through different Bureaus/Cells, including:
* **Regulation Bureau (RB)**: Institution approval compliance, faculty cadre ratios, infrastructure deficiencies, unapproved programs.
* **Public Grievance Redressal Cell (PGRC)**: Student grievances, fee overcharging, withheld certificates, harassment, exam irregularities.
* **Regional Offices (ROs)**: Physical inspections, local dispute inquiries.

Without a centralized, real-time monitoring mechanism, overlapping complaints regarding the same institution are processed in silos—leading to duplicated efforts, conflicting directives, and delayed disposal.

This dashboard provides a **single-window internal portal** designed strictly according to official Indian Government standards (NIC / Gov.in design guidelines), integrating cross-bureau case tracking, automated overlap detection, and statutory SLA monitoring.

---

## 🚀 Key Implemented Modules & Pages

### 1. Official Login Page (`/login`)
* Authentic AICTE / Ministry of Education masthead with National Portal styling.
* Single Sign-On (SSO) gateway supporting all 5 official roles:
  * **PGRC Officer** (`Dr. Sunita Deshmukh`)
  * **RB Officer** (`Shri R. K. Srivastava`)
  * **Regional Officer** (`Dr. Alok Verma`)
  * **Coordination Officer** (`Smt. Jayashree Ramanathan`)
  * **Admin / Member Secretary** (`Prof. (Dr.) Rajive Kumar`)
* Captcha verification and official Government disclaimer (IT Act, 2000).

### 2. Dashboard (`/dashboard`) — "Complaint Monitoring Overview"
* **Real-time KPI Badges**:
  * Total Cases: **1,482**
  * Pending Scrutiny: **312**
  * Under Process: **548**
  * Disposed: **584**
  * Transferred: **38**
  * SLA Breach (>60d): **42**
  * Overlap Alerts: **14**
* **Prominent Red Collision Alert Box**:
  * High-priority warning: *"Potential Overlapping Cases Detected — Coordination Required"*
  * Features the highlighted SIH case study: **Sunrise Institute of Technology (PID: 1-43928104)** with concurrent PGRC and RB dockets.
  * Explicit Match Breakdown:
    * `AICTE Permanent ID match: 1-43928104` (Exact)
    * `Institution-name similarity: 94%`
    * `Location match: Pune, Maharashtra (Western Region)`
    * `Complaint-text similarity: 81%`
  * Action controls: **"Review Cases"** and **"Assign Coordination Owner"** modal.
* **Interactive Visual Analytics (Recharts)**:
  * *Bureau-wise Workload Bar Chart* (Active vs. Disposed)
  * *Case Status Distribution Doughnut Chart*
  * *Pending Case Ageing Analysis Chart* (0-15d, 16-30d, 31-60d, 60+ days SLA Breach)
* **Recent Cases Register** with live status badges.

### 3. Case Tracker (`/cases`)
* Universal search across **Case ID**, **Institution Name**, **AICTE Permanent ID (PID)**, and **Assigned Officer**.
* Multi-faceted Government filters: Bureau/Cell, Status, AICTE Region, and Date Range.
* Standardized status badges:
  * **Pending** (Amber)
  * **Under Process** (Blue)
  * **Disposed** (Green)
  * **Transferred** (Purple)
  * **Escalated** (Red)
* Pagination and direct link to full case docket.

### 4. Case Details (`/cases/[id]`)
* Comprehensive Case Information & Substantive Complaint Description.
* Institution Summary card with link to 360° Profile.
* **Vertical Chronological Action History Timeline**:
  * Date & time (`DD-MM-YYYY | HH:mm IST`), Bureau, Officer, Action Taken, Remarks, Next Action.
* **AI-Assisted Case Brief**:
  * Clearly marked with advisory disclaimer.
* Mock Documents Section (with signed PDF download simulations).
* Inter-Bureau Transfer & Statutory Escalation logs.
* **Interactive Operational Action Modals**:
  * `Update Status`: Log orders and advance state.
  * `Transfer Case`: Route docket between PGRC, RB, and Regional Offices with jurisdiction notes.
  * `Escalate Case`: Escalate to Member Secretary / Competent Authority.
  * `Link Related Case`: Pair related proceedings.

### 5. Institution 360° (`/institutions` and `/institutions/[id]`)
* Searchable Directory of technical institutions.
* Consolidated Profile:
  * Permanent ID (PID), Campus Address, District, State, Region, Head of Institution, Sanctioned Intake.
  * **Risk Profile Badge** (High, Moderate, Low).
  * Lifetime complaint scorecard (Total, Active, Disposed).
* Table of all historical and active dockets across both RB and PGRC.
* **Cross-Bureau Unified Audit Trail**: Synchronized chronological movement of approvals, inspection reports, grievance notices, and compliance orders.

### 6. Overlap Investigation & Inter-Bureau Coordination (`/overlap`)
* Dedicated radar listing all flagged overlapping cases.
* **Side-by-Side Comparison** between PGRC and RB dockets.
* Match confidence score (e.g. 96%) and deterministic ground breakdown.
* **"Link Cases & Assign Owner" Action**:
  * Triggers confirmation modal to designate a senior official.
  * Upon confirmation, renders the official notice:
    > *"Cases linked successfully. Coordination owner assigned."*

### 7. Statutory Reports & MIS Analytics (`/reports`)
* 6 Pre-configured statutory report tabs:
  1. *Bureau-wise Workload & Disposal Summary*
  2. *Region-wise Grievance Distribution & SLA Compliance*
  3. *Institution Complaint Frequency & Risk Register*
  4. *Pending Case Ageing Analysis & Timeline Audit*
  5. *Overall Redressal & Disposal Efficiency*
  6. *Cross-Bureau Overlap & Deduplication Register*
* **Export PDF** (triggers official print preview) and **Export Excel** triggers.

---

## 🎨 Design Philosophy (Government Internal Portal Standard)

The application strictly complies with the design parameters specified:
* **Background**: Clean, crisp white & slate (`#F8FAFC`).
* **Sidebar**: Dark official government navy (`#0F1E36`).
* **Primary Theme**: Sovereign Government Blue (`#0B4F9C`).
* **Typography**: Clean, sans-serif system typography.
* **Tone**: Formal, authoritative English, free of startup jargon or exaggerated animations.
* **Dates**: Strict Indian format (`DD-MM-YYYY | HH:mm IST`).
* **No neon colors, no gradients, no glassmorphism**.

---

## 🤖 AI Case Copilot (Internal Advisory System)

The portal features an integrated **AI Case Copilot** right-hand advisory drawer active across:
1. **Dashboard** (`/dashboard`)
2. **Case Details** (`/cases/[id]`)
3. **Institution 360°** (`/institutions/[id]`)

### Copilot Features & Tabs:
* **Tab 1: Case Summary**:
  * 3-bullet synthesized executive brief.
  * Grievance category, urgency level badge (Low, Medium, High, Critical).
  * Current Bureau/Cell, pending duration, and SLA status.
  * Key statutory & operational risks.
* **Tab 2: Overlap Analysis**:
  * Match confidence gauge (e.g. 96%).
  * Deterministic match reasons (PID match, name similarity, location match, text similarity).
  * Cross-bureau linked case dockets.
  * Formal warning banner: *"Potential overlapping cases detected. Coordination required."*
  * Quick-action buttons: *Review Linked Cases* and *Assign Coordination Owner*.
* **Tab 3: Next Action**:
  * AI recommended regulatory next step with formal justification.
  * Responsible bureau and target deadline.
  * Conditional escalation rule.
  * Action buttons: **"Accept Recommendation"**, **"Reject Recommendation"**, **"Mark for Review"**.
  * **Live Timeline Sync**: Clicking *Accept Recommendation* injects a new milestone directly into the Case Details action timeline!
* **Tab 4: Ask Copilot**:
  * Officer query interface with recommended prompt chips.
  * Simulated 1-2s inference latency with government-styled skeleton loader.
  * Statutory advisory disclaimer.

### Copilot File Architecture (Extensible for Gemini/OpenAI):
* `components/copilot/AICaseCopilot.tsx` - Collapsible drawer container with desktop/mobile responsiveness.
* `components/copilot/CaseSummaryTab.tsx` - Summary & risk breakdown.
* `components/copilot/OverlapAnalysisTab.tsx` - Overlap confidence & matching grounds.
* `components/copilot/NextActionTab.tsx` - Recommended actions with live timeline injection.
* `components/copilot/AskCopilotTab.tsx` - Q&A conversational interface.
* `lib/copilot/mockCopilotData.ts` - Structured advisory knowledge models.
* `lib/copilot/copilotService.ts` - Single service layer: swap mock queries with live API routes here.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router, TypeScript)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Charts & Visualizations**: [Recharts](https://recharts.org/)
* **Iconography**: [Lucide React](https://lucide.dev/)
* **Data Layer**: Self-contained Mock JSON dataset (`src/data/mockData.ts`)

---

## 🏃 Getting Started & How to Test the Copilot

The development server is already running! You can open your browser and navigate to:

```
http://localhost:3000
```

### Quick Verification Steps for Evaluators:
1. **Open Dashboard (`/dashboard`)**:
   - Notice the **"AI Case Copilot"** button in the header toolbar and the floating pill in the bottom right corner.
   - Click to open the right-side drawer.
2. **Explore the 4 Tabs**:
   - **Case Summary**: Review the 3-bullet summary, urgency badge, and key risks for Sunrise Institute.
   - **Overlap Analysis**: Inspect the 96% match confidence, 4 match grounds, and the formal red warning banner.
   - **Next Action**: Review the recommended joint SHC hearing. Click **"Accept Recommendation"** to trigger the confirmation.
   - **Ask Copilot**: Click any suggested question (e.g. *"Why are these cases marked as overlapping?"*) to watch the realistic skeleton loader and retrieve the contextual AI advisory response.
3. **Verify Case Details (`/cases/case-01`)**:
   - Open the Copilot on Case Details.
   - Go to **Next Action** and click **"Accept Recommendation"**.
   - Watch the green success alert appear and see the newly accepted recommendation injected directly into the **Chronological Action History Timeline** on the page!
4. **Verify Institution 360° (`/institutions/1-43928104`)**:
   - Open the Copilot to see the institution-level advisory synthesis.

---

## 📋 Evaluation Checklist for SIH Judges

| Requirement | Implementation Details | Status |
|---|---|:---:|
| **Single-Window View** | Consolidated dashboard spanning RB, PGRC, and Regional Offices | ✅ Complete |
| **Centralized Profile** | Institution 360° with AICTE Permanent ID (PID) search | ✅ Complete |
| **Cross-Bureau Overlap** | Automated detection of concurrent proceedings on same PID/name | ✅ Complete |
| **Sunrise Institute Case** | Featured match: 1-43928104 with 94% name and 81% text similarity | ✅ Complete |
| **Timeline & Action Log** | Vertical chronological history with bureau, officer, and next action | ✅ Complete |
| **SLA Tracking & Ageing** | 0-15d, 16-30d, 31-60d, and >60d escalation radar | ✅ Complete |
| **Reports & MIS** | Bureau, Region, Institution, Ageing, Disposal, Overlap with Export | ✅ Complete |
| **AI Case Copilot** | Right-side advisory drawer with 4 tabs and live timeline sync | ✅ Complete |
| **Government Aesthetic** | Dark navy sidebar, government blue accents, formal English, Indian dates | ✅ Complete |

