import { motion } from "framer-motion"
import { 
  Calendar, 
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Video,
  Image,
  FileText
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Recent Activity Data
const activityItems = [
  {
    id: 1,
    title: "Amazing Travel Video",
    status: "Published",
    platform: "YouTube",
    views: "2.4K",
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "Morning Routine Tips",
    status: "Scheduled",
    platform: "Instagram",
    views: "-",
    time: "Tomorrow 9:00 AM"
  },
  {
    id: 3,
    title: "Productivity Hacks",
    status: "Draft",
    platform: "Twitter",
    views: "-",
    time: "3 days ago"
  },
  {
    id: 4,
    title: "Tech Review 2024",
    status: "Published",
    platform: "LinkedIn",
    views: "890",
    time: "1 week ago"
  }
]

// Stats Data
const stats = [
  {
    title: "Total Views",
    value: "45.2K",
    change: "+12.5%",
    icon: Eye,
    trend: "up"
  },
  {
    title: "Engagement Rate",
    value: "8.4%",
    change: "+2.1%",
    icon: Heart,
    trend: "up"
  },
  {
    title: "Total Posts",
    value: "127",
    change: "+8",
    icon: FileText,
    trend: "up"
  },
  {
    title: "Followers Growth",
    value: "+1.2K",
    change: "+15.3%",
    icon: TrendingUp,
    trend: "up"
  }
]

export default function UpdatedDashboard() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Hi CreatorFlow User 👋, ready to create today?
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your content creation journey
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="stats-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-success flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Combined Video & Thumbnail Generator Section */}
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Content Creation Studio
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* AI Video Generator */}
          <Card className="card-interactive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                🎬 AI Video Generator
              </CardTitle>
              <CardDescription>
                Transform your scripts into engaging videos with AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Video className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop script files (.txt, .docx) or click to upload
                </p>
              </div>
              
              <div className="flex gap-2">
                <button className="btn-hero flex-1">Generate Video</button>
                <select className="px-3 py-2 border rounded-lg text-sm">
                  <option>HD</option>
                  <option>SD</option>
                  <option>IG Reels</option>
                  <option>YT Shorts</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* AI Thumbnail Generator */}
          <Card className="card-interactive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5 text-primary" />
                🖼 AI Thumbnail Generator
              </CardTitle>
              <CardDescription>
                Create eye-catching thumbnails from your content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea 
                className="w-full h-24 p-3 border rounded-lg resize-none text-sm"
                placeholder="Enter your video script or content here..."
              />
              
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded border-2 border-transparent hover:border-primary cursor-pointer transition-colors flex items-center justify-center text-xs">
                  YouTube
                </div>
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded border-2 border-transparent hover:border-primary cursor-pointer transition-colors flex items-center justify-center text-xs">
                  Instagram
                </div>
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded border-2 border-transparent hover:border-primary cursor-pointer transition-colors flex items-center justify-center text-xs">
                  Twitter
                </div>
              </div>
              
              <button className="btn-hero w-full">Generate Thumbnail</button>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Activity Timeline */}
      <motion.div 
        className="grid lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest content creation activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.platform} • {item.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.views !== "-" && (
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {item.views}
                      </span>
                    )}
                    <Badge 
                      variant={
                        item.status === "Published" ? "default" : 
                        item.status === "Scheduled" ? "secondary" : "outline"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Platform Performance
            </CardTitle>
            <CardDescription>
              Engagement rates across platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>YouTube</span>
                  <span>12.4%</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Instagram</span>
                  <span>8.7%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Twitter</span>
                  <span>5.2%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>LinkedIn</span>
                  <span>3.8%</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}