import prisma from '@/lib/prisma';
import { web3Sdk } from '@/lib/thirdweb';
import { ethers } from 'ethers';

export async function POST(request: Request) {
  const body = await request.json();
  const { userFullName, checkedItems, userEmail, userAddress, amount, uuid } =
    body;
  console.log('🚀 ~ POST ~ checkedItems:', checkedItems);

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  let data = {};
  if (!user) {
    data = {
      anonymousUser: uuid,
      anonymousUserName: userFullName,
      anonymousUserEmail: userEmail,
      address: userAddress,
      total: parseFloat(amount),
    };
  } else {
    data = {
      userId: user.id,
      address: userAddress,
      total: parseFloat(amount),
    };
  }
  const orderItems = JSON.parse(checkedItems).map((item: any) => ({
    productId: item.id,
    quantity: item.quantity,
    selectedSize: item.selectedSize,
  }));
  console.log('🚀 ~ file: route.ts:76 ~ orderItems ~ orderItems:', orderItems);
  console.log('🚀 ~ file: route.ts:66 ~ POST ~ data:', data);
  interface OrderItem {
    productId: number;
    quantity: number;
    selectedSize: string;
  }
  const [order] = await prisma.$transaction([
    prisma.order.create({
      data: {
        ...data,
        orderItems: {
          createMany: { data: [...orderItems] },
        },
      },
    }),
  ]);
  for (const item of orderItems) {
    await prisma.productSize.updateMany({
      where: {
        productId: item.productId,
        size: item.selectedSize,
      },
      data: {
        quantity: {
          decrement: item.quantity,
        },
      },
    });
  }

  console.log('🚀 ~ file: route.ts:84 ~ POST ~ order:', order);

  //TODO: create order => xong

  return new Response(JSON.stringify('ok'), { status: 200 });
}
