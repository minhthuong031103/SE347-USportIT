import prisma from '@/lib/prisma';
import { NextApiResponseServerIo } from '@/types/typeIo';
import { NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { session } = req.body;
    console.log(session, 'ses');
    if (!session) return res.status(401).json({ message: 'Unauthorized' });
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Bad request' });

    // const message=await prisma.directMessage.create({
    //     data:{
    //         content,
    //         fileUrl,

    //     }
    // })
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: '5a84bf0e-2e29-4a75-981e-03f32bef41bc',
        OR: [
          {
            userOne: {
              id: 2,
            },
            userTwo: {
              id: 3,
            },
          },
        ],
      },
      include: {
        userOne: true,
        userTwo: true,
      },
    });
    if (!conversation)
      return res.status(400).json({ message: 'Conversation not found' });
    console.log(conversation, 'conversationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
    console.log(session);
    const user =
      conversation.userOne.id === session.user.id
        ? conversation.userOne
        : conversation.userTwo;

    if (!user) return res.status(400).json({ message: 'User not found' });
    const message = await prisma.directMessage.create({
      data: {
        content,
        conversationId: '5a84bf0e-2e29-4a75-981e-03f32bef41bc',
        userId: user.id,
      },
      include: {
        user: true,
      },
    });
    const channelKey = `chat:${'5a84bf0e-2e29-4a75-981e-03f32bef41bc'}:messages`;
    res?.socket?.server?.io?.emit(channelKey, message);
    return res.status(200).json(message);
  } catch (err) {
    console.log('[DIRECT_MESSAGES_POST]', err);
    return res.status(500).json({ message: 'Internal Error' });
  }
}
