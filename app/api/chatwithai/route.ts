import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma"; // Prisma client instance

// Initialize the Google Generative AI model
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { message } = body;

        // Check if the "message" is empty
        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const lowerQuery = message.toLowerCase();

        // Step 1: Filter irrelevant queries
        const allowedKeywords = [
            "fraud",
            "transaction",
            "risk",
            "compliance",
            "merchant",
            "customer",
            "amount",
            "reason",
            "category",
            "approved",
            "credit",
            "insight",
            "trend",
            "analysis",
            "average",
            "sum",
            "total",
            "date",
            "severity",
            "details",
            "top",
            "latest",
        ];

        // Check if the query includes any relevant keywords
        const isRelevant = allowedKeywords.some((keyword) => lowerQuery.includes(keyword));
        if (!isRelevant) {
            return NextResponse.json({
                answer: "I can only answer questions related to FraudShield transactions or fraud detection. Please ask a relevant question.",
            });
        }

        // Step 2: Build a Prisma filter dynamically based on the query
        let filter: any = {
            OR: [
                { customerName: { contains: message, mode: "insensitive" } },
                { merchant: { contains: message, mode: "insensitive" } },
                { category: { contains: message, mode: "insensitive" } },
                { description: { contains: message, mode: "insensitive" } },
                { reason: { contains: message, mode: "insensitive" } },
            ],
        };

        // Add specific filters for fraud or approved transactions
        if (lowerQuery.includes("fraud")) filter.isFraud = true;
        if (lowerQuery.includes("approved")) filter.isApproved = true;

        // Step 3: Retrieve and aggregate data
        const aggregates = await prisma.transaction.aggregate({
            _sum: { amount: true },
            _avg: { riskScore: true, complianceScore: true },
            _count: { id: true },
            _max: { amount: true, riskScore: true },
            _min: { amount: true, riskScore: true },
            where: filter,
        });

        // Calculate fraud counts
        const fraudCount = await prisma.transaction.count({ where: { ...filter, isFraud: true } });

        // Retrieve sample transactions (latest 5 matching transactions)
        const transactions = await prisma.transaction.findMany({
            select: {
                transactionId: true,
                customerName: true,
                creditCardNo: true,
                merchant: true,
                category: true,
                amount: true,
                isFraud: true,
                riskScore: true,
                complianceScore: true,
                severity: true,
                description: true,
                date: true,
                reason: true,
            },
            orderBy: { date: "desc" }, // Order by the most recent transactions
            take: 100, // Limit to first 100 records
        });

        // Step 2: Handle case where no transactions are found
        if (!transactions || transactions.length === 0) {
            return NextResponse.json({
                answer: "No transaction data is available for your query.",
            });
        }

        // Step 3: Build the prompt to pass transaction details to LLM
        const transactionDetails = transactions
            .map((t) =>
                `Transaction ID: ${t.transactionId}, Customer Name: ${t.customerName}, Amount: $${t.amount.toFixed(
                    2
                )}, Merchant: ${t.merchant}, Category: ${t.category}, Fraud: ${t.isFraud}, Risk Score: ${
                    t.riskScore
                }, Compliance Score: ${t.complianceScore}, Severity: ${t.severity}, Credit Card: ${
                    t.creditCardNo
                }, Date: ${t.date.toISOString()}, Description: ${t.description || "N/A"}, Reason: ${
                    t.reason || "N/A"
                }`
            )
            .join("\n");

        // Build a robust prompt
        const prompt = `
Respond to the following query based on the transaction dataset provided below:
"${message}"

Transaction Data (limited to 100 records):
${transactionDetails}

Provide insights based on this dataset. Reference specific transaction IDs where relevant. Include trends, aggregated statistics, or comparisons based on the query. Limit your response to 200 words.
    `.trim();

        // Step 5: Generate the response using the AI model
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ answer: text });
    } catch (error) {
        console.error("Error generating response:", error);
        return NextResponse.json(
            { error: "An error occurred while processing your request. Please try again later." },
            { status: 500 }
        );
    }
}
