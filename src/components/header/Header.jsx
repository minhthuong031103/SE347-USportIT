/* eslint-disable no-undef */
'use client';

import React, { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import './styles.css';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AuthSvg from '@/assets/AuthSvg';
import { MobileNav } from './MobileNavBar';
import { AiOutlineHeart } from 'react-icons/ai';
import { CartSheet } from '../CartSheet';
import { Badge } from '../ui/badge';
import Logo from '../logo';
import { useWishList } from '@/hooks/useWishList';

const NavigationMenuDemo = ({ session }) => {
  const [user] = useState(session?.user);
  const [show, setShow] = useState('translate-y-0');
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  });
  const controlNavbar = () => {
    if (window.scrollY > 100) {
      if (window.scrollY > lastScrollY) {
        setShow('-translate-y-[82px]');
      } else {
        setShow('shadow-sm');
      }
    } else {
      setShow('translate-y-0');
    }
    setLastScrollY(window.scrollY);
  };

  const { wishList } = useWishList();
  const [wishListCount, setWishListCount] = useState(0);
  useEffect(() => {
    setWishListCount(wishList?.length);
  }, [wishList]);

  return (
    <div
      className={`w-full h-[50px] md:h-[80px] 
    bg-white  items-center justify-between z-20
    sticky top-0 transition-transform duration-300 px-5 lg:px-20
    ${show}
    `}
    >
      <MobileNav session={session} />
      <div className="hidden lg:flex py-2  ">
        {' '}
        <Logo />
        <NavigationMenu.Root className="NavigationMenuRoot">
          <NavigationMenu.List className="NavigationMenuList">
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="NavigationMenuLink"
                href={'/products'}
              >
                Tất Cả Sản Phẩm
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                Thể Thao <CaretDownIcon className="CaretDown" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <ul className="List one">
                  <li style={{ gridRow: 'span 4' }}>
                    <NavigationMenu.Link asChild>
                      <a className="Callout" href="/">
                        <svg
                          aria-hidden
                          width="58"
                          height="58"
                          viewBox="0 0 25 25"
                          fill="white"
                        >
                          <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                          <path d="M12 0H4V8H12V0Z"></path>
                          <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                        </svg>
                        <div className="CalloutHeading">Tất Cả Sản Phẩm</div>
                      </a>
                    </NavigationMenu.Link>
                  </li>

                  <ListItem
                    href="/products?categories=1"
                    title="Bóng Đá"
                  ></ListItem>
                  <ListItem
                    href="/products?categories=2"
                    title="Bóng Rổ"
                  ></ListItem>
                  <ListItem
                    href="/products?categories=3"
                    title="Bóng Chuyền"
                  ></ListItem>
                  <ListItem
                    href="/products?categories=4"
                    title="Quần Vợt"
                  ></ListItem>
                  <ListItem
                    href="/products?categories=5"
                    title="Chạy Bộ"
                  ></ListItem>
                  <ListItem
                    href="/products?categories=6"
                    title="Gym"
                  ></ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                Đàn Ông <CaretDownIcon className="CaretDown" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <ul className="List two">
                  <ListItem
                    title="Giày"
                    href="/products?gender=1&subcategories=1.2.3.4.9.10"
                  ></ListItem>
                  <ListItem
                    title="Quần Áo"
                    href="/products?gender=1&subcategories=5.6.11.12.13.14"
                  ></ListItem>
                  <ListItem
                    title="Phụ Kiện"
                    href="/products?gender=1&subcategories=7.8.15.16.17.18"
                  ></ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                Phụ Nữ <CaretDownIcon className="CaretDown" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <ul className="List two">
                  <ListItem
                    title="Giày"
                    href="/products?gender=2&subcategories=1.2.3.4.9.10"
                  ></ListItem>
                  <ListItem
                    title="Quần Áo"
                    href="/products?gender=2&subcategories=5.6.11.12.13.14"
                  ></ListItem>
                  <ListItem
                    title="Phụ Kiện"
                    href="/products?gender=2&subcategories=7.8.15.16.17.18"
                  ></ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                Trẻ Em <CaretDownIcon className="CaretDown" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <ul className="List two">
                  <ListItem
                    title="Giày"
                    href="/products?gender=3&subcategories=1.2.3.4.9.10"
                  ></ListItem>
                  <ListItem
                    title="Quần Áo"
                    href="/products?gender=3&subcategories=5.6.11.12.13.14"
                  ></ListItem>
                  <ListItem
                    title="Phụ Kiện"
                    href="/products?gender=3&subcategories=7.8.15.16.17.18"
                  ></ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {/* <NavigationMenu.Item>
              <NavigationMenu.Link
                className="NavigationMenuLink"
                href="https://github.com/radix-ui"
              >
                Github
              </NavigationMenu.Link>
            </NavigationMenu.Item> */}

            <NavigationMenu.Indicator className="NavigationMenuIndicator">
              <div className="Arrow" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="ViewportPosition">
            <NavigationMenu.Viewport className="NavigationMenuViewport" />
          </div>
        </NavigationMenu.Root>
        {user ? (
          <div className="flex flex-row gap-5 items-center justify-center">
            <Link href={'/favorite'}>
              <Button variant="outline" size="icon" className="relative">
                {wishListCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full p-2.5"
                  >
                    {wishListCount}
                  </Badge>
                )}
                {
                  <AiOutlineHeart className="text-slate-600 stroke-zinc-950 w-4 h-4 " />
                }
              </Button>
            </Link>
            <CartSheet />
            <DropdownMenu>
              <DropdownMenuTrigger>
                {' '}
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {' '}
                  <Link href={'/user/profile'}>Hồ sơ</Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Link href={'/admin/add-product'}>Thêm sản phẩm</Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <Link href={'/user/conversations'}>Chat</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/auth/login' })}
                  className="border-solid border-t-2 mt-2  gap-2"
                >
                  <div className="">{AuthSvg.signIn()}</div>
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex space-x-4 items-center">
            <Button className="w-[100px] h-8">
              <Link href={'/auth/login'}>Đăng nhập</Link>
            </Button>
            <CartSheet />
          </div>
        )}
      </div>
    </div>
  );
};

const ListItem = React.forwardRef(
  ({ children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a className={'ListItemLink'} {...props} ref={forwardedRef}>
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

export default NavigationMenuDemo;
