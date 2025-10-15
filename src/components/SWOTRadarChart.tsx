import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from "recharts";
import { motion } from "framer-motion";

interface SWOTRadarChartProps {
  data?: {
    category: string;
    score: number;
    fullMark: number;
  }[];
}

const SWOTRadarChart = ({ data }: SWOTRadarChartProps) => {
  const defaultData = data || [
    { category: "Strengths", score: 85, fullMark: 100 },
    { category: "Weaknesses", score: 35, fullMark: 100 },
    { category: "Opportunities", score: 75, fullMark: 100 },
    { category: "Threats", score: 45, fullMark: 100 },
    { category: "Innovation", score: 80, fullMark: 100 },
    { category: "Sustainability", score: 70, fullMark: 100 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px] bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        SWOT Analysis Radar
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={defaultData}>
          <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "#64748b", fontSize: 10 }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#0066FF"
            fill="#0066FF"
            fillOpacity={0.6}
            animationDuration={1000}
            animationBegin={200}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "0.5rem",
              color: "#fff",
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SWOTRadarChart;
