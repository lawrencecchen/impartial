import React from 'react';
// import { Link } from 'react-router-dom';
// import data from './utils/mockData'; // mock data
import NewsCard from './components/NewsCard';
import NewsCardLoading from './components/NewsCardLoading';
import useCurrentTab from './utils/useCurrentTab';
import useFetch from './utils/useFetch';

// const ENDPOINT = 'http://localhost:8080';
const ENDPOINT =
  'https://us-west2-impartial.cloudfunctions.net/get_relevant_articles';

const Newsfeed = () => {
  const { tabUrl } = useCurrentTab();
  // console.log('endpoint:', ENDPOINT, 'pageurl:', tabUrl);
  const { data, isLoading, hasError, error, invalidateCache } = useFetch(
    ENDPOINT,
    'POST',
    tabUrl
  );

  // return <NewsCardLoading />;

  if (hasError) {
    console.log(error);
    return <div>Failed to load... {JSON.stringify(error, null, 2)}</div>;
  }
  if (isLoading) {
    return <NewsCardLoading />;
  }

  return (
    <div>
      {/* <div>Newsfeed: {data.headline}</div> */}
      {/* <Link to="/hello">link</Link> */}
      {/* <h2 className="pb-4 font-serif">Overview</h2> */}
      <button
        className="z-50 text-gray-800 w-5 h-5 absolute right-0 top-0 mr-3 mt-3"
        onClick={invalidateCache}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <NewsCard
        source="Current article"
        date={data.publishedAt}
        description={data.summary}
        headline={data.headline}
        documentSentiment={data.document_sentiment}
        allsidesBias={data.allsides_bias}
      />
      {data.relevant_articles.map((article, index) => {
        const { title, url, body, datePublished, bias } = article;

        return (
          <NewsCard
            key={index}
            source={article.provider.name}
            headline={title}
            description={body}
            href={url}
            date={datePublished}
            allsidesBias={bias}
          />
        );
      })}
    </div>
  );
};

export default Newsfeed;
