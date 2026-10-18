# ScopeCrafter ⚡

> **Privacy-First Proposal & Scope Generator for Freelance Software Developers**  
> *Built for Hacktoberfest 2026 Open-Source AI Challenge: Week 2 ("Side Hustle")*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Model](https://img.shields.io/badge/Model-Gemma%203%2012B%20IT-purple.svg)](https://ai.google.dev/gemma)
[![Orchestration](https://img.shields.io/badge/Orchestration-Backboard%20SDK-orange.svg)](https://backboard.io)
[![Deploy on Render](https://img.shields.io/badge/Deploy%20to-Render-46E3B7.svg)](render.yaml)

---

## 🎯 1. The "Side Hustle" Business Strategy

### The Problem
Freelance developers and solo agency engineers lose **2 to 4 hours** on every prospective client inquiry turning unstructured, messy client inputs (half-baked emails, WhatsApp/Slack rambling, raw Zoom transcripts) into professional, phased scopes of work.
Even worse:
1. **Unpaid Administrative Overhead:** Writing customized estimates for bids that might not close drains non-billable time.
2. **Scope Creep Disasters:** Vague initial proposals lead to unpaid client revisions and project delays.
3. **Severe NDA & IP Liabilities:** Freelancers routinely handle client trade secrets and confidential business logic. Pasting proprietary requests into closed commercial APIs (OpenAI, Anthropic) risks logging, compliance violations, and intellectual property exposure.

### The Solution & Business Model
**ScopeCrafter** is an open-source, privacy-first micro-SaaS engineered specifically for independent software developers:
* **The Product:** Transforms raw client inquiries into professional 3-milestone technical proposals, complete with acceptance criteria, stack architecture, explicit out-of-scope boundaries, risk mitigation, and commercial payment schedules.
* **The Side Hustle Economics:** Offered at **$5/month or $9/month subscription**. A single winning bid or 1 saved hour pays for 2 years of the service!
* **The Open-Weight Margin Advantage:** By orchestrating **Google Gemma 3 12B IT** (`google/gemma-3-12b-it`) via the **Backboard SDK**, inference cost remains predictable and lean. This enables infinitely scalable, near-100% gross profit margins for the side hustle owner without being squeezed by closed API price changes.

---

## 🏗️ 2. Architecture & Open-Source Advantage

```
+-------------------------------------------------------------------------+
|                              USER INTERFACE                             |
|               ScopeCrafter Studio (Glassmorphic SPA Dashboard)           |
|   - Real-Time Pricing Calculator  - Phased Milestone Timeline           |
|   - Out-of-Scope Boundaries       - Formatted Client Pitch View         |
+------------------------------------+------------------------------------+
                                     |
                         1. Raw Client Brief
                                     v
+-------------------------------------------------------------------------+
|                        BACKEND ORCHESTRATION                            |
|                                                                         |
|   [1] Privacy Shield Service                                            |
|       - Masks PII, emails, phones, API keys & internal staging URLs     |
|                                                                         |
|   [2] Backboard SDK Engine (BackboardClient)                            |
|       - Session & thread memory management (`thread_id`)                |
|       - Multi-model routing to open-weight endpoints                    |
|                                                                         |
|   [3] Open-Weight Gemma 3 12B IT (google/gemma-3-12b-it)                |
|       - Deep requirements reasoning and contract milestone synthesis    |
|       - Zero cloud data retention guarantee                             |
|       - Fallback to embedded local Gemma MoE engine for offline runs    |
+------------------------------------+------------------------------------+
                                     |
                       2. Structured JSON + MD
                                     v
+-------------------------------------------------------------------------+
|                           RENDER CLOUD RUNTIME                          |
|   - Automated CI/CD, Containerized Web Service, render.yaml blueprint   |
+-------------------------------------------------------------------------+
```

### Why Open Innovation Matters
- **NDA & Privacy Shield:** Client requests often contain patentable algorithms, unreleased mockups, and proprietary schemas. Open-weight Gemma processing guarantees zero training data retention and strict confidentiality.
- **Predictable Zero Marginal Cost:** Closed APIs charge variable per-token fees that spike when processing lengthy meeting transcripts. Gemma models orchestrated via Backboard SDK enable sustainable, high-margin $5/mo subscriptions.

---

## 🏆 3. Hacktoberfest Week 2 Prize Category Targets

| Category | Partner / Track | How ScopeCrafter Competes | Prize |
| :--- | :--- | :--- | :--- |
| **Overall Winner** | DEV Challenge Week 2 | End-to-end usable product solving real freelancer problem with open AI | $250 + DEV++ |
| **Best Use of Gemma** | Google DeepMind / Gemma | Powered by Google's open-weight `google/gemma-3-12b-it` model | $200 |
| **Best Use of Backboard** | Backboard.io | Uses official `backboard-sdk` for agent session memory and model routing | $100 |
| **Best Use of Render** | Render Cloud | Automated deployment configuration with `render.yaml` IaC blueprint | $200 |

---

## 🚀 4. Key Features

1. **Intelligent 3-Milestone Decomposition:**
   - **Milestone 1:** Architectural Foundation, Relational Schema & Auth Core (30%)
   - **Milestone 2:** Core Feature Implementation & External Integrations (50%)
   - **Milestone 3:** Security Hardening, QA Testing, Production Deployment & Handover (20%)
2. **Dynamic Live Pricing Recalculator:**
   - Real-time hourly rate slider immediately recalibrates all milestone payouts, upfront deposit requirements, and total contract fees without re-running inference.
3. **Scope Creep Guardrails (Explicit Out-of-Scope):**
   - Automatically defines what is excluded (e.g. mobile app stores, multi-language translation, legacy data cleanup) to protect freelancers from unpaid scope creep.
4. **Automated NDA Privacy Shield:**
   - Regex-based pre-processing redacts emails, phone numbers, secret API keys (`sk-live_...`), and internal staging URLs before model submission.
5. **One-Click Export:**
   - Copy client-ready Markdown to clipboard with one click.
   - Dedicated print-optimized PDF layout (`Ctrl+P` / Export PDF).
6. **Conversational Scope Refinement:**
   - Tweak existing scopes with natural language instructions (e.g., *"Require 50% upfront deposit"*, *"Add a staging milestone"*).

---

## 🛠️ 5. Quickstart & Local Installation

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation
```bash
# Clone the repository
git clone https://github.com/DracFiendMG/scope-crafter.git
cd scope-crafter

# Install dependencies
npm install

# (Optional) Configure API keys in .env
cp .env.example .env

# Start the application
npm start
```

Visit **`http://localhost:3000`** in your browser. ScopeCrafter works out of the box with zero external configuration required!

---

## 🐳 6. Docker & Render Deployment

### Run with Docker
```bash
docker build -t scopecrafter .
docker run -p 3000:3000 scopecrafter
```

### Deploy to Render
1. Push this repository to GitHub.
2. In Render, select **New > Blueprint** and select this repo.
3. Render reads `render.yaml` and deploys the web service automatically with health checks enabled at `/api/health`.

---

## 🧪 7. Test Suite

Run the automated inference and privacy verification tests:
```bash
npm test
```

Verifies:
- Privacy Shield redaction of secret keys, emails, phones, and internal URLs.
- 3-Milestone mathematical balancing and hourly rate calculation.
- Fallback resilience and Markdown proposal formatting.

---

## 📄 8. License

MIT License. Open-source software built for Hacktoberfest 2026.
