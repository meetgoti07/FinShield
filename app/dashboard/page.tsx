"use client"
import type React from "react"
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { FraudAlerts } from "@/components/dashboard/fraud-alerts"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Download, LoaderCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardPage {
  totalTransactions: number
  fraudAlerts: number
  avgRisk: number
  complianceScore: number
  transactionPercentage: number
  chartData: Array<{ date: string; count: number }>
}


export default function DashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<DashboardPage | null>(null)


  useEffect(() => {
    fetch('/api/overview')
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }, [])


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your fraud detection metrics.</p>
      </div>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.totalTransactions || "Loading"}  </div>
              {/* <div className="text-2xl font-bold">1,248</div> */}
              <p className="text-xs text-muted-foreground">
                {data?.transactionPercentage !== undefined && data?.transactionPercentage < 0 ? "-" : "+"}
                {((data?.transactionPercentage ?? 12.5) * 1).toFixed(3)}% from last month
              </p>

              {/* <p className="text-xs text-muted-foreground">{data?.transactionPercentage >= 0 ? "+" : "-"}{data?.transactionPercentage || "12.5"}% from last month</p> */}
              {/* <p className="text-xs text-muted-foreground">+12.5% from last month</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fraud Alerts</CardTitle>
              <AlertIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.fraudAlerts || 'Loading'}</div>
              <p className="text-xs text-muted-foreground">-4% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Risk Score</CardTitle>
              <ShieldIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.avgRisk.toPrecision(4) || 'Loading'}</div>
              <p className="text-xs text-muted-foreground">Lower is better</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <CheckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.complianceScore.toPrecision(4) || 'Loading'}</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Transaction Overview</CardTitle>
              <CardDescription>Transaction volume and fraud detection over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3 overflow-y-scroll h-[550px]">
            <CardHeader>
              <CardTitle>Recent Fraud Alerts</CardTitle>
              <CardDescription>Recent transactions flagged as potentially fraudulent</CardDescription>
            </CardHeader>
            <CardContent>
              <FraudAlerts />
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Recent transactions processed by your organization</CardDescription>
            </div>
            <Link href="/dashboard/transactions">
              <Button variant="outline" size="sm" className="gap-1">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ... (keep all your icon components exactly as they are)

function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  )
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

