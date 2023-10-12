'use client';
import ProductCard from '@/components/ProductCard';
import { useProduct } from '@/hooks/useProduct';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Footer } from '@/components/footer';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type Option } from '@/models';
import { sortOptions } from '@/config/products';
// getSubcategories,
import { cn, toTitleCase } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { MultiSelect } from '@/components/multi-select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@nextui-org/react';

const genderNavItems = [
  {
    title: 'men',
  },
  {
    title: 'women',
  },
  {
    title: 'kids',
  },
];
interface TestProps {
  sort: string | null;
  categories: string | null;
  subcategories: string | null;
  price_range: string | null;
}

export default function Test({
  sort,
  categories,
  subcategories,
  price_range,
  ...props
}: TestProps) {
  const { fetchProduct } = useProduct();
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['products'],
    ({ pageParam = 0 }) =>
      fetchProduct({
        page: pageParam,
        sort,
        categories,
        subcategories,
        price_range,
      }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.page === 0 && pages.length < lastPage.totalPages) return 1;
        if (pages.length < lastPage.totalPages) return pages.length;
        else return undefined;
      },
    }
  ); // Add this line for debugging

  //Add Filter
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  // Search params
  // const page = searchParams?.get('page') ?? '1';
  // const per_page = searchParams?.get('per_page') ?? '8';
  // const sort = searchParams?.get('sort') ?? 'id.desc';
  const [shoesNavItems, setShoesNavItems] = useState([]);
  const [clothNavItems, SetClothNavItems] = useState([]);
  const [accessoryNavItems, SetAccessoryNavItems] = useState([]);
  //Query Shoes Categories
  useEffect(() => {
    const getShoesNavItems = async () => {
      const res = await fetch('/api/lib/shoes');
      const data = await res.json();
      console.log(res);
      console.log(data);
      if (data) {
        setShoesNavItems(data);
      }
    };
    getShoesNavItems();
  }, []);

  //Query Clothes Categories
  useEffect(() => {
    const getClothNavItems = async () => {
      const res = await fetch('/api/lib/subcategory?productTypeId=2');
      const data = await res.json();
      console.log(res);
      console.log(data);
      if (data) {
        SetClothNavItems(data);
      }
    };
    getClothNavItems();
  }, []);

  //Query Clothes Categories
  useEffect(() => {
    const getAccessoryNavItems = async () => {
      const res = await fetch('/api/lib/subcategory?productTypeId=3');
      const data = await res.json();
      console.log(res);
      console.log(data);
      if (data) {
        SetAccessoryNavItems(data);
      }
    };
    getAccessoryNavItems();
  }, []);

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Price filter
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 5000000,
  ]);
  const debouncedPrice = useDebounce(priceRange, 500);

  React.useEffect(() => {
    const [min, max] = debouncedPrice;
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          price_range: `${min}-${max}`,
        })}`,
        {
          scroll: false,
        }
      );
    });
  }, [debouncedPrice]);

  // Category filter
  const [selectedCategories, setSelectedCategories] = React.useState<
    Option[] | null
  >(null);

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          categories: selectedCategories?.length
            ? // Join categories with a dot to make search params prettier
              selectedCategories.map((c) => c.value).join('.')
            : null,
        })}`,
        {
          scroll: false,
        }
      );
    });
  }, [selectedCategories]);

  // Subcategory filter
  // const [selectedSubcategories, setSelectedSubcategories] = React.useState<
  //   Option[] | null
  // >(null);
  // const subcategories = getSubcategories(category);

  // React.useEffect(() => {
  //   startTransition(() => {
  //     router.push(
  //       `${pathname}?${createQueryString({
  //         subcategories: selectedSubcategories?.length
  //           ? selectedSubcategories.map((s) => s.value).join('.')
  //           : null,
  //       })}`,
  //       {
  //         scroll: false,
  //       }
  //     );
  //   });
  // }, [selectedSubcategories]);

  return (
    <section className="flex flex-col space-y-6" {...props}>
      <div className="flex space-x-2 items-end px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label="Filter products" size="sm" disabled={isPending}>
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader className="px-1">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="flex flex-1 flex-col gap-5 overflow-hidden px-1">
              <div className="space-y-4">
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                  Price range ($)
                </h3>
                <Slider
                  variant="range"
                  thickness="thin"
                  defaultValue={[0, 5000000]}
                  max={5000000}
                  step={1}
                  value={priceRange}
                  onValueChange={(value: typeof priceRange) =>
                    setPriceRange(value)
                  }
                />
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={priceRange[1]}
                    className="h-9"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setPriceRange([value, priceRange[1]]);
                    }}
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={priceRange[0]}
                    max={500000}
                    className="h-9"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setPriceRange([priceRange[0], value]);
                    }}
                  />
                </div>
              </div>
              {categories?.length ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wide text-foreground">
                    Categories
                  </h3>
                  <MultiSelect
                    placeholder="Select categories"
                    selected={selectedCategories}
                    setSelected={setSelectedCategories}
                    options={categories.map((c) => ({
                      label: toTitleCase(c?.toString()),
                      value: c,
                    }))}
                  />
                </div>
              ) : null}
              {/* {category ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wide text-foreground">
                    Subcategories
                  </h3>
                  <MultiSelect
                    placeholder="Select subcategories"
                    selected={selectedSubcategories}
                    setSelected={setSelectedSubcategories}
                    options={subcategories}
                  />
                </div>
              ) : null} */}

              <ScrollArea className="my-2 h-[calc(100vh-8rem)] pb-10 pl-6 pr-5">
                <div className="space-y-4">
                  <Accordion
                    type="multiple"
                    className="w-full overflow-auto no-scrollbar"
                  >
                    <AccordionItem value="Gender">
                      <AccordionTrigger className="text-sm capitalize">
                        Gender
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col">
                          {genderNavItems?.map((subItem, index) =>
                            subItem.title ? (
                              <Checkbox key={index} defaultChecked>
                                {subItem.title}
                              </Checkbox>
                            ) : null
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="shoes">
                      <AccordionTrigger className="text-sm">
                        Shoes
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col">
                          {shoesNavItems?.map((subItem, index) =>
                            subItem.name ? (
                              <Checkbox key={index} defaultChecked>
                                {subItem.name}
                              </Checkbox>
                            ) : null
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="cloth">
                      <AccordionTrigger className="text-sm">
                        Clothes
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col">
                          {clothNavItems?.map((subItem, index) =>
                            subItem.name ? (
                              <Checkbox key={index} defaultChecked>
                                {subItem.name}
                              </Checkbox>
                            ) : null
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="Accessory">
                      <AccordionTrigger className="text-sm">
                        Accessories
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col">
                          {accessoryNavItems?.map((subItem, index) =>
                            subItem.name ? (
                              <Checkbox key={index} defaultChecked>
                                {subItem.name}
                              </Checkbox>
                            ) : null
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </ScrollArea>
            </div>
            <div>
              <Separator className="my-4" />
              <SheetFooter>
                <Button
                  aria-label="Clear filters"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    startTransition(() => {
                      router.push(
                        `${pathname}?${createQueryString({
                          price_range: 0 - 100,
                          store_ids: null,
                          categories: null,
                          subcategories: null,
                        })}`
                      );

                      setPriceRange([0, 100]);
                      setSelectedCategories(null);
                      // setSelectedSubcategories(null);
                    });
                  }}
                  disabled={isPending}
                >
                  Clear Filters
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Sort products" size="sm" disabled={isPending}>
              Sort
              <ChevronDownIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={cn(option.value === sort && 'font-bold')}
                onClick={() => {
                  startTransition(() => {
                    router.push(
                      `${pathname}?${createQueryString({
                        sort: option.value,
                      })}`,
                      {
                        scroll: false,
                      }
                    );
                  });
                }}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!isPending && !data?.pages?.[0]?.totalItems ? (
        <div className="mx-auto flex max-w-xs flex-col space-y-1.5">
          <h1 className="text-center text-2xl font-bold">No products found</h1>
          <p className="text-center text-muted-foreground">
            Try changing your filters, or check back later for new products
          </p>
        </div>
      ) : null}
      <div className="overflow-hidden">
        {data?.pages?.[0]?.totalItems ? (
          <InfiniteScroll
            // className="overflow-hidden"
            dataLength={(data?.pages?.length + 1) * 8} //This is important field to render the next data
            next={() => {
              fetchNextPage();
            }}
            hasMore={hasNextPage || false}
            loader={<h4>Loading...</h4>}
            className="h-full"
            // below props only if you need pull down functionality
          >
            <div className="px-4">
              {data?.pages?.map((item) => {
                return (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {item.data.map((product) => {
                      return <ProductCard product={product} />;
                    })}
                  </div>
                );
              })}
            </div>
            <Footer />
          </InfiniteScroll>
        ) : (
          <div>loading</div>
        )}
      </div>
    </section>
  );
}
