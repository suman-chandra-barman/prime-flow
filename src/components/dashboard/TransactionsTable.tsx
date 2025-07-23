"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import type { ITransaction } from "@/types/dashboard"

const transactions: ITransaction[] = [
  {
    id: "1s5gf1",
    category: "Salary",
    details: "Dhanmondi Bran...",
    amount: "$53,200",
    image: "Image",
    transaction: "Bank",
    account: "Income",
    type: "Income",
  },
  {
    id: "1s5gf1",
    category: "Equipment's",
    details: "Dhanmondi Bran...",
    amount: "$2,200",
    image: "Image",
    transaction: "Bank",
    account: "Income",
    type: "Income",
  },
  {
    id: "dsrg515",
    category: "Office Rent",
    details: "Dhanmondi Bran...",
    amount: "$12,200",
    image: "Image",
    transaction: "Bank",
    account: "Expense",
    type: "Expense",
  },
  {
    id: "452nd",
    category: "Car Rent",
    details: "Dhanmondi Bran...",
    amount: "$1,200",
    image: "Image",
    transaction: "Bank",
    account: "Income",
    type: "Income",
  },
  {
    id: "4rs4g",
    category: "Office Rent",
    details: "Dhanmondi Bran...",
    amount: "$12,200",
    image: "Image",
    transaction: "Bank",
    account: "Expense",
    type: "Expense",
  },
]

export function TransactionsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Transactions</CardTitle>
        <Button variant="ghost" size="sm" className="text-blue-600">
          See all
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-600">T-ID</TableHead>
              <TableHead className="font-medium text-gray-600">Category</TableHead>
              <TableHead className="font-medium text-gray-600">Details</TableHead>
              <TableHead className="font-medium text-gray-600">Amount</TableHead>
              <TableHead className="font-medium text-gray-600">Image</TableHead>
              <TableHead className="font-medium text-gray-600">Transaction</TableHead>
              <TableHead className="font-medium text-gray-600">Account</TableHead>
              <TableHead className="font-medium text-gray-600">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={`${transaction.id}-${index}`} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-600">{transaction.id}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell className="text-gray-600">{transaction.details}</TableCell>
                <TableCell className="font-medium">{transaction.amount}</TableCell>
                <TableCell className="text-gray-500">{transaction.image}</TableCell>
                <TableCell>{transaction.transaction}</TableCell>
                <TableCell>
                  <Badge
                    variant={transaction.type === "Expense" ? "destructive" : "secondary"}
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
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4 text-gray-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
