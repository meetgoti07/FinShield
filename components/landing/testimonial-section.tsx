import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CFO, Global Payments Inc.",
      content:
        "FraudShield AI has transformed our fraud detection capabilities. We've seen a 78% reduction in false positives while catching more actual fraud attempts.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Michael Chen",
      role: "Head of Security, FinTech Solutions",
      content:
        "The AI-powered alerts are incredibly accurate. Our team now spends less time investigating false alarms and more time addressing real threats.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Elena Rodriguez",
      role: "Compliance Director, National Bank",
      content:
        "The compliance features have simplified our regulatory reporting process. What used to take days now happens automatically in real-time.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Industry Leaders</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our customers are saying about how FraudShield AI has transformed their fraud detection
              capabilities.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-muted bg-background">
              <CardHeader className="pb-2 flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

