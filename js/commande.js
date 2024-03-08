const sousTotalEl = document.querySelector('.sous-total');
const taxesEl = document.querySelector('.taxes');
const totalEl = document.querySelector('.total');


//! Function to update the Dom with the order from local storage
order.forEach(item => {
  const menuItem = document.createElement('tr');
  menuItem.setAttribute('data-id', item.id);
  menuItem.innerHTML =
    `
  <td class="order__col-name">${item.name} (${item.category})</td>
  <td class="order__col-price">$<span data-unit-price="${item.unitPrice}" class="item-price">${item.totalPrice}</span></td>
  <td class="order__col-quantity">
     <input class="item-quantity" type="number" min="1" value="${item.qty}">
     <button class="delete-btn">&#x2715;</button>
  </td>
  `;

  if (item.category === 'Antipasti') {
    const appetizersTable = document.querySelector('.appetizers-table');
    appetizersTable.appendChild(menuItem);
  } else if (item.category === 'Pasta' || item.category === 'Pizza') {
    const mealsTable = document.querySelector('.meals-table');
    mealsTable.appendChild(menuItem);
  } else if (item.category === 'Dolce') {
    const dessertsTable = document.querySelector('.desserts-table');
    dessertsTable.appendChild(menuItem);
  } else {
    const drinksTable = document.querySelector('.drinks-table');
    drinksTable.appendChild(menuItem);
  }
})

// Update order items prices
updateItemPrice();


// Remove items from order
const deleteBtns = document.querySelectorAll('.delete-btn');

deleteBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    // Select closest tr
    const item = e.target.closest('tr');

    // Get the dataset id
    const itemId = item.dataset.id;

    // Find the item's index
    const index = order.findIndex(item => item.id === itemId);

    // Remove from the order
    order.splice(index, 1);

    // Update the localStorage
    localStorage.setItem('order', JSON.stringify(order));

    // Remove from the DOM
    item.remove();

    // Update the prices
    updateItemPrice();
  })
})






const itemsQuantity = document.querySelectorAll('.item-quantity');


itemsQuantity.forEach((item) => {
  item.addEventListener('input', (e) => {
    // Select closest tr
    const row = e.target.closest('tr');

    // Get the dataset id
    const itemId = row.dataset.id;

    // Find the item's index
    const index = order.findIndex(element => element.id === itemId);

    // Set the value to the item's quantity
    order[index].qty = item.value;

    // Update the localStorage
    localStorage.setItem('order', JSON.stringify(order));

    // Update prices
    updateItemPrice()
  });
});




function updateItemPrice() {
  const itemsQuantity = document.querySelectorAll('.item-quantity');
  const itemsPrices = document.querySelectorAll('.item-price');
  let subTotal = 0;
  let taxes = 0;
  let total = 0;

  itemsPrices.forEach((item, index) => {
    const unitPrice = parseFloat(item.dataset.unitPrice) || 0;
    const itemQuantity = itemsQuantity[index].value;
    const price = unitPrice * itemQuantity
    item.textContent = price.toFixed(2);
    subTotal += price;
  })

  // calculate the taxes
  taxes = subTotal * 0.14975;

  // Adding the taxes to the sub total
  total = subTotal + taxes;

  // updating the DOM elements
  sousTotalEl.textContent = `$${subTotal.toFixed(2)}`;
  taxesEl.textContent = `$${taxes.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;

  updateOrderSummary(subTotal, taxes, total);
  updateCart()
}


function updateOrderSummary(subTotal, taxes, total) {
  let orderSummary = JSON.parse(localStorage.getItem('orderSummary')) || {};
  orderSummary.subTotal = subTotal;
  orderSummary.taxes = taxes;
  orderSummary.total = total;

  localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
}