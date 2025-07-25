"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { TransactionEditModal } from "@/components/Modal/TransactionEditModal";
import type { ITransaction } from "@/types/dashboard";
import Link from "next/link";

const initialTransactions: ITransaction[] = [
  {
    id: "1s5gf1",
    category: "Salary",
    details: "Dhanmondi Bran...",
    amount: "$53,200",
    image: "image-url.jpg",
    transaction: "Bank",
    account: "Income",
    type: "Income",
    incomeSource: "Company Payroll",
    contact: "contact@example.com",
    clientName: "ABC Ltd.",
    receivedDate: "2025-07-01",
    paymentMethod: "Bank",
    incomeCategory: "Monthly Salary",
    notes:
      "It's important to include a detailed note that captures the reasons behind the issuance of this bill. This note should serve as a reminder for you in the future, outlining the specific circumstances that led to this charge. Consider mentioning any relevant dates, services rendered, or agreements made that justify the bill. By doing so, you will have a clear reference point that can help clarify any questions or concerns that may arise later regarding this financial obligation.",
    proofImages: ["proof1.jpg", "proof2.jpg"],
  },
  {
    id: "1s5gf2",
    category: "Equipment's",
    details: "Dhanmondi Bran...",
    amount: "$2,200",
    image: "image-url.jpg",
    transaction: "Bank",
    account: "Income",
    type: "Income",
    incomeSource: "Equipment Sale",
    contact: "contact@example.com",
    clientName: "XYZ Pvt.",
    receivedDate: "2025-07-02",
    paymentMethod: "Bank",
    incomeCategory: "Asset Sale",
    notes: "Second-hand items",
    proofImages: ["equip1.jpg"],
  },
  {
    id: "dsrg515",
    category: "Office Rent",
    details: "Dhanmondi Bran...",
    amount: "$12,200",
    image: "image-url.jpg",
    transaction: "Bank",
    account: "Expense",
    type: "Expense",
    incomeSource: "",
    contact: "contact@example.com",
    clientName: "Landlord",
    receivedDate: "2025-07-05",
    paymentMethod: "Bank",
    incomeCategory: "",
    notes: "Paid for July",
    proofImages: ["rent1.jpg"],
  },
  {
    id: "452nd",
    category: "Car Rent",
    details: "Dhanmondi Bran...",
    amount: "$1,200",
    image: "image-url.jpg",
    transaction: "Bank",
    account: "Income",
    type: "Income",
    incomeSource: "Car Service",
    contact: "client@example.com",
    clientName: "Mr. Karim",
    receivedDate: "2025-07-06",
    paymentMethod: "Cash",
    incomeCategory: "Transport",
    notes: "Weekend rent",
    proofImages: [],
  },
  {
    id: "4rs4g",
    category: "Office Rent",
    details: "Dhanmondi Bran...",
    amount: "$12,200",
    image: "image-url.jpg",
    transaction: "Bank",
    account: "Expense",
    type: "Expense",
    incomeSource: "",
    contact: "contact@example.com",
    clientName: "Landlord",
    receivedDate: "2025-07-07",
    paymentMethod: "Bank",
    incomeCategory: "",
    notes: "Advance payment",
    proofImages: ["proof-rent-advance.jpg"],
  },
];

export function TransactionsTable() {
  const [transactions, setTransactions] =
    useState<ITransaction[]>(initialTransactions);
  const [editingTransaction, setEditingTransaction] =
    useState<ITransaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (transaction: ITransaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (updatedTransaction: ITransaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
    setEditingTransaction(null);
  };

  return (
    <>
      <Card className="border-0 shadow-none">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#E7EFFE]">
                <TableHead className="font-medium text-gray-600">
                  T-ID
                </TableHead>
                <TableHead className="font-medium text-gray-600">
                  Category
                </TableHead>
                <TableHead className="font-medium text-gray-600">
                  Details
                </TableHead>
                <TableHead className="font-medium text-gray-600">
                  Amount
                </TableHead>
                <TableHead className="font-medium text-gray-600">
                  Image
                </TableHead>
                <TableHead className="font-medium text-gray-600">
                  Transaction
                </TableHead>
                <TableHead className="font-medium text-gray-600">
                  Account
                </TableHead>
                <TableHead className="font-medium text-gray-600">
                  Edit
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow
                  key={`${transaction.id}-${index}`}
                  className={`${index % 2 === 0 ? "":"bg-gray-100"}`}
                >
                  <TableCell className="font-medium text-gray-600">
                    {transaction.id}
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className="text-gray-600">
                    {transaction.details}
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.amount}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {transaction.image}
                  </TableCell>
                  <TableCell>{transaction.transaction}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.type === "Expense"
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        transaction.type === "Expense"
                          ? "bg-orange-100 text-orange-600 hover:bg-orange-100"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                      }
                    >
                      {transaction.account}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleEditClick(transaction)}
                    >
                      <Edit className="h-4 w-4 text-gray-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transactions modal */}
      <TransactionEditModal
        transaction={editingTransaction}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSaveTransaction}
      />
    </>
  );
}
