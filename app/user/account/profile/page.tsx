import Link from "next/link";
export const metadata = {
    title: "Chỉnh Sửa Trang Cá Nhân",
}
function Page() {
    return ( 
        <form action="">
            <div className="px-20">
                <div className="text-xl font-medium text-rose-600">Chỉnh Sửa Trang Cá Nhân</div>
                <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="f-name">Họ</label>
                        <input type="text" id="f-name" placeholder="Họ..." className="py-3 px-4 bg-gray-100 rounded-md"/>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="l-name">Tên</label>
                        <input type="text" id="l-name" placeholder="Tên..." className="py-3 px-4 bg-gray-100 rounded-md"/>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Email..." className="py-3 px-4 bg-gray-100 rounded-md"/>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="phone">Số Điện Thoại</label>
                        <input type="text" id="phone" placeholder="Số điện thoai..." className="py-3 px-4 bg-gray-100 rounded-md"/>
                    </div>
                    <div className="flex flex-col gap-y-4 col-span-2">
                        <label htmlFor="curentPassword">Mật Khẩu</label>
                        <input type="password" id="currentPassword" placeholder="Mật khẩu hiện tại..." className="py-3 px-4 bg-gray-100 rounded-md"/>
                        <input type="password" id="newPassword" placeholder="Mật khẩu mới..." className="py-3 px-4 bg-gray-100 rounded-md"/>
                        <input type="password" id="rePassword" placeholder="Xác Nhân..." className="py-3 px-4 bg-gray-100 rounded-md"/>
                    </div>
                </div>
                <div className="flex justify-end items-center gap-x-4 mt-4">
                    <Link href='/member/account' className="text-sm hover:underline text-gray-700">Trở Về</Link>
                    <button type="submit" className="py-2 px-4 bg-rose-600 text-gray-50 font-medium rounded-md hover:bg-rose-700 duration-500">Xác Nhận</button>
                </div>
            </div>
        </form>
     );
}

export default Page;