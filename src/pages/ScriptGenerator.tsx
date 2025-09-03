import { useState } from "react"
import { Sparkles, Copy, Save, RefreshCw, Youtube, Instagram, Linkedin, Hash, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

interface PlatformResult {
  id: string
  name: string
  icon: React.ElementType
  color: string
  bgColor: string
  caption: string
  hashtags: string[]
}

export default function ScriptGenerator() {
  const [script, setScript] = useState("")
  const [platformResults, setPlatformResults] = useState<PlatformResult[]>([])
  const [seoScore, setSeoScore] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!script.trim()) return
    
    setIsGenerating(true)
    
    // Simulate API call to /api/generate
    setTimeout(() => {
      const mockResults: PlatformResult[] = [
        {
          id: "youtube",
          name: "YouTube Shorts",
          icon: Youtube,
          color: "text-red-600",
          bgColor: "bg-red-50 border-red-200",
          caption: "🔥 VIRAL Content Creation Secrets That Influencers Don't Want You to Know! From 0 to 100K followers with these proven strategies. Save this for later! 🚀",
          hashtags: ["#YouTubeShorts", "#ContentCreator", "#ViralTips", "#CreatorSecrets", "#SocialMediaGrowth"]
        },
        {
          id: "instagram",
          name: "Instagram Reels",
          icon: Instagram,
          color: "text-pink-600",
          bgColor: "bg-pink-50 border-pink-200",
          caption: "✨ Ready to level up your content game? Here are the insider tips that helped me grow to 100K+ followers! Which one will you try first? 💫 Save & share!",
          hashtags: ["#InstagramReels", "#ContentStrategy", "#InfluencerTips", "#SocialMediaTips", "#CreatorLife"]
        },
        {
          id: "tiktok",
          name: "TikTok",
          icon: Hash, // Using Hash as TikTok icon placeholder
          color: "text-black",
          bgColor: "bg-gray-50 border-gray-200",
          caption: "POV: You discover the content secrets that change everything 🤯 From zero to viral in 30 days! Drop a 🔥 if you're ready to level up!",
          hashtags: ["#TikTokTips", "#ContentHacks", "#ViralContent", "#CreatorTips", "#ForYou"]
        },
        {
          id: "linkedin",
          name: "LinkedIn",
          icon: Linkedin,
          color: "text-blue-600",
          bgColor: "bg-blue-50 border-blue-200",
          caption: "The content creation strategies that transformed my professional brand and grew my network to 100K+ connections. Here's what I learned...",
          hashtags: ["#ContentMarketing", "#ProfessionalGrowth", "#LinkedInCreator", "#DigitalMarketing", "#PersonalBranding"]
        }
      ]
      setPlatformResults(mockResults)
      setSeoScore(87)
      setIsGenerating(false)
      toast({
        title: "Captions Generated!",
        description: "Platform-specific captions and hashtags have been created.",
      })
    }, 2000)
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard.`,
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try selecting and copying manually.",
        variant: "destructive"
      })
    }
  }

  const copyPlatformContent = (platform: PlatformResult) => {
    const content = `${platform.caption}\n\n${platform.hashtags.join(" ")}`
    copyToClipboard(content, "Platform content")
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Caption & Hashtag Generator</h1>
        <p className="text-muted-foreground">
          Create platform-specific captions and hashtags optimized for maximum engagement
        </p>
      </div>

      {/* Script Input Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-primary" />
            What's On Your Mind Today?
          </CardTitle>
          <CardDescription>
            Share your thoughts, ideas, or content. AI will generate optimized captions and hashtags for each platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="script">Your Content</Label>
            <Textarea
              id="script"
              placeholder="What's on your mind today? Share your thoughts, ideas, or content...

Example: 'Just discovered these 5 game-changing social media strategies that helped me grow my following to 100K. The first one is all about consistency - posting at the same time daily increases engagement by 23%...'"
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="min-h-[200px] resize-none"
            />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <span className="text-sm text-muted-foreground">
              {script.length} characters
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button 
                onClick={handleGenerate}
                disabled={!script.trim() || isGenerating}
                className="relative"
              >
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                {isGenerating ? "Generating..." : "Generate Captions & Hashtags"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Optimization Score */}
      {seoScore > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                SEO Score
              </CardTitle>
              <CardDescription>
                Analysis of your content for search engine and platform optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-primary">{seoScore}/100</span>
                <Badge variant={seoScore >= 80 ? "default" : seoScore >= 60 ? "secondary" : "outline"} className="text-sm">
                  {seoScore >= 80 ? "Excellent" : seoScore >= 60 ? "Good" : "Needs Improvement"}
                </Badge>
              </div>
              <Progress value={seoScore} className="h-3 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="font-medium text-green-600">✓ Engagement Keywords</div>
                  <p className="text-muted-foreground">Strong action words detected</p>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-green-600">✓ Optimal Length</div>
                  <p className="text-muted-foreground">Good character count for platforms</p>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-yellow-600">⚠ Hashtag Density</div>
                  <p className="text-muted-foreground">Could use more niche hashtags</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Platform Results Grid */}
      {platformResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platformResults.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card className={`${platform.bgColor} border-2`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <platform.icon className={`w-5 h-5 mr-2 ${platform.color}`} />
                      {platform.name}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyPlatformContent(platform)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Caption Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Caption</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(platform.caption, "Caption")}
                        className="h-6 px-2"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="p-3 bg-background rounded-md border text-sm leading-relaxed">
                      {platform.caption}
                    </div>
                  </div>

                  {/* Hashtags Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Hashtags</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(platform.hashtags.join(" "), "Hashtags")}
                        className="h-6 px-2"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {platform.hashtags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="secondary" 
                          className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => copyToClipboard(tag, "Hashtag")}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {platformResults.length === 0 && !isGenerating && (
        <div className="text-center py-12 text-muted-foreground">
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">Ready to Generate Platform-Specific Content</h3>
          <p className="text-sm">Share your content above and click "Generate Captions & Hashtags" to get started</p>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="text-center py-12">
          <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
          <h3 className="text-lg font-medium mb-2">Generating Platform Content...</h3>
          <p className="text-sm text-muted-foreground">Creating optimized captions and hashtags for all platforms</p>
        </div>
      )}
    </div>
  )
}