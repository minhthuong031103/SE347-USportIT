'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const ClientSideImage = ({ src }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Sử dụng useEffect để lắng nghe sự kiện resize của cửa sổ
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Làm sạch lắng nghe khi component bị hủy
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Image
      src={src}
      className="relative"
      width={windowWidth}
      height={windowWidth / 2}
      priority
      quality={100}
      objectFit="cover"
      alt="hero image"
    />
  );
};

export default ClientSideImage;
