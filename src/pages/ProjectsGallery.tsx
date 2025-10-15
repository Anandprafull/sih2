import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FolderOpen,
  Calendar,
  IndianRupee,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Grid3x3,
  List,
  TrendingUp,
  MapPin,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSavedAnalyses, type SavedAnalysis } from "@/lib/analysisStorage";

const ProjectsGallery = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<SavedAnalysis[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [budgetFilter, setBudgetFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const savedProjects = getSavedAnalyses();
    setProjects(savedProjects);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 className="h-4 w-4" />;
      case "Under Review":
        return <AlertCircle className="h-4 w-4" />;
      case "Rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Approved":
        return "default";
      case "Under Review":
        return "secondary";
      case "Rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getBudgetCategory = (amount: number) => {
    if (amount >= 100000000) return "Large Scale";
    if (amount >= 10000000) return "Medium Scale";
    return "Small Scale";
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.projectName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;
    const budgetCategory = getBudgetCategory(project.totalOutlay);
    const matchesBudget =
      budgetFilter === "All" || budgetCategory === budgetFilter;

    return matchesSearch && matchesStatus && matchesBudget;
  });

  const stats = {
    total: projects.length,
    approved: projects.filter((p) => p.status === "Approved").length,
    underReview: projects.filter((p) => p.status === "Under Review").length,
    rejected: projects.filter((p) => p.status === "Rejected").length,
    totalBudget: projects.reduce((sum, p) => sum + p.totalOutlay, 0),
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
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-hero rounded-lg shadow-glow">
                <FolderOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-display bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Projects Gallery
              </h1>
            </div>
            <p className="text-muted-foreground ml-14">
              Browse and manage all your analyzed DPR projects
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6"
          >
            <Card className="bg-gradient-card border-border/50 shadow-elegant">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary font-display">
                  {stats.total}
                </div>
                <div className="text-xs text-muted-foreground">Total Projects</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-emerald/30 shadow-elegant">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-emerald font-display">
                  {stats.approved}
                </div>
                <div className="text-xs text-muted-foreground">Approved</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-amber/30 shadow-elegant">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-amber-600 font-display">
                  {stats.underReview}
                </div>
                <div className="text-xs text-muted-foreground">Under Review</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-destructive/30 shadow-elegant">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-destructive font-display">
                  {stats.rejected}
                </div>
                <div className="text-xs text-muted-foreground">Rejected</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-primary/30 shadow-elegant">
              <CardContent className="p-4">
                <div className="text-lg font-bold text-primary font-display">
                  {formatCurrency(stats.totalBudget)}
                </div>
                <div className="text-xs text-muted-foreground">Total Budget</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border/50 focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-card border-border/50">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            {/* Budget Filter */}
            <Select value={budgetFilter} onValueChange={setBudgetFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-card border-border/50">
                <TrendingUp className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Budgets</SelectItem>
                <SelectItem value="Large Scale">Large Scale (₹10Cr+)</SelectItem>
                <SelectItem value="Medium Scale">Medium Scale (₹1-10Cr)</SelectItem>
                <SelectItem value="Small Scale">Small Scale (&lt;₹1Cr)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode Toggle */}
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
            <TabsList className="bg-card border border-border/50">
              <TabsTrigger value="grid" className="gap-2">
                <Grid3x3 className="h-4 w-4" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="gap-2">
                <List className="h-4 w-4" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Results Count */}
        {(searchQuery || statusFilter !== "All" || budgetFilter !== "All") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground mb-4"
          >
            Found {filteredProjects.length} project(s)
          </motion.div>
        )}

        {/* Projects Grid/List */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mb-4">
              <FolderOpen className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2 font-display">No Projects Found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {projects.length === 0
                ? "Start analyzing DPR documents to build your projects gallery"
                : "Try adjusting your filters or search query"}
            </p>
            {projects.length === 0 && (
              <Button onClick={() => navigate("/")} className="shadow-glow">
                Upload Your First DPR
              </Button>
            )}
          </motion.div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className="group cursor-pointer bg-gradient-card border-border/50 hover:border-primary/30 shadow-elegant hover:shadow-glow transition-all duration-300 overflow-hidden"
                  onClick={() => navigate("/analysis")}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-lg font-display group-hover:text-primary transition-colors line-clamp-2">
                        {project.projectName}
                      </h3>
                      <Badge
                        variant={getStatusVariant(project.status)}
                        className="flex items-center gap-1 flex-shrink-0"
                      >
                        {getStatusIcon(project.status)}
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(project.uploadDate)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                        <IndianRupee className="h-4 w-4 text-emerald" />
                        <div>
                          <div className="text-xs text-muted-foreground">Budget</div>
                          <div className="font-semibold text-sm">
                            {formatCurrency(project.totalOutlay)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                        <Clock className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Duration</div>
                          <div className="font-semibold text-sm">{project.duration}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                      <MapPin className="h-3 w-3" />
                      <span>India • {getBudgetCategory(project.totalOutlay)} Project</span>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/analysis");
                      }}
                    >
                      View Analysis
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsGallery;
