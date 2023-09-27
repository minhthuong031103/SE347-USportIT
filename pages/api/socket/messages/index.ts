import { getSession } from '@/lib/auth';
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
    const session = getSession();
    if (!session) return res.status(401).json({ message: 'Unauthorized' });
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Bad request' });

    // const message=await prisma.directMessage.create({
    //     data:{
    //         content,
    //         fileUrl,

    //     }
    // })
    const message = await prisma.directMessage.create({
      data: {
        content,
        userId: session?.user.id,
        conversationId: '5a84bf0e-2e29-4a75-981e-03f32bef41bc',
      },
      include: {
        user: true,
      },
    });
    return res.send(message);
  } catch (err) {
    console.log(err);
  }
}
