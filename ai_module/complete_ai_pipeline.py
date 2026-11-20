
import sys
from pathlib import Path
import easyocr

# Locate the AI module
BASE_DIR = Path(__file__).resolve().parent

# Import your existing NLP and summarization functions
sys.path.insert(0, str(BASE_DIR / "nlp"))
sys.path.insert(0, str(BASE_DIR / "summarization"))

from medical_extraction import extract_medical_info
from medical_summary import generate_medical_summary

# Medical report image
image_path = BASE_DIR / "ocr" / "sample_report.png"


def run_complete_pipeline():
    if not image_path.exists():
        print("Image not found:", image_path)
        return

    # Step 1: OCR
    print("\nReading medical report...")
    reader = easyocr.Reader(["en"], gpu=False)

    results = reader.readtext(
        str(image_path),
        detail=0,
        paragraph=False
    )

    ocr_text = "\n".join(results)

    print("\n--- OCR Extracted Text ---\n")
    print(ocr_text)

    # Step 2: NLP
    medical_info = extract_medical_info(ocr_text)

    print("\n--- NLP Extracted Information ---\n")
    for key, value in medical_info.items():
        print(f"{key}: {value}")

    # Step 3: Medical Summarization
    summary = generate_medical_summary(medical_info)

    print("\n--- Medical Summary ---\n")
    print(summary)


if __name__ == "__main__":
    run_complete_pipeline()
