"use client";

import Image from "next/image";

// import {signIn} from 'next-auth/react';
function LoginWithGoogle() {
  return (
    <button
      // onClick={async() => { await signIn('google')}}
      type="button"
      className="flex w-full items-center justify-center gap-x-2 rounded-md border border-gray-600 px-4 py-2"
    >
      <Image
        src="/images/google.png"
        alt="svg-google-icon"
        width={20}
        height={20}
      />
      <span>Đăng nhập bằng Google </span>
    </button>
  );
}

export default LoginWithGoogle;
