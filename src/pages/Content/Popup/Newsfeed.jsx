import React from 'react';
// import { Link } from 'react-router-dom';
// import data from './utils/mockData'; // mock data
import NewsCard from './components/NewsCard';
import NewsCardLoading from './components/NewsCardLoading';
import useCurrentTab from './utils/useCurrentTab';
import useFetch from './utils/useFetch';

const ENDPOINT = 'http://localhost:8080';

const Newsfeed = () => {
  const { tabUrl } = useCurrentTab();
  // console.log('endpoint:', ENDPOINT, 'pageurl:', tabUrl);
  const { data, isLoading, hasError, error } = useFetch(
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
      <NewsCard
        source="Current article"
        date={data.publishedAt}
        description={data.summary}
        headline={data.headline}
        documentSentiment={data.document_sentiment}
        allsidesBias={data.allsides_bias}
      />
      {data.relevant_articles.articles.map((article, index) => {
        const { title, url, description, publishedAt } = article;

        return (
          <NewsCard
            key={index}
            source={article.source.name}
            headline={title}
            description={description}
            href={url}
            date={publishedAt}
            allsidesBias={article.allsides_bias}
          />
        );
      })}
    </div>
  );
};

export default Newsfeed;
