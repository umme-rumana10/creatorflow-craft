import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function About() {
  const navigate = useNavigate()
  const [currentGradient, setCurrentGradient] = useState(0)

  const gradients = [
    "from-amber-400 via-orange-500 to-pink-500",
    "from-pink-500 via-purple-500 to-cyan-400",
    "from-cyan-400 via-blue-500 to-purple-500",
    "from-purple-500 via-pink-500 to-orange-500",
    "from-orange-500 via-amber-400 to-pink-500"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.7 + 0.3,
    color: Math.random() > 0.5 ? 'bg-yellow-400/30' : 'bg-cyan-400/30'
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Layered Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20"></div>
      
      {/* Enhanced Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-${Math.ceil(particle.size)} h-${Math.ceil(particle.size)} ${particle.color} rounded-full blur-sm`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Navbar */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CreatorFlow</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              className="text-white hover:text-primary-glow transition-colors relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-primary-glow transition-colors relative group"
              onClick={() => navigate('/login')}
            >
              Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          {/* Animated Rainbow Title */}
          <motion.h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r ${gradients[currentGradient]} bg-clip-text text-transparent transition-all duration-1000 ease-in-out`}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.3)) drop-shadow(0 0 40px rgba(168, 85, 247, 0.4))',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ✨ CREATORFLOW
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            CreatorFlow is your AI-powered content creation companion 🚀.<br />
            From captions & hashtags 🎨 to thumbnails 🎥, videos 🎬, and analytics 📊 —<br />
            everything you need to create, publish, and grow your brand effortlessly.
          </motion.p>

          {/* Animated Typing Effect */}
          <motion.p 
            className="text-2xl md:text-3xl font-semibold text-primary-glow mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 0.8 }}
              className="inline-block overflow-hidden whitespace-nowrap"
            >
              Create. Publish. Grow.
            </motion.span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button 
              className="btn-hero text-lg px-12 py-6 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50"
              onClick={() => navigate('/login')}
            >
              🚀 Start Now
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}