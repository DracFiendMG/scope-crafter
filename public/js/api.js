/**
 * ScopeCrafter Client API Layer
 * Handles communication with the backend endpoints
 */

const ScopeAPI = {
  /**
   * Generates a 3-milestone proposal from raw client brief
   */
  async generateScope(payload) {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(65000)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate proposal');
    }
    return data.proposal;
  },

  /**
   * Refines an existing proposal with user instructions
   */
  async refineScope(payload) {
    const response = await fetch('/api/refine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(65000)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to refine proposal');
    }
    return data.proposal;
  },

  /**
   * Fetches sample messy client inquiries
   */
  async getTemplates() {
    const response = await fetch('/api/templates');
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to load sample templates');
    }
    return data.templates || [];
  },

  /**
   * Checks backend health
   */
  async getHealth() {
    const response = await fetch('/api/health');
    return response.json();
  },

  /**
   * Tests Backboard / OpenRouter API keys
   */
  async testKeys(payload) {
    const response = await fetch('/api/test-keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return response.json();
  }
};

window.ScopeAPI = ScopeAPI;
