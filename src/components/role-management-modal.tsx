"use client"

import {useState} from "react"
import {Check, Shield, ShieldAlert, User, X} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/src/components/ui/dialog"
import {Button} from "@/src/components/ui/button"
import {Label} from "@/src/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/src/components/ui/radio-group"
import {Switch} from "@/src/components/ui/switch"
import {Separator} from "@/src/components/ui/separator"
import {Avatar, AvatarFallback, AvatarImage} from "@/src/components/ui/avatar"
import {Badge} from "@/src/components/ui/badge"

export type UserRole = "admin" | "moderator"

export interface Permission {
  id: string
  name: string
  description: string
  enabled: boolean
}

export interface UserData {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface RoleManagementModalProps {
  user: UserData | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (userId: string, role: UserRole, permissions: Permission[]) => void
}

// Define permission sets for each role
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    { id: "manage_users", name: "Manage Users", description: "Create, edit, and delete users", enabled: true },
    {
      id: "manage_content",
      name: "Manage Content",
      description: "Approve, edit, and delete all content",
      enabled: true,
    },
    { id: "manage_settings", name: "Manage Settings", description: "Change system settings", enabled: true },
    { id: "view_analytics", name: "View Analytics", description: "Access analytics and reports", enabled: true },
    { id: "manage_roles", name: "Manage Roles", description: "Change user roles and permissions", enabled: true },
  ],
  moderator: [
    { id: "manage_users", name: "Manage Users", description: "Create, edit, and delete users", enabled: false },
    {
      id: "manage_content",
      name: "Manage Content",
      description: "Approve, edit, and delete all content",
      enabled: true,
    },
    { id: "manage_settings", name: "Manage Settings", description: "Change system settings", enabled: false },
    { id: "view_analytics", name: "View Analytics", description: "Access analytics and reports", enabled: true },
    { id: "manage_roles", name: "Manage Roles", description: "Change user roles and permissions", enabled: false },
  ],
  // creator: [
  //   { id: "manage_users", name: "Manage Users", description: "Create, edit, and delete users", enabled: false },
  //   {
  //     id: "manage_content",
  //     name: "Manage Content",
  //     description: "Approve, edit, and delete all content",
  //     enabled: false,
  //   },
  //   { id: "manage_settings", name: "Manage Settings", description: "Change system settings", enabled: false },
  //   { id: "view_analytics", name: "View Analytics", description: "Access analytics and reports", enabled: false },
  //   { id: "manage_roles", name: "Manage Roles", description: "Change user roles and permissions", enabled: false },
  //   { id: "upload_content", name: "Upload Content", description: "Upload new videos and content", enabled: true },
  //   { id: "edit_own_content", name: "Edit Own Content", description: "Edit own uploaded content", enabled: true },
  // ],
  // user: [
  //   { id: "manage_users", name: "Manage Users", description: "Create, edit, and delete users", enabled: false },
  //   {
  //     id: "manage_content",
  //     name: "Manage Content",
  //     description: "Approve, edit, and delete all content",
  //     enabled: false,
  //   },
  //   { id: "manage_settings", name: "Manage Settings", description: "Change system settings", enabled: false },
  //   { id: "view_analytics", name: "View Analytics", description: "Access analytics and reports", enabled: false },
  //   { id: "manage_roles", name: "Manage Roles", description: "Change user roles and permissions", enabled: false },
  //   { id: "upload_content", name: "Upload Content", description: "Upload new videos and content", enabled: false },
  //   { id: "edit_own_content", name: "Edit Own Content", description: "Edit own uploaded content", enabled: false },
  // ],
}

export function RoleManagementModal({ user, open, onOpenChange, onSave }: RoleManagementModalProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(user?.role || "admin")
  const [permissions, setPermissions] = useState<Permission[]>(
    user ? [...rolePermissions[user.role]] : [...rolePermissions.admin],
  )

  // Reset state when user changes
  useState(() => {
    if (user) {
      setSelectedRole(user.role)
      setPermissions([...rolePermissions[user.role]])
    }
  })

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role)
    // Update permissions based on the selected role
    setPermissions([...rolePermissions[role]])
  }

  const handlePermissionToggle = (permissionId: string) => {
    setPermissions(
      permissions.map((permission) =>
        permission.id === permissionId ? { ...permission, enabled: !permission.enabled } : permission,
      ),
    )
  }

  const handleSave = () => {
    if (user) {
      onSave(user.id, selectedRole, permissions)
      onOpenChange(false)
    }
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "admin":
        return <ShieldAlert className="h-4 w-4 text-red-500" />
      case "moderator":
        return <Shield className="h-4 w-4 text-amber-500" />
      // case "creator":
      //   return <User className="h-4 w-4 text-green-500" />
      // default:
      //   return <User className="h-4 w-4 text-blue-500" />
    }
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage User Role & Permissions</DialogTitle>
          <DialogDescription>Change role and permissions for this user. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-4 py-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Badge variant="outline" className="ml-auto capitalize flex items-center gap-1">
            {getRoleIcon(user.role)}
            {user.role}
          </Badge>
        </div>

        <Separator className="my-2" />

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">User Role</h3>
            <RadioGroup value={selectedRole} onValueChange={(value) => handleRoleChange(value as UserRole)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
            </RadioGroup>
          </div>

          <Separator className="my-2" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Permissions</h3>
              <Badge variant="outline" className="capitalize flex items-center gap-1">
                {getRoleIcon(selectedRole)}
                {selectedRole} Default Permissions
              </Badge>
            </div>
            <div className="space-y-4">
              {permissions.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center justify-between border rounded-md p-3 hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-0.5">
                    <Label htmlFor={permission.id} className="font-medium">
                      {permission.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">{permission.description}</p>
                  </div>
                  <Switch
                    id={permission.id}
                    checked={permission.enabled}
                    onCheckedChange={() => handlePermissionToggle(permission.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Check className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
