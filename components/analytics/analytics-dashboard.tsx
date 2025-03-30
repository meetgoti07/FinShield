"use client"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const timeSeriesData = [
  { date: "Jan", fraudRate: 0.32, avgAmount: 1200, totalTransactions: 4500 },
  { date: "Feb", fraudRate: 0.28, avgAmount: 1150, totalTransactions: 5200 },
  { date: "Mar", fraudRate: 0.35, avgAmount: 1300, totalTransactions: 4800 },
  { date: "Apr", fraudRate: 0.42, avgAmount: 1450, totalTransactions: 5100 },
  { date: "May", fraudRate: 0.38, avgAmount: 1400, totalTransactions: 5600 },
  { date: "Jun", fraudRate: 0.31, avgAmount: 1250, totalTransactions: 6200 },
  { date: "Jul", fraudRate: 0.29, avgAmount: 1200, totalTransactions: 6800 },
  { date: "Aug", fraudRate: 0.33, avgAmount: 1350, totalTransactions: 6500 },
  { date: "Sep", fraudRate: 0.37, avgAmount: 1400, totalTransactions: 6100 },
  { date: "Oct", fraudRate: 0.41, avgAmount: 1500, totalTransactions: 5800 },
  { date: "Nov", fraudRate: 0.36, avgAmount: 1350, totalTransactions: 6300 },
  { date: "Dec", fraudRate: 0.3, avgAmount: 1250, totalTransactions: 7200 },
]

const fraudTypeData = [
  { name: "Identity Theft", value: 35 },
  { name: "Account Takeover", value: 25 },
  { name: "Payment Fraud", value: 20 },
  { name: "Chargeback", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Fraud Rate</CardTitle>
                <CardDescription>Monthly fraud detection rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.37%</div>
                <div className="h-[200px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="fraudRate" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Transaction Volume</CardTitle>
                <CardDescription>Monthly transaction count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6,300</div>
                <div className="h-[200px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="totalTransactions"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Fraud Types</CardTitle>
                <CardDescription>Distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={fraudTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {fraudTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Average Transaction Amount</CardTitle>
              <CardDescription>Monthly average transaction value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avgAmount" fill="#3b82f6" name="Average Amount ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fraud Trends</CardTitle>
              <CardDescription>Historical fraud detection trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="fraudRate" stroke="#8884d8" name="Fraud Rate (%)" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="totalTransactions"
                      stroke="#82ca9d"
                      name="Total Transactions"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="patterns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fraud Patterns</CardTitle>
              <CardDescription>Detected fraud patterns and anomalies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The system has identified the following patterns in recent fraud attempts:
              </p>
              <ul className="space-y-4">
                <li className="p-4 border rounded-md">
                  <h3 className="font-medium">Time-based Pattern</h3>
                  <p className="text-sm text-muted-foreground">
                    Increased fraud attempts detected between 2AM and 4AM local time, suggesting automated attacks
                    during low-monitoring hours.
                  </p>
                </li>
                <li className="p-4 border rounded-md">
                  <h3 className="font-medium">Location Anomalies</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiple transactions from different geographic locations for the same account within short time
                    periods.
                  </p>
                </li>
                <li className="p-4 border rounded-md">
                  <h3 className="font-medium">Amount Clustering</h3>
                  <p className="text-sm text-muted-foreground">
                    Fraudulent transactions tend to cluster around specific amount ranges, particularly $500-$1000.
                  </p>
                </li>
                <li className="p-4 border rounded-md">
                  <h3 className="font-medium">Device Switching</h3>
                  <p className="text-sm text-muted-foreground">
                    Rapid switching between different devices and browsers for the same account.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Generated analytics reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">Monthly Fraud Summary</h3>
                    <p className="text-sm text-muted-foreground">December 2023</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">Quarterly Risk Assessment</h3>
                    <p className="text-sm text-muted-foreground">Q4 2023</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">Fraud Pattern Analysis</h3>
                    <p className="text-sm text-muted-foreground">November 2023</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">Geographic Risk Report</h3>
                    <p className="text-sm text-muted-foreground">December 2023</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}