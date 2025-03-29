import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - FraudShield AI",
  description: "Merchant dashboard for FraudShield AI",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}

