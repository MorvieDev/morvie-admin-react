import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {UserRole} from "@features/auth/types/auth";
import {EmailLoginButton} from "@features/auth/components/buttons/email-login-button";
import {RoleSelect} from "@features/auth/components/role-select";

interface EmailLoginFormProps {
    login: (email: string, password: string, role: UserRole) => void;
}

export function EmailLoginForm({ login } : EmailLoginFormProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState<UserRole>("Admin")

    return (
        <TabsContent value="email">
            <Card className="border-border/40">
                <CardHeader>
                    <CardTitle>Login with Email</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    login(email, password, role);
                    setEmail("");
                    setPassword("");
                    setRole("Admin");
                }}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <a href="#" className="text-xs text-primary hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <RoleSelect onChange={setRole} value={role} id="role-email" />
                    </CardContent>
                    <CardFooter>
                        <EmailLoginButton />
                    </CardFooter>
                </form>
            </Card>
        </TabsContent>
    )
}