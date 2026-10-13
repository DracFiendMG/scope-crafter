/**
 * Client Sample Inquiry Templates
 * Demonstrates real-world messy client requests for quick one-click testing.
 */

import express from 'express';

const router = express.Router();

const TEMPLATES = [
  {
    id: 'fintech-nda-email',
    title: '🔒 Confidential Fintech & Auth Portal (Privacy Shield Demo)',
    tag: 'Privacy Shield & NDA Demo',
    description: 'Contains confidential emails, secret API keys, and internal URLs to test automatic redaction.',
    sampleRate: 95,
    sampleWeeks: 5,
    sampleStack: 'React + Node + PostgreSQL',
    text: `Hi Alex,

Hope you're well! Reaching out on behalf of our leadership team at Global Pay Vault (contact me at sarah.jenkins@globalpayvault.internal.co or +1 (415) 890-2341).

We need an experienced contractor to urgently build our customer reconciliation dashboard before our Q4 audit. Here is the context:

Right now our finance team manually reconciles banking ledger CSVs every Friday night, which is insane. We need a web app where our ops managers can log in with OAuth, upload daily transaction CSVs (or sync directly via Plaid API), and have automated reconciliation flags show up in a clear dashboard.

Key things we need:
1. Role-based login (Admin, Finance Manager, Read-Only Auditor).
2. Plaid integration + Stripe Connect webhook listener. Test key for our sandbox environment is sk-live_998a44b1c2d3e4f5a6b7c8d9e0f12345.
3. Daily anomaly detection and automated discrepancy calculation.
4. Exportable audit reports in CSV and PDF format.
5. Our current staging server is running at https://staging.internal-payvault.io:8080/api/v1.

Can you give us a fixed milestone plan? We need this live within 4-5 weeks. We are strictly under NDA, so please ensure our banking data and architecture stay completely private.

Best,
Sarah Jenkins
Head of Product, Global Pay Vault`
  },
  {
    id: 'messy-slack-saas',
    title: '💬 Messy Slack Transcript - B2B SaaS Dashboard MVP',
    tag: 'Unstructured Chat Transcript',
    description: 'Casual Slack rambling with scattered feature requests and scope creep risks.',
    sampleRate: 85,
    sampleWeeks: 4,
    sampleStack: 'Next.js + TypeScript + Supabase',
    text: `[10:14 AM] Mark (Founder): Hey! quick question, can we build an MVP for our logistics tracker by next month?
[10:15 AM] Mark: basically right now our drivers text dispatchers updates on WhatsApp and it's a huge mess.
[10:17 AM] Mark: We need like a single screen dashboard where dispatchers see active delivery trucks on a map (maybe Google Maps or Leaflet? whatever is cheaper).
[10:18 AM] Mark: Drivers should just get a mobile friendly link to tap "Picked Up", "In Transit", "Delivered" with GPS stamp.
[10:20 AM] Mark: Oh and also! clients should be able to track their package link like DoorDash without logging in.
[10:22 AM] Mark: We also need automated email/SMS notification when status changes (Twilio or SendGrid?).
[10:24 AM] Mark: What about billing? We probably need Stripe subscription for our logistics partners ($199/month tier and $499/month tier).
[10:26 AM] Mark: Can you package this up into 3 milestones so our angel investor can approve the budget? Our budget is around $6k-8k.`
  },
  {
    id: 'ecommerce-redesign',
    title: '🛍️ E-Commerce Redesign & Conversion Optimization',
    tag: 'E-Commerce & Performance',
    description: 'Client losing sales due to slow site, complex checkout, and missing mobile optimization.',
    sampleRate: 75,
    sampleWeeks: 3,
    sampleStack: 'Next.js + Tailwind + Stripe',
    text: `Subject: Need urgent store overhaul - mobile bounce rate is 68%

Hey developer!
I run an artisan leather goods brand (35,000 monthly visitors). Our current WooCommerce store takes 5.2 seconds to load on mobile and our checkout drop-off rate is killing us.

We need to rebuild the customer-facing storefront:
- Ultra-fast product catalog with instant search & multi-attribute filters (color, leather type, price).
- One-click express checkout supporting Apple Pay, Google Pay, and Stripe.
- Customer reviews & photo gallery module.
- Automated abandoned cart recovery emails.
- Inventory sync with our local warehouse spreadsheet or webhook.

We want a clean modern design that feels luxury (dark tones, smooth animations). How many hours would this take and can you break down the phases?`
  },
  {
    id: 'ai-agent-workflow',
    title: '🤖 AI Automation Pipeline & Knowledge Base Agent',
    tag: 'AI Agent & RAG Pipeline',
    description: 'Startup wanting an internal RAG assistant to answer employee questions from Notion & PDF docs.',
    sampleRate: 110,
    sampleWeeks: 4,
    sampleStack: 'Python / FastAPI + React + Open-Weight Gemma',
    text: `Hi there!
We are a 40-person legal consultancy and our team spends 15 hours a week searching through 500+ PDF contracts and Notion SOPs.

We want to build an internal AI Knowledge Assistant:
1. Ingest our library of PDF manuals, client agreements, and markdown SOPs.
2. Vector search / hybrid retrieval with citation of exact page numbers.
3. Chat interface where paralegals can ask natural language questions and get verified answers with document links.
4. Privacy is paramount: Client contracts cannot be used to train public models. Must use open-weight models or controlled endpoints.
5. Admin dashboard to view query logs and upload new documents.

Can you scope this out into 3 clear deliverables with estimated hours and a fixed timeline?`
  }
];

router.get('/templates', (req, res) => {
  res.json({
    success: true,
    templates: TEMPLATES
  });
});

export default router;
