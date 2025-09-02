import { useState } from "react"
import { User, Link, Bell, Shield, CreditCard, Users, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const connectedAccounts = [
  {
    platform: "YouTube",
    username: "@alexcreator",
    connected: true,
    color: "#FF0000"
  },
  {
    platform: "Instagram", 
    username: "@alex.creator",
    connected: true,
    color: "#E4405F"
  },
  {
    platform: "TikTok",
    username: "@alexcreator",
    connected: false,
    color: "#000000"
  },
  {
    platform: "LinkedIn",
    username: "Alex Creator",
    connected: true,
    color: "#0077B5"
  }
]

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and connected platforms
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and profile settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/avatars/profile.jpg" alt="Profile" />
                  <AvatarFallback className="text-lg">AC</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">Change Photo</Button>
                  <Button variant="ghost" size="sm">Remove</Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, GIF or PNG. Max size 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Creator" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="alex@creatorflow.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input 
                  id="bio" 
                  placeholder="Tell us about yourself"
                  defaultValue="Content creator helping entrepreneurs grow their brands through authentic storytelling and data-driven strategies."
                />
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Connected Accounts */}
        <TabsContent value="accounts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Link className="w-5 h-5 mr-2" />
                Connected Accounts
              </CardTitle>
              <CardDescription>
                Manage your social media platform connections for seamless publishing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedAccounts.map((account) => (
                  <div key={account.platform} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: account.color }}
                      >
                        {account.platform[0]}
                      </div>
                      <div>
                        <h3 className="font-medium">{account.platform}</h3>
                        <p className="text-sm text-muted-foreground">
                          {account.connected ? account.username : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {account.connected ? (
                        <>
                          <Badge variant="secondary">Connected</Badge>
                          <Button variant="outline" size="sm">Disconnect</Button>
                        </>
                      ) : (
                        <Button size="sm">Connect</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
              <CardDescription>
                Download your content and analytics data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">Content Library</h4>
                  <p className="text-sm text-muted-foreground">
                    All your scripts, thumbnails, and videos
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">Analytics Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Performance metrics and insights
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about your content performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about publishing and analytics
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Get real-time alerts in your browser
                    </p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Emails</h4>
                    <p className="text-sm text-muted-foreground">
                      Tips, updates, and CreatorFlow news
                    </p>
                  </div>
                  <Switch
                    checked={marketingEmails}
                    onCheckedChange={setMarketingEmails}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Notification Schedule</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Quiet Hours Start</Label>
                    <Input type="time" defaultValue="22:00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Quiet Hours End</Label>
                    <Input type="time" defaultValue="08:00" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Billing & Subscription
              </CardTitle>
              <CardDescription>
                Manage your CreatorFlow subscription and payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">CreatorFlow Pro</h3>
                    <p className="text-sm text-muted-foreground">$29/month • Next billing: Feb 15, 2024</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="text-2xl font-bold text-primary">Unlimited</h4>
                  <p className="text-sm text-muted-foreground">Video generations</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="text-2xl font-bold text-accent">50+</h4>
                  <p className="text-sm text-muted-foreground">Premium templates</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="text-2xl font-bold text-success">Advanced</h4>
                  <p className="text-sm text-muted-foreground">Analytics</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Payment Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">
                        VISA
                      </div>
                      <span>•••• •••• •••• 4242</span>
                      <Badge variant="outline">Primary</Badge>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline" className="mt-3">
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Team Collaboration
              </CardTitle>
              <CardDescription>
                Invite team members and manage permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3">
                <Input placeholder="Enter email address" className="flex-1" />
                <Button>Send Invite</Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Alex Creator</p>
                      <p className="text-sm text-muted-foreground">alex@creatorflow.com</p>
                    </div>
                  </div>
                  <Badge>Owner</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border border-dashed border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-muted-foreground">Invite team members</p>
                      <p className="text-sm text-muted-foreground">Collaborate on content creation</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Invite</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}