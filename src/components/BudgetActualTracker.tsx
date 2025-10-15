import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ComposedChart } from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface BudgetActualTrackerProps {
  data?: {
    category: string;
    budgeted: number;
    actual: number;
    projected: number;
  }[];
}

const BudgetActualTracker = ({ data }: BudgetActualTrackerProps) => {
  const defaultData = data || [
    { category: "Infrastructure", budgeted: 5000, actual: 4800, projected: 5200 },
    { category: "Technology", budgeted: 2000, actual: 2100, projected: 2300 },
    { category: "HR & Training", budgeted: 1500, actual: 1400, projected: 1600 },
    { category: "Operations", budgeted: 3000, actual: 2900, projected: 3100 },
    { category: "Marketing", budgeted: 1000, actual: 950, projected: 1050 },
    { category: "Contingency", budgeted: 1500, actual: 500, projected: 800 },
  ];

  // Calculate variances
  const totalBudgeted = defaultData.reduce((sum, item) => sum + item.budgeted, 0);
  const totalActual = defaultData.reduce((sum, item) => sum + item.actual, 0);
  const variance = totalActual - totalBudgeted;
  const variancePercent = ((variance / totalBudgeted) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
    >
      {/* Header with Summary */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Budget vs Actual Spending
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Real-time budget performance tracking
          </p>
        </div>

        {/* Variance Card */}
        <div className={`px-4 py-2 rounded-lg ${
          variance < 0 ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
        }`}>
          <div className="flex items-center gap-2">
            {variance < 0 ? (
              <TrendingDown className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
            )}
            <div>
              <div className={`text-sm font-semibold ${
                variance < 0 ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
              }`}>
                {variance < 0 ? "Under Budget" : "Over Budget"}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                ₹{Math.abs(variance).toLocaleString()} ({variancePercent}%)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={defaultData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis
              dataKey="category"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "0.5rem",
                color: "#fff",
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
              }}
            />
            <Bar dataKey="budgeted" fill="#0066FF" name="Budgeted" radius={[8, 8, 0, 0]} />
            <Bar dataKey="actual" fill="#10b981" name="Actual Spent" radius={[8, 8, 0, 0]} />
            <Line
              type="monotone"
              dataKey="projected"
              stroke="#f59e0b"
              strokeWidth={3}
              name="Projected"
              dot={{ r: 5, fill: "#f59e0b" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Alerts */}
      {defaultData.some(item => item.actual > item.budgeted) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-1">
                Budget Overruns Detected
              </h4>
              <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                {defaultData
                  .filter(item => item.actual > item.budgeted)
                  .map((item, index) => (
                    <li key={index}>
                      • {item.category}: ₹{(item.actual - item.budgeted).toLocaleString()} over budget
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BudgetActualTracker;
