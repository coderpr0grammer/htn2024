"use client"

import { Area, AreaChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

export const description = "An area chart with gradient fill"

const chartData = [
  { desktop: 10 },
  { desktop: 20 },
  { desktop: 40 },
  { desktop: 60 },
  { desktop: 50 },
  { desktop: 80 },
  { desktop: 90 },
  { desktop: 80 },
  { desktop: 80 },
  { desktop: 90 },
  { desktop: 100 },
  { desktop: 150 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-stock))",
  },
} satisfies ChartConfig

export function LandingGraph() {
  return (
    <ChartContainer config={chartConfig} className="max-h-[500px] w-full">
      <AreaChart
        data={chartData}
      >
        <defs>
          <linearGradient id="shimmerGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="50%" stopColor="hsl(230 20% 10%)" strokeLinecap="round" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
          <mask id="shimmerMask">
            <rect x="0" y="0" width="100%" height="100%" fill="url(#shimmerGradient)" className="shimmer" />
          </mask>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          animationDuration={1000}
          animationEasing="ease-in-out"
          dataKey="desktop"
          type="natural"
          fill="url(#fillDesktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          strokeWidth={5}
          mask="url(#shimmerMask)"
        />
        <Area
          animationDuration={1000}
          dataKey="desktop"
          type="natural"
          fill="url(#fillDesktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          opacity={0.8}
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}