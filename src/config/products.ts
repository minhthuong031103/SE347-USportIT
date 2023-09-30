import type { Option } from '@/models';
import prisma from '@/lib/prisma';

export const sortOptions = [
  { label: 'Price: Low to high', value: 'price.asc' },
  { label: 'Price: High to low', value: 'price.desc' },
  {
    label: 'Alphabetical: A to Z',
    value: 'name.asc',
  },
  {
    label: 'Alphabetical: Z to A',
    value: 'name.desc',
  },
];
export const productTags = [
  'new',
  'sale',
  'bestseller',
  'featured',
  'popular',
  'trending',
  'limited',
  'exclusive',
];

// export async function getSubcategories(
//   category?: number | null | undefined
// ): Promise<Option[]> {
//   if (!category) return [];

//   try {
//     const productCategory = await prisma.productType.findFirst({
//       where: {
//         id: category,
//       },
//       include: {
//         Subcategory: true,
//       },
//     });

//     if (productCategory) {
//       const subcategories: Option[] = productCategory.Subcategory.map((s) => ({
//         label: s.name,
//         value: s.name, // Assuming there's a field named 'slug' for subcategories
//       }));

//       return subcategories;
//     }

//     return [];
//   } catch (error) {
//     throw new Error(`Error fetching subcategories: ${error.message}`);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
export async function getSubcategories(category?: number): Promise<Option[]> {
  if (!category) return [];

  try {
    const productCategory = await prisma.productType.findFirst({
      where: {
        id: category,
      },
      include: {
        Subcategory: true,
      },
    });

    if (productCategory) {
      const subcategories: Option[] = productCategory.Subcategory.map((s) => ({
        label: s.name,
        value: s.name, // Assuming there's a field named 'slug' for subcategories
      }));

      return subcategories;
    }

    return [];
  } catch (error) {
    throw new Error(`Error fetching subcategories: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}
