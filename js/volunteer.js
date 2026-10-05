/* ==========================================================================
   HomeFur All — volunteer.js
   --------------------------------------------------------------------------
   1. Dynamic Shelter Datalist (Search + Dropdown)
   2. Donation Custom Amount & Payment Toggle
   3. Checkbox Group Validation (Availability & Interest)
   4. Form Submissions & Status Handling
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ---- 1. Dynamic Shelter Input / Select Population ---- */
  const shelterInput = document.getElementById('target-shelter');
  const datalist = document.getElementById('shelters-datalist');

  if (shelterInput && typeof shelters !== 'undefined') {
    const isMobile = window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window);

    if (isMobile) {
      // Create native <select> picker directly with shelter options
      const select = document.createElement('select');
      select.id = shelterInput.id;
      select.className = shelterInput.className;
      select.name = shelterInput.name;

      let optionsHtml = `<option value="">Select or type shelter...</option>
        <option value="No preference (Any shelter in need)">No preference (Any shelter in need)</option>`;

      shelters.forEach(s => {
        const value = `${s.name} (${s.city}, ${s.province})`;
        optionsHtml += `<option value="${value}">${value}</option>`;
      });

      select.innerHTML = optionsHtml;
      shelterInput.replaceWith(select);
    } else if (datalist) {
      // Standard datalist for desktop
      datalist.innerHTML = '';
      shelters.forEach(s => {
        const option = document.createElement('option');
        option.value = `${s.name} (${s.city}, ${s.province})`;
        datalist.appendChild(option);
      });
    }
  }

  /* ---- 2. Donation Custom Amount Toggle ---- */
  const amountRadios = document.querySelectorAll('input[name="amount"]');
  const customAmountField = document.getElementById('custom-amount-field');
  const customAmountInput = document.getElementById('custom-amount');

  if (amountRadios.length > 0 && customAmountField && customAmountInput) {
    amountRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'custom') {
          customAmountField.hidden = false;
          customAmountInput.required = true;
          customAmountInput.focus();
        } else {
          customAmountField.hidden = true;
          customAmountInput.required = false;
          customAmountInput.value = '';
        }
      });
    });
  }

  /* ---- 3. Checkbox Group Validation ---- */
  const volunteerForm = document.getElementById('volunteer-form');

  if (volunteerForm) {
    // Clear error messages on checkbox selection
    volunteerForm.querySelectorAll('.check-group[data-require-one]').forEach(group => {
      group.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          const checked = group.querySelectorAll('input[type="checkbox"]:checked');
          const errorMsg = group.querySelector('.form-error');
          if (checked.length > 0 && errorMsg) {
            errorMsg.hidden = true;
          }
        });
      });
    });

    volunteerForm.addEventListener('submit', (e) => {
      const groups = volunteerForm.querySelectorAll('.check-group[data-require-one]');
      let isValid = true;

      groups.forEach(group => {
        const checked = group.querySelectorAll('input[type="checkbox"]:checked');
        const errorMsg = group.querySelector('.form-error');

        if (checked.length === 0) {
          isValid = false;
          if (errorMsg) errorMsg.hidden = false;
        } else if (errorMsg) {
          errorMsg.hidden = true;
        }
      });

      if (!isValid) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }
});