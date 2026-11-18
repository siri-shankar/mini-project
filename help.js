
// ==================================
// 1. SEARCH FAQS
// ==================================

const faqSearch = document.getElementById("faqSearch");
const faqItems = document.querySelectorAll(".faq-item");
const noResults = document.getElementById("noResults");

faqSearch.addEventListener("input", function () {

    const searchText = faqSearch.value.toLowerCase().trim();

    let visibleCount = 0;

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        const questionText = question.textContent.toLowerCase();
        const answerText = answer.textContent.toLowerCase();

        const matches =
            questionText.includes(searchText) ||
            answerText.includes(searchText);

        if (matches) {
            item.style.display = "block";
            visibleCount++;
        } else {
            item.style.display = "none";
            item.classList.remove("active");

            const icon = question.querySelector("span");
            icon.textContent = "＋";
        }
    });

    if (visibleCount === 0) {
        noResults.classList.remove("hidden");
    } else {
        noResults.classList.add("hidden");
    }
});


// ==================================
// 2. EXPAND AND COLLAPSE FAQS
// ==================================

faqItems.forEach(function (item) {

    const question = item.querySelector(".faq-question");
    const icon = question.querySelector("span");

    question.addEventListener("click", function () {

        const isAlreadyOpen = item.classList.contains("active");

        // Close all other FAQ answers
        faqItems.forEach(function (otherItem) {
            otherItem.classList.remove("active");

            const otherIcon =
                otherItem.querySelector(".faq-question span");

            otherIcon.textContent = "＋";
        });

        // Open the selected answer
        if (!isAlreadyOpen) {
            item.classList.add("active");
            icon.textContent = "−";
        }
    });
});


// ==================================
// 3. SUPPORT FORM
// ==================================

const supportForm = document.getElementById("supportForm");

const supportSuccess =
    document.getElementById("supportSuccess");

const successText =
    document.getElementById("successText");

supportForm.addEventListener("submit", function (event) {

    // Prevent actual form submission
    event.preventDefault();

    const name =
        document.getElementById("supportName").value.trim();

    const email =
        document.getElementById("supportEmail").value.trim();

    const category =
        document.getElementById("supportCategory").value;

    const message =
        document.getElementById("supportMessage").value.trim();

    if (!name || !email || !category || !message) {
        alert("Please fill in all required fields.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // This is only a frontend demonstration.
    // No email or support ticket is actually created.

    successText.textContent =
        "Thank you, " + name +
        ". Your sample " + category +
        " request passed frontend validation. " +
        "It has NOT been sent or saved because the backend is not connected.";

    supportSuccess.classList.remove("hidden");

    supportSuccess.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    // Reset form for another demonstration
    supportForm.reset();
});
