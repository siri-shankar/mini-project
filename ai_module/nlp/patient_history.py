from symptom_extraction import extract_symptoms
from duration_extraction import extract_duration
import json

def extract_patient_history(text):
    return {
        "symptoms": extract_symptoms(text),
        "duration": extract_duration(text)
    }

if __name__ == "__main__":
    patient_text = "I have fever and headache for 3 days."

    result = extract_patient_history(patient_text)

    print(json.dumps(result, indent=4))