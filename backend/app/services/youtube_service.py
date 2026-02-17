from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs


def extract_video_id(url: str) -> str:
    parsed_url = urlparse(url)
    return parse_qs(parsed_url.query)["v"][0]


def get_transcript(url: str) -> str:
    try:
        video_id = extract_video_id(url)
        ytt_api = YouTubeTranscriptApi()
        transcript = ytt_api.fetch(video_id)

        text = " ".join([t.text for t in transcript])
        return text

    except Exception as e:
        raise Exception(f"Transcript fetch failed: {str(e)}")