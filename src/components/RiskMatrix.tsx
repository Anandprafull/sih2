import { motion } from "framer-motion";
import { Shield, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Risk {
  description: string;
  likelihood: "High" | "Medium" | "Low";
  impact: "High" | "Medium" | "Low";
  mitigation: string;
}

interface RiskMatrixProps {
  risks: Risk[];
}

const RiskMatrix = ({ risks }: RiskMatrixProps) => {
  const matrix = {
    High: { High: [] as Risk[], Medium: [] as Risk[], Low: [] as Risk[] },
    Medium: { High: [] as Risk[], Medium: [] as Risk[], Low: [] as Risk[] },
    Low: { High: [] as Risk[], Medium: [] as Risk[], Low: [] as Risk[] },
  };

  // Categorize risks
  risks.forEach((risk) => {
    matrix[risk.likelihood][risk.impact].push(risk);
  });

  const getCellColor = (likelihood: string, impact: string) => {
    const score =
      (likelihood === "High" ? 3 : likelihood === "Medium" ? 2 : 1) *
      (impact === "High" ? 3 : impact === "Medium" ? 2 : 1);

    if (score >= 6) return "bg-destructive/20 border-destructive/40 hover:bg-destructive/30";
    if (score >= 3) return "bg-amber-500/20 border-amber-500/40 hover:bg-amber-500/30";
    return "bg-emerald/20 border-emerald/40 hover:bg-emerald/30";
  };

  const getCellIntensity = (count: number) => {
    if (count === 0) return "opacity-30";
    if (count === 1) return "opacity-60";
    if (count === 2) return "opacity-80";
    return "opacity-100";
  };

  const getRiskLevel = (likelihood: string, impact: string) => {
    const score =
      (likelihood === "High" ? 3 : likelihood === "Medium" ? 2 : 1) *
      (impact === "High" ? 3 : impact === "Medium" ? 2 : 1);

    if (score >= 6) return { label: "Critical", color: "text-destructive" };
    if (score >= 3) return { label: "Moderate", color: "text-amber-600" };
    return { label: "Low", color: "text-emerald" };
  };

  return (
    <Card className="shadow-elegant border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <Shield className="h-5 w-5 text-amber-600" />
          Risk Matrix Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald/30 border border-emerald/50 rounded" />
              <span className="text-muted-foreground">Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-500/30 border border-amber-500/50 rounded" />
              <span className="text-muted-foreground">Moderate Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-destructive/30 border border-destructive/50 rounded" />
              <span className="text-muted-foreground">Critical Risk</span>
            </div>
          </div>

          {/* Matrix */}
          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              {/* Header Row */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                <div className="text-sm font-semibold text-center p-2">
                  Likelihood → <br />
                  <span className="text-xs text-muted-foreground">Impact ↓</span>
                </div>
                {["Low", "Medium", "High"].map((impact) => (
                  <div
                    key={impact}
                    className="text-sm font-semibold text-center p-2 bg-muted/30 rounded-lg"
                  >
                    {impact}
                  </div>
                ))}
              </div>

              {/* Matrix Rows */}
              {(["High", "Medium", "Low"] as const).map((likelihood, rowIndex) => (
                <motion.div
                  key={likelihood}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: rowIndex * 0.1 }}
                  className="grid grid-cols-4 gap-2 mb-2"
                >
                  <div className="text-sm font-semibold text-center p-2 bg-muted/30 rounded-lg flex items-center justify-center">
                    {likelihood}
                  </div>
                  {(["Low", "Medium", "High"] as const).map((impact) => {
                    const cellRisks = matrix[likelihood][impact];
                    const riskLevel = getRiskLevel(likelihood, impact);
                    return (
                      <TooltipProvider key={impact}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className={`
                                p-4 rounded-lg border-2 cursor-pointer transition-all
                                ${getCellColor(likelihood, impact)}
                                ${getCellIntensity(cellRisks.length)}
                              `}
                            >
                              <div className="flex flex-col items-center gap-1">
                                {cellRisks.length > 0 && (
                                  <AlertTriangle className="h-5 w-5" />
                                )}
                                <div className="text-2xl font-bold">
                                  {cellRisks.length}
                                </div>
                                <div className={`text-xs font-semibold ${riskLevel.color}`}>
                                  {riskLevel.label}
                                </div>
                              </div>
                            </motion.div>
                          </TooltipTrigger>
                          {cellRisks.length > 0 && (
                            <TooltipContent className="max-w-xs">
                              <div className="space-y-2">
                                <div className="font-semibold text-sm">
                                  {cellRisks.length} Risk(s):
                                </div>
                                {cellRisks.map((risk, idx) => (
                                  <div key={idx} className="text-xs">
                                    • {risk.description.substring(0, 80)}...
                                  </div>
                                ))}
                              </div>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Critical Risks</div>
              <div className="text-2xl font-bold text-destructive">
                {risks.filter(
                  (r) =>
                    (r.likelihood === "High" && r.impact === "High") ||
                    (r.likelihood === "High" && r.impact === "Medium") ||
                    (r.likelihood === "Medium" && r.impact === "High")
                ).length}
              </div>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Moderate Risks</div>
              <div className="text-2xl font-bold text-amber-600">
                {risks.filter(
                  (r) =>
                    (r.likelihood === "Medium" && r.impact === "Medium") ||
                    (r.likelihood === "High" && r.impact === "Low") ||
                    (r.likelihood === "Low" && r.impact === "High")
                ).length}
              </div>
            </div>
            <div className="p-3 bg-emerald/10 border border-emerald/30 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Low Risks</div>
              <div className="text-2xl font-bold text-emerald">
                {risks.filter(
                  (r) =>
                    (r.likelihood === "Low" && r.impact === "Low") ||
                    (r.likelihood === "Low" && r.impact === "Medium") ||
                    (r.likelihood === "Medium" && r.impact === "Low")
                ).length}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskMatrix;
