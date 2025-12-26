import {Button} from "@/components/ui/button";
import React from "react";

export function EmailLoginButton() {
    return (
        <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
            Sign In
        </Button>
    )
}