import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/src/components/ui/table"
import {Badge} from "@/src/components/ui/badge"
import {Button} from "@/src/components/ui/button"
import {MoreHorizontal, Play} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

const videos = [
  {
    id: "VID-2023-101",
    title: "Documentary Filmmaking Basics",
    status: "approved",
    views: "8.3k",
    date: "2023-04-15",
    thumbnail: "/placeholder.svg?height=40&width=72",
  },
  {
    id: "VID-2023-102",
    title: "Interview Techniques for Filmmakers",
    status: "approved",
    views: "5.7k",
    date: "2023-04-12",
    thumbnail: "/placeholder.svg?height=40&width=72",
  },
  {
    id: "VID-2023-103",
    title: "Location Scouting Guide",
    status: "pending",
    views: "0",
    date: "2023-04-10",
    thumbnail: "/placeholder.svg?height=40&width=72",
  },
  {
    id: "VID-2023-104",
    title: "Editing for Beginners",
    status: "pending",
    views: "0",
    date: "2023-04-08",
    thumbnail: "/placeholder.svg?height=40&width=72",
  },
]

export function ModeratorVideoTable() {
  return (
    <div className="rounded-md border border-border/40">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[80px]">Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[80px] text-right">Views</TableHead>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.id} className="group">
              <TableCell>
                <div className="relative h-10 w-[72px] rounded overflow-hidden">
                  <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="object-cover" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">{video.title}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    video.status === "approved" ? "default" : video.status === "pending" ? "outline" : "secondary"
                  }
                  className="capitalize"
                >
                  {video.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{video.views}</TableCell>
              <TableCell>{video.date}</TableCell>
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
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
