"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye } from "lucide-react"

const reports = [
  {
    id: "R-1234",
    name: "AML Compliance Report - Q1 2023",
    type: "AML",
    date: "2023-03-31",
    status: "Completed",
  },
  {
    id: "R-1235",
    name: "KYC Verification Audit - Q1 2023",
    type: "KYC",
    date: "2023-03-25",
    status: "Completed",
  },
  {
    id: "R-1236",
    name: "Transaction Monitoring Report - March 2023",
    type: "Monitoring",
    date: "2023-04-02",
    status: "Completed",
  },
  {
    id: "R-1237",
    name: "Risk Assessment Report - Q1 2023",
    type: "Risk",
    date: "2023-03-30",
    status: "Completed",
  },
  {
    id: "R-1238",
    name: "GDPR Compliance Audit - Q1 2023",
    type: "GDPR",
    date: "2023-03-28",
    status: "Completed",
  },
  {
    id: "R-1239",
    name: "Suspicious Activity Report - March 2023",
    type: "SAR",
    date: "2023-04-05",
    status: "In Progress",
  },
]

export function ComplianceReports() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Report ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell className="font-medium">{report.id}</TableCell>
            <TableCell>{report.name}</TableCell>
            <TableCell>{report.type}</TableCell>
            <TableCell>{report.date}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  report.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {report.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
                <Button variant="ghost" size="icon" disabled={report.status !== "Completed"}>
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

