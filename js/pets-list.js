/* ==========================================================================
   HomeFur All — pets-list.js
   --------------------------------------------------------------------------
   Adopt page data & logic.
   ========================================================================== */

/* ---- 1. Pet data ---- */
class Pet {
  constructor(id, name, type, breed, age, shelterName, image) {
    this.id = id;
    this.name = name;
    this.type = type; // 'dog' or 'cat'
    this.breed = breed;
    this.age = age;
    this.shelterName = shelterName;
    this.image = image || 'https://placehold.co/400x400/2C4A3B/FAF5E8?text=Photo+Coming+Soon';
  }
}

const pets = [
    // Page 1
    new Pet(1, 'Mochi', 'dog', 'Golden Retrivier Aspin Mix', '2 yrs', 'The Pawject', 'images/landing/adopt1-mochi.jpeg'),
    new Pet(2, 'Ube', 'cat', 'Puspin', '1 yr', 'Noah\'s Ark Dog and Cat Shelter', 'images/landing/adopt2-ube.jpeg'),
    new Pet(3, 'Biscuit', 'dog', 'Shih Tzu Mix', '5 yrs', 'PAWS Animal Rehabilitation Center', 'images/landing/adopt3-biscuit.jpeg'),
    new Pet(4, 'Luna', 'cat', 'Puspin', '8 mos', 'LYKA\'s Dog and Cat Shelter', 'images/landing/adopt4-luna.jpeg'),
    new Pet(5, 'Dani', 'dog', 'Aspin', '1.5 yrs', 'The Pawject', 'images/adopt/adopt5-dani.jpeg'),
    new Pet(6, 'Hanni', 'cat', 'Puspin', '2 yrs', 'LYKA\'s Dog and Cat Shelter', 'images/adopt/adopt6-hanni.jpeg'),
    new Pet(7, 'Myanni', 'dog', 'Aspin', '3 yrs', 'Noah\'s Ark Dog and Cat Shelter', 'images/adopt/adopt7-myanni.jpeg'),
    new Pet(8, 'Kloi', 'cat', 'Sphynx Puspin Mix', '6 mos', 'The Home of Well-Loved Strays', 'images/adopt/adopt8-kloi.jpeg'),

    // Page 2
    new Pet(9, 'Hiroshi', 'cat', 'Lynx Siamese Mix', '2 yrs', 'The Pawject', 'images/adopt/adopt9-hiro.jpeg'),
    new Pet(10, 'Max', 'dog', 'Pomeranian', '1 yr', 'PAWSsion Project', 'images/adopt/adopt10-max.jpeg'),
    new Pet(11, 'Jiro', 'dog', 'Hound Mix', '6 yrs', 'Hound Haven PH Inc.', 'images/adopt/adopt11-jiro.jpeg'),
    new Pet(12, 'Sarrih', 'cat', 'Puspin', '2 yrs', 'Animal Rescue PH', 'images/adopt/adopt12-sarrih.jpeg'),
    new Pet(13, 'Bruno', 'dog', 'Aspin', '1 yr', 'Quezon City Animal Care and Adoption Center (Government Office)', 'images/adopt/adopt13-bruno.jpeg'),
    new Pet(14, 'Nala', 'cat', 'Puspin', '3 yrs', 'PAWS Animal Rehabilitation Center', 'images/adopt/adopt14-nala.jpeg'),
    new Pet(15, 'Rocky', 'dog', 'Aspin Mix', '2 yrs', 'Panotxa Kayumanggi OPC (Biyaya Animal Care)', 'images/adopt/adopt15-rocky.jpeg'),
    new Pet(16, 'Matcha', 'cat', 'Puspin', '5 mos', 'PAWS Animal Rehabilitation Center', 'images/adopt/adopt16-matcha.jpeg'),

    // Page 3
    new Pet(17, 'Oreo', 'dog', 'Aspin', '3.5 yrs', 'The Pawject', 'images/adopt/adopt17-oreo.jpeg'),
    new Pet(18, 'Felix', 'cat', 'Puspin', '4 yrs', 'LYKA\'s Dog and Cat Shelter', 'images/adopt/adopt18-felix.jpeg'),
    new Pet(19, 'Buster', 'dog', 'Aspin', '1 yr', 'Noah\'s Ark Dog and Cat Shelter', 'images/adopt/adopt19-buster.jpeg'),
    new Pet(20, 'Tofu', 'cat', 'Puspin', '7 mos', 'The Home of Well-Loved Strays', 'images/adopt/adopt20-tofu.jpeg'),
    new Pet(21, 'Bear', 'dog', 'German Shepherd Mix', '8 yrs', 'Hound Haven PH Inc.', 'images/adopt/adopt21-bear.jpeg'),
    new Pet(22, 'Garfield', 'cat', 'Puspin', '2 yrs', 'PAWS Animal Rehabilitation Center', 'images/adopt/adopt22-garfield.jpeg'),
    new Pet(23, 'Copper', 'dog', 'Aspin', '2 yrs', 'Animal Kingdom Foundation Inc.', 'images/adopt/adopt23-copper.jpeg'),
    new Pet(24, 'Hazel', 'cat', 'Puspin', '1.5 yrs', 'PAWS Animal Rehabilitation Center', 'images/adopt/adopt24-hazel.jpeg'),

    // Page 4
    new Pet(25, 'Duke', 'dog', 'Aspin', '5 yrs', 'PAWSsion Project', 'images/adopt/adopt25-duke.jpeg'),
    new Pet(26, 'Shadow', 'cat', 'Puspin', '3 yrs', 'PAWS Animal Rehabilitation Center', 'images/adopt/adopt26-shadow.jpeg'),
    new Pet(27, 'Ziggy', 'dog', 'Aspin', '9 mos', 'Animal Rescue PH', 'images/adopt/adopt27-ziggy.jpeg'),
    new Pet(28, 'Mocha', 'cat', 'Puspin', '1 yr', 'The Home of Well-Loved Strays', 'images/adopt/adopt28-mocha.jpeg'),
    new Pet(29, 'Lucky', 'dog', 'Aspin', '2.5 yrs', 'Quezon City Animal Care and Adoption Center (Government Office)', 'images/adopt/adopt29-lucky.jpeg'),
    new Pet(30, 'Kiwi', 'cat', 'Puspin', '4 mos', 'The Pawject', 'images/adopt/adopt30-kiwi.jpeg'),
    new Pet(31, 'Jax', 'dog', 'Aspin Mix', '3 yrs', 'Panotxa Kayumanggi OPC (Biyaya Animal Care)', 'images/adopt/adopt31-jax.jpeg'),
    new Pet(32, 'Penelope', 'cat', 'Puspin', '2 yrs', 'PAWS Animal Rehabilitation Center', 'images/adopt/adopt32-penelope.jpeg')
];

/* ---- Helper to find shelter across variations ---- */
function findMatchingShelter(petShelterName) {
  if (typeof shelters === 'undefined' || !Array.isArray(shelters)) return null;
  
  const target = petShelterName.toLowerCase().trim();
  
  return shelters.find(s => {
    const name = s.name.toLowerCase();
    return (name.includes('noah') && target.includes('noah')) ||
           name.includes(target) || 
           target.includes(name);
  });
}

/* ---- 2. Card rendering ---- */
function renderPetCard(pet) {
  const shelter = findMatchingShelter(pet.shelterName);

  let contactLinksHtml = '';
  let mapLink = '#';

  if (shelter) {
    if (shelter.contacts) {
      const c = shelter.contacts;
      let links = [];

      if (c.contactNo && c.contactNo !== 'N/A') {
        const cleanNo = c.contactNo.replace(/[^\d+]/g, '');
        links.push(`Call: <a href="tel:${cleanNo}">${c.contactNo}</a>`);
      }
      if (c.email && c.email !== 'N/A') {
        links.push(`<a href="mailto:${c.email}">Email Shelter ↗</a>`);
      }
      if (c.socials && c.socials !== 'N/A') {
        links.push(`<a href="${c.socials}" target="_blank" rel="noopener">Facebook Page ↗</a>`);
      }
      if (c.website && c.website !== 'N/A') {
        const webUrl = c.website.startsWith('http') ? c.website : `https://${c.website}`;
        links.push(`<a href="${webUrl}" target="_blank" rel="noopener">Official Website ↗</a>`);
      }

      contactLinksHtml = links.length ? links.join(' · ') : 'Contact shelter for adoption details';
    }

    if (shelter.maps && shelter.maps !== 'N/A') {
      mapLink = shelter.maps;
    }
  } else {
    contactLinksHtml = 'Contact shelter for adoption details';
  }

  const typeIcon = pet.type === 'dog' ? 'images/icon-dog.png' : 'images/icon-cat.png';
  const typeLabel = pet.type === 'dog' ? 'Dog' : 'Cat';

  return `
    <article class="pet-card">
      <div class="pet-card-image-wrap">
        <img src="${pet.image}" alt="${pet.name}">
        <div class="pet-card-hover-overlay">
          <span class="pet-badge">
            <img src="${typeIcon}" alt="" class="badge-icon" width="14" height="14">
            ${typeLabel}
          </span>
          <div class="hover-details">
            <p class="shelter-info"><strong>Shelter:</strong> ${pet.shelterName}</p>
            <p class="contact-info">${contactLinksHtml}</p>
            ${mapLink !== '#' ? `<a href="${mapLink}" target="_blank" rel="noopener" class="pet-map-link">View Location →</a>` : ''}
          </div>
        </div>
      </div>
      <div class="pet-body">
        <h3>${pet.name}</h3>
        <p>${pet.age} · ${pet.breed} · ${pet.shelterName}</p>
      </div>
    </article>
  `;
}

/* ---- 3. Filtering + pagination ---- */
const PETS_PAGE_SIZE = 8;
let currentPetPage = 1;

const petGrid = document.getElementById('pet-grid');
const petFilterGroup = document.querySelector('.filter-pills[data-filter-key="type"]');
const petShelterInput = document.getElementById('pet-shelter-filter');
const petShelterDatalist = document.getElementById('pet-shelters-datalist');
const petPagerPrev = document.getElementById('pager-prev');
const petPagerNext = document.getElementById('pager-next');
const petPagerStatus = document.getElementById('pager-status');

/* Populate Shelter Datalist dynamically */
function populatePetShelterDatalist() {
  if (!petShelterDatalist) return;
  
  // Extract unique shelter names from pets array
  const uniqueShelters = [...new Set(pets.map(p => p.shelterName))].sort();
  
  uniqueShelters.forEach(shelterName => {
    const option = document.createElement('option');
    option.value = shelterName;
    petShelterDatalist.appendChild(option);
  });
}

function getActiveType() {
  if (!petFilterGroup) return 'all';
  const activePill = petFilterGroup.querySelector('.pill.active');
  return activePill ? activePill.dataset.filter : 'all';
}

function getFilteredPets() {
  const type = getActiveType();
  const shelterQuery = petShelterInput ? petShelterInput.value.trim().toLowerCase() : '';

  return pets.filter(p => {
    const matchesType = (type === 'all' || p.type === type);
    const matchesShelter = (!shelterQuery || shelterQuery === 'all shelters' || p.shelterName.toLowerCase().includes(shelterQuery));
    return matchesType && matchesShelter;
  });
}

/* Render temporary skeleton cards while loading */
function renderSkeletons(count = 8) {
  if (!petGrid) return;
  
  const skeletonCard = `
    <article class="pet-card skeleton-card">
      <div class="pet-card-image-wrap skeleton-box"></div>
      <div class="pet-body">
        <div class="skeleton-box skeleton-text title"></div>
        <div class="skeleton-box skeleton-text"></div>
        <div class="skeleton-box skeleton-text short"></div>
      </div>
    </article>
  `;

  petGrid.innerHTML = Array(count).fill(skeletonCard).join('');
}

function renderPetPage() {
  if (!petGrid) return;

  // Show skeletons immediately
  renderSkeletons(PETS_PAGE_SIZE);

  // Render actual cards after a short transition frame
  setTimeout(() => {
    const filtered = getFilteredPets();
    const totalPages = Math.max(1, Math.ceil(filtered.length / PETS_PAGE_SIZE));
    currentPetPage = Math.min(currentPetPage, totalPages);

    const start = (currentPetPage - 1) * PETS_PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PETS_PAGE_SIZE);

    petGrid.innerHTML = pageItems.length
      ? pageItems.map(renderPetCard).join('')
      : '<p class="no-results">No pets match this shelter or category right now.</p>';

    if (petPagerStatus) petPagerStatus.textContent = `Page ${currentPetPage} of ${totalPages}`;
    if (petPagerPrev) petPagerPrev.disabled = currentPetPage === 1;
    if (petPagerNext) petPagerNext.disabled = currentPetPage === totalPages;
  }, 200);
}

/* Event listeners */
if (petPagerPrev) {
  petPagerPrev.addEventListener('click', () => {
    if (currentPetPage > 1) {
      currentPetPage--;
      renderPetPage();
    }
  });
}

if (petPagerNext) {
  petPagerNext.addEventListener('click', () => {
    const totalPages = Math.ceil(getFilteredPets().length / PETS_PAGE_SIZE);
    if (currentPetPage < totalPages) {
      currentPetPage++;
      renderPetPage();
    }
  });
}

if (petFilterGroup) {
  petFilterGroup.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill');
    if (!pill) return;

    petFilterGroup.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p === pill));
    currentPetPage = 1;
    renderPetPage();
  });
}

if (petShelterInput) {
  petShelterInput.addEventListener('input', () => {
    currentPetPage = 1;
    renderPetPage();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populatePetShelterDatalist();
  renderPetPage();
});