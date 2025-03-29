"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Bell, CreditCard, FileText, Home, MessageSquare, Settings, Shield, Users } from "lucide-react"

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: CreditCard,
  },
  {
    title: "Fraud Alerts",
    href: "/dashboard/alerts",
    icon: Bell,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Compliance",
    href: "/dashboard/compliance",
    icon: Shield,
  },
  {
    title: "Policies",
    href: "/dashboard/policies",
    icon: FileText,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "AI Assistant",
    href: "/dashboard/assistant",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden border-r bg-muted/40 md:block md:w-64 lg:w-72">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Dashboard</h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary",
                  pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

