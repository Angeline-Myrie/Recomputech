<<<<<<< HEAD
// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    if (themeToggle) updateThemeIcon(savedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Search Box Animation
const searchBox = document.querySelector('.search-box input');
if (searchBox) {
    searchBox.addEventListener('focus', () => {
        searchBox.parentElement.classList.add('focused');
    });
    searchBox.addEventListener('blur', () => {
        searchBox.parentElement.classList.remove('focused');
    });
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-section form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert('¡Gracias por suscribirte! Te mantendremos informado.');
        newsletterForm.reset();
    });
}

// Contact Form Submission
const contactForm = document.querySelector('#contacto form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });
}

// Product Card Hover Effect
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Technician Rating Animation
document.querySelectorAll('.rating').forEach(rating => {
    const stars = rating.querySelectorAll('i');
    stars.forEach((star, index) => {
        star.style.animationDelay = `${index * 0.1}s`;
        star.classList.add('animate');
    });
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Intersection Observer for Fade-in Elements
const fadeElements = document.querySelectorAll('.fade-in');
if (fadeElements.length > 0) {
    const fadeOptions = { threshold: 0.5 };
    const fadeOnScroll = new IntersectionObserver((entries, fadeOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                fadeOnScroll.unobserve(entry.target);
            }
        });
    }, fadeOptions);
    fadeElements.forEach(element => {
        fadeOnScroll.observe(element);
    });
}

// Add to Cart Animation
function addToCartAnimation(button) {
    button.classList.add('adding');
    setTimeout(() => {
        button.classList.remove('adding');
        button.classList.add('added');
        setTimeout(() => {
            button.classList.remove('added');
        }, 2000);
    }, 1000);
}

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
if (tooltipTriggerList.length > 0 && window.bootstrap && window.bootstrap.Tooltip) {
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Statistics Counter
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.round(current) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    };
    updateCounter();
}

// Intersection Observer for Statistics
const statsSections = document.querySelectorAll('.stats-section');
if (statsSections.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsSections.forEach(section => {
        statsObserver.observe(section);
    });
}

// Animated stats counter
function animateStats() {
  const stats = document.querySelectorAll('.stat-animate');
  stats.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-target'));
    const isDecimal = stat.textContent.includes('.') || String(target).includes('.');
    let start = 0;
    let suffix = '';
    if (stat.textContent.includes('+')) suffix = '+';
    if (stat.textContent.includes('/')) suffix = '/5';
    const duration = 1500;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      let progress = Math.min(elapsed / duration, 1);
      let value = isDecimal ? (progress * target).toFixed(1) : Math.floor(progress * target);
      stat.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        stat.textContent = target + suffix;
      }
    }
    requestAnimationFrame(update);
  });
}

// Only animate once when stats section is visible
let statsAnimated = false;
function handleStatsAnimation() {
  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        animateStats();
        statsAnimated = true;
      }
    });
  }, { threshold: 0.4 });
  observer.observe(statsSection);
}

document.addEventListener('DOMContentLoaded', handleStatsAnimation);

// Initialize Swiper
const productSwiper = new Swiper('.product-slider', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        576: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        }
    }
});

// --- Productos de ejemplo ---
const products = [
  {
    id: 1,
    name: 'Refurbished Gaming Laptop',
    description: 'High-end refurbished gaming laptop with warranty.',
    price: 899.99,
    originalPrice: 1299.99,
    rating: 4.8,
    category: 'laptops',
    image: 'assets/images/gaming laptop.jpg',
  },
  {
    id: 2,
    name: 'Refurbished Gaming PC',
    description: 'High-performance gaming PC with premium components.',
    price: 1299.99,
    originalPrice: 1899.99,
    rating: 4.5,
    category: 'desktops',
    image: 'assets/images/gaming pc.jpg',
  },
  {
    id: 3,
    name: 'Refurbished Pro Tablet',
    description: 'Professional tablet with high-resolution display.',
    price: 499.99,
    originalPrice: 799.99,
    rating: 5.0,
    category: 'tablets',
    image: 'assets/images/pro tablet.jpg',
  },
  {
    id: 4,
    name: 'Refurbished Smartphone',
    description: 'Latest generation refurbished smartphone.',
    price: 699.99,
    originalPrice: 999.99,
    rating: 5.0,
    category: 'phones',
    image: 'assets/images/tablet.png',
  },
  {
    id: 5,
    name: 'Laptop Standard',
    description: 'Reliable refurbished laptop for everyday use.',
    price: 499.99,
    originalPrice: 799.99,
    rating: 4.2,
    category: 'laptops',
    image: 'assets/images/laptop.avif',
  },
  {
    id: 6,
    name: 'PC Standard',
    description: 'Affordable refurbished PC for home and office.',
    price: 399.99,
    originalPrice: 699.99,
    rating: 4.0,
    category: 'desktops',
    image: 'assets/images/pc.jpg',
  },
  {
    id: 7,
    name: 'Tablet Basic',
    description: 'Entry-level tablet for browsing and media.',
    price: 199.99,
    originalPrice: 399.99,
    rating: 4.1,
    category: 'tablets',
    image: 'assets/images/tablet.png',
  },
  {
    id: 8,
    name: 'Accessory Headphones',
    description: 'High-quality refurbished headphones.',
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.6,
    category: 'accessories',
    image: 'assets/images/logo-recomputech.png',
  },
  {
    id: 9,
    name: 'Accessory Mouse',
    description: 'Wireless mouse, refurbished and tested.',
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.3,
    category: 'accessories',
    image: 'assets/images/logo-recomputech.png',
  },
  {
    id: 10,
    name: 'Smartphone Basic',
    description: 'Affordable smartphone for daily tasks.',
    price: 299.99,
    originalPrice: 499.99,
    rating: 4.0,
    category: 'phones',
    image: 'assets/images/tablet.png',
  },
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'laptops', label: 'Laptops' },
  { key: 'desktops', label: 'PCs' },
  { key: 'phones', label: 'Smartphones' },
  { key: 'tablets', label: 'Tablets' },
  { key: 'accessories', label: 'Accessories' },
];

let currentCategory = 'all';
let currentPage = 0;
const PRODUCTS_PER_PAGE = 3;

function getFilteredProducts() {
  if (currentCategory === 'all') return products;
  return products.filter(p => p.category === currentCategory);
}

function renderProducts() {
  const container = document.getElementById('product-cards-container');
  const filtered = getFilteredProducts();
  const start = currentPage * PRODUCTS_PER_PAGE;
  let pageProducts = filtered.slice(start, start + PRODUCTS_PER_PAGE);
  if (pageProducts.length < PRODUCTS_PER_PAGE && filtered.length > 0) {
    // Si no hay suficientes, repetir desde el inicio
    pageProducts = pageProducts.concat(filtered.slice(0, PRODUCTS_PER_PAGE - pageProducts.length));
  }
  container.innerHTML = pageProducts.map(product => `
    <div class="swiper-slide">
      <div class="product-card product-card-img" data-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" class="img-fluid" style="max-height:160px;object-fit:contain;width:100%;background:#f7f7f7;border-radius:1rem;">
        </div>
        <div class="product-info">
          <h5>${product.name}</h5>
          <p class="product-description">${product.description}</p>
          <div class="product-price">
            <span class="price">$${product.price.toFixed(2)}</span>
            <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
          </div>
          <div class="product-rating">
            ${'<i class="fas fa-star text-warning"></i>'.repeat(Math.floor(product.rating))}
            ${product.rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt text-warning"></i>' : ''}
            <span>(${product.rating})</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  if (typeof productSwiper !== 'undefined' && productSwiper.update) {
    productSwiper.update();
    productSwiper.slideTo(0);
  }
}

function handleCategoryClick(e) {
  const btn = e.target.closest('button[data-filter]');
  if (!btn) return;
  document.querySelectorAll('.filter-categories button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentCategory = btn.getAttribute('data-filter');
  currentPage = 0;
  renderProducts();
}

function handleNext() {
  const filtered = getFilteredProducts();
  if (filtered.length <= PRODUCTS_PER_PAGE) return;
  currentPage = (currentPage + 1) % Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  renderProducts();
}

function handlePrev() {
  const filtered = getFilteredProducts();
  if (filtered.length <= PRODUCTS_PER_PAGE) return;
  currentPage = (currentPage - 1 + Math.ceil(filtered.length / PRODUCTS_PER_PAGE)) % Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  renderProducts();
}

function handleProductClick(e) {
  const card = e.target.closest('.product-card-img');
  if (!card) return;
  const id = card.getAttribute('data-id');
  const product = products.find(p => p.id == id);
  if (!product) return;
  showProductModal(product);
}

function showProductModal(product) {
  let modal = document.getElementById('product-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div style="background:#fff;padding:2rem 1.5rem;border-radius:1.2rem;max-width:400px;width:90%;position:relative;box-shadow:0 4px 24px rgba(0,0,0,0.12);">
      <button id="close-product-modal" style="position:absolute;top:0.5rem;right:0.5rem;background:none;border:none;font-size:1.5rem;">&times;</button>
      <img src="${product.image}" alt="${product.name}" style="width:100%;max-height:180px;object-fit:contain;background:#f7f7f7;border-radius:1rem;">
      <h3 style="margin-top:1rem;">${product.name}</h3>
      <p>${product.description}</p>
      <div style="font-weight:bold;font-size:1.2rem;">$${product.price.toFixed(2)} <span style="text-decoration:line-through;color:#888;font-size:1rem;">$${product.originalPrice.toFixed(2)}</span></div>
      <div style="margin-top:0.5rem;">Rating: ${product.rating} ⭐</div>
    </div>
  `;
  modal.onclick = (e) => {
    if (e.target === modal || e.target.id === 'close-product-modal') {
      modal.remove();
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  document.querySelector('.filter-categories').addEventListener('click', handleCategoryClick);
  document.getElementById('product-next-btn').addEventListener('click', handleNext);
  document.getElementById('product-prev-btn').addEventListener('click', handlePrev);
  document.getElementById('product-cards-container').addEventListener('click', handleProductClick);
});

document.addEventListener('DOMContentLoaded', function() {
  const sendIcon = document.getElementById('newsletter-send');
  if (sendIcon) {
    sendIcon.addEventListener('click', function() {
      alert('¡Suscripción exitosa!');
    });
  }
});
=======
// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    if (themeToggle) updateThemeIcon(savedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Search Box Animation
const searchBox = document.querySelector('.search-box input');
if (searchBox) {
    searchBox.addEventListener('focus', () => {
        searchBox.parentElement.classList.add('focused');
    });
    searchBox.addEventListener('blur', () => {
        searchBox.parentElement.classList.remove('focused');
    });
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-section form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert('¡Gracias por suscribirte! Te mantendremos informado.');
        newsletterForm.reset();
    });
}

// Contact Form Submission
const contactForm = document.querySelector('#contacto form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });
}

// Product Card Hover Effect
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Technician Rating Animation
document.querySelectorAll('.rating').forEach(rating => {
    const stars = rating.querySelectorAll('i');
    stars.forEach((star, index) => {
        star.style.animationDelay = `${index * 0.1}s`;
        star.classList.add('animate');
    });
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Intersection Observer for Fade-in Elements
const fadeElements = document.querySelectorAll('.fade-in');
if (fadeElements.length > 0) {
    const fadeOptions = { threshold: 0.5 };
    const fadeOnScroll = new IntersectionObserver((entries, fadeOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                fadeOnScroll.unobserve(entry.target);
            }
        });
    }, fadeOptions);
    fadeElements.forEach(element => {
        fadeOnScroll.observe(element);
    });
}

// Add to Cart Animation
function addToCartAnimation(button) {
    button.classList.add('adding');
    setTimeout(() => {
        button.classList.remove('adding');
        button.classList.add('added');
        setTimeout(() => {
            button.classList.remove('added');
        }, 2000);
    }, 1000);
}

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
if (tooltipTriggerList.length > 0 && window.bootstrap && window.bootstrap.Tooltip) {
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Statistics Counter
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.round(current) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    };
    updateCounter();
}

// Intersection Observer for Statistics
const statsSections = document.querySelectorAll('.stats-section');
if (statsSections.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsSections.forEach(section => {
        statsObserver.observe(section);
    });
}

// Animated stats counter
function animateStats() {
  const stats = document.querySelectorAll('.stat-animate');
  stats.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-target'));
    const isDecimal = stat.textContent.includes('.') || String(target).includes('.');
    let start = 0;
    let suffix = '';
    if (stat.textContent.includes('+')) suffix = '+';
    if (stat.textContent.includes('/')) suffix = '/5';
    const duration = 1500;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      let progress = Math.min(elapsed / duration, 1);
      let value = isDecimal ? (progress * target).toFixed(1) : Math.floor(progress * target);
      stat.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        stat.textContent = target + suffix;
      }
    }
    requestAnimationFrame(update);
  });
}

// Only animate once when stats section is visible
let statsAnimated = false;
function handleStatsAnimation() {
  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        animateStats();
        statsAnimated = true;
      }
    });
  }, { threshold: 0.4 });
  observer.observe(statsSection);
}

document.addEventListener('DOMContentLoaded', handleStatsAnimation);

// Initialize Swiper
const productSwiper = new Swiper('.product-slider', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        576: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        }
    }
});

// --- Productos de ejemplo ---
const products = [
  {
    id: 1,
    name: 'Refurbished Gaming Laptop',
    description: 'High-end refurbished gaming laptop with warranty.',
    price: 899.99,
    originalPrice: 1299.99,
    rating: 4.8,
    category: 'laptops',
    image: 'assets/images/gaming laptop.jpg',
  },
  {
    id: 2,
    name: 'Refurbished Gaming PC',
    description: 'High-performance gaming PC with premium components.',
    price: 1299.99,
    originalPrice: 1899.99,
    rating: 4.5,
    category: 'desktops',
    image: 'assets/images/gaming pc.jpg',
  },
  {
    id: 3,
    name: 'Refurbished Pro Tablet',
    description: 'Professional tablet with high-resolution display.',
    price: 499.99,
    originalPrice: 799.99,
    rating: 5.0,
    category: 'tablets',
    image: 'assets/images/pro tablet.jpg',
  },
  {
    id: 4,
    name: 'Refurbished Smartphone',
    description: 'Latest generation refurbished smartphone.',
    price: 699.99,
    originalPrice: 999.99,
    rating: 5.0,
    category: 'phones',
    image: 'assets/images/tablet.png',
  },
  {
    id: 5,
    name: 'Laptop Standard',
    description: 'Reliable refurbished laptop for everyday use.',
    price: 499.99,
    originalPrice: 799.99,
    rating: 4.2,
    category: 'laptops',
    image: 'assets/images/laptop.avif',
  },
  {
    id: 6,
    name: 'PC Standard',
    description: 'Affordable refurbished PC for home and office.',
    price: 399.99,
    originalPrice: 699.99,
    rating: 4.0,
    category: 'desktops',
    image: 'assets/images/pc.jpg',
  },
  {
    id: 7,
    name: 'Tablet Basic',
    description: 'Entry-level tablet for browsing and media.',
    price: 199.99,
    originalPrice: 399.99,
    rating: 4.1,
    category: 'tablets',
    image: 'assets/images/tablet.png',
  },
  {
    id: 8,
    name: 'Accessory Headphones',
    description: 'High-quality refurbished headphones.',
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.6,
    category: 'accessories',
    image: 'assets/images/logo-recomputech.png',
  },
  {
    id: 9,
    name: 'Accessory Mouse',
    description: 'Wireless mouse, refurbished and tested.',
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.3,
    category: 'accessories',
    image: 'assets/images/logo-recomputech.png',
  },
  {
    id: 10,
    name: 'Smartphone Basic',
    description: 'Affordable smartphone for daily tasks.',
    price: 299.99,
    originalPrice: 499.99,
    rating: 4.0,
    category: 'phones',
    image: 'assets/images/tablet.png',
  },
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'laptops', label: 'Laptops' },
  { key: 'desktops', label: 'PCs' },
  { key: 'phones', label: 'Smartphones' },
  { key: 'tablets', label: 'Tablets' },
  { key: 'accessories', label: 'Accessories' },
];

let currentCategory = 'all';
let currentPage = 0;
const PRODUCTS_PER_PAGE = 3;

function getFilteredProducts() {
  if (currentCategory === 'all') return products;
  return products.filter(p => p.category === currentCategory);
}

function renderProducts() {
  const container = document.getElementById('product-cards-container');
  const filtered = getFilteredProducts();
  const start = currentPage * PRODUCTS_PER_PAGE;
  let pageProducts = filtered.slice(start, start + PRODUCTS_PER_PAGE);
  if (pageProducts.length < PRODUCTS_PER_PAGE && filtered.length > 0) {
    // Si no hay suficientes, repetir desde el inicio
    pageProducts = pageProducts.concat(filtered.slice(0, PRODUCTS_PER_PAGE - pageProducts.length));
  }
  container.innerHTML = pageProducts.map(product => `
    <div class="swiper-slide">
      <div class="product-card product-card-img" data-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" class="img-fluid" style="max-height:160px;object-fit:contain;width:100%;background:#f7f7f7;border-radius:1rem;">
        </div>
        <div class="product-info">
          <h5>${product.name}</h5>
          <p class="product-description">${product.description}</p>
          <div class="product-price">
            <span class="price">$${product.price.toFixed(2)}</span>
            <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
          </div>
          <div class="product-rating">
            ${'<i class="fas fa-star text-warning"></i>'.repeat(Math.floor(product.rating))}
            ${product.rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt text-warning"></i>' : ''}
            <span>(${product.rating})</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  if (typeof productSwiper !== 'undefined' && productSwiper.update) {
    productSwiper.update();
    productSwiper.slideTo(0);
  }
}

function handleCategoryClick(e) {
  const btn = e.target.closest('button[data-filter]');
  if (!btn) return;
  document.querySelectorAll('.filter-categories button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentCategory = btn.getAttribute('data-filter');
  currentPage = 0;
  renderProducts();
}

function handleNext() {
  const filtered = getFilteredProducts();
  if (filtered.length <= PRODUCTS_PER_PAGE) return;
  currentPage = (currentPage + 1) % Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  renderProducts();
}

function handlePrev() {
  const filtered = getFilteredProducts();
  if (filtered.length <= PRODUCTS_PER_PAGE) return;
  currentPage = (currentPage - 1 + Math.ceil(filtered.length / PRODUCTS_PER_PAGE)) % Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  renderProducts();
}

function handleProductClick(e) {
  const card = e.target.closest('.product-card-img');
  if (!card) return;
  const id = card.getAttribute('data-id');
  const product = products.find(p => p.id == id);
  if (!product) return;
  showProductModal(product);
}

function showProductModal(product) {
  let modal = document.getElementById('product-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div style="background:#fff;padding:2rem 1.5rem;border-radius:1.2rem;max-width:400px;width:90%;position:relative;box-shadow:0 4px 24px rgba(0,0,0,0.12);">
      <button id="close-product-modal" style="position:absolute;top:0.5rem;right:0.5rem;background:none;border:none;font-size:1.5rem;">&times;</button>
      <img src="${product.image}" alt="${product.name}" style="width:100%;max-height:180px;object-fit:contain;background:#f7f7f7;border-radius:1rem;">
      <h3 style="margin-top:1rem;">${product.name}</h3>
      <p>${product.description}</p>
      <div style="font-weight:bold;font-size:1.2rem;">$${product.price.toFixed(2)} <span style="text-decoration:line-through;color:#888;font-size:1rem;">$${product.originalPrice.toFixed(2)}</span></div>
      <div style="margin-top:0.5rem;">Rating: ${product.rating} ⭐</div>
    </div>
  `;
  modal.onclick = (e) => {
    if (e.target === modal || e.target.id === 'close-product-modal') {
      modal.remove();
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  document.querySelector('.filter-categories').addEventListener('click', handleCategoryClick);
  document.getElementById('product-next-btn').addEventListener('click', handleNext);
  document.getElementById('product-prev-btn').addEventListener('click', handlePrev);
  document.getElementById('product-cards-container').addEventListener('click', handleProductClick);
});

document.addEventListener('DOMContentLoaded', function() {
  const sendIcon = document.getElementById('newsletter-send');
  if (sendIcon) {
    sendIcon.addEventListener('click', function() {
      alert('¡Suscripción exitosa!');
    });
  }
});
>>>>>>> 097daefb445ed062edae3034be82f68f5a076d1e
