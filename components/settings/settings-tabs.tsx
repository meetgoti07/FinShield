"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { User, Bell, Lock, Globe, Database, Cpu, Mail, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SettingsTabs() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-4">
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden md:inline">Account</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="hidden md:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span className="hidden md:inline">Security</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">Appearance</span>
        </TabsTrigger>
        <TabsTrigger value="api" className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          <span className="hidden md:inline">API</span>
        </TabsTrigger>
        <TabsTrigger value="integrations" className="flex items-center gap-2">
          <Cpu className="h-4 w-4" />
          <span className="hidden md:inline">Integrations</span>
        </TabsTrigger>
        <TabsTrigger value="email" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span className="hidden md:inline">Email</span>
        </TabsTrigger>
        <TabsTrigger value="billing" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span className="hidden md:inline">Billing</span>
        </TabsTrigger>
      </TabsList>

      <Card>
        <CardContent className="pt-6">
          <TabsContent value="account" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="Admin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="User" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@finshield.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input id="job-title" defaultValue="System Administrator" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue="security">
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Timezone & Language</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-8">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc+0">UTC</SelectItem>
                      <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for alerts and updates</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive text messages for critical alerts</p>
                  </div>
                  <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications in the browser</p>
                  </div>
                  <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Alert Types</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Severity Alerts</Label>
                    <p className="text-sm text-muted-foreground">Critical security and fraud alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Medium Severity Alerts</Label>
                    <p className="text-sm text-muted-foreground">Important but non-critical alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Low Severity Alerts</Label>
                    <p className="text-sm text-muted-foreground">Informational alerts</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications about system changes and updates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Password</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Update Password</Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button variant="outline">Configure 2FA</Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Session Management</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Active Sessions</Label>
                    <p className="text-sm text-muted-foreground">You have 2 active sessions</p>
                  </div>
                  <Button variant="outline">Manage Sessions</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Logout</Label>
                    <p className="text-sm text-muted-foreground">Automatically log out after period of inactivity</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Theme</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="border rounded-md p-2 cursor-pointer bg-background">
                    <div className="w-full h-24 rounded bg-background border-2 border-primary"></div>
                  </div>
                  <Label>Light</Label>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="border rounded-md p-2 cursor-pointer bg-background">
                    <div className="w-full h-24 rounded bg-slate-950 border-2 border-primary"></div>
                  </div>
                  <Label>Dark</Label>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="border rounded-md p-2 cursor-pointer bg-background">
                    <div className="w-full h-24 rounded bg-gradient-to-b from-background to-slate-950 border-2 border-primary"></div>
                  </div>
                  <Label>System</Label>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Dashboard Layout</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Use a more compact layout for the dashboard</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Quick Actions</Label>
                    <p className="text-sm text-muted-foreground">Display quick action buttons on the dashboard</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">API Keys</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Production API Key</Label>
                    <p className="text-sm text-muted-foreground">Last used: 2 hours ago</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Development API Key</Label>
                    <p className="text-sm text-muted-foreground">Last used: 3 days ago</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>
                <Button>Create New API Key</Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Webhooks</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" defaultValue="https://example.com/webhook" />
                </div>
                <div className="space-y-2">
                  <Label>Webhook Events</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="fraud-alerts" defaultChecked />
                      <Label htmlFor="fraud-alerts">Fraud Alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="policy-changes" defaultChecked />
                      <Label htmlFor="policy-changes">Policy Changes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="system-events" />
                      <Label htmlFor="system-events">System Events</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="user-activity" />
                      <Label htmlFor="user-activity">User Activity</Label>
                    </div>
                  </div>
                </div>
                <Button>Save Webhook Configuration</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Connected Services</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Database Integration</h4>
                      <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email Service</h4>
                      <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Notification Service</h4>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Available Integrations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">CRM Integration</span>
                    <span className="text-sm text-muted-foreground">Connect with your CRM system</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Payment Processor</span>
                    <span className="text-sm text-muted-foreground">Connect with payment systems</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Analytics Platform</span>
                    <span className="text-sm text-muted-foreground">Connect with analytics tools</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Identity Verification</span>
                    <span className="text-sm text-muted-foreground">Connect with ID verification services</span>
                  </div>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Templates</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h4 className="font-medium">Fraud Alert Notification</h4>
                    <p className="text-sm text-muted-foreground">Template for fraud alert notifications</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h4 className="font-medium">Weekly Report</h4>
                    <p className="text-sm text-muted-foreground">Template for weekly summary reports</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h4 className="font-medium">System Notification</h4>
                    <p className="text-sm text-muted-foreground">Template for system notifications</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sender-name">Sender Name</Label>
                  <Input id="sender-name" defaultValue="FinShield Security" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sender-email">Sender Email</Label>
                  <Input id="sender-email" defaultValue="security@finshield.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reply-to">Reply-To Email</Label>
                  <Input id="reply-to" defaultValue="support@finshield.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-footer">Email Footer</Label>
                  <Textarea
                    id="email-footer"
                    rows={3}
                    defaultValue="FinShield Inc. | 123 Security Ave, Cybertown | This email is automated, please do not reply directly."
                  />
                </div>
                <Button>Save Email Settings</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Current Plan</h3>
              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-lg">Enterprise Plan</h4>
                    <p className="text-sm text-muted-foreground">Unlimited access to all features</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly fee</span>
                    <span className="font-medium">$999.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Billing cycle</span>
                    <span>Monthly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Next billing date</span>
                    <span>January 1, 2024</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Method</h3>
              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">Visa ending in 4242</h4>
                      <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Billing address</span>
                  <span>123 Corporate St, Business City, 12345</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Billing History</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">Invoice #INV-2023-12</h4>
                    <p className="text-sm text-muted-foreground">December 1, 2023</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">$999.00</span>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">Invoice #INV-2023-11</h4>
                    <p className="text-sm text-muted-foreground">November 1, 2023</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">$999.00</span>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">Invoice #INV-2023-10</h4>
                    <p className="text-sm text-muted-foreground">October 1, 2023</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">$999.00</span>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  )
}