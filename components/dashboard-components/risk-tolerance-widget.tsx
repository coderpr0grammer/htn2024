import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function RiskToleranceWidget(
  { personalRisk, portfolioRisk }:
    { personalRisk: number, portfolioRisk: number }
) {

  const delta = personalRisk - portfolioRisk

  return (
    <Card
      className="lg:max-w-md"
    >
      <CardHeader className="space-y-0">
        <CardTitle className="text-2xl">
          {"Risk Tolerance"}
        </CardTitle>
      </CardHeader>
      <CardContent className="items-center justify-between px-6 flex flex-col">
        <div className="flex flex-row gap-2 justify-between w-full">
          <span className="text-sm text-muted-foreground mr-auto">Low Risk</span>
          <span className="text-sm text-muted-foreground ml-auto">High Risk</span>
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div className="absolute left-0 w-2 h-2 rounded-full" style={{ left: `${(personalRisk / 3) * 100}%`, backgroundColor: "hsl(var(--chart-1))" }} />
          <div className="absolute left-0 w-2 h-2 rounded-full" style={{ left: '33.33%', backgroundColor: "hsl(var(--chart-2))" }} />
          <div className="absolute left-0 w-2 h-2 rounded-full" style={{ left: `${(portfolioRisk / 3) * 100}%`, backgroundColor: "hsl(var(--chart-3))" }} />
        </div>
        <div className="flex flex-row gap-2 my-2 justify-around w-full">
          <div className="flex flex-row gap-1 items-center">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--chart-1))" }} />
            <span className="text-sm">Personal</span>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--chart-2))" }} />
            <span className="text-sm">Market</span>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--chart-3))" }} />
            <span className="text-sm">Portfolio</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-4">
        {delta > 0.5 && (
          <CardDescription>
            {"You're current portfolio is much less risky than what you feel comfortable with and could mean unrecognized profits that you could be earning! Consider investing in additional exchanges, or companies you really believe in that you would take a risk on. Remember though, where you're at now isn't bad! You're safe and have a comfortable position!"}
          </CardDescription>
        )}
        {delta > 0.1 && delta <= 0.5 && (
          <CardDescription>
            {"Good job on finding a portfolio that is near your personal risk tolerance (although a little less)! From here, monitor you're portfolio and consider adding any risky investment you've been thinking of making, or, save ;)"}
          </CardDescription>
        )}
        {delta <= 0.1 && delta >= -0.1 && (
          <CardDescription>
            {"Wow great job! You've managed to develop an asset portfolio right around your comfortable level of risk! From here, at least you're comfortable!"}
          </CardDescription>
        )}
        {delta < -0.1 && delta >= -0.5 && (
          <CardDescription>
            {"Be careful! You're portfolio was found to have greater risk than what you're comfortable with. Consider divesting from assets that we've noted as particularly high risk and be sure to watch carefully!"}
          </CardDescription>
        )}
        {delta < -0.5 && (
          <CardDescription>
            {"RED ALERT! You're portfolio was found to be significantly more risky than what you're willing to tolerate. Divesting from you're risky assets and moving money to safer assets would likely be wise decision."}
          </CardDescription>
        )}
      </CardFooter>
    </Card>
  )
}