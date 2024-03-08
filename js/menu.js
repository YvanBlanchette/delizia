//! Function to change the price depending on the Pizza size selection
const girareEl = document.querySelector('.menu__girare');
const allungareEl = document.querySelector('.menu__allungare');
const pricePizza01 = document.querySelector('.price-pizza01');
const pricePizza02 = document.querySelector('.price-pizza02');
const pricePizza03 = document.querySelector('.price-pizza03');
const pricePizza04 = document.querySelector('.price-pizza04');
const pricePizza05 = document.querySelector('.price-pizza05');
const pricePizza06 = document.querySelector('.price-pizza06');

girareEl.addEventListener('click', selectGirareSize);
allungareEl.addEventListener('click', selectAllungareSize);

function selectGirareSize() {
  girareEl.classList.add('active');
  allungareEl.classList.remove('active')
  pricePizza01.innerHTML = '21';
  pricePizza02.innerHTML = '27';
  pricePizza03.innerHTML = '26';
  pricePizza04.innerHTML = '24';
  pricePizza04.innerHTML = '25';
  pricePizza06.innerHTML = '28';
}
function selectAllungareSize() {
  girareEl.classList.remove('active');
  allungareEl.classList.add('active');
  pricePizza01.innerHTML = '40';
  pricePizza02.innerHTML = '52';
  pricePizza03.innerHTML = '50';
  pricePizza04.innerHTML = '46';
  pricePizza04.innerHTML = '48';
  pricePizza06.innerHTML = '54';
}




//! Function to open/create the add-to-cart modal
const menuItems = document.querySelectorAll('.menu__item');
let extrasArray = [];
menuItems.forEach(menuItem => {
  menuItem.addEventListener('click', (e) => {
    const menuItemPrice = menuItem.querySelector('.menu__price').textContent;
    const menuItemName = menuItem.querySelector('h4').textContent;
    const menuItemCategory = e.currentTarget.dataset.category;
    const modal = document.createElement('div');
    modal.classList.add('order__modal');
    modal.innerHTML =
      `
    <div class="order__modal-content">
        <h3 class="menu-item__title" data-price="${menuItemPrice}">${menuItemName}</h3>
        <small class="menu-item__category">${menuItemCategory}</small>

        ${menuItemCategory === 'pizza' ? `
        <div class="input-group">
          <label for="extras">Ajouter des extras</label><br>
          <select name="extras" id="menu-item__extras" class="menu-item__extras">
            <option data-unit-price="4" value="Anchois">
              Anchois - $4,00</span>
            </option>
            <option data-unit-price="5" value="Champignons">
              Champignons - $5,00</span>
            </option>
            <option data-unit-price="3" value="Oignons">
              Oignons - $3,00</span>
            </option>
            <option data-unit-price="5" value="Olives">
              Olives - $5,00</span>
            </option>
            <option data-unit-price="4" value="Tomates">
              Tomates - $4,00</span>
            </option>
            <option data-unit-price="4" value="Épinards">
              Épinards - $4,00</span>
            </option>
            <option data-unit-price="9" value="Fromage de Chèvre">
              Fromage de Chèvre - $9,00</span>
            </option>
            <option data-unit-price="8" value="Prosciutto Cotto">
              Prosciutto Cotto - $8,00</span>
            </option>
            <option data-unit-price="9" value="Parmesan">
              Parmesan - $9,00</span>
            </option>
            <option data-unit-price="8" value="Pepperoni">
              Pepperoni - $8,00</span>
            </option>
            <option data-unit-price="7" value="Saucisse">
              Saucisse - $7,00</span>
            </option>
            <option data-unit-price="1" value="Extra Fromage">
              Extra Fromage - $1,00</span>
            </option>
            <option data-unit-price="8" value="Tomates séchées">
              Tomates séchées - $8,00</span>
            </option>
          </select>
          <button class="add-extra-btn btn--secondary">Ajouter</button><br>
          <div class="extras-element"></div>
        </div>` : ''}
        
        <div class="input-group">
          <label for="menu-item__qty">Quantité</label><br>
          <input type="number" name="qty" id="menu-item__qty" min="1" value="1" class="menu-item__qty">
        </div>
        <h4 class="menu-item__price"></h4>
        <div class="menu-items__buttons-wrapper">
          <button class="btn btn--secondary add-btn">Ajouter</button>
          <button onclick="closeModal()" class="close-btn">&#x2715;</button>
        </div>
      </div>
    `;
    document.querySelector('main').appendChild(modal);
    document.body.classList.add('modal-open');

    const qtyInput = document.querySelector('.order__modal .menu-item__qty');
    const addExtraBtn = document.querySelector('.order__modal .add-extra-btn');
    const addBtn = document.querySelector('.order__modal .add-btn');
    const extraInput = document.querySelector('.order__modal .menu-item__extras');


    // Event Listeners
    qtyInput.addEventListener('input', calculatePrice);
    if (addExtraBtn) {
      addExtraBtn.addEventListener('click', () => addExtra(extraInput));
    }
    addBtn.addEventListener('click', addOrder);
    calculatePrice(extraInput);
  })
})




//! Function to close de add-to-cart modal 
function closeModal() {
  const modal = document.querySelector('.order__modal');
  if (modal) {
    modal.remove();
  }
  document.body.classList.remove('modal-open');

}




//! Function to Add extra ingredients on the pizza
function addExtra(extraInput) {
  const extrasEl = document.querySelector('.order__modal .extras-element');

  // Fetch the extra's name from the select option and put in a variable
  const extraName = extraInput.options[extraInput.selectedIndex].value;

  // Fetch the extra's price from the select option dataset and put in a variable
  const extraPrice = extraInput.options[extraInput.selectedIndex].dataset.unitPrice;

  // Create the extra object
  const extraItem = {
    name: extraName,
    price: extraPrice
  }

  // add extra object to the extras array
  extrasArray.push(extraItem);

  // add extra to the DOM
  const extra = document.createElement('span');

  // add the extra's name
  extra.textContent = extraName;

  // add a class to the extra
  extra.classList.add('extra');

  // add the removeExtra Event Listener
  extra.addEventListener('click', (e) => removeExtra(extraInput, e));

  // Add a space between extras if there are already extras in the DOM
  if (extrasEl.childNodes.length > 0) {
    extrasEl.appendChild(document.createTextNode(' '));
  }

  // Add the extra to the extras Element 
  extrasEl.appendChild(extra);

  // Recalculate the price
  calculatePrice(extraInput);
}




//! Function to remove the added extra ingredients on the pizza
function removeExtra(extraInput, e) {

  const extraName = e.target.textContent;

  // Find the index of the extra in the extras array
  const extraIndex = extrasArray.findIndex(extra => extra.name === extraName);

  // Remove the extra from the extras array
  extrasArray.splice(extraIndex, 1);

  // Remove the extra from the DOM
  e.target.remove();

  // Recalculate the total price
  calculatePrice(extraInput);
}




//! Function to calculate total extra ingredients cost
function calculateExtras(extraInput) {
  let total = 0;
  extrasArray.forEach(extra => {
    total += Number(extra.price)
  })
  return total;
}




//! Function to calculate menu item's price
function calculatePrice(extraInput) {
  const titleEl = document.querySelector('.order__modal .menu-item__title');
  const itemPriceEl = document.querySelector('.order__modal .menu-item__price');
  const qtyInput = document.querySelector('.order__modal .menu-item__qty');

  const itemPrice = titleEl.dataset.price;
  const qty = qtyInput.value;
  const totalExtras = calculateExtras(extraInput)
  const price = (qty * itemPrice) + (qty * totalExtras);
  itemPriceEl.innerHTML = `$${price.toFixed(2)}`
}




//! Function to add the menu item to the order
function addOrder() {
  const titleEl = document.querySelector('.order__modal .menu-item__title');
  const qtyInput = document.querySelector('.order__modal .menu-item__qty');
  const itemPriceEl = document.querySelector('.order__modal .menu-item__price');
  const itemCategoryEl = document.querySelector('.order__modal .menu-item__category');

  const itemName = capitalize(titleEl.textContent);
  const itemQty = parseInt(qtyInput.value);
  const itemCategory = capitalize(itemCategoryEl.textContent);
  const unitPrice = Number(titleEl.dataset.price);

  // Converting the itemPrice to a number using parseFloat
  const itemPrice = parseFloat(itemPriceEl.innerHTML.replace('$', ''));

  const extras = extrasArray.map(extra => extra.name);

  // Check if the menu item already exists in the order
  const existingMenuItemIndex = order.findIndex(item => (
    item.name === itemName &&
    item.category === itemCategory &&
    JSON.stringify(item.extras) === JSON.stringify(extras)
  ));

  if (existingMenuItemIndex !== -1) {
    // If the menu item exists, update the quantity
    order[existingMenuItemIndex].qty += itemQty;
  } else {
    // If the menu item doesn't exist, add it to the order
    const menuItem = {
      id: crypto.randomUUID(),
      name: itemName,
      category: itemCategory,
      qty: itemQty,
      unitPrice: unitPrice,
      totalPrice: itemPrice,
      extras: extras
    };

    order.push(menuItem);
  }

  localStorage.setItem('order', JSON.stringify(order));
  updateCart();
  closeModal();
}


