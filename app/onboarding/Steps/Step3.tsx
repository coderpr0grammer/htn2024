import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { StepProps } from "@/types/types"

const Step3: React.FC<StepProps> = ({ form }) => {

    return (
        <section className="space-y-2">

            <div className="flex flex-col gap-3">
                <FormField
                    control={form.control}
                    name="liquidCash"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Liquid Cash</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="10000" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="debt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Debt</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="5000" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-3">
                    <FormField
                        control={form.control}
                        name="assetName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Asset Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Asset Name" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="assetType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Asset Type</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Asset Type" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="assetAmount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Asset Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Asset Amount" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
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

export default Step3;