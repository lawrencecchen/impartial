import isUrl from 'is-url';
import { useEffect, useState } from 'react';

const getCachedData = async (tabUrl) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([tabUrl], (result) => {
      if (result.hasOwnProperty(tabUrl)) {
        resolve(result[tabUrl]);
      } else {
        resolve(null);
      }
    });
  });
};

const useFetch = (url, method, tabUrl) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [invalidated, setInvalidated] = useState(0);

  function invalidateCache() {
    setData(null);
    setIsLoading(true);
    chrome.storage.local.remove(tabUrl);
    setInvalidated(invalidated + 1);
  }

  useEffect(() => {
    if (!tabUrl || !isUrl(tabUrl)) return;
    console.log('Fetching....');

    const fetchData = async () => {
      const cachedData = await getCachedData(tabUrl);
      if (cachedData) {
        console.log('cached data: ', cachedData);
        setData(cachedData);
        setIsLoading(false);
      } else {
        try {
          setIsLoading(true);
          const myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');
          const body = JSON.stringify({ url: tabUrl });
          const request = new Request(url, {
            method,
            body: body,
            headers: myHeaders,
          });
          const response = await fetch(request);
          const result = await response.json();
          console.log('fetched data: ', result);

          setData(result);
          chrome.storage.local.set({ [tabUrl]: result });
          setIsLoading(false);
        } catch (err) {
          console.log('big err', err);
          setInvalidated(invalidated + 1);
          setError(err);
          setHasError(true);
        }
      }
    };
    fetchData();
  }, [tabUrl, method, url, invalidated]);

  return { data, isLoading, hasError, error, invalidateCache };
};

export default useFetch;
