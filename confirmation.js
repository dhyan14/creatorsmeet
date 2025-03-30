document.addEventListener('DOMContentLoaded', function() {
    // Get form data from localStorage (this will be set in signup.js)
    const formData = JSON.parse(localStorage.getItem('signupFormData'));
    
    if (formData) {
        // Populate the confirmation page with the user's data
        document.getElementById('fullName').textContent = `${formData.firstName} ${formData.lastName}`;
        document.getElementById('emailDisplay').textContent = formData.email;
        
        // Set account type with proper formatting
        let accountTypeText = '';
        switch(formData.userType) {
            case 'ideaCreator':
                accountTypeText = 'Idea Creator';
                break;
            case 'developer':
                accountTypeText = 'Developer';
                break;
            case 'both':
                accountTypeText = 'Idea Creator & Developer';
                break;
            default:
                accountTypeText = formData.userType;
        }
        document.getElementById('accountType').textContent = accountTypeText;
        
        // Handle skills section
        const skillsSummarySection = document.getElementById('skillsSummarySection');
        const skillsTags = document.getElementById('skillsTags');
        
        if (formData.userType === 'developer' || formData.userType === 'both') {
            if (formData.skills && formData.skills.length > 0) {
                // Create skill tags
                formData.skills.forEach(skill => {
                    const skillTag = document.createElement('div');
                    skillTag.className = 'skill-tag';
                    skillTag.innerHTML = `<i class="fas fa-code"></i>${skill}`;
                    skillsTags.appendChild(skillTag);
                });
            } else {
                // No skills selected
                skillsTags.innerHTML = '<p>No specific skills selected</p>';
            }
        } else {
            // Hide skills section for idea creators
            skillsSummarySection.style.display = 'none';
        }
    } else {
        // If no form data is found, redirect to signup page
        alert('No signup data found. Please complete the signup form.');
        window.location.href = 'signup.html';
    }
}); 