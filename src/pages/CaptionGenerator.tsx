import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Sparkles, Hash, MessageSquare, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const platformData = {
  youtube: { name: "YouTube", color: "bg-red-500", icon: "🎥" },
  instagram: { name: "Instagram", color: "bg-gradient-to-r from-purple-500 to-pink-500", icon: "📸" },
  twitter: { name: "Twitter", color: "bg-blue-500", icon: "🐦" },
  linkedin: { name: "LinkedIn", color: "bg-blue-700", icon: "💼" }
}

export default function CaptionGenerator() {
  const [content, setContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<{
    captions: { platform: string; text: string }[]
    hashtags: { platform: string; tags: string[] }[]
  } | null>(null)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter your content to generate captions and hashtags.",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      setResults({
        captions: [
          {
            platform: "youtube",
            text: "🎬 " + content + " Join the conversation and let me know your thoughts in the comments! Don't forget to subscribe for more amazing content! 🔔✨"
          },
          {
            platform: "instagram",
            text: "✨ " + content + " What do you think? Tag a friend who needs to see this! 💕 #contentcreator"
          },
          {
            platform: "twitter",
            text: "🚀 " + content + " What's your take on this? Let's discuss! 🧵"
          },
          {
            platform: "linkedin",
            text: "💼 " + content + " I'd love to hear your professional insights on this topic. What has been your experience?"
          }
        ],
        hashtags: [
          {
            platform: "youtube",
            tags: ["#ContentCreator", "#YouTubeTips", "#CreatorLife", "#VideoContent", "#Growth"]
          },
          {
            platform: "instagram",
            tags: ["#Instagram", "#ContentCreator", "#Reels", "#Viral", "#Trending", "#Creator", "#Content", "#Growth"]
          },
          {
            platform: "twitter",
            tags: ["#Twitter", "#ContentStrategy", "#SocialMedia", "#Trending", "#Discussion"]
          },
          {
            platform: "linkedin",
            tags: ["#LinkedIn", "#Professional", "#CareerTips", "#Business", "#Networking", "#Industry"]
          }
        ]
      })
      setIsGenerating(false)
      toast({
        title: "Content Generated! ✨",
        description: "Your captions and hashtags are ready!"
      })
    }, 2000)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`
    })
  }

  const saveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your content has been saved as a draft."
    })
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          <MessageSquare className="w-8 h-8 text-primary" />
          <span>Caption & Hashtag Generator</span>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create platform-specific captions and hashtags optimized for maximum engagement ✨
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              What's On Your Mind Today?
            </CardTitle>
            <CardDescription>
              Share your thoughts, ideas, or content. AI will generate optimized captions and hashtags for each platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Your Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <div className="text-sm text-muted-foreground text-right">
                {content.length} characters
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                onClick={saveDraft}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn-hero flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Captions & Hashtags
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Section */}
      {results && (
        <motion.div 
          className="grid lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Captions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Generated Captions
              </CardTitle>
              <CardDescription>
                Platform-optimized captions for maximum engagement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.captions.map((caption, index) => {
                const platform = platformData[caption.platform as keyof typeof platformData]
                return (
                  <motion.div
                    key={caption.platform}
                    className="p-4 border rounded-lg space-y-3 hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <Badge className={`${platform.color} text-white`}>
                        {platform.icon} {platform.name}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(caption.text, "Caption")}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm leading-relaxed">{caption.text}</p>
                  </motion.div>
                )
              })}
            </CardContent>
          </Card>

          {/* Hashtags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-primary" />
                Generated Hashtags
              </CardTitle>
              <CardDescription>
                SEO-friendly hashtags for discoverability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.hashtags.map((hashtag, index) => {
                const platform = platformData[hashtag.platform as keyof typeof platformData]
                return (
                  <motion.div
                    key={hashtag.platform}
                    className="p-4 border rounded-lg space-y-3 hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <Badge className={`${platform.color} text-white`}>
                        {platform.icon} {platform.name}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(hashtag.tags.join(" "), "Hashtags")}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hashtag.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-muted rounded-md text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}