import pytesseract
from PIL import Image, ImageEnhance, ImageOps, ImageFilter
from pathlib import Path

# Tesseract installation path
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def extract_text(image_path, lang="kan"):
    # Open original image
    image = Image.open(image_path).convert("RGB")

    # Convert to grayscale
    gray = ImageOps.grayscale(image)

    # Increase image size
    gray = gray.resize(
        (gray.width * 3, gray.height * 3),
        Image.Resampling.LANCZOS
    )

    # Improve contrast slightly
    gray = ImageEnhance.Contrast(gray).enhance(1.3)

    # Improve sharpness
    gray = gray.filter(ImageFilter.SHARPEN)

    # Try OCR on both original and processed images
    original_text = pytesseract.image_to_string(
        image,
        lang=lang,
        config="--oem 1 --psm 7"
    )

    processed_text = pytesseract.image_to_string(
        gray,
        lang=lang,
        config="--oem 1 --psm 7"
    )

    # Select the result with more recognized characters
    text = max(
        [original_text, processed_text],
        key=lambda x: len(x.strip())
    )

    # Try to recognize the first line separately
    top_height = max(1, gray.height // 3)
    name_area = gray.crop(
        (0, 0, gray.width, gray.height//5)
    )

    name_text = pytesseract.image_to_string(
        name_area,
        lang=lang,
        config="--oem 1 --psm 6"
    ).strip()

    # Add the name line only if it appears missing
    # and the separate OCR result looks like a name field
    if (
        name_text
        and ("ಹೆಸರು" in name_text or "ರೋಗಿಯ" in name_text)
        and "ಹೆಸರು" not in text
    ):
        text = name_text + "\n" + text

    return text.strip()


if __name__ == "__main__":

    # Kannada medical report image
    image_path = Path(
        "ai_module/ocr/kannada_report.png"
    )

    if not image_path.exists():
        print("Image not found:", image_path)

    else:
        text = extract_text(image_path, lang="kan")

        print("\nExtracted Medical Report:\n")

        if text:
            for line in text.splitlines():
                if line.strip():
                    print(line.strip())
                    print()
        else:
            print("No text detected.")