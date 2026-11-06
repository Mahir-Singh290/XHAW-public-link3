/*
  Fee & Discount Calculator Script for Screen 9
  
  References:
  - Mozilla Developer Network, 2023. Document: DOMContentLoaded event. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. Document: querySelectorAll() method. MDN Web Docs. 
   Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll> [Accessed 3 November 2026].
   Mozilla Developer Network, 2023. EventTarget: addEventListener() method. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. GlobalObject: parseInt() function. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/parseInt> [Accessed 3 November 2026].
  - Mozilla Developer Network, 2023. Number: toLocaleString() method. MDN Web Docs. 
    Available at: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString> [Accessed 3 November 2026].
 */



// calculator.js - Fee & Discount Calculator logic for Screen 9
document.addEventListener('DOMContentLoaded', function() {
    const calcForm = document.querySelector('form');
    if (!calcForm) return;

    const checkboxes = calcForm.querySelectorAll('input[type="checkbox"][name="activity"]');
    const peopleInput = calcForm.querySelector('input[name="people"]');
    const buttons = calcForm.querySelectorAll('button');
    const minusBtn = buttons[0];
    const plusBtn = buttons[1];
    const calcBtn = calcForm.querySelector('button[type="button"]:last-of-type') || calcForm.querySelector('button:not([type])');
    const table = calcForm.querySelector('table');

    // Activity prices mapping
    const prices = {
        'ziplining': 750,
        'kayaking': 750,
        'rock-climbing': 750,
        'ultimate-adventure': 1500,
        'family-explorer': 1500,
        'mountain-adventure': 1500,
        'corporate-team': 1500
    };

    if (minusBtn && peopleInput) {
        minusBtn.addEventListener('click', function() {
            let val = parseInt(peopleInput.value) || 1;
            if (val > 1) peopleInput.value = val - 1;
            calculateTotal();
        });
    }

    if (plusBtn && peopleInput) {
        plusBtn.addEventListener('click', function() {
            let val = parseInt(peopleInput.value) || 1;
            peopleInput.value = val + 1;
            calculateTotal();
        });
    }

    if (peopleInput) {
        peopleInput.addEventListener('input', function() {
            if (parseInt(this.value) < 1 || isNaN(parseInt(this.value))) {
                this.value = 1;
            }
            calculateTotal();
        });
    }

    checkboxes.forEach(cb => {
        cb.addEventListener('change', calculateTotal);
    });

    if (calcBtn) {
        calcBtn.addEventListener('click', calculateTotal);
    }

    function calculateTotal() {
        let selectedCount = 0;
        let baseTotal = 0;

        checkboxes.forEach(cb => {
            if (cb.checked) {
                selectedCount++;
                const cost = prices[cb.value] || 750;
                baseTotal += cost;
            }
        });

        const peopleCount = parseInt(peopleInput ? peopleInput.value : 1) || 1;
        let subtotal = baseTotal * peopleCount;
        
        // 10% discount if 4 or more items or people are booked
        let discount = (selectedCount >= 4 || peopleCount >= 4) ? (subtotal * 0.10) : 0;
        let finalTotal = subtotal - discount;

        if (table) {
            const rows = table.querySelectorAll('tr');
            if (rows.length >= 3) {
                rows[0].cells[1].innerHTML = '<strong>R ' + subtotal.toLocaleString() + '</strong>';
                rows[1].cells[1].innerHTML = '<strong>-R ' + discount.toLocaleString() + '</strong>';
                rows[2].cells[1].innerHTML = '<strong>R ' + finalTotal.toLocaleString() + '</strong>';
            }
        }
    }

    // Initial calculation run
    calculateTotal();
    console.log('Calculator script loaded successfully.');
});