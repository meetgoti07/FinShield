import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { format, subMonths } from 'date-fns';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Get transactions for the last 12 months
        const endDate = new Date();
        const startDate = subMonths(endDate, 12);

        // Fetch all transactions in the date range
        const transactions = await prisma.transaction.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        // Group transactions by month
        const monthlyData = Array.from({ length: 12 }, (_, i) => {
            const date = subMonths(endDate, 11 - i);
            const monthKey = format(date, 'MMM');

            const monthTransactions = transactions.filter(t =>
                format(new Date(t.createdAt), 'yyyy-MM') === format(date, 'yyyy-MM')
            );

            const totalTransactions = monthTransactions.length;
            const fraudTransactions = monthTransactions.filter(t => t.isFraud).length;
            const fraudRate = totalTransactions > 0 ? fraudTransactions / totalTransactions : 0;

            const totalAmount = monthTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
            const avgAmount = totalTransactions > 0 ? totalAmount / totalTransactions : 0;

            return {
                date: monthKey,
                fraudRate,
                avgAmount,
                totalTransactions
            };
        });

        return NextResponse.json(monthlyData);
    } catch (error) {
        console.error('Error fetching time series data:', error);
        return NextResponse.json({ error: 'Failed to fetch time series data' }, { status: 500 });
    }
}
