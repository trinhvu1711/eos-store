import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: number;
      fullName: string;
      phoneNumber: string;
      email: string;
      address: string;
      active: boolean;
      dateOfBirth: number;
      facebookAccountId: number;
      googleAccountId: number;
      role: {
        id: number;
        name: string;
      };
      image: string;
    };
  }

  interface User {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    active: boolean;
    dateOfBirth: number;
    facebookAccountId: number;
    googleAccountId: number;
    role: {
      id: number;
      name: string;
    };
    accessToken?: string;
    image: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: {
      id: number;
      fullName: string;
      phoneNumber: string;
      email: string;
      address: string;
      active: boolean;
      dateOfBirth: number;
      facebookAccountId: number;
      googleAccountId: number;
      role: {
        id: number;
        name: string;
      };
      image: string;
    };
  }
}
