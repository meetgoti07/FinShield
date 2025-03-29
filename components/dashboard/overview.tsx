"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    transactions: 120,
    fraudAlerts: 5,
  },
  {
    name: "Feb",
    transactions: 140,
    fraudAlerts: 8,
  },
  {
    name: "Mar",
    transactions: 170,
    fraudAlerts: 10,
  },
  {
    name: "Apr",
    transactions: 190,
    fraudAlerts: 7,
  },
  {
    name: "May",
    transactions: 210,
    fraudAlerts: 12,
  },
  {
    name: "Jun",
    transactions: 220,
    fraudAlerts: 9,
  },
  {
    name: "Jul",
    transactions: 240,
    fraudAlerts: 11,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="transactions" name="Transactions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="fraudAlerts" name="Fraud Alerts" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

