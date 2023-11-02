import prisma from '@/lib/prisma';
import { CartItem } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    if (!searchParams.get('userId')) {
      return new Response(JSON.stringify({}), { status: 400 });
    }
    const userId = parseInt(searchParams.get('userId'));

    const shoppingCart = await prisma.shoppingCart.findFirst({
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
      where: {
        userId,
      },
    });

    if (shoppingCart) {
      return new Response(JSON.stringify(shoppingCart), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({}), { status: 404 });
    }
  } catch (e) {
    console.log('e', e);
    return new Response(JSON.stringify(e), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  // Lấy Param
  const { searchParams } = new URL(request.url);
  if (!searchParams.get('userId')) {
    return new Response(JSON.stringify({}), { status: 400 });
  }
  const userId = parseInt(searchParams.get('userId'));

  // Lấy shopping cart, nếu chưa có, tạo mới.
  let shoppingCart = await prisma.shoppingCart.findFirst({
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
    where: {
      userId,
    },
  });

  if (!shoppingCart) {
    try {
      const newShoppingCart = await prisma.shoppingCart.create({
        data: {
          userId,
        },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      });

      if (newShoppingCart) {
        shoppingCart = newShoppingCart;
      }
    } catch (error) {
      return NextResponse.json(
        { message: 'Can not create new shopping cart' },
        { status: 404 }
      );
    }
  }

  const cartItem: CartItem = await request.json();

  if (!cartItem)
    return NextResponse.json(
      { message: 'Cart item is required' },
      { status: 400 }
    );

  if (!shoppingCart)
    return NextResponse.json(
      { message: 'Can not create new shopping cart' },
      { status: 404 }
    );

  // Kiểm tra xem cartItem đã tồn tại trong giỏ hàng hay chưa
  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      productId: cartItem.id,
      shoppingCartId: shoppingCart.id,
      selectedSize: parseInt(cartItem.selectedSize),
    },
  });

  // Nếu cartItem đã tồn tại, thì cập nhật số lượng và kích thước đã chọn
  if (existingCartItem) {
    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity: existingCartItem.quantity + cartItem.quantity,
      },
    });

    return NextResponse.json(
      `Update cart Item succesfully ${updatedCartItem}`,
      { status: 200 }
    );
  } else {
    // Nếu cartItem chưa tồn tại, thì tạo mới với số lượng và kích thước đã chọn
    try {
      const newCartItem = await prisma.cartItem.create({
        data: {
          quantity: cartItem.quantity,
          productId: cartItem.id,
          shoppingCartId: shoppingCart.id,
          selectedSize: parseInt(cartItem.selectedSize),
        },
      });

      return NextResponse.json(
        `Create new cart Item succesfully ${newCartItem}`,
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: `Error occurred while creating cart item` },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
}

// export async function PUT(request: Request) {
//   const { searchParams } = new URL(request.url);
//   if (!searchParams.get('userId')) {
//     return new Response(JSON.stringify({}), { status: 400 });
//   }
//   const userId = parseInt(searchParams.get('userId'));

//   // Lấy shopping cart, nếu chưa có, tạo mới.
//   let shoppingCart = await prisma.shoppingCart.findFirst({
//     include: {
//       cartItems: {
//         include: {
//           product: true,
//         },
//       },
//     },
//     where: {
//       userId,
//     },
//   });

//   const cartItem: CartItem = await request.json();

//   if (!cartItem)
//     return NextResponse.json(
//       { message: 'Cart item is required' },
//       { status: 400 }
//     );

//   try {
//     const updatedCartItem = await prisma.cartItem.update({
//       where: { id: cartItem.id },
//       data: cartItem,
//     });

//     return NextResponse.json(
//       `Update cart Item succesfully ${updatedCartItem}`,
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: `Error occurred while updating cart item` },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

export async function DELETE(request: Request) {
  // Lấy Param
  const { searchParams } = new URL(request.url);
  if (!searchParams.get('userId')) {
    return new Response(JSON.stringify({}), { status: 400 });
  }
  const userId = parseInt(searchParams.get('userId'));

  // Lấy shopping cart
  const shoppingCart = await prisma.shoppingCart.findFirst({
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
    where: {
      userId,
    },
  });

  // Lấy id sản phẩm cần xóa
  const { id, selectedSize }: Partial<CartItem> = await request.json();

  if (!id)
    return NextResponse.json(
      { message: 'Product Id is required' },
      { status: 400 }
    );

  try {
    // Tìm cartItem dựa trên productId và shoppingCartId
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        productId: id,
        shoppingCartId: shoppingCart?.id,
        selectedSize: parseInt(selectedSize),
      },
    });

    // Kiểm tra xem cartItem có tồn tại không
    if (!cartItem) {
      return NextResponse.json(
        { message: `Cart item with product id ${id} not found` },
        { status: 404 }
      );
    }

    // Xóa cartItem dựa trên id
    await prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });

    return NextResponse.json(
      { message: `Cart item with id ${id} has been deleted` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Error occurred while deleting cart item with id ${id}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
