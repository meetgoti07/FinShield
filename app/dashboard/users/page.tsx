"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react"
import { User, UserStatus } from "@/types/user"

// Header Component
function UsersHeader() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
                <p className="text-muted-foreground">
                    Monitor and manage user accounts with suspicious activity
                </p>
            </div>
        </div>
    )
}

// Filters Component
function UsersFilters({ filters, setFilters }: any) {
    return (
        <div className="flex items-center gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search users..."
                    className="pl-9 w-full lg:w-[400px]"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
            </div>
            <Select onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => setFilters({ ...filters, riskLevel: value })}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

// Table Component
function UsersTable({ data }: any) {
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: "User",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.getValue("name")}</div>
                </div>
            ),
        },
        { accessorKey: "role", header: "Role" },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as UserStatus
                const statusIcons: Record<UserStatus, JSX.Element> = {
                    active: <ShieldCheck className="h-4 w-4 text-green-500" />,
                    suspended: <ShieldAlert className="h-4 w-4 text-red-500" />,
                    flagged: <ShieldQuestion className="h-4 w-4 text-amber-500" />,
                }
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
                const variant =
                    riskLevel === "high"
                        ? "destructive"
                        : riskLevel === "medium"
                            ? "warning"
                            : "default"
                return <Badge>{riskLevel}</Badge>
            },
        },
        { accessorKey: "flaggedActivities", header: "Flagged Activities" },
        {
            accessorKey: "lastActivity",
            header: "Last Activity",
            cell: ({ row }) =>
                new Date(row.getValue("lastActivity")).toLocaleString(),
        },
    ]

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
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
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

// Main Component
export default function UsersPage() {
    const [data, setData] = useState<User[]>([])
    const [filters, setFilters] = useState({
        search: "",
        status: "all",
        riskLevel: "all",
    })

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/users")
            const users = await response.json()

            // Filter and calculate logic
            const filteredData = users.filter((user: User) => {
                return (
                    (filters.status === "all" || user.status === filters.status) &&
                    (filters.riskLevel === "all" || user.riskLevel === filters.riskLevel) &&
                    user.name.toLowerCase().includes(filters.search.toLowerCase())
                )
            })

            setData(filteredData)
        }

        fetchData()
    }, [filters])

    return (
        <div className="space-y-6">
            <UsersHeader />
            <UsersFilters filters={filters} setFilters={setFilters} />
            <UsersTable data={data} />
        </div>
    )
}
