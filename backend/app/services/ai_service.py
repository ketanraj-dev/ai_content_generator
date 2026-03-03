from openai import OpenAI
from app.core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)


LENGTH_GUIDE = {
    "short": "Keep the post concise, around 80-120 words.",
    "medium": "Aim for a medium-length post, around 180-220 words.",
    "long": "Write a detailed post, around 300-400 words.",
}

TONE_GUIDE = {
    "professional": "Use a professional, authoritative tone suitable for industry experts.",
    "casual": "Use a conversational, friendly tone that feels approachable and relatable.",
    "storytelling": "Use a narrative storytelling tone — draw the reader in with a story arc.",
}


def generate_post(
    transcript: str,
    tone: str = "professional",
    post_length: str = "medium",
    hashtags: str = "",
) -> str:
    tone_instruction = TONE_GUIDE.get(tone, TONE_GUIDE["professional"])
    length_instruction = LENGTH_GUIDE.get(post_length, LENGTH_GUIDE["medium"])

    hashtag_instruction = ""
    if hashtags and hashtags.strip():
        hashtag_instruction = f"\n    - Include these hashtags at the end: {hashtags.strip()}"
    else:
        hashtag_instruction = "\n    - Add relevant hashtags at the end"

    prompt = f"""
        You are a professional LinkedIn content strategist and B2B copywriter.

        Your task is to convert a YouTube transcript into a high-performing LinkedIn post.

        ========================
        OBJECTIVE
        ========================
        Transform the transcript into an engaging, value-driven LinkedIn post 
        while preserving factual accuracy. Do NOT add new information, opinions, 
        assumptions, or speculation.

        ========================
        TONE & STYLE
        ========================
        {tone_instruction}

        - Clear, concise, and professional
        - Written for LinkedIn audience (founders, professionals, students, tech audience)
        - No fluff, no exaggeration
        - No emojis unless explicitly requested
        - Avoid generic motivational phrases

        ========================
        LENGTH
        ========================
        {length_instruction}

        ========================
        STRUCTURE REQUIREMENTS
        ========================
        1. Hook:
            - The first 2 lines must grab attention.
            - Short and curiosity-driven.
            - Max 12 words per line.
            - Make the reader want to click "see more".

        2. Body:
            - Break into short paragraphs (1-3 lines max).
            - Extract only key insights from transcript.
            - Use bullet points where appropriate.
            - Maintain logical flow.

        3. Clarity Rules:
            - No personal opinions.
            - No assumptions beyond transcript.
            - No filler phrases.
            - No repetition.
            - Keep sentences sharp and readable.

        4. Conclusion:
            - End with a strong takeaway OR
            - A reflection-provoking question OR
            - A subtle professional call-to-action.

        {hashtag_instruction}

        ========================
        OUTPUT FORMAT
        ========================
        Return ONLY the final LinkedIn post.
        Do NOT explain your reasoning.
        Do NOT include markdown formatting.
        Do NOT include quotation marks.

        ========================
        TRANSCRIPT
        ========================
        {transcript[:8000]}
    """

    response = client.chat.completions.create(
        model=settings.MODEL_NAME,
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.6,
    )

    return response.choices[0].message.content
