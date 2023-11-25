import prisma from '@/lib/prisma';
import { web3Sdk } from '@/lib/thirdweb';
import { ethers } from 'ethers';

export async function POST(request: Request) {
  //   const userId = '5';
  //   const address = '0x69b74a620D4493D484CEC4711a7FBaEaaD1F576C';
  try {
    const { userId, address } = await request.json();
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        wallets: true,
      },
    });
    if (!user)
      return new Response(JSON.stringify('User not found'), { status: 403 });
    const walletFind = await prisma.wallet.findUnique({
      where: {
        address: address,
      },
    });
    if (walletFind)
      return new Response(JSON.stringify('Wallet already exists'), {
        status: 200,
      });
    await prisma.wallet.create({
      data: {
        address: address,
        user: {
          connect: {
            id: parseInt(userId),
          },
        },
      },
    });
    const provider = new ethers.providers.JsonRpcProvider(
      'https://fantom-testnet.rpc.thirdweb.com/d391b93f5f62d9c15f67142e43841acc'
    );
    const signer = new ethers.Wallet(
      'f8d7df33dccb96630568d7162b937a8a91e00ebd1989efbc2f8fdd2bab2e5c36',
      provider
    );
    const contract = await web3Sdk.getContract(
      '0xf0698869A8DCb2175b84059D7DF8A20AB233cf53'
    );
    const [tx1, tx2] = await Promise.all([
      contract.call('transfer', [address, ethers.utils.parseEther('100')]),
      signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther('0.2'),
      }),
    ]);

    console.log('🚀 ~ file: route.ts:53 ~ GET ~ tx1:', tx1);
    console.log('🚀 ~ file: route.ts:48 ~ GET ~ tx2:', tx2);

    return new Response(JSON.stringify('Send token successfully'), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify('Send token failed'), {
      status: 400,
    });
  }
}
