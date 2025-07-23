export interface IMetricCard {
  title: string
  amount: string
  change: string
  percentage: string
  trend: "up" | "down"
  color: "green" | "red" | "blue"
}

export interface ITransaction {
  id: string
  category: string
  details: string
  amount: string
  image: string
  transaction: string
  account: string
  type: "Income" | "Expense"
}

export interface IChartData {
  month: string
  income: number
  expense: number
  savings: number
}

export interface ICategoryData {
  name: string
  value: number
  percentage: string
  color: string
}
