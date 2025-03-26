document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.classList.add('mobile-menu');
                
                // Clone nav links and auth buttons
                const navLinksClone = navLinks.cloneNode(true);
                const authButtonsClone = authButtons.cloneNode(true);
                
                mobileMenu.appendChild(navLinksClone);
                mobileMenu.appendChild(authButtonsClone);
                
                document.body.appendChild(mobileMenu);
            }
            
            // Toggle mobile menu
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.classList.toggle('active');
            
            //Prevent scrolling when menu is open
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Filter functionality for Explore section
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide cards based on filter
            cards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.classList.contains(filter + '-card')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Testimonial Slider
    const testimonials = [
        {
            quote: "I had this app idea for years but couldn't code. Within a week on Creators Meet, I found the perfect developer partner. Now our app is in beta testing!",
            name: "Michael Johnson",
            role: "Idea Creator",
            avatar: "MJ"
        },
        {
            quote: "As a developer, I was looking for meaningful projects. Through Creators Meet, I connected with someone who had an amazing vision for a healthcare app that I'm now helping build.",
            name: "Sarah Williams",
            role: "Full-Stack Developer",
            avatar: "SW"
        },
        {
            quote: "The platform made it incredibly easy to find developers who were passionate about my environmental project. We're now a team of five working on something that could make a real difference.",
            name: "David Chen",
            role: "Entrepreneur",
            avatar: "DC"
        }
    ];
    
    let currentTestimonial = 0;
    const testimonialQuote = document.querySelector('.quote');
    const authorName = document.querySelector('.author-name');
    const authorRole = document.querySelector('.author-role');
    const authorAvatar = document.querySelector('.author-avatar');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Function to update testimonial
    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonial];
        
        // Fade out
        testimonialQuote.style.opacity = 0;
        authorName.style.opacity = 0;
        authorRole.style.opacity = 0;
        authorAvatar.style.opacity = 0;
        
        setTimeout(() => {
            testimonialQuote.textContent = `"${testimonial.quote}"`;
            authorName.textContent = testimonial.name;
            authorRole.textContent = testimonial.role;
            authorAvatar.textContent = testimonial.avatar;
            
            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentTestimonial);
            });
            
            // Fade in
            testimonialQuote.style.opacity = 1;
            authorName.style.opacity = 1;
            authorRole.style.opacity = 1;
            authorAvatar.style.opacity = 1;
        }, 300);
    }
    
    // Event listeners for testimonial navigation
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateTestimonial();
        });
        
        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentTestimonial = index;
                updateTestimonial();
            });
        });
        
        // Auto-rotate testimonials every 8 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        }, 8000);
    }
    
    // Smooth scrolling for navigation links
    const navAnchors = document.querySelectorAll('a[href^="#"]');
    
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu.active');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                    hamburger.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log('Contact form submitted:', { name, email, subject, message });
            
            // Show success message
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => group.style.display = 'none');
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you soon.</p>
            `;
            
            contactForm.appendChild(successMessage);
            
            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                formGroups.forEach(group => group.style.display = 'block');
                submitBtn.style.display = 'block';
                successMessage.remove();
            }, 5000);
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the data to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            const formElements = newsletterForm.querySelectorAll('input, button');
            formElements.forEach(el => el.style.display = 'none');
            
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>You've been subscribed to our newsletter!</p>
            `;
            
            newsletterForm.appendChild(successMessage);
            
            // Reset form after 5 seconds
            setTimeout(() => {
                newsletterForm.reset();
                formElements.forEach(el => el.style.display = 'block');
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Add animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.step, .card, .about-content, .testimonial, .contact-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animation class to CSS
    const style = document.createElement('style');
    style.textContent = `
        .step, .card, .about-content, .testimonial, .contact-container {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Add glow effect to buttons on hover
    const glowButtons = document.querySelectorAll('.primary-btn, .signup-btn, .submit-btn');
    
    glowButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.background = `radial-gradient(circle at ${x}px ${y}px, #ff00ff, #8a2be2)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(to right, var(--primary-color), var(--secondary-color))';
        });
    });
});

// Add CSS for mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 10, 10, 0.95);
            z-index: 999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transform: translateY(-100%);
            transition: transform 0.4s ease;
        }
        
        .mobile-menu.active {
            transform: translateY(0);
        }
        
        .mobile-menu .nav-links {
            flex-direction: column;
            align-items: center;
        }
        
        .mobile-menu .nav-links li {
            margin: 1rem 0;
        }
        
        .mobile-menu .auth-buttons {
            margin-top: 2rem;
        }
        
        .hamburger.active .line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active .line:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .line:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        .no-scroll {
            overflow: hidden;
        }
        
        .success-message {
            text-align: center;
            padding: 2rem;
            animation: fadeIn 0.5s ease;
        }
        
        .success-message i {
            font-size: 3rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}); 