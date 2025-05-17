"use client"

import type React from "react"
import {useState} from "react"
import {Bell, Check, Clock, Film, Flag, Info, User} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {cn} from "@/lib/utils"
import {useRouter} from "next/navigation"

type NotificationType = "video" | "user" | "report" | "system"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
}

export function NotificationPanel() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "n1",
      type: "video",
      title: "New Video Uploaded",
      message: "A new video 'Advanced Editing Techniques' has been uploaded and needs review.",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "n2",
      type: "report",
      title: "Content Reported",
      message: "A video has been reported for inappropriate content. Please review.",
      time: "30 minutes ago",
      read: false,
    },
    {
      id: "n3",
      type: "user",
      title: "New User Registration",
      message: "John Doe has registered as a new content creator.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "n4",
      type: "system",
      title: "System Update",
      message: "The platform will undergo maintenance tonight at 2 AM UTC.",
      time: "1 day ago",
      read: true,
    },
  ])
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const viewAllNotifications = () => {
    // Navigate to notifications page
    alert("Viewing all notifications")
    setIsOpen(false)
  }

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "video":
        return <Film className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
      case "report":
        return <Flag className="h-4 w-4" />
      case "system":
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4">
          <DropdownMenuLabel className="text-base">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn("flex flex-col items-start p-4 focus:bg-accent", !notification.read && "bg-accent/30")}
              >
                <div className="flex w-full items-start gap-2">
                  <div
                    className={cn(
                      "mt-0.5 rounded-full p-1",
                      notification.type === "video" && "bg-blue-500/20 text-blue-500",
                      notification.type === "user" && "bg-green-500/20 text-green-500",
                      notification.type === "report" && "bg-amber-500/20 text-amber-500",
                      notification.type === "system" && "bg-purple-500/20 text-purple-500",
                    )}
                  >
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => markAsRead(notification.id, e)}
                        >
                          <Check className="h-3 w-3" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    <div className="mt-1 flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {notification.time}
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-2 text-center" onSelect={viewAllNotifications}>
          <Button variant="ghost" size="sm" className="w-full justify-center">
            View all notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
