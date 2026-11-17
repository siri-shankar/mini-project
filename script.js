
// ===================================
// MEDIKIOSK JAVASCRIPT
// ===================================

// Get the navigation button
const menuToggle = document.getElementById("menuToggle");

// Get the navigation links
const navLinks = document.getElementById("navLinks");

// Open and close mobile navigation
menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    // Update accessibility information
    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    // Change the menu icon
    menuToggle.textContent = isOpen ? "✕" : "☰";

});


// Close navigation after clicking a link
const navigationItems = document.querySelectorAll(".nav-links a");

navigationItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

    });

});


// Display a welcome message when the page loads
console.log("Welcome to MediKiosk!");
console.log("MediKiosk homepage loaded successfully.");
