"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, User } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your FraudShield AI Assistant. How can I help you today?",
    timestamp: new Date(),
  },
]

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (input.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-[calc(80vh-10rem)] flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex max-w-[80%] items-start gap-3 rounded-lg p-3 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-1">
                  <div className="text-sm">{message.content}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{formatTime(message.timestamp)}</div>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] items-start gap-3 rounded-lg bg-muted p-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <Card className="border-t rounded-none border-x-0 border-b-0">
        <div className="flex items-center gap-2 p-2">
          <Input
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={isLoading || input.trim() === ""}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function getAIResponse(input: string): string {
  // Simple response logic - in a real app, this would call an AI API
  const inputLower = input.toLowerCase()

  if (inputLower.includes("fraud") || inputLower.includes("alert")) {
    return "Our fraud detection system uses advanced AI algorithms to analyze transaction patterns and identify potential fraud. You can view all fraud alerts in the Alerts dashboard. Would you like me to explain how our risk scoring works?"
  } else if (inputLower.includes("compliance") || inputLower.includes("regulation")) {
    return "FraudShield AI helps you maintain compliance with AML, KYC, and GDPR regulations. Our compliance dashboard provides real-time monitoring of your compliance status. You can also access all compliance-related policies in the Policy Inventory section."
  } else if (inputLower.includes("transaction") || inputLower.includes("payment")) {
    return "You can view all transactions in the Transactions dashboard. Each transaction is analyzed in real-time and assigned a risk score. Transactions with high risk scores are automatically flagged for review."
  } else if (inputLower.includes("policy") || inputLower.includes("document")) {
    return "All policies are stored in the Policy Inventory section. You can filter policies by category, search for specific policies, and download policy documents. Would you like me to help you find a specific policy?"
  } else if (inputLower.includes("report") || inputLower.includes("analytics")) {
    return "You can generate custom reports in the Analytics dashboard. Reports can be filtered by date range, transaction type, risk level, and more. All reports can be exported in CSV or PDF format."
  } else if (inputLower.includes("help") || inputLower.includes("how to")) {
    return "I'm here to help! You can ask me questions about fraud detection, compliance, transactions, policies, or any other aspect of the FraudShield AI platform. What specific feature would you like help with?"
  } else {
    return "I'm your FraudShield AI Assistant, designed to help with questions about fraud detection, compliance, transactions, and policies. How can I assist you today?"
  }
}

