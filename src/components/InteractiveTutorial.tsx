import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target: string; // CSS selector for highlighting
  position: "top" | "bottom" | "left" | "right";
  image?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "Welcome to DPR Analyzer! 🎉",
    description: "Let's take a quick tour to help you get started with AI-powered project evaluation.",
    target: "body",
    position: "bottom",
  },
  {
    id: "upload",
    title: "Upload Your DPR",
    description: "Drag and drop your PDF document here or click to browse. We support files up to 50MB.",
    target: "[data-tutorial='upload-section']",
    position: "bottom",
  },
  {
    id: "analysis",
    title: "AI Analysis",
    description: "Our AI will analyze your document in 3-5 seconds, extracting key insights, risks, and recommendations.",
    target: "[data-tutorial='analysis-tabs']",
    position: "bottom",
  },
  {
    id: "charts",
    title: "Interactive Visualizations",
    description: "Click on chart segments to see detailed breakdowns. All charts are interactive and exportable.",
    target: "[data-tutorial='charts']",
    position: "top",
  },
  {
    id: "export",
    title: "Export Your Data",
    description: "Export analysis results to Excel or JSON format for reporting and sharing.",
    target: "[data-tutorial='export-button']",
    position: "left",
  },
  {
    id: "save",
    title: "Save for Later",
    description: "Save your analysis locally. You can store up to 10 analyses and access them offline.",
    target: "[data-tutorial='save-button']",
    position: "left",
  },
  {
    id: "language",
    title: "Multilingual Support",
    description: "Switch between 10 Indian languages. Translations are cached for faster loading.",
    target: "[data-tutorial='language-selector']",
    position: "bottom",
  },
  {
    id: "shortcuts",
    title: "Keyboard Shortcuts",
    description: "Press Shift + ? anytime to see all keyboard shortcuts. Use Ctrl+K to search.",
    target: "body",
    position: "bottom",
  },
];

const InteractiveTutorial = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompletedTutorial, setHasCompletedTutorial] = useState(false);

  useEffect(() => {
    // Check if user has completed tutorial
    const completed = localStorage.getItem("tutorial-completed");
    if (!completed) {
      // Show tutorial after 2 seconds on first visit
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setHasCompletedTutorial(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTutorial = () => {
    setIsActive(false);
    localStorage.setItem("tutorial-completed", "true");
    setHasCompletedTutorial(true);
  };

  const completeTutorial = () => {
    setIsActive(false);
    localStorage.setItem("tutorial-completed", "true");
    setHasCompletedTutorial(true);

    // Celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const restartTutorial = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  const step = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  if (!isActive && !hasCompletedTutorial) return null;

  return (
    <>
      {/* Restart Tutorial Button (for users who completed it) */}
      {hasCompletedTutorial && !isActive && (
        <Button
          onClick={restartTutorial}
          className="fixed bottom-32 right-4 z-40 rounded-full shadow-lg md:bottom-20"
          size="sm"
          variant="outline"
          title="Restart Tutorial"
        >
          <span className="mr-2">🎓</span>
          Tutorial
        </Button>
      )}

      {/* Tutorial Overlay */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={skipTutorial}
            />

            {/* Tutorial Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[70] p-4"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                {/* Progress Bar */}
                <div className="h-2 bg-gray-200 dark:bg-gray-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Close Button */}
                  <button
                    onClick={skipTutorial}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    aria-label="Skip tutorial"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Step Number */}
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    Step {currentStep + 1} of {tutorialSteps.length}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Image (if any) */}
                  {step.image && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                      <img src={step.image} alt={step.title} className="w-full" />
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      variant="outline"
                      size="sm"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>

                    <div className="flex gap-1">
                      {tutorialSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentStep
                              ? "bg-blue-600 w-6"
                              : index < currentStep
                              ? "bg-green-600"
                              : "bg-gray-300 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                      size="sm"
                    >
                      {currentStep === tutorialSteps.length - 1 ? (
                        <>
                          Finish
                          <CheckCircle2 className="w-4 h-4 ml-1" />
                        </>
                      ) : (
                        <>
                          Next
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Skip Button */}
                  <button
                    onClick={skipTutorial}
                    className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    Skip tutorial
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractiveTutorial;
