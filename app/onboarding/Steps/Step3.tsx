import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StepProps } from "@/types/types"
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleXIcon, RemoveFormattingIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";

const Step3: React.FC<StepProps> = ({ form }) => {

    const { control, handleSubmit, register, formState: { errors } } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "investedAssets"
    });

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
                <span className="font-semibold">
                    Invested Assets
                </span>
                <div className="flex flex-row lg:gap-[68px] gap-3">
                    <FormLabel>Asset Name</FormLabel>
                    <FormLabel>Asset Type</FormLabel>
                    <FormLabel>Asset Value</FormLabel>
                </div>
                <ScrollArea className="max-h-40 rounded-md overflow-scroll flex flex-col gap-2">
                    {fields.map((field, index) => (
                        <div className="flex flex-row align-top gap-2" key={field.id}>
                            <FormField
                                control={form.control}
                                name={`investedAssets.${index}.name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="APPL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`investedAssets.${index}.type`}
                                render={({ field }) => (
                                    <FormItem>
                                        <Select
                                            onValueChange={field.onChange}
                                            key={field.value}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="security">Security</SelectItem>
                                                <SelectItem value="commodity">Commodity</SelectItem>
                                                <SelectItem value="crypto">Crypto</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`investedAssets.${index}.amount`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="number" placeholder="10000" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="button" variant={"destructive"} className="mb-auto aspect-square" onClick={() => remove(index)}>
                                <Trash2 className="scale-[2.5]" />
                            </Button>
                        </div>
                    ))}
                </ScrollArea>

                <Button type="button" variant={"outline"} onClick={() => append({ name: "", type: "", amount: 0 })}>
                    Add New Asset
                </Button>
            </div>
        </section>
    )

}

export default Step3;