/*===== DROPDOWN MENU =====*/
function toggleDropdown(button) {
  // Close all dropdowns first
  const allDropdowns = document.querySelectorAll('.resume-dropdown-content');
  allDropdowns.forEach(dropdown => {
    dropdown.classList.remove('show');
  });
  
  // Toggle the clicked dropdown
  const dropdown = button.nextElementSibling;
  dropdown.classList.toggle('show');
}

// Close dropdowns when clicking outside
window.onclick = function(event) {
  if (!event.target.matches('.resume-btn') && !event.target.closest('.resume-btn')) {
    const dropdowns = document.querySelectorAll('.resume-dropdown-content');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('show');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav-menu');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
    });
  });

  // Active link on page load
  const setActiveLinkByPath = () => {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__menu a.nav__link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active-link', href === path || (path === 'index.html' && href === 'index.html'));
    });
  };

  // Active link on scroll
  const scrollActive = () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 58;
      const sectionId = section.getAttribute('id');
      const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
      if (link) {
        link.classList.toggle('active-link', scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
      }
    });
  };

  if (window.location.pathname.split('/').pop() === 'index.html' || window.location.pathname.split('/').pop() === '') {
    window.addEventListener('scroll', scrollActive);
  } else {
    setActiveLinkByPath();
  }

  // Header scroll effect
  window.addEventListener('scroll', () => {
    document.querySelector('.l-header').classList.toggle('scrolled', window.scrollY > 100);
  });

  // Parallax for hero orbs (performance-friendly)
  const orbs = document.querySelectorAll('.hero-orb');
  if (orbs.length) {
    const parallax = () => {
      const y = window.scrollY;
      orbs.forEach((orb, idx) => {
        const depth = 0.02 + idx * 0.015; // slight different speeds
        orb.style.transform = `translate3d(0, ${y * depth}px, 0)`;
      });
    };
    window.addEventListener('scroll', parallax, { passive: true });
    parallax();
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Immediately display all sections without animation to prevent transparency issues
  document.addEventListener('DOMContentLoaded', function() {
    // Force all sections to be visible immediately
    document.querySelectorAll('section, .section, #education, #experience, #skills, #projects, .projects-section, .project-card, .projects-grid, .skills__container').forEach(el => {
      el.style.visibility = 'visible';
      el.style.opacity = '1';
    });
    
    // Special handling for grid items
    document.querySelectorAll('#education .bd-grid > div, #experience .bd-grid > div').forEach(el => {
      el.style.visibility = 'visible';
      el.style.opacity = '1';
    });
    
    // Restore tech items to original style
    document.querySelectorAll('.tech-grid, .tech-item').forEach(el => {
      el.style.visibility = 'visible';
      el.style.opacity = '1';
      el.style.display = 'flex';
    });
    
    // Tech grid is now using CSS grid layout instead of Swiper
  });
  
  // Initialize ScrollReveal only for non-problematic elements
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '24px',
      duration: 800,
      delay: 0,
      easing: 'ease-out',
      cleanup: false,
      reset: false
    });
    
    // Only animate these safe elements
    sr.reveal('.home__data');
    sr.reveal('.home__social-icon', { interval: 80 });
    sr.reveal('.about__subtitle, .about__text');
    sr.reveal('.project-card', { origin: 'bottom', interval: 120 });
  }

  // Button ripple effect
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', e => {
      const rect = button.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - diameter / 2;
      const y = e.clientY - rect.top - diameter / 2;
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: ${diameter}px;
        height: ${diameter}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        pointer-events: none;
      `;
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Typing animation for title
  const titleElement = document.querySelector('.home__title-color');
  if (titleElement) {
    const text = titleElement.textContent;
    titleElement.textContent = '';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        titleElement.textContent += text[i];
        i++;
        setTimeout(type, 100);
      }
    };
    type();
  }

  // Update social media links (replace with your actual URLs)
  const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/jacem-ben-ahmed-b26903275/',  // Replace with your LinkedIn
    twitter: 'https://x.com/yourusername',  // Replace with your X/Twitter
    github: 'https://github.com/JacemBenAhmed'  // Replace with your GitHub
  };

  document.querySelectorAll('.home__social-icon, .footer__icon').forEach(link => {
    const icon = link.querySelector('i');
    if (icon.classList.contains('bxl-linkedin')) {
      link.href = socialLinks.linkedin;
      link.setAttribute('aria-label', 'LinkedIn Profile');
    } else if (icon.classList.contains('bxl-twitter')) {
      link.href = socialLinks.twitter;
      link.setAttribute('aria-label', 'Twitter Profile');
    } else if (icon.classList.contains('bxl-github')) {
      link.href = socialLinks.github;
      link.setAttribute('aria-label', 'GitHub Profile');
    }
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = `
  .ripple {
    animation: ripple 600ms linear;
  }
  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(style);