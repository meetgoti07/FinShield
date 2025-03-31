import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust this path to your Prisma client

export async function GET() {
    try {
        // Group transactions by month and aggregate relevant data
        const transactionOverview = await prisma.transaction.groupBy({
            by: ["date"],
            _sum: {
                amount: true, // Sum transaction amounts
                riskScore: true, // Sum risk scores (if needed)
                complianceScore: true, // Sum compliance scores (if needed)
            },
            _count: {
                id: true, // Count total transactions
            },
            // Calculate how many records have `isFraud = true` using filtering
            where: {
                isFraud: true,
            },
        });

        // Format data for visualization (grouping by month)
        const formattedData = transactionOverview.map((item) => {
            const monthName = item.date.toLocaleString("default", { month: "short" });
            return {
                name: monthName,
                transactions: item._count.id, // Count of transactions
                fraudAlerts: item._count.id // Fraud count matches the filtered count
            };
        });

        return NextResponse.json(formattedData);
    } catch (error) {
        console.error("Error fetching transaction overview:", error);
        return NextResponse.error();
    }
}
