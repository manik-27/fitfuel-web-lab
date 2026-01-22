/* =====================================================
   CART DATA
   ===================================================== */
let cart = JSON.parse(localStorage.getItem("fitfuel_cart")) || [];

/* =====================================================
   UPDATE CART COUNT (Navbar icon)
   ===================================================== */
function updateCartCount() {
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count += cart[i].qty;
  }
  let el = document.getElementById("cart-count");
  if (el) el.innerText = count;
}
updateCartCount();

/* =====================================================
   ADD TO CART FUNCTION
   ===================================================== */
function addToCart(name, price) {
  let found = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].qty += 1;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.push({ name: name, price: price, qty: 1 });
  }

  localStorage.setItem("fitfuel_cart", JSON.stringify(cart));
  updateCartCount();
}

/* =====================================================
   NAVIGATION FUNCTIONS
   ===================================================== */
function goToCart() {
  window.location.href = "116_cart.html";
}

function goToMenu() {
  window.location.href = "116_menu.html";
}

function goToCheckout() {
  window.location.href = "116_checkout.html";
}

function goToCalculator() {
  window.location.href = "116_calories.html";
}

/* =====================================================
   LOAD CART PAGE CONTENT
   ===================================================== */
function loadCartPage() {
  let tbody = document.getElementById("cart-items");
  let totalEl = document.getElementById("cart-total");

  if (!tbody) return;

  tbody.innerHTML = "";
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    let row = document.createElement("tr");

    row.innerHTML =
      "<td>" + cart[i].name + "</td>" +
      "<td>₹" + cart[i].price + "</td>" +
      "<td>" + cart[i].qty + "</td>" +
      "<td><button onclick='removeItem(" + i + ")'>X</button></td>";

    tbody.appendChild(row);
    total += cart[i].price * cart[i].qty;
  }

  totalEl.innerText = total;
}
loadCartPage();

/* =====================================================
   REMOVE ITEM FROM CART
   ===================================================== */
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("fitfuel_cart", JSON.stringify(cart));
  loadCartPage();
  updateCartCount();
}

/* =====================================================
   CHECKOUT FUNCTION
   ===================================================== */
function placeOrder() {
  alert("Order placed successfully!");
  localStorage.removeItem("fitfuel_cart");
  window.location.href = "116_feedback.html";
}

/* =====================================================
   FEEDBACK SUBMISSION (TXT FILE)
   ===================================================== */
function submitFeedback() {
  let name = document.getElementById("fname").value;
  let mobile = document.getElementById("mobile").value;
  let feedback = document.getElementById("feedback").value;
  let rating = document.getElementById("rating").value;

  if (!/^[0-9]{10}$/.test(mobile)) {
    alert("Enter valid 10-digit mobile number");
    return false;
  }

  let data =
    "Name: " + name + "\n" +
    "Mobile: " + mobile + "\n" +
    "Rating: " + rating + "/5\n" +
    "Feedback: " + feedback;

  let blob = new Blob([data], { type: "text/plain" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "feedback.txt";
  link.click();

  document.getElementById("msg").innerText =
    "Thank you for your valuable feedback!";
  return false;
}

function clearFeedback() {
  document.getElementById("feedbackForm").reset();
  document.getElementById("msg").innerText = "";
}

/* =====================================================
   CALORIE CALCULATOR
   ===================================================== */
function calculateCalories() {
  let w = document.getElementById("weight").value;
  let h = document.getElementById("height").value;
  let a = document.getElementById("age").value;

  let calories = (10 * w) + (6.25 * h) - (5 * a) + 5;
  document.getElementById("calorie-result").innerText =
    "Your daily calorie need is approx " + calories + " kcal";
}

/* =====================================================
   HIDE & SHOW CONTENT 
   ===================================================== */
function hideSection(sectionId) {
  let el = document.getElementById(sectionId);
  if (el) {
    el.style.display = "none";
  }
}

function showSection(sectionId) {
  let el = document.getElementById(sectionId);
  if (el) {
    el.style.display = "block";
  }
}
