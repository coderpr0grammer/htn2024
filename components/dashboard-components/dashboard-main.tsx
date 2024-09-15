"use client"

import NewsWidget from './news-widget'
import { GreetingWidget } from "@/components/dashboard-components/greeting-widget"
import { NetWorthWidget } from "@/components/dashboard-components/net-worth-widget"
import { OverviewWidget } from "@/components/dashboard-components/overview-widget"
import { RiskToleranceWidget } from "@/components/dashboard-components/risk-tolerance-widget"

export function DashboardMain() {
  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 pb-6 sm:flex-row sm:pb-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <GreetingWidget />
        <NetWorthWidget worth={123456} />
        <OverviewWidget liquidCash={10000} debt={5000} investedAssets={100000} />
      </div>
      <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
        <NewsWidget />
      </div>
      <div className="grid w-full flex-1 gap-6">
        <RiskToleranceWidget personalRisk={1.2} portfolioRisk={2.3} />
      </div>
    </div>
  )
}