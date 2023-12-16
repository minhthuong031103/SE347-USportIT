import HomeBanner from '@/components/HomeBanner';
import { Balancer } from 'react-wrap-balancer';
import 'react-multi-carousel/lib/styles.css';
import ShopByCollection from './ShopByCollection';
import Categories from './Categories';
import FeaturedProduct from './FeaturedProduct';
import SalesProduct from './SalesProduct';
import ShopAll from './ShopAll';
import ClientSideImage from './ClientSideImage';
import AddProductDialog from './AddProductDialog';
import AddSuccessCartItem from '../cart/AddSuccessCartItem';

const page = () => {
  return (
    <div className="mt-10 flex h-full w-full flex-col">
      <HomeBanner />

      <ShopAll />

      <ClientSideImage
        src={
          'https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_974,c_limit/79cf6b2d-1216-4d22-a3cd-e9fca50ddebe/nike-just-do-it.png'
        }
      />

      <ShopByCollection />
      <SalesProduct />

      <ClientSideImage
        src={
          'https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1531,c_limit/bb4458f0-855c-4548-a745-97aefec048ea/nike-just-do-it.jpg'
        }
      />

      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
      >
        <h1 className="px-1 text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          KHÔNG NGỪNG TIẾN BỘ
        </h1>
        <Balancer className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
          Giữ phong cách cổ điển với những đôi giày đơn giản và tinh tế.
        </Balancer>
      </section>
      <FeaturedProduct />

      <section>
        <Categories />
      </section>

      <AddProductDialog />
      <AddSuccessCartItem />
    </div>
  );
};
export default page;
