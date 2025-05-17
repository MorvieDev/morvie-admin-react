"use client"

import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts"
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/src/components/ui/chart"

const data = [
  { name: "Jan", views: 4000, engagement: 2400 },
  { name: "Feb", views: 3000, engagement: 1398 },
  { name: "Mar", views: 2000, engagement: 9800 },
  { name: "Apr", views: 2780, engagement: 3908 },
  { name: "May", views: 1890, engagement: 4800 },
  { name: "Jun", views: 2390, engagement: 3800 },
  { name: "Jul", views: 3490, engagement: 4300 },
]

export function DashboardChart() {
  return (
    <ChartContainer
      config={{
        views: {
          label: "Views",
          color: "hsl(var(--chart-1))",
        },
        engagement: {
          label: "Engagement",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="views" stroke="var(--color-views)" strokeWidth={2} />
          <Line type="monotone" dataKey="engagement" stroke="var(--color-engagement)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
