import pytesseract
from PIL import Image, ImageOps, ImageEnhance

# Location of Tesseract OCR
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def extract_text(image_path, lang="eng+kan+hin"):
    # Open image
    image = Image.open(image_path)

    # Convert to grayscale
    image = image.convert("L")

    # Check whether background is dark
    # Tesseract generally works better with dark text on white
    image = ImageOps.invert(image)

    # Increase image size
    image = image.resize(
        (image.width * 2, image.height * 2),
        Image.Resampling.LANCZOS
    )

    # Improve contrast
    image = ImageEnhance.Contrast(image).enhance(1.2)
    image.save("ai_module/ocr/processed_kannada.png")

    # Extract text
    text = pytesseract.image_to_string(
        image,
        lang=lang,
        config="--oem 1 --psm 3"
    )

    return text


if __name__ == "__main__":

    # Kannada medical report
    image_path = "ai_module/ocr/kannada_report.png"

    # Test Kannada separately first
    text = extract_text(image_path, lang="kan")

    print("Extracted Medical Report:")
    print(text)