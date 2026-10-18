/**
 * Backboard SDK Orchestration Service
 * Connects to Backboard's persistent memory and multi-model router
 * to execute Gemma 4 26B MoE inference, with graceful fallbacks.
 */

import { BackboardClient } from 'backboard-sdk';
import { GemmaService } from './gemmaService.js';
import { SYSTEM_PROMPT } from '../prompts/scopePrompts.js';

export class BackboardService {
  /**
   * Generates a milestone-based scope proposal directly using Gemma via OpenRouter
   */
  static async generateScope(params) {
    return GemmaService.generateScope(params);
  }

  /**
   * Refines an existing scope proposal based on user feedback
   */
  static async refineScope(params) {
    return GemmaService.refineScope(params);
  }
}
