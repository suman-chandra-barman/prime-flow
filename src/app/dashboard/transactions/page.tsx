"use client"

import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between px-6">
        <p className="text-lg font-semibold">Transactions</p>
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          {/* Date Filter */}
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>

          {/* Filter Button */}
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <TransactionsTable />
    </section>
  );
};

export default Transactions;
