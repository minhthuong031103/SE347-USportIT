/** @format */

'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CommonSvg } from '@/assets/CommonSvg';
import { mainNavItems } from './constants';

export function SidebarDesktop() {
  return (
    <nav className="grid items-start gap-2 w-full">
      <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
        <div className="pl-1 ">
          <Accordion type="multiple" className="w-full">
            {mainNavItems?.map((item, index) => (
              <AccordionItem value={item.title} key={index}>
                <AccordionTrigger className="text-sm capitalize">
                  <div className="w-full flex flex-row gap-x-5">
                    {CommonSvg[`${item?.icon}`]?.()}
                    {item.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    {item.items?.map((subItem, subIndex) =>
                      subItem.href ? (
                        <MobileLink
                          key={subIndex}
                          href={subItem.href}
                          pathname={subItem.href}
                          // disabled={subItem.disabled}
                        >
                          {subItem.title}
                        </MobileLink>
                      ) : (
                        <div
                          key={index}
                          className="text-foreground/70 transition-colors"
                        >
                          {item.title}
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </nav>
  );
}

interface MobileLinkProps {
  children?: React.ReactNode;
  href: string;
  disabled?: boolean;
  pathname: string;
}

function MobileLink({ children, href, disabled, pathname }: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-foreground/70 transition-colors hover:text-foreground',
        pathname === href && 'text-foreground',
        disabled && 'pointer-events-none opacity-60'
      )}
    >
      {children}
    </Link>
  );
}
