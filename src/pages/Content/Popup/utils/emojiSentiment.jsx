import React from 'react';

const getEmoji = (magnitude, score) => {
  console.log('analyzing sentiment:', magnitude, score);

  if (score < -0.5 && magnitude > 3) {
    return (
      <span role="img" aria-label="clearly negative">
        😒
      </span>
    );
  } else if (score < -0.2 && magnitude > 3) {
    return (
      <span role="img" aria-label="somewhat negative">
        😕
      </span>
    );
  } else if (score > 0.2 && magnitude > 3) {
    return (
      <span role="img" aria-label="somewhat positive">
        🙂
      </span>
    );
  } else if (score > 0.5 && magnitude > 3) {
    return (
      <span role="img" aria-label="clearly positive">
        😀
      </span>
    );
  } else if (magnitude > 3) {
    return (
      <span role="img" aria-label="mixed">
        🤔
      </span>
    );
  } else {
    return (
      <span role="img" aria-label="neutral">
        😶
      </span>
    );
  }
};

export default getEmoji;
