import getConversations from "@actions/getConversations";
import ConversationList from "@components/ConversationList";

export default async function layout({ children }) {
  const conversations = await getConversations();
  return (

      <div className="h-full w-full">
        <ConversationList 
          title="Messages" 
          initialItems={conversations}
        />
        {children}
      </div>
  );
}
