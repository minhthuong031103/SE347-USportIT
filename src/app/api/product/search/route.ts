import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Customize the parameters you want to extract and provide default values if not present
  const page = parseInt(searchParams.get('page') || '0');
  const limit = parseInt(searchParams.get('limit') || '1');
  // String query

  const sortString = searchParams.get('sort') || null;
  const categoriesString = searchParams.get('categories') || null;
  const subcategoriesString = searchParams.get('subcategories') || null;
  const gendersString = searchParams.get('gender') || null;
  const price_rangeString = searchParams.get('price_range') || null;
  const q = searchParams.get('q') || null;
  // Convert

  const [column, order] =
    (sortString?.split('.') as [keyof Product, 'asc' | 'desc']) || [];
  const [minPrice, maxPrice] = price_rangeString?.split('-')?.map(Number) || [
    0, 0,
  ];
  const categoriesArray = categoriesString?.split('.') || [];
  const categoriesIntArray = categoriesArray.map((category) =>
    parseInt(category, 10)
  );
  const subcategoriesArray = subcategoriesString?.split('.') || [];
  const subcategoriesIntArray = subcategoriesArray.map((category) =>
    parseInt(category, 10)
  );
  const gendersArray = gendersString?.split('.') || [];
  const gendersIntArray = gendersArray.map((category) =>
    parseInt(category, 10)
  );
  const where = {
    AND: [
      categoriesIntArray.length
        ? { categoryId: { in: categoriesIntArray } }
        : undefined,
      subcategoriesIntArray.length
        ? { subcategoryId: { in: subcategoriesIntArray } }
        : undefined,
      gendersIntArray.length
        ? { genderId: { in: gendersIntArray } }
        : undefined,
      minPrice ? { price: { gte: minPrice } } : undefined,
      maxPrice ? { price: { lte: maxPrice } } : undefined,
      q ? { name: { contains: q } } : undefined,
      { isdeleted: false },
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
