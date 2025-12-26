import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {VideoTable} from "@/components/video-table"
import {StatCard} from "@/components/stat-card"
import {Eye, Film, TrendingUp, Users} from "lucide-react"
import {DashboardChart} from "@/components/dashboard-chart"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your video content management dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Videos" value="1,284" change="+12.5%" trend="up" icon={Film} />
        <StatCard title="Active Users" value="32.5k" change="+18.2%" trend="up" icon={Users} />
        <StatCard title="Total Views" value="4.2M" change="+32.1%" trend="up" icon={Eye} />
        <StatCard title="Engagement Rate" value="24.3%" change="+4.3%" trend="up" icon={TrendingUp} />
      </div>

      <Card className="border-border/40">
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Video views and engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardChart />
        </CardContent>
      </Card>

      <Card className="border-border/40">
        <CardHeader>
          <CardTitle>Recent Videos</CardTitle>
          <CardDescription>Latest videos uploaded to the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <VideoTable />
        </CardContent>
      </Card>
    </div>
  )
}
