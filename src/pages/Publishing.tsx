import { useState } from "react"
import { Calendar, Clock, CheckCircle, AlertCircle, Youtube, Instagram, Linkedin, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const platforms = [
  {
    id: "youtube",
    name: "YouTube Shorts",
    icon: Youtube,
    color: "#FF0000",
    aspectRatio: "9:16",
    maxDuration: "60s",
    enabled: true
  },
  {
    id: "instagram",
    name: "Instagram Reels",
    icon: Instagram,
    color: "#E4405F",
    aspectRatio: "9:16", 
    maxDuration: "90s",
    enabled: true
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: Music,
    color: "#000000",
    aspectRatio: "9:16",
    maxDuration: "180s",
    enabled: false
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    color: "#0077B5",
    aspectRatio: "16:9",
    maxDuration: "600s",
    enabled: true
  }
]

const publishingQueue = [
  {
    id: 1,
    title: "5 Marketing Tips That Changed Everything",
    platforms: ["youtube", "instagram"],
    status: "publishing",
    scheduledFor: "2024-01-15 09:00 AM",
    progress: 75
  },
  {
    id: 2,
    title: "Daily Motivation for Entrepreneurs", 
    platforms: ["instagram", "tiktok"],
    status: "scheduled",
    scheduledFor: "2024-01-15 02:00 PM",
    progress: 0
  },
  {
    id: 3,
    title: "Behind the Scenes: Content Creation",
    platforms: ["youtube", "linkedin"],
    status: "completed",
    scheduledFor: "2024-01-14 11:30 AM",
    progress: 100
  }
]

export default function Publishing() {
  const [selectedPlatforms, setSelectedPlatforms] = useState(
    platforms.reduce((acc, platform) => {
      acc[platform.id] = platform.enabled
      return acc
    }, {} as Record<string, boolean>)
  )
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'publishing': return 'text-warning'
      case 'scheduled': return 'text-primary'
      case 'completed': return 'text-success'
      case 'failed': return 'text-destructive'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'publishing': return <AlertCircle className="w-4 h-4" />
      case 'scheduled': return <Clock className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Multi-Platform Publishing</h1>
        <p className="text-muted-foreground">
          Publish your content across all platforms simultaneously or schedule for optimal timing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Publishing Setup */}
        <div className="lg:col-span-2 space-y-6">
          {/* Platform Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Platforms</CardTitle>
              <CardDescription>
                Choose which platforms to publish your content to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platforms.map((platform) => {
                  const Icon = platform.icon
                  return (
                    <div
                      key={platform.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPlatforms[platform.id]
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => togglePlatform(platform.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: platform.color }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{platform.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {platform.aspectRatio} • {platform.maxDuration}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={selectedPlatforms[platform.id]}
                          onCheckedChange={() => togglePlatform(platform.id)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Platform Preview Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Previews</CardTitle>
              <CardDescription>
                See how your content will appear on each platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {platforms
                  .filter(p => selectedPlatforms[p.id])
                  .map((platform) => {
                    const Icon = platform.icon
                    return (
                      <div key={platform.id} className="text-center">
                        <div className={`aspect-${platform.aspectRatio === '9:16' ? '[9/16]' : 'video'} bg-gradient-to-br from-muted to-muted/50 rounded-lg border flex items-center justify-center mb-2`}>
                          <div className="text-center">
                            <Icon className="w-6 h-6 mx-auto mb-2 opacity-50" />
                            <p className="text-xs text-muted-foreground">{platform.aspectRatio}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium">{platform.name}</p>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>

          {/* Content Details */}
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your content title"
                  defaultValue="5 Marketing Tips That Will Change Your Business"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add a description for your content"
                  className="min-h-[100px]"
                  defaultValue="Discover the top 5 marketing strategies that have helped thousands of businesses grow their revenue by 300%. Save this post and let me know which tip you'll implement first! 🚀"
                />
              </div>

              <div className="space-y-2">
                <Label>Hashtags</Label>
                <div className="flex flex-wrap gap-2">
                  {["#MarketingTips", "#BusinessGrowth", "#Entrepreneur", "#DigitalMarketing", "#StartupLife"].map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer">
                      {tag}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm">+ Add More</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Publishing Actions & Queue */}
        <div className="space-y-6">
          {/* Publishing Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Publish Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full btn-hero" size="lg">
                🚀 Publish Now
              </Button>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">Schedule for Later</Label>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="date" className="text-xs">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="time" className="text-xs">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Publishing Queue */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing Queue</CardTitle>
              <CardDescription>Track your scheduled and published content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publishingQueue.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border border-border/50 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.scheduledFor}</p>
                      </div>
                      <div className={`flex items-center space-x-1 ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span className="text-xs capitalize">{item.status}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {item.platforms.map((platformId) => {
                        const platform = platforms.find(p => p.id === platformId)
                        if (!platform) return null
                        const Icon = platform.icon
                        return (
                          <div
                            key={platformId}
                            className="w-6 h-6 rounded flex items-center justify-center text-white"
                            style={{ backgroundColor: platform.color }}
                          >
                            <Icon className="w-3 h-3" />
                          </div>
                        )
                      })}
                    </div>
                    
                    {item.status === 'publishing' && (
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}