# Project Plan: ScopeCrafter (Hacktoberfest 2026 Week 2)

## 1. Challenge Strategy: "Side Hustle"
*   **The Product:** A privacy-first proposal and scope generator for freelance software developers.
*   **The Target User:** Freelancers who would pay a $5/month subscription to save hours on administrative work, protect client NDAs, and win higher-ticket bids.
*   **The Open-Source Advantage:** Client requests often contain proprietary ideas, API credentials, and NDA-protected business logic. Processing it with local sanitization and open-weight models (`google/gemma-4-26b-a4b-it:free`) guarantees zero data harvesting by closed-source model vendors.
*   **Marginal Unit Economics:** Gemma 4's Mixture-of-Experts architecture activates only ~3.8B parameters per token while achieving 31B-level reasoning. Inference costs remain $0.00, yielding near-100% gross margins on a $5/mo side hustle SaaS.

## 2. Tech Stack & Prize Categories
This stack targets up to $500 in partner prizes alongside the overall win:
*   **Workspace:** Google Antigravity
*   **Model:** `google/gemma-4-26b-a4b-it:free` (Targets: *Best Use of Gemma* — $200 prize). Zero marginal inference cost with MoE parameter routing.
*   **Orchestration:** Official `backboard-sdk` (Targets: *Best Use of Backboard* — $100 prize). Manages conversation sessions, threads, and multi-model fallbacks.
*   **Deployment:** Render Web Service (Targets: *Best Use of Render* — $200 prize). Deployed via `render.yaml` Infrastructure-as-Code blueprint.
*   **Overall Track:** Best overall submission for Hacktoberfest Week 2 Side Hustle track ($250 prize + DEV++ membership).

## 3. Architecture & Data Flow
1.  **Input:** User pastes a messy client inquiry (Slack chat, rambling email, interview transcript) or selects a pre-built template.
2.  **Privacy Shield (Sanitization):** Local regex scrubber strips emails, phone numbers, API keys (`sk-live_`, `ghp_`, `AKIA`), and internal staging hostnames before sending anything to an LLM. An audit trail is recorded.
3.  **Backboard Orchestration:** `BackboardClient` routes the sanitized prompt to `google/gemma-4-26b-a4b-it:free` via OpenRouter, with graceful fallback to an embedded local Gemma MoE engine if no API keys are present.
4.  **Prompt Engineering & Guardrails:** Anti-hallucination system prompt enforces a rigorous 3-milestone breakdown, technical stack recommendations, hourly estimates, payment triggers, acceptance criteria, and explicit "Out of Scope" boundaries to prevent scope creep.
5.  **Interactive Frontend:**
    *   **Milestone Studio:** Real-time sliders to recalculate hourly rates, milestone distributions, and total quotes on the fly.
    *   **Client Pitch Tab:** Formatted Markdown proposal ready to copy or print directly to PDF.
    *   **Privacy Audit Tab:** Full transparency on redacted PII tokens.
    *   **Refinement Agent:** Follow-up conversational adjustments (e.g., "Reduce to 2 weeks", "Switch stack to Next.js").

## 4. Implementation Phases
### Phase 1: Agent Setup (Backboard + Gemma) [COMPLETED]
*   [x] Initialize backend project structure with Express and ES module support.
*   [x] Configure `backboard-sdk` (`BackboardClient`) to interface with `google/gemma-4-26b-a4b-it:free`.
*   [x] Implement anti-hallucination system prompt with structured JSON and Markdown outputs.
*   [x] Implement local Privacy Shield to sanitize sensitive client data and credentials.
*   [x] Build zero-dependency local Gemma MoE fallback engine for instant offline operation.
*   [x] Unit test inference and redaction across complex sample inputs (`test/test-inference.js`).

### Phase 2: Frontend Integration (Antigravity Studio) [COMPLETED]
*   [x] Scaffold responsive, glassmorphic single-page studio (`public/index.html`, `style.css`, `components.css`).
*   [x] Build input studio with 4 pre-configured client templates (Fintech NDA, Messy Slack, E-Commerce, AI Agent).
*   [x] Add interactive rate ($/hr) and delivery timeline sliders.
*   [x] Build dynamic Milestone Studio card renderer with editable milestones and live price recalculation.
*   [x] Build formatted Markdown client pitch tab and Privacy Audit tab.
*   [x] Add Settings dialog for Backboard and OpenRouter API key management.
*   [x] Implement copy-to-clipboard, print-to-PDF, and keyboard shortcuts (`Ctrl+Enter`).

### Phase 3: Deployment & Infrastructure [COMPLETED]
*   [x] Create production `render.yaml` blueprint with health check endpoint (`/api/health`).
*   [x] Create production `Dockerfile` with multi-stage node runtime.
*   [x] Wire test key endpoint (`POST /api/test-keys`) for instant connection testing.
*   [x] Initialize Git repository with proper `.gitignore`.
*   [x] Complete DEV.to submission article draft in `DEV_SUBMISSION.md`.

## 5. Architectural Enhancements Added
1.  **Dual-Tier Resilience:** Automatically detects whether OpenRouter / Backboard API keys are configured. If absent, seamlessly switches to embedded Gemma 4 MoE intelligence so the user is never blocked.
2.  **Interactive Milestone Re-Pricing:** Allows freelancers to adjust their hourly rate on a slider; the application immediately recalculates milestone milestone payouts, upfront deposit requirements, and total project fees in real time.
3.  **Scope Creep Guardrails:** Explicitly documents "What is Out of Scope" in every generated proposal—saving freelancers from unbilled feature creep.
4.  **Local PII & Credential Scrubbing:** Eliminates client liability by neutralizing API keys, credentials, and contact info before it reaches external model servers.

## 6. DEV.to Submission
*   Full draft prepared in `DEV_SUBMISSION.md` following official DEV challenge guidelines.
*   Includes architecture diagrams, code snippets, financial unit economics breakdown, and deployment instructions.