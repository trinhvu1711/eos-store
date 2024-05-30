import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export type Product = {
  id: number;
  name: string;
  prices: string[];
  category: string;
  description: string;
  variants: string[];

};


export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "User",
    href: "/admin/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Product",
    href: "/admin/product",
    icon: "dashboard",
    label: "product",
  },
  {
    title: "Profile",
    href: "/admin/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Kanban",
    href: "/admin/kanban",
    icon: "kanban",
    label: "kanban",
  },
];
