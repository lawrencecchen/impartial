from flask import escape
from flask import jsonify
from flask import Response
from flask import abort
from news_analyzer import summarize_webpage
from news_analyzer import analyze_entities
from news_analyzer import analyze_sentiment
from news_analyzer import get_articles_contextual_search
from news_analyzer import balance_relevant_articles
from allsides import get_bias_data_fs

import traceback


def get_relevant_articles(request):
    if request.method == "GET":
        return Response(
            response="Please send a POST request with a url in the body.", status=400
        )
    request_json = request.get_json(silent=True)
    request_args = request.args

    if request_json and "url" in request_json:
        url = request_json["url"]
    elif request_args and "url" in request_args:
        url = request_args["url"]
    else:
        return Response(response="Please include a valid url.", status=400)

    # return {"message": "nani"}

    try:
        result = summarize_webpage(url)
        headline = result.get("headline")
        summary = result.get("summary")
        content = result.get("content")
        search_query = result.get("search_query")
        published_date = result.get("published_date")
        keywords = analyze_entities(search_query)
        document_sentiment = analyze_sentiment(content)
        bias = get_bias_data_fs(url)
        relevant_articles = balance_relevant_articles(
            target_bias=bias, relevant_articles=get_articles_contextual_search(keywords)
        )
        print("===> Number of relevant articles: ", len(relevant_articles))

        # todo: analyze sentiment for each relevant article

        result = {
            "source_url": url,
            "headline": headline,
            "summary": summary,
            "keywords": keywords,
            "relevant_articles": relevant_articles,
            "document_sentiment": document_sentiment,
            "publishedAt": published_date,
            "allsides_bias": bias,
        }

        return jsonify(result)

    except Exception as e:
        print(e)
        traceback.print_exc()
        print("Something went wrong.")
        abort(500)
        # abort(Response("We couldn't find anything"))
        # return Response("We couldn't find anything", status=404)
