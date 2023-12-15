import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all users
    const allUsers = await prisma.user.findMany();

    // Fetch users involved in conversations
    const usersInConversations = await prisma.conversation.findMany({
      select: {
        userOneId: true,
        userTwoId: true,
      },
    });

    // Get all unique user IDs involved in conversations
    const usersInConversationsIds = usersInConversations.flatMap(
      (conversation) => [conversation.userOneId, conversation.userTwoId]
    );

    // Filter out users who are in conversations
    const usersNotInConversations = allUsers.filter(
      (user) => !usersInConversationsIds.includes(user.id)
    );

    if (!usersNotInConversations)
      return new Response(JSON.stringify({}), { status: 404 });
    return new Response(
      JSON.stringify({ data: usersNotInConversations, status: 200 })
    );
  } catch (error) {
    // Handle errors here
    console.error('Error fetching users not in conversations:', error);
    throw error;
  }
}
