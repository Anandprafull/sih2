import { useState, useEffect } from "react";
import { useTranslation } from "@/contexts/TranslationContext";
import { Skeleton } from "@/components/ui/skeleton";

interface TranslatedTextProps {
  text: string;
  className?: string;
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  showSkeleton?: boolean;
}

const TranslatedText = ({ 
  text, 
  className = "", 
  as: Component = "span",
  showSkeleton = true 
}: TranslatedTextProps) => {
  const { translate, currentLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState<string>(text);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performTranslation = async () => {
      console.log(`🔍 TranslatedText: text="${text.substring(0, 30)}...", lang=${currentLanguage.code}`);
      
      if (currentLanguage.code === "en") {
        setTranslatedText(text);
        console.log(`⏩ Skipping translation (English)`);
        return;
      }

      setIsLoading(true);
      console.log(`⏳ Starting translation...`);
      try {
        const translated = await translate(text);
        setTranslatedText(translated);
        console.log(`✅ TranslatedText complete: "${translated.substring(0, 30)}..."`);
      } catch (error) {
        console.error("❌ Translation failed:", error);
        setTranslatedText(text);
      } finally {
        setIsLoading(false);
      }
    };

    performTranslation();
  }, [text, currentLanguage, translate]);

  if (isLoading && showSkeleton) {
    return <Skeleton className={`h-4 w-full ${className}`} />;
  }

  return <Component className={className}>{translatedText}</Component>;
};

export default TranslatedText;
