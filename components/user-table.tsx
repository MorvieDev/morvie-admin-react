"use client"

import {useState} from "react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {MoreHorizontal, Shield, ShieldAlert, User} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {type Permission, RoleManagementModal, type UserData, type UserRole} from "./role-management-modal"
import {toast} from "@/components/ui/use-toast"
import {useRouter} from "next/navigation"

const users = [
  {
    id: "USR-2023-001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin" as UserRole,
    status: "active",
    joinDate: "2023-01-15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "USR-2023-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "moderator" as UserRole,
    status: "active",
    joinDate: "2023-02-20",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "USR-2023-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "creator" as UserRole,
    status: "active",
    joinDate: "2023-03-10",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "USR-2023-004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "user" as UserRole,
    status: "suspended",
    joinDate: "2023-03-15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "USR-2023-005",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "creator" as UserRole,
    status: "banned",
    joinDate: "2023-04-05",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function UserTable() {
  const router = useRouter()
  const [usersList, setUsersList] = useState(users)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [roleModalOpen, setRoleModalOpen] = useState(false)

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <ShieldAlert className="h-4 w-4 text-red-500" />
      case "moderator":
        return <Shield className="h-4 w-4 text-amber-500" />
      default:
        return <User className="h-4 w-4 text-blue-500" />
    }
  }

  const handleViewProfile = (userId: string) => {
    console.log(`Viewing profile for user ${userId}`)
    // Implement view profile functionality
    toast({
      title: "View Profile",
      description: `Viewing profile for user ${userId}`,
    })
  }

  const handleEditUser = (userId: string) => {
    router.push(`/users/admin/edit/${userId}`)
  }

  const handleChangeRole = (userId: string) => {
    const user = usersList.find((u) => u.id === userId)
    if (user) {
      setSelectedUser(user)
      setRoleModalOpen(true)
    }
  }

  const handleSuspendUser = (userId: string) => {
    setUsersList(usersList.map((user) => (user.id === userId ? { ...user, status: "suspended" } : user)))
    toast({
      title: "User Suspended",
      description: `User ${userId} has been suspended`,
      variant: "destructive",
    })
  }

  const handleReactivateUser = (userId: string) => {
    setUsersList(usersList.map((user) => (user.id === userId ? { ...user, status: "active" } : user)))
    toast({
      title: "User Reactivated",
      description: `User ${userId} has been reactivated`,
      variant: "default",
    })
  }

  const handleBanUser = (userId: string) => {
    setUsersList(usersList.map((user) => (user.id === userId ? { ...user, status: "banned" } : user)))
    toast({
      title: "User Banned",
      description: `User ${userId} has been banned`,
      variant: "destructive",
    })
  }

  const handleSaveRoleChanges = (userId: string, role: UserRole, permissions: Permission[]) => {
    // Update the user's role in the list
    setUsersList(usersList.map((user) => (user.id === userId ? { ...user, role } : user)))

    // Log the permissions that would be saved
    console.log("Updated permissions:", permissions)

    toast({
      title: "Role Updated",
      description: `User ${userId} role changed to ${role}`,
    })
  }

  return (
    <>
      <div className="rounded-md border border-border/40">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[50px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-[100px]">Role</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[100px]">Join Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersList.map((user) => (
              <TableRow key={user.id} className="group">
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {getRoleIcon(user.role)}
                    <span className="capitalize">{user.role}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active" ? "default" : user.status === "suspended" ? "outline" : "destructive"
                    }
                    className="capitalize"
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleViewProfile(user.id)}>View Profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditUser(user.id)}>Edit User</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeRole(user.id)}>
                        Change Role & Permissions
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status === "active" ? (
                        <DropdownMenuItem onClick={() => handleSuspendUser(user.id)} className="text-amber-500">
                          Suspend User
                        </DropdownMenuItem>
                      ) : user.status === "suspended" ? (
                        <DropdownMenuItem onClick={() => handleReactivateUser(user.id)} className="text-green-500">
                          Reactivate User
                        </DropdownMenuItem>
                      ) : null}
                      <DropdownMenuItem onClick={() => handleBanUser(user.id)} className="text-destructive">
                        Ban User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <RoleManagementModal
        user={selectedUser}
        open={roleModalOpen}
        onOpenChange={setRoleModalOpen}
        onSave={handleSaveRoleChanges}
      />
    </>
  )
}
