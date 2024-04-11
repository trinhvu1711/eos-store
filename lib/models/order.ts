import { User } from "./user";

export type Order = {
  id: number;
  user: User;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  note: string;
  orderDate: string;
  status: string;
  totalMoney: number;
  shippingMethod: string;
  shippingAddress: string;
  shippingDate: string;
  trackingNumber: string | null;
  paymentMethod: string;
  active: boolean;
};

export const order: Order = {
  id: 1,
  user: {
    createdAt: null,
    updatedAt: null,
    id: 1,
    fullName: "Trinh Long Vu",
    phoneNumber: "1231312",
    address: "asdasd",
    password: "asdasd",
    active: true,
    dateOfBirth: null,
    facebookAccountId: 0,
    googleAccountId: 0,
    role: null,
  },
  fullName: "trinh long vu 2",
  email: "longvu2@gmail.com",
  phoneNumber: "131983712",
  address: "address abc",
  note: "note expample",
  orderDate: "2024-04-05T08:29:55.000+00:00",
  status: "pending",
  totalMoney: 123123.0,
  shippingMethod: "express",
  shippingAddress: "1231231",
  shippingDate: "2023-04-05",
  trackingNumber: null,
  paymentMethod: "cod",
  active: false,
};
