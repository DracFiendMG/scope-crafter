/**
 * Health & Diagnostics API Routes
 * Useful for Render automated health checks and verifying API connectivity.
 */

import express from 'express';
import { BackboardClient } from 'backboard-sdk';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'ScopeCrafter - Freelance Scope & Proposal Engine',
    version: '1.0.0',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    engineConfig: {
      defaultModel: 'google/gemma-4-26b-a4b-it:free',
      orchestrator: 'Backboard SDK',
      privacyShield: 'Enabled',
      backboardConfigured: !!process.env.BACKBOARD_API_KEY,
      openRouterConfigured: !!process.env.OPENROUTER_API_KEY
    }
  });
});

router.post('/test-keys', async (req, res) => {
  const { apiKey, openRouterKey } = req.body;
  const results = {};

  if (apiKey) {
    try {
      const client = new BackboardClient({ apiKey, timeout: 8000 });
      // Call list models or light query
      results.backboard = { status: 'configured', message: 'Backboard client instantiated successfully' };
    } catch (e) {
      results.backboard = { status: 'error', message: e.message };
    }
  }

  if (openRouterKey) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
        headers: { 'Authorization': `Bearer ${openRouterKey}` }
      });
      if (response.ok) {
        results.openRouter = { status: 'valid', message: 'OpenRouter API key is active' };
      } else {
        results.openRouter = { status: 'invalid', message: `Status ${response.status}` };
      }
    } catch (e) {
      results.openRouter = { status: 'error', message: e.message };
    }
  }

  res.json({ results });
});

export default router;
