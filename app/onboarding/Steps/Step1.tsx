import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StepProps } from "@/types/types"


const Step1: React.FC<StepProps> = ({ form }) => {
    return (
        <section className="space-y-2">
            <div className="flex flex-row gap-3">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                placeholder="30"
                                {...field}
                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            key={field.value}
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="CAN">🇨🇦 Canada</SelectItem>
                                <SelectItem value="USA">🇺🇸 United States</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </section>
    )
}

export default Step1;