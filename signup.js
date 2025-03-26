document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // Password strength meter
    const passwordInput = document.getElementById('password');
    const strengthSegments = document.querySelectorAll('.strength-segment');
    const strengthText = document.querySelector('.strength-text');
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Reset segments
        strengthSegments.forEach(segment => {
            segment.className = 'strength-segment';
        });
        
        if (password.length > 0) {
            // Check length
            if (password.length >= 8) strength++;
            
            // Check for numbers
            if (/\d/.test(password)) strength++;
            
            // Check for special characters
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
            
            // Check for uppercase and lowercase
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
            
            // Update strength meter
            for (let i = 0; i < strength; i++) {
                if (strength === 1) {
                    strengthSegments[i].classList.add('weak');
                    strengthText.textContent = 'Weak password';
                } else if (strength === 2 || strength === 3) {
                    strengthSegments[i].classList.add('medium');
                    strengthText.textContent = 'Medium password';
                } else if (strength === 4) {
                    strengthSegments[i].classList.add('strong');
                    strengthText.textContent = 'Strong password';
                }
            }
        } else {
            strengthText.textContent = 'Password strength';
        }
    });
    
    // Form validation
    const signupForm = document.querySelector('.signup-form');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if passwords match
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Passwords do not match!');
            return;
        }
        
        // Check if user type is selected
        const userTypeSelected = document.querySelector('input[name="userType"]:checked');
        if (!userTypeSelected) {
            alert('Please select your user type!');
            return;
        }
        
        // If all validations pass, you can submit the form
        // For now, just show a success message
        alert('Account created successfully! Redirecting to login...');
        // In a real application, you would submit the form data to your backend
        // window.location.href = 'login.html';
    });
    
    // Mobile responsiveness for the form
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.form-row').forEach(row => {
                row.style.flexDirection = 'column';
            });
        } else {
            document.querySelectorAll('.form-row').forEach(row => {
                row.style.flexDirection = 'row';
            });
        }
    };
    
    // Initial call and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
}); 