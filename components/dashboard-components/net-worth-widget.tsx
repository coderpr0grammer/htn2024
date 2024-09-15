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
      className="h-full flex items-center justify-center"
    >
      <CardContent className="text-center">
        <CardDescription className="mb-2">
          Your net worth is
        </CardDescription>
        <CardTitle className="text-4xl">
          {formatter.format(worth)}
        </CardTitle>
      </CardContent>
    </Card>
  )
}