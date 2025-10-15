import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import AnalysisLoader from "@/components/AnalysisLoader";
import EmptyState from "@/components/EmptyState";
import AnimatedCounter from "@/components/AnimatedCounter";
import SavedAnalyses from "@/components/SavedAnalyses";
import InteractiveBudgetChart from "@/components/InteractiveBudgetChart";
import RiskMatrix from "@/components/RiskMatrix";
import GanttChart from "@/components/GanttChart";
import { saveAnalysis } from "@/lib/analysisStorage";
import { 
  FileText, 
  Send, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  IndianRupee,
  Calendar,
  Users,
  Target,
  PieChart,
  BarChart3,
  Shield,
  Lightbulb,
  Flag,
  Award,
  Building2,
  MapPin,
  Download,
  Share2,
  Home as HomeIcon,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Search,
  Filter,
  X
} from "lucide-react";
import { PieChart as RechartsPie, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ProposalAnalysis = () => {
  const [chatMessages, setChatMessages] = useState<{ question: string; answer: string; source: string }[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasDocument, setHasDocument] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState<"All" | "High" | "Medium" | "Low">("All");
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "json">("pdf");
  const { toast } = useToast();

  // Simulate loading state and check if document exists
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Check if user came from upload (you can use URL params or localStorage in real app)
      const hasUploadedDoc = sessionStorage.getItem("hasUploadedDoc");
      setHasDocument(hasUploadedDoc === "true");
    }, 4500); // 4.5 seconds to show all loading steps

    return () => clearTimeout(timer);
  }, []);

  const handleViewSample = () => {
    setHasDocument(true);
    sessionStorage.setItem("hasUploadedDoc", "true");
  };

  // Show loader while analyzing
  if (isLoading) {
    return <AnalysisLoader />;
  }

  // Show empty state if no document
  if (!hasDocument) {
    return <EmptyState onViewSample={handleViewSample} />;
  }

  // Hardcoded data from dpr1.pdf - North Eastern Region Development Project
  const proposalData = {
    projectName: "Integrated Tourism Development Project - Arunachal Pradesh",
    objective: "Development of eco-tourism infrastructure and sustainable livelihood opportunities in the Eastern Himalayan region, focusing on community participation and environmental conservation",
    totalOutlay: 125000000, // ₹12.5 Crores
    duration: "24 months",
    startDate: "01-04-2026",
    endDate: "31-03-2028",
    client: "Ministry of Development of North Eastern Region (DoNER)",
    proposer: "Northeast Infrastructure & Development Consortium Pvt. Ltd.",
    gstinStatus: "Mentioned",
    gstin: "12AABCT5678N1Z9",
    tdsStatus: "Addressed",
    gstRate: 18,
    location: "Tawang & Bomdila Districts, Arunachal Pradesh",
    beneficiaries: "Approximately 15,000 direct and 45,000 indirect beneficiaries",
  };

  const budgetBreakdown = [
    { name: "Civil Works & Infrastructure", value: 45000000, percentage: 36 },
    { name: "Tourism Facilities & Amenities", value: 30000000, percentage: 24 },
    { name: "Community Development & Training", value: 20000000, percentage: 16 },
    { name: "Equipment & Technology", value: 15000000, percentage: 12 },
    { name: "Project Management", value: 10000000, percentage: 8 },
    { name: "Contingency & Miscellaneous", value: 5000000, percentage: 4 },
  ];

  const risks: Array<{
    description: string;
    likelihood: "High" | "Medium" | "Low";
    impact: "High" | "Medium" | "Low";
    mitigation: string;
  }> = [
    {
      description: "Harsh winter conditions (Nov-Mar) limiting accessibility to high-altitude sites",
      likelihood: "High",
      impact: "High",
      mitigation: "Front-load construction activities to Apr-Oct period, establish material stockpiles before winter, hire local labor familiar with terrain"
    },
    {
      description: "Land acquisition delays due to community land ownership patterns in tribal areas",
      likelihood: "High",
      impact: "High",
      mitigation: "Early engagement with Gram Panchayats, use of revenue land where possible, transparent compensation mechanism as per RFCTLARR Act 2013"
    },
    {
      description: "Environmental clearances for eco-sensitive Himalayan zones",
      likelihood: "Medium",
      impact: "High",
      mitigation: "Pre-cleared design with State Forest Department, minimal ecological footprint approach, concurrent clearance processing"
    },
    {
      description: "Limited skilled labor availability in remote hill areas",
      likelihood: "High",
      impact: "Medium",
      mitigation: "Partnership with local ITIs for skill training, provision of worker accommodation, attractive daily wage structure"
    },
    {
      description: "Border area security protocols causing project delays",
      likelihood: "Medium",
      impact: "Medium",
      mitigation: "Early coordination with Army and State Police, obtain all necessary permits in advance, local hiring preference"
    },
    {
      description: "Material transportation costs due to poor road connectivity",
      likelihood: "High",
      impact: "Medium",
      mitigation: "Local material sourcing strategy, establish forward storage depots, monsoon-season buffer stock"
    },
  ];

  const swotAnalysis = {
    strengths: [
      "Strong track record with 8 completed DoNER projects in NE states",
      "Partnership with local tribal councils and community organizations",
      "In-house expertise in high-altitude construction and eco-tourism",
      "Established supply chain network in Assam and Arunachal Pradesh",
      "Team includes native speakers of local languages (Monpa, Sherdukpen)"
    ],
    weaknesses: [
      "Limited experience with large-scale tourism infrastructure projects",
      "No existing base camp or project office in Tawang district",
      "Dependency on weather windows for construction activities",
      "Lack of specialized wildlife conservation expertise on team",
      "No prior experience with Inner Line Permit (ILP) regulated zones"
    ],
    opportunities: [
      "Growing domestic tourism demand for Himalayan destinations post-pandemic",
      "Government's Act East Policy and focus on NER development",
      "Potential inclusion in Swadesh Darshan 2.0 scheme",
      "Buddhist Circuit development aligning with Tawang's monasteries",
      "Cross-border tourism potential with Bhutan after infrastructure development",
      "Carbon credit opportunities through eco-tourism model"
    ],
    threats: [
      "Geopolitical tensions affecting tourism in border areas",
      "Climate change impacts on Himalayan ecosystems and glacial lakes",
      "Local resistance to commercialization of traditional areas",
      "Competition from established Sikkim and Himachal tourism sectors",
      "Potential delays in obtaining Ministry of Home Affairs security clearances",
      "Monsoon and landslide risks affecting tourist footfall and project timeline"
    ]
  };

  const redFlags = [
    "Environmental Impact Assessment (EIA) not yet submitted - may cause 4-6 month delay",
    "No mention of Forest Conservation Act clearance despite construction in forest buffer zones",
    "Payment terms: 40% upfront (₹5 Cr) without bank guarantee - poses financial risk to DoNER",
    "Inadequate budget allocation for winter maintenance (only 2% contingency)",
    "No clear exit strategy or transition plan after project completion",
    "Missing consultation with State Tourism Department - potential coordination issues",
    "No baseline survey data on current tourist footfall and carrying capacity",
    "Wildlife corridors and elephant migration routes not adequately addressed",
    "Insufficient provision for community grievance redressal mechanism",
    "No mention of compliance with Scheduled Tribes and Other Traditional Forest Dwellers Act 2006"
  ];

  const discussionPoints = [
    "Request immediate submission of Environmental Impact Assessment (EIA) and obtain MOEF clearance timeline",
    "Clarify land acquisition status - obtain revenue records and NOCs from Gram Panchayats",
    "Demand reduction of upfront payment to 20% and link subsequent payments to milestone completion",
    "Seek written consent from State Forest Department for construction in buffer zones",
    "Request detailed consultation records with local tribal communities and village councils",
    "Ask for comprehensive winter contingency plan including material storage and worker welfare",
    "Obtain clarification on compliance with Inner Line Permit (ILP) regulations for workers",
    "Demand baseline survey report on tourist carrying capacity and environmental sensitivity",
    "Request addition of liquidated damages clause - minimum 0.5% per week of delay",
    "Seek confirmation of tie-ups with local employment exchange for mandatory local hiring (>60%)",
    "Ask for detailed O&M plan with community training and sustainable revenue model post-completion"
  ];

  const govtSchemes = [
    { name: "North East Special Infrastructure Development Scheme (NESIDS)", aligned: true },
    { name: "Swadesh Darshan 2.0", aligned: true },
    { name: "PRASAD (Pilgrimage Rejuvenation)", aligned: true },
    { name: "Act East Policy", aligned: true },
    { name: "Startup India", aligned: false },
  ];

  const timeline = [
    {
      phase: "Phase 1: Site Preparation & Design",
      duration: "4 months",
      activities: [
        "Land acquisition and clearances",
        "Detailed project design and approvals",
        "Environmental clearances",
        "Contractor selection"
      ]
    },
    {
      phase: "Phase 2: Infrastructure Development",
      duration: "8 months",
      activities: [
        "Civil construction works",
        "Road and access development",
        "Utility installations",
        "Tourism facility construction"
      ]
    },
    {
      phase: "Phase 3: Community Engagement",
      duration: "6 months",
      activities: [
        "Local employment and training",
        "Community consultation programs",
        "Skill development workshops",
        "Heritage conservation activities"
      ]
    },
    {
      phase: "Phase 4: Equipment & Technology",
      duration: "3 months",
      activities: [
        "Technology infrastructure setup",
        "Equipment procurement and installation",
        "Digital systems integration",
        "Testing and commissioning"
      ]
    },
    {
      phase: "Phase 5: Launch & Operations",
      duration: "3 months",
      activities: [
        "Soft launch and trials",
        "Staff training and deployment",
        "Marketing and promotion",
        "Official inauguration"
      ]
    }
  ];

  const suggestedQuestions = [
    "What are the GST implications mentioned?",
    "Is there a mention of TDS compliance?",
    "Who are the authorized signatories?",
    "What is the proposed payment schedule?",
    "What are the environmental clearances required?",
    "How is local community participation ensured?",
    "What is the land acquisition status?",
    "Are there provisions for tribal employment?",
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Filter red flags and discussion points based on search query
  const filteredRedFlags = redFlags.filter(flag =>
    flag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDiscussionPoints = discussionPoints.filter(point =>
    point.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter risks based on severity
  const filteredRisks = risks.filter(risk => {
    if (riskFilter === "All") return true;
    return risk.likelihood === riskFilter || risk.impact === riskFilter;
  });

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleExport = () => {
    if (exportFormat === "excel") {
      exportToExcel();
    } else if (exportFormat === "json") {
      exportToJSON();
    } else {
      exportToPDF();
    }
  };

  const exportToExcel = () => {
    toast({
      title: "Exporting to Excel",
      description: "Generating Excel workbook...",
    });

    try {
      // Create workbook
      const wb = XLSX.utils.book_new();

      // Sheet 1: Project Overview
      const overviewData = [
        ["Project Analysis Report"],
        [""],
        ["Project Name", proposalData.projectName],
        ["Total Outlay", formatCurrency(proposalData.totalOutlay)],
        ["Duration", proposalData.duration],
        ["Start Date", proposalData.startDate],
        ["End Date", proposalData.endDate],
        ["Location", proposalData.location],
        ["Client", proposalData.client],
        ["Proposer", proposalData.proposer],
        [""],
        ["Objective"],
        [proposalData.objective],
      ];
      const ws1 = XLSX.utils.aoa_to_sheet(overviewData);
      XLSX.utils.book_append_sheet(wb, ws1, "Project Overview");

      // Sheet 2: Budget Breakdown
      const budgetData = [
        ["Category", "Amount (₹)", "Percentage"],
        ...budgetBreakdown.map((item) => [
          item.name,
          item.value,
          `${item.percentage}%`,
        ]),
        [""],
        ["Total", proposalData.totalOutlay, "100%"],
      ];
      const ws2 = XLSX.utils.aoa_to_sheet(budgetData);
      XLSX.utils.book_append_sheet(wb, ws2, "Budget Breakdown");

      // Sheet 3: Risks
      const risksData = [
        ["Risk Description", "Likelihood", "Impact", "Mitigation Strategy"],
        ...risks.map((risk) => [
          risk.description,
          risk.likelihood,
          risk.impact,
          risk.mitigation,
        ]),
      ];
      const ws3 = XLSX.utils.aoa_to_sheet(risksData);
      XLSX.utils.book_append_sheet(wb, ws3, "Risk Analysis");

      // Sheet 4: Red Flags
      const redFlagsData = [
        ["#", "Red Flag"],
        ...redFlags.map((flag, index) => [index + 1, flag]),
      ];
      const ws4 = XLSX.utils.aoa_to_sheet(redFlagsData);
      XLSX.utils.book_append_sheet(wb, ws4, "Red Flags");

      // Sheet 5: Discussion Points
      const discussionData = [
        ["#", "Discussion Point"],
        ...discussionPoints.map((point, index) => [index + 1, point]),
      ];
      const ws5 = XLSX.utils.aoa_to_sheet(discussionData);
      XLSX.utils.book_append_sheet(wb, ws5, "Discussion Points");

      // Sheet 6: SWOT Analysis
      const swotData = [
        ["SWOT Analysis"],
        [""],
        ["Strengths"],
        ...swotAnalysis.strengths.map(s => [s]),
        [""],
        ["Weaknesses"],
        ...swotAnalysis.weaknesses.map(w => [w]),
        [""],
        ["Opportunities"],
        ...swotAnalysis.opportunities.map(o => [o]),
        [""],
        ["Threats"],
        ...swotAnalysis.threats.map(t => [t]),
      ];
      const ws6 = XLSX.utils.aoa_to_sheet(swotData);
      XLSX.utils.book_append_sheet(wb, ws6, "SWOT Analysis");

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `DPR_Analysis_${proposalData.projectName.replace(/\s+/g, "_")}_${timestamp}.xlsx`;

      // Write file
      XLSX.writeFile(wb, filename);

      toast({
        title: "Export Complete",
        description: `Excel file "${filename}" has been downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate Excel file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportToJSON = () => {
    toast({
      title: "Exporting to JSON",
      description: "Generating JSON file...",
    });

    try {
      // Create comprehensive JSON structure
      const analysisData = {
        metadata: {
          exportDate: new Date().toISOString(),
          exportFormat: "JSON",
          version: "1.0",
          generator: "DPR Analyzer",
        },
        project: {
          name: proposalData.projectName,
          objective: proposalData.objective,
          totalOutlay: proposalData.totalOutlay,
          duration: proposalData.duration,
          startDate: proposalData.startDate,
          endDate: proposalData.endDate,
          location: proposalData.location,
          client: proposalData.client,
          proposer: proposalData.proposer,
          beneficiaries: proposalData.beneficiaries,
        },
        compliance: {
          gstinStatus: proposalData.gstinStatus,
          gstin: proposalData.gstin,
          tdsStatus: proposalData.tdsStatus,
          gstRate: proposalData.gstRate,
        },
        budget: {
          breakdown: budgetBreakdown,
          total: proposalData.totalOutlay,
        },
        risks: risks,
        analysis: {
          redFlags: redFlags,
          discussionPoints: discussionPoints,
        },
        swotAnalysis: swotAnalysis,
        governmentSchemes: govtSchemes,
      };

      // Convert to JSON string with pretty formatting
      const jsonString = JSON.stringify(analysisData, null, 2);

      // Create blob and download
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `DPR_Analysis_${proposalData.projectName.replace(/\s+/g, "_")}_${timestamp}.json`;
      
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Complete",
        description: `JSON file "${filename}" has been downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate JSON file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportToPDF = () => {
    toast({
      title: "Exporting to PDF",
      description: "Your analysis report is being generated as PDF...",
    });
    
    // Simulate PDF export (would need additional library like jsPDF for real implementation)
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "PDF export will be implemented with jsPDF library.",
      });
    }, 2000);
  };

  const handleShare = () => {
    // Copy link to clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link Copied",
        description: "Analysis link has been copied to clipboard.",
      });
    }).catch(() => {
      toast({
        title: "Share",
        description: "Share this analysis: " + url,
        variant: "default",
      });
    });
  };

  const handleSaveAnalysis = () => {
    if (isSaved) {
      toast({
        title: "Already Saved",
        description: "This analysis is already in your saved list.",
      });
      return;
    }

    saveAnalysis({
      projectName: proposalData.projectName,
      totalOutlay: proposalData.totalOutlay,
      duration: proposalData.duration,
      status: "Under Review",
    });

    setIsSaved(true);
    toast({
      title: "Analysis Saved",
      description: "You can access this analysis anytime from your history.",
    });
  };

  const handleAskQuestion = (question: string) => {
    // Show typing indicator
    setIsTyping(true);
    setCurrentQuestion("");

    // Simulate AI thinking time
    setTimeout(() => {
      // Mock AI response - would be replaced with actual AI call
      const mockAnswers: { [key: string]: { answer: string; source: string } } = {
        "What are the GST implications mentioned?": {
          answer: `The proposal mentions GST at 18% on all civil works and services. The total project cost of ₹12.5 Crores is exclusive of GST. CGST (9%) and SGST (9%) totaling ₹2.25 Crores will be applicable. The vendor's GSTIN ${proposalData.gstin} is registered in Arunachal Pradesh. Inter-state procurement of specialized equipment may attract IGST at 18%.`,
          source: "Section 7.2: Taxation and Statutory Compliance"
        },
        "Is there a mention of TDS compliance?": {
          answer: "Yes, TDS provisions are clearly mentioned. As per Section 194C of the Income Tax Act, TDS at 2% will be deducted on each payment for works contract. Additionally, for professional consultancy fees (architectural, environmental), TDS at 10% under Section 194J will apply. The contractor will provide Form 16A after each deduction.",
          source: "Section 7.3: Tax Deduction at Source (TDS) Compliance"
        },
        "Who are the authorized signatories?": {
          answer: "The authorized signatories are: 1) Mr. Tenzin Dorjee (Managing Director, Northeast Infrastructure & Development Consortium) - DIN: 08765432, and 2) Ms. Kavita Sharma (Chief Financial Officer) - DIN: 08765433. Both are registered directors with MCA and have submitted their PAN details.",
          source: "Section 1.5: Company Details & Authorized Representatives"
        },
        "What is the proposed payment schedule?": {
          answer: "Payment schedule: 40% (₹5 Cr) upon contract signing and submission of bank guarantee, 30% (₹3.75 Cr) upon 50% physical progress certified by PMU, 20% (₹2.5 Cr) upon 80% completion and preliminary acceptance, and 10% (₹1.25 Cr) upon final completion and 3-month defect liability period. All payments subject to 2% TDS deduction.",
          source: "Section 8: Payment Terms and Milestone-Based Releases"
        },
        "What are the environmental clearances required?": {
          answer: "The project requires: 1) Environmental Clearance (EC) from MoEF&CC under EIA Notification 2006 for construction >20,000 sq.m, 2) Forest Clearance under Forest Conservation Act 1980 as 12 hectares fall in deemed forest area, 3) Wildlife clearance from State Wildlife Board as project is within 10km of Eaglenest Wildlife Sanctuary, and 4) Approval from State Pollution Control Board for construction activities.",
          source: "Section 4.3: Regulatory Approvals and Environmental Compliance"
        },
        "How is local community participation ensured?": {
          answer: "Community participation is ensured through: 1) Formation of Village Tourism Development Committees (VTDCs) in 8 project villages, 2) Mandatory 60% local employment with preference to tribal youth, 3) Skill training programs for 500 local youth in hospitality and guiding, 4) Revenue sharing model - 15% of tourism receipts to Village Development Fund, and 5) Monthly Gram Sabha consultations during project execution.",
          source: "Section 3.4: Community Participation and Livelihood Enhancement"
        },
        "What is the land acquisition status?": {
          answer: "Land status: Total 45 hectares required - 30 hectares is government revenue land (transfer initiated), 12 hectares is deemed forest land (FC application submitted), and 3 hectares is community land belonging to Tawang Monastery Trust (MoU under negotiation). As per RFCTLARR Act 2013, Social Impact Assessment (SIA) has been completed for the 3 hectares. No private agricultural land acquisition required.",
          source: "Section 2.2: Land Acquisition and Site Status"
        },
        "Are there provisions for tribal employment?": {
          answer: "Yes, comprehensive provisions exist: 1) Minimum 60% workforce to be from Scheduled Tribes of Arunachal Pradesh as per State Employment Policy, 2) Skill training tie-up with Tawang ITI for 500 local youth, 3) Women's Self-Help Groups engaged for handicraft production and local cuisine units, 4) Preference to Monpa and Sherdukpen tribal communities in eco-guide training, and 5) Annual employment reports to be submitted to Tribal Welfare Department.",
          source: "Section 6.1: Tribal Employment and Inclusive Development"
        }
      };

      const response = mockAnswers[question] || {
        answer: "Based on the proposal analysis, I couldn't find specific information about this query. Would you like me to search through related sections?",
        source: "No specific section found"
      };

      setChatMessages([...chatMessages, { question, answer: response.answer, source: response.source }]);
      setIsTyping(false);
    }, 1500); // 1.5 second delay for typing effect
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Page Header with Breadcrumb */}
      <div className="border-b bg-gradient-card backdrop-blur-sm sticky top-16 z-40 shadow-md">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-sm mb-4"
          >
            <Link
              to="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Analysis</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground line-clamp-1 max-w-[200px] sm:max-w-[400px]">
              {proposalData.projectName}
            </span>
          </motion.nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="p-3 bg-gradient-hero rounded-lg shadow-glow"
              >
                <FileText className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl font-bold font-display bg-gradient-hero bg-clip-text text-transparent"
                >
                  Proposal Analysis
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-sm text-muted-foreground line-clamp-1"
                >
                  {proposalData.projectName}
                </motion.p>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-2"
            >
              <Button
                variant="outline"
                size="sm"
                className={`shadow-sm hover:shadow-md transition-all ${
                  isSaved ? "bg-gold/10 border-gold/30 text-gold" : ""
                }`}
                onClick={handleSaveAnalysis}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
              
              <div className="flex items-center gap-2">
                <Select value={exportFormat} onValueChange={(v) => setExportFormat(v as "pdf" | "excel" | "json")}>
                  <SelectTrigger className="w-[140px] h-9 bg-card border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Format</SelectItem>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="json">JSON Data</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="shadow-sm hover:shadow-md transition-shadow"
                  onClick={handleExport}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="shadow-sm hover:shadow-md transition-shadow"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-gradient-card p-4 rounded-xl border border-primary/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <IndianRupee className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Budget</p>
                <p className="text-lg font-bold font-display text-primary">{formatCurrency(proposalData.totalOutlay)}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-card p-4 rounded-xl border border-emerald/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald/10 rounded-lg">
                <Calendar className="h-5 w-5 text-emerald" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-lg font-bold font-display text-emerald">{proposalData.duration}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-card p-4 rounded-xl border border-gold/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gold/10 rounded-lg">
                <Users className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Beneficiaries</p>
                <p className="text-lg font-bold font-display text-gold">
                  <AnimatedCounter end={15} suffix="K+" duration={2000} />
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-card p-4 rounded-xl border border-blue-500/20 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-lg font-bold font-display text-blue-500">Under Review</p>
              </div>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-muted/50 p-1">
            <TabsTrigger value="summary" className="data-[state=active]:bg-gradient-hero data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">
              Summary & Q&A
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-gradient-hero data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">
              Deep Analysis
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Summary & Q&A */}
          <TabsContent value="summary" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Document At-a-Glance */}
              <div className="space-y-6">
                {/* Key Information Card */}
                <Card className="shadow-elegant hover:shadow-glow transition-all duration-300 border-primary/20">
                  <CardHeader className="bg-gradient-card">
                    <CardTitle className="flex items-center gap-2 text-foreground font-display">
                      <Target className="h-5 w-5 text-primary" />
                      Key Information
                    </CardTitle>
                    <CardDescription>Document at-a-glance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Project Name</label>
                      <p className="text-lg font-semibold">{proposalData.projectName}</p>
                    </div>
                    <Separator />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Objective</label>
                      <p className="text-sm">{proposalData.objective}</p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" />
                          Total Outlay
                        </label>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(proposalData.totalOutlay)}</p>
                        <p className="text-xs text-muted-foreground">₹{proposalData.totalOutlay.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Duration
                        </label>
                        <p className="text-xl font-semibold">{proposalData.duration}</p>
                        <p className="text-xs text-muted-foreground">{proposalData.startDate} to {proposalData.endDate}</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Key Stakeholders
                      </label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">Client:</span>
                          <span className="text-sm font-medium">{proposalData.client}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">Proposer:</span>
                          <span className="text-sm font-medium">{proposalData.proposer}</span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Location
                        </label>
                        <p className="text-sm mt-1">{proposalData.location}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Beneficiaries
                        </label>
                        <p className="text-sm mt-1">{proposalData.beneficiaries}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Executive Summary */}
                <Card className="shadow-elegant hover:shadow-glow transition-all duration-300 border-emerald/20">
                  <CardHeader className="bg-gradient-card">
                    <CardTitle className="flex items-center gap-2 text-foreground font-display">
                      <FileText className="h-5 w-5 text-emerald" />
                      Executive Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">
                      This DPR proposes the development of sustainable eco-tourism infrastructure in the pristine Eastern Himalayan region of Arunachal Pradesh, specifically targeting Tawang and Bomdila districts. The project addresses the dual challenges of economic upliftment of tribal communities while preserving the fragile mountain ecosystem and rich Buddhist cultural heritage. The proposal outlines construction of community-managed homestays, eco-lodges, trekking trails, interpretation centers, and skill development programs. Expected outcomes include direct employment for 500+ tribal youth, indirect livelihood benefits for 15,000 beneficiaries, annual tourist footfall increase from 25,000 to 75,000, and establishment of a sustainable revenue model ensuring 15% returns to village development funds. The project aligns with DoNER's vision of inclusive growth and Act East Policy while promoting responsible tourism in the North Eastern Region.
                    </p>
                  </CardContent>
                </Card>

                {/* Scope of Work Outline */}
                <Card className="shadow-elegant hover:shadow-glow transition-all duration-300 border-gold/20">
                  <CardHeader className="bg-gradient-card">
                    <CardTitle className="flex items-center gap-2 text-foreground font-display">
                      <Building2 className="h-5 w-5 text-gold" />
                      Scope of Work
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="deliverables">
                        <AccordionTrigger>Key Deliverables</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald mt-0.5" />
                              <span>Construction of 25 community-managed homestays (200 beds capacity)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald mt-0.5" />
                              <span>3 eco-lodges with traditional Monpa architecture (75 rooms total)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald mt-0.5" />
                              <span>Development of 8 trekking trails (120 km total) with signage and rest points</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald mt-0.5" />
                              <span>Heritage Interpretation Center at Tawang Monastery complex</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald mt-0.5" />
                              <span>Skill training for 500 local youth (hospitality, trekking guides, handicrafts)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald mt-0.5" />
                              <span>Waste management facilities and solar power installations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald mt-0.5" />
                              <span>Tourism mobile app and online booking portal</span>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="milestones">
                        <AccordionTrigger>Major Milestones</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                              <div className="min-w-24 font-medium text-primary">Month 1-4:</div>
                              <span>Detailed Project Report (DPR) finalization, Environmental clearances, Land transfer, Community consultations</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="min-w-24 font-medium text-primary">Month 5-12:</div>
                              <span>Civil construction of homestays and eco-lodges, Trail development Phase-I, Solar and waste management setup</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="min-w-24 font-medium text-primary">Month 13-18:</div>
                              <span>Interior furnishing, Interpretation Center construction, Staff training programs, Trial operations</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="min-w-24 font-medium text-primary">Month 19-24:</div>
                              <span>Marketing and branding, Portal and app launch, Soft opening, Final handover to community management committees</span>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="out-of-scope">
                        <AccordionTrigger>Out of Scope Items</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-destructive mt-0.5" />
                              <span>Road connectivity improvements (falls under PWD/BRO jurisdiction)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-destructive mt-0.5" />
                              <span>Renovation of Tawang Monastery (separate heritage conservation project)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-destructive mt-0.5" />
                              <span>Airport/helipad construction (under AAI scope)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-destructive mt-0.5" />
                              <span>Ongoing maintenance costs after 3-year warranty period</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-destructive mt-0.5" />
                              <span>Marketing and promotion beyond initial campaign</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-destructive mt-0.5" />
                              <span>Wildlife conservation activities (Forest Dept. responsibility)</span>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Interactive Q&A */}
              <div className="space-y-6">
                <Card className="lg:sticky lg:top-4 shadow-elegant border-primary/20">
                  <CardHeader className="bg-gradient-card">
                    <CardTitle className="flex items-center gap-2 text-foreground font-display">
                      <Send className="h-5 w-5 text-primary" />
                      Interactive Q&A
                    </CardTitle>
                    <CardDescription>Ask questions about the proposal</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Suggested Questions */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Suggested Questions</label>
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((question, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleAskQuestion(question)}
                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Chat Interface */}
                    <ScrollArea className="h-96 pr-4">
                      <div className="space-y-4">
                        {chatMessages.length === 0 && !isTyping ? (
                          <div className="text-center py-8 text-muted-foreground text-sm">
                            Ask a question to get started, or click one of the suggested questions above.
                          </div>
                        ) : (
                          <>
                            {chatMessages.map((msg, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-3"
                              >
                                {/* Question */}
                                <div className="bg-gradient-hero/10 p-3 rounded-lg border border-primary/20">
                                  <p className="text-sm font-medium text-foreground">{msg.question}</p>
                                </div>
                                {/* Answer */}
                                <div className="bg-gradient-card p-3 rounded-lg space-y-2 border border-muted">
                                  <p className="text-sm text-foreground">{msg.answer}</p>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <FileText className="h-3 w-3" />
                                    <span className="italic">{msg.source}</span>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                            
                            {/* Typing Indicator */}
                            {isTyping && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-card p-3 rounded-lg border border-muted"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                      <motion.div
                                        key={i}
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{
                                          duration: 0.6,
                                          repeat: Infinity,
                                          delay: i * 0.2,
                                        }}
                                        className="w-2 h-2 bg-primary rounded-full"
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground">AI is analyzing...</span>
                                </div>
                              </motion.div>
                            )}
                          </>
                        )}
                      </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your question..."
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && currentQuestion.trim()) {
                            handleAskQuestion(currentQuestion);
                          }
                        }}
                        className="shadow-sm focus:shadow-md transition-shadow"
                      />
                      <Button
                        onClick={() => currentQuestion.trim() && handleAskQuestion(currentQuestion)}
                        disabled={!currentQuestion.trim()}
                        className="bg-gradient-hero shadow-glow hover:shadow-elegant transition-all"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Saved Analyses History */}
                <SavedAnalyses />
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Deep Analysis */}
          <TabsContent value="analysis" className="space-y-6">
            {/* Financial & Compliance Analysis */}
            <Card className="shadow-elegant hover:shadow-glow transition-all duration-300 border-primary/20">
              <CardHeader className="bg-gradient-card">
                <CardTitle className="flex items-center gap-2 text-foreground font-display">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  Financial & Compliance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Budget Verification */}
                <div>
                  <h3 className="font-semibold mb-4 font-display">Budget Verification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="p-4 bg-gradient-card rounded-lg shadow-sm border border-muted">
                      <p className="text-sm text-muted-foreground">Total Project Cost (Excl. GST)</p>
                      <p className="text-2xl font-bold text-foreground font-display">{formatCurrency(proposalData.totalOutlay)}</p>
                    </div>
                    <div className="p-4 bg-gradient-card rounded-lg shadow-sm border border-muted">
                      <p className="text-sm text-muted-foreground">Total GST (18%)</p>
                      <p className="text-2xl font-bold text-gold font-display">{formatCurrency(proposalData.totalOutlay * 0.18)}</p>
                    </div>
                    <div className="p-4 bg-gradient-hero/10 rounded-lg shadow-md border border-primary/30">
                      <p className="text-sm text-muted-foreground">Grand Total (Payable)</p>
                      <p className="text-2xl font-bold text-primary font-display">{formatCurrency(proposalData.totalOutlay * 1.18)}</p>
                    </div>
                  </div>
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Verified</AlertTitle>
                    <AlertDescription>
                      The total of individual cost heads matches the grand total mentioned in the pricing summary.
                    </AlertDescription>
                  </Alert>
                </div>

                <Separator />

                {/* Taxation Compliance */}
                <div>
                  <h3 className="font-semibold mb-4 font-display">Taxation Compliance Check</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg bg-gradient-card shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">GST Analysis</span>
                        <Badge variant="default" className="bg-emerald text-emerald-foreground">{proposalData.gstinStatus}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">GSTIN: {proposalData.gstin}</p>
                      <p className="text-sm">Applicable GST Rate: <span className="font-semibold text-primary">{proposalData.gstRate}%</span> (CGST 9% + SGST 9%)</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-gradient-card shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">TDS Compliance</span>
                        <Badge variant="default" className="bg-emerald text-emerald-foreground">{proposalData.tdsStatus}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Section 194C applicable</p>
                      <p className="text-sm">TDS Rate: <span className="font-semibold text-primary">2%</span> on each payment</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Cost Breakdown Chart - Interactive */}
                <div>
                  <h3 className="font-semibold mb-4 font-display">Cost Breakdown - Click to Explore</h3>
                  <InteractiveBudgetChart 
                    data={budgetBreakdown} 
                    totalBudget={proposalData.totalOutlay}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <Card className="shadow-elegant hover:shadow-glow transition-all duration-300 border-amber-500/20">
              <CardHeader className="bg-gradient-card">
                <CardTitle className="flex items-center gap-2 text-foreground font-display">
                  <Shield className="h-5 w-5 text-amber-600" />
                  Risk Analysis (India Context)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredRisks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No risks match your filter criteria
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-semibold">Risk Description</th>
                          <th className="text-center p-3 font-semibold">Likelihood</th>
                          <th className="text-center p-3 font-semibold">Impact</th>
                          <th className="text-left p-3 font-semibold">Mitigation Strategy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRisks.map((risk, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3">{risk.description}</td>
                          <td className="p-3 text-center">
                            <Badge variant={risk.likelihood === 'High' ? 'destructive' : risk.likelihood === 'Medium' ? 'default' : 'secondary'}>
                              {risk.likelihood}
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Badge variant={risk.impact === 'High' ? 'destructive' : risk.impact === 'Medium' ? 'default' : 'secondary'}>
                              {risk.impact}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm">{risk.mitigation}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Risk Matrix Heatmap */}
            <RiskMatrix risks={risks} />

            {/* Gantt Chart Timeline */}
            <GanttChart timeline={timeline} totalDuration={proposalData.duration} />

            {/* Market & Feasibility Analysis */}
            <Card className="shadow-elegant hover:shadow-glow transition-all duration-300 border-emerald/20">
              <CardHeader className="bg-gradient-card">
                <CardTitle className="flex items-center gap-2 text-foreground font-display">
                  <TrendingUp className="h-5 w-5 text-emerald" />
                  Market & Feasibility Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 font-display">Target Market Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg bg-gradient-card shadow-sm hover:shadow-md transition-all">
                      <MapPin className="h-5 w-5 text-primary mb-2" />
                      <p className="font-medium">Geography</p>
                      <p className="text-sm text-muted-foreground">Tawang & Bomdila Districts (High-altitude Himalayan region)</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-gradient-card shadow-sm hover:shadow-md transition-all">
                      <Users className="h-5 w-5 text-emerald mb-2" />
                      <p className="font-medium">Target Beneficiaries</p>
                      <p className="text-sm text-muted-foreground">15,000 tribal population & 75,000 annual tourists</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-gradient-card shadow-sm hover:shadow-md transition-all">
                      <Building2 className="h-5 w-5 text-gold mb-2" />
                      <p className="font-medium">Market Segment</p>
                      <p className="text-sm text-muted-foreground">Eco-tourism & Cultural Heritage</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Competitive Landscape</h3>
                  <div className="space-y-3">
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>Competitive Advantage</AlertTitle>
                      <AlertDescription>
                        Strong local presence and tribal community partnerships, 8 years DoNER experience, focus on sustainable eco-tourism model vs. mass tourism
                      </AlertDescription>
                    </Alert>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm"><span className="font-medium">Key Competitors:</span> Sikkim Tourism Development Corporation, Himachal Pradesh Tourism, Private eco-resort chains (Taj Gateway, Sterling Resorts)</p>
                      <p className="text-sm mt-2"><span className="font-medium">Differentiator:</span> Community-owned model with 60% local employment vs. corporate-managed resorts</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3 font-display">Alignment with Government Initiatives</h3>
                  <div className="flex flex-wrap gap-3">
                    {govtSchemes.map((scheme, index) => (
                      <div key={index} className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all ${scheme.aligned ? 'bg-gradient-emerald/10 text-emerald border border-emerald/30' : 'bg-muted border border-muted-foreground/20'}`}>
                        {scheme.aligned ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        <span className="text-sm font-medium">{scheme.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SWOT Analysis */}
            <Card className="shadow-elegant hover:shadow-glow transition-all duration-300 border-primary/20">
              <CardHeader className="bg-gradient-card">
                <CardTitle className="flex items-center gap-2 text-foreground font-display">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  SWOT Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="p-4 border-2 border-emerald/50 rounded-lg bg-emerald/5 shadow-sm hover:shadow-md transition-all">
                    <h3 className="font-semibold text-emerald mb-3 flex items-center gap-2 font-display">
                      <Award className="h-4 w-4" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {swotAnalysis.strengths.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-emerald mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="p-4 border-2 border-amber-500/50 rounded-lg bg-amber-500/5 shadow-sm hover:shadow-md transition-all">
                    <h3 className="font-semibold text-amber-600 mb-3 flex items-center gap-2 font-display">
                      <AlertTriangle className="h-4 w-4" />
                      Weaknesses
                    </h3>
                    <ul className="space-y-2">
                      {swotAnalysis.weaknesses.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div className="p-4 border-2 border-blue-500/50 rounded-lg bg-blue-500/5 shadow-sm hover:shadow-md transition-all">
                    <h3 className="font-semibold text-blue-600 mb-3 flex items-center gap-2 font-display">
                      <Lightbulb className="h-4 w-4" />
                      Opportunities
                    </h3>
                    <ul className="space-y-2">
                      {swotAnalysis.opportunities.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Threats */}
                  <div className="p-4 border-2 border-destructive/50 rounded-lg bg-destructive/5 shadow-sm hover:shadow-md transition-all">
                    <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2 font-display">
                      <Flag className="h-4 w-4" />
                      Threats
                    </h3>
                    <ul className="space-y-2">
                      {swotAnalysis.threats.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Flag className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actionable Recommendations & Red Flags */}
            <Card className="shadow-elegant hover:shadow-glow transition-all duration-300 border-destructive/20 bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="bg-gradient-to-r from-destructive/10 to-destructive/5 border-b border-destructive/20">
                <CardTitle className="flex items-center gap-3 text-foreground font-display text-2xl">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  Actionable Recommendations & Red Flags
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  Critical issues requiring immediate attention and actionable discussion points
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-6">
                {/* Search and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search red flags and discussion points..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={riskFilter} onValueChange={(value: any) => setRiskFilter(value)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Risks</SelectItem>
                      <SelectItem value="High">High Risk</SelectItem>
                      <SelectItem value="Medium">Medium Risk</SelectItem>
                      <SelectItem value="Low">Low Risk</SelectItem>
                    </SelectContent>
                  </Select>
                  {(searchQuery || riskFilter !== "All") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setRiskFilter("All");
                      }}
                      className="whitespace-nowrap"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  )}
                </div>

                {/* Search Results Info */}
                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-muted-foreground"
                  >
                    Found {filteredRedFlags.length} red flag(s) and {filteredDiscussionPoints.length} discussion point(s)
                  </motion.div>
                )}

                {/* Red Flags */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-destructive/10 rounded-md">
                      <Flag className="h-5 w-5 text-destructive" />
                    </div>
                    <h3 className="text-lg font-bold text-destructive font-display">
                      Critical Red Flags
                    </h3>
                    <Badge variant="destructive" className="ml-auto">
                      {filteredRedFlags.length} Issues
                    </Badge>
                  </div>
                  {filteredRedFlags.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No red flags match your search criteria
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {filteredRedFlags.map((flag, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Alert 
                          variant="destructive" 
                          className="border-l-4 border-l-destructive bg-destructive/5 hover:bg-destructive/10 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <AlertTriangle className="h-4 w-4 mt-0.5" />
                          <AlertDescription className="flex items-start gap-2">
                            <span className="font-semibold text-destructive min-w-[24px]">#{index + 1}</span>
                            <span className="text-foreground">{flag}</span>
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    ))}
                    </div>
                  )}
                </div>

                <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Discussion Points */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-primary/10 rounded-md">
                      <Lightbulb className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary font-display">
                      Key Discussion Points
                    </h3>
                    <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary border-primary/20">
                      {filteredDiscussionPoints.length} Action Items
                    </Badge>
                  </div>
                  {filteredDiscussionPoints.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No discussion points match your search criteria
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {filteredDiscussionPoints.map((point, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group relative"
                      >
                        <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-card to-muted/20 rounded-lg border border-border hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                          <div className="w-8 h-8 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-glow group-hover:scale-110 transition-transform duration-200">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground leading-relaxed">{point}</p>
                          </div>
                          <CheckCircle2 className="h-5 w-5 text-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                        </div>
                      </motion.div>
                    ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProposalAnalysis;
