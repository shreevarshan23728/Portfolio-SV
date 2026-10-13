/**
 * Shree Varshan P - Portfolio Interactions & Utilities
 * Features:
 * - Clean Light Theme by default (with Dark Mode toggle & storage)
 * - Mobile Navigation Drawer
 * - Smooth Scrolling with Header Offset
 * - ScrollSpy for Active Navigation
 * - Clipboard Copying with Toast Notifications
 * - Slide-over Placeholder Editing Guide
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initScrollSpy();
  initClipboardButtons();
  initSmoothScroll();
  initGuideDrawer();
});

/**
 * 1. Theme Management (Default: Clean Light Theme, with Dark Mode Option)
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('sv_portfolio_theme');

  // Default theme is 'light' as requested for the vibrant aesthetic on clean light background
  if (storedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('sv_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme} theme`);
    });
  }
}

/**
 * 2. Mobile Navigation Menu Toggle
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileMenuBtn || !mainNav) return;

  mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target) && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * 3. Copy to Clipboard Utility with Toast Notification
 */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn, .mini-copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied "${textToCopy}" to clipboard!`);
        giveButtonFeedback(btn);
      } catch (err) {
        fallbackCopyTextToClipboard(textToCopy);
        showToast(`Copied "${textToCopy}" to clipboard!`);
        giveButtonFeedback(btn);
      }
    });
  });

  function giveButtonFeedback(btn) {
    if (btn.classList.contains('mini-copy-btn')) {
      btn.style.color = 'var(--emerald)';
      setTimeout(() => {
        btn.style.color = '';
      }, 1800);
      return;
    }

    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.color = 'var(--emerald)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.color = '';
    }, 2000);
  }

  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  }
}

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/**
 * 4. Active Navigation Link on Scroll (ScrollSpy)
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavigation() {
    const scrollY = window.pageYOffset;
    const headerHeight = 90;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerHeight;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation, { passive: true });
}

/**
 * 5. Smooth Scroll Offset Handling for Fixed Header
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 78;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 6. Guide Drawer (Slide-over instructions for editing placeholders)
 */
function initGuideDrawer() {
  const guideBtn = document.getElementById('guideToggleBtn');
  const drawer = document.getElementById('guideDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('closeGuideBtn');

  if (!guideBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  guideBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}
