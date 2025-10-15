import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelinePhase {
  phase: string;
  duration: string;
  activities: string[];
  startMonth?: number;
  durationMonths?: number;
}

interface GanttChartProps {
  timeline: TimelinePhase[];
  totalDuration: string;
}

const GanttChart = ({ timeline, totalDuration }: GanttChartProps) => {
  // Extract total months from duration (e.g., "24 months" -> 24)
  const totalMonths = parseInt(totalDuration.match(/\d+/)?.[0] || "24");
  
  // Calculate start and duration for each phase
  const phases = timeline.map((phase, index) => {
    const phaseDuration = parseInt(phase.duration.match(/\d+/)?.[0] || "1");
    const startMonth = timeline
      .slice(0, index)
      .reduce((acc, p) => acc + parseInt(p.duration.match(/\d+/)?.[0] || "1"), 0);
    
    return {
      ...phase,
      startMonth,
      durationMonths: phaseDuration,
    };
  });

  const getPhaseColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-emerald-500",
      "bg-amber-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-cyan-500",
    ];
    return colors[index % colors.length];
  };

  const getPhaseColorLight = (index: number) => {
    const colors = [
      "bg-blue-500/20 border-blue-500/40",
      "bg-emerald/20 border-emerald/40",
      "bg-amber-500/20 border-amber-500/40",
      "bg-purple-500/20 border-purple-500/40",
      "bg-pink-500/20 border-pink-500/40",
      "bg-cyan-500/20 border-cyan-500/40",
    ];
    return colors[index % colors.length];
  };

  return (
    <Card className="shadow-elegant border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <Calendar className="h-5 w-5 text-primary" />
          Project Timeline - Gantt Chart
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Total Duration: {totalDuration}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Timeline Header */}
          <div className="flex items-center gap-2 pb-4 border-b">
            <div className="w-48 text-sm font-semibold">Phase</div>
            <div className="flex-1">
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${totalMonths}, 1fr)` }}>
                {Array.from({ length: totalMonths }, (_, i) => (
                  <div key={i} className="text-center text-xs text-muted-foreground">
                    {i % 3 === 0 ? `M${i + 1}` : ""}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-24 text-sm font-semibold text-center">Duration</div>
          </div>

          {/* Gantt Bars */}
          <div className="space-y-4">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-center gap-2">
                  {/* Phase Name */}
                  <div className="w-48">
                    <div className="text-sm font-medium line-clamp-2">{phase.phase}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {phase.activities.length} activities
                    </div>
                  </div>

                  {/* Gantt Bar */}
                  <div className="flex-1 relative">
                    <div
                      className="grid gap-1 h-12"
                      style={{ gridTemplateColumns: `repeat(${totalMonths}, 1fr)` }}
                    >
                      {Array.from({ length: totalMonths }, (_, i) => (
                        <div key={i} className="border-l border-muted/30" />
                      ))}
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(phase.durationMonths / totalMonths) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                      className={`absolute top-0 h-12 rounded-lg border-2 ${getPhaseColorLight(
                        index
                      )} cursor-pointer transition-all hover:scale-y-110 hover:shadow-md overflow-hidden`}
                      style={{
                        left: `${(phase.startMonth / totalMonths) * 100}%`,
                      }}
                    >
                      <div className={`h-1 w-full ${getPhaseColor(index)}`} />
                      <div className="flex items-center justify-center h-full px-2">
                        <span className="text-xs font-medium truncate">{phase.phase}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  <div className="w-24 text-center">
                    <Badge variant="outline" className="font-mono">
                      {phase.duration}
                    </Badge>
                  </div>
                </div>

                {/* Phase Details (shown on hover) */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  whileHover={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden ml-48 mt-2"
                >
                  <div className="p-3 bg-muted/30 rounded-lg border border-muted">
                    <div className="text-xs font-semibold mb-2">Key Activities:</div>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      {phase.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            {phases.map((phase, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${getPhaseColor(index)}`} />
                <span className="text-xs text-muted-foreground">{phase.phase}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GanttChart;
