import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GenUICard() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Financial Tools</CardTitle>
          <CardDescription>Manage your finances with ease</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground/90 leading-normal prose"> 
          <p className="mb-3">Explore our range of financial management tools designed to help you take control of your finances.</p>
          <p className="mb-3">From budgeting to investment tracking, we&apos;ve got you covered.</p>
          <p className="mb-3">Start your journey to financial wellness today!</p>
        </CardContent>
      </Card>
    </div>
  )
}
