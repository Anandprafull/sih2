import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, FileSearch, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  onViewSample?: () => void;
}

const EmptyState = ({ onViewSample }: EmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 relative"
        >
          <div className="relative inline-block">
            {/* Animated Background Circle */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-hero rounded-full blur-3xl"
            />

            {/* Main Icon */}
            <div className="relative w-48 h-48 mx-auto bg-gradient-card backdrop-blur-sm border-2 border-border rounded-3xl flex items-center justify-center shadow-elegant">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FileSearch className="w-24 h-24 text-muted-foreground" strokeWidth={1.5} />
              </motion.div>

              {/* Floating Sparkles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, (i - 1) * 30, (i - 1) * 50],
                    y: [0, -20 - i * 10, -40 - i * 15],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut",
                  }}
                  className="absolute top-1/2 left-1/2"
                >
                  <Sparkles className="w-4 h-4 text-gold" fill="currentColor" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold font-display text-foreground mb-3">
            No DPR Uploaded Yet
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Upload a Detailed Project Report to get started with AI-powered analysis and
            actionable insights.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow group min-w-[200px]"
            onClick={() => navigate("/")}
          >
            <Upload className="mr-2 h-5 w-5 group-hover:translate-y-[-2px] transition-transform" />
            Upload a DPR
          </Button>

          {onViewSample && (
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 hover:bg-primary/5 min-w-[200px]"
              onClick={onViewSample}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              View Sample Analysis
            </Button>
          )}
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { icon: "📄", title: "PDF Support", desc: "Upload any DPR document" },
            { icon: "⚡", title: "Fast Analysis", desc: "Results in under 30s" },
            { icon: "🎯", title: "Smart Insights", desc: "AI-powered recommendations" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              className="bg-gradient-card border border-border rounded-xl p-4 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmptyState;
