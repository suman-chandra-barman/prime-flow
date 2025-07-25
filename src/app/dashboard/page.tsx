"use client";

import { useState, useEffect } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import AnalyticsChart from "@/components/dashboard/AnaliticsChart";
import { AddAccountsCard } from "@/components/dashboard/AddAccountsCard";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import CategoryAnalytics from "@/components/dashboard/CategoryAnalytics";
import type { IMetricCard as MetricCardType } from "@/types/dashboard";
import IncomeAnalytics from "@/components/dashboard/IncomeAnalytics";
import Link from "next/link";

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

  // Simulate dynamic data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with random variations
      setMetricsData((prev) =>
        prev.map((metric) => ({
          ...metric,
          amount: `$${(Math.random() * 20000 + 10000).toFixed(2)}`,
          change: `${(Math.random() * 30 + 5).toFixed(0)}%`,
          percentage: `${Math.random() > 0.5 ? "+" : "-"}${(
            Math.random() * 50 +
            10
          ).toFixed(0)}%`,
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-6">
      <div className="md:flex gap-2">
        <div className="flex-1 flex flex-col space-y-6">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {metricsData.map((metric, index) => (
              <MetricCard key={index} data={metric} />
            ))}
            <AddAccountsCard />
          </div>
        </div>
        <div className="flex-1 mt-6 md:mt-0">
          <AnalyticsChart />
        </div>
      </div>

      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
          <div className="flex flex-col h-full">
            <div className="h-full bg-white">
              <IncomeAnalytics />
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="h-full bg-white ">
              <CategoryAnalytics />
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div>
          <div className="flex flex-row items-center justify-between px-6">
            <p className="text-lg font-semibold">Transactions</p>
            <Link href="/dashboard/transactions" className="text-[#838383]">
              See all
            </Link>
          </div>
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
}
