import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * Page Transition Variants
 * Use these with AnimatePresence in your router
 */

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const,
    },
  },
};

/**
 * Enhanced Confetti Triggers
 * Multiple success celebration scenarios
 */

export const triggerSuccessConfetti = () => {
  // Using canvas-confetti
  const duration = 3000;
  const end = Date.now() + duration;

  const colors = ["#0066FF", "#764ba2", "#10b981", "#f59e0b"];

  (function frame() {
    if (typeof window === "undefined" || !(window as any).confetti) return;

    (window as any).confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });

    (window as any).confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

export const triggerMilestoneConfetti = () => {
  if (typeof window === "undefined" || !(window as any).confetti) return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: any) {
    (window as any).confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const triggerComparisonComplete = () => {
  if (typeof window === "undefined" || !(window as any).confetti) return;

  (window as any).confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#0066FF", "#764ba2"],
  });
};

export const triggerSaveSuccess = () => {
  if (typeof window === "undefined" || !(window as any).confetti) return;

  (window as any).confetti({
    particleCount: 50,
    angle: 90,
    spread: 45,
    origin: { y: 0.8 },
    colors: ["#10b981"],
  });
};

export const triggerExportSuccess = () => {
  if (typeof window === "undefined" || !(window as any).confetti) return;

  // Fireworks effect
  const duration = 2000;
  const end = Date.now() + duration;

  (function frame() {
    (window as any).confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
    });
    (window as any).confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

/**
 * Loading Bar for Page Transitions
 */

export const usePageLoadingBar = () => {
  const navigate = useNavigate();

  const navigateWithLoading = (path: string) => {
    // Show loading bar
    const loadingBar = document.createElement("div");
    loadingBar.className = "fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-[9999] animate-loading-bar";
    document.body.appendChild(loadingBar);

    // Navigate after brief delay
    setTimeout(() => {
      navigate(path);
      loadingBar.remove();
    }, 300);
  };

  return navigateWithLoading;
};

// Add this to your global CSS
export const loadingBarStyles = `
@keyframes loading-bar {
  0% {
    width: 0%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}

.animate-loading-bar {
  animation: loading-bar 0.3s ease-out forwards;
}
`;
