from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from config import MODEL_NAME

llm = ChatOpenAI(model=MODEL_NAME, temperature=0.5)


def detect_tone(content: str):
    prompt = f"""
    Classify this content into one category:
    Technical, Educational, Motivational, Interview, News.

    Content:
    {content[:2000]}
    """
    response = llm.invoke([HumanMessage(content=prompt)])
    return response.content.strip()


def write_blog(title: str, content: str, tone: str):
    prompt = f"""
    Convert this YouTube content into a professional LinkedIn post.

    Requirements:
    - Professional tone
    - Engaging hook in first 2 lines
    - Clear spacing
    - Short paragraphs
    - Bullet points where useful
    - No personal opinions
    - No speculation
    - Clear conclusion

    Content:
    {content}
    """

    response = llm.invoke([HumanMessage(content=prompt)])
    return response.content
