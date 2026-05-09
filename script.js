/* ============================================
   ZONE 7 — Client-side JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Navbar ---
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile Menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- Intersection Observer for Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  revealElements.forEach(el => revealObserver.observe(el));

  // --- Form Validation & Submission ---
  const form = document.getElementById('reserveForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName');
      const phone = document.getElementById('formPhone');
      const date = document.getElementById('formDate');
      const guests = document.getElementById('formGuests');

      form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
      let hasError = false;

      if (!name.value.trim()) { name.closest('.form-group').classList.add('error'); hasError = true; }
      if (!phone.value.trim()) { phone.closest('.form-group').classList.add('error'); hasError = true; }
      if (!date.value) { date.closest('.form-group').classList.add('error'); hasError = true; }
      if (!guests.value) { guests.closest('.form-group').classList.add('error'); hasError = true; }

      if (hasError) return;

      const formWrap = document.querySelector('.reserve-form-wrap');
      formWrap.innerHTML = `
        <h2 class="section-heading">Find Your Table</h2>
        <div class="form-success" style="text-align: center; padding: 40px 0;">
          <h3 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 15px; color: var(--gold);">Reservation Received</h3>
          <p style="color: #444; margin-bottom: 20px;">Thank you, ${name.value.trim()}. We've received your request for ${guests.value} on ${date.value}.</p>
          <p style="color: var(--text-muted); font-size: 0.85rem;">We will contact you at ${phone.value.trim()} shortly to confirm your booking.</p>
        </div>
      `;
    });
  }

  // --- Set minimum date to today ---
  const dateInput = document.getElementById('formDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // --- Smooth scroll for nav links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Gallery Pause on Hover ---
  const galleryTrack = document.querySelector('.gallery-track');
  if (galleryTrack) {
    galleryTrack.addEventListener('mouseenter', () => {
      galleryTrack.style.animationPlayState = 'paused';
    });
    galleryTrack.addEventListener('mouseleave', () => {
      galleryTrack.style.animationPlayState = 'running';
    });
  }

});
