/**
  Booking Script for Form Validation and Calendar Date Input
  
 References:
 - Mozilla Developer Network, 2023. Document: DOMContentLoaded event. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. Document: querySelector() method. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. <input type="date">. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. Client-side form validation. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. Regular expressions. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions> [Accessed 3 November 2026].
 */









// booking script for handling form validation and calendar date input

document.addEventListener('DOMContentLoaded', () => {
    // get form and input elements
    const form = document.querySelector('form') || document.getElementById('booking-form');
    const inputs = document.querySelectorAll('input, select, textarea');
    
    // identify specific fields based on the form structure
    const fullNameInput = document.querySelector('input[placeholder*="Full Name"]') || inputs[0];
    const emailInput = document.querySelector('input[placeholder*="Email"]') || inputs[1];
    const phoneInput = document.querySelector('input[placeholder*="Phone"]') || inputs[2];
    const dateInput = document.querySelector('input[placeholder="dd/mm/yyyy"]') || document.querySelector('input[type="text"]');

    // enhance preferred date input to use the browser calendar picker
    if (dateInput) {
        dateInput.type = 'date';
        dateInput.removeAttribute('placeholder');
    }

    // handle form submission and validation for compulsory asterisk fields
    if (form) {
        form.addEventListener('submit', (e) => {
            let isValid = true;
            let errorMessages = [];

            // validate full name (compulsory)
            if (fullNameInput && !fullNameInput.value.trim()) {
                isValid = false;
                errorMessages.push('full name is required.');
                highlightError(fullNameInput);
            } else if (fullNameInput) {
                removeError(fullNameInput);
            }

            // validate email address (compulsory)
            if (emailInput && !emailInput.value.trim()) {
                isValid = false;
                errorMessages.push('email address is required.');
                highlightError(emailInput);
            } else if (emailInput && !validateEmail(emailInput.value.trim())) {
                isValid = false;
                errorMessages.push('please enter a valid email address.');
                highlightError(emailInput);
            } else if (emailInput) {
                removeError(emailInput);
            }

            // validate phone number (compulsory)
            if (phoneInput && !phoneInput.value.trim()) {
                isValid = false;
                errorMessages.push('phone number is required.');
                highlightError(phoneInput);
            } else if (phoneInput) {
                removeError(phoneInput);
            }

            // prevent submission if validation fails
            if (!isValid) {
                e.preventDefault();
                alert('please correct the following errors:\n\n- ' + errorMessages.join('\n- '));
            } else {
                e.preventDefault();
                // placeholder for successful submission action
                alert('booking request submitted successfully!');
                form.reset();
            }
        });
    }

    // helper function to validate email format using regex
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // helper function to highlight invalid compulsory fields in red
    function highlightError(element) {
        element.style.borderColor = '#ef4444';
        element.style.backgroundColor = '#fef2f2';
    }

    // helper function to clear error styles and apply theme green accent
    function removeError(element) {
        element.style.borderColor = '#16A34A';
        element.style.backgroundColor = '#ffffff';
    }
});