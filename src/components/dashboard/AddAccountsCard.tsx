"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddAccountsCard() {
  return (
    <Card className="bg-[#F7F7F7] border-0">
      <CardContent className="p-2">
        <div className="text-center space-y-4">
          <h3 className="text-sm font-medium text-gray-600">Add Accounts</h3>
          <p className="text-xs text-gray-500">
            Add your bank accounts to track your finances
          </p>
          <div className="grid grid-cols-2 items-center gap-2">
            <Button variant="outline" size="sm" className="w-full text-[#34C724] border-[#34C724] bg-transparent">
              <Plus className="w-4 h-4" />
              Income
            </Button>
            <Button variant="outline" size="sm" className="w-full text-[#F54A45] border-[#F54A45] bg-transparent">
              <Plus className="w-4 h-4" />
              Expense
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
