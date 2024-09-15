import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { StepProps } from "@/types/types"
import { CircleXIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";

const Step5: React.FC<StepProps> = ({ form }) => {

    const { control, handleSubmit, register, formState: { errors } } = form;
    const { fields: interests, append, remove } = useFieldArray({
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
                {interests.map((field, index) => (
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
                        <Button type="button" variant={"ghost"} className="mb-auto aspect-square" onClick={() => remove(index)}>
                            <XIcon className="scale-[2.5]" />
                        </Button>
                    </div>
                ))}
                 {interests.length === 0 && errors.interests && (
                    <p className="text-red-500 text-sm">You must add at least one interest.</p>
                )}
                <Button type="button" variant={"outline"} onClick={() => append({ name: "" })}>
                    Add New Interest
                </Button>

                <span className="font-semibold">
                    Financial Goals
                </span>
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
                        <Button type="button" variant={"ghost"} className="mb-auto aspect-square" onClick={() => removeGoal(index)}>
                            <XIcon className="scale-[2.5]" />
                        </Button>
                    </div>
                ))}

                <Button type="button" variant={"outline"} onClick={() => appendGoal({ name: "" })}>
                    Add New Goal
                </Button>

                {/* Error message for when no goals are added */}
                {goals.length === 0 && errors.goals && (
                    <p className="text-red-500 text-sm">You must add at least one goal.</p>
                )}
            </div>
        </section>
    );
}

export default Step5;
