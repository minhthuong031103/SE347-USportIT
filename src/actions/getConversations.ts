import prisma from "@/lib/prisma";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }
  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        OR: [
          {
            userOneId: currentUser.id,
          },
          {
            userTwoId: currentUser.id,
          },
        ],
      },
      include: {
        userOne: true,
        userTwo: true,
        directMessages: true,
      }
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
