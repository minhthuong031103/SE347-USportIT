'use client';

import { Button } from '@/components/ui/button';
import { SocketIndicator } from '@/components/socket-indicator';
import { useChatSocket } from '@/hooks/useChatSocket';
// import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
function Chat({ session }) {
  const { isConnected, onlineUsers, goToConversation } = useChatSocket({
    session,
  });

  // const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
  //   ['conversations', session?.user?.id],
  //   ({ pageParam = 0 }) =>
  //     getConversations({ page: pageParam, userId: session?.user?.id }),

  //   {
  //     refetchOnWindowFocus: false,
  //     getNextPageParam: (lastPage, pages) => {
  //       //pages is an array of all the pages fetched so far
  //       //last page is the last page fetched
  //       console.log('lastPage', lastPage);
  //       if (lastPage.page === 0 && pages.length < lastPage.totalPages) return 1;
  //       if (pages.length < lastPage.totalPages) return pages.length;
  //       else return undefined;
  //     },
  //   }
  // );
  // const [isFetchingMore] = useState(false);

  return (
    <div className="w-full flex flex-row">
      <div className="w-[30%]">
        <div className="w-full flex justify-start items-start flex-col">
          <SocketIndicator isConnected={isConnected} />
          {/* {data ? (
            <InfiniteScroll
              dataLength={data?.pages?.[0]?.totalItems || 1} //This is important field to render the next data
              next={() => {
                fetchNextPage();
              }}
              hasMore={hasNextPage || false}
              height={400}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              // below props only if you need pull down functionality
              // refreshFunction={() => {
              //   fetchNextPage();
              // }}
              // pullDownToRefresh
              // pullDownToRefreshThreshold={50}
              // pullDownToRefreshContent={
              //   <h3 style={{ textAlign: 'center' }}>
              //     &#8595; Pull down to refresh
              //   </h3>
              // }
              // releaseToRefreshContent={
              //   <h3 style={{ textAlign: 'center' }}>
              //     &#8593; Release to refresh
              //   </h3>
              // }
            >
              {data?.pages.map((page, pageIndex) => {
                
                return (
                  <div className="Conversation Sidebar" key={pageIndex}>
                    <div className="Conversation Page">
                      {page?.conversations?.map((conversation) => {
                        console.log(conversation);
                        return (
                          <div key={conversation.id} className="mb-2">
                            <div key={conversation.id} className="mb-2">
                              <div key={conversation.id} className="mb-2">
                                <div className="w-96 h-96 bg-slate-400">
                                  <strong>
                                    {conversation?.message?.user.name}
                                  </strong>
                                  <img
                                    src={conversation?.message?.user.avatar}
                                    alt="User avatar"
                                    width="40"
                                    height="40"
                                  />
                                  <p>{conversation.lastMessage}</p>
                                  <p>
                                    {new Date(
                                      conversation.lastMessageAt
                                    ).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {isFetchingMore && <p>Loading more conversations...</p>}
                  </div>
                );
              })}
            </InfiniteScroll>
          ) : null} */}
        </div>
      </div>
      <div className="w=[70%]w-full">
        Online user right now:
        {onlineUsers?.map((user) => {
          if (user !== session?.user?.id) {
            return (
              <div>
                {user}{' '}
                <Button
                  onClick={() => {
                    goToConversation(session?.user?.id, user);
                  }}
                >
                  go chat with
                </Button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Chat;
