"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const analyticsData = {
  yearly: [
    { name: "Income", value: 52.1, color: "#4ADE80" },
    { name: "Expense", value: 22.8, color: "#EF4444" },
    { name: "Savings", value: 13.9, color: "#06B6D4" },
    { name: "Vat", value: 11.2, color: "#FDE047" },
  ],
  monthly: [
    { name: "Income", value: 48.5, color: "#4ADE80" },
    { name: "Expense", value: 28.3, color: "#EF4444" },
    { name: "Savings", value: 15.2, color: "#06B6D4" },
    { name: "Vat", value: 8.0, color: "#FDE047" },
  ],
  weekly: [
    { name: "Income", value: 45.2, color: "#4ADE80" },
    { name: "Expense", value: 32.1, color: "#EF4444" },
    { name: "Savings", value: 12.7, color: "#06B6D4" },
    { name: "Vat", value: 10.0, color: "#FDE047" },
  ],
  daily: [
    { name: "Income", value: 42.8, color: "#4ADE80" },
    { name: "Expense", value: 35.6, color: "#EF4444" },
    { name: "Savings", value: 11.1, color: "#06B6D4" },
    { name: "Vat", value: 10.5, color: "#FDE047" },
  ],
}

export default function Component() {
  const [selectedPeriod, setSelectedPeriod] = useState<keyof typeof analyticsData>("yearly")
  const currentData = analyticsData[selectedPeriod]

  return (
      <Card className="w-full h-full max-w-2xl p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6">
          <CardTitle className="text-xl font-medium text-gray-900">Category Analytics</CardTitle>
          <Select value={selectedPeriod} onValueChange={(value: keyof typeof analyticsData) => setSelectedPeriod(value)}>
            <SelectTrigger className="w-[100px] h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8 h-full">
            {/* Chart Container */}
            <div className="bg-gray-50 rounded-lg p-6 flex-shrink-0">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                        data={currentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={800}
                    >
                      {currentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-4 flex-1">
              {currentData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                  </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
  )
}
