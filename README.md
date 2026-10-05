# HomeFur All

A directory website connecting local animal shelters in Angeles City, Mabalacat City, and surrounding regions with adopters, volunteers, and donors.

## Pages
- `index.html` — Landing page with dynamic hero photo slideshow and statistics
- `shelters.html` — Interactive shelter directory with location & contact overlays
- `adopt.html` — Searchable adoptable pet directory with shelter combo-box filtering
- `volunteer.html` — Volunteer sign-up and donation resource guide
- `partner.html` — Shelter partnership application form

## Built with
- **HTML5** & **CSS3** (Custom properties, CSS Grid/Flexbox, dynamic animations)
- **Vanilla JavaScript (ES6+)** — Client-side filtering, datalist auto-population, skeleton loaders, and IntersectionObserver scroll effects
- Fully static, responsive, and cross-platform (mobile & tablet optimized)

## Structure
```
css/
├── base.css          — Shared global styles (header, footer, buttons, design tokens, smooth scroll)
├── pages.css         — Hero section & landing page layouts
├── shelters-adopt.css      — Grid layouts, filter controls, skeleton loaders, & custom inputs
└── partner.css       — Partnership application styles
images/
├── adopt/            — Standardized pet showcase images (adopt#-name.jpeg)
├── landing/          — Hero collage and brand asset media
└── shelters/         — Partner shelter thumbnails
js/
├── main.js           — Global navigation, smooth scroll, & hero slideshow transitions
├── pets-list.js      — Pet data model, shelter filtering, pagination, & skeleton logic
├── shelters-list.js  — Shelter directory data, contact links, & skeleton loaders
└── forms.js          — Interactive forms handling
*.html
```

## Status
- [x] Landing Page
- [x] Shelter Directory Page
- [x] Adoptable Pets Directory Page
- [x] Volunteer & Donation Page
- [x] Shelter Partner Application Page
- [x] Responsive Cross-Platform Testing (Mobile & Tablet)
- [x] Visual Enhancements (Skeleton loaders & hero photo transitions)

## Team
Built by **Tan, Sean Handrea**; **Villanueva, Arwin Luigi**; **Zablan, Alsher Vinz** for **6INTROWEB**, Ma'am Raquel Rivera, 1st Semester.