// Contato real da empresa. Atualize também os href de fallback no HTML ao trocar o número.
const WHATSAPP_NUMBER = '5541996138842';
const WHATSAPP_MESSAGE = 'Olá! Gostaria de solicitar um orçamento para serviços elétricos.';
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  const message = link.dataset.whatsappMessage || WHATSAPP_MESSAGE;
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message).replace(/!/g, '%21')}`;
});

const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.navigation');
const mobile = matchMedia('(max-width: 850px)');
function closeMenu(returnFocus = false) {
  menu.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const opening = toggle.getAttribute('aria-expanded') !== 'true';
  if (!opening) { closeMenu(); return; }
  menu.classList.add('is-open');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Fechar menu');
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner')) closeMenu();
});
// Selecting Serviços navigates to its section and closes the mobile panel.
menu.querySelectorAll('[data-menu-item]').forEach(item => item.addEventListener('click', () => closeMenu(mobile.matches)));
mobile.addEventListener('change', () => closeMenu());

const scene = document.querySelector('.scene');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
function resetScene() {
  scene.style.removeProperty('--scene-x');
  scene.style.removeProperty('--scene-y');
}
document.querySelector('.hero').addEventListener('pointermove', event => {
  if (mobile.matches || !finePointer.matches || reduced.matches) return;
  scene.style.setProperty('--scene-x', `${((event.clientX / innerWidth - .5) * 8).toFixed(2)}px`);
  scene.style.setProperty('--scene-y', `${((event.clientY / innerHeight - .5) * 6).toFixed(2)}px`);
}, { passive: true });
document.querySelector('.hero').addEventListener('pointerleave', resetScene);
reduced.addEventListener('change', resetScene);
mobile.addEventListener('change', resetScene);

// Once-only scroll entrance. No hidden baseline: JS failure never hides content.
if ('IntersectionObserver' in window) {
  const servicesObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!reduced.matches) {
        entry.target.classList.add('service-enter');
        entry.target.addEventListener('animationend', () => entry.target.classList.remove('service-enter'), { once: true });
      }
      servicesObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-service-reveal]').forEach(element => servicesObserver.observe(element));
}

// Gallery is progressive: without JS each thumbnail opens its original file.
const galleryLinks = [...document.querySelectorAll('[data-gallery-photo]')];
const galleryDialog = document.querySelector('.gallery-dialog');
const galleryImage = galleryDialog.querySelector('.gallery-full-image');
const galleryCounter = galleryDialog.querySelector('.gallery-counter');
let galleryIndex = 0;
let galleryOrigin = null;
let galleryScroll = { x: 0, y: 0 };
function showGalleryPhoto(index) {
  galleryIndex = (index + galleryLinks.length) % galleryLinks.length;
  const thumbnail = galleryLinks[galleryIndex].querySelector('img');
  galleryImage.src = galleryLinks[galleryIndex].getAttribute('href');
  galleryImage.alt = thumbnail.alt;
  galleryCounter.textContent = `${galleryIndex + 1} de ${galleryLinks.length}`;
}
if (typeof galleryDialog.showModal === 'function') {
  galleryLinks.forEach((link, index) => link.addEventListener('click', event => {
    event.preventDefault();
    galleryOrigin = link;
    galleryScroll = { x: scrollX, y: scrollY };
    showGalleryPhoto(index);
    galleryDialog.showModal();
    document.documentElement.classList.add('gallery-modal-open');
    galleryDialog.querySelector('.gallery-close').focus();
  }));
  galleryDialog.querySelector('.gallery-close').addEventListener('click', () => galleryDialog.close());
  galleryDialog.querySelector('.gallery-previous').addEventListener('click', () => showGalleryPhoto(galleryIndex - 1));
  galleryDialog.querySelector('.gallery-next').addEventListener('click', () => showGalleryPhoto(galleryIndex + 1));
  galleryDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showGalleryPhoto(galleryIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    }
    // Explicit wrapping complements the native modal's inert background.
    if (event.key === 'Tab') {
      const controls = [...galleryDialog.querySelectorAll('button')];
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    // Escape is handled by native dialog cancellation.
  });
  galleryDialog.addEventListener('close', () => {
    document.documentElement.classList.remove('gallery-modal-open');
    window.scrollTo(galleryScroll.x, galleryScroll.y);
    galleryOrigin?.focus({ preventScroll: true });
  });
}
if ('IntersectionObserver' in window) {
  const galleryObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!reduced.matches) {
        entry.target.classList.add('gallery-enter');
        entry.target.addEventListener('animationend', () => entry.target.classList.remove('gallery-enter'), { once: true });
      }
      galleryObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  galleryLinks.forEach(link => galleryObserver.observe(link));
}

// Manual review carousel: one/two cards, clamped offsets, no empty final page.
const reviewsCarousel = document.querySelector('.reviews-carousel');
const reviewsTrack = reviewsCarousel.querySelector('.reviews-track');
const reviewCards = [...reviewsTrack.children];
const reviewsPrevious = reviewsCarousel.querySelector('.reviews-previous');
const reviewsNext = reviewsCarousel.querySelector('.reviews-next');
const reviewsIndicators = reviewsCarousel.querySelector('.reviews-indicators');
const reviewsStatus = reviewsCarousel.querySelector('.reviews-status');
let reviewIndex = 0;
let reviewVisible = mobile.matches ? 1 : 2;
function updateReviews() {
  reviewIndex = Math.max(0, Math.min(reviewIndex, reviewCards.length - reviewVisible));
  const gap = parseFloat(getComputedStyle(reviewsTrack).gap) || 0;
  const step = reviewCards[0].getBoundingClientRect().width + gap;
  reviewsTrack.style.transform = `translateX(${-reviewIndex * step}px)`;
  reviewCards.forEach((card, index) => {
    const visible = index >= reviewIndex && index < reviewIndex + reviewVisible;
    card.inert = !visible;
    card.setAttribute('aria-hidden', String(!visible));
  });
  reviewsPrevious.disabled = reviewIndex === 0;
  reviewsNext.disabled = reviewIndex === reviewCards.length - reviewVisible;
  [...reviewsIndicators.children].forEach((button, index) => button.setAttribute('aria-current', String(index === reviewIndex)));
  reviewsStatus.textContent = reviewVisible === 1
    ? `Avaliação ${reviewIndex + 1} de ${reviewCards.length}`
    : `Avaliações ${reviewIndex + 1} e ${reviewIndex + 2} de ${reviewCards.length}`;
}
function rebuildReviewIndicators() {
  const oldFocus = document.activeElement;
  const focusedIndicator = [...reviewsIndicators.children].indexOf(oldFocus);
  reviewsIndicators.replaceChildren();
  for (let index = 0; index <= reviewCards.length - reviewVisible; index++) {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Mostrar avaliação ${index + 1}${reviewVisible === 2 ? ` e ${index + 2}` : ''}`);
    button.addEventListener('click', () => { reviewIndex = index; updateReviews(); });
    reviewsIndicators.append(button);
  }
  updateReviews();
  if (focusedIndicator >= 0) reviewsIndicators.children[Math.min(focusedIndicator, reviewsIndicators.children.length - 1)].focus();
}
reviewsCarousel.classList.add('is-enhanced');
reviewsCarousel.querySelector('.reviews-controls').hidden = false;
reviewsPrevious.addEventListener('click', () => { reviewIndex--; updateReviews(); });
reviewsNext.addEventListener('click', () => { reviewIndex++; updateReviews(); });
reviewsCarousel.querySelector('.reviews-controls').addEventListener('keydown', event => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  reviewIndex += event.key === 'ArrowLeft' ? -1 : 1;
  updateReviews();
});
// Horizontal swipe only; vertical scrolling remains native.
let reviewTouch = null;
const reviewViewport = reviewsCarousel.querySelector('.reviews-viewport');
reviewViewport.addEventListener('touchstart', event => {
  reviewTouch = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
}, { passive: true });
reviewViewport.addEventListener('touchend', event => {
  if (!reviewTouch || !event.changedTouches.length) return;
  const dx = event.changedTouches[0].clientX - reviewTouch.x;
  const dy = event.changedTouches[0].clientY - reviewTouch.y;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
    reviewIndex += dx < 0 ? 1 : -1;
    updateReviews();
  }
  reviewTouch = null;
}, { passive: true });
reviewViewport.addEventListener('touchcancel', () => { reviewTouch = null; }, { passive: true });
mobile.addEventListener('change', () => {
  reviewVisible = mobile.matches ? 1 : 2;
  rebuildReviewIndicators();
});
window.addEventListener('resize', updateReviews, { passive: true });
rebuildReviewIndicators();
if ('IntersectionObserver' in window) {
  const reviewsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!reduced.matches) {
        entry.target.classList.add('testimonials-enter');
        entry.target.addEventListener('animationend', () => entry.target.classList.remove('testimonials-enter'), { once: true });
      }
      reviewsObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  reviewsObserver.observe(document.querySelector('.testimonials-inner'));
}

// Once-only entrance of heading/list; the interactive map is never animated.
if ('IntersectionObserver' in window) {
  const regionsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!reduced.matches) {
        entry.target.classList.add('regions-enter');
        entry.target.addEventListener('animationend', () => entry.target.classList.remove('regions-enter'), { once: true });
      }
      regionsObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.regions-heading, .regions-details').forEach(element => regionsObserver.observe(element));
}
