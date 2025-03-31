// app/api/recent-fraud/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const fraudAlerts = await prisma.transaction.findMany({
      where: {
        isFraud: true,
        status: { in: ['pending', 'flagged'] } // Adjust based on your needs
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        transactionId: true,
        amount: true,
        customerName: true,
        createdAt: true,
        status: true,
        riskScore: true,
        reason: true,
        isApproved: true,
        severity: true
      },
    })

    return NextResponse.json(fraudAlerts.map(alert => ({
      id: alert.id,
      transactionId: alert.transactionId,
      amount: `$${alert.amount.toString()}`,
      customer: alert.customerName,
      date: alert.createdAt,
      status: alert.status === 'flagged' ? 'pending' : alert.status.toLowerCase(),
      riskScore: alert.riskScore,
      reason: alert.reason || 'No reason provided',
      severity: alert.severity
    })))
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch fraud alerts' },
      { status: 500 }
    )
  }
}
