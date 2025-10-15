import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Key, Globe, Moon, Sun, Shield, Database, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const UserSettings = () => {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_SARVAM_API_KEY || "");
  const [notifications, setNotifications] = useState({
    analysisComplete: true,
    weeklyDigest: false,
    systemUpdates: true,
    riskAlerts: true,
  });
  const [privacy, setPrivacy] = useState({
    saveAnalyses: true,
    autoDelete: false,
    encryptData: true,
  });

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const handleExportData = () => {
    const data = {
      savedAnalyses: localStorage.getItem("savedAnalyses"),
      settings: {
        theme: localStorage.getItem("theme"),
        language: localStorage.getItem("preferredLanguage"),
      },
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dpr-analyzer-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Data exported successfully!");
  };

  const handleClearData = () => {
    if (confirm("Are you sure? This will delete all saved analyses and reset settings.")) {
      localStorage.clear();
      toast.success("All data cleared");
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account preferences and application settings
          </p>
        </motion.div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="api">
              <Key className="w-4 h-4 mr-2" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Profile Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    placeholder="Ministry / Department"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिंदी</SelectItem>
                      <SelectItem value="ta">தமிழ்</SelectItem>
                      <SelectItem value="bn">বাংলা</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <Sun className="w-4 h-4 inline mr-2" />
                        Light
                      </SelectItem>
                      <SelectItem value="dark">
                        <Moon className="w-4 h-4 inline mr-2" />
                        Dark
                      </SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSaveSettings} className="w-full">
                Save Profile
              </Button>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Notification Preferences
              </h2>

              <div className="space-y-4">
                {[
                  { key: "analysisComplete", label: "Analysis Complete", desc: "Get notified when analysis finishes" },
                  { key: "weeklyDigest", label: "Weekly Digest", desc: "Receive weekly summary of your analyses" },
                  { key: "systemUpdates", label: "System Updates", desc: "Important system announcements" },
                  { key: "riskAlerts", label: "Risk Alerts", desc: "High-priority risk notifications" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{item.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</div>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, [item.key]: checked })
                      }
                    />
                  </div>
                ))}
              </div>

              <Button onClick={handleSaveSettings} className="w-full">
                Save Notification Settings
              </Button>
            </motion.div>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="api">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                API Key Management
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="sarvam-api">Sarvam AI API Key</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="sarvam-api"
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk_xxxxxxxxxxxxxxxx"
                    />
                    <Button variant="outline" onClick={() => setApiKey("")}>
                      Clear
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Used for multilingual translation. Get your key from{" "}
                    <a href="https://www.sarvam.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      sarvam.ai
                    </a>
                  </p>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                    API Key Security
                  </h3>
                  <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• Never share your API keys publicly</li>
                    <li>• Keys are stored locally in your browser</li>
                    <li>• Regenerate keys if compromised</li>
                  </ul>
                </div>
              </div>

              <Button onClick={handleSaveSettings} className="w-full">
                Save API Keys
              </Button>
            </motion.div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Privacy & Data
              </h2>

              <div className="space-y-4">
                {[
                  { key: "saveAnalyses", label: "Save Analyses", desc: "Store analyses locally (max 10)" },
                  { key: "autoDelete", label: "Auto-Delete", desc: "Delete analyses after 30 days" },
                  { key: "encryptData", label: "Encrypt Data", desc: "Encrypt sensitive information" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{item.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</div>
                    </div>
                    <Switch
                      checked={privacy[item.key as keyof typeof privacy]}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, [item.key]: checked })
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Data Management */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Data Management
                </h3>
                <div className="space-y-3">
                  <Button
                    onClick={handleExportData}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export All Data
                  </Button>
                  <Button
                    onClick={handleClearData}
                    variant="destructive"
                    className="w-full justify-start"
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Clear All Data
                  </Button>
                </div>
              </div>

              <Button onClick={handleSaveSettings} className="w-full">
                Save Privacy Settings
              </Button>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserSettings;
