/*
  Form Validation Logic for Screen 12 Contact Us
  
  References:
  - Mozilla Developer Network, 2023. Document: DOMContentLoaded event. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. Document: getElementById() method. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. Document: createElement() method. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. Event: submit event. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. Regular expressions. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions> [Accessed 3 November 2026].
 */






// form-validation.js - Form validation logic for Screen 12 Contact Us
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    if (!contactForm) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    // Create or select a success message container
    let successMessageDiv = document.getElementById('form-success-message');
    if (!successMessageDiv) {
        successMessageDiv = document.createElement('div');
        successMessageDiv.id = 'form-success-message';
        successMessageDiv.className = 'success-banner';
        successMessageDiv.style.display = 'none';
        contactForm.parentNode.insertBefore(successMessageDiv, contactForm);
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page reload to show the in-page success state
        let errors = [];

        if (nameInput && nameInput.value.trim().length < 2) {
            errors.push('Please enter a valid Name (at least 2 characters).');
            nameInput.style.borderColor = 'red';
        } else if (nameInput) {
            nameInput.style.borderColor = '#ccc';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput && !emailRegex.test(emailInput.value.trim())) {
            errors.push('Please enter a valid Email address.');
            emailInput.style.borderColor = 'red';
        } else if (emailInput) {
            emailInput.style.borderColor = '#ccc';
        }

        if (messageInput && messageInput.value.trim().length < 10) {
            errors.push('Message must be at least 10 characters long.');
            messageInput.style.borderColor = 'red';
        } else if (messageInput) {
            messageInput.style.borderColor = '#ccc';
        }

        if (errors.length > 0) {
            successMessageDiv.style.display = 'none';
            alert('Form Submission Error:\n' + errors.join('\n'));
        } else {
            // Display the success message display
            const userName = nameInput ? nameInput.value : 'Customer';
            successMessageDiv.innerHTML = `<strong>Message has been successfully sent!</strong> Thank you, ${userName}. We have received your message.`;
            successMessageDiv.style.display = 'block';

            contactForm.reset();
            
            
            // contactForm.style.display = 'none';
        }
    });

    console.log('Contact form validation initialized.');
});