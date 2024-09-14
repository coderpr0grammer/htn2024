"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a legend"

const chartConfig = {
  amount: {
    label: "amount",
  },
  liquid: {
    label: "Liquid",
    color: "hsl(var(--chart-1))",
  },
  debt: {
    label: "Debt",
    color: "hsl(var(--chart-2))",
  },
  investments: {
    label: "Investments",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function OverviewWidget(
  {
    liquidCash,
    debt,
    investedAssets
  }: {
    liquidCash: number,
    debt: number,
    investedAssets: number
  }
) {

  const chartData = [
    { asset: "liquid", amount: liquidCash, fill: "var(--color-liquid)" },
    { asset: "debt", amount: debt, fill: "var(--color-debt)" },
    { asset: "investments", amount: investedAssets, fill: "var(--color-investments)" },
  ]

  const commaFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })

  return (
    <Card className="max-w-xs shadow-lg">
      <CardContent className="flex flex-row">
        <div className="p-4 flex flex-col gap-2">
          {chartData.map(({ asset, amount, fill }) => (
            <CardDescription key={asset} className="flex flex-col">
              <div className="flex flex-row gap-1">
                <span className="w-3 h-3 rounded-full inline-block mr-2" style={{ backgroundColor: fill }} />
                <span className="text-sm mb-[-3px]">{asset.charAt(0).toUpperCase() + asset.slice(1)}</span>
              </div>
              <span className="font-bold text-xl text-black">
                {commaFormat.format(amount)}
              </span>
            </CardDescription>
          ))}
        </div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-40 h-40 my-auto"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              innerRadius={25}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}