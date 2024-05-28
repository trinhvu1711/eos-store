import Link from "next/link";
export const metadata = {
    title: "Chỉnh Sửa Địa Chỉ Giao Hàng",
}
function Page() {
    return ( 
        <form action="">
            <div className="px-20">
                <div className="text-xl font-medium text-rose-600">Chỉnh Sửa Địa Chỉ Giao Hàng</div>
                <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Họ và Tên</label>
                        <input type="text" id="name" placeholder="Họ và Tên..." className="py-3 px-4 bg-gray-100 rounded-md"/>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="phone">Số Điện thoại</label>
                        <input type="text" id="phone" placeholder="Số Điện Thoại..." className="py-3 px-4 bg-gray-100 rounded-md"/>
                    </div>
                    <div className="flex flex-col gap-y-4 col-span-2">
                        <label htmlFor="address">Địa Chỉ Giao Hàng</label>
                        <textarea  id="address" placeholder="Địa Chỉ Giao Hàng..." className="py-3 px-4 bg-gray-100 rounded-md resize-none" rows={5}/>
                    </div>
                </div>
                <div className="flex justify-end items-center gap-x-4 mt-4">
                    <Link href='/member/account' className="text-sm hover:underline text-gray-700">Trở Về</Link>
                    <button type="submit" className="py-2 px-4 bg-rose-600 font-medium text-gray-50 rounded-md hover:bg-rose-700 duration-500">Xác Nhận</button>
                </div>
            </div>
        </form>
     );
}

export default Page;