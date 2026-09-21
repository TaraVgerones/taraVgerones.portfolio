const menuButton = document.querySelector('#menu-button');
const mobileMenu = document.querySelector('#mobile-menu');
const navbar = document.querySelector('#navbar');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('#mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const activeSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });

sections.forEach((section) => activeSectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// const featuredCarousel = document.querySelector('#featured-carousel');
// let carouselTimer;

// function moveCarousel(direction = 'next') {
//   const card = featuredCarousel.querySelector('.project-card');
//   const distance = card.getBoundingClientRect().width + 20;
//   const isAtEnd = featuredCarousel.scrollLeft + featuredCarousel.clientWidth >= featuredCarousel.scrollWidth - 24;
//   const isAtStart = featuredCarousel.scrollLeft <= 24;

//   if (direction === 'next' && isAtEnd) {
//     featuredCarousel.scrollTo({ left: 0, behavior: 'smooth' });
//   } else if (direction === 'prev' && isAtStart) {
//     featuredCarousel.scrollTo({ left: featuredCarousel.scrollWidth, behavior: 'smooth' });
//   } else {
//     featuredCarousel.scrollBy({
//       left: direction === 'next' ? distance : -distance,
//       behavior: 'smooth'
//     });
//   }
// }

// function startCarousel() {
//   if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
//   clearInterval(carouselTimer);
//   carouselTimer = setInterval(() => moveCarousel('next'), 2000);
// }

// function stopCarousel() {
//   clearInterval(carouselTimer);
// }

// document.querySelectorAll('[data-carousel]').forEach((button) => {
//   button.addEventListener('click', () => {
//     moveCarousel(button.dataset.direction);
//     startCarousel();
//   });
// });

// featuredCarousel.addEventListener('mouseenter', stopCarousel);
// featuredCarousel.addEventListener('mouseleave', startCarousel);
// featuredCarousel.addEventListener('focusin', stopCarousel);
// featuredCarousel.addEventListener('focusout', startCarousel);
// document.addEventListener('visibilitychange', () => {
//   document.hidden ? stopCarousel() : startCarousel();
// });

// startCarousel();

const filterButtons = [...document.querySelectorAll('.filter-pill')];
const workItems = [...document.querySelectorAll('.work-item')];

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;

      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });

    workItems.forEach((item) => {
      item.classList.toggle(
        'hidden-item',
        item.dataset.category !== selected
      );
    });
  });
});

filterButtons[0]?.click();