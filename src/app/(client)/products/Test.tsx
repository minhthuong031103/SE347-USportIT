'use client';
import ProductCard from '@/components/ProductCard';
import { useProduct } from '@/hooks/useProduct';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Footer } from '@/components/footer';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { type Option } from '@/models';
import { sortOptions } from '@/config/products';
// getSubcategories,
import { cn } from '@/lib/utils';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@nextui-org/react';
import { Spinner } from '@nextui-org/react';
import { AiOutlineFilter } from 'react-icons/ai';
interface TestProps {
  q: string | null;
  sort: string | null;
  gender: string | null;
  categories: string | null;
  subcategories: string | null;
  price_range: string | null;
}

export default function Test({
  q,
  sort,
  gender,
  categories,
  subcategories,
  price_range,
  ...props
}: TestProps) {
  const { fetchProduct } = useProduct();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    refetch: refetchData,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['products', q, sort, gender, categories, subcategories, price_range],
    ({ pageParam = 0 }) =>
      fetchProduct({
        page: pageParam,
        q,
        sort,
        gender,
        categories,
        subcategories,
        price_range,
      }),
    {
      staleTime: 1000 * 60 * 1,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.page === 0 && pages.length < lastPage.totalPages) return 1;
        if (pages.length <= lastPage.totalPages) return pages.length;
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
  const [genderNavItems, setGenderNavItems] = useState([]);
  const [shoesNavItems, setShoesNavItems] = useState([]);
  const [clothNavItems, SetClothNavItems] = useState([]);
  const [accessoryNavItems, SetAccessoryNavItems] = useState([]);
  const [sportNavItems, setSportNavItems] = useState([]);
  //Query Shoes Categories
  useEffect(() => {
    const getShoesNavItems = async () => {
      const res = await fetch('/api/lib/subcategory?productTypeId=1');
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

  //Query Accessory Categories
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
  //Query Gender
  useEffect(() => {
    const getGenderNavItems = async () => {
      const res = await fetch('/api/lib/gender');
      const data = await res.json();
      console.log(res);
      console.log(data);
      if (data) {
        setGenderNavItems(data);
      }
    };
    getGenderNavItems();
  }, []);

  //Query Sport
  useEffect(() => {
    const getSportNavItems = async () => {
      const res = await fetch('/api/lib/sports');
      const data = await res.json();
      console.log(res);
      console.log(data);
      if (data) {
        setSportNavItems(data);
      }
    };
    getSportNavItems();
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
    refetchData();
  }, [debouncedPrice]);

  // Gender filter
  const [selectedGenders, setSelectedGenders] = React.useState([]);

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          gender: selectedGenders?.length
            ? // Join categories with a dot to make search params prettier
              selectedGenders.map((c) => c).join('.')
            : null,
        })}`,
        {
          scroll: false,
        }
      );
    });
    refetchData();
  }, [selectedGenders]);
  const toggleGender = (gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((c) => c !== gender)
        : [...prev, gender]
    );
  };

  // Category filter
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          categories: selectedCategories?.length
            ? // Join categories with a dot to make search params prettier
              selectedCategories.map((c) => c).join('.')
            : null,
        })}`,
        {
          scroll: false,
        }
      );
    });
    refetchData();
  }, [selectedCategories]);
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // subCategory filter
  const [selectedSubCategories, setSelectedSubCategories] = React.useState([]);

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          subcategories: selectedSubCategories?.length
            ? // Join categories with a dot to make search params prettier
              selectedSubCategories.map((c) => c).join('.')
            : null,
        })}`,
        {
          scroll: false,
        }
      );
    });
    refetchData();
  }, [selectedSubCategories]);
  const toggleSubCategory = (subcategory) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((c) => c !== subcategory)
        : [...prev, subcategory]
    );
  };

  // Search bar

  const [searchQuery, setSearchQuery] = useState<string | null>(q ? q : '');
  const debouncedSearch = useDebounce(searchQuery, 500);

  React.useEffect(() => {
    const encodedSearchQuery = encodeURI(debouncedSearch);
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          q: encodedSearchQuery ? encodedSearchQuery : null,
        })}`,
        {
          scroll: false,
        }
      );
    });
    refetchData();
  }, [debouncedSearch]);

  React.useEffect(() => {
    if (gender) {
      const genders = gender.split('.').map((g) => parseInt(g, 10));
      setSelectedGenders(genders);
    }
  }, [gender]);

  // Category filter initialization from query parameter
  React.useEffect(() => {
    if (categories) {
      const categoryIds = categories.split('.').map((c) => parseInt(c, 10));
      setSelectedCategories(categoryIds);
    }
  }, [categories]);

  // SubCategory filter initialization from query parameter
  React.useEffect(() => {
    if (subcategories) {
      const subCategoryIds = subcategories
        .split('.')
        .map((s) => parseInt(s, 10));
      setSelectedSubCategories(subCategoryIds);
    }
  }, [subcategories]);
  return (
    <section className="flex flex-col space-y-6" {...props}>
      <div className="flex space-x-2 items-end px-4">
        <Sheet>
          <SheetTrigger asChild>
            {/* <Button
              aria-label="Filter products"
              size="sm"
              disabled={isPending}
              className="fixed center-x top-150 left-100 w-50 z-50"
            >
              Filter
            </Button> */}
            <Button
              aria-label="Filter products"
              className="fixed top-[55px] left-50 w-[30px] h-[30px] z-50 p-2 rounded-full bg-white shadow-md hover:shadow-lg"
              onClick={() => {
                // Handle filter functionality here
              }}
              disabled={isPending}
            >
              <div className="transform duration-200 hover:scale-105 flex items-center justify-center cursor-pointer">
                <AiOutlineFilter className="text-slate-600 w-6 h-6" />
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader className="px-1">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 space-y-4 lg:space-y-0 ">
              <form className="flex justify-center w-5/6 h-8 rounded-md px-3">
                <input
                  value={searchQuery || ''}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-zinc-800 bg-zinc-100 focus:bg-white rounded-full focus:outline-none focus:ring-[1px] focus:ring-black placeholder:text-zinc-400"
                  placeholder="What are you looking?"
                />
              </form>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-label="Sort products"
                    className="w-[60%] lg:w-auto h-6"
                    disabled={isPending}
                  >
                    Sort
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
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

              <ScrollArea className="my-2 h-[calc(100vh-8rem)] pb-10 pl-6 pr-5">
                <div className="space-y-4">
                  <Accordion
                    type="multiple"
                    className="w-full overflow-auto no-scrollbar"
                  >
                    <AccordionItem value="genders">
                      <AccordionTrigger className="text-sm">
                        Gender
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col">
                          {genderNavItems?.map((subItem, index) =>
                            subItem.name ? (
                              <Checkbox
                                key={index}
                                // Set the checked value based on whether the category is in selectedCategories
                                isSelected={selectedGenders.includes(
                                  subItem.id
                                )}
                                // Pass a callback function that toggles the category on change
                                onChange={() => toggleGender(subItem.id)}
                              >
                                {subItem.name}
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
                              <Checkbox
                                key={index}
                                // Set the checked value based on whether the category is in selectedCategories
                                isSelected={selectedSubCategories.includes(
                                  subItem.id
                                )}
                                // Pass a callback function that toggles the category on change
                                onChange={() => toggleSubCategory(subItem.id)}
                              >
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
                              <Checkbox
                                key={index}
                                // Set the checked value based on whether the category is in selectedCategories
                                isSelected={selectedSubCategories.includes(
                                  subItem.id
                                )}
                                // Pass a callback function that toggles the category on change
                                onChange={() => toggleSubCategory(subItem.id)}
                              >
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
                              <Checkbox
                                key={index}
                                // Set the checked value based on whether the category is in selectedCategories
                                isSelected={selectedSubCategories.includes(
                                  subItem.id
                                )}
                                // Pass a callback function that toggles the category on change
                                onChange={() => toggleSubCategory(subItem.id)}
                              >
                                {subItem.name}
                              </Checkbox>
                            ) : null
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="Sport">
                      <AccordionTrigger className="text-sm">
                        Sport
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col">
                          {sportNavItems?.map((subItem, index) =>
                            subItem.name ? (
                              <Checkbox
                                key={index}
                                // Set the checked value based on whether the category is in selectedCategories
                                isSelected={selectedCategories.includes(
                                  subItem.id
                                )}
                                // Pass a callback function that toggles the category on change
                                onChange={() => toggleCategory(subItem.id)}
                              >
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
                  className="w-auto md:w-full pr-5"
                  onClick={() => {
                    startTransition(() => {
                      router.push('/products');
                      setPriceRange([0, 5000000]);
                      setSelectedCategories([]);
                      setSelectedSubCategories([]);
                      setSelectedGenders([]);
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
      </div>
      {!isPending && !data?.pages?.[0]?.totalItems ? (
        <div className="mx-auto flex max-w-xs flex-col space-y-1.5">
          <h1 className="text-center text-2xl font-bold">No products found</h1>
          <p className="text-center text-muted-foreground">
            Try changing your filters, or check back later for new products
          </p>
        </div>
      ) : null}
      {isFetching && !isFetchingNextPage ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="overflow-hidden">
          {data?.pages?.[0]?.totalItems ? (
            <InfiniteScroll
              dataLength={(data?.pages?.length + 1) * 8} //This is important field to render the next data
              next={() => {
                fetchNextPage();
              }}
              hasMore={hasNextPage || false}
              className="h-full"
              // below props only if you need pull down functionality
            >
              <div className="px-4">
                {data?.pages?.map((item, index) => {
                  return (
                    <div
                      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      key={index}
                    >
                      {item.data.map((product, index) => {
                        return <ProductCard product={product} key={index} />;
                      })}
                    </div>
                  );
                })}
              </div>
              {isFetchingNextPage ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Spinner size="lg" />
                </div>
              ) : null}
              <Footer />
            </InfiniteScroll>
          ) : null}
        </div>
      )}
    </section>
  );
}
