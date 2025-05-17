import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {ModeratorVideoTable} from "@/src/components/moderator-video-table"
import {Button} from "@/src/components/ui/button"
import {Plus} from "lucide-react"
import Link from "next/link"

export default function ModeratorVideos() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Uploads</h1>
          <p className="text-muted-foreground">Manage your uploaded videos</p>
        </div>
        <Button
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          asChild
        >
          <Link href="/upload/moderator">
            <Plus className="mr-2 h-4 w-4" />
            Add New Video
          </Link>
        </Button>
      </div>

      <Card className="border-border/40">
        <CardHeader>
          <CardTitle>My Videos</CardTitle>
          <CardDescription>A list of all videos you've uploaded</CardDescription>
        </CardHeader>
        <CardContent>
          <ModeratorVideoTable />
        </CardContent>
      </Card>
    </div>
  )
}
