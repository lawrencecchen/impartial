import React from 'react';
import LinesEllipsisLoose from 'react-lines-ellipsis/lib/loose';
import dayjs from 'dayjs';
import getEmoji from '../utils/emojiSentiment';

const truncate = (input) =>
  input.length > 180 ? `${input.substring(0, 180)}` : input;

const colors = {
  mashable: '#1CAAE0',
  reuters: '#FD8024',
  'fox news': '#043465',
  'the hill': '#2D57BE',
  'associated press': '#FC3537',
  'yahoo entertainment': '#601DCF',
  'new york post': '#CA3538',
  'toronto star': 'rgb(15, 110, 177)',
};

const setBg = (source) => {
  let bgColor = '#2B2B2B';
  // let bgColor = '#FFE66D';
  let fgColor = 'var(--accents-1)';

  if (source.toUpperCase() === 'CURRENT ARTICLE') {
    bgColor = '#FFE66D';
    return {
      backgroundColor: bgColor,
    };
  }

  const key = source.toLowerCase();
  if (key in colors) {
    bgColor = colors[key];
  }

  return {
    backgroundColor: bgColor,
    color: fgColor,
  };
};

const biasIcons = {
  not_yet_rated:
    'https://www.allsides.com/sites/default/files/styles/bias144x24/public/bias-not-yet-rated.png',
  2707: 'http://www.allsides.com/sites/default/files/styles/bias144x24/public/bias-allsides-new-12_0.png',
  75: 'http://www.allsides.com/sites/default/files/styles/bias144x24/public/bias-right.png',
  74: 'http://www.allsides.com/sites/default/files/styles/bias144x24/public/bias-leaning-right.png',
  73: 'http://www.allsides.com/sites/default/files/styles/bias144x24/public/bias-center.png',
  72: 'http://www.allsides.com/sites/default/files/styles/bias144x24/public/bias-leaning-left.png',
  71: 'http://www.allsides.com/sites/default/files/styles/bias144x24/public/bias-left.png',
};

const BiasRating = ({ bias }) => {
  console.log('lmaooo', bias);
  return (
    <span className="emoji text-xl inline-block ml-3">
      <a href={bias.allsides_url}>
        <img src={bias[bias.bias_rating]} alt="lol" />
      </a>
    </span>
  );
};

const NewsCard = ({
  source,
  headline,
  description,
  href,
  date,
  documentSentiment,
  allsidesBias,
}) => {
  return (
    <div
      className="relative bg-white cursor-pointer rounded-md shadow-xl p-3 mt-5 hover:shadow-2xl transition ease-in-out duration-300"
      onClick={() => {
        if (!href) return;
        chrome.tabs.create({ active: true, url: href });
      }}
    >
      <div className="card-header">
        <span className="pill font-sans" style={setBg(source)}>
          {source}
        </span>

        {allsidesBias ? (
          <BiasRating bias={allsidesBias} />
        ) : (
          <img
            src={biasIcons['not_yet_rated']}
            alt="Publication bias not yet rated."
          />
        )}

        <span className="emoji text-xl inline-block ml-3">
          {documentSentiment ? (
            getEmoji(documentSentiment.magnitude, documentSentiment.score)
          ) : (
            <span role="img" aria-label="unknown sentiment">
              🤷‍♂️
            </span>
          )}
        </span>
      </div>
      <div className="text-gray-600 text-xs absolute right-0 transform -translate-x-3 -translate-y-2">
        {dayjs(date).isValid() ? dayjs(date).format('MMMM D, YYYY') : ''}
      </div>
      <h1 className="font-serif text-lg font-semibold text-md pt-3 leading-tight mb-1 tracking-normal">
        {headline}
      </h1>
      <div className="font-sans text-sm text-gray-700 leading-relaxed tracking-wide overflow-hidden">
        <LinesEllipsisLoose
          text={truncate(description)}
          maxLine={3}
          ellipsis="..."
        />
      </div>
    </div>
  );
};

export default NewsCard;
