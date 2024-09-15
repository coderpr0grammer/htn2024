"use client"

import NewsWidget from './news-widget'
import { NetWorthWidget } from "@/components/dashboard-components/net-worth-widget"
import { OverviewWidget } from "@/components/dashboard-components/overview-widget"
import { RiskToleranceWidget } from "@/components/dashboard-components/risk-tolerance-widget"

export function DashboardMain() {
  return (
    <div className="chart-wrapper w-full justify-center items-center h-full overflow-hidden flex max-w-6xl flex-col gap-6 pb-6 sm:flex-row sm:pb-8">
      <div className="grid w-full gap-6 sm:grid-rows-2  grid-flow-col px-4">

        <NetWorthWidget worth={123456} />
        <OverviewWidget liquidCash={10000} debt={5000} investedAssets={100000} />

        <NewsWidget />
        <RiskToleranceWidget personalRisk={1.2} portfolioRisk={2.3} />

      </div>
    </div>
  )
}
