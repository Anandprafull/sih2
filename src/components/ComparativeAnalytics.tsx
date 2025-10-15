import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, Target, Award } from "lucide-react";

interface ComparativeAnalyticsProps {
  currentProject: {
    name: string;
    budget: number;
    duration: number;
    successRate: number;
  };
}

const ComparativeAnalytics = ({ currentProject }: ComparativeAnalyticsProps) => {
  // Historical comparison data
  const historicalData = [
    { year: "2019", avgBudget: 45, avgDuration: 18, successRate: 72 },
    { year: "2020", avgBudget: 48, avgDuration: 19, successRate: 75 },
    { year: "2021", avgBudget: 52, avgDuration: 20, successRate: 78 },
    { year: "2022", avgBudget: 55, avgDuration: 21, successRate: 81 },
    { year: "2023", avgBudget: 58, avgDuration: 22, successRate: 84 },
    { year: "2024", avgBudget: 62, avgDuration: 23, successRate: 87, current: currentProject.budget },
  ];

  // Industry benchmarks by sector
  const benchmarkData = [
    { sector: "Infrastructure", avgBudget: 75, avgDuration: 24, successRate: 82 },
    { sector: "Healthcare", avgBudget: 55, avgDuration: 18, successRate: 88 },
    { sector: "Education", avgBudget: 42, avgDuration: 15, successRate: 91 },
    { sector: "Tourism", avgBudget: 38, avgDuration: 12, successRate: 85 },
    { sector: "Agriculture", avgBudget: 50, avgDuration: 20, successRate: 79 },
    { sector: "Current", avgBudget: currentProject.budget, avgDuration: currentProject.duration, successRate: currentProject.successRate },
  ];

  // Success prediction data
  const predictionData = [
    { month: "Month 1", predicted: 20, actual: 18 },
    { month: "Month 2", predicted: 35, actual: 32 },
    { month: "Month 3", predicted: 50, actual: 48 },
    { month: "Month 4", predicted: 65, actual: 62 },
    { month: "Month 5", predicted: 78, actual: null },
    { month: "Month 6", predicted: 88, actual: null },
    { month: "Month 7", predicted: 95, actual: null },
    { month: "Month 8", predicted: 100, actual: null },
  ];

  // Regional performance
  const regionalData = [
    { state: "Assam", projects: 42, avgSuccess: 88, avgBudget: 52 },
    { state: "Manipur", projects: 28, avgSuccess: 85, avgBudget: 48 },
    { state: "Meghalaya", projects: 35, avgSuccess: 82, avgBudget: 45 },
    { state: "Mizoram", projects: 22, avgSuccess: 90, avgBudget: 40 },
    { state: "Nagaland", projects: 30, avgSuccess: 79, avgBudget: 55 },
    { state: "Sikkim", projects: 25, avgSuccess: 92, avgBudget: 38 },
    { state: "Tripura", projects: 32, avgSuccess: 86, avgBudget: 47 },
    { state: "Arunachal", projects: 27, avgSuccess: 81, avgBudget: 50 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Comparative Analytics
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Compare your project against historical trends and industry benchmarks
        </p>
      </motion.div>

      {/* Key Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <TrendingUp className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">{currentProject.successRate}%</div>
          <div className="text-sm opacity-90">Success Probability</div>
          <div className="text-xs mt-1 opacity-75">+5% vs industry avg</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white"
        >
          <Target className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">₹{currentProject.budget}Cr</div>
          <div className="text-sm opacity-90">Budget Estimate</div>
          <div className="text-xs mt-1 opacity-75">-8% vs sector avg</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white"
        >
          <Award className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">{currentProject.duration}M</div>
          <div className="text-sm opacity-90">Duration Estimate</div>
          <div className="text-xs mt-1 opacity-75">Similar to avg</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <TrendingDown className="w-8 h-8 mb-2" />
          <div className="text-2xl font-bold">Medium</div>
          <div className="text-sm opacity-90">Risk Level</div>
          <div className="text-xs mt-1 opacity-75">Better than 68% projects</div>
        </motion.div>
      </div>

      {/* Historical Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Historical Trends (2019-2024)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={historicalData}>
            <defs>
              <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0066FF" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="avgBudget" stroke="#0066FF" fillOpacity={1} fill="url(#colorBudget)" name="Avg Budget (₹Cr)" />
            <Area type="monotone" dataKey="successRate" stroke="#10B981" fillOpacity={1} fill="url(#colorSuccess)" name="Success Rate (%)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Industry Benchmarks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Industry Benchmarks by Sector
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={benchmarkData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sector" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgBudget" fill="#0066FF" name="Avg Budget (₹Cr)" />
            <Bar dataKey="avgDuration" fill="#F59E0B" name="Avg Duration (M)" />
            <Bar dataKey="successRate" fill="#10B981" name="Success Rate (%)" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Success Prediction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Project Success Prediction Timeline
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="predicted" stroke="#0066FF" strokeWidth={2} strokeDasharray="5 5" name="Predicted Progress (%)" />
            <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} name="Actual Progress (%)" />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>AI Prediction:</strong> Based on historical data and current metrics, this project has an 87% probability of completing on time and within budget. Key success factors: Strong stakeholder engagement, adequate resource allocation, and effective risk mitigation strategies.
          </p>
        </div>
      </motion.div>

      {/* Regional Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          NE States Performance Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={regionalData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="state" type="category" width={80} />
            <Tooltip />
            <Legend />
            <Bar dataKey="projects" fill="#0066FF" name="Total Projects" />
            <Bar dataKey="avgSuccess" fill="#10B981" name="Avg Success (%)" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default ComparativeAnalytics;
