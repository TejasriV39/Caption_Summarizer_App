from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def summarize_text(text):
    if len(text.strip()) < 20:
        return "Text is too short to summarize."
    try:
        summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        return f"Error: {str(e)}"
