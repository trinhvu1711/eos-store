"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Tab from "./Tab";
import { MapIcon } from "@heroicons/react/24/outline";
import MemberLoading from "@/components/loading/MemberLoading";
import { getUserDetails } from "@/lib/services/user";
import { useSession } from "next-auth/react";
import { User } from "@/lib/type";

export default function Account() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (session && session.accessToken) {
        try {
          const userDetails = await getUserDetails(session.accessToken);
          setUser(userDetails);
        } catch (err) {
          setError("Failed to fetch user details");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [session]);

  if (isLoading) return <MemberLoading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-3">
      <div className="relative">
        <Image
          src="/images/demo-banner.png"
          alt="demo-banner"
          className="mx-auto max-h-52 w-full object-cover"
          width={1080}
          height={200}
        />
        <div className="absolute left-8 top-1/2 -translate-y-1/2">
          <div className="h-40 w-40 rounded-full bg-white">
            <Image
              src={"/images/no-img.png"}
              width={160}
              height={160}
              alt="demo avatar"
              className="h-full w-full rounded-full border-8 border-gray-50 object-cover"
            />
          </div>
        </div>
      </div>
      <div className="space-y-1">
        {user && (
          <>
            <div className="flex items-center gap-x-3">
              <div className="text-2xl font-medium">{user.fullName}</div>
              <div className="flex items-start gap-x-1 text-sm text-gray-600">
                <MapIcon className="h-4 w-4" />
                <span>{user.address}</span>
              </div>
            </div>
            <div className="text-sky-600">{user.email}</div>
            <div className="text-gray-600">(+84) {user.phoneNumber}</div>
          </>
        )}
        <section className="py-5">
          <Tab />
        </section>
      </div>
    </div>
  );
}
