
const documentForm = document.getElementById("documentForm");
const documentType = document.getElementById("documentType");
const documentFiles = document.getElementById("documentFiles");
const documentDate = document.getElementById("documentDate");
const documentDescription = document.getElementById("documentDescription");
const documentConsent = document.getElementById("documentConsent");

const dropArea = document.getElementById("dropArea");
const fileList = document.getElementById("fileList");

const successMessage = document.getElementById("successMessage");
const successText = document.getElementById("successText");

let selectedFiles = [];

const MAX_FILES = 5;
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const allowedExtensions = ["pdf", "jpg", "jpeg", "png"];

const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png"
];

// Check today's date
documentDate.max = new Date().toISOString().split("T")[0];

// Get file extension
function getExtension(fileName) {
    return fileName.split(".").pop().toLowerCase();
}

// Check whether a file is supported
function isAllowedFile(file) {
    const extension = getExtension(file.name);

    return allowedExtensions.includes(extension) &&
        allowedTypes.includes(file.type);
}

// Display file size
function formatFileSize(bytes) {
    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + " KB";
    }

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

// Add selected files
function addFiles(files) {

    for (const file of files) {

        if (selectedFiles.length >= MAX_FILES) {
            alert("You can upload a maximum of 5 files.");
            break;
        }

        if (!isAllowedFile(file)) {
            alert(file.name + " is not a supported file type.");
            continue;
        }

        if (file.size > MAX_SIZE) {
            alert(file.name + " exceeds the 10 MB file size limit.");
            continue;
        }

        if (file.size === 0) {
            alert(file.name + " is empty and cannot be selected.");
            continue;
        }

        const alreadyExists = selectedFiles.some(
            existingFile =>
                existingFile.name === file.name &&
                existingFile.size === file.size &&
                existingFile.lastModified === file.lastModified
        );

        if (alreadyExists) {
            alert(file.name + " is already selected.");
            continue;
        }

        selectedFiles.push(file);
    }

    documentFiles.value = "";
    displayFiles();
}

// Show selected files
function displayFiles() {

    fileList.replaceChildren();

    if (selectedFiles.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "No files selected yet.";
        fileList.appendChild(emptyMessage);
        return;
    }

    selectedFiles.forEach((file, index) => {

        const item = document.createElement("div");
        item.className = "file-item";

        const details = document.createElement("div");
        details.className = "file-details";

        const name = document.createElement("p");
        name.className = "file-name";
        name.textContent = "📄 " + file.name;

        const size = document.createElement("p");
        size.className = "file-size";
        size.textContent = formatFileSize(file.size);

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-btn";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {
            selectedFiles.splice(index, 1);
            displayFiles();
        });

        details.appendChild(name);
        details.appendChild(size);

        item.appendChild(details);
        item.appendChild(removeButton);

        fileList.appendChild(item);
    });
}

// Browse files
documentFiles.addEventListener("change", function () {
    addFiles(Array.from(this.files));
});

// Drag and drop
dropArea.addEventListener("dragover", function (event) {
    event.preventDefault();
    dropArea.classList.add("drag-over");
});

dropArea.addEventListener("dragleave", function () {
    dropArea.classList.remove("drag-over");
});

dropArea.addEventListener("drop", function (event) {
    event.preventDefault();
    dropArea.classList.remove("drag-over");

    addFiles(Array.from(event.dataTransfer.files));
});

// Submit form
documentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!documentForm.checkValidity()) {
        documentForm.reportValidity();
        return;
    }

    if (selectedFiles.length === 0) {
        alert("Please select at least one medical document.");
        return;
    }

    if (documentDate.value) {
        const chosenDate = new Date(documentDate.value + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (chosenDate > today) {
            alert("Document date cannot be in the future.");
            documentDate.focus();
            return;
        }
    }

    if (!documentConsent.checked) {
        alert("Please provide your consent before continuing.");
        return;
    }

    // Frontend demonstration only.
    // Files are not sent to a backend or database.

    successText.textContent =
        selectedFiles.length +
        " document(s) passed the frontend checks.";

    documentForm.hidden = true;
    successMessage.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Initial display
displayFiles();
