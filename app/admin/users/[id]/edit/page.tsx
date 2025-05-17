"use client"

import type React from "react"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"
import {Separator} from "@/components/ui/separator"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {ArrowLeft, Check, Shield, ShieldAlert, User} from "lucide-react"
import {toast} from "@/components/ui/use-toast"
import Link from "next/link"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Badge} from "@/components/ui/badge"

// Mock user data
const users = [
  {
    id: "USR-2023-001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    joinDate: "2023-01-15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "USR-2023-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "moderator",
    status: "active",
    joinDate: "2023-02-20",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "USR-2023-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "creator",
    status: "active",
    joinDate: "2023-03-10",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "USR-2023-004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "user",
    status: "suspended",
    joinDate: "2023-03-15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "USR-2023-005",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "creator",
    status: "banned",
    joinDate: "2023-04-05",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const userId = params.id
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    isEmailVerified: false,
    isTwoFactorEnabled: false,
  })

  useEffect(() => {
    // In a real app, this would be an API call to fetch the user
    const foundUser = users.find((u) => u.id === userId)
    if (foundUser) {
      setUser(foundUser)
      setFormData({
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        status: foundUser.status,
        isEmailVerified: true,
        isTwoFactorEnabled: false,
      })
    } else {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      })
      router.push("/users/admin")
    }
  }, [userId, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.name || !formData.email) {
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
      // In a real app, this would be an API call to update the user
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Success",
        description: `User ${formData.name} has been updated successfully`,
      })

      // Redirect to users page
      router.push("/users/admin")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/users/admin">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit User</h1>
          <p className="text-muted-foreground">Update user information and permissions</p>
        </div>
      </div>

      <Card className="border-border/40">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>User ID: {user.id}</CardDescription>
              </div>
              <Badge variant="outline" className="ml-auto capitalize">
                Joined {new Date(user.joinDate).toLocaleDateString()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">User Role</h3>
              <RadioGroup value={formData.role} onValueChange={handleRoleChange} className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="flex items-center gap-2 cursor-pointer">
                    <ShieldAlert className="h-4 w-4 text-red-500" />
                    <div>
                      <span className="font-medium">Admin</span>
                      <p className="text-xs text-muted-foreground">Full system access and control</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="moderator" id="moderator" />
                  <Label htmlFor="moderator" className="flex items-center gap-2 cursor-pointer">
                    <Shield className="h-4 w-4 text-amber-500" />
                    <div>
                      <span className="font-medium">Moderator</span>
                      <p className="text-xs text-muted-foreground">Content moderation access</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="creator" id="creator" />
                  <Label htmlFor="creator" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4 text-green-500" />
                    <div>
                      <span className="font-medium">Creator</span>
                      <p className="text-xs text-muted-foreground">Can upload and manage own content</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4 text-blue-500" />
                    <div>
                      <span className="font-medium">User</span>
                      <p className="text-xs text-muted-foreground">Basic access, no special privileges</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Status</h3>
              <RadioGroup value={formData.status} onValueChange={handleStatusChange} className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="cursor-pointer">
                    <span className="font-medium">Active</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="suspended" id="suspended" />
                  <Label htmlFor="suspended" className="cursor-pointer">
                    <span className="font-medium">Suspended</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="banned" id="banned" />
                  <Label htmlFor="banned" className="cursor-pointer">
                    <span className="font-medium">Banned</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-verified">Email Verified</Label>
                    <p className="text-xs text-muted-foreground">User has verified their email address</p>
                  </div>
                  <Switch
                    id="email-verified"
                    checked={formData.isEmailVerified}
                    onCheckedChange={(checked) => handleSwitchChange("isEmailVerified", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">User has enabled two-factor authentication</p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={formData.isTwoFactorEnabled}
                    onCheckedChange={(checked) => handleSwitchChange("isTwoFactorEnabled", checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/users/admin")}>
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
    </div>
  )
}
