/* ==========================================================================
   HomeFur All — main.js
   --------------------------------------------------------------------------
   1. Mobile menu: hamburger toggle, close on link click, close on Escape.
   2. Forms: fake-submit handling (shows thank-you message).
   3. Filter pills: supports multiple pill rows combined (province + city).
   4. Global Intersection Observer for Scroll Animations
   5. Multi-Tile Hero Collage Transition
   6. Custom Searchable Combobox (Search + Dropdown for iOS & Mobile)
   7. Landing Page Featured Shelters Dropdown Filter
   ========================================================================== */

/* ---- 1. Mobile menu ---- */
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  // Toggle menu open/closed and lock page scroll
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-active');
    document.body.classList.toggle('nav-open');
  });

  // Close menu when a link inside it is tapped
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      document.body.classList.remove('nav-open');
    });
  });

  // Close menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      mainNav.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      document.body.classList.remove('nav-open');
    }
  });
}

/* ---- 2. Forms ---- */
document.querySelectorAll('form[data-form]').forEach(form => {
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    if (status) {
      status.hidden = false;
      status.textContent = form.dataset.success;
    }
  });
});

/* ---- 3. Filter pills ---- */
document.querySelectorAll('.filter-pills[data-target]').forEach(group => {
  const target = document.querySelector(group.dataset.target);
  const key = group.dataset.filterKey;

  group.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill');
    if (!pill) return;

    group.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p === pill));

    // If a specific city was picked, auto-select its province too
    if (key === 'city' && pill.dataset.filter !== 'all' && typeof cityToProvince !== 'undefined') {
      const province = cityToProvince[pill.dataset.filter];
      const provinceGroup = document.querySelector(`.filter-pills[data-filter-key="province"][data-target="${group.dataset.target}"]`);
      if (provinceGroup) {
        provinceGroup.querySelectorAll('.pill').forEach(p => {
          p.classList.toggle('active', p.dataset.filter === province);
        });
      }
    }

    // Reset city if province changes
    if (key === 'province' && typeof cityToProvince !== 'undefined') {
      const cityGroup = document.querySelector(`.filter-pills[data-filter-key="city"][data-target="${group.dataset.target}"]`);
      if (cityGroup) {
        const activeCityPill = cityGroup.querySelector('.pill.active');
        const activeCity = activeCityPill ? activeCityPill.dataset.filter : 'all';
        const cityStillValid = activeCity === 'all' || cityToProvince[activeCity] === pill.dataset.filter || pill.dataset.filter === 'all';

        if (!cityStillValid) {
          cityGroup.querySelectorAll('.pill').forEach(p => {
            p.classList.toggle('active', p.dataset.filter === 'all');
          });
        }
      }
    }

    if (target) applyFilters(target);
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

/* ---- 4. Global Intersection Observer for Scroll Animations ---- */
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

/* ---- 5. Multi-Tile Hero Collage Transition ---- */
document.addEventListener('DOMContentLoaded', () => {
  const slideshows = document.querySelectorAll('.hero-slideshow');
  if (!slideshows.length) return;

  const tileImagePools = [
    [
      'images/landing/dog-tilea.jpeg',
      'images/shelter/shelter-akf.jpeg',
      'images/shelter/shelter-angeles-office.jpg'
    ],
    [
      'images/shelter/shelter-paws.jpeg',
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

//* ---- 6. Custom Searchable Combobox (Text Search + Full Dropdown) ---- */
function setupSearchableComboboxes() {
  const inputs = document.querySelectorAll('input[list]');

  inputs.forEach(input => {
    const listId = input.getAttribute('list');
    const datalist = document.getElementById(listId);
    if (!datalist) return;

    // Turn off native browser autocomplete and remove list attribute to prevent double dropdown
    input.setAttribute('autocomplete', 'off');
    input.removeAttribute('list');

    // Wrap input inside container if not already wrapped
    let wrapper = input.closest('.select-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'select-wrapper';
      input.parentNode.insertBefore(wrapper, input);
      wrapper.appendChild(input);
    }

    // Create custom floating suggestions panel
    let listEl = wrapper.querySelector('.combobox-list');
    if (!listEl) {
      listEl = document.createElement('ul');
      listEl.className = 'combobox-list';
      listEl.hidden = true;
      wrapper.appendChild(listEl);
    }

    function renderOptions(filterText = '') {
      const options = Array.from(datalist.querySelectorAll('option'));
      const query = filterText.trim().toLowerCase();

      const filtered = options.filter(opt => {
        const val = (opt.value || opt.textContent).toLowerCase();
        return !query || val.includes(query);
      });

      if (!filtered.length) {
        listEl.hidden = true;
        return;
      }

      listEl.innerHTML = filtered.map(opt => {
        const val = opt.value || opt.textContent;
        return `<li class="combobox-item" data-value="${val}">${val}</li>`;
      }).join('');

      listEl.hidden = false;
    }

    // Open options list on click/focus
    input.addEventListener('focus', () => renderOptions(input.value));
    input.addEventListener('click', () => renderOptions(input.value));

    // Filter list while typing
    input.addEventListener('input', () => {
      renderOptions(input.value);
    });

    // Select an option
    listEl.addEventListener('click', (e) => {
      const item = e.target.closest('.combobox-item');
      if (!item) return;

      input.value = item.dataset.value;
      listEl.hidden = true;

      // Trigger change/input events for filtering scripts
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    // Close options list when tapping outside
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        listEl.hidden = true;
      }
    });
  });
}

/* ---- 7. Landing Page Featured Shelters Dropdown Filter ---- */
document.addEventListener('DOMContentLoaded', () => {
  const featuredGrid = document.getElementById('featured-shelter-grid');
  const provinceFilter = document.getElementById('landing-province-filter');

  if (!featuredGrid || typeof shelters === 'undefined' || !Array.isArray(shelters)) return;

  function renderFeaturedShelters() {
    const selectedProvince = provinceFilter ? provinceFilter.value : 'all';

    // 1. Filter shelters by selected province slug
    const filtered = shelters.filter(s => {
      return selectedProvince === 'all' || s.provinceSlug === selectedProvince;
    });

    // 2. Limit output to the first 3 cards
    const topThree = filtered.slice(0, 3);

    if (!topThree.length) {
      featuredGrid.innerHTML = '<p class="no-results">No shelters found for this province.</p>';
      return;
    }

    // 3. Render the top 3 cards
    featuredGrid.innerHTML = topThree.map(s => {
      const visitUrl = (s.contacts && s.contacts.socials !== 'N/A') ? s.contacts.socials : (s.maps !== 'N/A' ? s.maps : 'shelters.html');

      return `
        <article class="shelter-card" data-province="${s.provinceSlug}">
          <img src="${s.image}" alt="${s.name}">
          <div class="shelter-body">
            <h3>${s.name}</h3>
            <p class="shelter-loc">${s.city} · ${s.province}</p>
            <p>${s.description}</p>
            <div class="shelter-meta">
              <a href="${visitUrl}" class="link-arrow" target="_blank" rel="noopener">Visit shelter →</a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Initial load
  renderFeaturedShelters();

  // Listen for dropdown selection changes
  if (provinceFilter) {
    provinceFilter.addEventListener('change', renderFeaturedShelters);
  }
});