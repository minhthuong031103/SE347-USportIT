import {  Conversation, DirectMessage, User } from "@prisma/client";

// export type FullMessageType = DirectMessage & {
//   sender: User, 
//   seen: User[]
// };

export type FullConversationType = Conversation & { 
  userOne: User,
  userTwo: User,
  directMessages: DirectMessage[]
};
