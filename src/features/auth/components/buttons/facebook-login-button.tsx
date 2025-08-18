import {Facebook} from "lucide-react";
import {Button} from "@/components/ui/button";


interface GoogleLoginButtonProps {
    onClick: () => void;
}

export function FacebookLoginButton({ onClick } : GoogleLoginButtonProps){
    return (
        <Button
            variant="outline"
            className="w-full justify-center gap-2 bg-[#1877F2] text-white hover:bg-[#0C63D4]"
            onClick={onClick}
        >
            <Facebook className="h-5 w-5" />
            Continue with Facebook
        </Button>
    )
}