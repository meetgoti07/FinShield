import type { Metadata } from "next"
import { AlertsHeader } from "@/components/alerts/alerts-header"
import { AlertsTable } from "@/components/alerts/alerts-table"
import { AlertsFilters } from "@/components/alerts/alerts-filter"
export const metadata: Metadata = {
  title: "Fraud Alerts | FinShield",
  description: "View and manage fraud alerts",
}

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <AlertsHeader />
      <AlertsFilters />
      <AlertsTable />
    </div>
  )
}