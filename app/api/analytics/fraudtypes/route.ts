import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Get all fraud transactions
        const fraudTransactions = await prisma.transaction.findMany({
            where: {
                isFraud: true
            },
            select: {
                category: true,
                reason: true
            }
        });

        // Group fraud transactions by category or reason
        const fraudTypeMap = new Map();

        // First try to group by reason if available
        fraudTransactions.forEach(transaction => {
            if (transaction.reason) {
                // Simplify reason text to get a general category
                let fraudType = "Other";

                if (transaction.reason.toLowerCase().includes("identity")) {
                    fraudType = "Identity Theft";
                } else if (transaction.reason.toLowerCase().includes("account") ||
                    transaction.reason.toLowerCase().includes("takeover")) {
                    fraudType = "Account Takeover";
                } else if (transaction.reason.toLowerCase().includes("payment")) {
                    fraudType = "Payment Fraud";
                } else if (transaction.reason.toLowerCase().includes("chargeback")) {
                    fraudType = "Chargeback";
                }

                fraudTypeMap.set(fraudType, (fraudTypeMap.get(fraudType) || 0) + 1);
            } else {
                // If no reason, use category
                const category = transaction.category || "Other";
                fraudTypeMap.set(category, (fraudTypeMap.get(category) || 0) + 1);
            }
        });

        // Convert map to array format needed for the pie chart
        const fraudTypeData = Array.from(fraudTypeMap.entries()).map(([name, value]) => ({
            name,
            value
        }));

        // If no fraud data, return sample data
        if (fraudTypeData.length === 0) {
            return NextResponse.json([
                { name: "Identity Theft", value: 35 },
                { name: "Account Takeover", value: 25 },
                { name: "Payment Fraud", value: 20 },
                { name: "Chargeback", value: 15 },
                { name: "Other", value: 5 }
            ]);
        }

        return NextResponse.json(fraudTypeData);
    } catch (error) {
        console.error('Error fetching fraud types data:', error);
        return NextResponse.json({ error: 'Failed to fetch fraud types data' }, { status: 500 });
    }
}
