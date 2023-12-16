import { Button } from '@/components/ui/button';
import React from 'react';
import { Balancer } from 'react-wrap-balancer';

function ShopAll() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
    >
      <h1 className="px-1 text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        MỞ RA KỈ NGUYÊN MỚI
      </h1>
      <Balancer className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
        Một kỉ nguyên mới không phải là một kết thúc - đó là một sự tiến hóa.
        Hãy bước tiếp cùng chúng tôi trong chương tiếp theo với những món đồ
        mang tính di sản Jordan vào phong cách thời trang tương lai.
      </Balancer>
      <Button>Cửa Hàng</Button>
    </section>
  );
}

export default ShopAll;
