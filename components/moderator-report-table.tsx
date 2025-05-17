import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {MoreHorizontal, Play} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const reports = [
  {
    id: "REP-2023-101",
    contentId: "VID-2023-101",
    contentTitle: "Documentary Filmmaking Basics",
    reportedBy: "user@example.com",
    reason: "inappropriate",
    status: "pending",
    date: "2023-04-15",
    thumbnail: "/placeholder.svg?height=40&width=72",
  },
  {
    id: "REP-2023-102",
    contentId: "VID-2023-102",
    contentTitle: "Interview Techniques for Filmmakers",
    reportedBy: "creator@example.com",
    reason: "copyright",
    status: "reviewing",
    date: "2023-04-12",
    thumbnail: "/placeholder.svg?height=40&width=72",
  },
  {
    id: "REP-2023-103",
    contentId: "VID-2023-103",
    contentTitle: "Location Scouting Guide",
    reportedBy: "moderator@example.com",
    reason: "harassment",
    status: "completed",
    date: "2023-04-10",
    thumbnail: "/placeholder.svg?height=40&width=72",
  },
]

export function ModeratorReportTable() {
  return (
    <div className="rounded-md border border-border/40">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[80px]">Content</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-[100px]">Reason</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id} className="group">
              <TableCell>
                <div className="relative h-10 w-[72px] rounded overflow-hidden">
                  <img
                    src={report.thumbnail || "/placeholder.svg"}
                    alt={report.contentTitle}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">{report.contentTitle}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {report.reason}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    report.status === "completed"
                      ? "default"
                      : report.status === "reviewing"
                        ? "outline"
                        : "destructive"
                  }
                  className="capitalize"
                >
                  {report.status}
                </Badge>
              </TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>View Content</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Mark as Reviewing</DropdownMenuItem>
                    <DropdownMenuItem>Approve Content</DropdownMenuItem>
                    <DropdownMenuItem>Flag for Admin Review</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
