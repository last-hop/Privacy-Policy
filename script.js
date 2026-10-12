/**
 * Multi-App Privacy Policy Engine
 * Supports URL queries (?app=slug), dynamic content injection,
 * dark mode toggling, scrollspy TOC, print, and copy-link utilities.
 */

(function () {
  'use strict';

  // Elements
  const appSelector = document.getElementById('app-selector');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const printBtn = document.getElementById('print-btn');
  const copyLinkBtn = document.getElementById('copy-link-btn');
  const shareUrlInput = document.getElementById('share-url-input');
  const copyToast = document.getElementById('copy-toast');
  const tocLinks = document.querySelectorAll('.toc-link');

  // Dynamic Content Targets
  const elAppTitle = document.getElementById('app-title');
  const elAppTagline = document.getElementById('app-tagline');
  const elAppCategory = document.getElementById('app-category');
  const elSidebarAppTitle = document.getElementById('sidebar-app-title');
  const elSidebarAppTagline = document.getElementById('sidebar-app-tagline');
  const elSidebarCategory = document.getElementById('sidebar-category');
  const elEffectiveDate = document.getElementById('effective-date');
  const elLastUpdated = document.getElementById('last-updated');
  const elDeveloperName = document.querySelectorAll('.dev-name');
  const elDeveloperEmail = document.querySelectorAll('.dev-email');
  const elDeveloperAddress = document.querySelectorAll('.dev-address');
  const elDeveloperWebsite = document.querySelectorAll('.dev-website');
  const elSummaryText = document.getElementById('summary-text');
  const elDataGrid = document.getElementById('data-collected-grid');
  const elPermissionsList = document.getElementById('permissions-container');
  const elThirdPartyGrid = document.getElementById('third-party-grid');
  const elChildrenPolicy = document.getElementById('children-policy-content');
  const elDeletionContent = document.getElementById('deletion-content');
  const elCustomNotes = document.getElementById('custom-notes-box');
  const elCustomNotesText = document.getElementById('custom-notes-text');
  const elAccountPolicy = document.getElementById('account-policy-content');

  // Current Active App
  let currentApp = null;

  // Initialize Application
  function init() {
    initTheme();
    populateAppDropdown();
    loadAppFromUrl();
    setupEventListeners();
    setupScrollSpy();
  }

  // Populate Dropdown
  function populateAppDropdown() {
    if (!appSelector || !window.POLICY_CONFIG) return;

    appSelector.innerHTML = '';

    // Add General option
    const genOption = document.createElement('option');
    genOption.value = 'general';
    genOption.textContent = '🌐 General Policy (All Apps)';
    appSelector.appendChild(genOption);

    // Add specific apps
    const apps = window.POLICY_CONFIG.apps || [];
    if (apps.length > 0) {
      const optGroup = document.createElement('optgroup');
      optGroup.label = 'Specific Applications';

      apps.forEach(app => {
        const opt = document.createElement('option');
        opt.value = app.id;
        opt.textContent = `📱 ${app.name}`;
        optGroup.appendChild(opt);
      });
      appSelector.appendChild(optGroup);
    }
  }

  // Determine App from URL Parameter
  function loadAppFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const appId = urlParams.get('app');

    const config = window.POLICY_CONFIG;
    if (!config) return;

    if (appId && appId !== 'general') {
      const matchedApp = config.apps.find(a => a.id.toLowerCase() === appId.toLowerCase());
      if (matchedApp) {
        currentApp = matchedApp;
        appSelector.value = matchedApp.id;
      } else {
        currentApp = config.generalPolicy;
        appSelector.value = 'general';
      }
    } else {
      currentApp = config.generalPolicy;
      appSelector.value = 'general';
    }

    renderPolicy(currentApp);
    updateShareUrl();
  }

  // Render Policy Data
  function renderPolicy(app) {
    const dev = window.POLICY_CONFIG.developer;

    // Update Document Head Title
    document.title = `Privacy Policy - ${app.name}`;

    // Developer details
    elDeveloperName.forEach(el => el.textContent = dev.name);
    elDeveloperEmail.forEach(el => {
      el.textContent = dev.email;
      if (el.tagName === 'A') el.href = `mailto:${dev.email}`;
    });
    elDeveloperAddress.forEach(el => el.textContent = dev.address);
    elDeveloperWebsite.forEach(el => {
      el.textContent = dev.website;
      if (el.tagName === 'A') el.href = dev.website;
    });

    // App Hero & Sidebar Meta
    if (elAppTitle) elAppTitle.textContent = app.name;
    if (elAppTagline) elAppTagline.textContent = app.tagline || app.summary;
    if (elAppCategory) elAppCategory.textContent = app.category;
    if (elSidebarAppTitle) elSidebarAppTitle.textContent = app.name;
    if (elSidebarAppTagline) elSidebarAppTagline.textContent = app.tagline || app.summary;
    if (elSidebarCategory) elSidebarCategory.textContent = app.category;
    if (elEffectiveDate) elEffectiveDate.textContent = app.effectiveDate || dev.effectiveDate;
    if (elLastUpdated) elLastUpdated.textContent = app.lastUpdated || dev.lastUpdated;
    if (elSummaryText) elSummaryText.textContent = app.summary;

    // Render Data Collected
    renderDataCollected(app.dataCollected || []);

    // Render Permissions
    renderPermissions(app.permissions || []);

    // Render Third-Party Services
    renderThirdPartyServices(app.thirdPartyServices || []);

    // Render Children Privacy
    renderChildrenPolicy(app);

    // Render Account / Data Retention
    renderAccountPolicy(app);

    // Render Data Deletion
    if (elDeletionContent) {
      elDeletionContent.textContent = app.dataDeletionInstructions || 
        `To request deletion of telemetry or data associated with this app, please email ${dev.email} with your request details.`;
    }

    // Render Custom Notes (if any)
    if (elCustomNotes && elCustomNotesText) {
      if (app.customNotes) {
        elCustomNotesText.textContent = app.customNotes;
        elCustomNotes.style.display = 'block';
      } else {
        elCustomNotes.style.display = 'none';
      }
    }
  }

  // Render Data Collected Grid
  function renderDataCollected(items) {
    if (!elDataGrid) return;
    elDataGrid.innerHTML = '';

    if (items.length === 0) {
      elDataGrid.innerHTML = '<p class="text-muted">No personal or sensitive user data is collected by this application.</p>';
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'data-card';
      card.innerHTML = `
        <div class="data-card-header">
          <span class="data-card-title">${escapeHtml(item.category)}</span>
          <span class="optional-tag ${item.isOptional ? 'optional' : 'required'}">
            ${item.isOptional ? 'Optional' : 'Essential'}
          </span>
        </div>
        <p class="data-card-desc">${escapeHtml(item.details)}</p>
      `;
      elDataGrid.appendChild(card);
    });
  }

  // Render Permissions Container
  function renderPermissions(perms) {
    if (!elPermissionsList) return;
    elPermissionsList.innerHTML = '';

    if (perms.length === 0) {
      elPermissionsList.innerHTML = '<p>This application does not request special or sensitive runtime system permissions (e.g., Camera, Microphone, Fine Location, Contacts).</p>';
      return;
    }

    const ul = document.createElement('ul');
    perms.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `<strong><code>${escapeHtml(p.name)}</code></strong>: ${escapeHtml(p.purpose)}`;
      ul.appendChild(li);
    });
    elPermissionsList.appendChild(ul);
  }

  // Render Third Party Services
  function renderThirdPartyServices(serviceKeys) {
    if (!elThirdPartyGrid) return;
    elThirdPartyGrid.innerHTML = '';

    const allServices = window.POLICY_CONFIG.availableThirdParties || {};
    const validServices = serviceKeys.map(k => allServices[k]).filter(Boolean);

    if (validServices.length === 0) {
      elThirdPartyGrid.innerHTML = '<p>This application does not utilize third-party analytics, ads, or tracking SDKs.</p>';
      return;
    }

    validServices.forEach(s => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <div>
          <div class="service-name">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            ${escapeHtml(s.name)}
          </div>
          <p class="service-purpose">${escapeHtml(s.purpose)}</p>
        </div>
        <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="service-link">
          Read ${escapeHtml(s.name)} Privacy Policy
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
      `;
      elThirdPartyGrid.appendChild(card);
    });
  }

  // Render Children's Policy
  function renderChildrenPolicy(app) {
    if (!elChildrenPolicy) return;
    const minAge = app.minAge || 13;
    const dev = window.POLICY_CONFIG.developer;

    if (app.targetsChildren) {
      elChildrenPolicy.innerHTML = `
        <div class="callout-box warning">
          <h4>Family & Children Friendly Application</h4>
          <p>This application complies strictly with the Children's Online Privacy Protection Act (COPPA) and GDPR-K. We do not knowingly collect, transmit, or monetize personal identifiable information from children under the age of ${minAge}. All advertisements (if present) are certified family-safe and non-personalized.</p>
        </div>
      `;
    } else {
      elChildrenPolicy.innerHTML = `
        <p>Our services and this application are not directed to individuals under the age of <strong>${minAge}</strong>. We do not knowingly collect personal information from children under ${minAge}.</p>
        <p>If you are a parent or guardian and become aware that your child has provided us with personal information without parental consent, please contact us immediately at <a href="mailto:${dev.email}">${dev.email}</a>, and we will promptly delete such information from our records.</p>
      `;
    }
  }

  // Render Account / Retention Policy
  function renderAccountPolicy(app) {
    if (!elAccountPolicy) return;

    if (app.hasUserAccounts) {
      elAccountPolicy.innerHTML = `
        <p>This application allows you to create a user account to sync preferences, cloud content, and app states across devices. Your account credentials (email and hashed passwords) are securely handled.</p>
        <p>You have full authority to request complete deletion of your account and associated database records at any time directly through the app settings or via our contact email.</p>
      `;
    } else {
      elAccountPolicy.innerHTML = `
        <p>This application operates as an <strong>account-free service</strong>. You are not required to create a user profile, register with an email address, or provide passwords to use the core features of the app.</p>
        <p>App settings, session states, and cached assets reside strictly within your device's isolated application sandbox.</p>
      `;
    }
  }

  // Update Share URL in input box
  function updateShareUrl() {
    if (!shareUrlInput) return;
    const url = new URL(window.location.href);
    if (currentApp.id === 'general') {
      url.searchParams.delete('app');
    } else {
      url.searchParams.set('app', currentApp.id);
    }
    shareUrlInput.value = url.toString();
  }

  // Event Listeners
  function setupEventListeners() {
    // Dropdown change
    if (appSelector) {
      appSelector.addEventListener('change', function () {
        const selectedId = this.value;
        const config = window.POLICY_CONFIG;

        if (selectedId === 'general') {
          currentApp = config.generalPolicy;
        } else {
          currentApp = config.apps.find(a => a.id === selectedId) || config.generalPolicy;
        }

        // Update URL query without full page reload
        const newUrl = new URL(window.location.href);
        if (selectedId === 'general') {
          newUrl.searchParams.delete('app');
        } else {
          newUrl.searchParams.set('app', selectedId);
        }
        window.history.pushState({ appId: selectedId }, '', newUrl.toString());

        renderPolicy(currentApp);
        updateShareUrl();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Popstate handling (back/forward browser buttons)
    window.addEventListener('popstate', function () {
      loadAppFromUrl();
    });

    // Copy Link button
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener('click', function () {
        if (!shareUrlInput) return;
        shareUrlInput.select();
        navigator.clipboard.writeText(shareUrlInput.value).then(() => {
          showToast('Copied Policy URL to clipboard!');
        }).catch(() => {
          document.execCommand('copy');
          showToast('Copied Policy URL!');
        });
      });
    }

    // Print button
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        window.print();
      });
    }

    // Theme Toggle
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function () {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
      });
    }
  }

  // Toast notification
  function showToast(msg) {
    if (!copyToast) return;
    copyToast.textContent = msg;
    copyToast.classList.add('show');
    setTimeout(() => {
      copyToast.classList.remove('show');
    }, 2800);
  }

  // Theme management
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);
    updateThemeIcon(initialTheme);
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const isDark = theme === 'dark';
    themeToggleBtn.innerHTML = isDark
      ? `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
      : `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
  }

  // ScrollSpy for Table of Contents
  function setupScrollSpy() {
    const sections = document.querySelectorAll('.policy-section');
    if (sections.length === 0 || tocLinks.length === 0) return;

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 140;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });

      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // Utility to prevent XSS in text injection
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
