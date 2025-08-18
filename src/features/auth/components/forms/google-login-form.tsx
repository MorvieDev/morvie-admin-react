import {TabsContent} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {useState} from "react";
import {GoogleLoginButton} from "@features/auth/components/buttons/google-login-button";
import {UserRole} from "@features/auth/types/auth";
import {RoleSelect} from "@features/auth/components/role-select";

interface GoogleLoginFormProps {
    login: (role: UserRole) => void;
}

export function GoogleLoginForm({ login }: GoogleLoginFormProps) {
    const [role, setRole] = useState<UserRole>("Admin")

    return (
        <TabsContent value="google">
            <Card className="border-border/40">
                <CardHeader>
                    <CardTitle>Login with Google</CardTitle>
                    <CardDescription>Continue with your Google account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <GoogleLoginButton onClick={() => login(role)} />
                    <RoleSelect onChange={setRole} value={role} id="role-google" />
                </CardContent>
            </Card>
        </TabsContent>
    )
}