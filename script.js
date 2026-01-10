/* ============================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   Smooth Interactions & Animations
   ============================================ */

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in-up elements
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// ===== SMOOTH SCROLL BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 30, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 15, 30, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const activateNavLink = () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });
};

window.addEventListener('scroll', activateNavLink);

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !message) {
            alert('Please fill out all fields');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate network request
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// ===== EMAIL VALIDATION =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== PARALLAX EFFECT ON SCROLL =====
const heroImageContainer = document.querySelector('.hero-image-container');
if (heroImageContainer) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            heroImageContainer.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    });
}

// ===== HOVER EFFECT ON SKILL CARDS =====
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== HOVER EFFECT ON CERTIFICATE CARDS =====
const certificateCards = document.querySelectorAll('.certificate-card');
certificateCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.position = 'absolute';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== ADD RIPPLE ANIMATION KEYFRAMES =====
if (!document.querySelector('style[data-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple', 'true');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== REVEAL TEXT ON SCROLL =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementBottom = el.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom > 0) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run on page load

// ===== PREVENT FORM SUBMISSION ENTER KEY =====
const inputFields = document.querySelectorAll('input[type="text"], input[type="email"]');
inputFields.forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.id !== 'message') {
            e.preventDefault();
        }
    });
});

// ===== CERTIFICATE LINK HANDLING =====
document.querySelectorAll('.cert-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const certificateId = link.getAttribute('data-certificate');
        alert(`Certificate "${certificateId}" would open in a modal or new tab.\n\nUpdate the links with your actual certificate URLs.`);
    });
});

// ===== PERFORMANCE OPTIMIZATION: Debounce scroll events =====
let scrollTimeout;
const debounceScroll = (callback) => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(callback, 50);
};

// ===== DYNAMICALLY ADD FOCUS MANAGEMENT =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('tab-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('tab-navigation');
});

// ===== PRELOAD IMAGES =====
function preloadImages() {
    const imageList = ['assets/images/profile.png'];
    imageList.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

window.addEventListener('load', preloadImages);

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initial body opacity
document.body.style.opacity = '0.95';

// ===== ACCESSIBILITY: REDUCE MOTION SUPPORT =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none !important';
        el.style.transition = 'none !important';
    });
}

// ===== MOBILE TOUCH OPTIMIZATION =====
if ('ontouchstart' in window) {
    document.documentElement.classList.add('touch-device');
}

console.log('Portfolio website loaded successfully!');
