import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StepProps } from "@/types/types"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { InvestmentTimeHorizonSliderComponent } from "@/components/investment-time-horizon-slider"


const Step4: React.FC<StepProps> = ({ form }) => {

    return (
        <section className="space-y-2">
            <div className="flex flex-col gap-6">
                <FormField
                    control={form.control}
                    name="riskTolerance"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Risk Tolerance</FormLabel>
                            <div className="justify-between flex flex-row">
                                <FormLabel>Low Risk</FormLabel>
                                <FormLabel>High Risk</FormLabel>
                            </div>
                            <FormControl>
                                <Slider
                                    defaultValue={[1.5]}
                                    max={3}
                                    color="red"
                                    step={0.05}
                                    aria-setsize={20}
                                    onChange={(e) => {
                                        field.onChange(e)
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="investmentHorizon"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Investment Horizon</FormLabel>
                            <FormControl>

                                <InvestmentTimeHorizonSliderComponent {...field}  />
                                {/* <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Investment Horizon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="short">Short</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="long">Long</SelectItem>
                                    </SelectContent> */}
                                {/* </Select> */}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="profitPercentageGoal"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What % do you aim to profit over this time?</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="10" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="gap-3 flex flex-row">
                    <FormField
                        control={form.control}
                        name="monthsOfEmergencySavings"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Perferred Months of Savings</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="10" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="monthlyExpenses"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Monthly Expenses</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="10" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </section>
    )

}

export default Step4;