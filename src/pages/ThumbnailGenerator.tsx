import { useState } from "react"
import { Upload, Palette, Type, Download, Sparkles, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

const templateCategories = [
  "YouTube Thumbnails",
  "Instagram Posts",
  "TikTok Covers", 
  "LinkedIn Banners"
]

const templates = [
  { id: 1, name: "Bold Gaming", category: "YouTube Thumbnails", color: "#FF6B6B" },
  { id: 2, name: "Clean Business", category: "LinkedIn Banners", color: "#4ECDC4" },
  { id: 3, name: "Vibrant Lifestyle", category: "Instagram Posts", color: "#45B7D1" },
  { id: 4, name: "Dark Tech", category: "YouTube Thumbnails", color: "#96CEB4" },
  { id: 5, name: "Minimalist", category: "TikTok Covers", color: "#FFEAA7" },
  { id: 6, name: "Educational", category: "YouTube Thumbnails", color: "#DDA0DD" },
]

const brandColors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", 
  "#FFEAA7", "#DDA0DD", "#FF7675", "#74B9FF"
]

export default function ThumbnailGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [selectedColor, setSelectedColor] = useState(brandColors[0])
  const [fontSize, setFontSize] = useState([24])

  const filteredTemplates = selectedCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Thumbnail & Graphics Generator</h1>
        <p className="text-muted-foreground">
          Create stunning thumbnails and graphics with AI-powered design tools
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upload Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drop your image here or click to browse
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
              <Button className="w-full" variant="secondary">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate with AI
              </Button>
            </CardContent>
          </Card>

          {/* Design Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Design Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Text Content */}
              <div className="space-y-2">
                <Label htmlFor="title">Title Text</Label>
                <Input
                  id="title"
                  placeholder="Enter main title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  placeholder="Enter subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </div>

              {/* Brand Colors */}
              <div className="space-y-2">
                <Label>Brand Color</Label>
                <div className="grid grid-cols-4 gap-2">
                  {brandColors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-md border-2 transition-all ${
                        selectedColor === color ? 'border-ring scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <Label>Font Size: {fontSize[0]}px</Label>
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  max={48}
                  min={12}
                  step={2}
                  className="w-full"
                />
              </div>

              {/* Font Style */}
              <div className="space-y-2">
                <Label>Font Style</Label>
                <Select defaultValue="bold">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="italic">Italic</SelectItem>
                    <SelectItem value="condensed">Condensed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Template Gallery */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Template Gallery</CardTitle>
                  <CardDescription>Choose from professionally designed templates</CardDescription>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {templateCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`relative aspect-video rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                      selectedTemplate === template.id 
                        ? 'border-primary shadow-lg' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ backgroundColor: template.color + '20' }}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="font-medium text-sm">{template.name}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Preview</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Type className="w-4 h-4 mr-2" />
                    Edit Text
                  </Button>
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                {selectedTemplate ? (
                  <div className="text-center">
                    <div 
                      className="w-full max-w-md mx-auto p-6 rounded-lg"
                      style={{ backgroundColor: selectedColor + '10', border: `2px solid ${selectedColor}` }}
                    >
                      <h2 
                        className="font-bold mb-2"
                        style={{ 
                          fontSize: `${fontSize[0]}px`, 
                          color: selectedColor,
                          lineHeight: 1.2
                        }}
                      >
                        {title || "Your Title Here"}
                      </h2>
                      {subtitle && (
                        <p className="text-muted-foreground" style={{ fontSize: `${fontSize[0] * 0.6}px` }}>
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-lg font-medium">Select a template to preview</p>
                    <p className="text-sm">Your design will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}