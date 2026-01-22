/* ================= GLOBAL CART ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= NAVIGATION ================= */
function goToMenu() {
  window.location.href = "116_menu.html";
}

function goToCart() {
  window.location.href = "116_cart.html";
}

function goToCheckout() {
  window.location.href = "116_checkout.html";
}

function goToCalculator() {
  window.location.href = "116_calories.html";
}

/* ================= CART FUNCTIONS ================= */
function addToCart(name, price) {
  let item = cart.find(p => p.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("Item added to cart");
  updateCartCount();
}

function updateCartCount() {
  let count = cart.reduce((sum, item) => sum + item.qty, 0);
  let el = document.getElementById("cart-count");
  if (el) el.innerText = count;
}

/* ================= LOAD CART (Q6 INCLUDED) ================= */
function loadCart() {
  let tbody = document.getElementById("cart-items");
  if (!tbody) return;

  tbody.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.qty;

    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>₹${item.price}</td>
      <td>${item.qty}</td>
      <td><button onclick="removeItem(${index})">X</button></td>
    `;
    tbody.appendChild(row);
  });

  let discount = 0;
  if (subtotal > 1000) {
    discount = subtotal * 0.10;
  }

  let finalTotal = subtotal - discount;

  let subEl = document.getElementById("cart-subtotal");
  let disEl = document.getElementById("cart-discount");
  let totalEl = document.getElementById("cart-total");

  if (subEl) subEl.innerText = subtotal.toFixed(2);
  if (disEl) disEl.innerText = discount.toFixed(2);
  if (totalEl) totalEl.innerText = finalTotal.toFixed(2);
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

/* ================= CHECKOUT ================= */
function placeOrder() {
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  window.location.href = "116_feedback.html";
}

/* ================= FEEDBACK VALIDATION (Q3) ================= */
function submitFeedback() {
  let name = document.getElementById("fname").value;
  let mobile = document.getElementById("mobile").value;
  let email = document.getElementById("email").value;
  let feedback = document.getElementById("feedback").value;

  let mobilePattern = /^\d{10}$/;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!mobilePattern.test(mobile)) {
    alert("Enter valid 10-digit mobile number");
    return false;
  }

  if (!emailPattern.test(email)) {
    alert("Enter valid email address");
    return false;
  }

  /* ===== Save feedback to text file (Client-side Q7) ===== */
  let content =
    "Name: " + name + "\n" +
    "Mobile: " + mobile + "\n" +
    "Email: " + email + "\n" +
    "Feedback: " + feedback;

  let blob = new Blob([content], { type: "text/plain" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "feedback.txt";
  link.click();

  document.getElementById("msg").innerText =
    "Thank you for your feedback!";
  return false;
}

/* ================= CLEAR FORM (Q4) ================= */
function clearFeedback() {
  document.getElementById("feedbackForm").reset();
  document.getElementById("msg").innerText =
    "Form cleared successfully";
}

/* ================= HIDE / SHOW ================= */
function hideSection(id) {
  document.getElementById(id).style.display = "none";
}

function showSection(id) {
  document.getElementById(id).style.display = "block";
}

/* ================= CALORIE CALCULATOR ================= */
function calculateCalories() {
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;
  let age = document.getElementById("age").value;

  if (!weight || !height || !age) {
    alert("Please enter all values");
    return;
  }

  let calories = 10 * weight + 6.25 * height - 5 * age + 5;
  document.getElementById("calorie-result").innerText =
    "Your maintenance calories: " + calories + " kcal/day";
}

/* ================= TOAST ================= */
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

/* ================= INIT ================= */
updateCartCount();
loadCart();
