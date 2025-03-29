import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, BarChart3, Clock, FileText, Lock, MessageSquare, Shield, Zap } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Real-time Detection",
      description: "Monitor transactions as they happen with millisecond response times and immediate alerts.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Advanced Analytics",
      description: "Visualize transaction patterns and fraud indicators with comprehensive dashboards.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "AI-Powered Security",
      description: "Leverage deep learning models that continuously improve to detect new fraud patterns.",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Compliance Integration",
      description: "Stay compliant with AML, KYC, and other financial regulations automatically.",
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-primary" />,
      title: "Smart Alerts",
      description: "Receive contextual alerts with risk scores and recommended actions.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "AI Chatbot Assistant",
      description: "Get instant answers about transactions, policies, and compliance with our RAG-powered chatbot.",
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Policy Management",
      description: "Maintain a comprehensive inventory of policies with version control and easy access.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Historical Analysis",
      description: "Review past transactions and fraud cases to improve future detection capabilities.",
    },
  ]

  return (
    <section className="py-16 md:py-24" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comprehensive Fraud Protection</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform combines cutting-edge AI with intuitive interfaces to provide complete protection for your
              financial transactions.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-muted bg-background">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

