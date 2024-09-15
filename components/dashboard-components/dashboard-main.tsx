"use client"

import NewsWidget from './news-widget'
import { GreetingWidget } from "@/components/dashboard-components/greeting-widget"
import { NetWorthWidget } from "@/components/dashboard-components/net-worth-widget"
import { OverviewWidget } from "@/components/dashboard-components/overview-widget"
import { RiskToleranceWidget } from "@/components/dashboard-components/risk-tolerance-widget"
import { useEffect, useRef } from 'react'
import { createSwapy } from 'swapy'
import SwapyTest from './test-swapy'


export function DashboardMain() {

  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const swapy = createSwapy(ref.current, {
      animation: 'dynamic' // or spring or none
    })


    // You can disable and enable it anytime you want
    swapy.enable(true)
  }, [ref.current])



  return (

    <div className="chart-wrapper mx-auto h-full overflow-hidden flex max-w-6xl flex-col gap-6 pb-6 sm:flex-row sm:pb-8">
      <div className="grid w-full gap-6 sm:grid-cols-4 grid-cols-1 grid-flow-row px-4">

        <NetWorthWidget worth={123456} />
        <RiskToleranceWidget personalRisk={1.2} portfolioRisk={2.3} />


        <NewsWidget />
        <OverviewWidget liquidCash={10000} debt={5000} investedAssets={100000} />


      </div>
    </div>
  )
}