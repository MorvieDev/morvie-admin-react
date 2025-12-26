"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {Menu, Search, User} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {NotificationPanel} from "@/components/notification-panel"

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpenAction: (open: boolean) => void
}

export function Header({ sidebarOpen, setSidebarOpenAction }: HeaderProps) {
  const pathname = usePathname()

  const isAdmin = pathname.includes("/admin")
  const profilePath = isAdmin ? "/admin/profile" : "/moderator/profile"
  const settingsPath = isAdmin ? "/admin/settings" : "/moderator/settings"

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 bg-background px-4 sm:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpenAction(!sidebarOpen)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex-1 md:grow-0 md:w-72">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-full bg-background pl-8 md:w-72 lg:w-80" />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <NotificationPanel />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={profilePath}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={settingsPath}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/frontend/public" className="text-red-500 hover:text-red-600">
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
