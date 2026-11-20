
import easyocr
from pathlib import Path

# Kannada + English OCR
reader = easyocr.Reader(['en'], gpu=False)

image_path = Path("ai_module/ocr/sample_report.png")

if image_path.exists():
    results = reader.readtext(
        str(image_path),
        detail=0,
        paragraph=False
    )

    print("\nExtracted Medical Report:\n")

    for line in results:
        print(line)
        print()
else:
    print("Image not found:", image_path)
