import sys
from pathlib import Path

# Locate existing AI module folders
BASE_DIR = Path(__file__).resolve().parent

sys.path.insert(0, str(BASE_DIR / "voice_module"))
sys.path.insert(0, str(BASE_DIR / "nlp"))

from voice_to_text import recognize_voice
from hybrid_medical_extraction import extract_medical_info


def create_summary(info):
    name = info.get("patient_name") or "The patient"
    age = info.get("age")
    symptoms = info.get("symptoms")
    duration = info.get("duration")
    medicine = info.get("medicine")

    summary = name

    if age:
        summary += f", aged {age}"

    if symptoms:
        summary += f", reports {symptoms}"
    else:
        summary += ", reports symptoms requiring clarification"

    if duration:
        summary += f" for {duration}"

    summary += "."

    if medicine:
        summary += f" Reported medicine: {medicine}."

    return summary


def display_information(info):
    print("\n--- Extracted Medical Information ---")

    for key in [
        "patient_name", "age", "symptoms",
        "duration", "medicine"
    ]:
        print(f"{key}: {info.get(key) or 'Not provided'}")


def correct_information(info):
    fields = {
        "1": ("patient_name", "Patient Name"),
        "2": ("age", "Age"),
        "3": ("symptoms", "Symptoms"),
        "4": ("duration", "Duration"),
        "5": ("medicine", "Medicine")
    }

    while True:
        print("\n--- Correct Patient Information ---")

        for number, (_, label) in fields.items():
            print(f"{number}. {label}")

        print("6. Finish correction")

        choice = input("\nEnter your choice (1-6): ").strip()

        if choice == "6":
            break

        if choice not in fields:
            print("Invalid choice. Please select 1-6.")
            continue

        field, label = fields[choice]
        new_value = input(f"Enter correct {label}: ").strip()

        if not new_value:
            print("Value cannot be empty. Try again.")
            continue

        if field == "age":
            if not new_value.isdigit():
                print("Please enter a valid numeric age.")
                continue

            age_number = int(new_value)

            if age_number < 0 or age_number > 120:
                print("Please enter an age between 0 and 120.")
                continue

            new_value = age_number

        info[field] = new_value
        print(f"{label} updated successfully!")

    return info


def main():
    print("\n================================")
    print("   MediKiosk AI Voice Assistant")
    print("================================")

    print("\nPlease describe your health problem.")

    # Step 1: Voice recognition
    voice_text = recognize_voice()

    if not voice_text:
        print("\nNo speech recognized. Please try again.")
        return

    print("\n--- Recognized Speech ---")
    print(voice_text)

    # Step 2: Medical information extraction
    medical_info = extract_medical_info(voice_text)

    # Step 3: Review and correction
    while True:
        display_information(medical_info)

        summary = create_summary(medical_info)

        print("\n--- Medical Summary ---")
        print(summary)

        print("\nPlease verify the information above.")

        confirmation = input(
            "Is the information correct? (yes/no): "
        ).strip().lower()

        if confirmation in ["yes", "y"]:
            print("\nPatient information confirmed!")
            print("Ready for backend integration.")
            break

        elif confirmation in ["no", "n"]:
            medical_info = correct_information(medical_info)

        else:
            print("\nPlease enter yes or no.")


if __name__ == "__main__":
    main()
