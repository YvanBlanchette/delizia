//! Function to display or hide the paiement input fields
const paiementInput = document.querySelector('.paiement');
const paiementMethod = document.querySelector('.paiement-method');

paiementInput.addEventListener('change', () => {
  const selectedOption = paiementInput.value;
  console.log(selectedOption);
  if (selectedOption === 'online') {
    paiementMethod.classList.remove('hide');
    enablePaiementFields();
  } else {
    paiementMethod.classList.add('hide');
    disablePaiementFields();
  }
});


//! Functions to change the filedset depending on the order type
const takeoutBtn = document.querySelector('.takeout-btn');
const deliveryBtn = document.querySelector('.delivery-btn');
const fieldset = document.querySelector('fieldset');
const orderType = document.querySelector('#orderType');

takeoutBtn.addEventListener('click', selectTakeout);
deliveryBtn.addEventListener('click', selectDelivery);

function selectTakeout() {
  deliveryBtn.classList.remove('active');
  takeoutBtn.classList.add('active');
  document.body.classList.remove('delivery');
  fieldset.classList.remove('delivery');
  document.body.classList.add('takeout');
  fieldset.classList.add('takeout');
  disableAddressFields();
  orderType.selectedIndex = 0;
}

function selectDelivery() {
  takeoutBtn.classList.remove('active');
  deliveryBtn.classList.add('active');
  document.body.classList.remove('takeout');
  document.body.classList.add('delivery');
  fieldset.classList.remove('takeout');
  fieldset.classList.add('delivery');
  enableAddressFields();
  orderType.selectedIndex = 1;

}




//! Functions to disable/require fields depending on the order type
const deliveryAddressFields = document.querySelectorAll('.delivery-address-field');
const paiementFields = document.querySelectorAll('.paiement-field');

function disableAddressFields() {
  deliveryAddressFields.forEach(field => {
    field.disabled = true;
    field.required = false;
  })
}

function enableAddressFields() {
  deliveryAddressFields.forEach(field => {
    field.disabled = false;
    field.required = true;
  })
}

function disablePaiementFields() {
  paiementFields.forEach(field => {
    field.disabled = true;
    field.required = false;
  })
}

function enablePaiementFields() {
  paiementFields.forEach(field => {
    field.disabled = false;
    field.required = true;
  })
}




//! Function to update the Dom with the order from local storage
// Loop through the menu-items
order.forEach(item => {
  // Create tr element
  const menuItem = document.createElement('tr');

  // Add data attribute
  menuItem.setAttribute('data-id', item.id);

  // Insert HTML in the tr element
  menuItem.innerHTML =
    `
  <td class="order__col-name">${item.name} (${item.category})</td>
    <td class="order__col-quantity">${item.qty}
  </td>
  <td class="order__col-price">$<span class="item-price">${item.totalPrice.toFixed(2)}</span></td>
  `;

  // Select tbody
  const tableBody = document.querySelector('table tbody');

  // Append tr to tbody
  tableBody.appendChild(menuItem);
})




//! Function to update the orderSummary from local storage
// fetch orderSummary from localStorage
const orderSummary = JSON.parse(localStorage.getItem('orderSummary')) || {};

const subTotal = orderSummary.subTotal
const taxes = orderSummary.taxes
const total = orderSummary.total

// Add subtotal, taxes and total to the DOM
document.querySelector('.subtotal-element').textContent = subTotal.toFixed(2);
document.querySelector('.taxes-element').textContent = taxes.toFixed(2);
document.querySelector('.total-element').textContent = total.toFixed(2);




//! Function to auto-format phone number
const phoneInputField = document.querySelector('#phone');

function formatPhoneNumber(value) {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
}

// Formatter
function phoneNumberFormatter() {
  const formattedInputValue = formatPhoneNumber(phoneInputField.value);
  phoneInputField.value = formattedInputValue;
}

// Event listener
phoneInputField.addEventListener('input', phoneNumberFormatter);




//! Function to auto-format postal codes
const zipcodeInputField = document.querySelector('#zipcode');

function formatZipcode(value) {
  if (!value) {
    return '';
  }

  // Remove non-alphanumeric characters
  const cleanedValue = value.toUpperCase().replace(/\W/g, '');

  if (cleanedValue.length < 6) {
    return cleanedValue;
  } else {
    // Format the cleaned value with a space after the 3rd character
    const formattedValue = cleanedValue.replace(/(.{3})(.+)/, '$1 $2');
    return formattedValue;
  }
}

// Formatter
function zipcodeFormatter() {
  const formattedInputValue = formatZipcode(zipcodeInputField.value);
  zipcodeInputField.value = formattedInputValue;
}
// Event listener
zipcodeInputField.addEventListener('input', zipcodeFormatter);




//! Function to auto-format credit card exp date
const expDateInputField = document.querySelector('#exp-date');

function formatExpDate(value) {
  if (!value) {
    return '';
  }

  // Remove non-alphanumeric characters
  const cleanedValue = value.replace(/\D/g, '');

  if (cleanedValue.length < 4) {
    return cleanedValue;
  } else {
    // Format the cleaned value with a - after the 2nd character
    const formattedValue = cleanedValue.replace(/(.{2})(.+)/, '$1 - $2');
    return formattedValue;
  }
}

// Formatter
function expDateFormatter() {
  const formattedInputValue = formatExpDate(expDateInputField.value);
  expDateInputField.value = formattedInputValue;
}

// Event listener
expDateInputField.addEventListener('input', expDateFormatter);




//! Function to auto-format credit card numbers
const creditCardInputField = document.querySelector('#card-number');

function formatCreditCard(value) {
  if (!value) {
    return '';
  }
  // Remove non-alphanumeric characters
  const cleanedValue = value.replace(/\D/g, '');
  // Check if the cleaned value is 15 or 16 digits
  if (cleanedValue.length === 15) {
    // Format the cleaned value for 15 digits as 4-6-5
    const formattedValue = cleanedValue.replace(/(.{4})(.{6})(.{5})/, '$1 $2 $3');
    return formattedValue.trim();
  } else if (cleanedValue.length >= 16) {
    // Format the cleaned value for 16 digits as 4-4-4-4
    const formattedValue = cleanedValue.replace(/(.{4})(.{4})(.{4})(.{4})/, '$1 $2 $3 $4');
    return formattedValue.trim();
  } else {
    // Return the cleaned value as is for other lengths
    return cleanedValue;
  }
}

// Formatter
function creditCardFormatter() {
  const formattedInputValue = formatCreditCard(creditCardInputField.value);
  creditCardInputField.value = formattedInputValue;
}

// Event listener
creditCardInputField.addEventListener('input', () => {
  creditCardFormatter();
  changeCreditCardIcon()
});




//! Function to change the credit card icon depending on the credit card number
function changeCreditCardIcon() {
  const creditCardIconWrapper = document.querySelector('.card-icon-wrapper');
  const firstCreditCardNumber = creditCardInputField.value.slice(0, 1);
  if (firstCreditCardNumber === '3') {
    creditCardIconWrapper.innerHTML = `<img src="./assets/images/cc-amex.svg"
    alt = "credit card icon" > `;
  } else if (firstCreditCardNumber === '4') {
    creditCardIconWrapper.innerHTML = `<img src="./assets/images/cc-visa.svg"
    alt = "credit card icon" > `;
  } else if (firstCreditCardNumber === '5') {
    creditCardIconWrapper.innerHTML = `<img src="./assets/images/cc-mastercard.svg"
    alt = "credit card icon" > `;
  } else {
    creditCardIconWrapper.innerHTML = `<img src="./assets/images/cc-credit-card.svg"
    alt = "credit card icon" > `;
  }
}