"use client"

import {useState} from "react"
import {Input} from "@/src/components/ui/input"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/ui/select"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/src/components/ui/tabs"
import {ModeratorReportTable} from "@/src/components/moderator-report-table"
import {AlertCircle, Search} from "lucide-react"
import {Alert, AlertDescription, AlertTitle} from "@/src/components/ui/alert"

export default function ModeratorReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Content Reports</h1>
        <p className="text-muted-foreground">Review reported content that needs moderation</p>
      </div>

      <Alert className="border-amber-600/20 bg-amber-600/10">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-600">Moderation Guidelines</AlertTitle>
        <AlertDescription className="text-amber-600/90">
          Please review all reports carefully and follow the community guidelines when making decisions.
        </AlertDescription>
      </Alert>

      <Card className="border-border/40">
        <CardHeader>
          <CardTitle>Reports Queue</CardTitle>
          <CardDescription>Review and take action on reported content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="inappropriate">Inappropriate</SelectItem>
                  <SelectItem value="copyright">Copyright</SelectItem>
                  <SelectItem value="violence">Violence</SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="reviewing">In Review</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4">
              <ModeratorReportTable />
            </TabsContent>
            <TabsContent value="reviewing" className="mt-4">
              <ModeratorReportTable />
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <ModeratorReportTable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
