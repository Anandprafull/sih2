import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  History,
  Trash2,
  Eye,
  IndianRupee,
  Calendar,
  FileText,
  X,
} from "lucide-react";
import { getSavedAnalyses, deleteAnalysis, formatDate, SavedAnalysis } from "@/lib/analysisStorage";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface SavedAnalysesProps {
  onViewAnalysis?: (analysis: SavedAnalysis) => void;
}

const SavedAnalyses = ({ onViewAnalysis }: SavedAnalysesProps) => {
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadAnalyses();
  }, []);

  const loadAnalyses = () => {
    const saved = getSavedAnalyses();
    setAnalyses(saved);
  };

  const handleDelete = (id: string) => {
    deleteAnalysis(id);
    loadAnalyses();
    toast({
      title: "Analysis Deleted",
      description: "The saved analysis has been removed.",
    });
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  if (analyses.length === 0) {
    return (
      <Card className="shadow-sm border-muted">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-display">
            <History className="h-4 w-4 text-muted-foreground" />
            Recent Analyses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground text-sm">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No saved analyses yet</p>
            <p className="text-xs mt-1">Your recent DPR analyses will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-muted">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base font-display">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-primary" />
            Recent Analyses
          </div>
          <Badge variant="secondary" className="text-xs">
            {analyses.length} saved
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {analyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="group relative bg-gradient-card border border-border rounded-lg p-3 hover:border-primary/50 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-foreground line-clamp-1 mb-1">
                        {analysis.projectName}
                      </h4>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" />
                          {formatCurrency(analysis.totalOutlay)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {analysis.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20"
                        >
                          {analysis.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(analysis.uploadDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {onViewAnalysis && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => onViewAnalysis(analysis)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Analysis?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove "{analysis.projectName}" from your
                              saved analyses. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(analysis.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SavedAnalyses;
