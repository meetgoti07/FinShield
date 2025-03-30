import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const transaction = await request.json();

// Generate alert ID only for high-risk transactions
        const alertId = transaction.severity === 'high' || transaction.severity === 'critical'
            ? uuidv4()
            : null;

// Create transaction in database
        const createdTransaction = await prisma.transaction.create({
            data: {
                transactionId: transaction.transactionId,
                riskScore: transaction.riskScore || 0,
                complianceScore: transaction.complianceScore || 1,
                reason: transaction.reason,
                customerName: transaction.customerName,
                creditCardNo: transaction.creditCardNo,
                merchant: transaction.merchant,
                category: transaction.category,
                street: transaction.street,
                city: transaction.city,
                zip: transaction.zip,
                job: transaction.job,
                dob: transaction.dob ? new Date(transaction.dob) : new Date(),
                isFraud: transaction.isFraud || false,
                status: transaction.status || 'pending',
                isApproved: transaction.isApproved || false,
                amount: transaction.amount,
                alertId: alertId,
                type: "payment",
                description: transaction.description,
                severity: transaction.severity,
            },
        });

        return NextResponse.json(createdTransaction, { status: 201 });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
    }
}