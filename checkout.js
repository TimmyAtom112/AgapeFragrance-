// ==========================
// CART DATA
// ==========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================
// DOM ELEMENTS
// ==========================
const cartCount = document.getElementById("cart-count");
const checkoutForm = document.getElementById("checkout-form");
const orderSummary = document.getElementById("order-summary");

const payButton = document.getElementById("pay-now-btn");
const fallback = document.getElementById("payment-fallback");
const whatsappLink = document.getElementById("whatsapp-link");
const banner = document.getElementById("payment-banner");

// ==========================
// SETTINGS
// ==========================
let paystackAvailable = false;
const WHATSAPP_NUMBER = "+2349025612751";

// ==========================
// ORDER ID GENERATOR
// ==========================
function generateOrderID() {
  const prefix = "AGP";

  const date = new Date();
  const formattedDate =
    date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");

  const random = Math.floor(100000 + Math.random() * 900000);

  return `${prefix}-${formattedDate}-${random}`;
}

// ==========================
// UPDATE CART COUNT
// ==========================
if (cartCount) {
  cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ==========================
// RENDER ORDER SUMMARY
// ==========================
function renderOrderSummary() {
  if (cart.length === 0) {
    orderSummary.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;

  let html = cart.map(item => {
    let price = parseInt(item.price.replace("₦", "").replace(/,/g, ""));
    let subtotal = price * item.quantity;
    total += subtotal;

    return `<p>${item.name} x${item.quantity} - ₦${subtotal.toLocaleString()}</p>`;
  }).join("");

  html += `<h3>Total: ₦${total.toLocaleString()}</h3>`;

  orderSummary.innerHTML = html;
}

renderOrderSummary();

// ==========================
// BUILD WHATSAPP MESSAGE
// ==========================
function buildWhatsAppMessage(orderID, name, phone, address, total) {
  let itemsText = cart.map(item =>
    `${item.name} x${item.quantity}`
  ).join(", ");

  return encodeURIComponent(
`Hello AgapeFragrance,
Order ID: ${orderID}
Name: ${name}
Phone: ${phone}
Address: ${address}
Items: ${itemsText}
Total: ₦${total.toLocaleString()}`
  );
}

// ==========================
// UPDATE UI STATE
// ==========================
function updateUI() {
  if (paystackAvailable) {
    banner.style.display = "none";
    payButton.style.display = "block";
    fallback.style.display = "none";
  } else {
    banner.style.display = "block";
    payButton.style.display = "none";
    fallback.style.display = "block";
  }
}

updateUI();

// ==========================
// SHOW WHATSAPP FALLBACK
// ==========================
function showWhatsAppFallback(orderID, name, phone, address, total) {

  payButton.style.display = "none";
  fallback.style.display = "block";

  let message = buildWhatsAppMessage(orderID, name, phone, address, total);

  whatsappLink.href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

// ==========================
// FORM SUBMIT
// ==========================
checkoutForm.addEventListener("submit", function(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // USER DATA
  const name = this.querySelector('input[placeholder="Full Name"]').value;
  const phone = this.querySelector('input[placeholder="Phone Number"]').value;
  const address = this.querySelector('input[placeholder="Delivery Address"]').value;

  const email = phone + "@example.com";

  // ORDER ID (GLOBAL FOR THIS CHECKOUT)
  const orderID = generateOrderID();

  // TOTAL CALCULATION
  let total = 0;
  cart.forEach(item => {
    let price = parseInt(item.price.replace("₦", "").replace(/,/g, ""));
    total += price * item.quantity;
  });

  let amountKobo = total * 100;

  // ==========================
  // PAYSTACK FLOW
  // ==========================
  if (paystackAvailable) {

    payButton.onclick = function() {

      try {
        var handler = PaystackPop.setup({
          key: "pk_test_863fa7985e5f1b53c822daad74bec9220899cd75",
          email: email,
          amount: amountKobo,
          currency: "NGN",
          ref: orderID,

          metadata: {
            custom_fields: [
              {
                display_name: "Order ID",
                variable_name: "order_id",
                value: orderID
              },
              {
                display_name: "Phone Number",
                variable_name: "phone",
                value: phone
              },
              {
                display_name: "Address",
                variable_name: "address",
                value: address
              }
            ]
          },

          callback: function(response) {

            alert(`Payment successful!\nOrder ID: ${orderID}`);

            localStorage.removeItem("cart");
            cart = [];

            if (cartCount) cartCount.innerText = 0;

            orderSummary.innerHTML =
              `<h3>✅ Order Confirmed</h3>
               <p>Order ID: ${orderID}</p>
               <p>Reference: ${response.reference}</p>`;

            payButton.style.display = "none";
          },

          onClose: function() {
            showWhatsAppFallback(orderID, name, phone, address, total);
          }
        });

        handler.openIframe();

      } catch (err) {
        showWhatsAppFallback(orderID, name, phone, address, total);
      }
    };

  } else {
    // DIRECT WHATSAPP FLOW
    showWhatsAppFallback(orderID, name, phone, address, total);
  }
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});