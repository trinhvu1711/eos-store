"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { User } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";
import { UserAdmin } from "@/lib/type";

export const columns: ColumnDef<UserAdmin>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    header: "NAME",
  },
  {
    accessorKey: "phoneNumber",
    header: "PHONE",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
  {
    accessorKey: "isActive",
    header: "STATUS",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
