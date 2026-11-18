
const printButton = document.getElementById("printButton");

const markReviewedButton =
    document.getElementById("markReviewedButton");

const reviewStatus = document.getElementById("reviewStatus");

const reviewMessage = document.getElementById("reviewMessage");

const doctorNotes = document.getElementById("doctorNotes");

// Print the medical summary
printButton.addEventListener("click", function () {
    window.print();
});

// Demonstration of doctor review
markReviewedButton.addEventListener("click", function () {

    const confirmed = confirm(
        "This is a demonstration. Do you want to change the sample review status?"
    );

    if (!confirmed) {
        return;
    }

    reviewStatus.textContent = "Reviewed (Demo)";

    reviewStatus.style.background = "#dcfce7";
    reviewStatus.style.color = "#15803d";

    reviewMessage.textContent =
        "Sample review status updated. This change is not saved to a database.";

    markReviewedButton.textContent = "Reviewed (Demo)";
    markReviewedButton.disabled = true;
});
