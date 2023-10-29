import ConversationList from '@components/ConversationList';

export default async function layout({ children }) {
  return (
    <div className="h-full w-full">
      <ConversationList title="Messages" />
      {children}
    </div>
  );
}
