"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { IMetricCard as IMetricCardType } from "@/types/dashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MetricCardProps {
  data: IMetricCardType;
}

export function MetricCard({ data }: MetricCardProps) {
  const { title, amount, change, percentage, trend, color } = data;

  const colorClasses = {
    green: "text-[#34C724] border-[#34C724]",
    red: "text-red-600 border-[#F54A45]",
    blue: "text-blue-600 border-[#02DBD6]",
  };

  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = trend === "up" ? "text-green-500" : "text-red-500";

  return (
    <Card className={`${colorClasses[color]} bg-[#F7F7F7] border-0 border-t-6 p-0`}>
      <CardContent className="p-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <Select>
            <SelectTrigger size="sm" className="border-0 shadow-none">
              <SelectValue placeholder="Monthly" />
            </SelectTrigger>
            <SelectContent className="text-gray-500">
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-gray-900">{amount}</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">
              Increase your {title.toLowerCase()}
            </span>
            <span className={`font-medium ${trendColor}`}>{change}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">last 7 days</span>
            <div className={`flex items-center gap-1 ${trendColor}`}>
              <TrendIcon className="w-3 h-3" />
              <span className="text-xs font-medium">{percentage}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

MetricCard.displayName = "MetricCard";
