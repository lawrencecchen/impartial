from urllib.parse import urlparse
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
# cred = credentials.ApplicationDefault()
# export GOOGLE_APPLICATION_CREDENTIALS="news-chrome-exte-1595916970396-e8b44e7835af.json"
# cred = credentials.Certificate("news-chrome-exte-1595916970396-e8b44e7835af.json")

# firebase_admin.initialize_app(cred, {"projectId": "news-chrome-exte-1595916970396",})

# db = firestore.client()

# initialize data
# with open("allsides_data.json") as f:
#     data = json.load(f)

# for index, entry in enumerate(data):
#     parsed_uri = urlparse(entry["url"])
#     if not parsed_uri.netloc:
#         continue
#     result = "{uri.netloc}{uri.path}".format(uri=parsed_uri)
#     result = result.replace("www.", "")

#     entry["url"] = result

#     print(f"{index} ==> {entry['url']}")
#     db.collection("allsides_data").add(entry)


def getBaseUrl(url):
    parsed_uri = urlparse(url)
    result = "{uri.netloc}/".format(uri=parsed_uri)
    result = result.replace("www.", "")

    return result


result = getBaseUrl("https://www.nytimes.com/section/opinion")
print(result)

# docs = db.collection("allsides_data").where("url", "==", result).stream()

for doc in docs:
    print(doc.to_dict())
