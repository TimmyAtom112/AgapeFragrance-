// GET CART FROM STORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// UPDATE CART COUNT
function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

updateCartCount();

// ADD TO CART FUNCTION
function addToCart(product) {
  // Check if product already exists
  let existing = cart.find(item => item.name === product.name);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  
  alert(product.name + " added to cart 🛒");
}

// SELECT ALL BUTTONS
const buttons = document.querySelectorAll(".product-card button");

// LOOP THROUGH BUTTONS
buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    
    // GET PRODUCT DETAILS FROM HTML
    const card = btn.parentElement;
    
    const product = {
      name: card.querySelector("h3").innerText,
      price: card.querySelector("p").innerText,
      image: card.querySelector("img").src
    };
    
    addToCart(product);
  });
});


const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});