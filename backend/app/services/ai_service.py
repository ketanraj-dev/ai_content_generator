from openai import OpenAI
from app.core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)


def generate_post(transcript: str) -> str:
    prompt = f"""
    Convert the following YouTube transcript into a professional LinkedIn post.

    Requirements:
    - Engaging hook in first 2 lines
    - Professional tone
    - Clear formatting
    - No personal opinions
    - No speculation
    - Strong conclusion
    - Add relevant hashtags at the end

    Transcript:
    {transcript[:8000]}
    """

    response = client.chat.completions.create(
        model=settings.MODEL_NAME,
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.5,
    )

    return response.choices[0].message.content
