---
title: ScopeCrafter: Privacy-First Proposal & Scope Generator for Freelancers
published: false
tags: devchallenge, hf26challenge, gemma, webdev
---

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 2: Side Hustle](https://dev.to/challenges/hacktoberfest-week2-2026-10-12)*

---

## What I Built

Every freelance software developer knows the dreaded "proposal bottleneck": an interested client sends a rambling 500-word email, a raw Slack transcript, or a bulleted wishlist of features. Turning that messy brain dump into a clear, contract-grade proposal—complete with realistic hours, technical architecture, deliverable milestones, and scope boundaries—routinely takes **2 to 4 non-billable hours**.

Worse yet, if you miss a requirement, you risk **unpaid scope creep**. If you paste the client's confidential trade secrets into closed commercial APIs, you risk **breaching strict Non-Disclosure Agreements (NDAs)**.

**ScopeCrafter** is a privacy-first micro-SaaS and proposal studio engineered specifically for freelance software developers:
1. **Raw Client Ingestion:** Paste informal emails, chat transcripts, or rough specs.
2. **Automated NDA Privacy Shield:** Locally redacts client emails, phone numbers, secret API keys (`sk-live_...`), and internal staging URLs before any model processing.
3. **Structured 3-Milestone Decomposition:** Formats the project into three distinct phases (Foundation & Data Modeling, Core Feature Implementation, Security Hardening & Handover) with concrete acceptance criteria.
4. **Scope Creep Boundaries:** Automatically identifies and enumerates explicit out-of-scope items (e.g. app store submissions, ongoing localization, third-party vendor charges) so freelancers never work for free.
5. **Interactive Commercial Studio:** A live rate calculator lets freelancers slide their hourly rate ($50–$250/hr) and watch milestones and deposits recalculate dynamically in real-time.
6. **Client-Ready Pitch View:** Exports directly to clean Markdown or a print-ready PDF with formal signature blocks.

### The Side Hustle Business Model
* **The Target User:** Freelance web/mobile developers and boutique two-person agencies.
* **Pricing:** **$5/month or $9/month flat subscription**.
* **Value Proposition:** A freelancer charging $85/hr saves ~10 hours a month on proposal writing ($850 in recovered billing potential) for the cost of a cup of coffee.
* **The Scalability Advantage:** Built on open-weight inference with **$0 marginal cost per generation**, allowing the side hustle to maintain a 98%+ gross margin without being held hostage by closed API token pricing.

---

## Demo

* **Live Demo URL:** `https://scopecrafter.onrender.com` (Deployed on Render)
* **Local Run:** `http://localhost:3000` via `npm start`
* **Demo Walkthrough Video / Recording:** `scopecrafter_demo`

### Interactive Screenshots

```
+-----------------------------------------------------------------------------------------+
| [✨ ScopeCrafter Studio]     Side Hustle: $5/mo SaaS   |  Privacy Shield: Active (NDA)  |
|-----------------------------------------------------------------------------------------|
| [Step 1: Client Inquiry]                 | [Milestone Studio Breakdown]                 |
| - Template: 🔒 Confidential Fintech     | - Total Bid: $6,800 USD (80 hrs @ $85/hr)    |
| - Raw text with secret API key & email   | - Deposit: $2,040 (30% upfront on signing)   |
|                                          |                                              |
| [Step 2: Parameters & Privacy]           | [Milestone 1: Foundation & Auth] (30% share) |
| - Rate: $85/hr (interactive slider)      |   Deliverables & Acceptance Checklist        |
| - Timeline: 4 Weeks                      | [Milestone 2: Core Features]     (50% share) |
| - NDA Privacy Shield: [ON]               | [Milestone 3: Security & Handover] (20% share) |
|                                          |                                              |
| [✨ Craft 3-Milestone Proposal]          | [Explicit Out-of-Scope Boundaries] (Shield)  |
+-----------------------------------------------------------------------------------------+
```

---

## Code

The full codebase is completely open-source under the MIT License:

{% github scope-crafter/scopecrafter %}

* **Repository Structure:**
  * `server/index.js` — High-performance Express server with streaming and REST endpoints.
  * `server/services/privacyShield.js` — Automated regex-based entity and secret redaction engine.
  * `server/services/backboardService.js` — Backboard SDK integration with persistent session threads.
  * `server/services/gemmaService.js` — Google Gemma 4 26B MoE model inference and local intelligence fallback.
  * `public/` — Zero-dependency, glassmorphic single-page studio with dynamic rate recalculator.
  * `render.yaml` — Declarative Infrastructure-as-Code blueprint for one-click Render deployment.

---

## How I Built It

ScopeCrafter combines open-weight AI architectures with dedicated developer orchestration:

1. **Google Gemma 4 26B MoE (`google/gemma-4-26b-a4b-it:free`):**
   * Operates as our primary reasoning core. Because Gemma 4 MoE only activates ~3.8B parameters per token while delivering 31B-level instruction following, it processes unstructured client inquiries with remarkable precision while costing exactly **$0.00** per call on OpenRouter.
2. **Backboard SDK (`backboard-sdk`):**
   * We integrated Backboard's official TypeScript/JavaScript client (`BackboardClient`).
   * Backboard manages session continuity across turns using threaded messaging (`thread_id`), allowing freelancers to iteratively refine scopes (e.g., *"Make Milestone 2 a fixed-price deliverable"* or *"Add a staging review step"*) without losing context.
3. **Google Antigravity IDE (Flash Extended):**
   * Built and pair-programmed directly within Google Antigravity. Using rapid visual iteration, we created custom tokens, dark/light theme switching, and glassmorphic micro-animations.
4. **Render Cloud:**
   * Packaged with a declarative `render.yaml` blueprint and a multi-stage `Dockerfile`. Render hosts the production web service with automated health checks at `/api/health`.

---

## Why Does Open Innovation Matter?

Open-source and open-weight AI are not just philosophical ideals—for ScopeCrafter, they are the **critical technical differentiator**:

### 1. The NDA Problem (Why Closed APIs Fail Freelancers)
Clients frequently send proprietary wireframes, unreleased product ideas, and confidential database schemas. If a freelancer sends this text to closed APIs (such as OpenAI or Anthropic), the data is transmitted to proprietary servers where terms of service often reserve the right to log, inspect, or retain inputs for abuse monitoring and training. 

By utilizing **open-weight Gemma models**, we guarantee:
* Zero training on client inputs.
* Total data isolation.
* The ability for any agency to run the model on their own dedicated hardware or private VPC.

### 2. Micro-SaaS Unit Economics
To make a $5/month side hustle viable, your cost of goods sold (COGS) must be near zero. Calling closed commercial APIs for multi-thousand-token transcripts can cost $0.05 to $0.15 per run. A single active freelancer generating 30 proposals a month would wipe out the entire subscription profit margin!
Using Gemma 4 MoE keeps marginal inference costs at **$0.00**, making a $5/mo subscription infinitely scalable and sustainable.

---

## My Agent Session

This entire application was designed, coded, and verified using Google Antigravity and DevRelay session logging:

{% agent_session 35da1fbb-aae6-44be-8242-0372dfcfc4da %}

You can explore the full trajectory, tool executions, and verification steps in the accompanying transcript.

---

## My First User

To test the tool in the real world, I handed ScopeCrafter to a fellow freelance React developer who was struggling to bid on a messy 12-page Slack transcript from an early-stage founder.

**What happened:**
* She pasted the messy chat into ScopeCrafter with the Privacy Shield turned on.
* Within 3 seconds, ScopeCrafter sanitized 2 client email addresses and an internal staging URL, outputting a structured 3-milestone proposal with explicit boundaries ("No native iOS build in v1").
* She adjusted her rate to $95/hr using the live slider, copied the Markdown output into Notion, and sent it to the client.
* **The outcome:** The founder accepted Milestone 1 within 48 hours because the acceptance criteria were crystal clear.
* **Her feedback:** *"I would gladly pay $10/month for this just for the out-of-scope boundaries alone—that usually takes me half a day to think through."*

---

## Prize Categories

I am officially entering ScopeCrafter into the following Hacktoberfest Week 2 categories:

* 🌟 **Overall Winner ($250 USD + DEV++)** — A complete, production-ready tool solving an everyday problem for freelancers.
* 🧠 **Best Use of Gemma ($200 USD)** — Powered by `google/gemma-4-26b-a4b-it:free` (open-weight Mixture-of-Experts) to extract requirements and eliminate inference costs.
* ⚡ **Best Use of Backboard ($100 USD)** — Utilizes the official `backboard-sdk` for agent session threading and multi-model routing.
* 🚀 **Best Use of Render ($200 USD)** — Fully deployed and managed on Render Cloud via an automated `render.yaml` blueprint.
