"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { FileText, Shield, Users, CreditCard, AlertTriangle, Lock, BookOpen, Scale } from "lucide-react"
import { useState } from "react"

const categories = [
  {
    id: "all",
    name: "All Policies",
    icon: FileText,
    count: 24,
  },
  {
    id: "aml",
    name: "Anti-Money Laundering",
    icon: Shield,
    count: 5,
  },
  {
    id: "kyc",
    name: "Know Your Customer",
    icon: Users,
    count: 4,
  },
  {
    id: "transaction",
    name: "Transaction Monitoring",
    icon: CreditCard,
    count: 3,
  },
  {
    id: "risk",
    name: "Risk Management",
    icon: AlertTriangle,
    count: 4,
  },
  {
    id: "data",
    name: "Data Protection",
    icon: Lock,
    count: 3,
  },
  {
    id: "training",
    name: "Training & Education",
    icon: BookOpen,
    count: 2,
  },
  {
    id: "regulatory",
    name: "Regulatory Compliance",
    icon: Scale,
    count: 3,
  },
]

export function PolicyCategories() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <ScrollArea className="h-[calc(100vh-15rem)]">
      <div className="space-y-1">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className={cn("w-full justify-start", selectedCategory === category.id && "bg-muted")}
            onClick={() => setSelectedCategory(category.id)}
          >
            <category.icon className="mr-2 h-4 w-4" />
            {category.name}
            <span className="ml-auto text-xs text-muted-foreground">{category.count}</span>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}

