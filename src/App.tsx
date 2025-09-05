import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import CaptionGenerator from "./pages/CaptionGenerator";
import ThumbnailGenerator from "./pages/ThumbnailGenerator";
import VideoEditor from "./pages/VideoEditor";
import Publishing from "./pages/Publishing";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/captions" element={
            <Layout>
              <CaptionGenerator />
            </Layout>
          } />
          <Route path="/thumbnails" element={
            <Layout>
              <ThumbnailGenerator />
            </Layout>
          } />
          <Route path="/videos" element={
            <Layout>
              <VideoEditor />
            </Layout>
          } />
          <Route path="/publishing" element={
            <Layout>
              <Publishing />
            </Layout>
          } />
          <Route path="/analytics" element={
            <Layout>
              <Analytics />
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout>
              <Settings />
            </Layout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
