import { TrendingUp, Eye, Heart, MessageCircle, Users, Calendar, Target, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const engagementData = [
  { name: 'Mon', views: 2400, likes: 400, comments: 120, shares: 80 },
  { name: 'Tue', views: 3200, likes: 520, comments: 150, shares: 95 },
  { name: 'Wed', views: 2800, likes: 380, comments: 110, shares: 70 },
  { name: 'Thu', views: 4100, likes: 680, comments: 200, shares: 130 },
  { name: 'Fri', views: 3800, likes: 620, comments: 180, shares: 110 },
  { name: 'Sat', views: 5200, likes: 850, comments: 250, shares: 160 },
  { name: 'Sun', views: 4500, likes: 720, comments: 220, shares: 140 }
]

const platformData = [
  { name: 'YouTube', value: 45, color: '#FF0000' },
  { name: 'Instagram', value: 30, color: '#E4405F' },
  { name: 'TikTok', value: 15, color: '#000000' },
  { name: 'LinkedIn', value: 10, color: '#0077B5' }
]

const hashtagPerformance = [
  { hashtag: '#ContentCreator', posts: 45, avgViews: 12500, engagement: 8.2 },
  { hashtag: '#MarketingTips', posts: 32, avgViews: 15300, engagement: 9.1 },
  { hashtag: '#Entrepreneur', posts: 28, avgViews: 9800, engagement: 7.5 },
  { hashtag: '#DigitalMarketing', posts: 25, avgViews: 11200, engagement: 6.8 },
  { hashtag: '#BusinessTips', posts: 22, avgViews: 8900, engagement: 5.9 }
]

const aiInsights = [
  {
    title: "Peak Engagement Time",
    description: "Your audience is most active on Saturdays at 2-4 PM",
    icon: Clock,
    type: "timing"
  },
  {
    title: "Top Performing Content", 
    description: "Educational content gets 40% more engagement than entertainment",
    icon: Target,
    type: "content"
  },
  {
    title: "Hashtag Opportunity",
    description: "#MarketingTips has 25% higher reach potential this week",
    icon: Zap,
    type: "hashtag"
  }
]

const stats = [
  {
    title: "Total Views",
    value: "234.5K",
    change: "+18.2%",
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
    title: "Total Followers",
    value: "56.8K",
    change: "+1.2K",
    icon: Users,
    trend: "up"
  },
  {
    title: "Comments",
    value: "3.2K",
    change: "+15.3%",
    icon: MessageCircle,
    trend: "up"
  }
]

function Clock(props: any) {
  return <Calendar {...props} />
}

export default function Analytics() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track your content performance and discover growth opportunities
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select defaultValue="7d">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Report</Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="stats-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-success">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.change}
                <span className="text-muted-foreground ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Engagement Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Engagement Over Time</CardTitle>
            <CardDescription>
              Track your content performance across all platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={3} />
                  <Line type="monotone" dataKey="likes" stroke="hsl(var(--accent))" strokeWidth={2} />
                  <Line type="monotone" dataKey="comments" stroke="hsl(var(--success))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Breakdown</CardTitle>
            <CardDescription>Distribution of your content performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hashtag Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Hashtag Performance</CardTitle>
            <CardDescription>
              Top performing hashtags in your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hashtagPerformance.map((hashtag, index) => (
                <div key={hashtag.hashtag} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{hashtag.hashtag}</p>
                      <p className="text-xs text-muted-foreground">
                        {hashtag.posts} posts • {hashtag.avgViews.toLocaleString()} avg views
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {hashtag.engagement}% engagement
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-accent" />
              AI Insights
            </CardTitle>
            <CardDescription>
              Personalized recommendations to boost your performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <insight.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                      <p className="text-xs text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                Get More Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}