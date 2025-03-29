import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Revolutionizing Fraud Detection with AI
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Protect your financial transactions with our advanced AI-powered fraud detection system. Real-time
                monitoring, intelligent alerts, and comprehensive compliance tools.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-1.5">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-lg bg-muted p-2 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted-foreground/20 rounded-lg"></div>
              <div className="relative h-full w-full bg-white rounded-md p-4 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="col-span-2 bg-muted/30 rounded-md p-4 flex items-center gap-3">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Fraud Risk Score</div>
                      <div className="text-2xl font-bold text-primary">98% Safe</div>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-md p-3">
                    <div className="text-xs text-muted-foreground">Transactions</div>
                    <div className="text-lg font-bold">1,245</div>
                  </div>
                  <div className="bg-muted/30 rounded-md p-3">
                    <div className="text-xs text-muted-foreground">Alerts</div>
                    <div className="text-lg font-bold">3</div>
                  </div>
                  <div className="bg-muted/30 rounded-md p-3">
                    <div className="text-xs text-muted-foreground">Compliance</div>
                    <div className="text-lg font-bold">100%</div>
                  </div>
                  <div className="bg-muted/30 rounded-md p-3">
                    <div className="text-xs text-muted-foreground">Response Time</div>
                    <div className="text-lg font-bold">0.3s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

