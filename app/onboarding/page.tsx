"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import { useRouter, useSearchParams } from "next/navigation";
import Step5 from "./Steps/Step5";
import { toast } from "sonner";
import { useAuth } from "../infrastructure/auth/auth.context";
import { LoaderCircleIcon } from "lucide-react";

const assetSchema = z.object({
  name: z.string().min(1, "Please enter the asset name."),
  type: z.string().min(1, "Please enter the asset type."),
  amount: z.number().min(0, "Please enter the asset amount."),
});

const interestsSchema = z.object({
  name: z.string().min(1, "Please enter an interest."),
});

const goalsSchema = z.object({
  name: z.string().min(1, "Please enter a goal."),
});

const formSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name."),
  lastName: z.string().min(1, "Please enter your last name."),
  age: z.number().min(18, "You must be over 18 to join NFA."),
  country: z.string().min(2, "Please select your country."),
  jobTitle: z.string().min(1, "Please enter your job title."),
  jobIndustry: z.string().min(1, "Please enter your job industry."),
  salary: z.number().min(0, "Please enter your salary."),
  liquidCash: z.number().min(0, "Please enter your liquid cash."),
  debt: z.number().min(0, "Enter your debt or $0 if you have none."),
  investedAssets: z.array(assetSchema),
  riskTolerance: z.string().min(1, "Please select your risk tolerance."),
  investmentHorizon: z.number().min(1, "Please select your investment horizon."),
  profitPercentageGoal: z.number().min(0, "Please enter your profit percentage goal."),
  monthsOfEmergencySavings: z.number().min(1, "Please enter the number of months of emergency savings."),
  monthlyExpenses: z.number().min(1, "Please enter your monthly expenses."),
  interests: z.array(interestsSchema).nonempty("Please select at least one interest."),
  goals: z.array(goalsSchema).nonempty("Please select at least one goal."),
});

type FormData = z.infer<typeof formSchema>;

export type FormProps = {
  form: ReturnType<typeof useForm<FormData>>;
};

const steps = [Step1, Step2, Step3, Step4, Step5];

function SearchParamsComponent({ setCurrentSection }: { setCurrentSection: (section: number) => void }) {
  const searchParams = useSearchParams();
  const initialSection = parseInt(searchParams.get("step") as string, 10) || 0;
  useEffect(() => {
    setCurrentSection(initialSection);
  }, [initialSection, setCurrentSection]);

  return null;
}

export default function OnboardingForm() {
  const { updateUserDocument } = useAuth()
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: undefined,
      country: "",
      jobTitle: "",
      jobIndustry: "",
      salary: undefined,
      liquidCash: undefined,
      debt: undefined,
      investedAssets: [],
      riskTolerance: "1",
      investmentHorizon: 15,
      profitPercentageGoal: undefined,
      monthsOfEmergencySavings: undefined,
      monthlyExpenses: undefined,
    },
  });

  useEffect(() => {
    // Load form data from localStorage if available
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      form.reset(JSON.parse(savedData));
    }
  }, [form]);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    const subscription = form.watch((data) => {
      console.log('Saving form data to localStorage:', data);
      localStorage.setItem('formData', JSON.stringify(data));
      form.clearErrors();
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    // Update URL with current step
    router.push(`?step=${currentSection}`, undefined);
  }, [currentSection, router]);

  const onSubmit = async (values: FormData) => {
    try {
      setLoading(true);
      await updateUserDocument(values);
      router.push('/dashboard')
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.")
      console.error("Error updating user document:", error);
    } finally {
      setLoading(false);
    }
  };

  const sectionFields: (keyof FormData)[][] = [
    ["firstName", "lastName", "age", "country"],
    ["jobTitle", "jobIndustry", "salary"],
    ["liquidCash", "debt", "investedAssets"],
    ["riskTolerance", "investmentHorizon", "profitPercentageGoal", "monthsOfEmergencySavings", "monthlyExpenses"],
    ["interests", "goals"],
  ];

  const handleNavigation = async (newDirection: number) => {
    const isMovingForward = newDirection > 0;

    if (isMovingForward) {
      const isValid = await form.trigger(sectionFields[currentSection]);
      console.log("isValid", isValid)
      if (!isValid) {
        toast.error("Please fill out all required fields.")
        return;
      }
    }

    setDirection(newDirection);
    setCurrentSection((prev) => prev + newDirection);
  };

  const currentFields = sectionFields[currentSection];

  // Recalculate isNextDisabled
  // const isNextDisabled = currentFields.some((field) => {
  //   const fieldValue = form.getValues(field);
  //   return fieldValue === undefined || fieldValue === "" || form.formState.errors[field] !== undefined;
  // });

  const CurrentStep = steps[currentSection];

  const titles = [
    "Welcome to NFA!",
    `Hey ${form.getValues("firstName")}!`,
    "Financial Snapshot",
    "Investment Preferences",
    "Interests & Goals",
  ]

  const subTitles = [
    "Let's get started with the basics.",
    "Let's get to know you better.",
    "Let's talk about your finances.",
    "Let's talk about your current financial situation.",
    "Let's talk about your interests and goals.",
  ]

  return (
    <div className="flex ">
      <div className="lg:p-8 h-full overflow-auto w-full px-8">


        <div className="mx-auto flex h-full w-full flex-col py-10 space-y-6 px-4 sm:max-w-lg">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {titles[currentSection]}
            </h1>
            <p className="text-sm text-muted-foreground">
              {subTitles[currentSection]}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
              <Suspense fallback={<div>Loading...</div>}>
                <SearchParamsComponent setCurrentSection={setCurrentSection} />
              </Suspense>

              <CurrentStep form={form} />

              <div className="flex justify-between mt-4 ">
                {currentSection > 0 && (
                  <Button type="button" onClick={() => handleNavigation(-1)}>
                    Back
                  </Button>
                )}
                {currentSection < steps.length - 1 ? (
                  <Button
                    type="button"
                    className="ml-auto"
                    onClick={() => {
                      setTimeout(() => {
                        handleNavigation(1)
                      }, 100);
                    }}
                  // disabled={isNextDisabled}
                  >
                    Next
                  </Button>
                ) : (
                  <Button disabled={loading} type="submit" className="ml-auto">
                    {loading ? <LoaderCircleIcon className="animate-spin"/> : 'Submit'}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
