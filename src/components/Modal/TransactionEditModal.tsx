"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {MultipleFileUpload} from "@/components/dashboard/MultipoleFileUpload"
import {ITransaction} from "@/types/dashboard";

interface TransactionEditModalProps {
    transaction: ITransaction | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (updatedTransaction: ITransaction) => void
}

export function TransactionEditModal({ transaction, open, onOpenChange, onSave }: TransactionEditModalProps) {
    const [formData, setFormData] = useState<ITransaction>({
        id: "",
        category: "",
        details: "",
        amount: "",
        image: "",
        transaction: "",
        account: "",
        type: "Income",
        incomeSource: "",
        contact: "",
        clientName: "",
        receivedDate: "",
        paymentMethod: "",
        incomeCategory: "",
        notes: "",
        proofImages: [],
    })

    useEffect(() => {
        if (transaction) {
            setFormData({
                ...transaction,
                incomeSource: transaction.incomeSource || "Atlas Tech Ltd.",
                contact: transaction.contact || "0024654584",
                clientName: transaction.clientName || "",
                receivedDate: transaction.receivedDate || "2025-05-06",
                paymentMethod: transaction.paymentMethod || "Card",
                incomeCategory: transaction.incomeCategory || "Buy Car",
                amount: transaction.amount || "$4,652.00",
                notes: transaction.notes || "",
                proofImages: transaction.proofImages || [],
            })
        }
    }, [transaction])

    const handleInputChange = (field: keyof ITransaction, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
        onOpenChange(false)
    }

    const formatAmount = (amount: string) => {
        const numericValue = amount.replace(/[$,]/g, "")
        return numericValue
    }

    if (!transaction) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-[70vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="secondary"
                            className={
                                formData.type === "Income"
                                    ? "bg-[#323232] text-[#88F77C] px-4 py-2"
                                    : "bg-red-100 text-red-800 hover:bg-red-100 px-4 py-2"
                            }
                        >
                            {formData.type}
                        </Badge>
                    </div>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                        {formData.incomeSource} {formData.type} Details
                    </DialogTitle>
                    <p className="text-sm text-[#A1A1A1]">
                        Let&apos;s take a moment to add your {formData.type.toLowerCase()} so we can better understand your financial
                        situation.
                    </p>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Income Source */}
                        <div className="space-y-2">
                            <Label htmlFor="incomeSource" className="text-sm font-medium text-gray-700">
                                {formData.type} Source
                            </Label>
                            <Input
                                id="incomeSource"
                                value={formData.incomeSource}
                                onChange={(e) => handleInputChange("incomeSource", e.target.value)}
                                placeholder="Enter income source"
                                className="h-11"
                            />
                        </div>

                        {/* Contact */}
                        <div className="space-y-2">
                            <Label htmlFor="contact" className="text-sm font-medium text-gray-700">
                                Contact
                            </Label>
                            <Input
                                id="contact"
                                value={formData.contact}
                                onChange={(e) => handleInputChange("contact", e.target.value)}
                                placeholder="Contact number"
                                className="h-11"
                            />
                        </div>

                        {/* Client Name / Company */}
                        <div className="space-y-2">
                            <Label htmlFor="clientName" className="text-sm font-medium text-gray-700">
                                Client Name / Company
                            </Label>
                            <Input
                                id="clientName"
                                value={formData.clientName}
                                onChange={(e) => handleInputChange("clientName", e.target.value)}
                                placeholder="Enter client or company name"
                                className="h-11"
                            />
                        </div>

                        {/* Received Date */}
                        <div className="space-y-2">
                            <Label htmlFor="receivedDate" className="text-sm font-medium text-gray-700">
                                Received Date
                            </Label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={formData.receivedDate}
                                    onChange={(e) => handleInputChange("receivedDate", e.target.value)}
                                    className="h-11 w-full border px-3 py-1 rounded-md"
                                />
                            </div>
                        </div>
                        {/* Amount & payment Method */}
                        <div className="flex items-center gap-5">
                            {/* Amount */}
                            <div className="space-y-2 flex-1">
                                <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                                    Amount
                                </Label>
                                <Input
                                    id="amount"
                                    value={formatAmount(formData.amount)}
                                    onChange={(e) => handleInputChange("amount", `$${e.target.value}`)}
                                    placeholder="0.00"
                                    type="number"
                                    step="0.01"
                                    className="h-11"
                                />
                            </div>
                            {/* Payment Method */}
                            <div className="flex-1 h-full">
                                <Label htmlFor="paymentMethod" className="text-sm font-medium text-gray-700 mb-2">
                                    Payment Method
                                </Label>
                                <Select
                                    value={formData.paymentMethod}
                                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                                >
                                    <SelectTrigger className="min-h-[44px] w-full">
                                        <SelectValue placeholder="Select payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Card">Card</SelectItem>
                                        <SelectItem value="Bank">Bank Transfer</SelectItem>
                                        <SelectItem value="Cash">Cash</SelectItem>
                                        <SelectItem value="Check">Check</SelectItem>
                                        <SelectItem value="Digital Wallet">Digital Wallet</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Income Categories - Full Width */}
                        <div className="space-y-2">
                            <Label htmlFor="incomeCategory" className="text-sm font-medium text-gray-700">
                                {formData.type} Categories
                            </Label>
                            <Select
                                value={formData.incomeCategory}
                                onValueChange={(value) => handleInputChange("incomeCategory", value)}
                            >
                                <SelectTrigger className="min-h-11 w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Salary">Salary</SelectItem>
                                    <SelectItem value="Freelance">Freelance</SelectItem>
                                    <SelectItem value="Business">Business</SelectItem>
                                    <SelectItem value="Investment">Investment</SelectItem>
                                    <SelectItem value="Rental">Rental</SelectItem>
                                    <SelectItem value="Buy Car">Buy Car</SelectItem>
                                    <SelectItem value="Equipment's">Equipment&apos;s</SelectItem>
                                    <SelectItem value="Office Rent">Office Rent</SelectItem>
                                    <SelectItem value="Car Rent">Car Rent</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Multiple File Upload */}
                        <MultipleFileUpload />

                        {/* Notes */}
                        <div className="space-y-2">
                            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                                Notes
                            </Label>
                            <Textarea
                                id="notes"
                                defaultValue={formData.notes}
                                value={formData.notes}
                                onChange={(e) => handleInputChange("notes", e.target.value)}
                                placeholder="Write here"
                                className="min-h-[120px] resize-none"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="px-6">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                            Update Transaction
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
