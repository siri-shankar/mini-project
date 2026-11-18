
const logoutBtn = document.getElementById("logoutBtn");
const serviceButtons = document.querySelectorAll(".service-btn");
const messageBox = document.getElementById("messageBox");

// Show a message when a service is selected
function showMessage(message) {
    messageBox.textContent = message;
    messageBox.classList.add("show");

    setTimeout(() => {
        messageBox.classList.remove("show");
    }, 3000);
}

// Handle service buttons
// Handle service buttons

serviceButtons.forEach(button => {
    button.addEventListener("click", function () {
        const serviceName = this.dataset.service;

        if (serviceName === "Medical History") {
            window.location.href = "history.html";
        }
        else if (serviceName === "Upload Documents" ||
                 serviceName === "Upload Medical Documents"
        ) {
            window.location.href = "documents.html";
        }
        else if (serviceName === "AI Health Assistant") {
            window.location.href = "assistant.html";
        }
        else if (serviceName === "Medical Summary") {
            window.location.href = "summary.html";
        }
        else if (serviceName === "Doctor Review") {
            window.location.href = "doctor-review.html";
        }
        else if (serviceName === "Help & Support") {
            window.location.href = "help.html";
        }
        else {
            showMessage(
                serviceName +
                " will be available after we build and connect this module."
            );
        }
    });
});


// Logout button
logoutBtn.addEventListener("click", function () {

    const confirmLogout = confirm(
        "Are you sure you want to return to the homepage?"
    );

    if (confirmLogout) {
        window.location.href = "index.html";
    }

});
