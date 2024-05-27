'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'next/link';
import Image from 'next/image';
import useWishlist from '@/hook/useWishlist';
import Loading from '@/app/loading';
import axios from 'axios';
import { mutate } from 'swr';

async function removeFromWishList(payload: any) {
    axios.delete(`/api/wishlist`, { data: payload })
        .then(res => mutate(`/api/wishlistByEmail`)).catch(err => console.log(err));
}

function CartList({ item }: { item: any }) {
    const product = item?.variant
    const image = (item?.variant?.images || [])[0]
    return (
        <div className="flex gap-x-1 items-center px-2 py-1 md:px-10 md:py-7 border border-gray-100 rounded-md relative group md:grid grid-cols-4 overflow-x-auto" >
            <div className="flex gap-x-5 items-center min-w-[80px]">
                <Image src={image?.url} alt={product?.product?.name} className='w-full h-full object-cover max-w-[80px]' width={80} height={80} />
            </div>
            <div className="text-gray-900 min-w-[220px]">
                {product?.product?.name}
                <div className='text-gray-600 text-sm'>{product?.color.name}</div>
            </div>
            <div className="text-center text-sm md:text-base min-w-[100px]">
                <div>{product?.discount ? product?.discount.toLocaleString() : product?.price.toLocaleString()} VNĐ </div>
                {product?.quantity > 0 ? <div className='text-lime-600 text-xs md:text-sm'>Còn Hàng</div> : <div className='text-red-600 text-xs md:text-sm'>Hết Hàng</div>}
            </div>

            <Link href={`/products/${product?.product?.slug}`} className="text-right text-gray-600 hover:text-gray-900 text-sm md:text-base min-w-[100px]">Xem sản phẩm</Link>
            <button onClick={() => removeFromWishList({ id: item?.id })}
                className='absolute top-2 right-3 hidden group-hover:inline'><FontAwesomeIcon icon={'x'} className='w-4 h-4 text-red-600' /></button>
        </div>
    )


}

export default function Wishlist() {
    const { data, error, isLoading ,isValidating} = useWishlist()
    if (isLoading || isValidating) { return <Loading /> }
    if (error) { return <div>Lỗi Khổng Thể Tải Trang</div> }
    return (
        <section>
            <div className='space-y-3'>
                <div className="flex px-2 py-1 md:px-10 md:py-6 md:grid grid-cols-4 overflow-x-auto">
                    <div className="text-left font-medium min-w-[80px]">Sản Phẩm</div>
                    <div className="font-medium min-w-[220px]">Tên </div>
                    <div className="text-center font-medium min-w-[80px]">Trạng Thái</div>
                    <div className="text-right font-medium min-w-[100px]"></div>
                </div>
                {data?.map((item: any, index: number) => (<CartList key={index} item={item} />))}
            </div>
        </section>
    );
}