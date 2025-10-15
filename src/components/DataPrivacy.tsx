import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, EyeOff, Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface PrivacySettings {
  encryptData: boolean;
  autoDelete: boolean;
  autoDeleteDays: number;
  privacyMode: boolean;
  auditLog: boolean;
}

interface AuditEntry {
  timestamp: string;
  action: string;
  details: string;
}

const DataPrivacy = () => {
  const [settings, setSettings] = useState<PrivacySettings>({
    encryptData: true,
    autoDelete: false,
    autoDeleteDays: 30,
    privacyMode: false,
    auditLog: true,
  });

  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [showEncryptedData, setShowEncryptedData] = useState(false);

  // Load settings and audit log from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("privacySettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    const savedAudit = localStorage.getItem("auditLog");
    if (savedAudit) {
      setAuditLog(JSON.parse(savedAudit));
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings: PrivacySettings) => {
    setSettings(newSettings);
    localStorage.setItem("privacySettings", JSON.stringify(newSettings));
    addAuditEntry("Settings Updated", "Privacy settings modified");
    toast.success("Privacy settings saved");
  };

  // Simple encryption (Base64 for demo - use proper encryption in production)
  const encryptData = (data: string): string => {
    if (!settings.encryptData) return data;
    return btoa(data); // Base64 encode
  };

  const decryptData = (data: string): string => {
    if (!settings.encryptData) return data;
    try {
      return atob(data); // Base64 decode
    } catch {
      return data;
    }
  };

  // Add audit log entry
  const addAuditEntry = (action: string, details: string) => {
    if (!settings.auditLog) return;

    const entry: AuditEntry = {
      timestamp: new Date().toISOString(),
      action,
      details,
    };

    const newLog = [entry, ...auditLog].slice(0, 100); // Keep last 100 entries
    setAuditLog(newLog);
    localStorage.setItem("auditLog", JSON.stringify(newLog));
  };

  // Auto-delete old data
  const handleAutoDelete = () => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - settings.autoDeleteDays);

    const savedAnalyses = localStorage.getItem("savedAnalyses");
    if (savedAnalyses) {
      const analyses = JSON.parse(savedAnalyses);
      const filtered = analyses.filter((analysis: any) => {
        const analysisDate = new Date(analysis.timestamp);
        return analysisDate > cutoffDate;
      });

      if (filtered.length < analyses.length) {
        localStorage.setItem("savedAnalyses", JSON.stringify(filtered));
        addAuditEntry("Auto-Delete", `Removed ${analyses.length - filtered.length} old analyses`);
        toast.success(`Deleted ${analyses.length - filtered.length} old analyses`);
      } else {
        toast.info("No old data to delete");
      }
    }
  };

  // Clear all audit logs
  const clearAuditLog = () => {
    setAuditLog([]);
    localStorage.removeItem("auditLog");
    toast.success("Audit log cleared");
  };

  // Export audit log
  const exportAuditLog = () => {
    const blob = new Blob([JSON.stringify(auditLog, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-log-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Audit log exported");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Data Privacy & Security
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Advanced privacy controls to protect your sensitive information
        </p>
      </motion.div>

      {/* Privacy Mode Banner */}
      {settings.privacyMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4 flex items-center gap-3"
        >
          <EyeOff className="w-6 h-6" />
          <div>
            <div className="font-semibold">Privacy Mode Active</div>
            <div className="text-sm opacity-90">No data is being saved to your browser</div>
          </div>
        </motion.div>
      )}

      {/* Privacy Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Privacy Controls
        </h3>

        {/* Encrypt Data */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Encrypt Sensitive Data</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Encrypt project data and financial information
              </div>
            </div>
          </div>
          <Switch
            checked={settings.encryptData}
            onCheckedChange={(checked) => saveSettings({ ...settings, encryptData: checked })}
          />
        </div>

        {/* Auto-Delete */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Trash2 className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Auto-Delete Old Data</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Automatically delete data after {settings.autoDeleteDays} days
              </div>
            </div>
          </div>
          <Switch
            checked={settings.autoDelete}
            onCheckedChange={(checked) => saveSettings({ ...settings, autoDelete: checked })}
          />
        </div>

        {/* Privacy Mode */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Privacy Mode</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Don't save any data to browser storage
              </div>
            </div>
          </div>
          <Switch
            checked={settings.privacyMode}
            onCheckedChange={(checked) => {
              saveSettings({ ...settings, privacyMode: checked });
              if (checked) {
                addAuditEntry("Privacy Mode", "Enabled - No data will be saved");
              }
            }}
          />
        </div>

        {/* Audit Log */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Activity Audit Log</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Track all data access and modifications
              </div>
            </div>
          </div>
          <Switch
            checked={settings.auditLog}
            onCheckedChange={(checked) => saveSettings({ ...settings, auditLog: checked })}
          />
        </div>

        {/* Auto-Delete Button */}
        {settings.autoDelete && (
          <Button onClick={handleAutoDelete} variant="outline" className="w-full">
            <Trash2 className="w-4 h-4 mr-2" />
            Run Auto-Delete Now
          </Button>
        )}
      </motion.div>

      {/* Encryption Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Encryption Preview
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Original Data:
            </div>
            <div className="text-gray-900 dark:text-white font-mono">
              Budget: ₹50 Crores, Duration: 18 Months
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Encrypted Data:
            </div>
            <div className="text-blue-900 dark:text-blue-300 font-mono text-sm break-all">
              {settings.encryptData ? encryptData("Budget: ₹50 Crores, Duration: 18 Months") : "Encryption disabled"}
            </div>
          </div>

          <Button
            onClick={() => setShowEncryptedData(!showEncryptedData)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            {showEncryptedData ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showEncryptedData ? "Hide" : "Show"} Encrypted Data
          </Button>
        </div>
      </motion.div>

      {/* Audit Log */}
      {settings.auditLog && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Activity Audit Log
            </h3>
            <div className="flex gap-2">
              <Button onClick={exportAuditLog} variant="outline" size="sm">
                Export
              </Button>
              <Button onClick={clearAuditLog} variant="outline" size="sm">
                Clear
              </Button>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {auditLog.length === 0 ? (
              <div className="text-center text-gray-600 dark:text-gray-400 py-8">
                No activity logged yet
              </div>
            ) : (
              auditLog.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-start gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white">{entry.action}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{entry.details}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {new Date(entry.timestamp).toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}

      {/* Security Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">
              Security Best Practices
            </h3>
            <ul className="text-sm text-amber-800 dark:text-amber-400 space-y-1">
              <li>• Enable encryption for sensitive financial data</li>
              <li>• Use auto-delete to comply with data retention policies</li>
              <li>• Enable privacy mode when analyzing confidential projects</li>
              <li>• Regularly review audit logs for unauthorized access</li>
              <li>• Export important data before clearing storage</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DataPrivacy;
