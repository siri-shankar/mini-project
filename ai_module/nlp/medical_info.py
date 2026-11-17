import re

def extract_medical_info(text):
    medicines = []
    allergies = []

    medicine_pattern = (
        r"\b(?:paracetamol|amoxicillin|ibuprofen)"
        r"(?:\s+\d+\s*mg)?\b"
    )

    medicines = re.findall(
        medicine_pattern, text, re.IGNORECASE
    )

    allergy_pattern = (
        r"\ballergic to\s+([a-zA-Z]+)"
    )

    allergies = re.findall(
        allergy_pattern, text, re.IGNORECASE
    )

    return {
        "medicines": medicines,
        "allergies": allergies
    }


if __name__ == "__main__":
    patient_text = (
        "I take Paracetamol 500 mg "
        "and I am allergic to penicillin."
    )

    result = extract_medical_info(patient_text)

    print(result)