import { getUserDetails } from "@/lib/services/user";
import Account from "./Account";
export const metadata = {
  title: "Thông Tin Cá Nhân",
};
export default function Page() {
  // const user = await getUserDetails();
  return (
    <>
      <Account />
    </>
  );
}
