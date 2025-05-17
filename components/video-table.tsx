"use client"

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
import {useRouter} from "next/navigation"
import {toast} from "@/components/ui/use-toast"

const videos = [
  {
    id: "VID-2023-001",
    title: "Introduction to Filmmaking",
    status: "published",
    views: "24.5k",
    date: "2023-04-12",
    thumbnail: "/placeholder.svg?height=40&width=72",
  },
  {
    id: "VID-2023-002",
    title: "Advanced Cinematography Techniques",
    status: "published",
    views: "18.2k",
    date: "2023-04-10",
    thumbnail: "/placeholder.svg?height=40&width=72",
  },
  {
    id: "VID-2023-003",
    title: "Lighting for Dramatic Scenes",
    status: "processing",
    views: "12.7k",
    date: "2023-04-08",
    thumbnail: "/placeholder.svg?height=40&width=72",
  },
  {
    id: "VID-2023-004",
    title: "Sound Design Masterclass",
    status: "draft",
    views: "8.3k",
    date: "2023-04-05",
    thumbnail: "/placeholder.svg?height=40&width=72",
  },
  {
    id: "VID-2023-005",
    title: "Color Grading for Film",
    status: "published",
    views: "15.9k",
    date: "2023-04-02",
    thumbnail: "/placeholder.svg?height=40&width=72",
  },
]

export function VideoTable() {
  const router = useRouter()

  const handleEdit = (videoId: string) => {
    router.push(`/videos/admin/edit/${videoId}`)
  }

  const handleDuplicate = (videoId: string) => {
    toast({
      title: "Video Duplicated",
      description: `Video ${videoId} has been duplicated`,
    })
  }

  const handleArchive = (videoId: string) => {
    toast({
      title: "Video Archived",
      description: `Video ${videoId} has been archived`,
    })
  }

  const handleDelete = (videoId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this video? This action cannot be undone.")
    if (confirm) {
      toast({
        title: "Video Deleted",
        description: `Video ${videoId} has been deleted`,
        variant: "destructive",
      })
    }
  }

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
                    video.status === "published" ? "default" : video.status === "processing" ? "outline" : "secondary"
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
                    <DropdownMenuItem onClick={() => handleEdit(video.id)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicate(video.id)}>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleArchive(video.id)}>Archive</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDelete(video.id)} className="text-destructive">
                      Delete
                    </DropdownMenuItem>
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
