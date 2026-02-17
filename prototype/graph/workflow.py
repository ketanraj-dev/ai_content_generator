from langgraph.graph import StateGraph, END
from graph.state import BlogState
from tools.youtube_tool import fetch_transcript
from agents.summarizer import smart_summarize
from agents.writer import detect_tone, write_blog
from agents.linkedin_formatter import format_for_linkedin
from tools.linkedin_tool import publish_to_linkedin


def fetch_node(state: BlogState):
    transcript = fetch_transcript(state.youtube_url)
    state.transcript = transcript
    return state


def summarize_node(state: BlogState):
    processed = smart_summarize(state.transcript)
    state.processed_content = processed
    return state


def write_node(state: BlogState):
    tone = detect_tone(state.processed_content)
    blog = write_blog("YouTube Video", state.processed_content, tone)
    state.blog_content = blog
    return state





def linkedin_format_node(state):
    formatted = format_for_linkedin(state.blog_content)
    state.blog_content = formatted
    return state


def publish_node(state):
    publish_to_linkedin(state.blog_content)
    state.published_url = "Posted Successfully"
    return state


def build_workflow():
    graph = StateGraph(BlogState)

    graph.add_node("fetch", fetch_node)
    graph.add_node("summarize", summarize_node)
    graph.add_node("write", write_node)
    graph.add_node("format", linkedin_format_node)
    graph.add_node("publish", publish_node)

    graph.set_entry_point("fetch")
    graph.add_edge("fetch", "summarize")
    graph.add_edge("summarize", "write")
    graph.add_edge("write", "format")
    graph.add_edge("format", "publish")
    graph.add_edge("publish", END)

    return graph.compile()
