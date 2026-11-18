
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

const inputArea = document.getElementById("inputArea");
const languageSelect = document.getElementById("languageSelect");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");

const reviewSection = document.getElementById("reviewSection");
const reviewContent = document.getElementById("reviewContent");

const editButton = document.getElementById("editButton");
const confirmButton = document.getElementById("confirmButton");

const successSection = document.getElementById("successSection");

const questions = {
    en: [
        "What symptoms are you currently experiencing? Please describe them.",
        "When did these symptoms start?",
        "How would you describe the severity of your symptoms? (Mild, Moderate or Severe)",
        "Do you have any existing medical conditions? If yes, please mention them. Otherwise type No.",
        "Are you currently taking any medicines? If yes, mention their names. Otherwise type No.",
        "Do you have any known allergies? If yes, mention them. Otherwise type No."
    ],

    kn: [
        "ನೀವು ಪ್ರಸ್ತುತ ಯಾವ ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗಳನ್ನು ಅನುಭವಿಸುತ್ತಿದ್ದೀರಿ? ವಿವರಿಸಿ.",
        "ಈ ಲಕ್ಷಣಗಳು ಯಾವಾಗ ಪ್ರಾರಂಭವಾದವು?",
        "ನಿಮ್ಮ ಲಕ್ಷಣಗಳ ತೀವ್ರತೆ ಹೇಗಿದೆ? (ಕಡಿಮೆ, ಮಧ್ಯಮ ಅಥವಾ ಹೆಚ್ಚು)",
        "ನಿಮಗೆ ಈಗಾಗಲೇ ಯಾವುದಾದರೂ ಕಾಯಿಲೆಗಳಿವೆಯೇ? ಇದ್ದರೆ ವಿವರಿಸಿ. ಇಲ್ಲದಿದ್ದರೆ No ಎಂದು ಬರೆಯಿರಿ.",
        "ನೀವು ಪ್ರಸ್ತುತ ಯಾವುದಾದರೂ ಔಷಧಿಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತಿದ್ದೀರಾ? ಇದ್ದರೆ ಹೆಸರುಗಳನ್ನು ಬರೆಯಿರಿ. ಇಲ್ಲದಿದ್ದರೆ No ಎಂದು ಬರೆಯಿರಿ.",
        "ನಿಮಗೆ ಯಾವುದಾದರೂ ಅಲರ್ಜಿ ಇದೆಯೇ? ಇದ್ದರೆ ವಿವರಿಸಿ. ಇಲ್ಲದಿದ್ದರೆ No ಎಂದು ಬರೆಯಿರಿ."
    ],

    hi: [
        "आपको अभी कौन से लक्षण महसूस हो रहे हैं? कृपया बताएं।",
        "ये लक्षण कब शुरू हुए?",
        "आपके लक्षण कितने गंभीर हैं? (हल्के, मध्यम या गंभीर)",
        "क्या आपको पहले से कोई बीमारी है? यदि हाँ, तो बताएं। नहीं है तो No लिखें।",
        "क्या आप अभी कोई दवा ले रहे हैं? यदि हाँ, तो दवा का नाम बताएं। नहीं है तो No लिखें।",
        "क्या आपको कोई एलर्जी है? यदि हाँ, तो बताएं। नहीं है तो No लिखें।"
    ]
};

const labels = {
    en: [
        "Current Symptoms",
        "Symptom Duration",
        "Symptom Severity",
        "Existing Medical Conditions",
        "Current Medications",
        "Known Allergies"
    ],

    kn: [
        "ಪ್ರಸ್ತುತ ಲಕ್ಷಣಗಳು",
        "ಲಕ್ಷಣಗಳ ಅವಧಿ",
        "ಲಕ್ಷಣಗಳ ತೀವ್ರತೆ",
        "ಹಿಂದಿನ ಕಾಯಿಲೆಗಳು",
        "ಪ್ರಸ್ತುತ ಔಷಧಿಗಳು",
        "ತಿಳಿದಿರುವ ಅಲರ್ಜಿಗಳು"
    ],

    hi: [
        "वर्तमान लक्षण",
        "लक्षणों की अवधि",
        "लक्षणों की गंभीरता",
        "पहले से मौजूद बीमारियाँ",
        "वर्तमान दवाइयाँ",
        "ज्ञात एलर्जी"
    ]
};

const translations = {
    en: {
        placeholder: "Type your answer here...",
        send: "Send →",
        question: "Question",
        of: "of",
        assistant: "Health Assistant",
        user: "You"
    },

    kn: {
        placeholder: "ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...",
        send: "ಕಳುಹಿಸಿ →",
        question: "ಪ್ರಶ್ನೆ",
        of: "ರಲ್ಲಿ",
        assistant: "ಆರೋಗ್ಯ ಸಹಾಯಕ",
        user: "ನೀವು"
    },

    hi: {
        placeholder: "अपना उत्तर यहाँ लिखें...",
        send: "भेजें →",
        question: "प्रश्न",
        of: "में से",
        assistant: "स्वास्थ्य सहायक",
        user: "आप"
    }
};

let currentQuestion = 0;
let answers = ["", "", "", "", "", ""];
let conversationFinished = false;

// Add a message safely to the chat
function addMessage(text, sender) {

    const message = document.createElement("div");
    message.className = "message " +
        (sender === "user" ? "user-message" : "bot-message");

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = sender === "user" ? "P" : "✚";

    const content = document.createElement("div");
    content.className = "message-content";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    const time = document.createElement("span");
    time.className = "message-time";

    const language = languageSelect.value;

    time.textContent = sender === "user"
        ? translations[language].user
        : translations[language].assistant;

    content.appendChild(paragraph);
    content.appendChild(time);

    message.appendChild(avatar);
    message.appendChild(content);

    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show current question
function askQuestion() {

    const language = languageSelect.value;

    if (currentQuestion < questions[language].length) {

        addMessage(
            questions[language][currentQuestion],
            "bot"
        );

        updateProgress();

        userInput.focus();
    }
}

// Update progress
function updateProgress() {

    const total = questions.en.length;

    const percentage = Math.round(
        (currentQuestion / total) * 100
    );

    progressBar.style.width = percentage + "%";

    progressText.textContent =
        translations[languageSelect.value].question +
        " " + Math.min(currentQuestion + 1, total) +
        " " + translations[languageSelect.value].of +
        " " + total;

    progressPercent.textContent = percentage + "%";
}

// Send answer
function sendAnswer() {

    if (conversationFinished) return;

    const answer = userInput.value.trim();

    if (answer === "") {
        alert("Please enter your answer before sending.");
        userInput.focus();
        return;
    }

    if (currentQuestion >= questions.en.length) return;

    addMessage(answer, "user");

    answers[currentQuestion] = answer;

    userInput.value = "";

    currentQuestion++;

    if (currentQuestion < questions.en.length) {

        setTimeout(() => {
            askQuestion();
        }, 400);

    } else {

        setTimeout(() => {
            addMessage(
                "Thank you! We have collected your answers. Please review them before confirming.",
                "bot"
            );

            updateProgress();

            showReview();

        }, 400);
    }
}

// Display review
function showReview() {

    inputArea.hidden = true;
    reviewSection.hidden = false;

    reviewContent.replaceChildren();

    const language = languageSelect.value;

    answers.forEach((answer, index) => {

        const item = document.createElement("div");
        item.className = "review-item";

        const title = document.createElement("strong");
        title.textContent = labels[language][index];

        const value = document.createElement("p");
        value.textContent = answer;

        item.appendChild(title);
        item.appendChild(value);

        reviewContent.appendChild(item);
    });

    reviewSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Edit answers
editButton.addEventListener("click", function () {

    reviewSection.hidden = true;
    inputArea.hidden = false;

    chatMessages.replaceChildren();

    addMessage(
        "Let's review your answers again. You can update each answer.",
        "bot"
    );

    currentQuestion = 0;
    conversationFinished = false;

    updateProgress();

    askQuestion();
});

// Confirm answers
confirmButton.addEventListener("click", function () {

    reviewSection.hidden = true;
    successSection.hidden = false;

    conversationFinished = true;

    progressBar.style.width = "100%";
    progressPercent.textContent = "100%";

    chatMessages.hidden = true;
    document.querySelector(".language-area").hidden = true;
    document.querySelector(".progress-area").hidden = true;

    successSection.scrollIntoView({
        behavior: "smooth"
    });
});

// Send button
sendButton.addEventListener("click", sendAnswer);

// Enter key sends answer; Shift + Enter creates a new line
userInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendAnswer();
    }
});

// Language selection
languageSelect.addEventListener("change", function () {

    const language = languageSelect.value;

    userInput.placeholder = translations[language].placeholder;
    sendButton.textContent = translations[language].send;

    // Update the current question in the selected language.
    // Previous messages remain in their original language.
    if (!conversationFinished && currentQuestion < questions.en.length) {
        const lastBotMessage = chatMessages.querySelector(
            ".bot-message:last-of-type .message-content p"
        );

        if (lastBotMessage) {
            lastBotMessage.textContent =
                questions[language][currentQuestion];
        }
    }

    if (reviewSection.hidden === false) {
        showReview();
    }

    updateProgress();
});

// Initial setup
userInput.placeholder = translations.en.placeholder;

updateProgress();

setTimeout(() => {
    askQuestion();
}, 500);
