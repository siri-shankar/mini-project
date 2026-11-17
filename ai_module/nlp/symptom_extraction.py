import re

# Common symptoms for initial testing
symptoms_list = [
    "fever",
    "headache",
    "cough",
    "cold",
    "vomiting",
    "dizziness",
    "stomach pain",
    "chest pain",
    "fatigue",
    "sore throat"
]

def extract_symptoms(text):
    text = text.lower()

    symptoms = [
        symptom
        for symptom in symptoms_list
        if re.search(
            r"\b" + re.escape(symptom) + r"\b",
            text
        )
    ]

    return symptoms


if __name__ == "__main__":
    patient_text = (
        "I have fever and headache for 3 days."
    )

    result = extract_symptoms(patient_text)

    print("Detected Symptoms:", result)