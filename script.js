// Mobile menu functionality
function hamburg() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.add('active');
}

function cancel() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.remove('active');
}

// Initialize on document load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        offset: 0,
        duration: 1000,
        once: true
    });
    
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
        // Update navigation for logged-in users
        const loginLink = document.querySelector('a[href="login.html"]');
        const signupLink = document.querySelector('a[href="signup.html"]');
        if (loginLink) {
            loginLink.href = 'dashboard.html';
            loginLink.textContent = 'Dashboard';
        }
        if (signupLink) {
            signupLink.href = '#';
            signupLink.textContent = 'Logout';
            signupLink.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            };
        }
    }
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-coder-theme');
        document.getElementById('theme-switch-checkbox').checked = true;
        if (document.getElementById('theme-switch-checkbox-mobile')) {
            document.getElementById('theme-switch-checkbox-mobile').checked = true;
        }
    }
    
    // Add event listeners to theme switches
    const themeSwitch = document.getElementById('theme-switch-checkbox');
    const themeSwitchMobile = document.getElementById('theme-switch-checkbox-mobile');
    
    if (themeSwitch) {
        themeSwitch.addEventListener('change', toggleTheme);
    }
    
    if (themeSwitchMobile) {
        themeSwitchMobile.addEventListener('change', toggleTheme);
    }
    
    // Initialize typewriter effect
    initTypewriter();
    
    // Smooth scroll for navigation
    initSmoothScroll();
});

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-coder-theme');
    
    // Save theme preference
    localStorage.setItem('theme', body.classList.contains('light-coder-theme') ? 'light' : 'dark');
    
    // Sync other theme switch if it exists
    const themeSwitch = document.getElementById('theme-switch-checkbox');
    const themeSwitchMobile = document.getElementById('theme-switch-checkbox-mobile');
    
    if (themeSwitch && themeSwitchMobile) {
        themeSwitchMobile.checked = themeSwitch.checked;
    }
}

// Initialize typewriter effect
function initTypewriter() {
    const typewriterText = document.querySelector('.typewriter-text');
    if (!typewriterText) return;
    
    const texts = ['Welcome to CodersMEET', 'Connect. Code. Create.', 'Turn Ideas Into Reality'];
    let textIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < texts[textIndex].length) {
            typewriterText.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            typewriterText.textContent = texts[textIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        }
    }
    
    // Start the typewriter effect
    setTimeout(type, 1000);
}

// Initialize smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
} 