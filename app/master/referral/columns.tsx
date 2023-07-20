"use client"

import { ColumnDef } from "@tanstack/react-table"
import { referralType } from "./data"

import { Button } from "@/components/ui/button"
import UpDownArrowIcon from "@/components/ui/icons/UpDownArrowIcon"
import DeleteDialogRefTable from "@/app/components/DeleteDialogRefTable"
import EditDialogRefTable from "@/app/components/EditDialogRefTable"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<referralType>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         ID
  //         <UpDownArrowIcon />
  //       </Button>
  //     )
  //   },
  // },
  {
    accessorKey: "firstname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Firstname
          <UpDownArrowIcon />
        </Button>
      )
    },
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lastname
          <UpDownArrowIcon />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <UpDownArrowIcon />
        </Button>
      )
    },
  },
  {
    accessorKey: "telephone",
    header: "Telephone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const referral = row.original

      return (
        <>
          <DeleteDialogRefTable referral={referral} />
          <EditDialogRefTable referral={referral} />
        </>
      )
    },
  },
]
