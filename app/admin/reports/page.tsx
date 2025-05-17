import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {ReportTable} from "@/components/report-table"

export default function AdminReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Review and manage content reports</p>
      </div>

      <Card className="border-border/40">
        <CardHeader>
          <CardTitle>Content Reports</CardTitle>
          <CardDescription>Reports submitted by users about content violations</CardDescription>
        </CardHeader>
        <CardContent>
          <ReportTable />
        </CardContent>
      </Card>
    </div>
  )
}
