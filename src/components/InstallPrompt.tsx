import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if prompt was dismissed before
    const dismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return; // Don't show for 7 days after dismissal
      }
    }

    // Listen for beforeinstallprompt event (Chrome/Edge)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 3 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // For iOS, show instructions after 3 seconds
    if (iOS) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        setShowIOSInstructions(true);
        return;
      }
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSInstructions(false);
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 backdrop-blur-lg">
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {showIOSInstructions ? (
            // iOS Installation Instructions
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Install DPR Analyzer
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add to Home Screen
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">1.</span>
                  Tap the <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">Share</span> button in Safari
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">2.</span>
                  Scroll down and tap <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">Add to Home Screen</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">3.</span>
                  Tap <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">Add</span> in the top right
                </p>
              </div>

              <Button
                onClick={handleDismiss}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Got it!
              </Button>
            </div>
          ) : (
            // Standard Install Prompt
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Install DPR Analyzer
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Access faster with our app
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Install our app for offline access, faster performance, and a native app experience.
              </p>

              <div className="flex gap-2">
                <Button
                  onClick={handleInstallClick}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isIOS ? 'Show Instructions' : 'Install App'}
                </Button>
                <Button
                  onClick={handleDismiss}
                  variant="outline"
                  className="px-4"
                >
                  Later
                </Button>
              </div>

              {/* Features */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <div className="font-semibold text-gray-700 dark:text-gray-300">⚡</div>
                  <div>Fast</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-700 dark:text-gray-300">📴</div>
                  <div>Offline</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-700 dark:text-gray-300">🔔</div>
                  <div>Notifications</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallPrompt;
