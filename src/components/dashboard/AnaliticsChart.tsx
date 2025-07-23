"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ChartData {
  period: string;
  income: number;
  expense: number;
}

type TimePeriod = "daily" | "weekly" | "monthly" | "yearly";

const AnalyticsChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("monthly");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sample data for different time periods
  const data: Record<TimePeriod, ChartData[]> = {
    daily: [
      { period: "Mon", income: 1200, expense: 800 },
      { period: "Tue", income: 1500, expense: 600 },
      { period: "Wed", income: 900, expense: 1100 },
      { period: "Thu", income: 1800, expense: 400 },
      { period: "Fri", income: 2100, expense: 900 },
      { period: "Sat", income: 800, expense: 1200 },
      { period: "Sun", income: 600, expense: 300 },
    ],
    weekly: [
      { period: "W1", income: 8500, expense: 6200 },
      { period: "W2", income: 7200, expense: 5800 },
      { period: "W3", income: 9100, expense: 7400 },
      { period: "W4", income: 8800, expense: 6900 },
      { period: "W5", income: 7600, expense: 5200 },
    ],
    monthly: [
      { period: "Jan", income: 45000, expense: 32000 },
      { period: "Feb", income: 38000, expense: 28000 },
      { period: "Mar", income: 42000, expense: 35000 },
      { period: "Apr", income: 48000, expense: 31000 },
      { period: "May", income: 52000, expense: 29000 },
      { period: "Jun", income: 41000, expense: 33000 },
      { period: "Jul", income: 35000, expense: 27000 },
      { period: "Aug", income: 49000, expense: 36000 },
      { period: "Sep", income: 44000, expense: 32000 },
      { period: "Oct", income: 47000, expense: 34000 },
      { period: "Nov", income: 43000, expense: 30000 },
      { period: "Dec", income: 46000, expense: 31000 },
    ],
    yearly: [
      { period: "2020", income: 480000, expense: 360000 },
      { period: "2021", income: 525000, expense: 385000 },
      { period: "2022", income: 580000, expense: 420000 },
      { period: "2023", income: 620000, expense: 445000 },
      { period: "2024", income: 680000, expense: 480000 },
    ],
  };

  const currentData = data[selectedPeriod];
  const maxValue = Math.max(
    ...currentData.map((d) => Math.max(d.income, d.expense))
  );
  const yAxisMax = Math.ceil(maxValue / 10000) * 10000;

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  const periodLabels = {
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
  };

  return (
    <div className="w-full max-w-6xl h-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics</h2>
        </div>

        {/* Time Period Selector */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">
              {periodLabels[selectedPeriod]}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              {Object.entries(periodLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedPeriod(key as TimePeriod);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    selectedPeriod === key
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 400"
          className="overflow-visible"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <g key={ratio}>
              <line
                x1="60"
                y1={180 - ratio * 150}
                x2="740"
                y2={180 - ratio * 150}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <line
                x1="60"
                y1={220 + ratio * 150}
                x2="740"
                y2={220 + ratio * 150}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            </g>
          ))}

          {/* Center line (0 axis) */}

          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <g key={ratio}>
              <text
                x="50"
                y={180 - ratio * 150 + 4}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                {formatValue(yAxisMax * ratio)}
              </text>
              <text
                x="50"
                y={220 + ratio * 150 + 4}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                {ratio === 0 ? "0" : `-${formatValue(yAxisMax * ratio)}`}
              </text>
            </g>
          ))}

          {/* Bars */}
          {currentData.map((item, index) => {
            const barWidth = 40;
            const spacing = 680 / currentData.length;
            const x = 80 + index * spacing;
            const incomeHeight = (item.income / yAxisMax) * 150;
            const expenseHeight = (item.expense / yAxisMax) * 150;

            return (
              <g key={item.period}>
                {/* Income bar (above axis) */}
                <rect
                  x={x - barWidth / 2}
                  y={180 - incomeHeight}
                  width={barWidth}
                  height={incomeHeight}
                  fill="#3b82f6"
                  rx="4"
                  className="hover:fill-blue-600 transition-colors cursor-pointer"
                >
                  <title>{`${item.period}: Income ${formatValue(
                    item.income
                  )}`}</title>
                </rect>

                {/* Expense bar (below axis) */}
                <rect
                  x={x - barWidth / 2}
                  y={220}
                  width={barWidth}
                  height={expenseHeight}
                  fill="#f97316"
                  rx="4"
                  className="hover:fill-orange-600 transition-colors cursor-pointer"
                >
                  <title>{`${item.period}: Expense ${formatValue(
                    item.expense
                  )}`}</title>
                </rect>

                {/* X-axis label */}
                <text
                  x={x}
                  y="205"
                  textAnchor="middle"
                  className="text-sm fill-gray-700 font-medium"
                >
                  {item.period}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default AnalyticsChart;
