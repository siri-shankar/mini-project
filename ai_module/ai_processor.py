import re

SYMPTOMS = {
    "fever": [r"\bfever\b", r"\bfeverish\b"],
    "headache": [r"\bheadache\b", r"\bhead pain\b"],
    "cold": [r"\bcold\b"],
    "cough": [r"\bcough(?:ing)?\b"],
    "stomach pain": [r"\bstomach pain\b", r"\babdominal pain\b"],
    "vomiting": [r"\bvomit(?:ing)?\b"],
    "dizziness": [r"\bdizz(?:y|iness)\b"],
    "sore throat": [r"\bsore throat\b"],
    "fatigue": [r"\bfatigue\b", r"\bweakness\b"],
    "diarrhea": [r"\bdiarrh(?:ea|oea)\b"]
}

MEDICINES = [
    "paracetamol", "dolo", "crocin", "ibuprofen",
    "amoxicillin", "cetirizine", "metformin"
]

ILLNESSES = [
    "asthma", "diabetes", "hypertension",
    "thyroid disease", "tuberculosis", "pneumonia"
]


def mentioned(text, pattern):
    """Check a term and avoid simple negated mentions."""
    for match in re.finditer(pattern, text, re.I):
        before = text[max(0, match.start() - 45):match.start()]
        before = re.split(r"[.,;!?]", before)[-1]

        if re.search(
            r"\b(?:no|not|without|denies|never had|"
            r"don't have|doesn't have|do not have)\s+"
            r"(?:(?:any|a|an)\s+)?$",
            before, re.I
        ):
            continue

        return True

    return False


def extract_label(text, labels):
    names = "|".join(re.escape(x) for x in labels)

    pattern = (
        rf"\b(?:{names})\s*:\s*(.*?)"
        r"(?=\s+(?:symptoms?|allergies|medications?|"
        r"medicines?|previous illnesses|past medical history)"
        r"\s*:|$)"
    )

    match = re.search(pattern, text, re.I)

    if match:
        return match.group(1).strip(" .;,") or None

    return None


def generate_summary(history_text):
    if not isinstance(history_text, str):
        raise TypeError("Medical history must be a string")

    text = re.sub(r"\s+", " ", history_text).strip()

    if not text:
        return "Patient Case History\nNo medical history provided."

    # Extract symptoms
    symptoms = extract_label(text, ["symptoms", "symptom"])

    if not symptoms:
        found = [
            name for name, patterns in SYMPTOMS.items()
            if any(mentioned(text, p) for p in patterns)
        ]
        symptoms = ", ".join(found) if found else None

    # Extract allergies
    allergies = extract_label(text, ["allergies", "allergy"])

    if not allergies:
        match = re.search(
            r"\ballergic to\s+(.+?)"
            r"(?=[.!;]|$)", text, re.I
        )
        if match:
            allergies = match.group(1).strip()

    if re.search(r"\bno known allergies\b", text, re.I):
        allergies = "No known allergies reported"

    # Extract medications
    medications = extract_label(
        text, ["medications", "medication", "medicine"]
    )

    if not medications:
        found = [
            medicine for medicine in MEDICINES
            if mentioned(text, rf"\b{re.escape(medicine)}\b")
        ]
        medications = ", ".join(found) if found else None

    # Extract previous illnesses
    previous = extract_label(
        text, ["previous illnesses", "past medical history"]
    )

    if not previous:
        found = [
            illness for illness in ILLNESSES
            if mentioned(text, rf"\b{re.escape(illness)}\b")
        ]
        previous = ", ".join(found) if found else None

    summary = (
        "PATIENT CASE HISTORY\n"
        "--------------------\n"
        f"Symptoms: {symptoms or 'Not reported'}\n"
        f"Allergies: {allergies or 'Not reported'}\n"
        f"Medications: {medications or 'Not reported'}\n"
        f"Previous Illnesses: {previous or 'Not reported'}"
    )

    return summary


if __name__ == "__main__":
    history = (
        "Patient has fever and headache for 3 days. "
        "Allergic to penicillin. "
        "Taking paracetamol 500 mg. "
        "Previously had asthma."
    )

    print(generate_summary(history))
