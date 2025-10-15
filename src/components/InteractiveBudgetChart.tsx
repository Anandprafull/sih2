import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IndianRupee, TrendingUp, Percent } from "lucide-react";

interface BudgetItem {
  name: string;
  value: number;
  percentage: number;
}

interface InteractiveBudgetChartProps {
  data: BudgetItem[];
  totalBudget: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#FF6B9D"];

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 15}
        fill={fill}
        opacity={0.5}
      />
    </g>
  );
};

const InteractiveBudgetChart = ({ data, totalBudget }: InteractiveBudgetChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<BudgetItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const onPieClick = (_: any, index: number) => {
    setSelectedSegment(data[index]);
    setIsDialogOpen(true);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <>
      <div className="relative">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              activeIndex={activeIndex !== null ? activeIndex : undefined}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              onClick={onPieClick}
              cursor="pointer"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="text-3xl font-bold text-primary font-display">
              {formatCurrency(totalBudget)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Total Budget</div>
          </motion.div>
        </div>

        {/* Legend with hover effects */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {data.map((item, index) => (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedSegment(item);
                setIsDialogOpen(true);
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`flex items-start gap-2 p-3 rounded-lg border transition-all ${
                activeIndex === index
                  ? "bg-primary/10 border-primary shadow-md"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <div
                className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium line-clamp-2">{item.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(item.value)} • {item.percentage}%
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSegment && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-display">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[data.indexOf(selectedSegment) % COLORS.length],
                    }}
                  />
                  {selectedSegment.name}
                </DialogTitle>
                <DialogDescription>Budget allocation details</DialogDescription>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="space-y-4 pt-4"
              >
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <IndianRupee className="h-4 w-4" />
                      <span className="text-sm">Allocated Amount</span>
                    </div>
                    <div className="text-xl font-bold text-emerald font-display">
                      {formatCurrency(selectedSegment.value)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Percent className="h-4 w-4" />
                      <span className="text-sm">Percentage of Total</span>
                    </div>
                    <div className="text-xl font-bold text-primary font-display">
                      {selectedSegment.percentage}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">Priority Ranking</span>
                    </div>
                    <div className="text-xl font-bold text-amber-600 font-display">
                      #{data.indexOf(selectedSegment) + 1}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-2">
                    Allocation Breakdown
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSegment.percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-hero"
                      />
                    </div>
                    <span className="text-sm font-semibold">
                      {selectedSegment.percentage}%
                    </span>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractiveBudgetChart;
