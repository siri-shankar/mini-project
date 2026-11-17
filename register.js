
// ======================================
// MEDIKIOSK PATIENT REGISTRATION
// ======================================


// Get HTML elements

const registrationForm = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const dob = document.getElementById("dob");
const age = document.getElementById("age");
const mobile = document.getElementById("mobile");
const consent = document.getElementById("consent");

const successMessage = document.getElementById("successMessage");
const successText = document.getElementById("successText");


// ======================================
// 1. PREVENT FUTURE DATE OF BIRTH
// ======================================

const today = new Date();

const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

dob.max = localToday;


// ======================================
// 2. AUTOMATIC AGE CALCULATION
// ======================================

dob.addEventListener("change", function () {

    age.value = "";

    const birthDate = new Date(dob.value + "T00:00:00");

    if (!dob.value || birthDate > new Date(localToday + "T00:00:00")) {
        document.getElementById("dobError").textContent =
            "Please select a valid date of birth.";
        return;
    }

    const currentDate = new Date();

    let calculatedAge =
        currentDate.getFullYear() - birthDate.getFullYear();

    const monthDifference =
        currentDate.getMonth() - birthDate.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            currentDate.getDate() < birthDate.getDate()
        )
    ) {
        calculatedAge--;
    }

    age.value = calculatedAge + " years";

    document.getElementById("dobError").textContent = "";

});


// ======================================
// 3. MOBILE NUMBER INPUT
// ======================================

mobile.addEventListener("input", function () {

    // Allow only digits
    mobile.value = mobile.value.replace(/\D/g, "").slice(0, 10);

    document.getElementById("mobileError").textContent = "";

});


// ======================================
// 4. REGISTRATION FORM SUBMISSION
// ======================================

registrationForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();


    // Clear previous errors

    document.getElementById("nameError").textContent = "";
    document.getElementById("dobError").textContent = "";
    document.getElementById("mobileError").textContent = "";
    document.getElementById("consentError").textContent = "";


    let isValid = true;


    // Validate name

    const namePattern = /^[\p{L}][\p{L}\p{M} .'-]*$/u;

    if (
        fullName.value.trim().length < 2 ||
        !namePattern.test(fullName.value.trim())
    ) {

        document.getElementById("nameError").textContent =
            "Please enter a valid full name.";

        isValid = false;

    }


    // Validate date of birth

    if (!dob.value || dob.value > localToday) {

        document.getElementById("dobError").textContent =
            "Please select a valid date of birth.";

        isValid = false;

    }


    // Validate mobile number

    const mobilePattern = /^[6-9][0-9]{9}$/;

    if (!mobilePattern.test(mobile.value)) {

        document.getElementById("mobileError").textContent =
            "Enter a valid 10-digit Indian mobile number.";

        isValid = false;

    }


    // Validate other required fields

    if (!registrationForm.checkValidity()) {

        registrationForm.reportValidity();

        isValid = false;

    }


    // Validate patient consent

    if (!consent.checked) {

        document.getElementById("consentError").textContent =
            "Please provide your consent before continuing.";

        isValid = false;

    }


    // Stop if any validation fails

    if (!isValid) {
        return;
    }


    // ======================================
    // 5. SHOW SUCCESS MESSAGE
    // ======================================

    const patientName = fullName.value.trim();

    registrationForm.hidden = true;

    successMessage.hidden = false;

    successText.textContent =
        "Thank you, " + patientName +
        "! Your registration details have been validated successfully.";

    console.log("MediKiosk registration form validated.");

});


// ======================================
// 6. BACK TO HOMEPAGE
// ======================================

document.getElementById("backButton").addEventListener("click", function () {

    window.location.href = "dashboard.html";

});
