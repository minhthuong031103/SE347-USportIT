'use client';
import { Container } from '@chakra-ui/react';

import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useProduct } from '@/hooks/useProduct';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Test() {
  const { fetchProduct } = useProduct();
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['products'],
    ({ pageParam = 0 }) => fetchProduct({ page: pageParam }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.page === 0 && pages.length < lastPage.totalPages) return 1;
        if (pages.length < lastPage.totalPages) return pages.length;
        else return undefined;
      },
    }
  ); // Add this line for debugging

  return (
    <Container maxW="6xl" padding={5}>
      <Button
        onClick={() => {
          console.log('dataaaaaaaaaa', data);
        }}
      >
        T
      </Button>
      {data?.pages?.[0]?.totalItems ? (
        <InfiniteScroll
          dataLength={(data?.pages?.length + 1) * 4} //This is important field to render the next data
          next={() => {
            fetchNextPage();
          }}
          hasMore={hasNextPage || false}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          height={500}
          // below props only if you need pull down functionality
        >
          {data?.pages?.map((item) => {
            return (
              <div>
                {item.data.map((product) => {
                  return <ProductCard product={product} />;
                })}
              </div>
            );
          })}
        </InfiniteScroll>
      ) : null}
    </Container>
  );
}
