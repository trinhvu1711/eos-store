"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getUserDetails, updateUserDetails } from "@/lib/services/user";
import { UpdateUserDTO, User } from "@/lib/type";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Page() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (session && session.accessToken) {
        try {
          const userDetails = await getUserDetails(session.accessToken);
          setUser(userDetails!);
        } catch (err) {
          setError("Failed to fetch user details");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [session]);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    if (session && session.accessToken) {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const userDetails: UpdateUserDTO = {
        fullname: formData.get("fullName")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        phone_number: formData.get("phoneNumber")?.toString() || "",
        address: formData.get("address")?.toString() || "",
        password: formData.get("password")?.toString() || "",
        retype_password: formData.get("retypePassword")?.toString() || "",
        date_of_birth: formData.get("dateOfBirth")?.toString() || "",
      };

      try {
        const newUser = await updateUserDetails(
          session.accessToken,
          user?.id!,
          userDetails,
        );
        setUser(newUser);
        toast.success("User information updated successfully!");
      } catch (err) {
        toast.error("Failed to update user details");
        setError("Failed to update user details");
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleFormSubmit}>
        <div className="px-20">
          <div className="text-xl font-medium text-rose-600">
            Chỉnh Sửa Trang Cá Nhân
          </div>
          <div className="mt-4 grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="fullName">Họ và Tên</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                defaultValue={user?.fullName || ""}
                placeholder="Họ và Tên..."
                className="rounded-md bg-gray-100 px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={user?.email || ""}
                placeholder="Email..."
                className="rounded-md bg-gray-100 px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="phoneNumber">Số Điện Thoại</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={user?.phoneNumber || ""}
                placeholder="Số điện thoai..."
                className="rounded-md bg-gray-100 px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="address">Địa Chỉ</label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={user?.address || ""}
                placeholder="Địa chỉ..."
                className="rounded-md bg-gray-100 px-4 py-3"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-y-4">
              <label htmlFor="password">Mật Khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mật khẩu hiện tại..."
                className="rounded-md bg-gray-100 px-4 py-3"
              />
              <input
                type="password"
                id="retypePassword"
                name="retypePassword"
                placeholder="Xác Nhận Mật khẩu..."
                className="rounded-md bg-gray-100 px-4 py-3"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-y-2">
              <label htmlFor="dateOfBirth">Ngày Sinh</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                defaultValue={
                  user?.dateOfBirth
                    ? new Date(user.dateOfBirth).toISOString().split("T")[0]
                    : ""
                }
                placeholder="Ngày sinh..."
                className="rounded-md bg-gray-100 px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="facebookAccountId">Facebook Account ID</label>
              <input
                type="text"
                id="facebookAccountId"
                name="facebookAccountId"
                defaultValue={user?.facebookAccountId || ""}
                placeholder="Facebook Account ID..."
                className="rounded-md bg-gray-100 px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="googleAccountId">Google Account ID</label>
              <input
                type="text"
                id="googleAccountId"
                name="googleAccountId"
                defaultValue={user?.googleAccountId || ""}
                placeholder="Google Account ID..."
                className="rounded-md bg-gray-100 px-4 py-3"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-x-4">
            <Link
              href="/member/account"
              className="text-sm text-gray-700 hover:underline"
            >
              Trở Về
            </Link>
            <button
              type="submit"
              className="rounded-md bg-rose-600 px-4 py-2 font-medium text-gray-50 duration-500 hover:bg-rose-700"
            >
              Xác Nhận
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Page;
