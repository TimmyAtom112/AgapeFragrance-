let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
  {name:"Global Body Spray", price:"₦3,500", category:"Men", image:"img1.jpg"},
  {name:"Karis Body Spray", price:"₦4,500", category:"Unisex", image:"img2.jpg"},
  {name:"50ml Matelot Perfumes ", price:"₦8,500", category:"Unisex", image:"img3.2.jpg"},
  {name:"OUD Al layl", price:"₦14,000", category:"Men", image:"img4.jpg"},
  {name:"Storm Elixir Spray", price:"₦3,000", category:"Men", image:"img5.jpg"},
  {name:"Confetti Body Spray", price:"₦3,500", category:"Unisex", image:"img6.jpg"},
  {name:"Yara body Spray", price:"₦3,500", category:"Women", image:"img7.jpg"},
  {name:"T&D body spray", price:"₦3,000", category:"Women", image:"img8.jpg" },
  {name:"50ml Smartworld Perfume", price:"₦4,500", category:"Unisex", image:"img12.jpg"},
  {name:"100ml QAED Al Fursan", price:"₦26,000", category:"Unisex", image:"img9.jpg"},
  {name:"Vintage Radio Deodorant Spray", price:"₦3,500", category:"Women", image:"img10.jpg"},
  {name:"Mouth wash", price:"₦250", category:"Unisex", image:"img11.jpg"},
  {name:"Sheet Mask", price:"₦1,000", category:"Unisex", image:"img13.jpg"},
  {name:"50ml Mosuf Monogotas Fresa", price:"₦8,500", category:"Women", image:"img14.jpg"},
  {name:"Unisex Combo", price:"₦12,500", category:"Unisex", image:"img15.jpg"},
  {name: "50ml Rave Parfum Spray",price:"₦8,500", category:"Women", image:"img16.jpg" },
  {name: "GK men Perfume", price:"₦3,000", category:"Men", image:"img17.jpg" },
  { name: "Mini Cocktail Perfume", price:"₦4,500", category:"Unisex", image:"img18.jpg"},
  {name: "50ml Ameer Al Oud",price:"₦10,000", category:"Women", image:"img20.jpg" },
  {name: "Tag Rollon", price:"₦1,500", category:"Unisex", image:"img21.jpg" },
  {name: "Fuse Spray", price:"3,000", category:"Men", image:"img23.jpg"},
  { name: "30ml Cocktail Intense Perfume", price:"₦5,000", category:"Women", image:"img22.jpg"}
];

const shopContainer = document.getElementById("shop-products");
const categoryFilter = document.getElementById("category-filter");

// UPDATE CART COUNT
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}
updateCartCount();

// DISPLAY PRODUCTS
function displayProducts(filter="All"){
  shopContainer.innerHTML = "";
  let filtered = products.filter(p => filter==="All" || p.category===filter);

  filtered.forEach((item)=>{
    shopContainer.innerHTML += `
      <div class="product-card">
        <img src="${item.image}">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button>Add to Cart</button>
      </div>
    `;
  });

  // ADD TO CART BUTTONS
  const buttons = document.querySelectorAll(".product-card button");
  buttons.forEach((btn, index)=>{
    btn.addEventListener("click", ()=>{
      const product = filtered[index];
      let existing = cart.find(i=>i.name===product.name);
      if(existing) existing.quantity += 1;
      else {
        product.quantity = 1;
        cart.push(product);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(product.name + " added to cart 🛒");
    });
  });
}

displayProducts();

// FILTER CHANGE
categoryFilter.addEventListener("change", ()=>{
  displayProducts(categoryFilter.value);
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});