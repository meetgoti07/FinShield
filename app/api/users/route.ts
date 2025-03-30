import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    try {
        const { search, status, riskLevel } = Object.fromEntries(request.nextUrl.searchParams)

        // Fetch transactions from the database
        const transactions = await prisma.transaction.findMany()

        // Transform transaction data into user details
        const users = transactions.map((transaction) => ({
            id: transaction.id,
            name: transaction.customerName,
            email: `${transaction.customerName.toLowerCase().replace(" ", ".")}@example.com`, // Mock email generation
            role: transaction.job || "Unknown",
            lastActivity: transaction.date.toISOString(),
            status: transaction.isFraud ? "flagged" : transaction.isApproved ? "active" : "pending",
            riskLevel:
                transaction.riskScore > 80
                    ? "high"
                    : transaction.riskScore > 50
                        ? "medium"
                        : "low",
            flaggedActivities: transaction.isFraud ? 1 : 0,
        }))

        // Apply filters if provided in query parameters
        const filteredUsers = users.filter((user) => {
            return (
                (status === undefined || status === "all" || user.status === status) &&
                (riskLevel === undefined || riskLevel === "all" || user.riskLevel === riskLevel) &&
                (search === undefined || user.name.toLowerCase().includes(search.toLowerCase()))
            )
        })

        return NextResponse.json(filteredUsers, { status: 200 })
    } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }
}
