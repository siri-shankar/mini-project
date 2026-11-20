import re

def extract_medical_info(text):
    text = re.sub(r"\s+", " ", text).strip()

    info = {
        "patient_name": None,
        "age": None,
        "symptoms": None,
        "duration": None,
        "medicine": None
    }

    # Patient name
    name_patterns = [
        r"\bmy name is\s+(.+?)(?=\s+(?:I am|I'm|aged|I have)|[.!?]|$)",
        r"\b(?:patient name|name)\s*[:;]\s*(.+?)(?=\s+(?:age|symptoms|duration|medicine)\s*[:;]|[.!?]|$)",
        r"\b(?:I'm|I am|this is)\s+([A-Za-z]+)\s*(?=,|[.!?]|$)"
    ]

    for pattern in name_patterns:
        match = re.search(pattern, text, re.I)
        if match:
            info["patient_name"] = match.group(1).strip(" ,.")
            break

    # Age
    age_patterns = [
        r"\bage\s*[:;]\s*(\d{1,3})",
        r"\baged?\s+(\d{1,3})",
        r"\b(?:I am|I'm)\s+(\d{1,3})(?:\s+years?\s+old)?"
    ]

    for pattern in age_patterns:
        match = re.search(pattern, text, re.I)
        if match:
            info["age"] = match.group(1)
            break

    # Duration: avoid confusing age with symptom duration
    duration_patterns = [
        r"\b(?:for|since|duration\s*[:;]?)\s+(?:the\s+past\s+)?(\d+)\s*(days?|weeks?|months?|years?)",
        r"\b(?:for|since)\s+(yesterday|today|last night)"
    ]

    for pattern in duration_patterns:
        match = re.search(pattern, text, re.I)
        if match:
            info["duration"] = " ".join(match.groups()).strip()
            break

    # Symptoms: report format
    match = re.search(
        r"\bsymptoms?\s*[:;]\s*(.+?)(?=\s+(?:duration|medicine|medication)\s*[:;]|$)",
        text, re.I
    )

    if match:
        info["symptoms"] = match.group(1).strip()
    else:
        # Symptoms: natural speech
        match = re.search(
            r"\b(?:I have|I've had|I am having|I'm having|"
            r"I am suffering from|I'm suffering from|"
            r"I've been suffering from|I'm experiencing|"
            r"I have been having|I've been having)\s+"
            r"(.+?)(?=\s+(?:for|since)\s+|[.!?]|$)",
            text, re.I
        )

        if match:
            info["symptoms"] = match.group(1).strip()

    # Medicine
    match = re.search(
        r"\b(?:medicine|medication)\s*[:;]\s*(.+?)"
        r"(?=\s+(?:duration|symptoms|age)\s*[:;]|$)",
        text, re.I
    )

    if match:
        info["medicine"] = match.group(1).strip()

    return info


if __name__ == "__main__":
    tests = [
        "My name is John. I am 25 years old. I have fever and headache since 3 days.",
        "My name is Sinchana. I am 25 years old. I am suffering from fever and headache for 3 days.",
        "This is Sinchana. I'm 25 and I've had a headache since yesterday.",
        "Patient Name: Ravi Age: 25 Symptoms: Fever and headache Duration: 3 days Medicine: Paracetamol 500 mg"
    ]

    for text in tests:
        print("\nSentence:", text)
        print("Extracted information:")
        for key, value in extract_medical_info(text).items():
            print(f"{key}: {value}")
