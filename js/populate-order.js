//! Function to populate local storage for the example
document.addEventListener("DOMContentLoaded", populateLS);
function populateLS() {
  let preOrder = [
    {
      id: crypto.randomUUID(),
      name: capitalize('ZUPPA DI GIORNO'),
      category: capitalize('antipasti'),
      qty: 2,
      unitPrice: 10,
      totalPrice: 20,
      extras: []
    },
    {
      id: crypto.randomUUID(),
      name: capitalize('BRUSCHETTA DI CASA'),
      category: capitalize('antipasti'),
      qty: 1,
      unitPrice: 10,
      totalPrice: 10,
      extras: []
    },
    {
      id: crypto.randomUUID(),
      name: capitalize('INSALATA ALLA CESARE'),
      category: capitalize('antipasti'),
      qty: 1,
      unitPrice: 14,
      totalPrice: 14,
      extras: []
    },
    {
      id: crypto.randomUUID(),
      name: capitalize('ROSATA CON PROSCIUTTO'),
      category: capitalize('pasta'),
      qty: 1,
      unitPrice: 26,
      totalPrice: 26,
      extras: []
    },
    {
      id: crypto.randomUUID(),
      name: capitalize('CARNIVORO'),
      category: capitalize('pizza'),
      qty: 1,
      unitPrice: 28,
      totalPrice: 28,
      extras: []
    },
    {
      id: crypto.randomUUID(),
      name: capitalize('TIRAMISU'),
      category: capitalize('dolce'),
      qty: 1,
      unitPrice: 18,
      totalPrice: 36,
      extras: []
    },
    {
      id: crypto.randomUUID(),
      name: capitalize('GELATO DEL GIORNO'),
      category: capitalize('dolce'),
      qty: 1,
      unitPrice: 14,
      totalPrice: 14,
      extras: []
    },
    {
      id: crypto.randomUUID(),
      name: capitalize('CAPPUCINO'),
      category: capitalize('caffe'),
      qty: 2,
      unitPrice: 8,
      totalPrice: 8,
      extras: []
    },
    {
      id: crypto.randomUUID(),
      name: capitalize('LATTE'),
      category: capitalize('caffe'),
      qty: 1,
      unitPrice: 8,
      totalPrice: 8,
      extras: []
    }
  ];
  localStorage.setItem('order', JSON.stringify(preOrder));
}