from urllib.parse import urlparse
import json

# import firebase_admin
# from firebase_admin import credentials
# from firebase_admin import firestore

# cred = credentials.Certificate(
#     "news-chrome-exte-1595916970396-firebase-adminsdk-5x8rc-98ff2f39d3.json"
# )

# firebase_admin.initialize_app(cred)

# db = firestore.client()


def get_base_url(url):
    parsed_uri = urlparse(url)
    result = "{uri.netloc}/".format(uri=parsed_uri)
    result = result.replace("www.", "")

    return result


# def get_bias_data(url):
#     result = get_base_url(url)
#     # print(result)

#     docs = db.collection("allsides_data").where("url", "==", result).stream()

#     data = [doc.to_dict() for doc in docs]

#     if len(data) < 1:
#         return None

#     return data[0]


f = open("allsides_data.json")
allsides_json = json.load(f)


def get_bias_data_fs(url):
    article_url = urlparse(url).netloc
    bias_data = None

    for item in allsides_json:
        if article_url in item["url"] or article_url.replace("www.", "") in item["url"]:
            bias_data = item
            break

    # if bias_data:
    #     print("===> ", article_url, " ", item["bias_rating"])
    # else:
    #     print("===> ", article_url, " not in dataset")

    return bias_data


# print(get_base_url("https://mashable.com/article/what-is-happening-at-the-usps/"))
