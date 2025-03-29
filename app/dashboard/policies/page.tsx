import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PolicyList } from "@/components/policies/policy-list"
import { PolicyCategories } from "@/components/policies/policy-categories"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function PoliciesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Policy Inventory</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Policy
          </Button>
        </div>
        <p className="text-muted-foreground">Manage and access your organization's policies and procedures.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Browse policies by category</CardDescription>
          </CardHeader>
          <CardContent>
            <PolicyCategories />
          </CardContent>
        </Card>
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>All Policies</CardTitle>
            <CardDescription>View and manage all policies</CardDescription>
          </CardHeader>
          <CardContent>
            <PolicyList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

