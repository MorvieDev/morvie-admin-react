"use client"

import {useState} from "react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Download, Filter, Search} from "lucide-react"

// Mock audit log data
const auditLogs = [
  {
    id: "LOG-001",
    timestamp: "2023-05-15T14:30:00Z",
    action: "role_change",
    performedBy: {
      id: "USR-2023-001",
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    target: {
      id: "USR-2023-003",
      name: "Robert Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    details: {
      oldRole: "user",
      newRole: "creator",
      changedPermissions: ["upload_content", "edit_own_content"],
    },
  },
  {
    id: "LOG-002",
    timestamp: "2023-05-14T10:15:00Z",
    action: "permission_change",
    performedBy: {
      id: "USR-2023-001",
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    target: {
      id: "USR-2023-002",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    details: {
      role: "moderator",
      changedPermissions: ["manage_content"],
      oldValue: false,
      newValue: true,
    },
  },
  {
    id: "LOG-003",
    timestamp: "2023-05-13T16:45:00Z",
    action: "role_request",
    performedBy: {
      id: "USR-2023-004",
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    target: {
      id: "USR-2023-004",
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    details: {
      requestedRole: "creator",
      status: "pending",
    },
  },
  {
    id: "LOG-004",
    timestamp: "2023-05-12T09:20:00Z",
    action: "role_request_approved",
    performedBy: {
      id: "USR-2023-001",
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    target: {
      id: "USR-2023-005",
      name: "Michael Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    details: {
      oldRole: "user",
      newRole: "creator",
      requestId: "REQ-001",
    },
  },
  {
    id: "LOG-005",
    timestamp: "2023-05-11T11:30:00Z",
    action: "role_request_denied",
    performedBy: {
      id: "USR-2023-001",
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    target: {
      id: "USR-2023-006",
      name: "Sarah Brown",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    details: {
      requestedRole: "moderator",
      currentRole: "user",
      requestId: "REQ-002",
      reason: "Insufficient experience",
    },
  },
]

export function PermissionAuditLog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getActionBadge = (action: string) => {
    switch (action) {
      case "role_change":
        return <Badge variant="default">Role Change</Badge>
      case "permission_change":
        return <Badge variant="outline">Permission Change</Badge>
      case "role_request":
        return <Badge variant="secondary">Role Request</Badge>
      case "role_request_approved":
        return <Badge className="bg-green-500">Request Approved</Badge>
      case "role_request_denied":
        return <Badge variant="destructive">Request Denied</Badge>
      default:
        return <Badge variant="outline">{action}</Badge>
    }
  }

  const getActionDescription = (log: (typeof auditLogs)[0]) => {
    switch (log.action) {
      case "role_change":
        return (
          <span>
            Changed role of <strong>{log.target.name}</strong> from{" "}
            <Badge variant="outline" className="capitalize">
              {log.details.oldRole}
            </Badge>{" "}
            to{" "}
            <Badge variant="outline" className="capitalize">
              {log.details.newRole}
            </Badge>
          </span>
        )
      case "permission_change":
        return (
          <span>
            {log.details.newValue ? "Granted" : "Revoked"} permission{" "}
            <Badge variant="outline" className="capitalize">
              {/*{log.details.changedPermissions.join(", ")}*/}
            </Badge>{" "}
            for <strong>{log.target.name}</strong>
          </span>
        )
      case "role_request":
        return (
          <span>
            Requested role change to{" "}
            <Badge variant="outline" className="capitalize">
              {log.details.requestedRole}
            </Badge>
          </span>
        )
      case "role_request_approved":
        return (
          <span>
            Approved role change request for <strong>{log.target.name}</strong> from{" "}
            <Badge variant="outline" className="capitalize">
              {log.details.oldRole}
            </Badge>{" "}
            to{" "}
            <Badge variant="outline" className="capitalize">
              {log.details.newRole}
            </Badge>
          </span>
        )
      case "role_request_denied":
        return (
          <span>
            Denied role change request for <strong>{log.target.name}</strong> to{" "}
            <Badge variant="outline" className="capitalize">
              {log.details.requestedRole}
            </Badge>
            . Reason: {log.details.reason}
          </span>
        )
      default:
        return <span>Unknown action</span>
    }
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      searchQuery === "" ||
      log.target.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.performedBy.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesAction = actionFilter === "all" || log.action === actionFilter

    return matchesSearch && matchesAction
  })

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>Permission Audit Log</CardTitle>
        <CardDescription>Track all changes to user roles and permissions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by user..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="role_change">Role Changes</SelectItem>
                <SelectItem value="permission_change">Permission Changes</SelectItem>
                <SelectItem value="role_request">Role Requests</SelectItem>
                <SelectItem value="role_request_approved">Approved Requests</SelectItem>
                <SelectItem value="role_request_denied">Denied Requests</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead className="w-[120px]">Action</TableHead>
                <TableHead className="w-[150px]">Performed By</TableHead>
                <TableHead className="w-[150px]">Target User</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">{formatDate(log.timestamp)}</TableCell>
                  <TableCell>{getActionBadge(log.action)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={log.performedBy.avatar || "/placeholder.svg"} alt={log.performedBy.name} />
                        <AvatarFallback>{log.performedBy.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{log.performedBy.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={log.target.avatar || "/placeholder.svg"} alt={log.target.name} />
                        <AvatarFallback>{log.target.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{log.target.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getActionDescription(log)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
