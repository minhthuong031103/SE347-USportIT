import React from 'react';
import { SidebarDesktop } from './sidebar/SidebarDesktop';
import { SidebarMobile } from './sidebar/SidebarMobile';

const layout = ({ children }) => {
  return (
    <>
      <div className="flex lg:hidden">
        <SidebarMobile />
      </div>
      <div className="w-full h-full flex">
        <div className="hidden lg:flex w-[20%]">
          <SidebarDesktop />
        </div>

        <div className="w-full lg:w-[80%] h-full">{children}</div>
      </div>
    </>
  );
};

export default layout;
