import sys
from pathlib import Path

# Locate the AI module folders
BASE_DIR = Path(__file__).resolve().parent

sys.path.insert(0, str(BASE_DIR / "voice_module"))
sys.path.insert(0, str(BASE_DIR / "nlp"))

# Import existing working modules
from voice_to_text import recognize_voice
from hybrid_medical_extraction import extract_medical_info


def main():
    print("\n================================")
    print("   MediKiosk AI Voice Assistant")
    print("================================")

    print("\nPlease describe your health problem.")

    # Step 1: Convert voice into text
    voice_text = recognize_voice()

    if not voice_text:
        print("\nNo speech recognized. Please try again.")
        return

    print("\n--- Recognized Speech ---")
    print(voice_text)

    # Step 2: Extract medical information
    medical_info = extract_medical_info(voice_text)

    print("\n--- Extracted Medical Information ---")
    for key, value in medical_info.items():
        print(f"{key}: {value}")

    # Step 3: Create a basic medical summary
    name = medical_info.get("patient_name") or "The patient"
    age = medical_info.get("age")
    symptoms = medical_info.get("symptoms")
    duration = medical_info.get("duration")
    medicine = medical_info.get("medicine")

    summary = name

    if age:
        summary += f", aged {age}"

    if symptoms:
        summary += f", reports {symptoms}"
    else:
        summary += ", reports symptoms that require clarification"

    if duration:
        summary += f" for {duration}"

    if medicine:
        summary += f". Reported medicine: {medicine}"

    summary += "."

    print("\n--- Medical Summary ---")
    print(summary)

    # Step 4: Patient confirmation
    print("\nPlease verify the information above.")
    confirmation = input("Is the information correct? (yes/no): ")

    if confirmation.strip().lower() in ["yes", "y"]:
        print("\nInformation confirmed.")
        print("Ready for backend integration.")
    else:
        print("\nInformation not confirmed.")
        print("Please correct the details before saving.")


if __name__ == "__main__":
    main()
