import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Home as HomeIcon,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Download,
  Share2,
  IndianRupee,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertTriangle,
  Send,
  Loader2,
  Filter,
  Search,
  MessageSquare,
  BarChart3,
  PieChart as PieChartIcon,
  Clock,
  Target,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import AnalysisLoader from "@/components/AnalysisLoader";
import EmptyState from "@/components/EmptyState";
import TranslatedText from "@/components/TranslatedText";

export default function ProposalAnalysisNew() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasDocument, setHasDocument] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "json">("pdf");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ question: string; answer: string; source: string }>>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Hardcoded data from DPR1_DATA_REFERENCE.md
  const proposalData = {
    projectName: "Integrated Tourism Development Project - Arunachal Pradesh",
    ministry: "Ministry of Development of North Eastern Region (DoNER)",
    objective: "Development of eco-tourism infrastructure and sustainable livelihood opportunities in the Eastern Himalayan region, focusing on community participation and environmental conservation",
    proposer: "Northeast Infrastructure & Development Consortium Pvt. Ltd.",
    totalOutlay: 125000000, // ₹12.5 Crores
    duration: "24 months (01-04-2026 to 31-03-2028)",
    location: "Tawang & Bomdila Districts, Arunachal Pradesh",
    status: "Under Review",
    gstin: "12AABCT5678N1Z9",
    gstRate: "18% (CGST 9% + SGST 9%)",
    totalGST: 22500000, // ₹2.25 Crores
    grandTotal: 147500000, // ₹14.75 Crores
    directBeneficiaries: 15000,
    indirectBeneficiaries: 45000,
    dateSubmitted: "2026-01-15",
  };

  const budgetBreakdown = [
    { name: "Civil Works & Infrastructure", value: 45000000, percentage: 36 },
    { name: "Tourism Facilities", value: 30000000, percentage: 24 },
    { name: "Community Development", value: 20000000, percentage: 16 },
    { name: "Equipment & Technology", value: 15000000, percentage: 12 },
    { name: "Project Management", value: 10000000, percentage: 8 },
    { name: "Contingency", value: 5000000, percentage: 4 },
  ];

  const deliverables = [
    "25 community-managed homestays (200 beds)",
    "3 eco-lodges with Monpa architecture (75 rooms)",
    "8 trekking trails (120 km) with signage",
    "Heritage Interpretation Center at Tawang",
    "Skill training for 500 local youth",
    "Waste management & solar installations",
    "Tourism mobile app & booking portal",
  ];

  const risks = [
    { 
      category: "Winter Conditions", 
      description: "Nov-Mar accessibility issues in high-altitude areas", 
      severity: "High", 
      impact: "High",
      mitigation: "Advanced scheduling, material pre-positioning, winter-ready equipment" 
    },
    { 
      category: "Land Acquisition", 
      description: "Delays due to tribal land ownership patterns", 
      severity: "High", 
      impact: "High",
      mitigation: "Early Gram Panchayat NOCs, tribal council partnerships" 
    },
    { 
      category: "Environmental Clearances", 
      description: "Eco-sensitive Himalayan zones require MOEF approval", 
      severity: "Medium", 
      impact: "High",
      mitigation: "Immediate EIA submission, Forest Department coordination" 
    },
    { 
      category: "Skilled Labor Shortage", 
      description: "Remote hill areas lack specialized construction workers", 
      severity: "High", 
      impact: "Medium",
      mitigation: "Assam-based contractor partnerships, local training programs" 
    },
    { 
      category: "Border Security Protocols", 
      description: "Army coordination needed for ILP zone", 
      severity: "Medium", 
      impact: "Medium",
      mitigation: "MHA clearances, security briefings for workers" 
    },
    { 
      category: "Material Transportation", 
      description: "Poor road connectivity to Tawang", 
      severity: "High", 
      impact: "Medium",
      mitigation: "Multiple suppliers, helicopter transport for critical items" 
    },
  ];

  const redFlags = [
    "EIA not yet submitted - 4-6 month delay risk",
    "No Forest Conservation Act clearance mentioned",
    "40% upfront payment without bank guarantee",
    "Only 2% contingency for winter maintenance",
    "No exit/transition strategy after completion",
    "Missing State Tourism Dept consultation",
    "No baseline tourist footfall survey",
    "Wildlife corridors not adequately addressed",
    "No community grievance redressal mechanism",
    "ST & OTFD Act 2006 compliance not mentioned",
  ];

  const swotAnalysis = {
    strengths: [
      "8 completed DoNER projects in NE states",
      "Partnership with tribal councils established",
      "High-altitude construction expertise",
      "Strong supply chain in Assam & Arunachal",
      "Native language speakers on team",
    ],
    weaknesses: [
      "Limited large-scale tourism project experience",
      "No existing office in Tawang",
      "Weather-dependent construction timeline",
      "No wildlife conservation expertise",
      "Unfamiliar with ILP zone regulations",
    ],
    opportunities: [
      "Growing Himalayan tourism demand post-COVID",
      "Act East Policy alignment",
      "Swadesh Darshan 2.0 inclusion potential",
      "Buddhist Circuit development",
      "Cross-border Bhutan tourism collaboration",
      "Carbon credit opportunities from eco-tourism",
    ],
    threats: [
      "Geopolitical border tensions with China",
      "Climate change impacting glaciers & weather",
      "Local resistance to tourism commercialization",
      "Competition from Sikkim & Himachal Pradesh",
      "MHA security clearance delays",
      "Monsoon landslides affecting accessibility",
    ],
  };

  const paymentSchedule = [
    { milestone: "Contract signing + bank guarantee", percentage: 40, amount: 50000000 },
    { milestone: "50% physical progress certified", percentage: 30, amount: 37500000 },
    { milestone: "80% completion + preliminary acceptance", percentage: 20, amount: 25000000 },
    { milestone: "Final completion + 3-month defect liability", percentage: 10, amount: 12500000 },
  ];

  const suggestedQuestions = [
    "What are the GST implications mentioned?",
    "What is the payment schedule breakdown?",
    "What environmental clearances are required?",
    "How is local tribal participation ensured?",
    "What is the land acquisition status?",
    "What are the tribal employment provisions?",
    "What are the key deliverables of this project?",
    "What are the critical red flags identified?",
  ];

  const keyInfo = {
    projectCode: "DoNER/AP/TRD/2026/001",
    submissionDate: "January 15, 2026",
    sanctioningAuthority: "Ministry of DoNER",
    projectType: "Infrastructure Development",
    sector: "Tourism & Hospitality",
    fundingSource: "Central Government (100%)",
  };

  const executiveSummary = `The Integrated Tourism Development Project aims to transform Tawang and Bomdila districts into premier eco-tourism destinations while ensuring sustainable development and community participation. With a total outlay of ₹12.5 Crores (₹14.75 Cr including GST), the project will establish 25 community-managed homestays, 3 eco-lodges, 8 trekking trails, and a Heritage Interpretation Center. The 24-month implementation timeline focuses on skill development for 500 local youth, mandatory 60% tribal employment, and a 15% revenue-sharing model with Village Development Funds. Key challenges include pending EIA clearance, complex land acquisition involving tribal lands, and high-altitude construction logistics during winter months.`;

  const scopeOfWork = [
    {
      category: "Infrastructure Development",
      items: [
        "Construction of 25 community homestays (200 beds capacity)",
        "Development of 3 eco-lodges with traditional Monpa architecture (75 rooms)",
        "Creation of 8 trekking trails totaling 120 km with safety signage",
        "Heritage Interpretation Center at Tawang Monastery complex",
      ]
    },
    {
      category: "Community Development",
      items: [
        "Skill training programs for 500 local youth (hospitality, guiding, trades)",
        "Formation of 8 Village Tourism Development Committees (VTDCs)",
        "Women's Self-Help Group engagement for handicrafts and cuisine",
        "Monthly Gram Sabha consultations throughout project lifecycle",
      ]
    },
    {
      category: "Technology & Systems",
      items: [
        "Tourism mobile app with multilingual support",
        "Online booking portal integrated with payment gateway",
        "Waste management system with solar-powered facilities",
        "Digital monitoring and evaluation dashboard",
      ]
    },
    {
      category: "Environmental Conservation",
      items: [
        "Eco-sensitive construction practices in Himalayan zone",
        "Solar power installations for all tourism facilities",
        "Waste segregation and recycling units",
        "Protection of wildlife corridors and elephant migration routes",
      ]
    },
  ];

  const complianceAnalysis = [
    { requirement: "Environmental Clearance (EIA)", status: "Pending", priority: "Critical", timeline: "4-6 months" },
    { requirement: "Forest Conservation Act 1980", status: "Application Submitted", priority: "High", timeline: "3-4 months" },
    { requirement: "Wildlife Board Clearance", status: "Not Started", priority: "High", timeline: "2-3 months" },
    { requirement: "State Pollution Control Board", status: "Not Started", priority: "Medium", timeline: "1-2 months" },
    { requirement: "MHA Security Clearance (ILP Zone)", status: "Pending", priority: "High", timeline: "2-3 months" },
    { requirement: "Gram Panchayat NOCs (8 villages)", status: "In Progress", priority: "Medium", timeline: "1 month" },
    { requirement: "RFCTLARR Act 2013 (SIA)", status: "Completed", priority: "Medium", timeline: "Completed" },
    { requirement: "Tribal Welfare Department Approval", status: "Approved", priority: "Low", timeline: "Completed" },
  ];

  const riskHeatmapData = [
    { risk: "Winter Weather", likelihood: 5, impact: 5, category: "Environmental" },
    { risk: "Land Acquisition", likelihood: 5, impact: 5, category: "Legal" },
    { risk: "EIA Delay", likelihood: 4, impact: 5, category: "Regulatory" },
    { risk: "Labor Shortage", likelihood: 5, impact: 3, category: "Operational" },
    { risk: "Border Security", likelihood: 3, impact: 3, category: "Political" },
    { risk: "Material Transport", likelihood: 5, impact: 3, category: "Logistical" },
    { risk: "Budget Overrun", likelihood: 3, impact: 4, category: "Financial" },
    { risk: "Community Resistance", likelihood: 2, impact: 3, category: "Social" },
    { risk: "Equipment Delays", likelihood: 3, impact: 2, category: "Technical" },
  ];

  const ganttData = [
    { phase: "Clearances & Approvals", start: 0, duration: 4, color: "#3B82F6" },
    { phase: "Civil Construction", start: 4, duration: 8, color: "#10B981" },
    { phase: "Equipment Installation", start: 10, duration: 6, color: "#F59E0B" },
    { phase: "Training Programs", start: 12, duration: 6, color: "#8B5CF6" },
    { phase: "Testing & Commissioning", start: 16, duration: 4, color: "#EC4899" },
    { phase: "Launch & Handover", start: 20, duration: 4, color: "#06B6D4" },
  ];

  const marketAnalysis = {
    currentTourists: "25,000 annually",
    projectedTourists: "75,000 annually (3x growth)",
    avgStayDuration: "3-4 days",
    avgSpending: "₹8,000 per tourist",
    competitorDestinations: ["Sikkim", "Himachal Pradesh", "Bhutan"],
    uniqueSellingPoints: [
      "Tawang Monastery - 2nd largest Buddhist monastery",
      "Sela Pass - High-altitude mountain pass",
      "Monpa & Sherdukpen tribal culture",
      "Eastern Himalayan biodiversity hotspot",
    ],
    marketGrowth: "15-20% annual growth post-COVID",
    seasonality: "Peak: April-October, Low: November-March",
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];

  // Simulate loading state and check if document exists
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      const hasUploadedDoc = sessionStorage.getItem("hasUploadedDoc");
      setHasDocument(hasUploadedDoc === "true");
    }, 4500); // 4.5 seconds to show all loading steps

    return () => clearTimeout(timer);
  }, []);

  const handleViewSample = () => {
    setHasDocument(true);
    sessionStorage.setItem("hasUploadedDoc", "true");
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleExport = () => {
    toast({
      title: "Exporting Analysis",
      description: `Generating ${exportFormat.toUpperCase()} file...`,
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Analysis",
      description: "Link copied to clipboard!",
    });
  };

  const handleSaveAnalysis = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from Saved" : "Analysis Saved",
      description: isSaved ? "Removed from your saved list" : "Added to your saved analyses",
    });
  };

  const handleAskQuestion = (question: string) => {
    if (!question.trim()) return;
    
    setIsTyping(true);
    setCurrentQuestion("");

    setTimeout(() => {
      // Comprehensive answers based on DPR1_DATA_REFERENCE.md
      const mockAnswers: { [key: string]: { answer: string; source: string } } = {
        "What are the GST implications mentioned?": {
          answer: `GST at 18% (CGST 9% + SGST 9%) applies to all civil works and services. The project cost of ₹12.5 Crores is exclusive of GST. Total GST liability is ₹2.25 Crores, making the grand total ₹14.75 Crores. The proposer's GSTIN ${proposalData.gstin} is registered in Arunachal Pradesh. TDS at 2% under Section 194C will be deducted on works contracts, and 10% under Section 194J for consultancy services.`,
          source: "DPR Section 7.2: Taxation & Statutory Compliance"
        },
        "What is the payment schedule breakdown?": {
          answer: `Payment in 4 milestones: (1) 40% (₹5 Cr) upon contract signing with bank guarantee, (2) 30% (₹3.75 Cr) at 50% physical progress, (3) 20% (₹2.5 Cr) at 80% completion with preliminary acceptance, (4) 10% (₹1.25 Cr) after final completion and 3-month defect liability period. All payments subject to 2% TDS. NOTE: Red flag identified - 40% upfront without adequate safeguards.`,
          source: "DPR Section 8: Payment Terms"
        },
        "What environmental clearances are required?": {
          answer: `Four critical clearances needed: (1) Environmental Impact Assessment (EIA) from MoEF&CC under EIA Notification 2006 for >20,000 sq.m construction [NOT YET SUBMITTED - RED FLAG], (2) Forest Clearance under FCA 1980 for 12 hectares in deemed forest, (3) Wildlife Board clearance as project is within 10km of Eaglenest Wildlife Sanctuary, (4) State Pollution Control Board approval for construction activities.`,
          source: "DPR Section 4.3: Regulatory Approvals"
        },
        "How is local tribal participation ensured?": {
          answer: `Strong community focus: (1) Formation of Village Tourism Development Committees (VTDCs) in 8 villages, (2) Mandatory 60% local employment with ST preference, (3) Skill training for 500 youth at Tawang ITI, (4) 15% revenue sharing to Village Development Funds, (5) Monthly Gram Sabha consultations. Partnership established with Monpa and Sherdukpen tribal councils. Women's SHGs engaged for handicrafts and local cuisine.`,
          source: "DPR Section 3.4: Community Participation"
        },
        "What is the land acquisition status?": {
          answer: `Total 45 hectares: (1) 30 ha government revenue land - transfer initiated, (2) 12 ha deemed forest land - Forest Clearance application submitted, (3) 3 ha community land (Tawang Monastery Trust) - MoU under negotiation. Social Impact Assessment (SIA) completed for community land as per RFCTLARR Act 2013. No private agricultural land acquisition required, minimizing displacement.`,
          source: "DPR Section 2.2: Land Acquisition Status"
        },
        "What are the tribal employment provisions?": {
          answer: `Comprehensive provisions: (1) Minimum 60% workforce from Scheduled Tribes per Arunachal Employment Policy, (2) Partnership with Tawang ITI for 500 youth training in hospitality, guiding, construction trades, (3) Women's SHGs for handicraft units, (4) Preference to Monpa & Sherdukpen communities in eco-guide training, (5) Annual employment reports to Tribal Welfare Department. Expected direct employment for 500+ tribal youth.`,
          source: "DPR Section 6.1: Tribal Employment & Inclusive Development"
        },
        "What are the key deliverables of this project?": {
          answer: `Seven major deliverables: (1) 25 community-managed homestays with 200 beds capacity, (2) 3 eco-lodges with traditional Monpa architecture totaling 75 rooms, (3) 8 trekking trails covering 120 km with signage, (4) Heritage Interpretation Center at Tawang Monastery, (5) Skill training program for 500 local youth, (6) Waste management system and solar power installations, (7) Tourism mobile app and online booking portal.`,
          source: "DPR Section 3: Key Deliverables"
        },
        "What are the critical red flags identified?": {
          answer: `10 red flags found: (1) EIA not submitted causing potential 4-6 month delay, (2) No Forest Conservation Act clearance mention, (3) 40% upfront payment without bank guarantee - high financial risk, (4) Only 2% contingency inadequate for winter, (5) No exit strategy post-completion, (6) Missing State Tourism consultation, (7) No baseline tourist footfall data, (8) Wildlife corridors inadequately addressed, (9) No grievance redressal mechanism, (10) ST & OTFD Act 2006 compliance missing.`,
          source: "DPR Analysis: Critical Red Flags"
        }
      };

      const response = mockAnswers[question] || {
        answer: "Based on the DPR analysis, this specific information wasn't found in the current sections. The document covers project overview, budget breakdown, stakeholder details, environmental compliance, tribal employment provisions, and risk assessment. Would you like me to search related sections?",
        source: "DPR General Analysis"
      };

      setChatMessages([...chatMessages, { 
        question, 
        answer: response.answer, 
        source: response.source 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  // Show loader while analyzing
  if (isLoading) {
    return <AnalysisLoader />;
  }

  // Show empty state if no document uploaded
  if (!hasDocument) {
    return <EmptyState onViewSample={handleViewSample} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      {/* Simplified Page Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-sm mb-3"
          >
            <Link
              to="/"
              className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <HomeIcon className="h-3.5 w-3.5" />
              <span><TranslatedText text="Home" /></span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              <TranslatedText text="Analysis" />
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400 line-clamp-1 max-w-[200px] sm:max-w-[400px]">
              {proposalData.projectName}
            </span>
          </motion.nav>

          {/* Page Title Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="p-2.5 bg-blue-600 rounded-lg"
              >
                <FileText className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  <TranslatedText text="Proposal Analysis" />
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1"
                >
                  {proposalData.projectName}
                </motion.p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              <Button
                variant="outline"
                size="sm"
                className={`${
                  isSaved ? "bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400" : ""
                }`}
                onClick={handleSaveAnalysis}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="h-3.5 w-3.5 mr-1.5" />
                    <TranslatedText text="Saved" />
                  </>
                ) : (
                  <>
                    <Bookmark className="h-3.5 w-3.5 mr-1.5" />
                    <TranslatedText text="Save" />
                  </>
                )}
              </Button>
              
              <div className="flex items-center gap-2">
                <Select value={exportFormat} onValueChange={(v) => setExportFormat(v as "pdf" | "excel" | "json")}>
                  <SelectTrigger className="w-[120px] h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleExport}
                >
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  <TranslatedText text="Export" />
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="h-3.5 w-3.5 mr-1.5" />
                <TranslatedText text="Share" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Proposal Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {proposalData.projectName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {proposalData.objective}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900">
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  <TranslatedText text="Total Budget" />
                </p>
              </div>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(proposalData.totalOutlay)}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-500 mt-1">+ ₹2.25 Cr GST</p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  <TranslatedText text="Duration" />
                </p>
              </div>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">24 <TranslatedText text="months" /></p>
              <p className="text-[10px] text-gray-500 dark:text-gray-500 mt-1">Apr 2026 - Mar 2028</p>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-900">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  <TranslatedText text="Beneficiaries" />
                </p>
              </div>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{proposalData.directBeneficiaries.toLocaleString()}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-500 mt-1">+ 45K <TranslatedText text="indirect" /></p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-900">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  <TranslatedText text="Status" />
                </p>
              </div>
              <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                <TranslatedText text={proposalData.status} />
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-500 mt-1">DoNER Ministry</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs Section - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Tabs defaultValue="summary" className="w-full">
            <div className="bg-white dark:bg-gray-900 rounded-t-xl border border-gray-200 dark:border-gray-800 border-b-0">
              <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-gray-200 dark:border-gray-800 rounded-none">
                <TabsTrigger 
                  value="summary" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 px-6 py-3"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Summary & Q&A
                </TabsTrigger>
                <TabsTrigger 
                  value="deep" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 px-6 py-3"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Deep Analysis
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Summary & Q&A Tab */}
            <TabsContent value="summary" className="m-0">
              <div className="bg-white dark:bg-gray-900 rounded-b-xl border border-gray-200 dark:border-gray-800 border-t-0">
                <div className="p-6">
                  {/* Key Info Section */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-base">
                        <TranslatedText text="Key Information" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <TranslatedText text="Project Code" />
                          </p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{keyInfo.projectCode}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <TranslatedText text="Submission Date" />
                          </p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{keyInfo.submissionDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <TranslatedText text="Sanctioning Authority" />
                          </p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{keyInfo.sanctioningAuthority}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <TranslatedText text="Project Type" />
                          </p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            <TranslatedText text={keyInfo.projectType} />
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <TranslatedText text="Sector" />
                          </p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            <TranslatedText text={keyInfo.sector} />
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <TranslatedText text="Funding Source" />
                          </p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            <TranslatedText text={keyInfo.fundingSource} />
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Executive Summary */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-base">
                        <TranslatedText text="Executive Summary" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        <TranslatedText text={executiveSummary} />
                      </p>
                    </CardContent>
                  </Card>

                  {/* Scope of Work */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-base">
                        <TranslatedText text="Scope of Work" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {scopeOfWork.map((scope, i) => (
                          <div key={i}>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{i + 1}</span>
                              </div>
                              <TranslatedText text={scope.category} />
                            </h4>
                            <ul className="ml-8 space-y-1">
                              {scope.items.map((item, j) => (
                                <li key={j} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                                  <span className="flex-1">
                                    <TranslatedText text={item} />
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* AI Chat Section */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Ask Questions</CardTitle>
                        <CardDescription className="text-sm">Get instant answers from the proposal</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[400px] pr-4 mb-4">
                          {chatMessages.length === 0 ? (
                            <div className="text-center py-8">
                              <MessageSquare className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Ask any question about this proposal
                              </p>
                              <div className="space-y-2">
                                {suggestedQuestions.slice(0, 3).map((q, i) => (
                                  <Button
                                    key={i}
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-left justify-start text-xs"
                                    onClick={() => handleAskQuestion(q)}
                                  >
                                    {q}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {chatMessages.map((msg, i) => (
                                <div key={i} className="space-y-2">
                                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{msg.question}</p>
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{msg.answer}</p>
                                    <Badge variant="secondary" className="text-xs">{msg.source}</Badge>
                                  </div>
                                </div>
                              ))}
                              {isTyping && (
                                <div className="flex items-center gap-2 text-gray-500">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  <span className="text-sm">Analyzing...</span>
                                </div>
                              )}
                            </div>
                          )}
                        </ScrollArea>
                        
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type your question..."
                            value={currentQuestion}
                            onChange={(e) => setCurrentQuestion(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion(currentQuestion)}
                            className="text-sm"
                          />
                          <Button 
                            size="sm" 
                            onClick={() => handleAskQuestion(currentQuestion)}
                            disabled={!currentQuestion.trim() || isTyping}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>

                        <Separator className="my-4" />
                        
                        <div>
                          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Suggested Questions</p>
                          <div className="space-y-1">
                            {suggestedQuestions.slice(3).map((q, i) => (
                              <Button
                                key={i}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-left text-xs h-auto py-2"
                                onClick={() => handleAskQuestion(q)}
                              >
                                {q}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Summary Section */}
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Budget Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={budgetBreakdown}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={(entry) => `${entry.percentage}%`}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {budgetBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="space-y-2 mt-4">
                            {budgetBreakdown.map((item, i) => (
                              <div key={i} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                  <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                                </div>
                                <span className="font-medium">{formatCurrency(item.value)}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Risk Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {risks.map((risk, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                                <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                                  risk.severity === 'High' ? 'text-red-500' :
                                  risk.severity === 'Medium' ? 'text-amber-500' :
                                  'text-green-500'
                                }`} />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{risk.category}</p>
                                    <Badge 
                                      variant={risk.severity === 'High' ? 'destructive' : 'secondary'}
                                      className="text-xs"
                                    >
                                      {risk.severity}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{risk.description}</p>
                                  <p className="text-xs text-blue-600 dark:text-blue-400">Mitigation: {risk.mitigation}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Deep Analysis Tab */}
            <TabsContent value="deep" className="m-0">
              <div className="bg-white dark:bg-gray-900 rounded-b-xl border border-gray-200 dark:border-gray-800 border-t-0 p-6">
                <div className="space-y-6">
                  {/* Financial Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        <TranslatedText text="Financial Analysis" />
                      </CardTitle>
                      <CardDescription className="text-sm">
                        <TranslatedText text="Comprehensive budget and cost breakdown" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                            <TranslatedText text="Cost Breakdown by Category" />
                          </h4>
                          <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={budgetBreakdown}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={(entry) => `${entry.percentage}%`}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {budgetBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                            <TranslatedText text="Detailed Breakdown" />
                          </h4>
                          <div className="space-y-3">
                            {budgetBreakdown.map((item, i) => (
                              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                  <span className="text-sm text-gray-700 dark:text-gray-300">
                                    <TranslatedText text={item.name} />
                                  </span>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-semibold">{formatCurrency(item.value)}</p>
                                  <p className="text-xs text-gray-500">{item.percentage}%</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Compliance Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        <TranslatedText text="Compliance & Regulatory Status" />
                      </CardTitle>
                      <CardDescription className="text-sm">
                        <TranslatedText text="Current status of all regulatory clearances and approvals" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {complianceAnalysis.map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                <TranslatedText text={item.requirement} />
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                <TranslatedText text="Timeline" />: <TranslatedText text={item.timeline} />
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge 
                                variant={item.priority === 'Critical' ? 'destructive' : item.priority === 'High' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                <TranslatedText text={item.priority} />
                              </Badge>
                              <Badge 
                                variant={item.status === 'Completed' || item.status === 'Approved' ? 'default' : 
                                        item.status === 'Pending' || item.status === 'Not Started' ? 'destructive' : 'secondary'}
                                className="text-xs"
                              >
                                <TranslatedText text={item.status} />
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Analysis with Heatmap */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        <TranslatedText text="Risk Analysis Heatmap" />
                      </CardTitle>
                      <CardDescription className="text-sm">
                        <TranslatedText text="Risk assessment based on likelihood and impact" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-red-500"></div>
                          <span><TranslatedText text="Critical (4-5)" /></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-amber-500"></div>
                          <span><TranslatedText text="High (3)" /></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-green-500"></div>
                          <span><TranslatedText text="Low (1-2)" /></span>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {riskHeatmapData.map((risk, i) => {
                          const riskScore = risk.likelihood * risk.impact;
                          const bgColor = riskScore >= 16 ? 'bg-red-500' : riskScore >= 9 ? 'bg-amber-500' : 'bg-green-500';
                          return (
                            <div 
                              key={i} 
                              className={`${bgColor} rounded-lg p-3 text-white cursor-pointer hover:opacity-80 transition-opacity`}
                              title={`${risk.risk}: L${risk.likelihood} x I${risk.impact} = ${riskScore}`}
                            >
                              <p className="text-xs font-semibold mb-1">
                                <TranslatedText text={risk.risk} />
                              </p>
                              <p className="text-[10px] opacity-90">
                                <TranslatedText text={risk.category} />
                              </p>
                              <div className="flex items-center justify-between mt-2 text-[10px]">
                                <span>L:{risk.likelihood}</span>
                                <span>I:{risk.impact}</span>
                                <span className="font-bold">{riskScore}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Project Timeline - Gantt Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        <TranslatedText text="Project Timeline - Gantt Chart" />
                      </CardTitle>
                      <CardDescription className="text-sm">
                        <TranslatedText text="24-month implementation schedule with phase overlaps" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {ganttData.map((phase, i) => (
                          <div key={i}>
                            <div className="flex items-center gap-3 mb-1">
                              <div className="w-40 flex-shrink-0">
                                <p className="text-xs font-semibold text-gray-900 dark:text-white">
                                  <TranslatedText text={phase.phase} />
                                </p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                  <TranslatedText text="Month" /> {phase.start + 1}-{phase.start + phase.duration}
                                </p>
                              </div>
                              <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg relative overflow-hidden">
                                <div 
                                  className="h-full rounded-lg flex items-center px-2 text-white text-xs font-medium"
                                  style={{
                                    backgroundColor: phase.color,
                                    width: `${(phase.duration / 24) * 100}%`,
                                    marginLeft: `${(phase.start / 24) * 100}%`
                                  }}
                                >
                                  {phase.duration}m
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-between text-[10px] text-gray-500 dark:text-gray-400">
                        <span><TranslatedText text="Month" /> 0</span>
                        <span><TranslatedText text="Month" /> 6</span>
                        <span><TranslatedText text="Month" /> 12</span>
                        <span><TranslatedText text="Month" /> 18</span>
                        <span><TranslatedText text="Month" /> 24</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Market & Feasibility Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        <TranslatedText text="Market & Feasibility Analysis" />
                      </CardTitle>
                      <CardDescription className="text-sm">
                        <TranslatedText text="Market potential and competitive landscape assessment" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                            <TranslatedText text="Market Metrics" />
                          </h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                <TranslatedText text="Current Tourist Footfall" />
                              </p>
                              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{marketAnalysis.currentTourists}</p>
                            </div>
                            <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                <TranslatedText text="Projected Growth" />
                              </p>
                              <p className="text-lg font-bold text-green-600 dark:text-green-400">{marketAnalysis.projectedTourists}</p>
                            </div>
                            <div className="p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                <TranslatedText text="Average Spending" />
                              </p>
                              <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{marketAnalysis.avgSpending}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                            <TranslatedText text="Unique Selling Points" />
                          </h4>
                          <ul className="space-y-2">
                            {marketAnalysis.uniqueSellingPoints.map((usp, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <Award className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <TranslatedText text={usp} />
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              <TranslatedText text="Market Growth Rate" />
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              <TranslatedText text={marketAnalysis.marketGrowth} />
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Payment Schedule */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        <TranslatedText text="Payment Schedule Breakdown" />
                      </CardTitle>
                      <CardDescription className="text-sm">
                        <TranslatedText text="Milestone-based payment structure with TDS" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {paymentSchedule.map((payment, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                              <span className="text-2xl font-bold text-white">{payment.percentage}%</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                <TranslatedText text={payment.milestone} />
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                <TranslatedText text="Amount" />: {formatCurrency(payment.amount)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatCurrency(payment.amount)}</p>
                              <p className="text-xs text-gray-500">
                                <TranslatedText text="Less 2% TDS" />
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                              <TranslatedText text="Critical Red Flag" />
                            </p>
                            <p className="text-xs text-amber-800 dark:text-amber-200 mt-1">
                              <TranslatedText text="40% upfront payment (₹5 Cr) poses high financial risk. Recommend reducing to 20% with performance bank guarantee." />
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Deliverables */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        <TranslatedText text="Project Deliverables" />
                      </CardTitle>
                      <CardDescription className="text-sm">
                        <TranslatedText text="7 major deliverables across tourism infrastructure" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3">
                        {deliverables.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{i + 1}</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                              <TranslatedText text={item} />
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* SWOT Analysis */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <TranslatedText text="Strengths" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {swotAnalysis.strengths.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">
                                <TranslatedText text={item} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <TranslatedText text="Weaknesses" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {swotAnalysis.weaknesses.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">
                                <TranslatedText text={item} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <TranslatedText text="Opportunities" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {swotAnalysis.opportunities.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">
                                <TranslatedText text={item} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <TranslatedText text="Threats" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {swotAnalysis.threats.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">
                                <TranslatedText text={item} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Critical Red Flags */}
                  <Card className="border-red-200 dark:border-red-900">
                    <CardHeader>
                      <CardTitle className="text-base text-red-600 dark:text-red-400 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        <TranslatedText text="Critical Red Flags (10 Issues Identified)" />
                      </CardTitle>
                      <CardDescription className="text-sm">
                        <TranslatedText text="Issues requiring immediate attention before approval" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {redFlags.map((flag, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 dark:bg-red-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-white">{i + 1}</span>
                            </div>
                            <p className="text-sm text-red-900 dark:text-red-100 flex-1">
                              <TranslatedText text={flag} />
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Project Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        <TranslatedText text="Project Timeline" />
                      </CardTitle>
                      <CardDescription className="text-sm">
                        <TranslatedText text="24-month implementation schedule (Apr 2026 - Mar 2028)" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-24 flex-shrink-0">
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                              <TranslatedText text="Month 1-4" />
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              <TranslatedText text="4 months" />
                            </p>
                          </div>
                          <div className="flex-1 h-2 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
                            <div className="h-full w-[16.67%] bg-blue-600 dark:bg-blue-400"></div>
                          </div>
                          <div className="w-48 text-sm text-gray-700 dark:text-gray-300">
                            <TranslatedText text="DPR finalization & clearances" />
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-24 flex-shrink-0">
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                              <TranslatedText text="Month 5-12" />
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              <TranslatedText text="8 months" />
                            </p>
                          </div>
                          <div className="flex-1 h-2 bg-green-200 dark:bg-green-900 rounded-full overflow-hidden">
                            <div className="h-full w-[33.33%] bg-green-600 dark:bg-green-400"></div>
                          </div>
                          <div className="w-48 text-sm text-gray-700 dark:text-gray-300">
                            <TranslatedText text="Civil construction Phase-I" />
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-24 flex-shrink-0">
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                              <TranslatedText text="Month 13-18" />
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              <TranslatedText text="6 months" />
                            </p>
                          </div>
                          <div className="flex-1 h-2 bg-amber-200 dark:bg-amber-900 rounded-full overflow-hidden">
                            <div className="h-full w-[25%] bg-amber-600 dark:bg-amber-400"></div>
                          </div>
                          <div className="w-48 text-sm text-gray-700 dark:text-gray-300">
                            <TranslatedText text="Furnishing & training" />
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-24 flex-shrink-0">
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                              <TranslatedText text="Month 19-24" />
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              <TranslatedText text="6 months" />
                            </p>
                          </div>
                          <div className="flex-1 h-2 bg-purple-200 dark:bg-purple-900 rounded-full overflow-hidden">
                            <div className="h-full w-[25%] bg-purple-600 dark:bg-purple-400"></div>
                          </div>
                          <div className="w-48 text-sm text-gray-700 dark:text-gray-300">
                            <TranslatedText text="Launch & operations" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Compliance & GST */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          <TranslatedText text="Tax & Compliance" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              <TranslatedText text="GSTIN" />
                            </p>
                            <p className="text-sm font-mono font-semibold text-gray-900 dark:text-white">{proposalData.gstin}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              <TranslatedText text="GST Rate" />
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{proposalData.gstRate}</p>
                          </div>
                          <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                <TranslatedText text="Base Amount" />
                              </span>
                              <span className="text-sm font-semibold">{formatCurrency(proposalData.totalOutlay)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                <TranslatedText text="GST @ 18%" />
                              </span>
                              <span className="text-sm font-semibold">{formatCurrency(proposalData.totalGST)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-300 dark:border-gray-700">
                              <span className="text-sm font-bold text-gray-900 dark:text-white">
                                <TranslatedText text="Grand Total" />
                              </span>
                              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatCurrency(proposalData.grandTotal)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          <TranslatedText text="Project Details" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              <TranslatedText text="Location" />
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{proposalData.location}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              <TranslatedText text="Implementing Agency" />
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{proposalData.proposer}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              <TranslatedText text="Beneficiaries" />
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {proposalData.directBeneficiaries.toLocaleString()} <TranslatedText text="direct" /> + {proposalData.indirectBeneficiaries.toLocaleString()} <TranslatedText text="indirect" />
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              <TranslatedText text="Client Ministry" />
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{proposalData.ministry}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
