import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { randomUUID } from "node:crypto";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const csvTransactions = await request.json();
        console.log(csvTransactions[0]);

        // First, gather all credit card frequencies
        const ccFrequencyMap = new Map();
        for (const transaction of csvTransactions) {
            const ccNum = transaction.creditCardNo.toString();
            if (!ccFrequencyMap.has(ccNum)) {
                const count = await prisma.transaction.count({
                    where: { creditCardNo: ccNum },
                });
                ccFrequencyMap.set(ccNum, count);
            }
        }


        // Prepare batch ML request
        const mlBatchSchema = {
            transactions: csvTransactions.map((transaction: any) => {
                const transactionDate = new Date(transaction.trans_date_trans_time);
                const dobDate = new Date(transaction.dob);
                const ccNumFrequency = ccFrequencyMap.get(transaction.creditCardNo) + 1;

                return {
                    cc_num_frequency: ccNumFrequency.toString(),
                    amt: parseFloat(transaction.amount),
                    merchant: transaction.merchant,
                    category: transaction.category,
                    trans_date_trans_time: transactionDate.toISOString(),
                    dob: dobDate.toISOString().split('T')[0],
                    merch_lat: parseFloat(transaction.merch_lat),
                    merch_long: parseFloat(transaction.merch_long),
                    city: transaction.city,
                    job: transaction.job || "Unknown",
                    is_fraud: "false",
                };
            })
        };

        console.log("ML Batch Payload:", JSON.stringify(mlBatchSchema));

        // Send batch data to ML server for prediction
        const predictionResponse = await fetch(
            "https://ee71-34-75-255-77.ngrok-free.app/predict",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mlBatchSchema),
            }
        );

        if (!predictionResponse.ok) {
            const errorText = await predictionResponse.text();
            throw new Error(`Failed to get prediction from ML server. Response: ${errorText}`);
        }

        const predictionData = await predictionResponse.json();

        // Process results and prepare database entries
        const transactionsToCreate = csvTransactions.map((transaction: any, index: number) => {
            const fraudProbability = predictionData.results[index].fraud_probability || 0;
            const fraudPrediction = predictionData.results[index].fraud_prediction;
            const transactionDate = new Date(transaction.trans_date_trans_time);
            const dobDate = new Date(transaction.dob);

            return {
                transactionId: transaction.trans_num || uuidv4(),
                riskScore: fraudProbability * 100,
                complianceScore: 1 - fraudProbability,
                reason: fraudPrediction ? "Suspected fraudulent activity" : null,
                customerName: transaction.customerName,
                creditCardNo: transaction.creditCardNo.toString(),
                merchant: transaction.merchant,
                category: transaction.category,
                street: transaction.street,
                amount: parseFloat(transaction.amount),
                city: transaction.city,
                zip: transaction.zip.toString(),
                job: transaction.job || "Unknown",
                dob: dobDate,
                isFraud: fraudPrediction,
                status: fraudPrediction ? "flagged" : "approved",
                isApproved: !fraudPrediction,
                alertId: fraudPrediction ? randomUUID() : null,
                type: "payment",
                description: fraudPrediction
                    ? `Suspected fraud: Transaction at ${transaction.merchant}`
                    : `Transaction at ${transaction.merchant}`,
                severity: fraudProbability > 0.7 ? "high" : fraudProbability > 0.4 ? "medium" : "low",
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });

        // Batch insert into database
        const processedTransactions = await prisma.transaction.createMany({
            data: transactionsToCreate,
            skipDuplicates: true, // Skip if transactionId already exists
        });

        return NextResponse.json(
            { success: true, count: processedTransactions.count },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error processing transactions:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to process transactions" },
            { status: 500 }
        );
    }
}
