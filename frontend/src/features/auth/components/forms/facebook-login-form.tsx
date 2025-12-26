import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {TabsContent} from "@/components/ui/tabs";
import {Label} from "@/components/ui/label";
import {FacebookLoginButton} from "@/features/auth/components/buttons/facebook-login-button";
import {UserRole} from "@/features/auth/types/auth";
import React, {useState} from "react";
import {RoleSelect} from "@/features/auth/components/role-select";


interface FacebookLoginFormProps {
    login: (role: UserRole) => void;
}

export function FacebookLoginForm({ login }: FacebookLoginFormProps) {
    const [role, setRole] = useState<UserRole>("Admin")

    return (
        <TabsContent value="facebook">
            <Card className="border-border/40">
                <CardHeader>
                    <CardTitle>Login with Facebook</CardTitle>
                    <CardDescription>Continue with your Facebook account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FacebookLoginButton onClick={() => login(role)} />
                    <RoleSelect onChange={setRole} value={role} id="role-facebook" />
                </CardContent>
            </Card>
        </TabsContent>
    )
}