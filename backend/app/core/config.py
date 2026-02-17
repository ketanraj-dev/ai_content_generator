import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    LINKEDIN_ACCESS_TOKEN: str = os.getenv("LINKEDIN_ACCESS_TOKEN")
    LINKEDIN_PERSON_URN: str = os.getenv("LINKEDIN_PERSON_URN")
    MODEL_NAME: str = "gpt-4.1-mini"


settings = Settings()
