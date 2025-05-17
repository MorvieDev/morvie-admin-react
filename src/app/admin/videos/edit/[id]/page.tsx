"use client"

import type React from "react"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card"
import {Button} from "@/src/components/ui/button"
import {Input} from "@/src/components/ui/input"
import {Label} from "@/src/components/ui/label"
import {Textarea} from "@/src/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/src/components/ui/select"
import {Switch} from "@/src/components/ui/switch"
import {Separator} from "@/src/components/ui/separator"
import {ArrowLeft, Check, Upload} from "lucide-react"
import {toast} from "@/src/components/ui/use-toast"
import Link from "next/link"
import {Badge} from "@/src/components/ui/badge"

// Mock video data
const videos = [
  {
    id: "VID-2023-001",
    title: "Introduction to Filmmaking",
    description: "Learn the basics of filmmaking in this comprehensive guide for beginners.",
    category: "education",
    tags: ["filmmaking", "tutorial", "beginner"],
    status: "published",
    visibility: "public",
    views: "24.5k",
    likes: "1.2k",
    comments: "342",
    duration: "15:30",
    date: "2023-04-12",
    thumbnail: "/placeholder.svg?height=180&width=320",
    allowComments: true,
    allowRatings: true,
    monetized: true,
  },
  {
    id: "VID-2023-002",
    title: "Advanced Cinematography Techniques",
    description: "Explore advanced cinematography techniques used by professional filmmakers.",
    category: "education",
    tags: ["cinematography", "advanced", "filmmaking"],
    status: "published",
    visibility: "public",
    views: "18.2k",
    likes: "950",
    comments: "215",
    duration: "22:15",
    date: "2023-04-10",
    thumbnail: "/placeholder.svg?height=180&width=320",
    allowComments: true,
    allowRatings: true,
    monetized: false,
  },
  {
    id: "VID-2023-003",
    title: "Lighting for Dramatic Scenes",
    description: "Master the art of lighting to create dramatic and emotional scenes in your films.",
    category: "education",
    tags: ["lighting", "filmmaking", "drama"],
    status: "processing",
    visibility: "unlisted",
    views: "12.7k",
    likes: "830",
    comments: "178",
    duration: "18:45",
    date: "2023-04-08",
    thumbnail: "/placeholder.svg?height=180&width=320",
    allowComments: true,
    allowRatings: true,
    monetized: true,
  },
]

export default function EditVideoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const videoId = params.id
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [video, setVideo] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    status: "",
    visibility: "",
    allowComments: false,
    allowRatings: false,
    monetized: false,
  })

  useEffect(() => {
    // In a real app, this would be an API call to fetch the video
    const foundVideo = videos.find((v) => v.id === videoId)
    if (foundVideo) {
      setVideo(foundVideo)
      setFormData({
        title: foundVideo.title,
        description: foundVideo.description,
        category: foundVideo.category,
        tags: foundVideo.tags.join(", "),
        status: foundVideo.status,
        visibility: foundVideo.visibility,
        allowComments: foundVideo.allowComments,
        allowRatings: foundVideo.allowRatings,
        monetized: foundVideo.monetized,
      })
    } else {
      toast({
        title: "Error",
        description: "Video not found",
        variant: "destructive",
      })
      router.push("/videos/admin")
    }
  }, [videoId, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    try {
      // In a real app, this would be an API call to update the video
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Success",
        description: `Video "${formData.title}" has been updated successfully`,
      })

      // Redirect to videos page
      router.push("/videos/admin")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update video. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!video) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/videos/admin">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Video</h1>
          <p className="text-muted-foreground">Update video information and settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-border/40">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Video Information</CardTitle>
              <CardDescription>Edit the details of your video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" name="tags" value={formData.tags} onChange={handleChange} />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select
                    value={formData.visibility}
                    onValueChange={(value) => handleSelectChange("visibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Video Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-comments">Allow Comments</Label>
                      <p className="text-xs text-muted-foreground">Let viewers comment on this video</p>
                    </div>
                    <Switch
                      id="allow-comments"
                      checked={formData.allowComments}
                      onCheckedChange={(checked) => handleSwitchChange("allowComments", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-ratings">Allow Ratings</Label>
                      <p className="text-xs text-muted-foreground">Let viewers like or dislike this video</p>
                    </div>
                    <Switch
                      id="allow-ratings"
                      checked={formData.allowRatings}
                      onCheckedChange={(checked) => handleSwitchChange("allowRatings", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="monetized">Monetization</Label>
                      <p className="text-xs text-muted-foreground">Enable ads and monetization for this video</p>
                    </div>
                    <Switch
                      id="monetized"
                      checked={formData.monetized}
                      onCheckedChange={(checked) => handleSwitchChange("monetized", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/videos/admin")}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
                {!isSubmitting && <Check className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>Video Preview</CardTitle>
              <CardDescription>Current thumbnail and stats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md overflow-hidden">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Views</p>
                  <p className="font-medium">{video.views}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Likes</p>
                  <p className="font-medium">{video.likes}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Comments</p>
                  <p className="font-medium">{video.comments}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">{video.duration}</p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-muted-foreground text-sm">Uploaded on</p>
                <p className="font-medium">{new Date(video.date).toLocaleDateString()}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Change Thumbnail
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>Video ID</CardTitle>
              <CardDescription>Technical information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-muted-foreground text-sm">Video ID</p>
                  <p className="font-mono text-sm">{video.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Status</p>
                  <Badge
                    variant={
                      video.status === "published" ? "default" : video.status === "processing" ? "outline" : "secondary"
                    }
                    className="mt-1 capitalize"
                  >
                    {video.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
