"use client"

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDistanceToNow } from "date-fns"

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

  useEffect(() => {
    fetch('/api/recent-transaction')
      .then(res => res.json())
      .then(data => {
        setTransactions(data)
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
                    transaction.riskScore < 30
                      ? "bg-green-500"
                      : transaction.riskScore < 70
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                />
                <span>{transaction.riskScore.toPrecision(2)}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">{formatDistanceToNow(transaction.date, { addSuffix: true })}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

