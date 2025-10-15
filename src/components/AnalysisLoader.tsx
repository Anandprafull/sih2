import { motion } from "framer-motion";
import { FileText, Brain, BarChart3, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const AnalysisLoader = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: FileText, label: "Parsing Document", duration: 1000 },
    { icon: Brain, label: "AI Analysis", duration: 1500 },
    { icon: BarChart3, label: "Generating Insights", duration: 1200 },
    { icon: CheckCircle2, label: "Finalizing Report", duration: 800 },
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let stepTimeout: NodeJS.Timeout;
    let currentProgress = 0;
    let stepIndex = 0;

    const updateProgress = () => {
      progressInterval = setInterval(() => {
        currentProgress += 2;
        setProgress(Math.min(currentProgress, 100));

        if (currentProgress >= 100) {
          clearInterval(progressInterval);
        }
      }, 50);
    };

    const updateSteps = () => {
      const cycleThroughSteps = () => {
        if (stepIndex < steps.length) {
          setCurrentStep(stepIndex);
          stepTimeout = setTimeout(() => {
            stepIndex++;
            cycleThroughSteps();
          }, steps[stepIndex].duration);
        }
      };
      cycleThroughSteps();
    };

    updateProgress();
    updateSteps();

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8 shadow-elegant">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center shadow-glow">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold font-display text-foreground mb-2">
              Analyzing Your DPR
            </h2>
            <p className="text-muted-foreground">
              Our AI is processing your document and generating comprehensive insights...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm font-bold text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                    isActive
                      ? "bg-primary/10 border-primary/50 shadow-md"
                      : isCompleted
                      ? "bg-emerald/5 border-emerald/30"
                      : "bg-muted/30 border-border"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-hero shadow-glow"
                        : isCompleted
                        ? "bg-emerald"
                        : "bg-muted"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <StepIcon
                        className={`w-5 h-5 ${
                          isActive ? "text-primary-foreground" : "text-muted-foreground"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        isActive
                          ? "text-primary font-semibold"
                          : isCompleted
                          ? "text-emerald"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {isActive && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-8 p-4 bg-gradient-gold/10 border border-gold/20 rounded-lg"
          >
            <p className="text-sm text-center text-muted-foreground">
              <span className="font-semibold text-foreground">Did you know?</span> Our AI
              can analyze a 100-page DPR in under 30 seconds—60% faster than traditional
              methods!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisLoader;
