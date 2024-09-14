"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name must be at least 1 character.",
  }),
  lastName: z.string().min(1, {
    message: "Last name must be at least 1 character.",
  }),
  age: z.number().min(18, {
    message: "You must be over 18 to use our application.",
  }),
  country: z.string().min(2, {
    message: "Country must be selected.",
  }),

  jobTitle: z.string().min(1, {
    message: "Job title must be at least 1 character.",
  }),
  jobIndustry: z.string().min(1, {
    message: "Job industry must be at least 1 character.",
  }),
  salary: z.number().min(0, {
    message: "Salary must be a positive number.",
  }),

  liquidCash: z.number().min(0, {
    message: "Liquid cash must be a positive number.",
  }),
  debt: z.number().min(0, {
    message: "Debt must be a positive number.",
  }),
  investedAssets: z.number().min(0, {
    message: "Invested assets must be a positive number.",
  }),

  riskTolerance: z.string().min(1, {
    message: "Risk tolerance must be low, medium, or high.",
  }),
  investmentHorizon: z.string().min(1, {
    message: "Investment horizon must be short, medium, or long.",
  }),
  profitPercentageGoal: z.number().min(0, {
    message: "Profit percentage goal must be a positive number.",
  }),
})

export default function OnboardingForm() {
  const [currentSection, setCurrentSection] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: undefined,
      country: "",
      jobTitle: "",
      jobIndustry: "",
      salary: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  async function handleNext() {
    const sectionFields = [
      ["firstName", "lastName", "age", "country"],
      ["jobTitle", "jobIndustry", "salary"],
      ["liquidCash", "debt", "investedAssets"],
      ["riskTolerance", "investmentHorizon", "profitPercentageGoal"],
    ]

    const isValid = await form.trigger(sectionFields[currentSection])
    if (isValid) {
      setCurrentSection(currentSection + 1)
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section style={{ display: currentSection === 0 ? "block" : "none" }}>
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
                    <Input type="number" placeholder="30" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Country" />
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
          <section style={{ display: currentSection === 1 ? "block" : "none" }}>
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
                      <Input type="number" placeholder="100000" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
          <section style={{ display: currentSection === 2 ? "block" : "none" }}>
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
              <FormField
                control={form.control}
                name="investedAssets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invested Assets</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="10000" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
          <section style={{ display: currentSection === 3 ? "block" : "none" }}>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="riskTolerance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk Tolerance</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Risk Tolerance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
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
          <div className="flex justify-between">
            {currentSection > 0 && (
              <Button type="button" className="mr-auto" onClick={() => setCurrentSection(currentSection - 1)}>
                Back
              </Button>
            )}
            {currentSection < 3 && (
              <Button type="button" className="ml-auto" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentSection === 3 && (
              <Button type="submit" className="ml-auto">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}