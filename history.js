
// ==========================================
// MEDIKIOSK MEDICAL HISTORY JAVASCRIPT
// ==========================================

const historyForm = document.getElementById("historyForm");

const languageSelect = document.getElementById("languageSelect");

const reviewSection = document.getElementById("reviewSection");
const reviewContent = document.getElementById("reviewContent");

const successSection = document.getElementById("successSection");

const formError = document.getElementById("formError");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");

const reviewButton = document.getElementById("reviewButton");
const editButton = document.getElementById("editButton");
const submitButton = document.getElementById("submitButton");


// ==========================================
// 1. LANGUAGE TRANSLATIONS
// ==========================================

const translations = {

    en: {
        symptomTitle: "Current Symptoms",
        symptomDescription: "Tell us about the health problems you are experiencing.",
        symptomsLabel: "What symptoms are you experiencing? *",
        symptomsHint: "Describe your symptoms in your own words.",
        durationLabel: "How long have you had these symptoms? *",
        severityLabel: "How severe are your symptoms? *",
        symptomNotesLabel: "Anything else you want to mention?",
        selectOption: "Select an option",
        pastTitle: "Past Medical History",
        pastDescription: "Tell us about any previous health conditions.",
        pastQuestion: "Have you ever been diagnosed with any medical conditions?",
        yes: "Yes",
        no: "No",
        notSure: "Not sure",
        pastDetailsLabel: "If yes, please mention the conditions.",
        surgeryTitle: "Previous Surgeries",
        surgeryDescription: "Let us know about any surgeries you have undergone.",
        surgeryQuestion: "Have you undergone any surgeries?",
        surgeryDetailsLabel: "If yes, mention the surgery and approximate year.",
        medicationTitle: "Current Medications",
        medicationDescription: "Tell us about the medicines you currently take.",
        medicationQuestion: "Are you currently taking any medicines?",
        medicationDetailsLabel: "If yes, mention medicine names and dosage if known.",
        allergyTitle: "Allergies",
        allergyDescription: "Let us know if you have any known allergies.",
        allergyQuestion: "Do you have any known allergies?",
        allergyDetailsLabel: "If yes, mention the allergy and any reaction you have experienced.",
        familyTitle: "Family Medical History",
        familyDescription: "Tell us about relevant health conditions in your family.",
        familyQuestion: "Are there any known medical conditions in your family?",
        familyDetailsLabel: "If yes, mention the condition and family member.",
        consentText: "I confirm that the information provided is accurate to the best of my knowledge and consent to its use for the stated healthcare purpose. *",
        reviewTitle: "Review Your Medical History",
        reviewDescription: "Please check your answers before submitting.",
        successTitle: "Medical History Submitted!",
        successDescription: "Your answers have been submitted in this frontend demonstration."
    },

    kn: {
        symptomTitle: "ಪ್ರಸ್ತುತ ಲಕ್ಷಣಗಳು",
        symptomDescription: "ನೀವು ಅನುಭವಿಸುತ್ತಿರುವ ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿ.",
        symptomsLabel: "ನೀವು ಯಾವ ಲಕ್ಷಣಗಳನ್ನು ಅನುಭವಿಸುತ್ತಿದ್ದೀರಿ? *",
        symptomsHint: "ನಿಮ್ಮ ಸ್ವಂತ ಪದಗಳಲ್ಲಿ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ.",
        durationLabel: "ಈ ಲಕ್ಷಣಗಳು ಎಷ್ಟು ಸಮಯದಿಂದ ಇವೆ? *",
        severityLabel: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳ ತೀವ್ರತೆ ಎಷ್ಟು? *",
        symptomNotesLabel: "ಇನ್ನೇನಾದರೂ ತಿಳಿಸಲು ಬಯಸುವಿರಾ?",
        selectOption: "ಆಯ್ಕೆಮಾಡಿ",
        pastTitle: "ಹಿಂದಿನ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ",
        pastDescription: "ಹಿಂದಿನ ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿ.",
        pastQuestion: "ನಿಮಗೆ ಹಿಂದೆ ಯಾವುದಾದರೂ ಕಾಯಿಲೆ ಪತ್ತೆಯಾಗಿದೆಯೇ?",
        yes: "ಹೌದು",
        no: "ಇಲ್ಲ",
        notSure: "ಖಚಿತವಿಲ್ಲ",
        pastDetailsLabel: "ಹೌದಾದರೆ, ಕಾಯಿಲೆಗಳ ಹೆಸರನ್ನು ತಿಳಿಸಿ.",
        surgeryTitle: "ಹಿಂದಿನ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆಗಳು",
        surgeryDescription: "ನೀವು ಮಾಡಿಸಿಕೊಂಡಿರುವ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿ.",
        surgeryQuestion: "ನೀವು ಯಾವುದಾದರೂ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ ಮಾಡಿಸಿಕೊಂಡಿದ್ದೀರಾ?",
        surgeryDetailsLabel: "ಹೌದಾದರೆ, ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ ಮತ್ತು ಅಂದಾಜು ವರ್ಷವನ್ನು ತಿಳಿಸಿ.",
        medicationTitle: "ಪ್ರಸ್ತುತ ಔಷಧಿಗಳು",
        medicationDescription: "ನೀವು ಪ್ರಸ್ತುತ ತೆಗೆದುಕೊಳ್ಳುತ್ತಿರುವ ಔಷಧಿಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿ.",
        medicationQuestion: "ನೀವು ಈಗ ಯಾವುದಾದರೂ ಔಷಧಿಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತಿದ್ದೀರಾ?",
        medicationDetailsLabel: "ಹೌದಾದರೆ, ಔಷಧಿಯ ಹೆಸರು ಮತ್ತು ಪ್ರಮಾಣ ತಿಳಿಸಿ.",
        allergyTitle: "ಅಲರ್ಜಿಗಳು",
        allergyDescription: "ನಿಮಗೆ ತಿಳಿದಿರುವ ಯಾವುದೇ ಅಲರ್ಜಿಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿ.",
        allergyQuestion: "ನಿಮಗೆ ಯಾವುದಾದರೂ ಅಲರ್ಜಿ ಇದೆಯೇ?",
        allergyDetailsLabel: "ಹೌದಾದರೆ, ಅಲರ್ಜಿ ಮತ್ತು ಅದರ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ತಿಳಿಸಿ.",
        familyTitle: "ಕುಟುಂಬದ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ",
        familyDescription: "ಕುಟುಂಬದ ಸದಸ್ಯರ ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿ.",
        familyQuestion: "ನಿಮ್ಮ ಕುಟುಂಬದಲ್ಲಿ ಯಾವುದಾದರೂ ಕಾಯಿಲೆಗಳಿವೆಯೇ?",
        familyDetailsLabel: "ಹೌದಾದರೆ, ಕಾಯಿಲೆ ಮತ್ತು ಕುಟುಂಬದ ಸದಸ್ಯರ ಹೆಸರನ್ನು ತಿಳಿಸಿ.",
        consentText: "ನಾನು ನೀಡಿದ ಮಾಹಿತಿಯು ನನ್ನ ತಿಳುವಳಿಕೆಯ ಪ್ರಕಾರ ಸರಿಯಾಗಿದೆ ಎಂದು ದೃಢೀಕರಿಸುತ್ತೇನೆ ಮತ್ತು ತಿಳಿಸಿದ ಆರೋಗ್ಯ ಉದ್ದೇಶಕ್ಕಾಗಿ ಅದರ ಬಳಕೆಗೆ ಒಪ್ಪಿಗೆ ನೀಡುತ್ತೇನೆ. *",
        reviewTitle: "ನಿಮ್ಮ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸವನ್ನು ಪರಿಶೀಲಿಸಿ",
        reviewDescription: "ಸಲ್ಲಿಸುವ ಮೊದಲು ನಿಮ್ಮ ಉತ್ತರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
        successTitle: "ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ ಸಲ್ಲಿಸಲಾಗಿದೆ!",
        successDescription: "ಈ ಮುಂಭಾಗದ ಪ್ರದರ್ಶನದಲ್ಲಿ ನಿಮ್ಮ ಉತ್ತರಗಳನ್ನು ಸಲ್ಲಿಸಲಾಗಿದೆ."
    },

    hi: {
        symptomTitle: "वर्तमान लक्षण",
        symptomDescription: "आपको हो रही स्वास्थ्य समस्याओं के बारे में बताएं।",
        symptomsLabel: "आपको कौन-कौन से लक्षण महसूस हो रहे हैं? *",
        symptomsHint: "अपने शब्दों में लक्षणों का वर्णन करें।",
        durationLabel: "ये लक्षण कितने समय से हैं? *",
        severityLabel: "आपके लक्षण कितने गंभीर हैं? *",
        symptomNotesLabel: "क्या आप कुछ और बताना चाहते हैं?",
        selectOption: "विकल्प चुनें",
        pastTitle: "पिछला चिकित्सा इतिहास",
        pastDescription: "अपनी पिछली स्वास्थ्य समस्याओं के बारे में बताएं।",
        pastQuestion: "क्या आपको पहले कभी किसी बीमारी का पता चला है?",
        yes: "हाँ",
        no: "नहीं",
        notSure: "पता नहीं",
        pastDetailsLabel: "हाँ, तो बीमारी का नाम बताएं।",
        surgeryTitle: "पिछली सर्जरी",
        surgeryDescription: "आपकी पिछली सर्जरी के बारे में बताएं।",
        surgeryQuestion: "क्या आपकी कभी सर्जरी हुई है?",
        surgeryDetailsLabel: "हाँ, तो सर्जरी और लगभग वर्ष बताएं।",
        medicationTitle: "वर्तमान दवाइयाँ",
        medicationDescription: "आप वर्तमान में जो दवाइयाँ लेते हैं, उनके बारे में बताएं।",
        medicationQuestion: "क्या आप अभी कोई दवाइयाँ ले रहे हैं?",
        medicationDetailsLabel: "हाँ, तो दवा का नाम और खुराक बताएं।",
        allergyTitle: "एलर्जी",
        allergyDescription: "अपनी ज्ञात एलर्जी के बारे में बताएं।",
        allergyQuestion: "क्या आपको कोई ज्ञात एलर्जी है?",
        allergyDetailsLabel: "हाँ, तो एलर्जी और उससे हुई प्रतिक्रिया बताएं।",
        familyTitle: "पारिवारिक चिकित्सा इतिहास",
        familyDescription: "अपने परिवार की स्वास्थ्य समस्याओं के बारे में बताएं।",
        familyQuestion: "क्या आपके परिवार में किसी को कोई ज्ञात बीमारी है?",
        familyDetailsLabel: "हाँ, तो बीमारी और परिवार के सदस्य का नाम बताएं।",
        consentText: "मैं पुष्टि करता/करती हूँ कि दी गई जानकारी मेरी जानकारी के अनुसार सही है और बताए गए स्वास्थ्य उद्देश्य के लिए इसके उपयोग की सहमति देता/देती हूँ। *",
        reviewTitle: "अपने चिकित्सा इतिहास की समीक्षा करें",
        reviewDescription: "कृपया जमा करने से पहले अपने उत्तर जाँच लें।",
        successTitle: "चिकित्सा इतिहास जमा हो गया!",
        successDescription: "इस फ्रंटएंड प्रदर्शन में आपके उत्तर जमा किए गए हैं।"
    }

};


// ==========================================
// 2. CHANGE LANGUAGE
// ==========================================

function changeLanguage(language) {

    const selectedLanguage = translations[language];

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        if (selectedLanguage[key]) {
            element.textContent = selectedLanguage[key];
        }

    });

}

languageSelect.addEventListener("change", function () {

    changeLanguage(this.value);

});


// ==========================================
// 3. PROGRESS BAR
// ==========================================

function updateProgress() {

    const sections = document.querySelectorAll(".form-section");

    let completedSections = 0;

    sections.forEach(section => {

        const requiredFields = section.querySelectorAll("[required]");

        let completed = true;

        requiredFields.forEach(field => {

            if (field.type === "radio") {

                const radioName = field.name;

                const selected = section.querySelector(
                    `input[name="${radioName}"]:checked`
                );

                if (!selected) {
                    completed = false;
                }

            } else if (!field.value.trim()) {

                completed = false;

            }

        });

        if (completed) {
            completedSections++;
        }

    });

    const percentage = Math.round(
        (completedSections / sections.length) * 100
    );

    progressBar.style.width = percentage + "%";

    progressText.textContent =
        `Section ${completedSections} of ${sections.length}`;

    progressPercent.textContent =
        percentage + "% completed";

}

historyForm.addEventListener("input", updateProgress);
historyForm.addEventListener("change", updateProgress);


// ==========================================
// 4. FORM FIELD DETAILS FOR REVIEW
// ==========================================

const reviewFields = [

    {
        title: "Current Symptoms",
        fields: [
            ["Symptoms", "symptoms"],
            ["Duration", "duration"],
            ["Severity", "severity"],
            ["Additional Details", "symptomNotes"]
        ]
    },

    {
        title: "Past Medical History",
        fields: [
            ["Previous Conditions", "pastCondition"],
            ["Condition Details", "pastDetails"]
        ]
    },

    {
        title: "Previous Surgeries",
        fields: [
            ["Previous Surgery", "surgery"],
            ["Surgery Details", "surgeryDetails"]
        ]
    },

    {
        title: "Current Medications",
        fields: [
            ["Taking Medication", "medication"],
            ["Medication Details", "medicationDetails"]
        ]
    },

    {
        title: "Allergies",
        fields: [
            ["Known Allergies", "allergy"],
            ["Allergy Details", "allergyDetails"]
        ]
    },

    {
        title: "Family Medical History",
        fields: [
            ["Family Conditions", "familyHistory"],
            ["Family Details", "familyDetails"]
        ]
    }

];


// ==========================================
// 5. GET FIELD VALUE
// ==========================================

function getFieldValue(name) {

    const field = historyForm.elements[name];

    if (!field) {
        return "Not provided";
    }

    if (field instanceof RadioNodeList) {

        return field.value || "Not selected";

    }

    return field.value.trim() || "Not provided";

}


// ==========================================
// 6. CREATE REVIEW
// ==========================================

function createReview() {

    reviewContent.replaceChildren();

    reviewFields.forEach(section => {

        const sectionHeading = document.createElement("h3");

        sectionHeading.textContent = section.title;

        sectionHeading.style.color = "#078ca0";
        sectionHeading.style.marginTop = "22px";
        sectionHeading.style.fontSize = "15px";

        reviewContent.appendChild(sectionHeading);

        section.fields.forEach(field => {

            const [label, name] = field;

            const item = document.createElement("div");
            item.className = "review-item";

            const heading = document.createElement("strong");
            heading.textContent = label;

            const answer = document.createElement("p");
            answer.textContent = getFieldValue(name);

            item.appendChild(heading);
            item.appendChild(answer);

            reviewContent.appendChild(item);

        });

    });

}


// ==========================================
// 7. REVIEW BUTTON
// ==========================================

historyForm.addEventListener("submit", function (event) {

    event.preventDefault();

    formError.textContent = "";

    if (!historyForm.checkValidity()) {

        historyForm.reportValidity();

        return;

    }

    createReview();

    historyForm.hidden = true;

    reviewSection.hidden = false;

    reviewSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


// ==========================================
// 8. EDIT ANSWERS
// ==========================================

editButton.addEventListener("click", function () {

    reviewSection.hidden = true;

    historyForm.hidden = false;

    historyForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


// ==========================================
// 9. FINAL SUBMISSION
// ==========================================

submitButton.addEventListener("click", function () {

    const confirmSubmission = confirm(
        "Are you sure you want to submit your medical history?"
    );

    if (!confirmSubmission) {
        return;
    }

    reviewSection.hidden = true;

    successSection.hidden = false;

    successSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


// ==========================================
// 10. INITIAL PAGE SETUP
// ==========================================

changeLanguage("en");

updateProgress();
