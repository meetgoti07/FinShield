"use client"

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDistanceToNow } from "date-fns"

// const transactions = [
//   {
//     id: "T-1234",
//     amount: "$1,250.00",
//     status: "completed",
//     email: "john@example.com",
//     name: "John Smith",
//     riskScore: 0.02,
//     date: new Date(2023, 2, 15),
//   },
//   {
//     id: "T-1235",
//     amount: "$150.00",
//     status: "completed",
//     email: "sarah@example.com",
//     name: "Sarah Johnson",
//     riskScore: 0.01,
//     date: new Date(2023, 2, 14),
//   },
//   {
//     id: "T-1236",
//     amount: "$350.00",
//     status: "processing",
//     email: "michael@example.com",
//     name: "Michael Chen",
//     riskScore: 0.05,
//     date: new Date(2023, 2, 14),
//   },
//   {
//     id: "T-1237",
//     amount: "$450.00",
//     status: "completed",
//     email: "emma@example.com",
//     name: "Emma Wilson",
//     riskScore: 0.03,
//     date: new Date(2023, 2, 13),
//   },
//   {
//     id: "T-1238",
//     amount: "$2,500.00",
//     status: "flagged",
//     email: "robert@example.com",
//     name: "Robert Davis",
//     riskScore: 0.75,
//     date: new Date(2023, 2, 13),
//   },
// ]

  interface Transaction {
    id: string
    transactionId: string
    amount: string
    status: 'completed' | 'processing' | 'flagged'
    name: string
    email: string
    riskScore: number
    date: Date
  }

export function RecentTransactions() {

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/recent-transaction')
      .then(res => res.json())
      .then(data => {
        setTransactions(data)
        setLoading(false)
      })
  }, [])
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Risk Score</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">{transaction.id}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>
              <Badge
                variant={
                  transaction.status === "completed"
                    ? "outline"
                    : transaction.status === "processing"
                      ? "secondary"
                      : "destructive"
                }
              >
                {transaction.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={transaction.name} />
                  <AvatarFallback>{transaction.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{transaction.name}</span>
                  <span className="text-xs text-muted-foreground">{transaction.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    transaction.riskScore < 0.3
                      ? "bg-green-500"
                      : transaction.riskScore < 0.7
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                />
                <span>{transaction.riskScore.toFixed(2)}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">{formatDistanceToNow(transaction.date, { addSuffix: true })}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

