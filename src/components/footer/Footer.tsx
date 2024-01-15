import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-14 pb-3">
      <div
        className="w-full px-5
  md:px-10 mx-auto flex justify-between flex-col md:flex-row gap-[50px] md:gap-0"
      >
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
          {/* MENU START */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              Tìm kiếm cửa hàng
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              trở thành một đối tác
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              đăng ký email
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              gửi phản hồi
            </div>
            <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
              giảm giá cho sinh viên
            </div>
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-sm">
                Tìm kiếm giúp đỡ
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Tình trạng đơn hàng
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Giao hàng
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Trả hàng
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Phương thức thanh toán
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Liên lạc với chúng tôi
              </div>
            </div>
            {/* MENU END */}

            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-sm">
                về Elite Motion
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Tin tức
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Thông tin doanh nghiệp
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Nhà đầu tư
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer">
                Phương châm
              </div>
            </div>
            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-4 justify-center md:justify-start">
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaFacebookF size={20} />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaTwitter size={20} />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaYoutube size={20} />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaInstagram size={20} />
          </div>
        </div>
        {/* RIGHT END */}
      </div>
      <div
        className="w-full px-5
  md:px-10 mx-auto flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0"
      >
        {/* LEFT START */}
        <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer text-center md:text-left">
          © 2023 Elite Motion, Inc. All Rights Reserved
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
          <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            Guides
          </div>
          <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            Terms of Sale
          </div>
          <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            Terms of Use
          </div>
          <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            Privacy Policy
          </div>
        </div>
        {/* RIGHT END */}
      </div>
    </footer>
  );
};

export default Footer;
