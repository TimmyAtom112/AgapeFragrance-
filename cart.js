// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM elements
const cartContainer = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");

// ----------------- FUNCTIONS -----------------

// Update cart count in navbar
function updateCartCount() {
  cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Enable/disable checkout button
function updateCheckoutBtn() {
  checkoutBtn.disabled = cart.length === 0;
}

// Display cart items
function displayCart() {
  cartContainer.innerHTML = "";
  let total = 0;
  
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalDisplay.innerText = "";
    updateCheckoutBtn();
    return;
  }
  
  cart.forEach((item, index) => {
    let price = parseInt(item.price.replace("₦", "").replace(",", ""));
    total += price * item.quantity;
    
    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price}</p>
        </div>
        <div class="cart-controls">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  });
  
  totalDisplay.innerText = "Total: ₦" + total.toLocaleString();
  updateCartCount();
  updateCheckoutBtn();
}

// Change item quantity
function changeQty(index, change) {
  cart[index].quantity += change;
  
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// ----------------- EVENT LISTENERS -----------------

// Checkout button click
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Add items before checking out.");
    return;
  }
  window.location.href = "checkout.html";
});

// ----------------- INITIAL LOAD -----------------
displayCart();

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});