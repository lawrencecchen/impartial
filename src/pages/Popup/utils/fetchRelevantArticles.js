import isUrl from 'is-url';

async function fetchRelevantArticles(endpoint, pageUrl) {
  if (!isUrl(pageUrl)) {
    throw new Error('Enter a valid url.');
  }

  // chrome.storage.local.get('pageUrl', (result) => {
  //   if (result.pageUrl) {
  //     console.log('successfully fetched from chrome storage');
  //     return result.pageUrl;
  //   }
  // });

  const body = {
    url: pageUrl,
  };
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const request = new Request(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: myHeaders,
  });

  try {
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);

    // chrome.storage.local.set({ pageUrl: data }, () =>
    //   console.log('saved:', data)
    // );

    return data;
    // return data.relevant_articles.articles;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

// function fetchRelevantArticles(endpoint, pageUrl) {
//   return new Promise(async (resolve, reject) => {
//     const body = {
//       pageUrl,
//     };
//     var myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');

//     const request = new Request(endpoint, {
//       method: 'POST',
//       body: JSON.stringify(body),
//       headers: myHeaders,
//     });

//     try {
//       const response = await fetch(request);
//       const data = await response.json();
//       console.log('results', data.relevant_articles.articles);

//       resolve(data.relevant_articles.articles);
//     } catch (err) {
//       console.log(err);
//       reject(err);
//     }
//   });
// }

export default fetchRelevantArticles;
