import { useEffect, useState } from 'react';

function getCurrentTab() {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        let url = tabs[0].url;
        resolve(url);
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

const useCurrentTab = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tabUrl, setTabUrl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const currentTab = await getCurrentTab();
        setTabUrl(currentTab);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    })();
    setIsLoading(false);
  }, []);

  return { tabUrl, isLoading, error };
};

export default useCurrentTab;
