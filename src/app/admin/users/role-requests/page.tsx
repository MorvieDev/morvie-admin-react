"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/src/components/ui/table"
import {Badge} from "@/src/components/ui/badge"
import {Button} from "@/src/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/src/components/ui/avatar"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/src/components/ui/tabs"
import {RoleRequestForm} from "@/src/components/role-request-form"
import {Check, Shield, ShieldAlert, User, X} from "lucide-react"
import {toast} from "@/src/components/ui/use-toast"

// Mock role request data
const roleRequests = [
  {
    id: "REQ-001",
    userId: "USR-2023-003",
    userName: "Robert Johnson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    currentRole: "user",
    requestedRole: "creator",
    reason: "I've been creating content for several years and would like to contribute to the platform.",
    status: "pending",
    submittedAt: "2023-05-10T14:30:00Z",
  },
  {
    id: "REQ-002",
    userId: "USR-2023-004",
    userName: "Emily Davis",
    userAvatar: "/placeholder.svg?height=32&width=32",
    currentRole: "creator",
    requestedRole: "moderator",
    reason: "I've been a creator for over a year and would like to help moderate content.",
    status: "approved",
    submittedAt: "2023-05-08T10:15:00Z",
    reviewedAt: "2023-05-09T09:20:00Z",
    reviewedBy: "John Doe",
  },
  {
    id: "REQ-003",
    userId: "USR-2023-005",
    userName: "Michael Wilson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    currentRole: "moderator",
    requestedRole: "admin",
    reason: "I've been a moderator for 6 months and would like to take on more responsibility.",
    status: "denied",
    submittedAt: "2023-05-07T16:45:00Z",
    reviewedAt: "2023-05-08T11:30:00Z",
    reviewedBy: "John Doe",
    denialReason: "Insufficient experience as a moderator. Please reapply after 1 year of moderation experience.",
  },
]

export default function RoleRequestsPage() {
  const [requests, setRequests] = useState(roleRequests)

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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <ShieldAlert className="h-4 w-4 text-red-500" />
      case "moderator":
        return <Shield className="h-4 w-4 text-amber-500" />
      case "creator":
        return <User className="h-4 w-4 text-green-500" />
      default:
        return <User className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "denied":
        return <Badge variant="destructive">Denied</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleApprove = (requestId: string) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "approved",
              reviewedAt: new Date().toISOString(),
              reviewedBy: "John Doe", // In a real app, this would be the current user
            }
          : req,
      ),
    )
    toast({
      title: "Request Approved",
      description: `Role request ${requestId} has been approved`,
    })
  }

  const handleDeny = (requestId: string) => {
    // In a real app, you would prompt for a reason
    const denialReason = prompt("Please provide a reason for denying this request:")

    if (denialReason) {
      setRequests(
        requests.map((req) =>
          req.id === requestId
            ? {
                ...req,
                status: "denied",
                reviewedAt: new Date().toISOString(),
                reviewedBy: "John Doe", // In a real app, this would be the current user
                denialReason,
              }
            : req,
        ),
      )
      toast({
        title: "Request Denied",
        description: `Role request ${requestId} has been denied`,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Role Requests</h1>
        <p className="text-muted-foreground">Request or manage role changes</p>
      </div>

      <Tabs defaultValue="my-requests">
        <TabsList>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="pending-requests">Pending Requests</TabsTrigger>
          <TabsTrigger value="all-requests">All Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="my-requests" className="space-y-6 mt-6">
          <RoleRequestForm />

          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>My Previous Requests</CardTitle>
              <CardDescription>View the status of your previous role change requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Request ID</TableHead>
                      <TableHead>Requested Role</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reviewed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.slice(0, 1).map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getRoleIcon(request.requestedRole)}
                            <span className="capitalize">{request.requestedRole}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(request.submittedAt)}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>{request.reviewedAt ? formatDate(request.reviewedAt) : "Awaiting Review"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending-requests" className="space-y-6 mt-6">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>Pending Role Requests</CardTitle>
              <CardDescription>Review and manage pending role change requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>User</TableHead>
                      <TableHead>Current Role</TableHead>
                      <TableHead>Requested Role</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests
                      .filter((req) => req.status === "pending")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={request.userAvatar || "/placeholder.svg"} alt={request.userName} />
                                <AvatarFallback>{request.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{request.userName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getRoleIcon(request.currentRole)}
                              <span className="capitalize">{request.currentRole}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getRoleIcon(request.requestedRole)}
                              <span className="capitalize">{request.requestedRole}</span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate" title={request.reason}>
                            {request.reason}
                          </TableCell>
                          <TableCell>{formatDate(request.submittedAt)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                                onClick={() => handleApprove(request.id)}
                              >
                                <Check className="mr-1 h-4 w-4" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                onClick={() => handleDeny(request.id)}
                              >
                                <X className="mr-1 h-4 w-4" />
                                Deny
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    {requests.filter((req) => req.status === "pending").length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No pending requests
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all-requests" className="space-y-6 mt-6">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>All Role Requests</CardTitle>
              <CardDescription>View all role change requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Request ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Requested Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Reviewed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={request.userAvatar || "/placeholder.svg"} alt={request.userName} />
                              <AvatarFallback>{request.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{request.userName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getRoleIcon(request.requestedRole)}
                            <span className="capitalize">{request.requestedRole}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>{formatDate(request.submittedAt)}</TableCell>
                        <TableCell>{request.reviewedAt ? formatDate(request.reviewedAt) : "Awaiting Review"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
