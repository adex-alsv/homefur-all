/* ==========================================================================
   HomeFur All — main.js
   --------------------------------------------------------------------------
   1. Mobile menu: hamburger toggle, close on link click, close on Escape.
   2. Forms: fake-submit handling (no backend — shows a thank-you message).
   3. Filter pills: supports multiple pill rows combined (province + city).
   ========================================================================== */


/* ---- 1. Mobile menu ---- */
// Grab the hamburger button and the nav menu it controls
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

// Toggle the menu open/closed, animate the icon, and lock page scroll
navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-active');
    document.body.classList.toggle('nav-open');
});

// Close the menu automatically when a link inside it is tapped
mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        document.body.classList.remove('nav-open');
    });
});

// Close the menu when the Escape key is pressed (keyboard accessibility)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        document.body.classList.remove('nav-open');
    }
});

/* ---- 2. Forms ---- */
document.querySelectorAll('form[data-form]').forEach(form => {
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    status.hidden = false;
    status.textContent = form.dataset.success;
  });
});

/* ---- Filter pills (supports multiple pill rows combined, e.g. province + city) ---- */
document.querySelectorAll('.filter-pills[data-target]').forEach(group => {
  const target = document.querySelector(group.dataset.target);
  const key = group.dataset.filterKey; // e.g. "province" or "city"

  group.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill');
    if (!pill) return;

    group.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p === pill));

        // If a specific city was picked, auto-select its province too
    if (key === 'city' && pill.dataset.filter !== 'all') {
      const province = cityToProvince[pill.dataset.filter];
      const provinceGroup = document.querySelector(`.filter-pills[data-filter-key="province"][data-target="${group.dataset.target}"]`);
      provinceGroup.querySelectorAll('.pill').forEach(p => {
        p.classList.toggle('active', p.dataset.filter === province);
      });
    }

    // If a province was picked, reset the city pill back to "All cities"
    // unless the currently selected city already belongs to that province
    if (key === 'province') {
      const cityGroup = document.querySelector(`.filter-pills[data-filter-key="city"][data-target="${group.dataset.target}"]`);
      const activeCityPill = cityGroup.querySelector('.pill.active');
      const activeCity = activeCityPill ? activeCityPill.dataset.filter : 'all';
      const cityStillValid = activeCity === 'all' || cityToProvince[activeCity] === pill.dataset.filter || pill.dataset.filter === 'all';

      if (!cityStillValid) {
        cityGroup.querySelectorAll('.pill').forEach(p => {
          p.classList.toggle('active', p.dataset.filter === 'all');
        });
      }
    }

    applyFilters(target);
  });
});

function applyFilters(grid) {
  const activeFilters = {};
  document.querySelectorAll(`.filter-pills[data-target="#${grid.id}"]`).forEach(group => {
    const key = group.dataset.filterKey;
    const activePill = group.querySelector('.pill.active');
    activeFilters[key] = activePill ? activePill.dataset.filter : 'all';
  });

  grid.querySelectorAll('[data-province]').forEach(card => {
    const matchesProvince = activeFilters.province === 'all' || card.dataset.province === activeFilters.province;
    const matchesCity = activeFilters.city === 'all' || card.dataset.city === activeFilters.city;
    card.hidden = !(matchesProvince && matchesCity);
  });
}

/* Global Intersection Observer for Scroll Animations */
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});

/* ==========================================================================
   Multi-Tile Hero Collage Transition
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const slideshows = document.querySelectorAll('.hero-slideshow');
  if (!slideshows.length) return;

  // Image pools for each tile
  const tileImagePools = [
    [
      'images/landing/dog-tilea.jpeg',
      'images/shelter/shelter-akf.jpeg',
      'images/shelter/shelter-angeles-office.jpg'
    ],
    [
      'images/landing/cat-tileb.jpeg',
      'images/shelter/shelter-hound-haven.jpeg',
      'images/shelter/shelter-biyaya.jpeg'
    ],
    [
      'images/landing/dog-tilec.jpeg',
      'images/shelter/shelter-hows.jpg',
      'images/shelter/shelter-pawssion.jpeg'
    ]
  ];

  slideshows.forEach((slideshow, tileIndex) => {
    const slides = slideshow.querySelectorAll('.slide');
    if (slides.length < 2) return;

    const images = tileImagePools[tileIndex] || tileImagePools[0];
    let currentIndex = 0;

    // Stagger start time for each tile
    const intervalTime = 4000 + (tileIndex * 1200);

    setInterval(() => {
      const currentSlide = slides[0].classList.contains('active') ? slides[0] : slides[1];
      const nextSlide = currentSlide === slides[0] ? slides[1] : slides[0];

      currentIndex = (currentIndex + 1) % images.length;
      nextSlide.src = images[currentIndex];

      nextSlide.classList.add('active');
      currentSlide.classList.remove('active');
    }, intervalTime);
  });
});