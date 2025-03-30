// app/api/overview/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Get total transactions
    const totalTransactions = await prisma.transaction.count()
    
    // Get fraud alerts
    const fraudAlerts = await prisma.transaction.count({
      where: { isFraud: true }
    })

    // Get average risk score
    const avgRisk = await prisma.transaction.aggregate({
      _avg: { riskScore: true }
    })

    // Get average compliance score
    const avgCompliance = await prisma.transaction.aggregate({
      _avg: { complianceScore: true }
    })

    // Calculate percentage changes (example for transactions)
    const lastMonthTransactions = await prisma.transaction.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          lt: new Date()
        }
      }
    })
    
    const transactionPercentage = ((totalTransactions - lastMonthTransactions) / 
      lastMonthTransactions) * 100

    // Chart data (grouped by date)
    const chartData = await prisma.transaction.groupBy({
      by: ['createdAt'],
      _count: { id: true },
      orderBy: { createdAt: 'asc' },
      where: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
        }
      }
    })

    return NextResponse.json({
      totalTransactions,
      fraudAlerts,
      avgRisk: avgRisk._avg.riskScore || 0,
      complianceScore: avgCompliance._avg.complianceScore || 0,
      transactionPercentage,
      chartData: chartData.map(item => ({
        date: item.createdAt.toISOString().split('T')[0],
        count: item._count.id
      }))
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch overview data' },
      { status: 500 }
    )
  }
}
