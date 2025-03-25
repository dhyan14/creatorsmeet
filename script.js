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
    
    // Enhanced connection line animation
    const heroSection = document.querySelector('.hero');
    const ideaBubble = document.querySelector('.idea-bubble');
    const skillBubble = document.querySelector('.skill-bubble');
    const connectionLine = document.querySelector('.connection-line');
    
    if (heroSection && ideaBubble && skillBubble && connectionLine) {
        // Replace static SVG with dynamic canvas-based connection
        connectionLine.innerHTML = '';
        const canvas = document.createElement('canvas');
        connectionLine.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        
        function updateConnectionLine() {
            const ideaRect = ideaBubble.getBoundingClientRect();
            const skillRect = skillBubble.getBoundingClientRect();
            const codeRect = document.querySelector('.code-block').getBoundingClientRect();
            const heroRect = heroSection.getBoundingClientRect();
            
            // Set canvas size to match container
            canvas.width = connectionLine.offsetWidth;
            canvas.height = connectionLine.offsetHeight;
            
            // Calculate relative positions
            const ideaX = ideaRect.left - heroRect.left + ideaRect.width/2;
            const ideaY = ideaRect.top - heroRect.top + ideaRect.height/2;
            const skillX = skillRect.left - heroRect.left + skillRect.width/2;
            const skillY = skillRect.top - heroRect.top + skillRect.height/2;
            const codeX = codeRect.left - heroRect.left + codeRect.width/2;
            const codeY = codeRect.top - heroRect.top + codeRect.height/2;
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw first curved path (idea to code)
            let gradient = ctx.createLinearGradient(ideaX, ideaY, codeX, codeY);
            gradient.addColorStop(0, 'rgba(138, 43, 226, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 0, 255, 0.8)');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            
            // Draw the path from idea to code
            ctx.beginPath();
            ctx.moveTo(ideaX, ideaY);
            
            // Control point for the curve
            const control1X = (ideaX + codeX) / 2;
            const control1Y = Math.min(ideaY, codeY) - 30;
            
            ctx.quadraticCurveTo(control1X, control1Y, codeX, codeY);
            ctx.stroke();
            
            // Draw second curved path (code to skill)
            gradient = ctx.createLinearGradient(codeX, codeY, skillX, skillY);
            gradient.addColorStop(0, 'rgba(255, 0, 255, 0.8)');
            gradient.addColorStop(1, 'rgba(138, 43, 226, 0.8)');
            
            ctx.strokeStyle = gradient;
            
            // Draw the path from code to skill
            ctx.beginPath();
            ctx.moveTo(codeX, codeY);
            
            // Control point for the curve
            const control2X = (codeX + skillX) / 2;
            const control2Y = Math.max(codeY, skillY) + 30;
            
            ctx.quadraticCurveTo(control2X, control2Y, skillX, skillY);
            ctx.stroke();
            
            // Add glowing particles along both paths
            const particleCount = 8;
            const time = Date.now() * 0.001;
            
            // Particles on first path (idea to code)
            for (let i = 0; i < particleCount/2; i++) {
                const t = (i / (particleCount/2) + time * 0.1) % 1;
                const x = (1-t)*(1-t)*ideaX + 2*(1-t)*t*control1X + t*t*codeX;
                const y = (1-t)*(1-t)*ideaY + 2*(1-t)*t*control1Y + t*t*codeY;
                
                // Draw glowing particle
                const glow = ctx.createRadialGradient(x, y, 0, x, y, 8);
                glow.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                glow.addColorStop(0.5, 'rgba(138, 43, 226, 0.5)');
                glow.addColorStop(1, 'rgba(138, 43, 226, 0)');
                
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Particles on second path (code to skill)
            for (let i = 0; i < particleCount/2; i++) {
                const t = (i / (particleCount/2) + time * 0.15) % 1;
                const x = (1-t)*(1-t)*codeX + 2*(1-t)*t*control2X + t*t*skillX;
                const y = (1-t)*(1-t)*codeY + 2*(1-t)*t*control2Y + t*t*skillY;
                
                // Draw glowing particle
                const glow = ctx.createRadialGradient(x, y, 0, x, y, 8);
                glow.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                glow.addColorStop(0.5, 'rgba(255, 0, 255, 0.5)');
                glow.addColorStop(1, 'rgba(255, 0, 255, 0)');
                
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Update on load and animation frame
        updateConnectionLine();
        window.addEventListener('resize', updateConnectionLine);
        
        // Animate continuously
        function animate() {
            updateConnectionLine();
            requestAnimationFrame(animate);
        }
        animate();
    }
    
    // Create particle background
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-background';
    document.body.prepend(particleContainer);
    
    // Create particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${5 + Math.random() * 10}s`;
        particle.style.opacity = Math.random() * 0.5;
        particle.style.width = particle.style.height = `${Math.random() * 10 + 5}px`;
        particleContainer.appendChild(particle);
    }
    
    // Add CSS for particles
    const style = document.createElement('style');
    style.textContent = `
        .particle-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        }
        
        .particle {
            position: absolute;
            background: radial-gradient(circle at center, rgba(138, 43, 226, 0.8), rgba(138, 43, 226, 0));
            border-radius: 50%;
            animation: float-around linear infinite;
        }
        
        @keyframes float-around {
            0% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(100px, 50px);
            }
            50% {
                transform: translate(50px, 100px);
            }
            75% {
                transform: translate(-50px, 50px);
            }
            100% {
                transform: translate(0, 0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Typing animation for hero heading
    const heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading) {
        const originalText = heroHeading.innerHTML;
        heroHeading.innerHTML = '';
        
        // Create wrapper for typing animation
        const typingWrapper = document.createElement('div');
        typingWrapper.className = 'typing-wrapper';
        heroHeading.parentNode.insertBefore(typingWrapper, heroHeading);
        typingWrapper.appendChild(heroHeading);
        
        // Add cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        typingWrapper.appendChild(cursor);
        
        // Typing animation
        let i = 0;
        const typingSpeed = 80;
        
        function typeText() {
            if (i < originalText.length) {
                heroHeading.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeText, typingSpeed);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeText, 500);
        
        // Add CSS for typing animation
        const style = document.createElement('style');
        style.textContent = `
            .typing-wrapper {
                display: inline-flex;
                align-items: center;
            }
            
            .typing-cursor {
                font-weight: 700;
                color: var(--primary-color);
                animation: blink 1s infinite;
                margin-left: 5px;
            }
            
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add this to create an interactive skill matching visualization
    const exploreSection = document.querySelector('#explore');
    if (exploreSection) {
        const visualizationSection = document.createElement('div');
        visualizationSection.className = 'skill-visualization';
        visualizationSection.innerHTML = `
            <h3>Find Your Perfect Match</h3>
            <div class="visualization-container">
                <div class="ideas-pool">
                    <h4>Ideas</h4>
                    <div class="pool-items">
                        <div class="pool-item" data-skill="ai">AI Assistant</div>
                        <div class="pool-item" data-skill="web">E-commerce Platform</div>
                        <div class="pool-item" data-skill="mobile">Fitness Tracker</div>
                        <div class="pool-item" data-skill="game">Educational Game</div>
                        <div class="pool-item" data-skill="data">Data Visualization Tool</div>
                    </div>
                </div>
                <div class="skills-pool">
                    <h4>Skills</h4>
                    <div class="pool-items">
                        <div class="pool-item" data-skill="ai">Machine Learning</div>
                        <div class="pool-item" data-skill="web">Full-Stack Development</div>
                        <div class="pool-item" data-skill="mobile">Mobile App Development</div>
                        <div class="pool-item" data-skill="game">Game Development</div>
                        <div class="pool-item" data-skill="data">Data Science</div>
                    </div>
                </div>
                <canvas id="matching-canvas"></canvas>
            </div>
        `;
        
        exploreSection.appendChild(visualizationSection);
        
        // Add CSS for visualization
        const style = document.createElement('style');
        style.textContent = `
            .skill-visualization {
                margin-top: 4rem;
                padding: 2rem;
                background: rgba(10, 10, 10, 0.5);
                border-radius: 20px;
            }
            
            .visualization-container {
                display: flex;
                justify-content: space-between;
                position: relative;
                min-height: 300px;
                margin-top: 2rem;
            }
            
            .ideas-pool, .skills-pool {
                width: 45%;
                padding: 1rem;
            }
            
            .pool-items {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .pool-item {
                padding: 1rem;
                background: var(--card-bg);
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 1px solid rgba(138, 43, 226, 0.2);
            }
            
            .pool-item:hover, .pool-item.active {
                background: rgba(138, 43, 226, 0.2);
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            #matching-canvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
            }
        `;
        document.head.appendChild(style);
        
        // Initialize canvas for connections
        const canvas = document.getElementById('matching-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            // Handle item clicks
            const poolItems = document.querySelectorAll('.pool-item');
            poolItems.forEach(item => {
                item.addEventListener('click', function() {
                    const skill = this.getAttribute('data-skill');
                    
                    // Toggle active class
                    if (this.classList.contains('active')) {
                        this.classList.remove('active');
                        // Remove all connections with this skill
                        document.querySelectorAll(`.pool-item[data-skill="${skill}"]`).forEach(el => {
                            el.classList.remove('active');
                        });
                    } else {
                        // Activate matching items
                        document.querySelectorAll(`.pool-item[data-skill="${skill}"]`).forEach(el => {
                            el.classList.add('active');
                        });
                    }
                    
                    // Draw connections
                    drawConnections();
                });
            });
            
            function drawConnections() {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Get active items
                const activeIdeas = document.querySelectorAll('.ideas-pool .pool-item.active');
                const activeSkills = document.querySelectorAll('.skills-pool .pool-item.active');
                
                // Draw connections between matching items
                activeIdeas.forEach(idea => {
                    const ideaSkill = idea.getAttribute('data-skill');
                    const ideaRect = idea.getBoundingClientRect();
                    const canvasRect = canvas.getBoundingClientRect();
                    
                    activeSkills.forEach(skill => {
                        const skillSkill = skill.getAttribute('data-skill');
                        if (ideaSkill === skillSkill) {
                            const skillRect = skill.getBoundingClientRect();
                            
                            // Calculate positions relative to canvas
                            const startX = ideaRect.right - canvasRect.left;
                            const startY = ideaRect.top + ideaRect.height/2 - canvasRect.top;
                            const endX = skillRect.left - canvasRect.left;
                            const endY = skillRect.top + skillRect.height/2 - canvasRect.top;
                            
                            // Draw gradient line
                            const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
                            gradient.addColorStop(0, 'rgba(138, 43, 226, 0.8)');
                            gradient.addColorStop(1, 'rgba(255, 0, 255, 0.8)');
                            
                            ctx.beginPath();
                            ctx.moveTo(startX, startY);
                            ctx.lineTo(endX, endY);
                            ctx.strokeStyle = gradient;
                            ctx.lineWidth = 2;
                            ctx.stroke();
                            
                            // Add pulsing effect
                            const pulseSize = 5 + Math.sin(Date.now() * 0.005) * 2;
                            ctx.beginPath();
                            ctx.arc(startX, startY, pulseSize, 0, Math.PI * 2);
                            ctx.fillStyle = 'rgba(138, 43, 226, 0.5)';
                            ctx.fill();
                            
                            ctx.beginPath();
                            ctx.arc(endX, endY, pulseSize, 0, Math.PI * 2);
                            ctx.fillStyle = 'rgba(255, 0, 255, 0.5)';
                            ctx.fill();
                        }
                    });
                });
            }
            
            // Animate connections
            function animate() {
                if (document.querySelector('.pool-item.active')) {
                    drawConnections();
                }
                requestAnimationFrame(animate);
            }
            animate();
            
            // Handle window resize
            window.addEventListener('resize', function() {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
                drawConnections();
            });
        }
    }
    
    // Add neon effect to headings
    document.querySelectorAll('h2').forEach(heading => {
        heading.setAttribute('data-text', heading.textContent);
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