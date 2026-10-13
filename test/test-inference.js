/**
 * Test Suite: ScopeCrafter Inference & Privacy Verification
 */

import { PrivacyShield } from '../server/services/privacyShield.js';
import { BackboardService } from '../server/services/backboardService.js';

async function runTests() {
  console.log('--- TEST 1: Privacy Shield Verification ---');
  const dirtyPrompt = `
    Hi, I am Mark from SecureBank (mark.david@securebank.internal.com, +1-555-432-8899).
    Our staging URL is https://staging.internal-securebank.io/v2.
    Our Stripe secret key is sk-live_99887766554433221100aabbccdd.
    We need an automated invoice reconciliation dashboard in 4 weeks. Budget is $8,000.
  `;

  const shieldResult = PrivacyShield.sanitize(dirtyPrompt);
  console.log('Sanitized Text:\n', shieldResult.sanitizedText);
  console.log('Audit Log Items:', shieldResult.auditLog.length);

  // Assertions
  if (shieldResult.sanitizedText.includes('mark.david@securebank.internal.com')) {
    throw new Error('FAIL: Email was not redacted!');
  }
  if (shieldResult.sanitizedText.includes('sk-live_99887766554433221100aabbccdd')) {
    throw new Error('FAIL: API Key was not redacted!');
  }
  if (!shieldResult.sanitizedText.includes('[REDACTED_API_KEY')) {
    throw new Error('FAIL: Redacted API key token missing!');
  }
  console.log('✅ TEST 1 PASSED: Privacy Shield cleanly masked all sensitive data.\n');

  console.log('--- TEST 2: Gemma MoE Proposal Generation ---');
  const proposal = await BackboardService.generateScope({
    prompt: shieldResult.sanitizedText,
    hourlyRate: 100,
    targetWeeks: 4,
    stackPreference: 'Next.js + PostgreSQL'
  });

  console.log('Project Title:', proposal.projectTitle);
  console.log('Total Hours:', proposal.totalEstimatedHours);
  console.log('Milestones Count:', proposal.milestones.length);
  console.log('Total Cost:', proposal.paymentSchedule.totalAmount);
  console.log('Model Verification:', proposal.meta.modelUsed);

  if (proposal.milestones.length !== 3) {
    throw new Error('FAIL: Expected exactly 3 milestones!');
  }
  if (proposal.paymentSchedule.totalAmount !== proposal.totalEstimatedHours * 100) {
    throw new Error('FAIL: Price calculation mismatch!');
  }
  if (!proposal.markdownProposal.includes('Milestone 1')) {
    throw new Error('FAIL: Formatted markdown proposal missing Milestone 1!');
  }
  console.log('✅ TEST 2 PASSED: 3-Milestone Scope generation and pricing verified.\n');

  console.log('🎉 ALL ENGINE TESTS PASSED!');
}

runTests().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
