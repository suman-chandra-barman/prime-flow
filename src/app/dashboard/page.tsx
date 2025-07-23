"use client";

import { useState } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import AnalyticsChart from "@/components/dashboard/AnaliticsChart";
import { IncomeAnalytics } from "@/components/dashboard/IncomeAnalitics";
import { CategoryAnalytics } from "@/components/dashboard/CategoryAnalytics";
import { AddAccountsCard } from "@/components/dashboard/AddAccountsCard";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import type {
  IMetricCard as MetricCardType,
  IChartData,
} from "@/types/dashboard";

export default function Dashboard() {
  const [metricsData, setMetricsData] = useState<MetricCardType[]>([
    {
      title: "Income",
      amount: "$12,153.00",
      change: "15%",
      percentage: "+22%",
      trend: "up",
      color: "green",
    },
    {
      title: "Expense",
      amount: "$12,153.00",
      change: "15%",
      percentage: "-20%",
      trend: "down",
      color: "red",
    },
    {
      title: "Savings",
      amount: "$12,153.00",
      change: "15%",
      percentage: "+22%",
      trend: "up",
      color: "blue",
    },
  ]);

  const [chartData, setChartData] = useState<IChartData[]>([
    { month: "Jan", income: 45, expense: -32, savings: 25 },
    { month: "Feb", income: 52, expense: -28, savings: 30 },
    { month: "Mar", income: 48, expense: -35, savings: 28 },
    { month: "Apr", income: 61, expense: -42, savings: 35 },
    { month: "May", income: 55, expense: -38, savings: 32 },
    { month: "Jun", income: 67, expense: -45, savings: 40 },
    { month: "Jul", income: 43, expense: -30, savings: 25 },
    { month: "Aug", income: 58, expense: -40, savings: 35 },
  ]);

  // Simulate dynamic data updates
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Update metrics with random variations
  //     setMetricsData((prev) =>
  //       prev.map((metric) => ({
  //         ...metric,
  //         amount: `$${(Math.random() * 20000 + 10000).toFixed(2)}`,
  //         change: `${(Math.random() * 30 + 5).toFixed(0)}%`,
  //         percentage: `${Math.random() > 0.5 ? "+" : "-"}${(
  //           Math.random() * 50 +
  //           10
  //         ).toFixed(0)}%`,
  //       }))
  //     );

  //     // Update chart data
  //     setChartData((prev) =>
  //       prev.map((item) => ({
  //         ...item,
  //         income: Math.floor(Math.random() * 40 + 30),
  //         expense: Math.floor(Math.random() * 30 + 20),
  //         savings: Math.floor(Math.random() * 25 + 15),
  //       }))
  //     );
  //   }, 5000); // Update every 5 seconds

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="min-h-screen py-6">
      <div className="md:flex gap-2 space-y-6">
        {/* Top Metrics Row */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full mb-0">
          {metricsData.map((metric, index) => (
            <MetricCard key={index} data={metric} />
          ))}
          <AddAccountsCard />
        </div>
        <div className="flex-1">
          <AnalyticsChart/>
        </div>
      </div>
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryAnalytics />
        </div>

        {/* Income Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeAnalytics />
          <div></div> {/* Empty space to match layout */}
        </div>

        {/* Transactions Table */}
        <TransactionsTable />
      </div>
    </div>
  );
}
