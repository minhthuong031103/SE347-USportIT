'use client';

import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const page = () => {
  const [data, setData] = useState(Array.from({ length: 20 }));
  const [hasMore] = useState(true);
  const fetchMoreData = () => {
    setTimeout(() => {
      setData(data.concat(Array.from({ length: 20 })));
    }, 500);
  };
  return (
    <div>
      <InfiniteScroll
        dataLength={data.length}
        next={() => {
          fetchMoreData();
        }}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height={500}
      >
        {data.map((item, index) => {
          return (
            <div className="border-2 border-solid bg-slate-500 p-12">
              this is a div {index}
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
export default page;
