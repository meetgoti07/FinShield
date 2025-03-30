"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type Row,
  type HeaderGroup,
  type Cell,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal, AlertTriangle, Clock, CheckCircle2, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

type AlertStatus = "new" | "investigating" | "resolved" | "false-positive"
type AlertSeverity = "high" | "medium" | "low"

interface Alert {
  id: string
  type: string
  description: string
  transactionId: string
  severity: AlertSeverity
  status: AlertStatus
  timestamp: string
}

const alerts: Alert[] = [
  {
    id: "A-1234",
    type: "Unusual Amount",
    description: "Transaction amount significantly higher than user average",
    transactionId: "T-1236",
    severity: "high",
    status: "new",
    timestamp: "2023-04-12T10:30:00Z",
  },
  {
    id: "A-1235",
    type: "Multiple Failed Logins",
    description: "5 failed login attempts from different locations",
    transactionId: "N/A",
    severity: "high",
    status: "investigating",
    timestamp: "2023-04-12T09:45:00Z",
  },
  {
    id: "A-1236",
    type: "Location Anomaly",
    description: "Transaction from unusual location for this user",
    transactionId: "T-1238",
    severity: "medium",
    status: "new",
    timestamp: "2023-04-12T08:15:00Z",
  },
  {
    id: "A-1237",
    type: "Rapid Transactions",
    description: "Multiple transactions in short time period",
    transactionId: "T-1240",
    severity: "medium",
    status: "resolved",
    timestamp: "2023-04-11T22:10:00Z",
  },
  {
    id: "A-1238",
    type: "Unusual Device",
    description: "Login from new device not previously used",
    transactionId: "N/A",
    severity: "low",
    status: "false-positive",
    timestamp: "2023-04-11T18:30:00Z",
  },
  {
    id: "A-1239",
    type: "Suspicious IP",
    description: "Access from IP address associated with fraud",
    transactionId: "T-1243",
    severity: "high",
    status: "investigating",
    timestamp: "2023-04-11T16:45:00Z",
  },
  {
    id: "A-1240",
    type: "Account Takeover Attempt",
    description: "Multiple password reset attempts",
    transactionId: "N/A",
    severity: "high",
    status: "new",
    timestamp: "2023-04-11T14:20:00Z",
  },
  {
    id: "A-1241",
    type: "Unusual Time",
    description: "Transaction at unusual time for this user",
    transactionId: "T-1241",
    severity: "low",
    status: "false-positive",
    timestamp: "2023-04-11T03:15:00Z",
  },
]

const columns: ColumnDef<Alert>[] = [
  {
    accessorKey: "id",
    header: "Alert ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate" title={row.getValue("description")}>
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const severity = row.getValue("severity") as AlertSeverity
      const variantMap: Record<AlertSeverity, "destructive" | "secondary" | "outline"> = {
        high: "destructive",
        medium: "secondary",
        low: "outline",
      }
      return <Badge variant={variantMap[severity]}>{severity}</Badge>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as AlertStatus
      const statusIcons = {
        "new": <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />,
        "investigating": <Clock className="mr-2 h-4 w-4 text-amber-500" />,
        "resolved": <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />,
        "false-positive": <XCircle className="mr-2 h-4 w-4 text-muted-foreground" />,
      }
      const statusText = status
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      return (
        <div className="flex items-center">
          {statusIcons[status]}
          <span>{statusText}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "timestamp",
    header: "Time",
    cell: ({ row }) => {
      const timestamp = new Date(row.getValue("timestamp"))
      return <div>{timestamp.toLocaleString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const alert = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(alert.id)}>
              Copy alert ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Mark as investigating</DropdownMenuItem>
            <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
            <DropdownMenuItem>Mark as false positive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function AlertsTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const table = useReactTable({
    data: alerts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return (
    <Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<Alert>) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<Alert>) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell: Cell<Alert, unknown>) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No alerts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </Card>
  )
}