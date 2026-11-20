
def generate_medical_summary(info):
    """Generate a factual summary from extracted medical data."""

    name = info.get("patient_name")
    age = info.get("age")
    symptoms = info.get("symptoms")
    duration = info.get("duration")
    medicine = info.get("medicine")

    sentences = []

    if name:
        introduction = name
        if age:
            introduction += f", aged {age}"
        introduction += "."
        sentences.append(introduction)
    elif age:
        sentences.append(f"The patient is {age} years old.")

    if symptoms:
        symptom_sentence = f"The patient reports {symptoms}"
        if duration:
            symptom_sentence += f" for {duration}"
        symptom_sentence += "."
        sentences.append(symptom_sentence)

    if medicine:
        sentences.append(
            f"The medical report lists {medicine} as the medication."
        )

    if not sentences:
        return "No medical information available for summarization."

    return " ".join(sentences)


if __name__ == "__main__":

    sample_info = {
        "patient_name": "Test Patient",
        "age": "25",
        "symptoms": "Fever and headache",
        "duration": "3 days",
        "medicine": "Paracetamol 500 mg"
    }

    summary = generate_medical_summary(sample_info)

    print("\n--- AI Medical Summary ---\n")
    print(summary)
