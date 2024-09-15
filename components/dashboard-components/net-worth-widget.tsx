import { useAuth } from "@/app/infrastructure/auth/auth.context"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function NetWorthWidget() {

  const { user } = useAuth()

  let worth = user?.data.liquidCash - user?.data.debt
  const assets = user?.data.investedAssets || []

  for (const asset of assets) {
    worth += asset.amount
  }

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
          {"Your net worth is"}
        </CardDescription>
        <CardTitle className="text-4xl">
          {formatter.format(worth)}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}