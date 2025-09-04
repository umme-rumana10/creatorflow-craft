import { useState, useRef } from "react"
import { Upload, Download, Sparkles, Image as ImageIcon, FileImage, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const aiStyles = [
  { 
    id: 1, 
    name: "Professional LinkedIn", 
    description: "Clean, business-focused with subtle branding",
    category: "LinkedIn",
    color: "#0077B5"
  },
  { 
    id: 2, 
    name: "YouTube Thumbnail", 
    description: "Eye-catching with bold text and vibrant colors",
    category: "YouTube",
    color: "#FF0000"
  },
  { 
    id: 3, 
    name: "Instagram Story", 
    description: "Modern, aesthetic with trendy filters",
    category: "Instagram",
    color: "#E4405F"
  },
  { 
    id: 4, 
    name: "Instagram Post", 
    description: "Square format with engaging visual elements",
    category: "Instagram",
    color: "#E4405F"
  },
  { 
    id: 5, 
    name: "TikTok Cover", 
    description: "Dynamic and youthful with trending aesthetics",
    category: "TikTok",
    color: "#000000"
  },
  { 
    id: 6, 
    name: "Twitter Header", 
    description: "Minimalist with brand consistency",
    category: "Twitter",
    color: "#1DA1F2"
  }
]

export default function ThumbnailGenerator() {
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedResults, setGeneratedResults] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (file: File) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setUploadedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      toast.success("Image uploaded successfully!")
    } else {
      toast.error("Please upload a JPG or PNG image")
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleImageUpload(files[0])
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleGenerateWithAI = async () => {
    if (!uploadedImage || !selectedStyle) {
      toast.error("Please upload an image and select a style")
      return
    }

    setIsGenerating(true)
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock generated results - in real app, this would be API call
      const mockResults = [
        imagePreview + "?generated=1",
        imagePreview + "?generated=2", 
        imagePreview + "?generated=3"
      ]
      setGeneratedResults(mockResults)
      toast.success("AI generation completed!")
    } catch (error) {
      toast.error("Failed to generate thumbnails")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Thumbnail Generator</h1>
        <p className="text-muted-foreground">
          Upload your image and transform it with AI-powered styles for different platforms
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Upload & Controls Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </CardTitle>
              <CardDescription>JPG or PNG files only</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleFileSelect}
              >
                {imagePreview ? (
                  <div className="space-y-2">
                    <img 
                      src={imagePreview} 
                      alt="Uploaded preview" 
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <>
                    <FileImage className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drop your image here or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImageUpload(file)
                }}
                className="hidden"
              />

              <Button 
                className="w-full" 
                onClick={handleGenerateWithAI}
                disabled={!uploadedImage || !selectedStyle || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* AI Style Selection */}
          <Card>
            <CardHeader>
              <CardTitle>AI Style Selection</CardTitle>
              <CardDescription>Choose the platform style for your thumbnail</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiStyles.map((style) => (
                  <div
                    key={style.id}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                      selectedStyle === style.id 
                        ? 'border-primary shadow-lg' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant="secondary" 
                        style={{ backgroundColor: style.color + '20', color: style.color }}
                      >
                        {style.category}
                      </Badge>
                      {selectedStyle === style.id && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{style.name}</h3>
                    <p className="text-xs text-muted-foreground">{style.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Results Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generated Results</CardTitle>
                  <CardDescription>AI-generated thumbnails will appear here</CardDescription>
                </div>
                {generatedResults.length > 0 && (
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 mx-auto mb-3 animate-spin text-primary" />
                    <p className="text-lg font-medium">Generating thumbnails...</p>
                    <p className="text-sm text-muted-foreground">This may take a few moments</p>
                  </div>
                </div>
              ) : generatedResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {generatedResults.map((result, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <img 
                          src={result} 
                          alt={`Generated result ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button size="sm" variant="secondary">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-lg font-medium">Upload an image and select a style</p>
                    <p className="text-sm">Generated thumbnails will appear here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}