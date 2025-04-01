import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust to your Prisma client path

export async function GET(request: Request) {
    try {
        // Retrieve all transactions from the database in descending order (recent first)
        const alerts = await prisma.transaction.findMany({
            select: {
                id: true,
                alertId:true,
                transactionId: true,
                amount: true,
                category: true,
                severity: true,
                status: true,
                createdAt: true,
                reason: true,
            },
            orderBy: {
                createdAt: "desc", // Order by most recent transactions first
            },
        });

        // Return the alerts as JSON
        return NextResponse.json(alerts);
    } catch (error) {
        console.error("Error fetching alerts:", error);
        return NextResponse.json(
            { error: "Failed to fetch alerts" },
            { status: 500 }
        );
    }
}