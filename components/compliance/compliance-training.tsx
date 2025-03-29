"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle, Clock, Play } from "lucide-react"

const trainingModules = [
  {
    id: "T-1234",
    title: "AML Fundamentals",
    description: "Learn the basics of Anti-Money Laundering regulations and compliance",
    duration: "45 minutes",
    progress: 100,
    completed: true,
  },
  {
    id: "T-1235",
    title: "KYC Verification Best Practices",
    description: "Understand the best practices for Know Your Customer verification",
    duration: "30 minutes",
    progress: 75,
    completed: false,
  },
  {
    id: "T-1236",
    title: "Transaction Monitoring Techniques",
    description: "Learn how to effectively monitor transactions for suspicious activities",
    duration: "60 minutes",
    progress: 50,
    completed: false,
  },
  {
    id: "T-1237",
    title: "GDPR Compliance for Financial Institutions",
    description: "Understand how GDPR affects financial institutions and how to comply",
    duration: "40 minutes",
    progress: 0,
    completed: false,
  },
  {
    id: "T-1238",
    title: "Suspicious Activity Reporting",
    description: "Learn how to identify and report suspicious activities",
    duration: "35 minutes",
    progress: 100,
    completed: true,
  },
  {
    id: "T-1239",
    title: "Risk Assessment Framework",
    description: "Understand how to assess and manage risks in financial transactions",
    duration: "50 minutes",
    progress: 0,
    completed: false,
  },
]

export function ComplianceTraining() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trainingModules.map((module) => (
        <Card key={module.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{module.title}</CardTitle>
            <CardDescription>{module.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4" />
              <span>{module.duration}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{module.progress}%</span>
              </div>
              <Progress value={module.progress} />
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            {module.completed ? (
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="mr-2 h-4 w-4" />
                Completed
              </div>
            ) : module.progress > 0 ? (
              <Button variant="outline" className="w-full" size="sm">
                <Play className="mr-2 h-4 w-4" />
                Continue
              </Button>
            ) : (
              <Button variant="outline" className="w-full" size="sm">
                <BookOpen className="mr-2 h-4 w-4" />
                Start
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

