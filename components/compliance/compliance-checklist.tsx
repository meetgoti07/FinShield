"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const complianceItems = [
  {
    id: "aml-policy",
    category: "AML",
    title: "Anti-Money Laundering Policy",
    description: "Ensure your AML policy is up to date and compliant with current regulations",
    completed: true,
    lastUpdated: "2023-01-15",
  },
  {
    id: "kyc-verification",
    category: "KYC",
    title: "Customer Verification Process",
    description: "Verify that your KYC process includes proper identity verification",
    completed: true,
    lastUpdated: "2023-02-10",
  },
  {
    id: "transaction-monitoring",
    category: "Monitoring",
    title: "Transaction Monitoring System",
    description: "Implement automated transaction monitoring for suspicious activities",
    completed: true,
    lastUpdated: "2023-01-20",
  },
  {
    id: "risk-assessment",
    category: "Risk",
    title: "Risk Assessment Framework",
    description: "Conduct regular risk assessments of your customers and transactions",
    completed: false,
    lastUpdated: null,
  },
  {
    id: "staff-training",
    category: "Training",
    title: "Staff Training Program",
    description: "Ensure all staff are trained on compliance procedures and regulations",
    completed: true,
    lastUpdated: "2023-03-05",
  },
  {
    id: "reporting-procedures",
    category: "Reporting",
    title: "Suspicious Activity Reporting",
    description: "Establish clear procedures for reporting suspicious activities",
    completed: true,
    lastUpdated: "2023-02-28",
  },
  {
    id: "record-keeping",
    category: "Records",
    title: "Record Keeping System",
    description: "Maintain comprehensive records of all transactions and customer information",
    completed: true,
    lastUpdated: "2023-01-10",
  },
  {
    id: "gdpr-compliance",
    category: "GDPR",
    title: "Data Protection Measures",
    description: "Implement measures to protect customer data in compliance with GDPR",
    completed: false,
    lastUpdated: null,
  },
]

export function ComplianceChecklist() {
  const [items, setItems] = useState(complianceItems)

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
              lastUpdated: !item.completed ? new Date().toISOString().split("T")[0] : item.lastUpdated,
            }
          : item,
      ),
    )
  }

  const completedCount = items.filter((item) => item.completed).length
  const progress = (completedCount / items.length) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-sm font-medium">Compliance Progress</div>
          <div className="text-2xl font-bold">{Math.round(progress)}%</div>
        </div>
        <Progress value={progress} className="w-1/2" />
      </div>
      <Separator />
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start space-x-4 rounded-md border p-4">
            <Checkbox id={item.id} checked={item.completed} onCheckedChange={() => toggleItem(item.id)} />
            <div className="flex-1 space-y-1">
              <div className="flex items-center">
                <label
                  htmlFor={item.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.title}
                </label>
                <Badge variant="outline" className="ml-2">
                  {item.category}
                </Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                        <Info className="h-3 w-3" />
                        <span className="sr-only">Info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              {item.completed && item.lastUpdated && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                  Last updated: {item.lastUpdated}
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" className="ml-auto" disabled={!item.completed}>
              View
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

function Badge({ variant, className, children }: { variant: string; className: string; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
        variant === "outline" ? "border-primary text-primary" : ""
      } ${className}`}
    >
      {children}
    </span>
  )
}

