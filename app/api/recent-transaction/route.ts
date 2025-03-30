// app/api/recent-transactions/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const recentTransactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        transactionId: true,
        amount: true,
        status: true,
        customerName: true,
        riskScore: true,
        createdAt: true,
        // email: true
      }
    })

    return NextResponse.json(recentTransactions.map(transaction => ({
      id: transaction.id,
      transactionId: transaction.transactionId,
      amount: `$${transaction.amount.toString()}`,
      status: transaction.status === 'approved' ? 'completed' : 
             transaction.status === 'pending' ? 'processing' : 
             transaction.status.toLowerCase(),
      name: transaction.customerName,
    //   email: transaction.email,
      riskScore: transaction.riskScore,
      date: transaction.createdAt
    })))
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recent transactions' },
      { status: 500 }
    )
  }
}
