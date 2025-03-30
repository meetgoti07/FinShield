"use client"

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface FraudAlert {
  id: string
  transactionId: string
  amount: string
  customer: string
  date: Date
  status: 'pending' | 'resolved'
  riskScore: number
  reason: string
  severity: string
}

export function FraudAlerts() {

  const [alerts, setAlerts] = useState<FraudAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/recent-fraud')
      .then(res => res.json())
      .then(data => {
        setAlerts(data)
        setLoading(false)
      })
  }, [])
  
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-4">
              <div className={`rounded-full p-2 ${alert.status === "pending" ? "bg-yellow-100" : "bg-green-100"}`}>
                {alert.status === "pending" ? (
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-muted-foreground truncate max-w-[200px]">{alert.transactionId}</div>
                  <Badge variant={alert.status === "pending" ? "outline" : "secondary"}>{alert.status}</Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{alert.amount}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDistanceToNow(alert.date, { addSuffix: true })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={alert.customer} />
                    <AvatarFallback>{alert.customer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{alert.customer}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Reason:</span> {alert.reason}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Risk Score:</span>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      alert.riskScore < 0.3 ? "bg-green-500" : alert.riskScore < 0.7 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                  />
                  <span>{alert.riskScore.toFixed(2)}</span>
                </div>
              </div>
            </div>
            {alert.status === "pending" && (
              <div className="flex border-t bg-muted/50">
                <Button variant="ghost" className="flex-1 rounded-none py-2 text-sm">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <div className="border-r" />
                <Button variant="ghost" className="flex-1 rounded-none py-2 text-sm">
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

