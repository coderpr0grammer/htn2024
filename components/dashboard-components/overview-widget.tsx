import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"
import { useAuth } from "@/app/infrastructure/auth/auth.context"

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
} satisfies ChartConfig

export function OverviewWidget() {

  const { user } = useAuth()
  const liquidCash = user?.data.liquidCash
  const debt = user?.data.debt
  const investedAssets = user?.data.investedAssets.reduce((acc: number, asset: { amount: string }) => acc + parseInt(asset.amount), 0)

  const chartData = [
    { asset: "liquid", amount: liquidCash, fill: "var(--color-liquid)", directFill: "hsl(var(--chart-1))" },
    { asset: "debt", amount: debt, fill: "var(--color-debt)", directFill: "hsl(var(--chart-2))" },
    { asset: "investments", amount: investedAssets, fill: "var(--color-investments)", directFill: "hsl(var(--chart-3))" },
  ]

  const commaFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })

  return (
    <Card
      className="lg:max-w-md"
    >
      <CardHeader className="flex flex-row">
        <div className="flex flex-col gap-2">
          {chartData.map(({ asset, amount, fill, directFill }) => {
            return (
              <CardDescription key={asset} className="flex flex-col">
                <div className="flex flex-row gap-1 align-middle">
                  <div className="w-3 h-3 rounded-full my-auto" style={{ backgroundColor: directFill }} />
                  <span className="text-sm">{asset.charAt(0).toUpperCase() + asset.slice(1)}</span>
                </div>
                <span className="font-bold text-2xl text-black">
                  {commaFormat.format(amount)}
                </span>
              </CardDescription>
            )
          })}
        </div>
        <ChartContainer
          config={chartConfig}
          className="ml-auto aspect-square w-40 h-40 my-auto"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              innerRadius={25}
            />
          </PieChart>
        </ChartContainer>
      </CardHeader>
    </Card>
  )
}