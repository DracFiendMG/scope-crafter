/**
 * ScopeCrafter Main Application Controller
 */

document.addEventListener('DOMContentLoaded', async () => {
  // App State
  let templates = [];
  let currentProposal = null;
  let activeRate = 85;
  let activeWeeks = 4;
  let privacyShieldActive = true;
  let backboardKey = localStorage.getItem('scopecrafter_bb_key') || '';
  let openRouterKey = localStorage.getItem('scopecrafter_or_key') || '';

  // DOM Elements
  const promptInput = document.getElementById('client-prompt-input');
  const wordCountDisplay = document.getElementById('word-count-display');
  const templatePillsContainer = document.getElementById('template-pills-container');
  const clearInputBtn = document.getElementById('clear-input-btn');

  const hourlyRateSlider = document.getElementById('hourly-rate-slider');
  const hourlyRateDisplay = document.getElementById('hourly-rate-display');
  const targetWeeksSelect = document.getElementById('target-weeks-select');
  const targetWeeksDisplay = document.getElementById('target-weeks-display');
  const stackPrefInput = document.getElementById('stack-pref-input');
  const privacyShieldToggle = document.getElementById('privacy-shield-toggle');
  const shieldStatusPill = document.getElementById('shield-status-pill');

  const generateBtn = document.getElementById('generate-btn');
  const generationLoader = document.getElementById('generation-loader');
  const loaderStatusText = document.getElementById('loader-status-text');

  const recalcRateSlider = document.getElementById('recalc-rate-slider');
  const copyMarkdownBtn = document.getElementById('copy-markdown-btn');
  const printPdfBtn = document.getElementById('print-pdf-btn');

  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  const refineInput = document.getElementById('refine-input');
  const refineSubmitBtn = document.getElementById('refine-submit-btn');
  const refinePills = document.querySelectorAll('.refine-pill');

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const settingsBtn = document.getElementById('settings-btn');
  const settingsDialog = document.getElementById('settings-dialog');
  const closeSettingsBtn = document.getElementById('close-settings-dialog');
  const saveSettingsBtn = document.getElementById('save-settings-btn');
  const testKeysBtn = document.getElementById('test-keys-btn');
  const cfgBackboardInput = document.getElementById('cfg-backboard-key');
  const cfgOpenRouterInput = document.getElementById('cfg-openrouter-key');
  const keyFeedbackBox = document.getElementById('key-test-feedback');

  // --- Theme Toggle ---
  const savedTheme = localStorage.getItem('scopecrafter_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('scopecrafter_theme', newTheme);
    ScopeUI.showToast(`Switched to ${newTheme} theme`, 'info');
  });

  // --- Word / Char Counter ---
  function updateWordCount() {
    const text = promptInput.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    const chars = promptInput.value.length;
    wordCountDisplay.textContent = `${words} words • ${chars} chars`;
  }
  promptInput.addEventListener('input', updateWordCount);

  clearInputBtn.addEventListener('click', () => {
    promptInput.value = '';
    updateWordCount();
    promptInput.focus();
  });

  // --- Rate & Timeline Sliders ---
  function syncHourlyRate(val) {
    activeRate = Number(val);
    hourlyRateSlider.value = val;
    if (recalcRateSlider) recalcRateSlider.value = val;
    hourlyRateDisplay.textContent = `$${val}/hr`;
    if (currentProposal) {
      ScopeUI.updatePricingLive(currentProposal, val);
    }
  }

  hourlyRateSlider.addEventListener('input', (e) => syncHourlyRate(e.target.value));
  if (recalcRateSlider) {
    recalcRateSlider.addEventListener('input', (e) => syncHourlyRate(e.target.value));
  }

  targetWeeksSelect.addEventListener('change', (e) => {
    activeWeeks = Number(e.target.value);
    targetWeeksDisplay.textContent = `${activeWeeks} Weeks`;
  });

  privacyShieldToggle.addEventListener('change', (e) => {
    privacyShieldActive = e.target.checked;
    if (shieldStatusPill) {
      const dot = shieldStatusPill.querySelector('.pill-dot');
      const val = shieldStatusPill.querySelector('.pill-value');
      if (privacyShieldActive) {
        dot.className = 'pill-dot cyan';
        val.textContent = 'Active (Zero-Retention)';
        ScopeUI.showToast('Privacy Shield Active: Client NDA data will be sanitized', 'success');
      } else {
        dot.className = 'pill-dot amber';
        val.textContent = 'Disabled (Raw Text Forwarded)';
        ScopeUI.showToast('Privacy Shield Disabled', 'info');
      }
    }
  });

  // --- Tab Navigation ---
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const activePane = document.getElementById(targetId);
      if (activePane) activePane.classList.add('active');
    });
  });

  // --- Load Templates ---
  async function loadTemplates() {
    try {
      templates = await ScopeAPI.getTemplates();
      if (templates.length > 0 && templatePillsContainer) {
        templatePillsContainer.innerHTML = templates.map((t, idx) => `
          <button class="template-pill ${idx === 0 ? 'active' : ''}" data-id="${t.id}">${t.title}</button>
        `).join('');

        // Preload first template
        selectTemplate(templates[0]);
      }
    } catch (e) {
      console.warn('Could not fetch templates:', e);
    }
  }

  function selectTemplate(tmpl) {
    if (!tmpl) return;
    promptInput.value = tmpl.text;
    updateWordCount();

    if (tmpl.sampleRate) syncHourlyRate(tmpl.sampleRate);
    if (tmpl.sampleWeeks) {
      targetWeeksSelect.value = tmpl.sampleWeeks;
      targetWeeksDisplay.textContent = `${tmpl.sampleWeeks} Weeks`;
      activeWeeks = tmpl.sampleWeeks;
    }
    if (tmpl.sampleStack) stackPrefInput.value = tmpl.sampleStack;

    // Highlight active pill
    document.querySelectorAll('.template-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-id') === tmpl.id);
    });
  }

  if (templatePillsContainer) {
    templatePillsContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.template-pill');
      if (!pill) return;
      const id = pill.getAttribute('data-id');
      const found = templates.find(t => t.id === id);
      if (found) {
        selectTemplate(found);
        ScopeUI.showToast(`Loaded "${found.title}" sample`, 'info');
      }
    });
  }

  // --- Loader Step Progression ---
  let loaderStepInterval = null;
  function startLoaderSteps() {
    generationLoader.hidden = false;
    const steps = [
      document.getElementById('l-step-1'),
      document.getElementById('l-step-2'),
      document.getElementById('l-step-3'),
      document.getElementById('l-step-4')
    ];
    let currentStep = 0;

    steps.forEach((s, idx) => {
      if (s) {
        s.className = `step-item ${idx === 0 ? 'active' : ''}`;
      }
    });

    loaderStepInterval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        if (steps[currentStep]) steps[currentStep].className = 'step-item completed';
        currentStep++;
        if (steps[currentStep]) steps[currentStep].className = 'step-item active';
        if (loaderStatusText) {
          const statusMsgs = [
            'Sanitizing confidential client data...',
            'Routing to Gemma 4 26B MoE via Backboard...',
            'Calculating milestone hours and contingency...',
            'Finalizing proposal formatting...'
          ];
          loaderStatusText.textContent = statusMsgs[currentStep] || 'Processing...';
        }
      }
    }, 450);
  }

  function stopLoaderSteps() {
    if (loaderStepInterval) clearInterval(loaderStepInterval);
    generationLoader.hidden = true;
  }

  // --- Generation Action ---
  async function handleGenerate() {
    const text = promptInput.value.trim();
    if (!text) {
      ScopeUI.showToast('Please paste a client request or select a quick template', 'error');
      promptInput.focus();
      return;
    }

    generateBtn.disabled = true;
    startLoaderSteps();

    try {
      const proposal = await ScopeAPI.generateScope({
        prompt: text,
        hourlyRate: activeRate,
        targetWeeks: activeWeeks,
        stackPreference: stackPrefInput.value.trim(),
        privacyShield: privacyShieldActive,
        apiKey: backboardKey,
        openRouterKey: openRouterKey
      });

      currentProposal = proposal;
      ScopeUI.renderProposal(proposal, activeRate);

      // Switch to breakdown tab
      const breakdownTabBtn = document.querySelector('[data-tab="breakdown-tab"]');
      if (breakdownTabBtn) breakdownTabBtn.click();

      ScopeUI.showToast('Proposal crafted successfully!', 'success');
    } catch (err) {
      console.error('Generation failed:', err);
      ScopeUI.showToast(`Generation Error: ${err.message}`, 'error');
    } finally {
      stopLoaderSteps();
      generateBtn.disabled = false;
    }
  }

  generateBtn.addEventListener('click', handleGenerate);

  // Keyboard shortcut Ctrl+Enter or Cmd+Enter
  promptInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleGenerate();
    }
  });

  // --- Copy Markdown ---
  copyMarkdownBtn.addEventListener('click', async () => {
    if (!currentProposal || !currentProposal.markdownProposal) {
      ScopeUI.showToast('No proposal generated to copy yet', 'error');
      return;
    }

    try {
      await navigator.clipboard.writeText(currentProposal.markdownProposal);
      ScopeUI.showToast('Copied full markdown proposal to clipboard! 📋', 'success');
    } catch (e) {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = currentProposal.markdownProposal;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      ScopeUI.showToast('Copied full markdown proposal to clipboard! 📋', 'success');
    }
  });

  // --- Print / Export PDF ---
  printPdfBtn.addEventListener('click', () => {
    if (!currentProposal) {
      ScopeUI.showToast('Please generate a proposal first', 'error');
      return;
    }
    // Switch to formatted proposal tab before printing
    const proposalTabBtn = document.querySelector('[data-tab="proposal-tab"]');
    if (proposalTabBtn) proposalTabBtn.click();
    setTimeout(() => window.print(), 250);
  });

  // --- Refine Scope ---
  async function handleRefine(instruction) {
    if (!currentProposal) {
      ScopeUI.showToast('Generate a base proposal first before refining', 'error');
      return;
    }

    const mod = instruction || refineInput.value.trim();
    if (!mod) {
      ScopeUI.showToast('Please type a revision instruction', 'error');
      refineInput.focus();
      return;
    }

    refineSubmitBtn.disabled = true;
    startLoaderSteps();

    try {
      const updated = await ScopeAPI.refineScope({
        originalProposal: currentProposal,
        modificationInstruction: mod,
        apiKey: backboardKey,
        openRouterKey: openRouterKey
      });

      currentProposal = updated;
      ScopeUI.renderProposal(updated, activeRate);
      refineInput.value = '';
      ScopeUI.showToast(`Updated scope: "${mod.slice(0, 35)}..."`, 'success');
    } catch (err) {
      console.error('Refinement failed:', err);
      ScopeUI.showToast(`Refine Error: ${err.message}`, 'error');
    } finally {
      stopLoaderSteps();
      refineSubmitBtn.disabled = false;
    }
  }

  refineSubmitBtn.addEventListener('click', () => handleRefine());
  refineInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRefine();
    }
  });

  refinePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const prompt = pill.getAttribute('data-prompt');
      refineInput.value = prompt;
      handleRefine(prompt);
    });
  });

  // --- Settings Modal ---
  settingsBtn.addEventListener('click', () => {
    cfgBackboardInput.value = backboardKey;
    cfgOpenRouterInput.value = openRouterKey;
    keyFeedbackBox.hidden = true;
    settingsDialog.showModal();
  });

  closeSettingsBtn.addEventListener('click', () => settingsDialog.close());

  // Close dialog on backdrop click
  settingsDialog.addEventListener('click', (e) => {
    const rect = settingsDialog.getBoundingClientRect();
    const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
      && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      settingsDialog.close();
    }
  });

  saveSettingsBtn.addEventListener('click', () => {
    backboardKey = cfgBackboardInput.value.trim();
    openRouterKey = cfgOpenRouterInput.value.trim();
    localStorage.setItem('scopecrafter_bb_key', backboardKey);
    localStorage.setItem('scopecrafter_or_key', openRouterKey);
    settingsDialog.close();
    ScopeUI.showToast('API Key settings saved', 'success');
  });

  testKeysBtn.addEventListener('click', async () => {
    const bKey = cfgBackboardInput.value.trim();
    const oKey = cfgOpenRouterInput.value.trim();
    if (!bKey && !oKey) {
      keyFeedbackBox.className = 'feedback-box error';
      keyFeedbackBox.textContent = 'Please enter at least one key to test.';
      keyFeedbackBox.hidden = false;
      return;
    }

    testKeysBtn.disabled = true;
    keyFeedbackBox.className = 'feedback-box';
    keyFeedbackBox.textContent = 'Testing connection...';
    keyFeedbackBox.hidden = false;

    try {
      const res = await ScopeAPI.testKeys({ apiKey: bKey, openRouterKey: oKey });
      keyFeedbackBox.className = 'feedback-box success';
      keyFeedbackBox.textContent = `Connection verified! Backboard: ${res.results?.backboard?.status || 'skipped'}, OpenRouter: ${res.results?.openRouter?.status || 'skipped'}`;
    } catch (e) {
      keyFeedbackBox.className = 'feedback-box error';
      keyFeedbackBox.textContent = `Verification Error: ${e.message}`;
    } finally {
      testKeysBtn.disabled = false;
    }
  });

  // --- Initialize App ---
  await loadTemplates();
  // Automatically generate the initial proposal demo on first load!
  await handleGenerate();
});
