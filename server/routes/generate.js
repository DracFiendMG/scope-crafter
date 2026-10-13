/**
 * Scope Generation & Refinement API Routes
 */

import express from 'express';
import { PrivacyShield } from '../services/privacyShield.js';
import { BackboardService } from '../services/backboardService.js';

const router = express.Router();

/**
 * POST /api/generate
 * Generates a complete 3-milestone project scope & commercial proposal
 */
router.post('/generate', async (req, res) => {
  try {
    const {
      prompt,
      hourlyRate = 85,
      targetWeeks = 4,
      stackPreference = 'Auto-Recommend',
      privacyShield = true,
      apiKey,
      openRouterKey
    } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        error: 'Prompt is required. Please paste client requirements, email, or chat transcript.'
      });
    }

    // Apply Privacy Shield if enabled
    let sanitizedText = prompt;
    let auditLog = [];

    if (privacyShield) {
      const shieldResult = PrivacyShield.sanitize(prompt);
      sanitizedText = shieldResult.sanitizedText;
      auditLog = shieldResult.auditLog;
    } else {
      auditLog.push({
        type: 'privacy_shield_disabled',
        count: 0,
        description: 'Privacy Shield is disabled by user. Raw client text forwarded directly.'
      });
    }

    // Call Backboard SDK Orchestrator
    const proposal = await BackboardService.generateScope({
      prompt: sanitizedText,
      apiKey,
      openRouterKey,
      hourlyRate: Number(hourlyRate) || 85,
      targetWeeks: Number(targetWeeks) || 4,
      stackPreference
    });

    // Attach privacy audit log
    proposal.privacyAudit = {
      shieldActive: !!privacyShield,
      auditLog,
      sanitizedWordCount: sanitizedText.split(/\s+/).length,
      originalWordCount: prompt.split(/\s+/).length
    };

    return res.json({
      success: true,
      proposal
    });
  } catch (error) {
    console.error('Error generating scope:', error);
    return res.status(500).json({
      error: 'Failed to generate project scope',
      details: error.message
    });
  }
});

/**
 * POST /api/refine
 * Iterates on an existing proposal with user instructions
 */
router.post('/refine', async (req, res) => {
  try {
    const {
      originalProposal,
      modificationInstruction,
      apiKey,
      openRouterKey
    } = req.body;

    if (!originalProposal || !modificationInstruction) {
      return res.status(400).json({
        error: 'Both originalProposal and modificationInstruction are required.'
      });
    }

    const updatedProposal = await BackboardService.refineScope({
      originalProposal,
      modificationInstruction,
      apiKey,
      openRouterKey
    });

    return res.json({
      success: true,
      proposal: updatedProposal
    });
  } catch (error) {
    console.error('Error refining scope:', error);
    return res.status(500).json({
      error: 'Failed to refine project scope',
      details: error.message
    });
  }
});

export default router;
