import re

def extract_duration(text):
    pattern = (
        r"\b(?:for\s+)?(\d+)\s*"
        r"(day|days|week|weeks|month|months|hour|hours)\b"
    )

    match = re.search(pattern, text, re.IGNORECASE)

    if match:
        return match.group(1) + " " + match.group(2)

    return "Not mentioned"


if __name__ == "__main__": 
    patient_text = "I have fever and headache for 3 days."

    duration = extract_duration(patient_text)

    print("Detected Duration:", duration)