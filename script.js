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

// Matrix background effect
document.addEventListener('DOMContentLoaded', () => {
    const matrixBg = document.querySelector('.matrix-bg');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    matrixBg.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const columns = Math.floor(canvas.width / 20);
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

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
    
    const aboutObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            runCounter();
            aboutObserver.disconnect();
        }
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
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
});

// GSAP animations
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.from('.hero .glitch-container', {
        opacity: 0,
        y: -50,
        duration: 1,
        delay: 0.5
    });
    
    gsap.from('.terminal', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1
    });
    
    // About section animations
    gsap.from('.about-text h3', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%'
        },
        opacity: 0,
        x: -50,
        duration: 0.8
    });
    
    gsap.from('.about-text p', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3
    });
    
    gsap.from('.code-window', {
        scrollTrigger: {
            trigger: '.about-image',
            start: 'top 80%'
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.5
    });
    
    // Developers section animations
    gsap.from('.dev-intro', {
        scrollTrigger: {
            trigger: '.developers',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });
    
    gsap.from('.dev-card', {
        scrollTrigger: {
            trigger: '.dev-cards',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2
    });
    
    gsap.from('.tech-icon', {
        scrollTrigger: {
            trigger: '.tech-stack',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1
    });
    
    // Join section animations
    gsap.from('.join-text h3, .join-text p, .benefits-list li', {
        scrollTrigger: {
            trigger: '.join-section',
            start: 'top 80%'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.1
    });
    
    gsap.from('.join-form', {
        scrollTrigger: {
            trigger: '.join-form-container',
            start: 'top 80%'
        },
        opacity: 0,
        x: 50,
        duration: 0.8
    });
    
    // Contact section animations
    gsap.from('.contact-info h3, .contact-info p, .contact-item, .social-links', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.1
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-form-container',
            start: 'top 80%'
        },
        opacity: 0,
        x: 50,
        duration: 0.8
    });
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
                // Show success message (in a real app, you'd send this to a server)
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
                // Show success message (in a real app, you'd send this to a server)
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