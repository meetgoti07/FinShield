"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { User, UserStatus } from "@/types/user"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react"
import { JSX } from "react/jsx-runtime"

const data: User[] = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john@example.com",
    role: "Analyst",
    lastActivity: "2023-11-15T14:32:00Z",
    status: "active",
    riskLevel: "medium",
    flaggedActivities: 3,
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    lastActivity: "2023-11-14T09:15:00Z",
    status: "active",
    riskLevel: "low",
    flaggedActivities: 0,
  },
  {
    id: "USR-003",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "Operator",
    lastActivity: "2023-11-13T18:45:00Z",
    status: "flagged",
    riskLevel: "high",
    flaggedActivities: 7,
  },
]

const statusIcons: Record<UserStatus, JSX.Element> = {
  active: <ShieldCheck className="h-4 w-4 text-green-500" />,
  suspended: <ShieldAlert className="h-4 w-4 text-red-500" />,
  flagged: <ShieldQuestion className="h-4 w-4 text-amber-500" />,
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as UserStatus
      return (
        <div className="flex items-center gap-2">
          {statusIcons[status]}
          <span className="capitalize">{status}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "riskLevel",
    header: "Risk Level",
    cell: ({ row }) => {
      const riskLevel = row.getValue("riskLevel") as string
      const variant = riskLevel === "high" 
        ? "destructive" 
        : riskLevel === "medium" 
        ? "warning" 
        : "default"
      return <Badge>{riskLevel}</Badge>
    },
  },
  {
    accessorKey: "flaggedActivities",
    header: "Flagged Activities",
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
    cell: ({ row }) => new Date(row.getValue("lastActivity")).toLocaleString(),
  },
]

export function UsersTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}