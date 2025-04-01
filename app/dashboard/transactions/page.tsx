"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileUp, AlertTriangle, Loader2, Plus, Upload, Check } from "lucide-react";
import * as XLSX from "xlsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format, parse } from "date-fns";
import {now} from "next-auth/client/_utils";

// Match your Prisma schema
interface Transaction {
  transactionId: string;
  riskScore: number;
  complianceScore: number;
  reason?: string;
  customerName: string;
  creditCardNo: string;
  merchant: string;
  category: string;
  street: string;
  city: string;
  zip: string;
  job?: string;
  dob: Date | string;
  trans_date_trans_time: Date | string;
  isFraud: boolean;
  status: "pending" | "approved" | "rejected";
  isApproved: boolean;
  amount: number;
  type: "purchase" | "refund" | "transfer" | "withdrawal";
  description?: string;
  severity: "low" | "medium" | "high" | "critical";
}

// CSV format from your dataset
interface CSVTransaction {
  trans_date_trans_time: Date | string;
  cc_num: string;
  merchant: string;
  category: string;
  amt: string;
  first: string;
  last: string;
  gender: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  lat: string;
  long: string;
  city_pop: string;
  job: string;
  dob: string;
  trans_num: string;
  unix_time: string;
  merch_lat: string;
  merch_long: string;
}

export default function Transactions() {
  const [tableData, setTableData] = useState<Transaction[]>([]);
  const [suspiciousTransactions, setSuspiciousTransactions] = useState<Transaction[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processSuccess, setProcessSuccess] = useState(false);
  const [singleTransaction, setSingleTransaction] = useState<Partial<Transaction>>({
    status: "pending",
    isApproved: false,
    isFraud: false,
    severity: "low",
    type: "purchase",
    riskScore: 0,
    complianceScore: 0
  });

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProcessSuccess(false);
    }
  };

// Function to convert Excel date serial number to JavaScript Date
  function excelDateToJSDate(excelDate) {
    // Excel dates start from December 30, 1899
    const utc_days = Math.floor(excelDate - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);

    // Handle time portion
    const fractional_day = excelDate - Math.floor(excelDate) + 0.0000001;
    let total_seconds = Math.floor(86400 * fractional_day);
    const seconds = total_seconds % 60;
    total_seconds -= seconds;
    const hours = Math.floor(total_seconds / (60 * 60));
    const minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

// In your mapCsvToTransaction function:
  const mapCsvToTransaction = (csvData: CSVTransaction[]): Transaction[] => {
    return csvData.map(row => {
      // Parse dates from Excel serial numbers
      const transactionDate = excelDateToJSDate(parseFloat(row.trans_date_trans_time));
      const dobDate = excelDateToJSDate(parseFloat(row.dob));

      // Calculate simple risk score based on amount
      const amount = parseFloat(row.amt);
      const riskScore = amount > 1000 ? 0.7 : amount > 500 ? 0.4 : 0.1;

      return {
        transactionId: row.trans_num,
        riskScore: riskScore,
        complianceScore: 1 - riskScore,
        customerName: `${row.first} ${row.last}`,
        creditCardNo: row.cc_num,
        merchant: row.merchant,
        category: row.category,
        street: row.street,
        city: row.city,
        zip: row.zip,
        merch_lat: row.merch_lat,
        merch_long: row.merch_long,
        job: row.job || undefined,
        // Format dates properly
        trans_date_trans_time: format(transactionDate, "yyyy-MM-dd'T'HH:mm:ss"),
        dob: format(dobDate, "yyyy-MM-dd"),
        isFraud: false, // Default value
        status: "pending",
        isApproved: false,
        amount: parseFloat(row.amt),
        type: "purchase", // Default value
        severity: amount > 1000 ? "high" : amount > 500 ? "medium" : "low",
        description: `Transaction from ${row.merchant} on ${format(transactionDate, "yyyy-MM-dd")}`
      };
    });
  };


  // Handle file upload and parsing
  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);
    setProcessSuccess(false);

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const fileContent = event.target?.result;
      if (typeof fileContent !== "string") return;

      const workbook = XLSX.read(fileContent, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData: CSVTransaction[] = XLSX.utils.sheet_to_json(sheet);
      console.log(parsedData)
      // Map the CSV data to match our Transaction schema
      const mappedTransactions = mapCsvToTransaction(parsedData);
      console.log("mapped",mappedTransactions);
      setTableData(mappedTransactions);
      detectSuspiciousTransactions(mappedTransactions);
      setIsUploading(false);
    };

    reader.onerror = () => {
      console.error("Error reading file");
      setIsUploading(false);
    };
  };

  // Process detected transactions via API
  const processTransactions = async () => {
    if (tableData.length === 0) return;

    setIsProcessing(true);

    try {
      const response = await fetch('/api/transactions/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tableData),
      });

      if (!response.ok) {
        throw new Error('Failed to process transactions');
      }

      setProcessSuccess(true);
    } catch (error) {
      console.error('Error processing transactions:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Process a single transaction via API
  const processSingleTransaction = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch('/api/transactions/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([singleTransaction]), // Wrap in an array
      });

      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }

      const result = await response.json();

      // Reset form after successful submission
      setSingleTransaction({
        status: "pending",
        isApproved: false,
        isFraud: false,
        severity: "low",
        type: "purchase",
        riskScore: 0,
        complianceScore: 0
      });

      setProcessSuccess(true);
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      setIsProcessing(false);
    }
  };


  // Logic to detect suspicious transactions
  const detectSuspiciousTransactions = (data: Transaction[]) => {
    const suspiciousItems: Transaction[] = [];

    data.forEach((txn) => {
      // Add your suspicious transaction detection logic here
      if (txn.amount > 1000 || txn.riskScore > 0.6) {
        suspiciousItems.push(txn);
      }
    });

    setSuspiciousTransactions(suspiciousItems);
  };

  // Handle input change for single transaction form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name,value)
    setSingleTransaction(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change for single transaction form
  const handleSelectChange = (name: string, value: string) => {
    setSingleTransaction(prev => ({ ...prev, [name]: value }));
  };

  return (
      <div className="w-full flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <Card className="w-full max-w-6xl p-4 space-y-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Transaction Manager</CardTitle>
            <CardDescription className="text-gray-600">Add transactions individually or upload in bulk</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="upload">CSV Upload</TabsTrigger>
                <TabsTrigger value="single">Single Transaction</TabsTrigger>
              </TabsList>

              {/* Bulk Upload Tab */}
              <TabsContent value="upload" className="space-y-6">
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
                            Parse Data
                          </>
                      )}
                    </Button>
                  </div>

                  {!file && (
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>Supported formats: .xlsx, .xls, .csv</p>
                        <p>Expected columns: trans_date_trans_time, cc_num, merchant, category, amt, first, last, gender, street, city, state, zip, lat, long, city_pop, job, dob, trans_num, unix_time, merch_lat, merch_long</p>
                      </div>
                  )}

                  {file && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <FileUp className="h-4 w-4 text-blue-500" />
                        <span>{file.name}</span>
                        <span className="text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                  )}
                </div>

                {/* Process Transactions Button */}
                {tableData.length > 0 && (
                    <div className="flex justify-end space-x-4 mt-4">
                      <Button
                          variant="default"
                          onClick={processTransactions}
                          disabled={isProcessing}
                          className="gap-2"
                      >
                        {isProcessing ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Processing...
                            </>
                        ) : (
                            <>
                              <Upload className="h-4 w-4" />
                              Process Transactions
                            </>
                        )}
                      </Button>
                    </div>
                )}

                {processSuccess && (
                    <Alert className="bg-green-50 border-green-200">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>
                        Transactions have been processed and saved to database successfully.
                      </AlertDescription>
                    </Alert>
                )}

                {/* Suspicious Transactions Alert */}
                {suspiciousTransactions.length > 0 && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <AlertTitle className="text-red-800">Suspicious Activity Detected</AlertTitle>
                      <AlertDescription className="text-red-700">
                        <div className="space-y-2">
                          {suspiciousTransactions.slice(0, 3).map((txn, index) => (
                              <div key={index} className="flex gap-2 flex-wrap">
                                <span className="font-medium">ID:</span>
                                <span className="font-mono">{txn.transactionId}</span>
                                <span className="font-medium">Amount:</span>
                                <span className="font-mono">₹{txn.amount.toLocaleString()}</span>
                              </div>
                          ))}
                          {suspiciousTransactions.length > 3 && (
                              <div className="text-sm">
                                + {suspiciousTransactions.length - 3} more suspicious transactions
                              </div>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                )}

                {/* Uploaded Content Section */}
                {tableData.length > 0 ? (
                    <div className="space-y-4 w-full overflow-x-auto">
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

                      <div className="max-h-[400px] rounded-md border overflow-auto">
                        <Table>
                          <TableHeader className="bg-gray-100 sticky top-0">
                            <TableRow>
                              <TableHead className="font-medium text-gray-700">Transaction ID</TableHead>
                              <TableHead className="font-medium text-gray-700">Customer Name</TableHead>
                              <TableHead className="font-medium text-gray-700">Amount</TableHead>
                              <TableHead className="font-medium text-gray-700">Merchant</TableHead>
                              <TableHead className="font-medium text-gray-700">Category</TableHead>
                              <TableHead className="font-medium text-gray-700">Risk Score</TableHead>
                              <TableHead className="font-medium text-gray-700">Severity</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tableData.map((row, index) => {
                              const isSuspicious = suspiciousTransactions.some(
                                  (txn) => txn.transactionId === row.transactionId
                              );
                              return (
                                  <TableRow
                                      key={index}
                                      className={isSuspicious ? "bg-red-50 hover:bg-red-100" : ""}
                                  >
                                    <TableCell className={isSuspicious ? "font-medium text-red-800" : ""}>
                                      {row.transactionId}
                                    </TableCell>
                                    <TableCell className={isSuspicious ? "font-medium text-red-800" : ""}>
                                      {row.customerName}
                                    </TableCell>
                                    <TableCell className={isSuspicious ? "font-medium text-red-800" : ""}>
                                      ₹{row.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell className={isSuspicious ? "font-medium text-red-800" : ""}>
                                      {row.merchant}
                                    </TableCell>
                                    <TableCell className={isSuspicious ? "font-medium text-red-800" : ""}>
                                      {row.category}
                                    </TableCell>
                                    <TableCell className={isSuspicious ? "font-medium text-red-800" : ""}>
                                      {row.riskScore.toFixed(2)}
                                    </TableCell>
                                    <TableCell className={isSuspicious ? "font-medium text-red-800" : ""}>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    row.severity === "high" ? "bg-red-100 text-red-800" :
                                        row.severity === "medium" ? "bg-yellow-100 text-yellow-800" :
                                            "bg-green-100 text-green-800"
                                }`}>
                                  {row.severity}
                                </span>
                                    </TableCell>
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
                        Upload a CSV file to analyze transaction patterns and detect suspicious activity
                      </p>
                    </div>
                )}
              </TabsContent>

              {/* Single Transaction Tab */}
              <TabsContent value="single" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="transactionId">Transaction ID</Label>
                      <Input
                          id="transactionId"
                          name="transactionId"
                          value={singleTransaction.transactionId || ''}
                          onChange={handleInputChange}
                          placeholder="e.g., TXN-123456"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                          id="amount"
                          name="amount"
                          type="number"
                          value={singleTransaction.amount || ''}
                          onChange={handleInputChange}
                          placeholder="0.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="trans_date_trans_time">Transaction Date & Time</Label>
                      <Input
                          id="trans_date_trans_time"
                          name="trans_date_trans_time"
                          type="datetime-local"
                          value={singleTransaction.trans_date_trans_time || ''}
                          onChange={handleInputChange}
                          placeholder="Select date and time"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                          id="dob"
                          name="dob"
                          type="date"
                          value={singleTransaction.dob || ''}
                          onChange={handleInputChange}
                          placeholder="Select date of birth"
                      />
                    </div>
                  </div>

                    <div className="space-y-2">
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input
                          id="customerName"
                          name="customerName"
                          value={singleTransaction.customerName || ''}
                          onChange={handleInputChange}
                          placeholder="Full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="creditCardNo">Credit Card Number</Label>
                      <Input
                          id="creditCardNo"
                          name="creditCardNo"
                          value={singleTransaction.creditCardNo || ''}
                          onChange={handleInputChange}
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="merchant">Merchant</Label>
                      <Input
                          id="merchant"
                          name="merchant"
                          value={singleTransaction.merchant || ''}
                          onChange={handleInputChange}
                          placeholder="Merchant name"
                      />
                    </div>

                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                          id="category"
                          name="category"
                          value={singleTransaction.category || ''}
                          onChange={handleInputChange}
                          placeholder="e.g., Retail, Food, Travel"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="merch_lat">Merchant Latitude</Label>
                        <Input
                            id="merch_lat"
                            name="merch_lat"
                            type="number"
                            step="any"
                            value={singleTransaction.merch_lat || ''}
                            onChange={handleInputChange}
                            placeholder="Latitude (e.g., 37.7749)"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="merch_long">Merchant Longitude</Label>
                        <Input
                            id="merch_long"
                            name="merch_long"
                            type="number"
                            step="any"
                            value={singleTransaction.merch_long || ''}
                            onChange={handleInputChange}
                            placeholder="Longitude (e.g., -122.4194)"
                        />
                      </div>
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Street</Label>
                        <Input
                            id="street"
                            name="street"
                            value={singleTransaction.street || ''}
                            onChange={handleInputChange}
                            placeholder="Street address"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            name="city"
                            value={singleTransaction.city || ''}
                            onChange={handleInputChange}
                            placeholder="City"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                            id="zip"
                            name="zip"
                            value={singleTransaction.zip || ''}
                            onChange={handleInputChange}
                            placeholder="ZIP code"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="job">Job</Label>
                        <Input
                            id="job"
                            name="job"
                            value={singleTransaction.job || ''}
                            onChange={handleInputChange}
                            placeholder="Customer occupation"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Transaction Type</Label>
                        <Select
                            value={singleTransaction.type as string}
                            onValueChange={(value) => handleSelectChange('type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="purchase">Purchase</SelectItem>
                            <SelectItem value="refund">Refund</SelectItem>
                            <SelectItem value="transfer">Transfer</SelectItem>
                            <SelectItem value="withdrawal">Withdrawal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="severity">Risk Severity</Label>
                        <Select
                            value={singleTransaction.severity as string}
                            onValueChange={(value) => handleSelectChange('severity', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>


                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                      id="description"
                      name="description"
                      value={singleTransaction.description || ''}
                      onChange={handleInputChange}
                      placeholder="Additional transaction details"
                      rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                      variant="default"
                      onClick={processSingleTransaction}
                      disabled={isProcessing || !singleTransaction.transactionId || !singleTransaction.amount || !singleTransaction.customerName}
                      className="gap-2"
                  >
                    {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing...
                        </>
                    ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Submit Transaction
                        </>
                    )}
                  </Button>
                </div>

                {processSuccess && (
                    <Alert className="bg-green-50 border-green-200">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>
                        Transaction has been submitted and saved to the database successfully.
                      </AlertDescription>
                    </Alert>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
  );
}
