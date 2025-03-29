"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, MoreHorizontal, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const policies = [
  {
    id: "P-1234",
    name: "Anti-Money Laundering Policy",
    category: "AML",
    version: "2.1",
    lastUpdated: "2023-01-15",
    status: "Active",
  },
  {
    id: "P-1235",
    name: "Know Your Customer Procedures",
    category: "KYC",
    version: "1.5",
    lastUpdated: "2023-02-10",
    status: "Active",
  },
  {
    id: "P-1236",
    name: "Transaction Monitoring Guidelines",
    category: "Transaction",
    version: "3.0",
    lastUpdated: "2023-01-20",
    status: "Active",
  },
  {
    id: "P-1237",
    name: "Risk Assessment Framework",
    category: "Risk",
    version: "2.2",
    lastUpdated: "2023-03-05",
    status: "Active",
  },
  {
    id: "P-1238",
    name: "Data Protection Policy",
    category: "Data",
    version: "1.8",
    lastUpdated: "2023-02-28",
    status: "Active",
  },
  {
    id: "P-1239",
    name: "Employee Training Program",
    category: "Training",
    version: "1.3",
    lastUpdated: "2023-01-10",
    status: "Active",
  },
  {
    id: "P-1240",
    name: "Suspicious Activity Reporting Procedures",
    category: "AML",
    version: "2.0",
    lastUpdated: "2023-03-15",
    status: "Active",
  },
  {
    id: "P-1241",
    name: "Customer Due Diligence Guidelines",
    category: "KYC",
    version: "1.7",
    lastUpdated: "2023-02-20",
    status: "Active",
  },
  {
    id: "P-1242",
    name: "Regulatory Compliance Framework",
    category: "Regulatory",
    version: "1.2",
    lastUpdated: "2023-03-01",
    status: "Draft",
  },
]

export function PolicyList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search policies..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Policy ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {policies.map((policy) => (
            <TableRow key={policy.id}>
              <TableCell className="font-medium">{policy.id}</TableCell>
              <TableCell>{policy.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{policy.category}</Badge>
              </TableCell>
              <TableCell>v{policy.version}</TableCell>
              <TableCell>{policy.lastUpdated}</TableCell>
              <TableCell>
                <Badge variant={policy.status === "Active" ? "default" : "secondary"}>{policy.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function Filter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

function Edit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function Trash(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}

