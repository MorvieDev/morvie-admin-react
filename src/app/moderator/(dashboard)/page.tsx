import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {ModeratorVideoTable} from "@/src/components/moderator-video-table"
import {StatCard} from "@/src/components/stat-card"
import {CheckCircle, Clock, Film, Flag} from "lucide-react"
import {ModeratorActivityChart} from "@/src/components/moderator-activity-chart"

export default function ModeratorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Moderator Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your content moderation dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="My Uploads" value="24" change="+3" trend="up" icon={Film} />
        <StatCard title="Approved" value="18" change="+2" trend="up" icon={CheckCircle} />
        <StatCard title="Pending" value="6" change="+1" trend="up" icon={Clock} />
        <StatCard title="Reports to Review" value="12" change="-3" trend="down" icon={Flag} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-border/40">
          <CardHeader>
            <CardTitle>My Recent Uploads</CardTitle>
            <CardDescription>Videos you've recently added to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ModeratorVideoTable />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-border/40">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Your moderation activity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ModeratorActivityChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
