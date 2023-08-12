// Sample product data
const products = [
  { id: 1, title: 'organic durian', image: 'https://i.ibb.co/wKtWyv8/product-1.png', price: 11 },
  { id: 2, title: 'organic tomato', image: 'https://i.ibb.co/S7xCqXJ/product-2.png', price: 15 },
  { id: 3, title: 'organic orange', image: 'https://i.ibb.co/GJ5S2qB/product-3.png', price: 15 },
  { id: 4, title: 'natural milk', image: 'https://i.ibb.co/Pxv96y3/product-4.png', price: 15 },
  { id: 5, title: 'organic grapes', image: 'https://i.ibb.co/VWQNh2f/product-5.png', price: 15 },
  { id: 6, title: 'organic apple', image: 'https://i.ibb.co/frxM7Wm/product-7.png', price: 15 },
  { id: 7, title: 'natural almonds', image: 'https://i.ibb.co/FHqRSq8/product-6.png', price: 15 },
  { id: 8, title: 'natural butter', image: 'https://i.ibb.co/mHS2cKM/product-8.png', price: 15 },
  { id: 9, title: 'organic carrot', image: 'https://i.ibb.co/PZ1gYNX/product-9.png', price: 15 },
];





// Function to generate product cards
function generateProductCards() {
  const productGrid = document.querySelector('.product-grid');
  
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-title">${product.title}</div>
      <div class="product-quantity">
        <span>Quantity:</span>
        <input type="number" min="1" value="1" class="product-quantity-input">
      </div>
      <button class="cart-btn" data-product-id="${product.id}" data-product-title="${product.title}" data-product-price="${product.price}">
        Add to Cart
      </button>
    `;
    
    productGrid.appendChild(card);
  });
}

// Initialize product cards
generateProductCards();

// Add to cart functionality
const cartBtns = document.querySelectorAll('.cart-btn');
const totalCountSpan = document.querySelector('.total-count');

let cart = [];

cartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const productId = btn.getAttribute('data-product-id');
    const productTitle = btn.getAttribute('data-product-title');
    const productPrice = parseFloat(btn.getAttribute('data-product-price'));
    const productQuantity = parseInt(btn.previousElementSibling.querySelector('.product-quantity-input').value);

    const existingCartItem = cart.find(item => item.id === productId);
    if (existingCartItem) {
      existingCartItem.quantity += productQuantity;
    } else {
      cart.push({ id: productId, title: productTitle, price: productPrice, quantity: productQuantity });
    }

    updateCart();
  });
});

function updateCart() {
  // Update cart notification count
  totalCountSpan.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}




// Update cart modal with current cart items
const cartModalButton = document.querySelector('.cart-btn');
const cartModal = document.getElementById('cartModal');
const cartItemsList = document.querySelector('.cart-items');
const cartTotalSpan = document.querySelector('.cart-total');

function updateCartModal() {
  cartItemsList.innerHTML = '';
  cart.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `${item.title} - Quantity: ${item.quantity}`;
    cartItemsList.appendChild(cartItem);
  });

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  cartTotalSpan.textContent = `$${totalPrice.toFixed(2)}`;
}

// Open cart modal when the "Cart" button is clicked
cartModalButton.addEventListener('click', () => {
  updateCartModal();
  $(cartModal).modal('show'); // Use jQuery to open the modal
});


// Close cart modal when the "Close" button is clicked
const closeModalButton = document.querySelector('.close');
closeModalButton.addEventListener('click', () => {
  $(cartModal).modal('hide'); // Use jQuery to close the modal
});

// Checkout functionality
const checkoutButton = document.querySelector('.checkout-btn');
checkoutButton.addEventListener('click', () => {
  // Perform checkout logic here
  alert('Checkout functionality would be implemented here.');
  cart = []; // Clear the cart after checkout
  updateCart();
  updateCartModal();
  $(cartModal).modal('hide'); // Close the modal after checkout
});



