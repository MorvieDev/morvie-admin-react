"use client"

import type React from "react"
import {useState} from "react"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Film,
  Flag,
  HelpCircle,
  LayoutDashboard,
  Settings,
  Upload,
  Users
} from "lucide-react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"

interface SidebarProps {
  open: boolean
  setOpenAction: (open: boolean) => void
  userRole: "admin" | "moderator"
  userEmail: string
  userName: string
}

interface NavItem {
  icon: React.ElementType
  label: string
  href: string,
  roles: ('admin' | 'moderator')[]
}

export function Sidebar({ open, setOpenAction, userRole, userName, userEmail }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard")

  const navItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/", roles: ["admin", "moderator"] },
    { icon: Film, label: "Videos", href: "/videos", roles: ["admin", "moderator"] },
    { icon: Upload, label: "Upload", href: "/upload", roles: ["moderator"] },
    { icon: Users, label: "Users", href: "/users", roles: ["admin"] },
    { icon: Flag, label: "Reports", href: "/reports", roles: ["moderator", "admin"] },
    { icon: HelpCircle, label: "Help & Guidelines", href: "/help", roles: ["moderator"] },
    { icon: Settings, label: "Settings", href: "/settings", roles: ["admin", "moderator"] },
  ]

  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole))

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-border/40 transition-all duration-300 ease-in-out md:relative",
        open ? "w-64" : "w-[70px]",
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border/40">
        <div className={cn("flex items-center", !open && "justify-center w-full")}>
          {open && (
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Morvie
            </span>
          )}
          {!open && (
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              M
            </span>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={() => setOpenAction(!open)} className="hidden md:flex">
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {filteredNavItems.map((item) => (
            <li key={item.label.toLowerCase()}>
              <Link
                  href={`/${userRole}/${item.href}`}
                  className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  "hover:bg-accent/50 hover:text-accent-foreground",
                  activeItem === item.label.toLowerCase()
                    ? "bg-accent/70 text-accent-foreground"
                    : "text-muted-foreground",
                )}
                onClick={() => setActiveItem(item.label.toLowerCase())}
              >
                <item.icon className={cn("h-5 w-5", open ? "mr-3" : "mx-auto")} />
                {open && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-border/40">
        <div className={cn("flex items-center rounded-lg bg-accent/20 p-2", !open && "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
            A
          </div>
          {open && (
            <div className="ml-3">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
