import getConversationById from '@actions/getConversationById';
// import getMessages from '@actions/getMessages';

import Header from './components/Header';
import Body from './components/Body';
import EmptyState from '@components/EmptyState';
import { getSession } from '@/lib/auth';
interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const session = await getSession();
  const conversation = await getConversationById(params.conversationId);
  // const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body className="h-[80%] " session={session} />
        {/* <Form /> */}
      </div>
    </div>
  );
};

export default ChatId;