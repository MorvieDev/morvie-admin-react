import {Card, CardContent} from "@/components/ui/card"
import {cn} from "@/lib/utils"
import type {LucideIcon} from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: LucideIcon
}

export function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
  return (
    <Card className="overflow-hidden border-border/40 hover:border-border/80 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-accent/30 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="mt-4">
          <span
            className={cn(
              "text-xs font-medium",
              trend === "up" && "text-emerald-500",
              trend === "down" && "text-rose-500",
              trend === "neutral" && "text-muted-foreground",
            )}
          >
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
