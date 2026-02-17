from config import LINKEDIN_CHAR_LIMIT


def format_for_linkedin(blog_content: str):
    content = blog_content.replace("#", "")  # Remove markdown headings
    
    if len(content) > LINKEDIN_CHAR_LIMIT:
        content = content[:LINKEDIN_CHAR_LIMIT - 100]
        content += "\n\n... (Read full insights above)"

    hashtags = "\n\n#AI #MachineLearning #LLMs #Automation #Tech"

    return content + hashtags
