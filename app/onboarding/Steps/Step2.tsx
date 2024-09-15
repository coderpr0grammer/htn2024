import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StepProps } from "@/types/types"
import { UseFormReturn, useForm } from "react-hook-form"

const Step2: React.FC<StepProps> = ({ form }) => {
    return (
        <section className="space-y-2">
            <div className="flex flex-col gap-3">
                <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Job Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Software Developer" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="jobIndustry"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Job Industry</FormLabel>
                            <FormControl>
                                <Input placeholder="Engineering" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Salary</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="$40,000" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </section>
    )
}

export default Step2;