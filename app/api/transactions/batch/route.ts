import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const transactions = await request.json();
        // Process each transaction
        const createdTransactions = await Promise.all(
            transactions.map(async (transaction: any) => {
                // Generate alert ID only for high-risk transactions
                const alertId = transaction.severity === 'high' || transaction.severity === 'critical'
                    ? uuidv4()
                    : null;

                // Map CSV data to Prisma schema
                return await prisma.transaction.create({
                    data: {
                        transactionId: String(transaction.transactionId),
                        riskScore: parseFloat(transaction.riskScore),
                        complianceScore: parseFloat(transaction.complianceScore),
                        reason: transaction.reason ? String(transaction.reason) : null,
                        customerName: String(transaction.customerName),
                        creditCardNo: String(transaction.creditCardNo),
                        merchant: String(transaction.merchant),
                        category: String(transaction.category),
                        street: String(transaction.street),
                        city: String(transaction.city),
                        zip: String(transaction.zip),
                        job: transaction.job ? String(transaction.job) : null,
                        dob: new Date(transaction.dob),
                        isFraud: Boolean(transaction.isFraud) || false,
                        status: (transaction.status),
                        isApproved: Boolean(transaction.isApproved) || false,
                        amount: typeof transaction.amount === 'string' ? parseFloat(transaction.amount) : transaction.amount,
                        alertId: alertId,
                        type: "payment",
                        description: transaction.description ? String(transaction.description) : null,
                        severity: (transaction.severity),
                    },
                });

            })
        );

        return NextResponse.json({ success: true, count: createdTransactions.length }, { status: 201 });
    } catch (error) {
        console.error('Error processing transactions:', error);
        return NextResponse.json({ success: false, error: 'Failed to process transactions' }, { status: 500 });
    }
}