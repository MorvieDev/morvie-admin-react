"use client"

import type React from "react"
import {useState} from "react"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Label} from "@/components/ui/label"
import {Send, Shield, ShieldAlert, User} from "lucide-react"
import {toast} from "@/components/ui/use-toast"

export function RoleRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    requestedRole: "creator",
    reason: "",
  })

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, requestedRole: value }))
  }

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, reason: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.reason) {
      toast({
        title: "Error",
        description: "Please provide a reason for your request",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    try {
      // In a real app, this would be an API call to submit the request
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Request Submitted",
        description: `Your request for ${formData.requestedRole} role has been submitted for review`,
      })

      // Reset form
      setFormData({
        requestedRole: "creator",
        reason: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-border/40">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Request Role Change</CardTitle>
          <CardDescription>
            Submit a request to change your role. An administrator will review your request.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Requested Role</Label>
            <RadioGroup
              value={formData.requestedRole}
              onValueChange={handleRoleChange}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="moderator" id="request-moderator" />
                <Label htmlFor="request-moderator" className="flex items-center gap-2 cursor-pointer">
                  <Shield className="h-4 w-4 text-amber-500" />
                  <div>
                    <span className="font-medium">Moderator</span>
                    <p className="text-xs text-muted-foreground">Content moderation access</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="creator" id="request-creator" />
                <Label htmlFor="request-creator" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4 text-green-500" />
                  <div>
                    <span className="font-medium">Creator</span>
                    <p className="text-xs text-muted-foreground">Can upload and manage content</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="admin" id="request-admin" />
                <Label htmlFor="request-admin" className="flex items-center gap-2 cursor-pointer">
                  <ShieldAlert className="h-4 w-4 text-red-500" />
                  <div>
                    <span className="font-medium">Admin</span>
                    <p className="text-xs text-muted-foreground">Full system access</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Request</Label>
            <Textarea
              id="reason"
              placeholder="Please explain why you are requesting this role change..."
              rows={4}
              value={formData.reason}
              onChange={handleReasonChange}
              required
            />
            <p className="text-xs text-muted-foreground">
              Provide details about your qualifications and why you believe you should be granted this role.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="ml-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
            {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
