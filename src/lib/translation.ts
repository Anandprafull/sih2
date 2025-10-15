import { type Language } from "@/components/LanguageSelector";

// Sarvam AI API configuration
const SARVAM_API_URL = "https://api.sarvam.ai/translate";
const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY || "";

// Translation cache to avoid redundant API calls
const translationCache = new Map<string, Map<string, string>>();

// Language code mapping for Sarvam AI (ISO 639-1)
const languageCodeMapping: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  bn: "bn-IN",
  te: "te-IN",
  mr: "mr-IN",
  gu: "gu-IN",
  kn: "kn-IN",
  ml: "ml-IN",
  pa: "pa-IN",
};

interface TranslationRequest {
  input: string;
  source_language_code: string;
  target_language_code: string;
  speaker_gender?: "Male" | "Female";
  mode?: "formal" | "modern-colloquial" | "classic-colloquial" | "code-mixed";
  model?: "mayura:v1" | "sarvam-translate:v1";
  enable_preprocessing?: boolean;
}

interface TranslationResponse {
  translated_text: string;
}

export const translateText = async (
  text: string,
  targetLanguage: Language,
  sourceLanguage: Language = { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" }
): Promise<string> => {
  // Don't translate if same language
  if (targetLanguage.code === sourceLanguage.code) {
    return text;
  }

  // Check cache first
  const cacheKey = `${sourceLanguage.code}-${targetLanguage.code}`;
  if (!translationCache.has(cacheKey)) {
    translationCache.set(cacheKey, new Map());
  }
  
  const langCache = translationCache.get(cacheKey)!;
  if (langCache.has(text)) {
    return langCache.get(text)!;
  }

  // If no API key, return original text with note
  if (!SARVAM_API_KEY) {
    console.warn("⚠️ Sarvam AI API key not configured. Translation disabled.");
    console.warn("Add VITE_SARVAM_API_KEY to your .env file");
    return text;
  }

  try {
    console.log(`🌐 Translating: "${text.substring(0, 50)}..." from ${sourceLanguage.code} to ${targetLanguage.code}`);
    
    const requestBody: TranslationRequest = {
      input: text,
      source_language_code: languageCodeMapping[sourceLanguage.code] || "en-IN",
      target_language_code: languageCodeMapping[targetLanguage.code] || targetLanguage.code,
      mode: "formal",
      model: "sarvam-translate:v1",
      enable_preprocessing: true,
    };

    console.log(`📤 Request body:`, JSON.stringify(requestBody, null, 2));

    const response = await fetch(SARVAM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": SARVAM_API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    console.log(`📥 Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Translation API error (${response.status}):`, errorText);
      throw new Error(`Translation API error: ${response.statusText}`);
    }

    const data: TranslationResponse = await response.json();
    const translatedText = data.translated_text;

    console.log(`✅ Translated successfully: "${translatedText.substring(0, 50)}..."`);

    // Cache the translation
    langCache.set(text, translatedText);

    return translatedText;
  } catch (error) {
    console.error("❌ Translation error:", error);
    // Return original text on error
    return text;
  }
};

export const translateBatch = async (
  texts: string[],
  targetLanguage: Language,
  sourceLanguage: Language = { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" }
): Promise<string[]> => {
  // For batch translation, we'll translate each text individually
  // In production, consider implementing a proper batch API if available
  const translations = await Promise.all(
    texts.map((text) => translateText(text, targetLanguage, sourceLanguage))
  );
  return translations;
};

export const clearTranslationCache = () => {
  translationCache.clear();
};

// Pre-translated common UI labels for better UX (fallback when API is slow)
export const commonLabels: Record<string, Record<string, string>> = {
  en: {
    projectName: "Project Name",
    totalOutlay: "Total Outlay",
    duration: "Duration",
    status: "Status",
    location: "Location",
    objective: "Objective",
    budgetBreakdown: "Budget Breakdown",
    risks: "Risk Analysis",
    redFlags: "Critical Red Flags",
    discussionPoints: "Key Discussion Points",
    swotAnalysis: "SWOT Analysis",
    strengths: "Strengths",
    weaknesses: "Weaknesses",
    opportunities: "Opportunities",
    threats: "Threats",
    export: "Export",
    save: "Save",
    share: "Share",
    search: "Search",
    filter: "Filter",
    loading: "Loading",
    analyzing: "Analyzing",
  },
  hi: {
    projectName: "परियोजना का नाम",
    totalOutlay: "कुल परिव्यय",
    duration: "अवधि",
    status: "स्थिति",
    location: "स्थान",
    objective: "उद्देश्य",
    budgetBreakdown: "बजट विवरण",
    risks: "जोखिम विश्लेषण",
    redFlags: "महत्वपूर्ण चेतावनियाँ",
    discussionPoints: "मुख्य चर्चा बिंदु",
    swotAnalysis: "SWOT विश्लेषण",
    strengths: "ताकत",
    weaknesses: "कमजोरियाँ",
    opportunities: "अवसर",
    threats: "खतरे",
    export: "निर्यात",
    save: "सहेजें",
    share: "साझा करें",
    search: "खोजें",
    filter: "फ़िल्टर",
    loading: "लोड हो रहा है",
    analyzing: "विश्लेषण हो रहा है",
  },
  ta: {
    projectName: "திட்டத்தின் பெயர்",
    totalOutlay: "மொத்த செலவு",
    duration: "காலம்",
    status: "நிலை",
    location: "இடம்",
    objective: "நோக்கம்",
    budgetBreakdown: "பட்ஜெட் விவரம்",
    risks: "இடர் பகுப்பாய்வு",
    redFlags: "முக்கிய எச்சரிக்கைகள்",
    discussionPoints: "முக்கிய விவாத புள்ளிகள்",
    swotAnalysis: "SWOT பகுப்பாய்வு",
    strengths: "பலம்",
    weaknesses: "பலவீனங்கள்",
    opportunities: "வாய்ப்புகள்",
    threats: "அச்சுறுத்தல்கள்",
    export: "ஏற்றுமதி",
    save: "சேமிக்கவும்",
    share: "பகிர்",
    search: "தேடல்",
    filter: "வடிகட்டி",
    loading: "ஏற்றுகிறது",
    analyzing: "பகுப்பாய்வு செய்கிறது",
  },
  bn: {
    projectName: "প্রকল্পের নাম",
    totalOutlay: "মোট ব্যয়",
    duration: "সময়কাল",
    status: "অবস্থা",
    location: "অবস্থান",
    objective: "উদ্দেশ্য",
    budgetBreakdown: "বাজেট বিবরণ",
    risks: "ঝুঁকি বিশ্লেষণ",
    redFlags: "গুরুত্বপূর্ণ সতর্কতা",
    discussionPoints: "মূল আলোচনা পয়েন্ট",
    swotAnalysis: "SWOT বিশ্লেষণ",
    strengths: "শক্তি",
    weaknesses: "দুর্বলতা",
    opportunities: "সুযোগ",
    threats: "হুমকি",
    export: "রপ্তানি",
    save: "সংরক্ষণ",
    share: "শেয়ার",
    search: "অনুসন্ধান",
    filter: "ফিল্টার",
    loading: "লোড হচ্ছে",
    analyzing: "বিশ্লেষণ করা হচ্ছে",
  },
};

export const getLabel = (key: string, languageCode: string): string => {
  return commonLabels[languageCode]?.[key] || commonLabels.en[key] || key;
};
