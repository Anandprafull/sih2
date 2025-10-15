import { useTranslation } from "@/contexts/TranslationContext";
import { Button } from "@/components/ui/button";
import TranslatedText from "@/components/TranslatedText";
import { languages } from "@/components/LanguageSelector";

const TranslationTest = () => {
  const { currentLanguage, setLanguage } = useTranslation();

  console.log("🧪 TranslationTest Panel Mounted!");
  console.log("🌐 Current Language:", currentLanguage.name, currentLanguage.code);

  return (
    <div className="fixed bottom-4 right-4 z-50 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border-2 border-blue-500 max-w-md">
      <h3 className="text-lg font-bold mb-4 text-blue-600">🧪 Translation Test Panel</h3>
      
      <div className="space-y-4">
        {/* Current Language Display */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">Current Language:</div>
          <div className="text-lg font-bold text-blue-600">
            {currentLanguage.flag} {currentLanguage.nativeName} ({currentLanguage.code})
          </div>
        </div>

        {/* Language Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => setLanguage(languages[0])} 
            size="sm"
            variant={currentLanguage.code === "en" ? "default" : "outline"}
          >
            🇬🇧 English
          </Button>
          <Button
            onClick={() => setLanguage(languages[1])} 
            size="sm"
            variant={currentLanguage.code === "hi" ? "default" : "outline"}
          >
            🇮🇳 हिंदी
          </Button>
          <Button
            onClick={() => setLanguage(languages[2])} 
            size="sm"
            variant={currentLanguage.code === "ta" ? "default" : "outline"}
          >
            🇮🇳 தமிழ்
          </Button>
          <Button
            onClick={() => setLanguage(languages[3])} 
            size="sm"
            variant={currentLanguage.code === "bn" ? "default" : "outline"}
          >
            🇮🇳 বাংলা
          </Button>
        </div>

        {/* Test Translations */}
        <div className="space-y-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">Test Translations:</div>
          <div className="text-sm">
            <strong>Test 1:</strong> <TranslatedText text="Hello World" />
          </div>
          <div className="text-sm">
            <strong>Test 2:</strong> <TranslatedText text="Welcome to our application" />
          </div>
          <div className="text-sm">
            <strong>Test 3:</strong> <TranslatedText text="Upload a DPR" />
          </div>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 border-t pt-2">
          💡 Open DevTools Console (F12) to see translation logs
        </div>
      </div>
    </div>
  );
};

export default TranslationTest;
