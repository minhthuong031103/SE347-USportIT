import ProductDetailLeft from './ProductDetailLeft';
import ProductDetailRight from './ProductDetailRight';
import { useProduct } from '@/hooks/useProduct';
import ProductReviewRating from './ProductReviewRating';
import ProductReview from './ProductReview';
import ProductReviewForm from './ProductReviewForm';
import ProductUserMayLike from './ProductUserMayLike';

async function page({ params }) {
  const { slug } = params;
  const { onGetProductDetail } = useProduct();
  // const productDetail = await fetch(
  //   `${process.env.API_HOST}/api/product/detail?productId=${slug}`,
  //   {
  //     cache: 'no-cache',
  //   }
  // );
  // const data = await productDetail?.json();
  // console.log(data);
  const res = await onGetProductDetail(slug);

  const data = res;
  return (
    <div className="w-full md:py-20 overflow-hidden">
      <div
        className="w-full flex-col max-w-[1280px] px-5
  md:px-10 mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-[50px] lg:gap-[100px] ">
          <div className=" w-full md:w-auto flex-[1.2] max-w-[500px] lg:max-w-full lg:mx-0">
            <ProductDetailLeft data={data} />
          </div>

          <div className="flex-[0.8] py-5">
            <ProductDetailRight data={data} />
          </div>
        </div>
        <div className=" flex-col gap-1 mt-20 lg:mt-25 justify-center items-center flex text-[34px] font-semibold mb-2 leading-tight">
          Reviews
          <div className="w-full pt-2">
            <ProductReviewRating product={data} />
          </div>
          <div className="container w-full">
            <ProductReviewForm product={data}></ProductReviewForm>
          </div>
        </div>
        <div className="w-full py-5">
          <ProductReview product={data} />
        </div>
        <div>
          <ProductUserMayLike data={data} />
        </div>
      </div>
    </div>
  );
}

export default page;
