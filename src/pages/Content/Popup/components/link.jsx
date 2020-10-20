import React from 'react';

const Link = ({ href, children }) => {
  return (
    <span
      onClick={() => {
        chrome.tabs.create({ active: true, url: href });
      }}
      className="cursor-pointer"
    >
      {children}
    </span>
  );
};

export default Link;
