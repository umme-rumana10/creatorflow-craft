import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Scissors, Music, Download, Send, RotateCcw, Upload, FileText, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function VideoEditor() {
  const [script, setScript] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [hasVideo, setHasVideo] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([80])
  const [currentTime, setCurrentTime] = useState([15])
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [selectedMusic, setSelectedMusic] = useState("Upbeat Indie")
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const musicOptions = [
    "Upbeat Indie", "Cinematic Epic", "Chill Lo-Fi", "Corporate Clean", "None"
  ]

  const exportFormats = [
    { name: "HD (1080p) - YouTube", resolution: "1920x1080", format: "MP4" },
    { name: "SD (720p) - General", resolution: "1280x720", format: "MP4" },
    { name: "Instagram Reels", resolution: "1080x1920", format: "MP4" },
    { name: "YouTube Shorts", resolution: "1080x1920", format: "MP4" },
    { name: "TikTok", resolution: "1080x1920", format: "MP4" },
    { name: "Square - Instagram Post", resolution: "1080x1080", format: "MP4" }
  ]

  const handleFileUpload = (file: File) => {
    if (file.type === "text/plain" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (file.type === "text/plain") {
          setScript(e.target?.result as string)
        } else {
          // For .docx files, we'd need a proper parser - for now just show filename
          setScript(`[Uploaded: ${file.name}]\n\nPlease paste your script content here...`)
        }
        toast.success("Script uploaded successfully!")
      }
      reader.readAsText(file)
    } else {
      toast.error("Please upload a .txt or .docx file")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const generateVideo = () => {
    if (!script.trim()) {
      toast.error("Please add a script first")
      return
    }
    
    setIsGenerating(true)
    setGenerationProgress(0)
    
    // Simulate video generation progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setHasVideo(true)
          toast.success("Video generated successfully!")
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Video Generator</h1>
        <p className="text-muted-foreground">
          Upload your script and generate professional videos with AI
        </p>
      </div>

      {/* Script Input Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Your Script
          </CardTitle>
          <CardDescription>
            Upload a script file (.txt, .docx) or paste your content directly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop your script file here, or{" "}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-primary hover:underline"
              >
                browse files
              </button>
            </p>
            <p className="text-xs text-muted-foreground">
              Supports .txt and .docx files
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file)
              }}
              className="hidden"
            />
          </div>

          {/* Script Textarea */}
          <div className="space-y-2">
            <Label htmlFor="script">Script Content</Label>
            <Textarea
              id="script"
              placeholder="Paste or type your script here..."
              value={script}
              onChange={(e) => setScript(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>

          {/* Generate Button */}
          <div className="space-y-4">
            <Button 
              onClick={generateVideo}
              disabled={isGenerating || !script.trim()}
              className="w-full bg-gradient-to-r from-primary to-accent text-white"
              size="lg"
            >
              {isGenerating ? "Generating Video..." : "Generate Video"}
            </Button>
            
            {/* Progress Bar */}
            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Generating your video...</span>
                  <span>{Math.round(generationProgress)}%</span>
                </div>
                <Progress value={generationProgress} className="w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Video Preview Section - Only show if video exists */}
      {hasVideo && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Video Preview</CardTitle>
                  <Badge variant="secondary">AI Generated • 30s</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Video Player Area */}
                <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8 ml-1" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Your AI-Generated Video</h3>
                      <p className="text-white/80">Click play to preview your content</p>
                    </div>
                  </div>
                  
                  {/* Subtitles Overlay */}
                  {showSubtitles && (
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <div className="bg-black/80 rounded px-3 py-1 inline-block">
                        <p className="text-white text-sm">
                          "Welcome to the top 5 social media tips that will transform your content..."
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              {/* Player Controls */}
              <div className="space-y-4">
                {/* Timeline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{Math.floor(currentTime[0] / 60)}:{String(currentTime[0] % 60).padStart(2, '0')}</span>
                    <span>0:30</span>
                  </div>
                  <Slider
                    value={currentTime}
                    onValueChange={setCurrentTime}
                    max={30}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentTime([Math.max(0, currentTime[0] - 10)])}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="default"
                    size="lg"
                    className="rounded-full w-12 h-12"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  
                  <div className="flex items-center space-x-2 min-w-[100px]">
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      min={0}
                      step={5}
                      className="w-20"
                    />
                    <span className="text-xs text-muted-foreground w-8">{volume[0]}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <Separator />
              <div className="flex items-center justify-between pt-4">
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Scissors className="w-4 h-4 mr-2" />
                    Trim
                  </Button>
                  <Button variant="outline">
                    Regenerate Scene
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Video
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                      {exportFormats.map((format) => (
                        <DropdownMenuItem key={format.name} className="flex flex-col items-start py-3">
                          <div className="font-medium">{format.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {format.resolution} • {format.format}
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button className="bg-gradient-to-r from-primary to-accent text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Send to Publishing
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Editor Controls */}
        <div className="space-y-6">
          {/* Subtitle Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Subtitle Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="subtitles" className="text-sm font-medium">
                  Show Subtitles
                </Label>
                <Switch
                  id="subtitles"
                  checked={showSubtitles}
                  onCheckedChange={setShowSubtitles}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm">Subtitle Style</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">Classic</Button>
                  <Button variant="outline" size="sm">Modern</Button>
                  <Button variant="outline" size="sm">Bold</Button>
                  <Button variant="outline" size="sm">Minimal</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Position</Label>
                <div className="grid grid-cols-3 gap-1">
                  <Button variant="outline" size="sm">Top</Button>
                  <Button variant="default" size="sm">Center</Button>
                  <Button variant="outline" size="sm">Bottom</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Background Music */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Music className="w-4 h-4 mr-2" />
                Background Music
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Music Track</Label>
                <div className="space-y-2">
                  {musicOptions.map((music) => (
                    <div key={music} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="music"
                        id={music}
                        checked={selectedMusic === music}
                        onChange={() => setSelectedMusic(music)}
                        className="w-4 h-4 text-primary"
                      />
                      <Label htmlFor={music} className="text-sm cursor-pointer">
                        {music}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Music Volume</Label>
                <Slider
                  defaultValue={[30]}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>

              <Button variant="outline" className="w-full">
                Preview Music
              </Button>
            </CardContent>
          </Card>

          {/* Video Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Video Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">0:30</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Resolution</span>
                <span className="font-medium">1080x1920</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bitrate</span>
                <span className="font-medium">8.5 Mbps</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Format</span>
                <span className="font-medium">MP4</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">File Size</span>
                <span className="font-medium">~15 MB</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="secondary">Ready to Export</Badge>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      )}

      {/* Show message if no video generated yet */}
      {!hasVideo && !isGenerating && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No video generated yet</h3>
              <p>Add your script above and click "Generate Video" to get started</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}