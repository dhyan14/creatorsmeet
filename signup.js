document.addEventListener('DOMContentLoaded', function() {
    // Add this at the beginning of your DOMContentLoaded function
    const urlParams = new URLSearchParams(window.location.search);
    const userType = urlParams.get('type');

    if (userType) {
        const radioButton = document.getElementById(userType);
        if (radioButton) {
            radioButton.checked = true;
        }
    }
    
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
    
    // Show/hide coding skills based on user type selection
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');
    const codingSkillsSection = document.querySelector('.coding-skills-section');
    
    userTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'developer' || this.value === 'both') {
                codingSkillsSection.style.display = 'block';
            } else {
                codingSkillsSection.style.display = 'none';
            }
        });
    });
    
    // Check if developer or both is already selected (for URL parameters)
    const selectedUserType = document.querySelector('input[name="userType"]:checked');
    if (selectedUserType && (selectedUserType.value === 'developer' || selectedUserType.value === 'both')) {
        codingSkillsSection.style.display = 'block';
    }
    
    // Update form validation to check for skills if developer or both is selected
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
        
        // Check if at least one skill is selected for developers or both
        if (userTypeSelected.value === 'developer' || userTypeSelected.value === 'both') {
            const skillsSelected = document.querySelectorAll('input[name="skills"]:checked');
            const otherSkills = document.getElementById('otherSkills').value.trim();
            
            if (skillsSelected.length === 0 && otherSkills === '') {
                alert('Please select at least one coding skill or specify other skills!');
                return;
            }
        }
        
        // If all validations pass
        // Collect all form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            userType: userTypeSelected.value,
            skills: []
        };
        
        // Add skills if developer or both
        if (userTypeSelected.value === 'developer' || userTypeSelected.value === 'both') {
            document.querySelectorAll('input[name="skills"]:checked').forEach(skill => {
                formData.skills.push(skill.value);
            });
            
            if (document.getElementById('otherSkills').value.trim() !== '') {
                const otherSkillsArray = document.getElementById('otherSkills').value
                    .split(',')
                    .map(skill => skill.trim())
                    .filter(skill => skill !== '');
                
                formData.skills = [...formData.skills, ...otherSkillsArray];
            }
        }
        
        console.log('Form data to be submitted:', formData);
        
        // Show success message
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