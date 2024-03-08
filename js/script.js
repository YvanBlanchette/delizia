//! Fetching order from local storage and putting it into a variable
let order = JSON.parse(localStorage.getItem('order')) || [];



//! Function to update the cart
const carts = document.querySelectorAll('.cart');
function updateCart() {
  carts.forEach(cart => {
    let cartNumber = 0;

    order.forEach(item => {
      let quantity = Number(item.qty);
      cartNumber += quantity
    });

    if (cartNumber <= 0) {
      cart.style.display = 'none';
    }
    cart.textContent = cartNumber;
  })
}

updateCart()



//! Function to change the navbar style on scroll 
const navbar = document.querySelector('#navbar');

window.addEventListener('scroll', scrollNav);

function scrollNav() {
  if (window.scrollY > navbar.offsetHeight) {
    navbar.classList.add('scroll');
  } else {
    navbar.classList.remove('scroll');
  }
}



//! Function to toggle the Mobile-nav depending on screen size
const navToggle = document.querySelector('.navbar__toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavItem = document.querySelector('.mobile-nav__item');
const mobileNavLink = document.querySelector('.mobile-nav__link');

navToggle.addEventListener('click', navigationToggle);

mobileNavLink.addEventListener('click', navigationToggle)

function navigationToggle() {
  mobileNav.classList.toggle('active');
  navToggle.classList.toggle('active');
  mobileNavItem.classList.toggle('bounceInRight');
}



//! Utility function to capitalize strings
function capitalize(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
}




