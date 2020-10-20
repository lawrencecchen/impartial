import requests

from bs4 import BeautifulSoup
from gensim.summarization import summarize

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
import datetime

# from newsapi import NewsApiClient

from urllib.parse import urlparse

# from allsides import get_bias_data
from allsides import get_bias_data_fs

# from dotenv import load_dotenv

# load_dotenv()

# import os

client = language.LanguageServiceClient()
# newsapi = NewsApiClient(api_key=os.environ.get("NEWS_API_KEY"))


def clean_content(sentence_list):
    result = [sentence for sentence in sentence_list if "." in sentence]
    result = [sentence for sentence in result if not "\n" in sentence]

    return " ".join(result)


def summarize_webpage(url, only_summary=False):
    page = requests.get(url).text
    soup = BeautifulSoup(page, features="html.parser")
    headline = soup.find("h1").get_text()
    p_tags = soup.find_all("p")
    p_tags_text = [tag.get_text().strip() for tag in p_tags]
    time_tags = soup.find_all("time")
    time = [tag.get_text().strip() for tag in time_tags]
    published_date = "" if len(time) == 0 else time[0]

    content = clean_content(p_tags_text)

    search_query = headline + " " + " ".join(content.split(" ")[0:100])
    try:
        summary = summarize(content, word_count=100)
    except:
        summary = content

    if only_summary:
        return summary

    return {
        "headline": headline,
        "summary": summary,
        "content": content,
        "published_date": published_date,
        "search_query": search_query,
    }


def natural_language_analysis(text):

    document = types.Document(content=text, type=enums.Document.Type.PLAIN_TEXT)
    sentiment = client.analyze_sentiment(document=document).document_sentiment

    print("Text: {}".format(text))
    print("Sentiment: {}, {}".format(sentiment.score, sentiment.magnitude))


def analyze_entities(text_content):
    """
    Analyzing Entities in a String

    Args:
      text_content The text content to analyze
    """
    type_ = enums.Document.Type.PLAIN_TEXT
    language = "en"
    document = {"content": text_content, "type": type_, "language": language}
    encoding_type = enums.EncodingType.UTF8
    response = client.analyze_entities(document, encoding_type=encoding_type)

    keywords = []

    for entity in response.entities[0:2]:
        keywords.append(entity.name)

    return keywords


def analyze_sentiment(text_content):
    type_ = enums.Document.Type.PLAIN_TEXT
    language = "en"
    document = {"content": text_content, "type": type_, "language": language}
    encoding_type = enums.EncodingType.UTF8
    response = client.analyze_sentiment(document, encoding_type=encoding_type)

    sentiment = {
        "score": response.document_sentiment.score,
        "magnitude": response.document_sentiment.magnitude,
    }

    return sentiment


# def get_articles(keywords_list):
#     keywords = " ".join(keywords_list)
#     print("===> KEYWORDS: ", keywords)
#     all_articles = newsapi.get_everything(
#         q=keywords, language="en", sort_by="popularity", page_size=6,
#     )

#     # print(all_articles.get("articles"))

#     for index, article in enumerate(all_articles.get("articles")):
#         url = article.get("url")
#         # print(url)
#         bias = get_bias_data(url)
#         all_articles["articles"][index]["bias"] = bias

#     return all_articles


def get_articles_contextual_search(keywords_list):
    keywords = " ".join(keywords_list)
    print("===> KEYWORDS: ", keywords)
    contextual_search_url = "https://rapidapi.p.rapidapi.com/api/search/NewsSearchAPI"

    tod = datetime.datetime.now()
    d = datetime.timedelta(days=50)
    a = tod - d

    # a.isoformat()

    querystring = {
        "toPublishedDate": "null",
        "fromPublishedDate": "null",
        "pageSize": "50",
        "q": keywords,
        "autoCorrect": "true",
        "pageNumber": "2",
    }

    headers = {
        "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
        "x-rapidapi-key": "35448ca6ddmshc0fff62d33b7a57p111440jsn104aff79188a",
    }

    response = requests.request(
        "GET", contextual_search_url, headers=headers, params=querystring
    )
    articles_from_contextual = response.json().get("value")

    if not articles_from_contextual:
        return []

    relevant_articles = []

    for article in articles_from_contextual:
        bias_data = get_bias_data_fs(article["url"])

        if bias_data:
            article["bias"] = bias_data
            relevant_articles.append(article)

    if len(relevant_articles) < 2:
        relevant_articles = articles_from_contextual

    return relevant_articles


def balance_relevant_articles(target_bias, relevant_articles):
    if not target_bias:
        return relevant_articles

    unrated_articles = []
    rated_articles = []
    target_bias_rating = target_bias.get("bias_rating")

    try:

        for article in relevant_articles:
            if int(article["bias"]["bias_rating"]) == 2690:
                unrated_articles.append(article)
            else:
                rated_articles.append(article)

        if target_bias_rating == 71 or target_bias_rating == 72:
            for index, article in enumerate(rated_articles):
                cur_article_bias = article["bias"]["bias_rating"]
                if cur_article_bias == 74 or cur_article_bias == 75:
                    rated_articles[index], rated_articles[0] == rated_articles[
                        0
                    ], rated_articles[index]
                    break

        if target_bias_rating == 74 or target_bias_rating == 75:
            for index, article in enumerate(rated_articles):
                cur_article_bias = article["bias"]["bias_rating"]
                if cur_article_bias == 71 or cur_article_bias == 72:
                    rated_articles[index], rated_articles[0] == rated_articles[
                        0
                    ], rated_articles[index]
                    break
        return [*rated_articles, *unrated_articles]

    except:
        return relevant_articles


# relevant_articles = get_articles(["Joe Biden", "Democratic", "proposal", ])

# print(json.dumps(get_articles("portland AND protest"), indent=4, sort_keys=True))
# print(json.dumps(relevant_articles, indent=4))
# 1 = (
#     "https://www.nytimes.com/2020/07/27/science/coronavirus-retracted-studies-data.html"
# )
# url2 = "https://www.npr.org/sections/live-updates-protests-for-racial-justice/2020/07/27/896043971/portland-protesters-file-suit-against-trump-administration-over-federal-response"
# website_text = summarize_webpage(url2)
# natural_language_analysis(website_text)
# sample_analyze_entities(website_text)
