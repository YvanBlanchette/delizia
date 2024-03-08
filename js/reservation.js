//! Function to switches page images and styles depending on dining area selection
const bookingImgContainer = document.querySelector('.booking__img-container');
const restaurantBtn = document.querySelector('.restaurant-btn');
const terrasseBtn = document.querySelector('.terrasse-btn');
const restaurantRadioBtn = document.querySelector('#radioBtn-restaurant');
const terrasseRadioBtn = document.querySelector('#radioBtn-terrasse');
const restaurantLegend = document.querySelector('.restaurant-legend');
const terrasseLegend = document.querySelector('.terrasse-legend');

// Events listeners
restaurantBtn.addEventListener('click', selectRestaurant);
restaurantRadioBtn.addEventListener('input', selectRestaurant);
terrasseBtn.addEventListener('click', selectTerrasse);
terrasseRadioBtn.addEventListener('input', selectTerrasse);

// Functions
function selectRestaurant() {
  terrasseBtn.classList.remove('active');
  bookingImgContainer.style.backgroundImage = 'url(./assets/images/booking-restaurant.jpg)';
  restaurantBtn.classList.add('active');
  restaurantRadioBtn.checked = true;
  document.body.classList.add('restaurant');
  document.body.classList.remove('terrasse');
  terrasseLegend.classList.add('hide');
  restaurantLegend.classList.remove('hide');
}

function selectTerrasse() {
  bookingImgContainer.style.backgroundImage = 'url(./assets/images/booking-terrasse.jpg)';
  restaurantBtn.classList.remove('active');
  terrasseBtn.classList.add('active');
  terrasseRadioBtn.checked = true;
  document.body.classList.add('terrasse');
  document.body.classList.remove('restaurant');
  terrasseLegend.classList.remove('hide');
  restaurantLegend.classList.add('hide');
}




//! Function to set min reservation date to today
document.querySelector('#date').min = new Date().toLocaleDateString('fr-ca');




//! Function to auto-format phone number
const phoneInputField = document.querySelector('#phone');

function phoneNumberFormatter() {
  const formattedInputValue = formatPhoneNumber(phoneInputField.value);
  phoneInputField.value = formattedInputValue;
}

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
phoneInputField.addEventListener('input', phoneNumberFormatter);




//! Function to auto-format postal codes
const zipcodeInputField = document.querySelector('#delivery_zipcode');

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
