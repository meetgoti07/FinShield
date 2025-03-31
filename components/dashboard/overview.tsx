"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface OverviewData {
  name: string;
  transactions: number;
  fraudAlerts: number;
}

export function Overview() {
  const [data, setData] = useState<OverviewData[]>([]);

  useEffect(() => {
    async function fetchOverviewData() {
      try {
        const response = await fetch("/api/overview/insights");
        console.log(response)
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch transaction overview:", error);
      }
    }

    fetchOverviewData();
  }, []);

  return (
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
              type="monotone"
              dataKey="transactions"
              name="Transactions"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ r: 4 }}
          />
          <Line
              type="monotone"
              dataKey="fraudAlerts"
              name="Fraud Alerts"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
  );
}
