import prisma from "@/lib/prisma";

const getMessages = async (
  conversationId: string
) => {
  try {
    const messages = await prisma.directMessage.findMany({
      where: {
        conversationId: conversationId
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return messages;
  } catch (error: any) {
    return [];
  }
};

export default getMessages;
