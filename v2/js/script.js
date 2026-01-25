// ========================================
// Marine Explore - Main JavaScript
// ========================================

/* ===== LOADING SCREEN ===== */
const loadingScreen = document.getElementById('loadingScreen');

// Hide loading screen when page is fully loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.remove();
            }, 800);
        }
    }, 2000); // Show for at least 2 seconds
});

/* ===== END LOADING SCREEN ===== */

/* ===== CUSTOM CURSOR ===== */
const customCursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');

// Check if device supports hover (not a touch device)
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice && customCursor && cursorDot) {
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // Cursor hover effects for clickable elements
    document.addEventListener('DOMContentLoaded', () => {
        const hoverElements = document.querySelectorAll('a, button, .btn, .card, .nav-menu li');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                customCursor.style.transform = 'translate(-50%, -50%) scale(1.4)';
                customCursor.style.borderColor = 'var(--accent-teal)';
                customCursor.style.borderWidth = '2.5px';
                customCursor.style.background = 'rgba(0, 180, 216, 0.15)';
                customCursor.style.boxShadow = '0 0 20px rgba(0, 180, 216, 0.3)';

                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.2)';
                cursorDot.style.background = 'var(--light-blue)';
                cursorDot.style.boxShadow = '0 0 12px rgba(72, 202, 228, 1)';
            });

            el.addEventListener('mouseleave', () => {
                customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
                customCursor.style.borderColor = 'var(--light-blue)';
                customCursor.style.borderWidth = '2px';
                customCursor.style.background = 'rgba(72, 202, 228, 0.05)';
                customCursor.style.boxShadow = 'none';

                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.background = 'var(--accent-teal)';
                cursorDot.style.boxShadow = '0 0 8px rgba(0, 180, 216, 0.8)';
            });
        });
    });
} else {
    // Hide custom cursor on touch devices
    if (customCursor) customCursor.style.display = 'none';
    if (cursorDot) cursorDot.style.display = 'none';
    document.body.style.cursor = 'auto';
}

/* ===== END CUSTOM CURSOR ===== */

/* ===== SITE INITIALIZATION (Intro Video Removed) ===== */
const fullpageVideoContainer = document.getElementById('fullpageVideo');
let introComplete = true; // Site loads directly without intro

// Initialize site - show main content immediately
function initializeSite() {
    // Start fullpage video immediately
    if (fullpageVideoContainer) {
        const fullpageVideo = fullpageVideoContainer.querySelector('video');
        if (fullpageVideo) {
            fullpageVideo.play().catch(e => console.log('Background video autoplay prevented:', e));
        }
        fullpageVideoContainer.classList.add('show');
        fullpageVideoContainer.style.opacity = '1';
    }

    // Show navbar immediately
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.add('show');
        navbar.style.opacity = '1';
    }

    // Show hero content immediately
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('show');
        heroContent.style.opacity = '1';
    }
}

// Start site when page loads
window.addEventListener('load', () => {
    initializeSite();
});

/* ===== END SITE INITIALIZATION ===== */

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in and scale-in elements
document.querySelectorAll('.fade-in, .scale-in').forEach(el => {
    observer.observe(el);
});

// Advanced Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all reveal elements
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
});

// Add will-animate class for performance
document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-down, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in').forEach(el => {
    el.classList.add('will-animate');
});

// Video Performance Optimization
document.querySelectorAll('video').forEach(video => {
    // Pause video when not in viewport
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(e => console.log('Video autoplay prevented'));
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.25 });

    videoObserver.observe(video);

    // Fallback for autoplay issues
    video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => {
            // Try playing muted if autoplay is blocked
            video.muted = true;
            video.play().catch(err => console.log('Video playback failed'));
        });
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you would normally send the data to your server
        console.log('Form submitted:', data);

        // Show success message
        alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');

        // Reset form
        contactForm.reset();
    });
}

// Add active class to current page in navigation
const currentLocation = location.pathname.split('/').pop() || 'index.html';
const navLinksAll = document.querySelectorAll('.nav-menu a');

navLinksAll.forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentLocation) {
        link.classList.add('active');
    }
});

// Lazy Loading for Images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.setAttribute('id', 'backToTop');
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    background: var(--gradient-ocean);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-lg);
    z-index: 999;
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Console Art
console.log(`
%c
  ┌─────────────────────────────────────────┐
  │   🌊  استكشاف البحار - Marine Explore   │
  │   حلول ذكية للاستكشاف البحري           │
  │                                         │
  │   Made with 💙 in Saudi Arabia          │
  └─────────────────────────────────────────┘
`, 'color: #004E89; font-weight: bold; font-size: 14px;');

console.log('%cWebsite crafted with precision and care', 'color: #00A5B5; font-size: 12px;');

// Prevent right-click on images (optional - for production)
// document.querySelectorAll('img').forEach(img => {
//     img.addEventListener('contextmenu', e => e.preventDefault());
// });

// Parallax Effect for Hero Section
let heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        // Parallax for video background
        const videoBackground = heroSection.querySelector('.video-background');
        if (videoBackground && scrolled < heroSection.offsetHeight) {
            videoBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }

        // Parallax for hero content
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent && scrolled < heroSection.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * -0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroSection.offsetHeight) * 0.8;
        }
    });

    // Mouse Movement Parallax Effect
    heroSection.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // Move ocean rays based on mouse
        const oceanRays = heroSection.querySelectorAll('.ocean-ray');
        oceanRays.forEach((ray, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            ray.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Enhanced Navbar Hide/Show on Scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
let navbarHeight = navbar ? navbar.offsetHeight : 0;

window.addEventListener('scroll', () => {
    if (!navbar) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// Smooth Scroll Progress Indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-teal), var(--light-blue));
    z-index: 9999;
    transition: width 0.2s ease;
    width: 0;
    box-shadow: 0 0 10px rgba(0, 165, 181, 0.5);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Advanced Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .feature-box, .client-logo');

    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
};

// Initial setup for scroll animation
document.querySelectorAll('.card, .feature-box, .client-logo').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on load

// Dynamic Fish Generation - DISABLED
// Fish removed per user request

// Performance: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.querySelectorAll('.depth-particle').forEach(particle => {
        particle.style.display = 'none';
    });
}

/* ===== DIVING EXPERIENCE EFFECTS ===== */

// Generate Plankton Particles
function generatePlankton() {
    const planktonContainer = document.getElementById('planktonContainer');
    if (!planktonContainer) return;

    const numberOfPlankton = 30;

    for (let i = 0; i < numberOfPlankton; i++) {
        const plankton = document.createElement('div');
        plankton.className = 'plankton';
        plankton.style.left = Math.random() * 100 + '%';
        plankton.style.top = Math.random() * 100 + '%';
        plankton.style.animationDelay = Math.random() * 20 + 's';
        planktonContainer.appendChild(plankton);
    }
}

// Generate Diving Bubbles
function generateDivingBubbles() {
    const bubblesContainer = document.getElementById('divingBubblesContainer');
    if (!bubblesContainer) return;

    setInterval(() => {
        const bubble = document.createElement('div');
        bubble.className = 'diving-bubbles';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.width = (Math.random() * 10 + 5) + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.animationDuration = (Math.random() * 5 + 7) + 's';

        bubblesContainer.appendChild(bubble);

        // Remove bubble after animation
        setTimeout(() => {
            bubble.remove();
        }, 12000);
    }, 3000);
}

// Scroll-based Depth Effect
function updateDivingDepth() {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const pressureVignette = document.getElementById('pressureVignette');

    if (pressureVignette) {
        if (scrollPercent > 0.2) {
            pressureVignette.classList.add('active');
            pressureVignette.style.opacity = Math.min(scrollPercent * 1.5, 1);
        } else {
            pressureVignette.classList.remove('active');
        }
    }

    // Add underwater distortion to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollPercent < 0.3) {
        heroContent.classList.add('underwater-distortion');
    }
}

// Mouse Movement Creates Bubble Trail
let lastBubbleTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastBubbleTime > 200) {
        createBubbleTrail(e.clientX, e.clientY);
        lastBubbleTime = now;
    }
});

function createBubbleTrail(x, y) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble-trail';
    bubble.style.left = x + 'px';
    bubble.style.top = y + 'px';
    bubble.style.position = 'fixed';
    bubble.style.zIndex = '9999';
    bubble.style.pointerEvents = 'none';

    document.body.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, 3000);
}

// Add Bioluminescent Effect to Cards on Scroll
function addBioluminescence() {
    const cards = document.querySelectorAll('.card, .feature-box');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('bioluminescent');
            }
        });
    }, { threshold: 0.5 });

    cards.forEach(card => observer.observe(card));
}

// Initialize Diving Effects
function initDivingExperience() {
    generatePlankton();
    generateDivingBubbles();
    addBioluminescence();

    window.addEventListener('scroll', updateDivingDepth);
    updateDivingDepth(); // Initial call
}

/* ===== END DIVING EFFECTS ===== */

/* ===== ANIMATED COUNTER FOR STATS ===== */

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Observe stats and animate when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

/* ===== END COUNTER ===== */

// Initialize all on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('🌊 Marine Explore website loaded successfully!');

    // Initialize diving experience after intro
    setTimeout(() => {
        if (introComplete) {
            initDivingExperience();
        }
    }, 3000);
});

// Also initialize diving effects when intro is skipped
setTimeout(() => {
    if (introComplete) {
        initDivingExperience();
    }
}, 5000);

/* ===== LANGUAGE SWITCHER ===== */
const languageToggle = document.getElementById('languageToggle');
let currentLanguage = 'ar'; // Default is Arabic

if (languageToggle) {
    languageToggle.addEventListener('click', (e) => {
        e.preventDefault();

        if (currentLanguage === 'ar') {
            // Switch to English
            currentLanguage = 'en';
            languageToggle.querySelector('span').textContent = 'العربية';
            // Here you can redirect to English version or change content
            // window.location.href = 'index-en.html';
            alert('النسخة الإنجليزية قريباً | English version coming soon');
        } else {
            // Switch to Arabic
            currentLanguage = 'ar';
            languageToggle.querySelector('span').textContent = 'English';
            // window.location.href = 'index.html';
        }
    });
}

/* ===== END LANGUAGE SWITCHER ===== */

/* ===== CONTACT FORM HANDLER ===== */
const contactFormHome = document.getElementById('contactFormHome');
if (contactFormHome) {
    contactFormHome.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactFormHome);
        const data = Object.fromEntries(formData);

        // Here you would normally send the data to your server
        console.log('Contact form submitted:', data);

        // Show success message
        alert('✅ شكراً لتواصلك معنا!\n\nسنرد عليك في أقرب وقت ممكن.\n\nThank you for contacting us! We will get back to you soon.');

        // Reset form
        contactFormHome.reset();
    });
}

/* ===== END CONTACT FORM HANDLER ===== */
// أضف هذا الكود في نهاية ملف main.js بتاعك

/* ===== OCEAN SECTION ANIMATIONS ===== */

// Ocean Section Scroll Animation Observer
const oceanObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const oceanObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, oceanObserverOptions);

// Observe ocean section elements
function initOceanAnimations() {
    const oceanElements = document.querySelectorAll('[data-aos]');
    oceanElements.forEach(el => oceanObserver.observe(el));
}

// Enhanced wave glow effect on hover
function initWaveGlowEffects() {
    const contentWaves = document.querySelectorAll('.content-wave');

    contentWaves.forEach(wave => {
        wave.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });

        wave.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// VMV Cards hover enhancement
function initVMVCardEffects() {
    const vmvCards = document.querySelectorAll('.vmv-card');

    vmvCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const cardInner = this.querySelector('.card-inner');
            const cardIcon = this.querySelector('.card-icon-float');

            if (cardInner) {
                cardInner.style.transform = 'translateY(-15px)';
            }

            if (cardIcon) {
                cardIcon.style.transform = 'scale(1.15) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const cardInner = this.querySelector('.card-inner');
            const cardIcon = this.querySelector('.card-icon-float');

            if (cardInner) {
                cardInner.style.transform = 'translateY(0)';
            }

            if (cardIcon) {
                cardIcon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Values flow items interaction
function initValuesFlowEffects() {
    const valuesItems = document.querySelectorAll('.values-flow span');

    valuesItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-5px) scale(1.05)';
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
}

// Ocean bubbles parallax effect
function initOceanBubblesParallax() {
    const bubbles = document.querySelectorAll('.ocean-bubbles .bubble');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        bubbles.forEach((bubble, index) => {
            const speed = (index + 1) * 0.1;
            bubble.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Stagger animation for ocean paragraphs
function staggerOceanParagraphs() {
    const paragraphs = document.querySelectorAll('.ocean-paragraph');

    paragraphs.forEach((para, index) => {
        para.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Add shimmer effect to cards
function addShimmerEffect() {
    const cards = document.querySelectorAll('.content-wave, .card-inner');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const shimmer = this.querySelector('.wave-glow');
            if (shimmer) {
                shimmer.style.left = '100%';
            }
        });

        card.addEventListener('mouseleave', function() {
            const shimmer = this.querySelector('.wave-glow');
            if (shimmer) {
                // Reset shimmer position after animation
                setTimeout(() => {
                    shimmer.style.transition = 'none';
                    shimmer.style.left = '-100%';
                    setTimeout(() => {
                        shimmer.style.transition = 'left 0.8s ease';
                    }, 50);
                }, 800);
            }
        });
    });
}

// Initialize all ocean effects
function initAllOceanEffects() {
    initOceanAnimations();
    initWaveGlowEffects();
    initVMVCardEffects();
    initValuesFlowEffects();
    initOceanBubblesParallax();
    staggerOceanParagraphs();
    addShimmerEffect();

    console.log('🌊 Ocean section effects initialized!');
}

// Run ocean effects after page load
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        initAllOceanEffects();
    }, 100);
});

// Also run on window load as backup
window.addEventListener('load', () => {
    initAllOceanEffects();
});

/* ===== END OCEAN SECTION ANIMATIONS ===== */

/* ===== ENHANCED SCROLL EFFECTS FOR OCEAN SECTION ===== */

// Progressive reveal based on scroll depth
function oceanScrollReveal() {
    const oceanSection = document.querySelector('.about-section');
    if (!oceanSection) return;

    const paragraphs = oceanSection.querySelectorAll('.ocean-paragraph');
    const vmvRow = oceanSection.querySelector('.vmv-ocean-row');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const oceanTop = oceanSection.offsetTop;
        const oceanHeight = oceanSection.offsetHeight;

        // Calculate progress through ocean section (0 to 1)
        const progress = Math.max(0, Math.min(1,
            (scrolled - oceanTop + window.innerHeight / 2) / oceanHeight
        ));

        // Reveal paragraphs progressively
        paragraphs.forEach((para, index) => {
            const revealPoint = (index + 1) / (paragraphs.length + 1);
            if (progress > revealPoint - 0.1) {
                para.classList.add('aos-animate');
            }
        });

        // Reveal VMV row at the end
        if (progress > 0.8 && vmvRow) {
            vmvRow.classList.add('aos-animate');
        }
    });
}

// Initialize scroll reveal
document.addEventListener('DOMContentLoaded', () => {
    oceanScrollReveal();
});

/* ===== END ENHANCED SCROLL EFFECTS ===== */

/* ===== OCEAN ATMOSPHERE PULSE ===== */

// Add breathing effect to ocean atmosphere
function oceanAtmospherePulse() {
    const oceanSection = document.querySelector('.about-section');
    if (!oceanSection) return;

    let pulseValue = 0;

    setInterval(() => {
        pulseValue += 0.01;
        const opacity = 0.85 + Math.sin(pulseValue) * 0.15;

        // This creates a subtle breathing effect
        if (oceanSection.querySelector('::before')) {
            oceanSection.style.setProperty('--atmosphere-opacity', opacity);
        }
    }, 50);
}

// Initialize atmosphere pulse
document.addEventListener('DOMContentLoaded', () => {
    oceanAtmospherePulse();
});

/* ===== END OCEAN ATMOSPHERE PULSE ===== */

/* ===== SMOOTH CARD ENTRANCE ===== */

// Add entrance animation when cards become visible
const cardEntranceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

// Observe VMV cards
document.addEventListener('DOMContentLoaded', () => {
    const vmvCards = document.querySelectorAll('.vmv-card');
    vmvCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;

        cardEntranceObserver.observe(card);
    });
});

/* ===== END SMOOTH CARD ENTRANCE ===== */

/* ===== DEBUGGING HELPER ===== */

// Log ocean section status
function logOceanStatus() {
    const oceanSection = document.querySelector('.about-section');
    const paragraphs = document.querySelectorAll('.ocean-paragraph');
    const vmvCards = document.querySelectorAll('.vmv-card');
    const bubbles = document.querySelectorAll('.ocean-bubbles .bubble');

    console.log('🌊 Ocean Section Status:');
    console.log(`  - Section found: ${oceanSection ? 'Yes' : 'No'}`);
    console.log(`  - Paragraphs: ${paragraphs.length}`);
    console.log(`  - VMV Cards: ${vmvCards.length}`);
    console.log(`  - Bubbles: ${bubbles.length}`);
    console.log(`  - Animations initialized: ${document.querySelectorAll('[data-aos].aos-animate').length} elements`);
}

// Run debug after initialization
window.addEventListener('load', () => {
    setTimeout(() => {
        logOceanStatus();
    }, 2000);
});

/* ===== END DEBUGGING ===== */