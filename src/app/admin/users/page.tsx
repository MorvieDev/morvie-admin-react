import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { UserTable } from "@/src/components/user-table"
import { Button } from "@/src/components/ui/button"
import { Plus, ShieldAlert, Shield, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import Link from "next/link"

export default function AdminUsers() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">Manage users, roles, and permissions</p>
                </div>
                <Button
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    asChild
                >
                    <Link href="/admin/users/add">
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-border/40">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <ShieldAlert className="h-5 w-5 text-red-500" />
                            Administrators
                        </CardTitle>
                        <CardDescription>Users with full system access</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">2</div>
                    </CardContent>
                </Card>
                <Card className="border-border/40">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Shield className="h-5 w-5 text-amber-500" />
                            Moderators
                        </CardTitle>
                        <CardDescription>Users with content moderation access</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">5</div>
                    </CardContent>
                </Card>
                <Card className="border-border/40">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-500" />
                            Regular Users
                        </CardTitle>
                        <CardDescription>Users with standard access</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">1,254</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-border/40">
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>Manage users and their permissions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all-users">
                        <TabsList className="mb-4">
                            <TabsTrigger value="all-users">All Users</TabsTrigger>
                            <TabsTrigger value="administrators">Administrators</TabsTrigger>
                            <TabsTrigger value="moderators">Moderators</TabsTrigger>
                            <TabsTrigger value="creators">Creators</TabsTrigger>
                            <TabsTrigger value="regular-users">Regular Users</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all-users">
                            <UserTable />
                        </TabsContent>
                        <TabsContent value="administrators">
                            <div className="p-4 text-center text-muted-foreground">Filter would show only administrators</div>
                        </TabsContent>
                        <TabsContent value="moderators">
                            <div className="p-4 text-center text-muted-foreground">Filter would show only moderators</div>
                        </TabsContent>
                        <TabsContent value="creators">
                            <div className="p-4 text-center text-muted-foreground">Filter would show only creators</div>
                        </TabsContent>
                        <TabsContent value="regular-users">
                            <div className="p-4 text-center text-muted-foreground">Filter would show only regular users</div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
