import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {VideoTable} from "@/components/video-table"
import {StatCard} from "@/components/stat-card"
import {Eye, Film, TrendingUp, Users} from "lucide-react"

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your video content management dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Videos" value="1,284" change="+12.5%" trend="up" icon={Film} />
        <StatCard title="Active Users" value="32.5k" change="+18.2%" trend="up" icon={Users} />
        <StatCard title="Total Views" value="4.2M" change="+32.1%" trend="up" icon={Eye} />
        <StatCard title="Engagement Rate" value="24.3%" change="+4.3%" trend="up" icon={TrendingUp} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Videos</CardTitle>
            <CardDescription>Latest videos uploaded to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <VideoTable />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Video views and engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">Chart placeholder</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
