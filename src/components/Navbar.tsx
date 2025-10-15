import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import { 
  FileText, 
  Home, 
  BarChart3, 
  Info, 
  Menu, 
  X,
  Upload,
  Users,
  Target,
  FolderOpen,
  ArrowLeftRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        // Set session storage to indicate document uploaded
        sessionStorage.setItem("hasUploadedDoc", "true");
        toast({
          title: "PDF Uploaded Successfully",
          description: `${file.name} is being analyzed...`,
        });
        setIsOpen(false);
        setTimeout(() => {
          navigate("/analysis");
        }, 1500);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
      }
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Analysis", path: "/analysis", icon: BarChart3 },
    { name: "Projects", path: "/projects", icon: FolderOpen },
    { name: "Compare", path: "/compare", icon: ArrowLeftRight },
  ];

  const isActive = (path: string) => {
    if (path.startsWith("#")) {
      return false; // Handle scroll links separately
    }
    return location.pathname === path;
  };

  const handleNavClick = (path: string) => {
    if (path.startsWith("#")) {
      // Scroll to section
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      // Navigate to home if not already there
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(path);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        className="hidden"
      />
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-md"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="p-2 bg-gradient-hero rounded-lg shadow-glow"
              >
                <FileText className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold font-display bg-gradient-hero bg-clip-text text-transparent">
                  DPR Analyzer
                </h1>
                <p className="text-xs text-muted-foreground">AI-Powered Evaluation</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                
                if (link.path.startsWith("#")) {
                  return (
                    <button
                      key={link.path}
                      onClick={() => handleNavClick(link.path)}
                      className={`
                        relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                        ${active 
                          ? "text-primary" 
                          : "text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {link.name}
                      </span>
                      {active && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-hero"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                }

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                      ${active 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </span>
                    {active && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-hero"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
              <Button
                onClick={handleUploadClick}
                size="sm"
                className="bg-gradient-hero text-primary-foreground shadow-glow hover:shadow-elegant transition-all"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload DPR
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <LanguageSelector compact />
              <ThemeToggle />
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.path);

                  if (link.path.startsWith("#")) {
                    return (
                      <button
                        key={link.path}
                        onClick={() => handleNavClick(link.path)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                          ${active 
                            ? "bg-gradient-hero/10 text-primary border border-primary/20" 
                            : "text-muted-foreground hover:bg-muted"
                          }
                        `}
                      >
                        <Icon className="h-5 w-5" />
                        {link.name}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                        ${active 
                          ? "bg-gradient-hero/10 text-primary border border-primary/20" 
                          : "text-muted-foreground hover:bg-muted"
                        }
                      `}
                    >
                      <Icon className="h-5 w-5" />
                      {link.name}
                    </Link>
                  );
                })}
                
                <Button
                  onClick={handleUploadClick}
                  className="w-full bg-gradient-hero text-primary-foreground shadow-glow mt-4"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload DPR
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from going under navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
