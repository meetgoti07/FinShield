import type { Metadata } from "next"
import { UsersHeader } from "@/components/users/users-header"
import { UsersFilters } from "@/components/users/users-filters"
import { UsersTable } from "@/components/users/users-table"
export const metadata: Metadata = {
  title: "Users | FinShield",
  description: "Manage system users and permissions",
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <UsersHeader />
      <UsersFilters />
      <UsersTable />
    </div>
  )
}