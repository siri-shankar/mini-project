
import json
from unittest import result
from transformers import pipeline

print("Loading MediKiosk NLP model...", flush=True)

extractor = pipeline(
    "text2text-generation",
    model="google/flan-t5-small",
    device=-1
)

FIELDS = [
    "patient_name",
    "age",
    "symptoms",
    "duration",
    "medicine"
]


def extract_medical_info(text):
    prompt = f"""
Extract medical information from this patient's speech.

Return ONLY a valid JSON object containing:
patient_name, age, symptoms, duration, medicine.

Instructions:
- Identify information regardless of sentence order.
- Convert spoken numbers into digits.
- Keep symptoms separate from duration.
- Never invent information.
- Use null for missing details.

Example input:
My name is Ravi. I am 25 years old.
I am suffering from fever for three days.

Example output:
{{"patient_name":"Ravi","age":"25",
"symptoms":"fever","duration":"3 days",
"medicine":null}}

Patient speech:
{text}

JSON:
"""
    result = extractor(
    "Extract the symptom only.\n"
    "Sentence: I have fever.\n"
    "Symptom: fever\n"
    "Sentence: I am suffering from cold.\n"
    "Symptom: cold\n"
    f"Sentence: {text}\n"
    "Symptom:",
    max_new_tokens=40,
    do_sample=False
)[0]["generated_text"]

    print("EXTRACTED SYMPTOM:", repr(result))

    try:
        start = result.index("{")
        end = result.rindex("}") + 1
        data = json.loads(result[start:end])

        if not isinstance(data, dict):
            data = {}

    except (ValueError, json.JSONDecodeError):
        print("Model output could not be parsed:", result)
        data = {}

    return {
        field: data.get(field)
        for field in FIELDS
    }


if __name__ == "__main__":
    sentences = [
        "My name is Sinchana. I am 25 years old. I have fever and headache since 3 days.",

        "I'm Sinchana. I'm 26 years old. I'm suffering from cold for the past five days.",

        "Hello, I have been experiencing stomach pain since yesterday.",

        "I'm Ravi. I have a cough and started feeling sick two days ago."
    ]

    for sentence in sentences:
        print("\nPatient:", sentence)
        print("Extracted Information:")

        information = extract_medical_info(sentence)

        for key, value in information.items():
            print(f"{key}: {value}")
