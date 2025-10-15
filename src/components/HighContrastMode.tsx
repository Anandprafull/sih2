import { useEffect } from "react";
import "../styles/high-contrast.css";

/**
 * High Contrast Mode Component
 * Automatically detects and applies high contrast styles
 */
const HighContrastMode = () => {
  useEffect(() => {
    // Check for high contrast preference
    const mediaQuery = window.matchMedia("(prefers-contrast: high)");
    
    const applyHighContrast = (matches: boolean) => {
      if (matches) {
        document.documentElement.classList.add("high-contrast");
        document.documentElement.setAttribute("data-contrast", "high");
      } else {
        document.documentElement.classList.remove("high-contrast");
        document.documentElement.removeAttribute("data-contrast");
      }
    };

    // Initial check
    applyHighContrast(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => applyHighContrast(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return null;
};

export default HighContrastMode;
