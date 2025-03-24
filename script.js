// Custom cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Cursor effects on hover
    const links = document.querySelectorAll('a, button, .tech-icon, .dev-card, .social-link');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
        });
    });
});

// Removed Matrix background effect

// Scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Reveal sections on scroll
    const revealSections = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on initial load
    
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    
    function runCounter() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(runCounter, 20);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start counter when about section is visible
    const aboutSection = document.querySelector('.about');
    
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                runCounter();
                aboutObserver.disconnect();
            }
        }, { threshold: 0.5 });
        
        aboutObserver.observe(aboutSection);
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        const navLinksItems = document.querySelectorAll('.nav-link, .join-btn');
        
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }
});

// Simplified GSAP animations
document.addEventListener('DOMContentLoaded', () => {
    // Only run if GSAP is available
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin if available
        if (gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        
        // Basic animations that don't depend on ScrollTrigger
        gsap.from('.hero .glitch-container', {
            opacity: 1,
            y: 0,
            duration: 0.1,
            delay: 0
        });
        
        gsap.from('.terminal', {
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: 0.2
        });
    }
});

// Form validation and submission
document.addEventListener('DOMContentLoaded', () => {
    const joinForm = document.querySelector('.join-form');
    const contactForm = document.querySelector('.contact-form');
    
    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            const name = joinForm.querySelector('#name').value;
            const email = joinForm.querySelector('#email').value;
            const specialty = joinForm.querySelector('#specialty').value;
            
            if (name && email && specialty) {
                // Show success message
                alert('Thanks for joining! We\'ll be in touch soon.');
                joinForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            const name = contactForm.querySelector('#contact-name').value;
            const email = contactForm.querySelector('#contact-email').value;
            const message = contactForm.querySelector('#contact-message').value;
            
            if (name && email && message) {
                // Show success message
                alert('Thanks for your message! We\'ll respond as soon as possible.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
});

// Add base styles for the page
document.addEventListener('DOMContentLoaded', () => {
    // Add the base styles if they don't exist yet
    if (!document.querySelector('#base-styles')) {
        const baseStyles = document.createElement('style');
        baseStyles.id = 'base-styles';
        baseStyles.innerHTML = `
            /* Base Styles and Variables */
            :root {
                --primary-color: #0f0;
                --primary-dark: #00b300;
                --primary-light: #66ff66;
                --dark-bg: #0a0a0a;
                --darker-bg: #050505;
                --medium-dark: #121212;
                --light-dark: #1a1a1a;
                --text-color: #e0e0e0;
                --secondary-text: #a0a0a0;
                --accent-color: #00ffaa;
                --danger-color: #ff3860;
                --warning-color: #ffdd57;
                --success-color: #23d160;
                --font-code: 'Fira Code', monospace;
                --font-main: 'Poppins', sans-serif;
                --transition-speed: 0.3s;
                --glow-shadow: 0 0 10px rgba(0, 255, 0, 0.7), 0 0 20px rgba(0, 255, 0, 0.5), 0 0 30px rgba(0, 255, 0, 0.3);
            }

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            html {
                scroll-behavior: smooth;
            }

            body {
                font-family: var(--font-main);
                background-color: var(--dark-bg);
                color: var(--text-color);
                line-height: 1.6;
            }
        `;
        document.head.appendChild(baseStyles);
    }
});

// Add this to your existing script.js file
document.addEventListener('DOMContentLoaded', () => {
    // Create a matrix-like background effect for the hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // Create floating characters
        for (let i = 0; i < 50; i++) {
            const floatingChar = document.createElement('div');
            floatingChar.className = 'floating-char';
            floatingChar.textContent = Math.random() > 0.5 ? 
                String.fromCharCode(Math.floor(Math.random() * 26) + 97) : 
                Math.floor(Math.random() * 10);
            
            floatingChar.style.left = `${Math.random() * 100}%`;
            floatingChar.style.top = `${Math.random() * 100}%`;
            floatingChar.style.animationDuration = `${Math.random() * 10 + 5}s`;
            floatingChar.style.animationDelay = `${Math.random() * 5}s`;
            floatingChar.style.opacity = Math.random() * 0.5;
            
            hero.appendChild(floatingChar);
        }
    }
    
    // Add a dramatic entrance for the page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 300);
    
    // Add a cool scan effect when the page loads
    const scanEffect = document.createElement('div');
    scanEffect.className = 'scan-effect';
    document.body.appendChild(scanEffect);
    
    setTimeout(() => {
        scanEffect.style.top = '100%';
        setTimeout(() => {
            scanEffect.remove();
        }, 1000);
    }, 500);
}); 