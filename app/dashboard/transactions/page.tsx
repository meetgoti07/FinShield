"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileUp, AlertTriangle, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";

interface Transaction {
  transactionID: string;
  transactionAmount: number;
}

export default function Transactions() {
  const [tableData, setTableData] = useState<Transaction[]>([]);
  const [suspiciousTransactions, setSuspiciousTransactions] = useState<Transaction[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const fileContent = event.target?.result;
      if (typeof fileContent !== "string") return;

      const workbook = XLSX.read(fileContent, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData: Transaction[] = XLSX.utils.sheet_to_json(sheet);

      setTableData(parsedData);
      detectSuspiciousTransactions(parsedData);
      setIsUploading(false);
    };

    reader.onerror = () => {
      console.error("Error reading file");
      setIsUploading(false);
    };
  };

  const detectSuspiciousTransactions = (data: Transaction[]) => {
    const userTransactions: Record<string, number[]> = {};

    // Group transactions by transactionID
    data.forEach((txn) => {
      const id = txn.transactionID;
      if (!userTransactions[id]) {
        userTransactions[id] = [];
      }
      userTransactions[id].push(txn.transactionAmount);
    });

    const suspicious: Transaction[] = [];

    // Detect suspicious transactions
    for (const id in userTransactions) {
      const amounts = userTransactions[id];
      const avgAmount = amounts.reduce((sum, amt) => sum + amt, 0) / amounts.length;

      amounts.forEach((amt) => {
        if (amt >= avgAmount * 5) {
          suspicious.push({ transactionID: id, transactionAmount: amt });
        }
      });
    }

    setSuspiciousTransactions(suspicious);
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <Card className="w-full max-w-6xl p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">Transaction Analyzer</h1>
          <p className="text-gray-600">Upload your transaction data to detect suspicious activity</p>
        </div>

        {/* File Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileChange}
                className="cursor-pointer"
                id="file-upload"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FileUp className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <Button 
              onClick={handleUpload} 
              disabled={isUploading || !file}
              className="gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FileUp className="h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </div>
          {!file && (
            <p className="text-sm text-gray-500">
              Supported formats: .xlsx, .xls, .csv
            </p>
          )}
          {file && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FileUp className="h-4 w-4 text-blue-500" />
              <span>{file.name}</span>
              <span className="text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
          )}
        </div>

        {/* Suspicious Transactions Alert */}
        {suspiciousTransactions.length > 0 && (
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-800">Suspicious Activity Detected</AlertTitle>
            <AlertDescription className="text-red-700">
              <div className="space-y-2">
                {suspiciousTransactions.map((txn, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="font-medium">ID:</span>
                    <span className="font-mono">{txn.transactionID}</span>
                    <span className="font-medium">Amount:</span>
                    <span className="font-mono">₹{txn.transactionAmount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Uploaded Content Section */}
        {tableData.length > 0 ? (
          <div className="space-y-4 w-[1000px] overflow-y-scroll">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Transaction Data
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({tableData.length} records)
                </span>
              </h2>
              {suspiciousTransactions.length > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  {suspiciousTransactions.length} suspicious transactions
                </span>
              )}
            </div>

            <div className="h-[400px] rounded-md border">
              <Table>
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    {Object.keys(tableData[0]).map((key) => (
                      <TableHead key={key} className="font-medium text-gray-700">
                        {key.split(/(?=[A-Z])/).join(" ")}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row, index) => {
                    const isSuspicious = suspiciousTransactions.some(
                      (txn) => txn.transactionID === row.transactionID
                    );
                    return (
                      <TableRow
                        key={index}
                        className={isSuspicious ? "bg-red-50 hover:bg-red-100" : ""}
                      >
                        {Object.values(row).map((value, i) => (
                          <TableCell
                            key={i}
                            className={isSuspicious ? "font-medium text-red-800" : ""}
                          >
                            {typeof value === "number" ? value.toLocaleString() : value}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <FileUp className="h-12 w-12 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-700">No transaction data</h3>
            <p className="text-gray-500 max-w-md">
              Upload a spreadsheet file to analyze transaction patterns and detect suspicious activity
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}