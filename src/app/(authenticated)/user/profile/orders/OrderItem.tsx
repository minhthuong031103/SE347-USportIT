import { Image } from '@nextui-org/react';

const OrderItem = ({ order, product }) => {
  return (
    <div className="w-60 h-48 flex flex-col justify-between gap-3 border-1 rounded-md p-3 m-2">
      <div className="w-full h-[80%] flex flex-row justify-between gap-3">
        <div className="w-[50%] h-[80%]">
          <Image
            src={JSON.parse(product.thumbnail).url}
            alt={product?.name}
            width={100}
            height={100}
          />
        </div>
        <div className="w-full h-[80%] flex flex-col font-bold">
          <div className="flex flex-col gap-y-2 items-end">
            <div className="text-sm">{product?.name}</div>
            <div className="text-sm">
              Giá: {product?.price?.toLocaleString('vi-VN')} VNĐ
            </div>

            <div className="text-sm">SL: {order?.quantity}</div>
          </div>
        </div>
      </div>
      <div className="h-[15%] font-bold flex flex-row justify-between">
        <span>Thành tiền:</span>
        <span className="text-green-300">
          {(order?.quantity * product?.price)?.toLocaleString('vi-VN')}VNĐ
        </span>
      </div>
    </div>
  );
};

export default OrderItem;
