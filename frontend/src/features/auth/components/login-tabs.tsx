import {FacebookLoginForm} from "@/features/auth/components/forms/facebook-login-form";
import {GoogleLoginForm} from "@/features/auth/components/forms/google-login-form";
import {EmailLoginForm} from "@/features/auth/components/forms/email-login-form";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useEmailLogin} from "@/features/auth/hooks/use-email-login";
import {useGoogleLogin} from "@/features/auth/hooks/use-google-login";
import {useFacebookLogin} from "@/features/auth/hooks/use-facebook-login";

export function LoginTabs(){
    const { login: emailLogin } = useEmailLogin();
    const { login: googleLogin } = useGoogleLogin();
    const { login: facebookLogin } = useFacebookLogin();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/95 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
                        Morvie Admin
                    </h1>
                    <p className="text-muted-foreground mt-2">Video content management platform</p>
                </div>

                <Tabs defaultValue="email" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="email">Email</TabsTrigger>
                        <TabsTrigger value="google">Google</TabsTrigger>
                        <TabsTrigger value="facebook">Facebook</TabsTrigger>
                    </TabsList>
                    <EmailLoginForm login={emailLogin}/>
                    <GoogleLoginForm login={googleLogin}/>
                    <FacebookLoginForm login={facebookLogin}/>
                </Tabs>
            </div>
        </div>
    )
}
