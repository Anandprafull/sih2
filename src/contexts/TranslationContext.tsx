import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { type Language, languages } from "@/components/LanguageSelector";
import { translateText, getLabel } from "@/lib/translation";

interface TranslationContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (text: string) => Promise<string>;
  t: (key: string) => string;
  isTranslating: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with saved language or default to English
  const getSavedLanguage = (): Language => {
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang) {
      const lang = languages.find((l) => l.code === savedLang);
      if (lang) {
        console.log("🌐 Loaded saved language:", lang.name);
        return lang;
      }
    }
    return languages[0]; // Default to English
  };

  const [currentLanguage, setCurrentLanguage] = useState<Language>(getSavedLanguage());
  const [isTranslating, setIsTranslating] = useState(false);

  const setLanguage = useCallback((language: Language) => {
    console.log("🌐 Setting language to:", language.name);
    setCurrentLanguage(language);
    localStorage.setItem("preferredLanguage", language.code);
  }, []);

  const translate = useCallback(
    async (text: string): Promise<string> => {
      if (currentLanguage.code === "en") {
        return text;
      }
      
      console.log(`🔄 Translation requested: "${text.substring(0, 50)}..." to ${currentLanguage.name}`);
      setIsTranslating(true);
      try {
        const translated = await translateText(text, currentLanguage);
        console.log(`✅ Translation complete: "${translated.substring(0, 50)}..."`);
        return translated;
      } catch (error) {
        console.error("❌ Translation error:", error);
        return text;
      } finally {
        setIsTranslating(false);
      }
    },
    [currentLanguage]
  );

  const t = useCallback(
    (key: string): string => {
      return getLabel(key, currentLanguage.code);
    },
    [currentLanguage]
  );

  return (
    <TranslationContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        translate,
        t,
        isTranslating,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
