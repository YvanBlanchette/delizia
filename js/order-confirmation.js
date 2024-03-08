//! Function to create a new time of order
const date = new Date();
const hours = formatTime(date.getHours());
const minutes = formatTime(date.getMinutes());

function formatTime(time) {
  if (time < 10) {
    return '0' + time
  } else {
    return time
  }
}


//! Function to fetch the data from URL and use it in the response
function getUrlInfo() {
  const data = window.location.search.substring(1).split("&");
  const informationsFormulaire = {};

  for (let i = 0; i < data.length; i++) {
    const [key, value] = data[i].split("=");
    informationsFormulaire[key] = decodeURIComponent(value);
  }
  return informationsFormulaire;
}

getUrlInfo();

const informationsFormulaire = getUrlInfo();

// Select the elements in the DOM
const takeout = document.querySelector('.order-takeout');
const delivery = document.querySelector('.order-delivery');

// Display or hide the right order confirmation message
if (informationsFormulaire.orderType === 'takeout') {
  takeout.classList.remove('hide');
  delivery.classList.add('hide');
  displayTakeoutConfirmation();
} else {
  takeout.classList.add('hide');
  delivery.classList.remove('hide');
  displayDeliveryConfirmation();
}




//! Function to display the delivery order confirmation
function displayDeliveryConfirmation() {
  document.querySelectorAll('.name').forEach(name => {
    name.textContent = `${formatData(informationsFormulaire['first-name'])} ${formatData(informationsFormulaire['last-name'])}` || '';
  })

  document.querySelector('.address').textContent = formatData(informationsFormulaire.address) || '';

  document.querySelector('.city').textContent = formatData(informationsFormulaire.city) || '';

  document.querySelector('.province').textContent = formatData(informationsFormulaire.province) || '';

  document.querySelector('.zipcode').textContent = formatData(informationsFormulaire.zipcode) || '';

  document.querySelector('.deliveryTime').textContent = `${hours + 1}:${minutes}`;
}




//!Function to display the takeout order confirmation
function displayTakeoutConfirmation() {
  document.querySelectorAll('.name').forEach(name => {
    name.textContent = `${formatData(informationsFormulaire['first-name'])} ${formatData(informationsFormulaire['last-name'])}` || '';
  })

  document.querySelector('.takeoutTime').textContent = `${hours}:${minutes + 20}`;
}

function formatData(string) {
  return string.split('+').join(' ');
}
