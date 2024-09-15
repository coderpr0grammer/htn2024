"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import { useRouter, useSearchParams } from "next/navigation";

const assetSchema = z.object({
  name: z.string().min(1, "Please enter the asset name."),
  type: z.string().min(1, "Please enter the asset type."),
  amount: z.number().min(0, "Please enter the asset amount."),
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
  investedAssets: z.array(assetSchema).nonempty("Please add at least one asset."),
  riskTolerance: z.string().min(1, "Please select your risk tolerance."),
  investmentHorizon: z.string().min(1, "Please select your investment horizon."),
  profitPercentageGoal: z.number().min(0, "Please enter your profit percentage goal."),
});

type FormData = z.infer<typeof formSchema>;

export type FormProps = {
  form: ReturnType<typeof useForm<FormData>>;
};

const steps = [Step1, Step2, Step3, Step4];

function SearchParamsComponent({ setCurrentSection }: { setCurrentSection: (section: number) => void }) {
  const searchParams = useSearchParams();
  const initialSection = parseInt(searchParams.get("step") as string, 10) || 0;
  useEffect(() => {
    setCurrentSection(initialSection);
  }, [initialSection, setCurrentSection]);

  return null;
}

export default function OnboardingForm() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);

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
      investedAssets: undefined,
      riskTolerance: "",
      investmentHorizon: "",
      profitPercentageGoal: undefined,
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

  const onSubmit = (values: FormData) => {
    console.log(values);
    // Handle final submission
  };

  const sectionFields: (keyof FormData)[][] = [
    ["firstName", "lastName", "age", "country"],
    ["jobTitle", "jobIndustry", "salary"],
    ["liquidCash", "debt", "investedAssets"],
    ["riskTolerance", "investmentHorizon", "profitPercentageGoal"],
  ];

  const handleNavigation = async (newDirection: number) => {
    const isMovingForward = newDirection > 0;
    if (isMovingForward) {
      const isValid = await form.trigger(sectionFields[currentSection]);
      if (!isValid) return;
    }
    setDirection(newDirection);
    setCurrentSection((prev) => prev + newDirection);
  };

  const currentFields = sectionFields[currentSection];

  // Recalculate isNextDisabled
  const isNextDisabled = currentFields.some((field) => {
    const fieldValue = form.getValues(field);
    return fieldValue === undefined || fieldValue === "" || form.formState.errors[field] !== undefined;
  });

  const CurrentStep = steps[currentSection];

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="lg:p-8 h-[100dvh] w-full px-8">
        <div className="mx-auto flex h-full w-full flex-col justify-center space-y-6 px-4 sm:max-w-lg">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome to NFA.
            </h1>
            <p className="text-sm text-muted-foreground">
              {"Let's get started with the basics."}
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
                    disabled={isNextDisabled}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto">
                    Submit
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
