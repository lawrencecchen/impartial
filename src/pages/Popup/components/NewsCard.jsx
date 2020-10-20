import React from 'react';
import LinesEllipsisLoose from 'react-lines-ellipsis/lib/loose';
import dayjs from 'dayjs';
import getEmoji from '../utils/emojiSentiment';
import getBiasIcons from '../utils/getBiasIcons';
import getBiasText from '../utils/getBiasText';

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
    console.log(key, colors[key]);
    bgColor = colors[key];
  }

  return {
    backgroundColor: bgColor,
    color: fgColor,
  };
};

const BiasRating = ({ bias }) => {
  return (
    <span className="emoji w-4 inline-block ml-3">
      <a
        href={bias.allsides_url}
        onClick={() => {
          if (!bias.allsides_url) return;
          chrome.tabs.create({ active: true, url: bias.allsides_url });
        }}
      >
        <img
          src={getBiasIcons[bias.bias_rating]}
          alt={getBiasText[bias.bias_rating]}
        />
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
        <span className="pill" style={setBg(source)}>
          {source}
        </span>

        <span className="inline-flex flex-row items-center">
          {allsidesBias ? (
            <BiasRating bias={allsidesBias} />
          ) : (
            <span className="emoji w-4 inline-block ml-3">
              <img
                src={getBiasIcons['not_yet_rated']}
                alt="Publication bias not yet rated."
              />
            </span>
          )}

          <span className="emoji text-xl inline-block ml-3">
            {documentSentiment ? (
              <div className="gradient w-20 h-2">
                <div
                  className="h-3 w-1 bg-gray-700"
                  style={{
                    transform: `translate(${
                      ((documentSentiment.score + 1) / 2) * 80
                    }px, -2px)`,
                  }}
                />
              </div>
            ) : (
              <> </>
            )}
          </span>
        </span>
      </div>

      <div className="text-gray-600 text-xs absolute right-0 transform -translate-x-3 -translate-y-2">
        {dayjs(date).isValid() ? dayjs(date).format('MM/DD/YYYY') : ''}
      </div>

      <h1 className="font-serif font-semibold text-md pt-3 leading-tight mb-1 tracking-normal">
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
