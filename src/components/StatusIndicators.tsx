import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Clock, TrendingUp } from "lucide-react";

export type StatusType = "approved" | "pending" | "in-progress" | "rejected" | "completed";
export type RiskLevel = "high" | "medium" | "low";
export type ComplianceStatus = "compliant" | "partial" | "non-compliant";

interface StatusBadgeProps {
  status: StatusType;
  animated?: boolean;
}

export const StatusBadge = ({ status, animated = true }: StatusBadgeProps) => {
  const configs = {
    approved: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
      icon: CheckCircle2,
      label: "Approved",
      pulse: "animate-pulse-green",
    },
    pending: {
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-700 dark:text-yellow-400",
      icon: Clock,
      label: "Pending Review",
      pulse: "animate-pulse-yellow",
    },
    "in-progress": {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
      icon: TrendingUp,
      label: "In Progress",
      pulse: "animate-pulse-blue",
    },
    rejected: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-700 dark:text-red-400",
      icon: AlertCircle,
      label: "Rejected",
      pulse: "",
    },
    completed: {
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-700 dark:text-emerald-400",
      icon: CheckCircle2,
      label: "Completed",
      pulse: "",
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={animated ? { scale: 0.8, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg} ${config.text} font-medium text-sm`}
    >
      <Icon className={`w-4 h-4 ${animated && config.pulse}`} />
      <span>{config.label}</span>
    </motion.div>
  );
};

interface RiskLevelIndicatorProps {
  level: RiskLevel;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export const RiskLevelIndicator = ({ level, showLabel = true, size = "md" }: RiskLevelIndicatorProps) => {
  const configs = {
    high: {
      color: "bg-red-500",
      label: "High Risk",
      ring: "ring-red-500",
      text: "text-red-700 dark:text-red-400",
    },
    medium: {
      color: "bg-yellow-500",
      label: "Medium Risk",
      ring: "ring-yellow-500",
      text: "text-yellow-700 dark:text-yellow-400",
    },
    low: {
      color: "bg-green-500",
      label: "Low Risk",
      ring: "ring-green-500",
      text: "text-green-700 dark:text-green-400",
    },
  };

  const sizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const config = configs[level];

  return (
    <div className="inline-flex items-center gap-2">
      <motion.div
        className={`${sizes[size]} rounded-full ${config.color} ring-4 ${config.ring} ring-opacity-30`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {showLabel && <span className={`text-sm font-medium ${config.text}`}>{config.label}</span>}
    </div>
  );
};

interface ComplianceBadgeProps {
  status: ComplianceStatus;
  score?: number;
}

export const ComplianceBadge = ({ status, score }: ComplianceBadgeProps) => {
  const configs = {
    compliant: {
      bg: "bg-gradient-to-r from-green-500 to-emerald-500",
      text: "text-white",
      icon: "✓",
      label: "Fully Compliant",
    },
    partial: {
      bg: "bg-gradient-to-r from-yellow-500 to-orange-500",
      text: "text-white",
      icon: "⚠",
      label: "Partially Compliant",
    },
    "non-compliant": {
      bg: "bg-gradient-to-r from-red-500 to-pink-500",
      text: "text-white",
      icon: "✗",
      label: "Non-Compliant",
    },
  };

  const config = configs[status];

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} ${config.text} font-semibold text-sm shadow-lg`}
    >
      <span className="text-lg">{config.icon}</span>
      <span>{config.label}</span>
      {score !== undefined && <span className="ml-1">({score}%)</span>}
    </motion.div>
  );
};

interface ProgressIndicatorProps {
  percentage: number;
  label: string;
  color?: "blue" | "green" | "purple" | "red";
  showPercentage?: boolean;
}

export const ProgressIndicator = ({ 
  percentage, 
  label, 
  color = "blue",
  showPercentage = true 
}: ProgressIndicatorProps) => {
  const colorClasses = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    red: "bg-red-600",
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        {showPercentage && (
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{percentage}%</span>
        )}
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${colorClasses[color]} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export const CircularProgress = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = "#0066FF",
  label,
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{percentage}%</span>
        {label && <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>}
      </div>
    </div>
  );
};
