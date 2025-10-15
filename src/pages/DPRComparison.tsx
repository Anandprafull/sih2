import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftRight,
  Plus,
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  IndianRupee,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSavedAnalyses, type SavedAnalysis } from "@/lib/analysisStorage";

interface ComparisonMetric {
  label: string;
  project1: string | number;
  project2: string | number;
  difference?: number;
  trend?: "up" | "down" | "neutral";
  type?: "currency" | "text" | "percentage";
}

const DPRComparison = () => {
  const navigate = useNavigate();
  const [savedProjects, setSavedProjects] = useState<SavedAnalysis[]>([]);
  const [selectedProject1, setSelectedProject1] = useState<string>("");
  const [selectedProject2, setSelectedProject2] = useState<string>("");
  const [comparisonData, setComparisonData] = useState<ComparisonMetric[]>([]);

  useEffect(() => {
    const projects = getSavedAnalyses();
    setSavedProjects(projects);
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const calculateDifference = (val1: number, val2: number): number => {
    return ((val2 - val1) / val1) * 100;
  };

  const getTrend = (diff: number): "up" | "down" | "neutral" => {
    if (diff > 5) return "up";
    if (diff < -5) return "down";
    return "neutral";
  };

  const handleCompare = () => {
    if (!selectedProject1 || !selectedProject2) return;

    const project1 = savedProjects.find((p) => p.id === selectedProject1);
    const project2 = savedProjects.find((p) => p.id === selectedProject2);

    if (!project1 || !project2) return;

    const budgetDiff = calculateDifference(project1.totalOutlay, project2.totalOutlay);

    const metrics: ComparisonMetric[] = [
      {
        label: "Project Name",
        project1: project1.projectName,
        project2: project2.projectName,
        type: "text",
      },
      {
        label: "Total Budget",
        project1: project1.totalOutlay,
        project2: project2.totalOutlay,
        difference: budgetDiff,
        trend: getTrend(budgetDiff),
        type: "currency",
      },
      {
        label: "Duration",
        project1: project1.duration,
        project2: project2.duration,
        type: "text",
      },
      {
        label: "Status",
        project1: project1.status,
        project2: project2.status,
        type: "text",
      },
      {
        label: "Upload Date",
        project1: new Date(project1.uploadDate).toLocaleDateString("en-IN"),
        project2: new Date(project2.uploadDate).toLocaleDateString("en-IN"),
        type: "text",
      },
    ];

    setComparisonData(metrics);
  };

  const handleReset = () => {
    setSelectedProject1("");
    setSelectedProject2("");
    setComparisonData([]);
  };

  const getTrendIcon = (trend?: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend?: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return "text-emerald";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const formatValue = (value: string | number, type?: string) => {
    if (type === "currency" && typeof value === "number") {
      return formatCurrency(value);
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <div className="border-b bg-gradient-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/projects")}
                  className="hover:bg-muted"
                >
                  ← Back
                </Button>
                <div className="p-2 bg-gradient-hero rounded-lg shadow-glow">
                  <ArrowLeftRight className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold font-display bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    DPR Comparison
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Compare multiple projects side-by-side
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Project Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-elegant border-border/50 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <Plus className="h-5 w-5 text-primary" />
                Select Projects to Compare
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project 1</label>
                  <Select value={selectedProject1} onValueChange={setSelectedProject1}>
                    <SelectTrigger className="bg-card border-border/50">
                      <SelectValue placeholder="Select first project" />
                    </SelectTrigger>
                    <SelectContent>
                      {savedProjects
                        .filter((p) => p.id !== selectedProject2)
                        .map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.projectName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Project 2</label>
                  <Select value={selectedProject2} onValueChange={setSelectedProject2}>
                    <SelectTrigger className="bg-card border-border/50">
                      <SelectValue placeholder="Select second project" />
                    </SelectTrigger>
                    <SelectContent>
                      {savedProjects
                        .filter((p) => p.id !== selectedProject1)
                        .map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.projectName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end gap-2">
                  <Button
                    onClick={handleCompare}
                    disabled={!selectedProject1 || !selectedProject2}
                    className="flex-1 bg-gradient-hero shadow-glow"
                  >
                    <ArrowLeftRight className="h-4 w-4 mr-2" />
                    Compare
                  </Button>
                  {comparisonData.length > 0 && (
                    <Button variant="outline" size="icon" onClick={handleReset}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {savedProjects.length < 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-3"
                >
                  <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-600">
                      Need More Projects
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      You need at least 2 saved projects to use comparison. Upload and save
                      more DPR analyses to compare.
                    </p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Comparison Results */}
        {comparisonData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <ArrowLeftRight className="h-5 w-5 text-primary" />
                  Comparison Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {comparisonData.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="p-4 bg-gradient-card rounded-lg border border-border/50"
                      >
                        <div className="text-sm font-semibold text-muted-foreground mb-3">
                          {metric.label}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Project 1 */}
                          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                            <div className="text-xs text-muted-foreground mb-1">
                              Project 1
                            </div>
                            <div className="font-semibold">
                              {formatValue(metric.project1, metric.type)}
                            </div>
                          </div>

                          {/* Difference Indicator */}
                          {metric.difference !== undefined && (
                            <div className="flex items-center justify-center">
                              <div
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                                  metric.trend === "up"
                                    ? "bg-emerald/10 border-emerald/30"
                                    : metric.trend === "down"
                                    ? "bg-destructive/10 border-destructive/30"
                                    : "bg-muted/30 border-muted"
                                }`}
                              >
                                {getTrendIcon(metric.trend)}
                                <span className={`font-semibold ${getTrendColor(metric.trend)}`}>
                                  {metric.difference > 0 ? "+" : ""}
                                  {metric.difference.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          )}

                          {metric.difference === undefined && (
                            <div className="flex items-center justify-center">
                              <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}

                          {/* Project 2 */}
                          <div className="p-3 bg-emerald/5 rounded-lg border border-emerald/20">
                            <div className="text-xs text-muted-foreground mb-1">
                              Project 2
                            </div>
                            <div className="font-semibold">
                              {formatValue(metric.project2, metric.type)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <Separator />

                    {/* Key Insights */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        Key Insights
                      </h4>
                      
                      <div className="grid gap-2">
                        {comparisonData
                          .filter((m) => m.difference && Math.abs(m.difference) > 10)
                          .map((metric, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg"
                            >
                              {metric.trend === "up" ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald mt-0.5" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                              )}
                              <p className="text-sm">
                                <span className="font-medium">{metric.label}</span> differs by{" "}
                                <span className="font-bold">{Math.abs(metric.difference!).toFixed(1)}%</span>
                                {metric.trend === "up" ? " (higher in Project 2)" : " (lower in Project 2)"}
                              </p>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Empty State */}
        {comparisonData.length === 0 && savedProjects.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mb-4">
              <ArrowLeftRight className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2 font-display">
              Ready to Compare
            </h3>
            <p className="text-muted-foreground max-w-md">
              Select two projects from the dropdowns above to see a detailed side-by-side
              comparison of their metrics and key differences.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DPRComparison;
