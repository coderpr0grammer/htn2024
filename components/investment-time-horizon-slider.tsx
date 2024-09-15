'use client'

import React from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon } from "lucide-react"

export function InvestmentTimeHorizonSliderComponent({ value, onChange }: { value: number, onChange: React.Dispatch<React.SetStateAction<number>> }) {
  // const [value, setValue] = React.useState(15)

  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0])
  }

  const incrementValue = () => {
    onChange(Math.min(value + 1, 30))
  }

  const decrementValue = () => {
    onChange(Math.max(value - 1, 1))
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between font-bold">
        <span className="text-sm">Shorter</span>
        <span className="text-sm">Longer</span>
      </div>
      <Slider
        min={1}
        max={30}
        step={1}
        value={[value]}
        onValueChange={handleSliderChange}
        className="w-full"
      />
      <div className="flex items-center justify-between">
        <span className="text-sm">1 year</span>
        <span className="text-sm">30 years</span>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={decrementValue}
          disabled={value === 1}
          aria-label="Decrease years"
          className='w-full'
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
        <span className="text-2xl font-bold w-full text-center">{value} {value === 1 ? 'year' : 'years'}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={incrementValue}
          disabled={value === 30}
          aria-label="Increase years"
          className='w-full'

        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}