import React from 'react';
import NewsCardSkeleton from './NewsCardSkeleton';

const NewsCardLoading = () => {
  return (
    <div>
      <NewsCardSkeleton />
      <NewsCardSkeleton />
      <NewsCardSkeleton />
      <NewsCardSkeleton />
      <NewsCardSkeleton />
    </div>
  );
};

export default NewsCardLoading;
