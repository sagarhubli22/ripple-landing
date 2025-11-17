// Waitlist form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waitlistForm');
    const emailInput = document.getElementById('email');
    const messageDiv = document.getElementById('formMessage');

    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission

        // Clear any previous messages
        messageDiv.textContent = '';
        messageDiv.className = 'form-message';

        const email = emailInput.value.trim();

        // Basic email validation
        if (!email || !isValidEmail(email)) {
            messageDiv.textContent = 'Please enter a valid email address.';
            messageDiv.className = 'form-message error';
            return;
        }

        try {
            // Formspree endpoint
            const endpoint = 'https://formspree.io/f/meovvwrp';
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            // Show success message
            messageDiv.textContent = "Success! You're on the waitlist.";
            messageDiv.className = 'form-message success';
            
            // Clear the form
            emailInput.value = '';

        } catch (error) {
            // Show error message
            messageDiv.textContent = 'Something went wrong. Please try again later.';
            messageDiv.className = 'form-message error';
            console.error('Form submission error:', error);
        }
    });
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

