import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StepProps } from "@/types/types"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"


const Step4: React.FC<StepProps> = ({ form }) => {

    return (
        <section className="space-y-2">

            <div className="flex flex-col gap-3">


                <FormField
                    control={form.control}
                    name="riskTolerance"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Risk Tolerance</FormLabel>
                            <FormControl>
                                <Slider
                                defaultValue={[50]}
                                    max={100}
                                    color="red"
                                    step={1}
                                    aria-setsize={20}
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Investment Horizon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="short">Short</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="long">Long</SelectItem>
                                    </SelectContent>
                                </Select>
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
                            <FormLabel>Profit Percentage Goal</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="10" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </section>
    )

}

export default Step4;