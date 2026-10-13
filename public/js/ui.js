/**
 * ScopeCrafter UI Rendering & Formatting Helpers
 */

const ScopeUI = {
  /**
   * Fast, reliable clientside Markdown to HTML parser
   */
  markdownToHtml(md) {
    if (!md) return '';
    let html = md
      // Escape script tags
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold & Italic
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Horizontal Rules
      .replace(/^---$/gim, '<hr>')
      // Checkboxes
      .replace(/- \[x\] (.*$)/gim, '<li class="task-done"><span class="check-box">✓</span> $1</li>')
      .replace(/- \[ \] (.*$)/gim, '<li class="task-todo"><span class="check-box">○</span> $1</li>')
      // Unordered Lists
      .replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>')
      .replace(/^\s*\*\s+(.*$)/gim, '<li>$1</li>')
      // Paragraphs & Line Breaks
      .replace(/\n\n+/g, '</p><p>')
      .replace(/\n/g, '<br>');

    // Wrap in paragraph
    return `<p>${html}</p>`
      .replace(/<p><h/g, '<h')
      .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
      .replace(/<p><hr><\/p>/g, '<hr>')
      .replace(/<p><li>/g, '<ul><li>')
      .replace(/<\/li><\/p>/g, '</li></ul>');
  },

  /**
   * Displays toast notification
   */
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'error' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  /**
   * Renders the complete proposal into the DOM
   */
  renderProposal(proposal, activeRate) {
    if (!proposal) return;

    const rate = activeRate || proposal.paymentSchedule?.hourlyRate || 85;

    // 1. Banner Header
    const domainTag = document.getElementById('proposal-domain-tag');
    if (domainTag) domainTag.textContent = proposal.domain || 'Full-Stack Software Architecture';

    const modelTag = document.getElementById('proposal-model-tag');
    if (modelTag) {
      modelTag.textContent = `${proposal.meta?.modelUsed || 'Gemma 4 26B MoE'} • ${proposal.meta?.inferenceCost || '$0.00 Cost'}`;
    }

    const titleDisplay = document.getElementById('proposal-title-display');
    if (titleDisplay) titleDisplay.textContent = proposal.projectTitle || 'Project Proposal & Scope';

    const summaryDisplay = document.getElementById('proposal-summary-display');
    if (summaryDisplay) summaryDisplay.textContent = proposal.clientSummary || '';

    // 2. Metrics Grid
    const totalHours = proposal.totalEstimatedHours || 80;
    const totalCost = totalHours * rate;
    const depositCost = Math.round(totalCost * 0.30);

    const costDisplay = document.getElementById('metric-total-cost');
    if (costDisplay) costDisplay.textContent = `$${totalCost.toLocaleString()} USD`;

    const rateSub = document.getElementById('metric-rate-sub');
    if (rateSub) rateSub.textContent = `at $${rate}/hr agreed rate`;

    const hoursDisplay = document.getElementById('metric-total-hours');
    if (hoursDisplay) hoursDisplay.textContent = `${totalHours} hrs`;

    const weeksDisplay = document.getElementById('metric-total-weeks');
    if (weeksDisplay) weeksDisplay.textContent = `${proposal.estimatedWeeks || 4.0} wks`;

    const depositDisplay = document.getElementById('metric-deposit-cost');
    if (depositDisplay) depositDisplay.textContent = `$${depositCost.toLocaleString()} USD`;

    // 3. Recommended Stack
    const stack = proposal.recommendedStack || {};
    const fe = document.getElementById('stack-fe');
    if (fe) fe.textContent = stack.frontend || 'React 19 / TypeScript';
    const be = document.getElementById('stack-be');
    if (be) be.textContent = stack.backend || 'Node.js / Express';
    const db = document.getElementById('stack-db');
    if (db) db.textContent = stack.database || 'PostgreSQL';
    const infra = document.getElementById('stack-infra');
    if (infra) infra.textContent = stack.infrastructure || 'Render Cloud';

    const rationale = document.getElementById('stack-rationale-display');
    if (rationale) rationale.textContent = `Rationale: ${stack.rationale || 'Selected for performance, low overhead, and developer velocity.'}`;

    // 4. Milestones
    const milestonesContainer = document.getElementById('milestones-container');
    if (milestonesContainer && Array.isArray(proposal.milestones)) {
      milestonesContainer.innerHTML = '';
      proposal.milestones.forEach((m, idx) => {
        const mHours = m.estimatedHours || Math.round(totalHours * (idx === 0 ? 0.3 : idx === 1 ? 0.5 : 0.2));
        const mCost = mHours * rate;
        const mShare = m.costPercentage || (idx === 0 ? 30 : idx === 1 ? 50 : 20);

        const card = document.createElement('div');
        card.className = `milestone-card milestone-${idx + 1}`;
        card.innerHTML = `
          <div class="milestone-badge-row">
            <span class="milestone-num">Milestone ${idx + 1}</span>
            <span class="milestone-share">${mShare}% Payout &bull; $${mCost.toLocaleString()} USD</span>
          </div>
          <h4 class="milestone-title">${m.title}</h4>
          <div class="milestone-meta">
            <span>⏱️ Duration: ${m.duration || '1-2 weeks'}</span>
            <span>⌛ Effort: ${mHours} hours</span>
          </div>
          <div class="deliverables-block">
            <h5>Key Deliverables</h5>
            <ul>
              ${(m.deliverables || []).map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
          <div class="acceptance-block">
            <h5>Acceptance Criteria</h5>
            <div class="criteria-tags">
              ${(m.acceptanceCriteria || []).map(c => `<span class="crit-tag">✓ ${c}</span>`).join('')}
            </div>
          </div>
        `;
        milestonesContainer.appendChild(card);
      });
    }

    // 5. Out of Scope Boundaries
    const outOfScopeContainer = document.getElementById('out-of-scope-container');
    if (outOfScopeContainer && Array.isArray(proposal.outOfScope)) {
      outOfScopeContainer.innerHTML = proposal.outOfScope
        .map(item => `<li>❌ ${item}</li>`)
        .join('');
    }

    // 6. Technical Risks
    const risksContainer = document.getElementById('risks-container');
    if (risksContainer && Array.isArray(proposal.technicalRisks)) {
      risksContainer.innerHTML = proposal.technicalRisks
        .map(r => `
          <div class="risk-card">
            <div class="risk-header">
              <span class="risk-badge">Risk</span>
              <span class="risk-label">${r.risk}</span>
            </div>
            <p class="risk-mitigation">Mitigation: ${r.mitigation}</p>
          </div>
        `).join('');
    }

    // 7. Rendered Markdown Tab
    const mdContainer = document.getElementById('markdown-proposal-rendered');
    if (mdContainer) {
      mdContainer.innerHTML = this.markdownToHtml(proposal.markdownProposal || '');
    }

    // 8. Privacy Audit Tab
    this.renderPrivacyAudit(proposal);
  },

  /**
   * Renders the Privacy & Engine Audit Log Tab
   */
  renderPrivacyAudit(proposal) {
    const audit = proposal.privacyAudit || {};
    const auditLog = audit.auditLog || [];

    const badge = document.getElementById('audit-count-badge');
    if (badge) badge.textContent = auditLog.length;

    let sensitiveCount = 0;
    auditLog.forEach(item => {
      if (item.type !== 'open_weight_guarantee' && item.type !== 'privacy_shield_disabled') {
        sensitiveCount += item.count || 1;
      }
    });

    const statRedacted = document.getElementById('audit-stat-tokens-redacted');
    if (statRedacted) statRedacted.textContent = sensitiveCount;

    const statCost = document.getElementById('audit-stat-inference-cost');
    if (statCost) statCost.textContent = proposal.meta?.inferenceCost || '$0.00';

    const statModel = document.getElementById('audit-stat-model');
    if (statModel) statModel.textContent = proposal.meta?.modelUsed ? 'Gemma 4 MoE' : 'Open-Weight Gemma';

    const logList = document.getElementById('audit-log-items-container');
    if (logList) {
      logList.innerHTML = auditLog.map(item => {
        const isShield = item.type === 'open_weight_guarantee';
        return `
          <div class="log-item">
            <span class="log-icon ${isShield ? 'text-cyan' : 'text-emerald'}">✓</span>
            <div class="log-details">
              <div class="log-head">${item.type.replace(/_/g, ' ').toUpperCase()}</div>
              <div class="log-sub">${item.description}</div>
            </div>
          </div>
        `;
      }).join('');
    }
  },

  /**
   * Live recalculation of pricing when hourly rate slider moves
   */
  updatePricingLive(proposal, newRate) {
    if (!proposal) return;
    const rate = Number(newRate);
    const totalHours = proposal.totalEstimatedHours || 80;
    const totalCost = totalHours * rate;
    const depositCost = Math.round(totalCost * 0.30);

    const costDisplay = document.getElementById('metric-total-cost');
    if (costDisplay) costDisplay.textContent = `$${totalCost.toLocaleString()} USD`;

    const rateSub = document.getElementById('metric-rate-sub');
    if (rateSub) rateSub.textContent = `at $${rate}/hr agreed rate`;

    const depositDisplay = document.getElementById('metric-deposit-cost');
    if (depositDisplay) depositDisplay.textContent = `$${depositCost.toLocaleString()} USD`;

    const recalcVal = document.getElementById('recalc-rate-val');
    if (recalcVal) recalcVal.textContent = `$${rate}/hr`;

    // Recalculate milestone cards
    const milestoneCards = document.querySelectorAll('.milestones-timeline .milestone-card');
    milestoneCards.forEach((card, idx) => {
      const mHours = proposal.milestones?.[idx]?.estimatedHours || Math.round(totalHours * (idx === 0 ? 0.3 : idx === 1 ? 0.5 : 0.2));
      const mCost = mHours * rate;
      const mShare = proposal.milestones?.[idx]?.costPercentage || (idx === 0 ? 30 : idx === 1 ? 50 : 20);
      const shareEl = card.querySelector('.milestone-share');
      if (shareEl) {
        shareEl.textContent = `${mShare}% Payout • $${mCost.toLocaleString()} USD`;
      }
    });
  }
};

window.ScopeUI = ScopeUI;
