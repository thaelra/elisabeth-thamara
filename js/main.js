/**
 * =================================================================
 * MAIN APPLICATION CONTROLLER
 * Handles dynamic data rendering, animations, interactions,
 * filters, theme switching, sound effects, and modals.
 * =================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Populate data from portfolioData.js
  renderProfileData();
  renderExpertiseData();
  renderExperienceData();
  renderPortfolioProjects('all');
  initScrollAnimations();
  initTiltCard();
  initNavActiveTabObserver();
});

// Render Profile Header & Bio Data
function renderProfileData() {
  if (typeof portfolioData === 'undefined') return;
  const p = portfolioData.profile;

  document.getElementById('hero-name').textContent = p.name;
  document.getElementById('hero-tagline').textContent = p.tagline;
  document.getElementById('hero-edition-text').textContent = p.edition;
  document.getElementById('profile-bio-text').textContent = p.bio;
  document.getElementById('profile-location').textContent = p.location;
  document.getElementById('profile-status').textContent = p.status;
  document.getElementById('contact-email-text').textContent = p.email;
  document.getElementById('footer-name').textContent = p.name;

  // Render Quick Stats Counters
  const statsContainer = document.getElementById('stats-counter-container');
  if (statsContainer && p.quickStats) {
    statsContainer.innerHTML = p.quickStats.map(s => `
      <div class="stat-item-box">
        <div class="stat-number" data-count="${s.count}">${s.count}${s.suffix}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  }
}

// Render Expertise / Skills Cards & Progress Bars
function renderExpertiseData() {
  if (typeof portfolioData === 'undefined') return;
  const container = document.getElementById('expertise-container');
  if (!container) return;

  container.innerHTML = portfolioData.expertise.map(exp => `
    <div class="expertise-card">
      <div class="expertise-icon-wrapper">
        <i data-lucide="${exp.icon}"></i>
      </div>
      <h3 class="expertise-title">${exp.category}</h3>
      <p class="expertise-desc">${exp.description}</p>
      
      <div class="skills-list">
        ${exp.skills.map(sk => `
          <div class="skill-bar-item">
            <div class="skill-bar-info">
              <span>${sk.name}</span>
              <span>${sk.level}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" data-progress="${sk.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// Render Experience Timeline Entries
function renderExperienceData() {
  if (typeof portfolioData === 'undefined') return;
  const container = document.getElementById('experience-container');
  if (!container) return;

  container.innerHTML = portfolioData.experience.map(exp => `
    <div class="timeline-item">
      <div class="timeline-node">
        <i data-lucide="award"></i>
      </div>
      <div class="timeline-content-card">
        <div class="timeline-year">${exp.year} • <span style="text-transform: uppercase;">${exp.type}</span></div>
        <h3 class="timeline-role">${exp.title}</h3>
        <div class="timeline-org">${exp.organization}</div>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 0.8rem;">${exp.description}</p>
        <div class="project-tech-tags">
          ${exp.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// Render Portfolio Projects Cards Filtered by Field Category
function renderPortfolioProjects(filterCategory = 'all') {
  if (typeof portfolioData === 'undefined') return;
  const container = document.getElementById('portfolio-grid-container');
  if (!container) return;

  const filtered = filterCategory === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filterCategory);

  container.innerHTML = filtered.map(p => `
    <div class="project-card animate-scroll visible">
      <div class="project-img-wrapper">
        <img src="${p.image}" alt="${p.title}">
        <span class="project-badge-tag">${p.badge}</span>
      </div>
      <div class="project-card-body">
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.shortDesc}</p>
        <div class="project-tech-tags">
          ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-card-footer">
          <button class="btn-text-link" onclick="openProjectModal(${p.id})">
            Detail Project <i data-lucide="arrow-right"></i>
          </button>
          ${p.demoUrl && p.demoUrl !== '#' ? `
            <a href="${p.demoUrl}" target="_blank" class="btn-text-link" style="color: var(--text-muted);">
              <i data-lucide="external-link" style="width: 16px; height: 16px;"></i> Demo
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// Filter Portfolio Category Tab Trigger
function filterPortfolio(category, btnElement) {
  if (window.sounds) sounds.playClick();
  
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  renderPortfolioProjects(category);
}

// Modal Project Detail Viewer
function openProjectModal(projectId) {
  if (window.sounds) sounds.playClick();
  const p = portfolioData.projects.find(item => item.id === projectId);
  if (!p) return;

  document.getElementById('modal-project-title').textContent = p.title;
  document.getElementById('modal-project-badge').textContent = p.badge.toUpperCase();
  document.getElementById('modal-project-img').src = p.image;
  document.getElementById('modal-project-desc').textContent = p.fullDesc;

  const tagsContainer = document.getElementById('modal-project-tags');
  tagsContainer.innerHTML = p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');

  document.getElementById('modal-demo-link').href = p.demoUrl || '#';
  document.getElementById('modal-github-link').href = p.githubUrl || '#';

  const modal = document.getElementById('project-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  if (window.sounds) sounds.playClick();
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside box
document.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (e.target === modal) {
    closeProjectModal();
  }
});

// Scroll Animations (IntersectionObserver)
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger progress bars inside target
        const fills = entry.target.querySelectorAll('.progress-fill');
        fills.forEach(f => {
          f.style.width = f.getAttribute('data-progress');
        });
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => observer.observe(el));
}

// Interactive 3D Parallax Tilt Card on Hero
function initTiltCard() {
  const card = document.getElementById('hero-tilt-card');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = (y / rect.height) * -20;
    const rotY = (x / rect.width) * 20;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  });
}

// Observe Scroll for Active Navigation Links (Desktop & Mobile)
function initNavActiveTabObserver() {
  const sections = document.querySelectorAll('section[id]');
  const desktopTabs = document.querySelectorAll('.nav-tab');
  const mobileTabs = document.querySelectorAll('.mobile-nav-item');

  window.addEventListener('scroll', () => {
    let current = 'hero';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    desktopTabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.getAttribute('href') === `#${current}`) {
        tab.classList.add('active');
      }
    });

    mobileTabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.getAttribute('href') === `#${current}`) {
        tab.classList.add('active');
      }
    });
  });
}

// Toggle Theme System (Light / Dark)
function toggleThemeSystem() {
  if (window.sounds) sounds.playClick();
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.body.setAttribute('data-theme', newTheme);
  
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.setAttribute('data-lucide', newTheme === 'dark' ? 'sun' : 'moon');
    if (window.lucide) lucide.createIcons();
  }

  showToast(`Mode tema diubah ke ${newTheme.toUpperCase()}`, 'info');
}

// Audio System Toggle
function toggleAudioSystem() {
  if (window.sounds) {
    const enabled = sounds.toggle();
    const icon = document.getElementById('audio-icon');
    if (icon) {
      icon.setAttribute('data-lucide', enabled ? 'volume-2' : 'volume-x');
      if (window.lucide) lucide.createIcons();
    }
    showToast(enabled ? 'Efek Suara UI Diaktifkan' : 'Efek Suara UI Dimatikan', 'info');
  }
}

// Email Copy Helper
function copyEmailToClipboard() {
  if (window.sounds) sounds.playClick();
  const email = portfolioData.profile.email;
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Email ${email} telah disalin!`, 'success');
  }).catch(() => {
    showToast('Gagal menyalin email', 'error');
  });
}

// Contact Form Handler
function handleContactSubmit(event) {
  event.preventDefault();
  if (window.sounds) sounds.playClick();
  showToast('Terima kasih! Pesan Anda telah terkirim (Simulasi).', 'success');
  event.target.reset();
}

// Custom Toast System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: var(--bg-card);
    color: var(--text-main);
    padding: 0.85rem 1.4rem;
    border-radius: 14px;
    border: 1px solid var(--border-light);
    box-shadow: var(--shadow-lg);
    font-weight: 600;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    transition: all 0.3s ease;
    transform: translateX(100px);
    opacity: 0;
  `;

  toast.innerHTML = `
    <i data-lucide="${type === 'success' ? 'check-circle-2' : 'info'}" style="color: var(--bg-folder-tab);"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
    toast.style.opacity = '1';
  }, 10);

  setTimeout(() => {
    toast.style.transform = 'translateX(100px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
