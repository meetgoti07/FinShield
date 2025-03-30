-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('pending', 'approved', 'rejected', 'flagged');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('payment', 'transfer', 'withdrawal', 'deposit', 'refund');

-- CreateEnum
CREATE TYPE "SeverityLevel" AS ENUM ('none', 'low', 'medium', 'high', 'critical');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" VARCHAR(255),
    "image" TEXT,
    "email_verified" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" UUID NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "risk_score" DOUBLE PRECISION NOT NULL,
    "compliance_score" DOUBLE PRECISION NOT NULL,
    "reason" TEXT,
    "customer_name" TEXT NOT NULL,
    "credit_card_no" TEXT NOT NULL,
    "merchant" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "job" TEXT,
    "dob" TIMESTAMP(3) NOT NULL,
    "is_fraud" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "TransactionStatus" NOT NULL DEFAULT 'pending',
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "amount" DECIMAL(10,2) NOT NULL,
    "alert_id" UUID,
    "type" "TransactionType" NOT NULL,
    "description" TEXT,
    "severity" "SeverityLevel" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics" (
    "id" UUID NOT NULL,
    "fraud_rate" DOUBLE PRECISION NOT NULL,
    "transaction_volume" INTEGER NOT NULL,
    "fraud_types" JSONB NOT NULL,
    "transaction_amount_avg" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_transaction_id_key" ON "transactions"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_alert_id_key" ON "transactions"("alert_id");

-- CreateIndex
CREATE INDEX "transactions_alert_id_idx" ON "transactions"("alert_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
