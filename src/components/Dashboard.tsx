import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const Dashboard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const forecastData = [
    { month: "Jan", completion: 15, planned: 20 },
    { month: "Feb", completion: 28, planned: 35 },
    { month: "Mar", completion: 42, planned: 50 },
    { month: "Apr", completion: 58, planned: 65 },
    { month: "May", completion: 71, planned: 80 },
    { month: "Jun", completion: 89, planned: 95 },
  ];

  const budgetData = [
    { category: "Infrastructure", allocated: 400, spent: 320 },
    { category: "Equipment", allocated: 300, spent: 280 },
    { category: "Personnel", allocated: 200, spent: 190 },
    { category: "Operations", allocated: 150, spent: 140 },
  ];

  const complianceData = [
    { aspect: "Week 1", score: 65 },
    { aspect: "Week 2", score: 72 },
    { aspect: "Week 3", score: 78 },
    { aspect: "Week 4", score: 85 },
    { aspect: "Week 5", score: 91 },
    { aspect: "Week 6", score: 96 },
  ];

  return (
    <section id="dashboard" ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Live <span className="bg-gradient-emerald bg-clip-text text-transparent">Analytics Dashboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time insights and predictive analytics at your fingertips.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Project Completion Forecast */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-elegant transition-all"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">
              Project Completion Forecast
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completion"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  name="Actual Progress"
                />
                <Line
                  type="monotone"
                  dataKey="planned"
                  stroke="hsl(var(--gold))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(var(--gold))", r: 3 }}
                  name="Planned Progress"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Budget Analysis */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-elegant transition-all"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">
              Budget Deviation Analysis
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="allocated" fill="hsl(var(--primary-glow))" name="Allocated Budget" />
                <Bar dataKey="spent" fill="hsl(var(--emerald))" name="Actual Spent" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Compliance Score Trend */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-elegant transition-all lg:col-span-2"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">
              Compliance Score Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={complianceData}>
                <defs>
                  <linearGradient id="complianceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--emerald))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--emerald))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="aspect" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--emerald))"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#complianceGradient)"
                  name="Compliance Score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 max-w-7xl mx-auto"
        >
          {[
            { label: "Projects Analyzed", value: "1,247", trend: "+12%" },
            { label: "Avg. Processing Time", value: "3.2 hrs", trend: "-45%" },
            { label: "Budget Accuracy", value: "94.8%", trend: "+8%" },
            { label: "Risk Detection", value: "98.3%", trend: "+15%" },
          ].map((metric, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-card border border-border rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
              <div className="text-xs text-emerald font-medium">{metric.trend}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;
