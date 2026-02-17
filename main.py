import sys
from graph.workflow import build_workflow
from graph.state import BlogState


def main():
    if len(sys.argv) < 2:
        print("Usage: python main.py <youtube_url>")
        return

    youtube_url = sys.argv[1]

    workflow = build_workflow()
    initial_state = BlogState(youtube_url=youtube_url)

    final_state = workflow.invoke(initial_state)

    print("\n✅ Blog Published Successfully!")
    print("🔗 URL:", final_state.get("published_url"))


if __name__ == "__main__":
    main()
