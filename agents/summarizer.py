import tiktoken
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from config import MODEL_NAME, TOKEN_THRESHOLD, CHUNK_SIZE


llm = ChatOpenAI(model=MODEL_NAME, temperature=0.3)


def count_tokens(text: str):
    enc = tiktoken.encoding_for_model("gpt-4")
    return len(enc.encode(text))


def summarize_chunk(chunk: str):
    prompt = f"""
    Summarize this part of a YouTube transcript clearly and professionally.
    Preserve key ideas and structure.

    Transcript:
    {chunk}
    """
    response = llm.invoke([HumanMessage(content=prompt)])
    return response.content


def smart_summarize(transcript: str):
    if count_tokens(transcript) < TOKEN_THRESHOLD:
        return transcript

    chunks = [
        transcript[i : i + CHUNK_SIZE]
        for i in range(0, len(transcript), CHUNK_SIZE)
    ]

    summaries = [summarize_chunk(chunk) for chunk in chunks]

    merged = "\n\n".join(summaries)

    final_prompt = f"""
    Merge these summarized sections into a structured, coherent master summary.

    {merged}
    """

    response = llm.invoke([HumanMessage(content=final_prompt)])
    return response.content
