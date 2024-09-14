import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutCard() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>About NFA</CardTitle>
          <CardDescription>Finance for the rest of us</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground/90 leading-normal prose"> 
          <p className="mb-3">NFA is a simple financial tool designed to help you understand and manage your finances better.</p>
          <p className="mb-3">Our goal is to provide easy-to-use tools and insights that make financial planning accessible to everyone, regardless of their financial expertise.</p>
          <p className="mb-3 font-semibold">Key Features:</p>
          <ul className="flex flex-col mb-2">
            <li>→ Personalized financial insights</li>
            <li>→ Easy-to-use budgeting tools</li>
            <li>→ Simple investment guidance</li>
            <li>→ Jargon-free financial education</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
