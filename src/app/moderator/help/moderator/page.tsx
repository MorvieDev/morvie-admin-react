import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/src/components/ui/accordion"
import {Button} from "@/src/components/ui/button"
import {Input} from "@/src/components/ui/input"
import {Search} from "lucide-react"

export default function ModeratorHelp() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Help & Guidelines</h1>
        <p className="text-muted-foreground">Learn how to use the platform and follow our guidelines</p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search help articles..." className="w-full pl-8 bg-background" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle>Content Guidelines</CardTitle>
            <CardDescription>Rules for uploading content to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Acceptable Content</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    All content must be appropriate for a general audience and comply with our community guidelines.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Educational content</li>
                    <li>Entertainment videos</li>
                    <li>Informational content</li>
                    <li>Creative works</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Prohibited Content</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    The following types of content are strictly prohibited:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Violent or graphic content</li>
                    <li>Hateful or discriminatory content</li>
                    <li>Adult or explicit material</li>
                    <li>Content that violates copyright</li>
                    <li>Misleading or fraudulent content</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Content Quality Standards</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    All uploaded content should meet the following quality standards:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Minimum resolution of 720p (1280x720)</li>
                    <li>Clear audio without background noise</li>
                    <li>Proper lighting and visibility</li>
                    <li>Stable camera work (minimal shaking)</li>
                    <li>Appropriate thumbnails that represent the content</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <CardTitle>Moderation Process</CardTitle>
            <CardDescription>Understanding how content moderation works</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Review Timeline</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    All submitted content goes through a review process before being published. The typical review
                    timeline is 24-48 hours, but may vary depending on the volume of submissions. You will receive a
                    notification once your content has been reviewed.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Content Rejection</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    If your content is rejected, you will receive a notification with the reason for rejection. Common
                    reasons include guideline violations, poor quality, or inappropriate content. You can revise and
                    resubmit your content after addressing the issues.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Appeals Process</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    If you believe your content was rejected in error, you can submit an appeal. Appeals are reviewed by
                    a senior moderator, and a decision is typically made within 3-5 business days. To submit an appeal,
                    use the "Appeal" button on the rejected content notification.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <CardTitle>Best Practices</CardTitle>
            <CardDescription>Tips for successful content creation</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Optimizing Titles and Descriptions</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Create compelling titles and descriptions to increase visibility:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Use descriptive, accurate titles (60-70 characters)</li>
                    <li>Include relevant keywords in your description</li>
                    <li>Provide context and value in your description</li>
                    <li>Use proper formatting and avoid ALL CAPS</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Creating Effective Thumbnails</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground mb-2">Thumbnails are crucial for attracting viewers:</p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Use high-resolution images (1280x720 recommended)</li>
                    <li>Ensure clear visibility of the main subject</li>
                    <li>Use contrasting colors to stand out</li>
                    <li>Include minimal, readable text if necessary</li>
                    <li>Accurately represent your content</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Tagging and Categorization</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Proper tagging helps your content reach the right audience:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Use 5-8 relevant tags per video</li>
                    <li>Select the most appropriate category</li>
                    <li>Include both broad and specific tags</li>
                    <li>Avoid misleading or irrelevant tags</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Get help from our support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you need additional help or have specific questions, our support team is here to assist you.
            </p>
            <div className="grid gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                Contact Support
              </Button>
              <Button variant="outline">Schedule a Training Session</Button>
            </div>
            <p className="text-xs text-muted-foreground">Support hours: Monday-Friday, 9am-5pm EST</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
