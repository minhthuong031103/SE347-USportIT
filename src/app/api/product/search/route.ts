import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Customize the parameters you want to extract and provide default values if not present
  const page = parseInt(searchParams.get('page') || '0');
  const limit = parseInt(searchParams.get('limit') || '0');
  // String query

  const sortString = searchParams.get('sort') || null;
  const categoriesString = searchParams.get('categories') || null;
  const subcategoriesString = searchParams.get('subcategories') || null;
  const price_rangeString = searchParams.get('price_range') || null;

  // Convert

  const [column, order] =
    (sortString?.split('.') as [keyof Product, 'asc' | 'desc']) || [];
  const [minPrice, maxPrice] = price_rangeString?.split('-')?.map(Number) || [
    0, 0,
  ];
  const categoriesArray = categoriesString?.split('.') || [];
  const categoriesIntArray = categoriesArray.map(category => parseInt(category, 10));


  const subcategoriesArray = subcategoriesString?.split('.') || [];
  const where = {
    AND: [
      categoriesIntArray.length
        ? { categoryId: { in: categoriesIntArray } }
        : undefined,
      subcategoriesArray.length
        ? { subcategory: { in: subcategoriesArray } }
        : undefined,
      minPrice ? { price: { gte: minPrice } } : undefined,
      maxPrice ? { price: { lte: maxPrice } } : undefined,
    ].filter(Boolean),
  };

  const items = await prisma.product.findMany({
    where,
    orderBy: {
      [column || 'id']: order || 'desc',
    },
    take: limit,
    skip: page * limit,
  });

  const count = await prisma.product.count({
    where,
  });
  const response = {
    data: [...items],
    page,
    totalPages: count / limit,
    totalItems: count,
  };

  return new Response(JSON.stringify(response), { status: 200 });
}
