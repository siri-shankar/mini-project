
import sys
import re
from pathlib import Path
import easyocr

# Import existing NLP function
sys.path.insert(
    0,
    str(Path(__file__).resolve().parent / "nlp")
)

from medical_extraction import extract_medical_info


def correct_ocr_text(results):
    """Correct common OCR formatting errors."""

    lines = [str(item).strip() for item in results]

    # Fix Age; 25 to Age: 25
    lines = [
        re.sub(
            r"^Age\s*;",
            "Age:",
            line,
            flags=re.IGNORECASE
        )
        for line in lines
    ]

    # Fix Duration: / 3 / ... / days
    for i, line in enumerate(lines):

        if re.fullmatch(
            r"Duration\s*:",
            line,
            flags=re.IGNORECASE
        ):

            if i + 1 >= len(lines):
                break

            number = lines[i + 1].strip()

            if not number.isdigit():
                break

            # Find separated duration unit
            for j in range(i + 2, len(lines)):

                if re.fullmatch(
                    r"days?|weeks?|months?",
                    lines[j],
                    flags=re.IGNORECASE
                ):

                    lines[i] = (
                        f"Duration: {number} {lines[j]}"
                    )

                    # Remove unit and number from old positions
                    lines.pop(j)
                    lines.pop(i + 1)
                    break

            break

    # Join Symptoms label with its value
    for i, line in enumerate(lines):

        if re.fullmatch(
            r"Symptoms\s*:",
            line,
            flags=re.IGNORECASE
        ):

            if i + 1 < len(lines):
                next_line = lines[i + 1]

                if not re.match(
                    r"^(Patient Name|Age|Duration|Medicine)\s*:",
                    next_line,
                    flags=re.IGNORECASE
                ):
                    lines[i] = f"Symptoms: {next_line}"
                    lines.pop(i + 1)

            break

    return "\n".join(lines)


def format_medical_report(info):
    """Create a readable medical report."""

    labels = {
        "patient_name": "Patient Name",
        "age": "Age",
        "symptoms": "Symptoms",
        "duration": "Duration",
        "medicine": "Medicine"
    }

    report = []

    for key, label in labels.items():
        value = info.get(key)
        report.append(
            f"{label}: {value if value else 'Not detected'}"
        )

    return "\n".join(report)


def main():

    # Locate English sample report
    image_path = (
        Path(__file__).resolve().parent
        / "ocr"
        / "sample_report.png"
    )

    if not image_path.exists():
        print("Image not found:", image_path)
        return

    # Initialize EasyOCR
    reader = easyocr.Reader(
        ["en"],
        gpu=False
    )

    # Read text from image
    results = reader.readtext(
        str(image_path),
        detail=0,
        paragraph=False
    )

    # Show original OCR output
    print("\n--- Original OCR Text ---\n")

    for line in results:
        print(line)

    # Correct OCR formatting
    corrected_text = correct_ocr_text(results)

    print("\n--- Corrected OCR Text ---\n")
    print(corrected_text)

    # Extract medical information
    medical_info = extract_medical_info(
        corrected_text
    )

    print("\n--- NLP Extracted Information ---\n")

    for key, value in medical_info.items():
        print(f"{key}: {value}")

    # Show formatted report
    print("\n--- Final Medical Report ---\n")
    print(format_medical_report(medical_info))


if __name__ == "__main__":
    main()
