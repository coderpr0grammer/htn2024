import { useEffect } from 'react'
import './test-swapy.css'
import { createSwapy } from 'swapy'
import { NetWorthWidget } from './net-worth-widget'
import { OverviewWidget } from './overview-widget'
import NewsWidget from './news-widget'
import { RiskToleranceWidget } from './risk-tolerance-widget'

const DEFAULT = {
    '1': 'a',
    '3': 'c',
    '4': 'd',
    '2': null
}


function A() {
    return (
        <div className="item a" data-swapy-item="a">
            {/* <div className="handle" data-swapy-handle></div> */}
            <NetWorthWidget worth={123456} />
        </div>
    )
}

function C() {
    return (
        <div className="item c" data-swapy-item="c">
            <OverviewWidget liquidCash={10000} debt={5000} investedAssets={100000} />
        </div>
    )
}

function D() {
    return (
        <div className="item d" data-swapy-item="d">
            <NewsWidget />
        </div>
    )
}

function E() {
    return (
        <div className="item e" data-swapy-item="e">
            <RiskToleranceWidget personalRisk={1.2} portfolioRisk={2.3} />
        </div>
    )
}

function getItemById(itemId: 'a' | 'c' | 'd' | 'e' | null) {
    switch (itemId) {
        case 'a':
            return <A />
        case 'c':
            return <C />
        case 'd':
            return <D />
        case 'e':
            return <E />
    }
}


function SwapyTest() {
    const slotItems: Record<string, 'a' | 'c' | 'd' | null> = localStorage.getItem('slotItem') ? JSON.parse(localStorage.getItem('slotItem')!) : DEFAULT

    useEffect(() => {

        const container = document.querySelector('.swapy-container')!
        if (!container) return;
        const swapy = createSwapy(container)
        swapy.onSwap(({ data }) => {
            localStorage.setItem('slotItem', JSON.stringify(data.object))
        })

        return () => {
            swapy.destroy()
        }
    }, [])

    return (
        <div className="swapy-container h-full w-full flex-row">
            <div className="slot" data-swapy-slot="1">
                {getItemById(slotItems['1'])}
            </div>

            <div className="second-row">
                <div className="slot b" data-swapy-slot="2">
                    {getItemById(slotItems['2'])}
                </div>
                <div className="slot c" data-swapy-slot="3">
                    {getItemById(slotItems['3'])}
                </div>
            </div>

            <div className="slot d" data-swapy-slot="4">
                {getItemById(slotItems['4'])}
            </div>
        </div>
    )
}

export default SwapyTest