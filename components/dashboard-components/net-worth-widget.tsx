import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function NetWorthWidget(
  { worth }:
    { worth: number }
) {

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })

  return (
    <Card
      className="lg:max-w-md"
    >
      <CardHeader className="space-y-0">
        <CardDescription>
          {"Your net worth is:"}
        </CardDescription>
        <CardTitle className="text-4xl">
          {formatter.format(worth)}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}