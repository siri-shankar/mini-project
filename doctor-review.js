
const reviewForm = document.getElementById("doctorReviewForm");

const successMessage = document.getElementById("successMessage");
const savedDoctor = document.getElementById("savedDoctor");
const savedDecision = document.getElementById("savedDecision");
const savedObservations = document.getElementById("savedObservations");
const finalStatus = document.getElementById("finalStatus");

reviewForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const doctorName =
        document.getElementById("doctorName").value.trim();

    const observations =
        document.getElementById("observations").value.trim();

    const decision =
        document.getElementById("decision").value;

    if (!doctorName || !observations || !decision) {
        alert("Please complete all required fields.");
        return;
    }

    const confirmed = confirm(
        "Are you sure you want to submit this sample doctor review?"
    );

    if (!confirmed) {
        return;
    }

    savedDoctor.textContent = "Doctor: " + doctorName;
    savedDecision.textContent = "Decision: " + decision;
    savedObservations.textContent =
        "Observations: " + observations;

    finalStatus.textContent = decision;

    successMessage.classList.remove("hidden");

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    reviewForm.querySelector("button[type='submit']").disabled = true;
});
