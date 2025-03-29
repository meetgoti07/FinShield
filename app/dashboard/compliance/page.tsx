import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComplianceChecklist } from "@/components/compliance/compliance-checklist"
import { ComplianceReports } from "@/components/compliance/compliance-reports"
import { ComplianceTraining } from "@/components/compliance/compliance-training"

export default function CompliancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Compliance</h1>
        <p className="text-muted-foreground">Manage your compliance with financial regulations and standards.</p>
      </div>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                  <span className="text-green-500">↑ 2%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">AML Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100%</div>
                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                  <span>No issues detected</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">KYC Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                  <span className="text-yellow-500">↓ 1%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">GDPR Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">97%</div>
                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                  <span className="text-green-500">↑ 3%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Compliance Checklist</CardTitle>
              <CardDescription>Track your compliance with key regulatory requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <ComplianceChecklist />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>View and download compliance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <ComplianceReports />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Training</CardTitle>
              <CardDescription>Training resources for your team</CardDescription>
            </CardHeader>
            <CardContent>
              <ComplianceTraining />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

