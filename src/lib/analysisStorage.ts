// Utility functions for managing saved analyses in localStorage

export interface SavedAnalysis {
  id: string;
  projectName: string;
  uploadDate: string;
  totalOutlay: number;
  duration: string;
  status: string;
  thumbnail?: string;
}

const STORAGE_KEY = "saved_analyses";
const MAX_SAVED = 10; // Keep last 10 analyses

export const saveAnalysis = (analysis: Omit<SavedAnalysis, "id" | "uploadDate">): void => {
  try {
    const existing = getSavedAnalyses();
    const newAnalysis: SavedAnalysis = {
      ...analysis,
      id: `analysis_${Date.now()}`,
      uploadDate: new Date().toISOString(),
    };

    // Add to beginning of array (most recent first)
    const updated = [newAnalysis, ...existing].slice(0, MAX_SAVED);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving analysis:", error);
  }
};

export const getSavedAnalyses = (): SavedAnalysis[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error getting saved analyses:", error);
    return [];
  }
};

export const getAnalysisById = (id: string): SavedAnalysis | null => {
  const analyses = getSavedAnalyses();
  return analyses.find((a) => a.id === id) || null;
};

export const deleteAnalysis = (id: string): void => {
  try {
    const existing = getSavedAnalyses();
    const updated = existing.filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error deleting analysis:", error);
  }
};

export const clearAllAnalyses = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing analyses:", error);
  }
};

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
