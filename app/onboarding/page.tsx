import type { Metadata } from "next"
import { OrganizationForm } from "@/components/auth/organization-form"
import { Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Organization Details - FraudShield AI",
  description: "Complete your organization details",
}

export default function OnboardingPage() {
  return (
    <div className="container max-w-3xl py-10">
      <div className="flex items-center justify-center mb-8">
        <Shield className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-3xl font-bold">FraudShield AI</h1>
      </div>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Complete Your Organization Details</h1>
          <p className="text-muted-foreground">
            We need some information about your organization to set up your account.
          </p>
        </div>
        <OrganizationForm />
      </div>
    </div>
  )
}

