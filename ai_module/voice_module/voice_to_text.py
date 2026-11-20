import speech_recognition as sr

def recognize_voice():
    recognizer = sr.Recognizer()

    # Stop after 2 seconds of silence
    recognizer.pause_threshold = 2.0

    with sr.Microphone() as source:
        print("Adjusting microphone...")
        recognizer.adjust_for_ambient_noise(
            source,
            duration=1
        )

        print("Speak now...")

        # Listen until the patient stops speaking
        audio = recognizer.listen(
            source,
            timeout=None,
            phrase_time_limit=None
        )

    try:
        text = recognizer.recognize_google(
            audio,
            language="en-IN"
        )

        print("\nRecognized Text:")
        print(text)

        return text

    except sr.UnknownValueError:
        print("Sorry, speech was not understood.")
        return None

    except sr.RequestError as e:
        print("Speech recognition error:", e)
        return None


if __name__ == "__main__":
    recognize_voice()