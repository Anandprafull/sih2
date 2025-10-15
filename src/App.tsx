import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "@/contexts/TranslationContext";
import Navbar from "./components/Navbar";
import InstallPrompt from "./components/InstallPrompt";
import HighContrastMode from "./components/HighContrastMode";
import KeyboardShortcutsGuide from "./components/KeyboardShortcutsGuide";
import MobileBottomNav from "./components/MobileBottomNav";
import InteractiveTutorial from "./components/InteractiveTutorial";
import TranslationTest from "./components/TranslationTest";
import Index from "./pages/Index";
import ProposalAnalysis from "./pages/ProposalAnalysisNew";
import ProjectsGallery from "./pages/ProjectsGallery";
import DPRComparison from "./pages/DPRComparison";
import UserSettings from "./pages/UserSettings";
import SampleProjects from "./pages/SampleProjects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Global keyboard shortcuts
const globalShortcuts = [
  { keys: ["Shift", "?"], description: "Show this keyboard shortcuts guide", category: "General" },
  { keys: ["Ctrl/⌘", "K"], description: "Focus search", category: "Navigation" },
  { keys: ["Ctrl/⌘", "H"], description: "Go to home", category: "Navigation" },
  { keys: ["Ctrl/⌘", "U"], description: "Upload document", category: "Actions" },
  { keys: ["Ctrl/⌘", "S"], description: "Save current analysis", category: "Actions" },
  { keys: ["Ctrl/⌘", "E"], description: "Export data", category: "Actions" },
  { keys: ["Esc"], description: "Close modal/dialog", category: "General" },
  { keys: ["Tab"], description: "Navigate forward", category: "Navigation" },
  { keys: ["Shift", "Tab"], description: "Navigate backward", category: "Navigation" },
  { keys: ["Enter"], description: "Activate focused element", category: "General" },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TranslationProvider>
      <TooltipProvider>
        <HighContrastMode />
        <Toaster />
        <Sonner />
        <InstallPrompt />
        <KeyboardShortcutsGuide shortcuts={globalShortcuts} />
        <InteractiveTutorial />
        <BrowserRouter>
          {/* Skip to main content link for screen readers */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" role="main" className="pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/analysis" element={<ProposalAnalysis />} />
              <Route path="/projects" element={<ProjectsGallery />} />
              <Route path="/compare" element={<DPRComparison />} />
              <Route path="/settings" element={<UserSettings />} />
              <Route path="/samples" element={<SampleProjects />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <TranslationTest />
          <MobileBottomNav />
        </BrowserRouter>
      </TooltipProvider>
    </TranslationProvider>
  </QueryClientProvider>
);

export default App;
