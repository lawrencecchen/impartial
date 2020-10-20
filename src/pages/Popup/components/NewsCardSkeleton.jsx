import React from 'react';

const NewsCardSkeleton = ({}) => {
  return (
    <div className="relative bg-white cursor-pointer rounded-md shadow-xl p-3 mt-5 hover:shadow-2xl transition ease-in-out duration-300">
      <div className="skeleton w-full h-6 mt-3 mb-4"></div>
      <div>
        <div className="skeleton w-full h-3 mb-2"></div>
        <div className="skeleton w-full h-3 mb-2"></div>
        <div className="skeleton w-full h-3 mb-2"></div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;
