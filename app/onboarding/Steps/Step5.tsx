import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StepProps } from "@/types/types"
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { CircleXIcon, RemoveFormattingIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";

const Step5: React.FC<StepProps> = ({ form }) => {

    const { control, handleSubmit, register, formState: { errors } } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "interests"
    });

    const { fields: goals, append: appendGoal, remove: removeGoal } = useFieldArray({
        control,
        name: "goals"
    });

    return (
        <section className="space-y-2">
            <div className="flex flex-col gap-3">
                <span className="font-semibold">
                    Financial Interests
                </span>
                <ScrollArea className="lg:max-h-40 max-h-32 rounded-md overflow-scroll flex flex-col gap-2">
                    {fields.map((field, index) => (
                        <div className="flex flex-row align-top gap-2" key={field.id}>
                            <FormField
                                control={control}
                                name={`interests[${index}].name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Interest" {...field} />
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

                <Button type="button" variant={"outline"} onClick={() => append({ name: "" })}>
                    Add New Interest
                </Button>
                <span className="font-semibold">
                    Financial Goals
                </span>
                {/* <ScrollArea className="lg:max-h-40 max-h-32 rounded-md overflow-scroll flex flex-col gap-2"> */}
                    {goals.map((field, index) => (
                        <div className="flex flex-row align-top gap-2" key={field.id}>
                            <FormField
                                control={control}
                                name={`goals[${index}].name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Goal" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="button" variant={"destructive"} className="mb-auto aspect-square" onClick={() => removeGoal(index)}>
                                <Trash2 className="scale-[2.5]" />
                            </Button>
                        </div>
                    ))}
                {/* </ScrollArea> */}

                <Button type="button" variant={"outline"} onClick={() => {
                    appendGoal({ name: "" })
                }}>
                    Add New Goal
                </Button>
            </div>
        </section>
    )

}

export default Step5;