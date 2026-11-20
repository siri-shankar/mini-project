
import sys
from pathlib import Path

# Locate the AI module folder
BASE_DIR = Path(__file__).resolve().parent

# Add our existing folders to Python's import path
sys.path.insert(0, str(BASE_DIR / "speech_recognition"))
sys.path.insert(0, str(BASE_DIR / "nlp"))

# Import existing functions
from voice_to_text import recognize_voice
from medical_extraction import extract_medical_info


def main():

    print("\n--- MediKiosk Voice Assistant ---")

    # Step 1: Convert patient speech into text
    voice_text = recognize_voice()

    if not voice_text:
        print("\nNo speech recognized. Please try again.")
        return

    print("\n--- Voice Recognized Text ---")
    print(voice_text)

    # Step 2: Extract medical information
    medical_info = extract_medical_info(voice_text)

    print("\n--- Extracted Medical Information ---")

    for key, value in medical_info.items():
        print(f"{key}: {value}")


if __name__ == "__main__":
    main()
