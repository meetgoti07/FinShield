import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust to your Prisma client path

export async function GET(request: Request) {
  try {
    // Retrieve all transactions from the database
    const alerts = await prisma.transaction.findMany({
      select: {
        id: true,
        transactionId: true,
        amount: true,
        // riskScore: true,
        category: true,
        severity: true,
        status: true,
        createdAt: true,
        reason: true,
        // customerName: true,
        // merchant: true,
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





// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma"; // Your Prisma client import

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get("page") || "1");
//     const pageSize = parseInt(searchParams.get("pageSize") || "10");

//     // Validate request parameters
//     if (isNaN(page) || isNaN(pageSize)) {
//       return NextResponse.json(
//         { error: "Invalid pagination parameters" },
//         { status: 400 }
//       );
//     }

//     // Fetch alerts with pagination (example using your Transaction schema)
//     const [alerts, totalAlerts] = await Promise.all([
//       prisma.transaction.findMany({
//         where: {
//           severity: { not: "none" }, // Filter based on severity
//           isFraud: true // Only show fraud-related alerts
//         },
//         select: {
//           id: true,
//           transactionId: true,
//           amount: true,
//           riskScore: true,
//           description: true,
//           severity: true,
//           status: true,
//           createdAt: true,
//           reason: true,
//           customerName: true,
//           merchant: true,
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//         skip: (page - 1) * pageSize,
//         take: pageSize,
//       }),
//       prisma.transaction.count({
//         where: {
//           severity: { not: "none" },
//           isFraud: true
//         }
//       })
//     ]);

//     // Transform the data to match your Alert interface
//     const transformedAlerts = alerts.map(transaction => ({
//       id: transaction.id,
//       type: transaction.reason || "Suspicious Activity",
//       description: transaction.description || 
//         `Transaction ${transaction.transactionId} flagged for ${transaction.severity} risk (${transaction.riskScore} score)`,
//       transactionId: transaction.transactionId,
//       severity: transaction.severity.toLowerCase() as "high" | "medium" | "low",
//       status: this.getAlertStatus(transaction.status),
//       timestamp: transaction.createdAt.toISOString()
//     }));

//     return NextResponse.json({
//       alerts: transformedAlerts,
//       totalAlerts: totalAlerts
//     });

//   } catch (error) {
//     console.error("[ALERTS_API_ERROR]", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// // Helper function to map your transaction status to alert status
// private getAlertStatus(transactionStatus: TransactionStatus): AlertStatus {
//   const statusMap: Record<TransactionStatus, AlertStatus> = {
//     pending: "new",
//     completed: "resolved",
//     flagged: "investigating",
//     rejected: "false-positive"
//   };
//   return statusMap[transactionStatus] || "new";
// }
