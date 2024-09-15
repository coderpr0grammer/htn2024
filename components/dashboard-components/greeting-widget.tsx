import { useAuth } from "@/app/infrastructure/auth/auth.context"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function GreetingWidget() {

  const greeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening"

  const { user } = useAuth()

  return (
    <Card
      className="lg:max-w-md"
    >
      <CardHeader className="space-y-0">
        <CardTitle className="text-2xl">
          {greeting}, {user?.data.name}!
        </CardTitle>
        <CardDescription>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}