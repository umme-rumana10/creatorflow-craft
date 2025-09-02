import { useState } from "react"
import { Sparkles, Copy, Save, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function ScriptGenerator() {
  const [script, setScript] = useState("")
  const [generatedCaption, setGeneratedCaption] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [seoScore, setSeoScore] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!script.trim()) return
    
    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedCaption("🎯 Ready to transform your content creation game? Here's the ultimate guide that content creators don't want you to know! From scripting to publishing, discover the secrets that helped me grow to 100K+ followers. Save this post and let me know which tip you'll try first! 💫")
      setHashtags(["#ContentCreator", "#SocialMediaTips", "#CreatorTips", "#DigitalMarketing", "#ContentStrategy", "#YouTubeShorts", "#InstagramReels", "#TikTokTips"])
      setSeoScore(87)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Script & Caption Generator</h1>
        <p className="text-muted-foreground">
          Transform your scripts into engaging captions and hashtags with AI assistance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Script Input */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-primary" />
                Your Script
              </CardTitle>
              <CardDescription>
                Paste or type your video script here. The AI will analyze it to generate optimized captions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="script">Video Script</Label>
                <Textarea
                  id="script"
                  placeholder="Paste your video script here... 

Example: 'Hey everyone! Today I'm sharing the top 5 social media tips that helped me grow my following to 100K. First tip is consistency - posting at the same time daily increases engagement by 23%...'"
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="min-h-[300px] resize-none"
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
                    {isGenerating ? "Generating..." : "Generate with AI"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generated Content */}
        <div className="space-y-6">
          {/* SEO Score */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SEO Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{seoScore}/100</span>
                <Badge variant={seoScore >= 80 ? "default" : seoScore >= 60 ? "secondary" : "outline"}>
                  {seoScore >= 80 ? "Excellent" : seoScore >= 60 ? "Good" : "Needs Work"}
                </Badge>
              </div>
              <Progress value={seoScore} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Based on engagement keywords, length, and hashtag optimization
              </p>
            </CardContent>
          </Card>

          {/* Generated Caption */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Generated Caption
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedCaption ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <p className="text-sm leading-relaxed">{generatedCaption}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  <p>Your AI-generated caption will appear here</p>
                  <p className="text-sm">Add your script and click "Generate with AI"</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hashtags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Hashtags
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hashtags.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{hashtags.length} hashtags generated</span>
                    <Button variant="link" size="sm" className="px-0">
                      Customize hashtags
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Trending hashtags will appear here</p>
                  <p className="text-sm">Generated based on your script content</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}