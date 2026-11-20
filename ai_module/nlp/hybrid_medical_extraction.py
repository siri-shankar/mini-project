
import re

FIELDS = ["patient_name", "age", "symptoms", "duration", "medicine"]

NUMBER_WORDS = {
    "one": 1, "two": 2, "three": 3, "four": 4,
    "five": 5, "six": 6, "seven": 7, "eight": 8,
    "nine": 9, "ten": 10, "eleven": 11, "twelve": 12,
    "thirteen": 13, "fourteen": 14, "fifteen": 15,
    "sixteen": 16, "seventeen": 17, "eighteen": 18,
    "nineteen": 19, "twenty": 20, "thirty": 30,
    "forty": 40, "fifty": 50, "sixty": 60,
    "seventy": 70, "eighty": 80, "ninety": 90
}

SYMPTOM_PATTERNS = {
    "fever": [r"\bfever\b", r"\bfeverish\b", r"\bhigh temperature\b"],
    "headache": [r"\bheadache\b", r"\bhead pain\b", r"\bhead hurts?\b"],
    "cold": [r"\bcold\b", r"\bcommon cold\b"],
    "cough": [r"\bcough(?:ing)?\b"],
    "stomach pain": [
        r"\bstomach pain\b",
        r"\bstomach(?:\s+has)?\s+been\s+hurting\b",
        r"\bstomach hurts?\b",
        r"\babdominal pain\b",
        r"\btummy ache\b"
    ],
    "vomiting": [r"\bvomit(?:ing|ed)?\b", r"\bthrowing up\b"],
    "diarrhea": [r"\bdiarrh(?:ea|oea)\b", r"\bloose motions?\b"],
    "dizziness": [r"\bdizz(?:y|iness)\b", r"\blightheaded\b"],
    "sore throat": [r"\bsore throat\b", r"\bthroat pain\b"],
    "body pain": [r"\bbody aches?\b", r"\bbody pain\b"],
    "nausea": [r"\bnausea\b", r"\bnauseous\b"],
    "fatigue": [r"\bfatigue\b", r"\bfeeling tired\b", r"\bweakness\b"],
    "runny nose": [r"\brunny nose\b"],
    "breathing difficulty": [
        r"\bshortness of breath\b",
        r"\bdifficulty breathing\b",
        r"\bbreathlessness\b"
    ]
}


def normalize_numbers(text):
    def replace_number(match):
        words = match.group(0).lower().replace("-", " ").split()
        values = [NUMBER_WORDS[w] for w in words]
        if len(values) == 2 and values[0] >= 20 and values[1] < 10:
            return str(values[0] + values[1])
        return str(values[0])

    words = "|".join(sorted(NUMBER_WORDS, key=len, reverse=True))
    pattern = rf"\b(?:{words})(?:[- ](?:one|two|three|four|five|six|seven|eight|nine))?\b"
    return re.sub(pattern, replace_number, text, flags=re.I)


def extract_medical_info(text):
    original = re.sub(r"\s+", " ", str(text)).strip()
    normalized = normalize_numbers(original)

    info = dict.fromkeys(FIELDS)

    # Name
    name_patterns = [
        r"\bpatient\s*name\s*[:;-]\s*([A-Za-z]+(?:\s+[A-Za-z]+){0,2})",
        r"\bmy\s+name\s+is\s+([A-Za-z]+(?:\s+[A-Za-z]+){0,2})",
        r"\b(?:I'm|I am|this is)\s+([A-Za-z]+)(?=\s*[,;.!]|\s+(?:aged|\d{1,3}\b)|$)"
    ]

    for pattern in name_patterns:
        match = re.search(pattern, original, re.I)
        if match:
            name = match.group(1).strip()
            name = re.split(r"\s+(?:and|I|aged|age)\b", name, flags=re.I)[0]
            info["patient_name"] = name
            break

    # Age
    age_patterns = [
        r"\bage\s*[:;-]\s*(\d{1,3})\b",
        r"\b(?:I'm|I am|aged?)\s+(\d{1,3})\b",
        r"\b(\d{1,3})\s+years?\s+old\b",
        r"\b(?:I'm|I am)\s+[A-Za-z]+\s*,?\s*(\d{1,3})\b"
    ]

    for pattern in age_patterns:
        match = re.search(pattern, normalized, re.I)
        if match:
            age = int(match.group(1))
            if 0 <= age <= 120:
                info["age"] = str(age)
                break

    # Duration
    duration_patterns = [
        r"\b(?:for|since|from)\s+(?:the\s+)?(?:last\s+|past\s+)?(\d+)\s*(days?|weeks?|months?|years?)\b",
        r"\b(?:last|past)\s+(\d+)\s*(days?|weeks?|months?|years?)\b",
        r"\b(\d+)\s*(days?|weeks?|months?|years?)\s+ago\b",
        r"\bduration\s*[:;-]\s*(\d+)\s*(days?|weeks?|months?|years?)\b"
    ]

    for pattern in duration_patterns:
        match = re.search(pattern, normalized, re.I)
        if match:
            info["duration"] = (
                f"{match.group(1)} {match.group(2).lower()}"
            )
            break

    if info["duration"] is None:
        relative_dates = [
            (r"\bsince yesterday\b", "since yesterday"),
            (r"\byesterday\b", "since yesterday"),
            (r"\bsince last night\b", "since last night"),
            (r"\bsince this morning\b", "since this morning"),
            (r"\bsince today\b", "since today")
        ]
        for pattern, value in relative_dates:
            if re.search(pattern, normalized, re.I):
                info["duration"] = value
                break

    # Symptoms
    found = []
    for symptom, patterns in SYMPTOM_PATTERNS.items():
        if any(re.search(p, original, re.I) for p in patterns):
            found.append(symptom)

    # Don't interpret "I feel cold" as a diagnosis;
    # symptom labels are only descriptions.
    if found:
        info["symptoms"] = ", ".join(found)

    # Medicines explicitly labelled in OCR reports
    medicine_match = re.search(
        r"\b(?:medicine|medication)\s*[:;-]\s*(.*?)"
        r"(?=\s+(?:duration|symptoms|age|patient name)\s*[:;-]|[.!?]|$)",
        original, re.I
    )

    if medicine_match:
        value = medicine_match.group(1).strip()
        info["medicine"] = value or None

    return info


if __name__ == "__main__":
    tests = [
        "My name is Sinchana. I am 25 years old. I have fever and headache since 3 days.",
        "I'm Sinchana, aged 26. I've been suffering from cold for the past five days.",
        "Hello, I have been experiencing stomach pain since yesterday.",
        "I'm Ravi. I have a cough and started feeling sick two days ago.",
        "Patient Name: Ravi Age: 25 Symptoms: Fever and headache Duration: 3 days Medicine: Paracetamol 500 mg"
    ]

    for sentence in tests:
        print("\nPATIENT:", sentence)
        result = extract_medical_info(sentence)
        for key, value in result.items():
            print(f"{key}: {value}")
