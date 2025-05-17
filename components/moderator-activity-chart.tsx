"use client"

import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts"
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"

const data = [
  { name: "Mon", uploads: 2, reviews: 5 },
  { name: "Tue", uploads: 1, reviews: 8 },
  { name: "Wed", uploads: 3, reviews: 6 },
  { name: "Thu", uploads: 0, reviews: 4 },
  { name: "Fri", uploads: 2, reviews: 7 },
  { name: "Sat", uploads: 1, reviews: 3 },
  { name: "Sun", uploads: 0, reviews: 2 },
]

export function ModeratorActivityChart() {
  return (
    <ChartContainer
      config={{
        uploads: {
          label: "Uploads",
          color: "hsl(var(--chart-1))",
        },
        reviews: {
          label: "Reviews",
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
          <Line type="monotone" dataKey="uploads" stroke="var(--color-uploads)" strokeWidth={2} />
          <Line type="monotone" dataKey="reviews" stroke="var(--color-reviews)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
