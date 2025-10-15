import { motion } from "framer-motion";
import { FileText, Download, Eye, Building2, Heart, GraduationCap, Palmtree, Sprout, Zap, Home, Hospital, TreePine, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface SampleProject {
  id: number;
  title: string;
  category: string;
  state: string;
  budget: string;
  duration: string;
  description: string;
  icon: any;
  successRate: number;
  highlights: string[];
  riskLevel: "Low" | "Medium" | "High";
}

const SampleProjects = () => {
  const sampleProjects: SampleProject[] = [
    {
      id: 1,
      title: "Digital Infrastructure Hub",
      category: "Infrastructure",
      state: "Assam",
      budget: "₹75 Cr",
      duration: "24 months",
      description: "State-of-the-art digital infrastructure center with high-speed internet connectivity, data center, and IT training facilities.",
      icon: Building2,
      successRate: 88,
      highlights: ["5G connectivity", "Green building certified", "1000+ training capacity"],
      riskLevel: "Low",
    },
    {
      id: 2,
      title: "Rural Healthcare Network",
      category: "Healthcare",
      state: "Manipur",
      budget: "₹45 Cr",
      duration: "18 months",
      description: "Comprehensive healthcare network connecting 50+ rural health centers with telemedicine facilities and mobile health units.",
      icon: Heart,
      successRate: 92,
      highlights: ["Telemedicine enabled", "24/7 ambulance service", "50+ villages covered"],
      riskLevel: "Low",
    },
    {
      id: 3,
      title: "Smart School Initiative",
      category: "Education",
      state: "Sikkim",
      budget: "₹32 Cr",
      duration: "15 months",
      description: "Digital classrooms, e-learning platforms, and STEM labs across 30 government schools in remote hill areas.",
      icon: GraduationCap,
      successRate: 95,
      highlights: ["30 schools upgraded", "Digital library access", "STEM labs in every school"],
      riskLevel: "Low",
    },
    {
      id: 4,
      title: "Eco-Tourism Development",
      category: "Tourism",
      state: "Mizoram",
      budget: "₹28 Cr",
      duration: "12 months",
      description: "Sustainable tourism infrastructure including eco-lodges, trekking trails, and cultural heritage centers.",
      icon: Palmtree,
      successRate: 85,
      highlights: ["10 eco-lodges", "150km trekking trails", "3 heritage centers"],
      riskLevel: "Medium",
    },
    {
      id: 5,
      title: "Organic Farming Project",
      category: "Agriculture",
      state: "Meghalaya",
      budget: "₹40 Cr",
      duration: "20 months",
      description: "Large-scale organic farming initiative with modern irrigation, cold storage, and direct market linkage for farmers.",
      icon: Sprout,
      successRate: 82,
      highlights: ["5000 farmers benefited", "Organic certification", "Direct market access"],
      riskLevel: "Medium",
    },
    {
      id: 6,
      title: "Renewable Energy Grid",
      category: "Energy",
      state: "Tripura",
      budget: "₹65 Cr",
      duration: "22 months",
      description: "Solar and hydro-electric hybrid grid to power 200 villages with clean, sustainable energy.",
      icon: Zap,
      successRate: 87,
      highlights: ["50MW capacity", "200 villages powered", "30% cost reduction"],
      riskLevel: "Medium",
    },
    {
      id: 7,
      title: "Affordable Housing Scheme",
      category: "Housing",
      state: "Nagaland",
      budget: "₹55 Cr",
      duration: "24 months",
      description: "Construction of 1000 affordable homes with modern amenities for economically weaker sections.",
      icon: Home,
      successRate: 79,
      highlights: ["1000 units", "Earthquake resistant", "Community facilities included"],
      riskLevel: "High",
    },
    {
      id: 8,
      title: "Multi-Specialty Hospital",
      category: "Healthcare",
      state: "Arunachal Pradesh",
      budget: "₹85 Cr",
      duration: "30 months",
      description: "300-bed multi-specialty hospital with advanced diagnostic equipment and specialized treatment facilities.",
      icon: Hospital,
      successRate: 84,
      highlights: ["300 beds", "10 specialties", "Air ambulance facility"],
      riskLevel: "Medium",
    },
    {
      id: 9,
      title: "Forest Conservation Initiative",
      category: "Environment",
      state: "Sikkim",
      budget: "₹38 Cr",
      duration: "36 months",
      description: "Comprehensive forest conservation program with afforestation, wildlife protection, and eco-restoration.",
      icon: TreePine,
      successRate: 91,
      highlights: ["50,000 hectares", "10 endangered species", "Carbon credit eligible"],
      riskLevel: "Low",
    },
    {
      id: 10,
      title: "Cultural Heritage Complex",
      category: "Culture",
      state: "Manipur",
      budget: "₹42 Cr",
      duration: "18 months",
      description: "State-of-the-art cultural complex with museum, amphitheater, art gallery, and traditional craft workshops.",
      icon: Landmark,
      successRate: 86,
      highlights: ["Museum + gallery", "500-seat amphitheater", "Craft training center"],
      riskLevel: "Low",
    },
  ];

  const loadDemoProject = (project: SampleProject) => {
    // Simulate loading demo project data
    toast.success(`Loading "${project.title}" demo project...`);
    
    // Store demo data in localStorage
    const demoData = {
      name: project.title,
      category: project.category,
      state: project.state,
      budget: project.budget,
      duration: project.duration,
      description: project.description,
      successRate: project.successRate,
      riskLevel: project.riskLevel,
      isDemo: true,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem("currentProject", JSON.stringify(demoData));
    
    // Navigate to analysis page
    setTimeout(() => {
      window.location.href = "/analysis";
    }, 1000);
  };

  const downloadDemoData = (project: SampleProject) => {
    const demoData = {
      projectDetails: {
        title: project.title,
        category: project.category,
        state: project.state,
        budget: project.budget,
        duration: project.duration,
        description: project.description,
      },
      metrics: {
        successRate: project.successRate,
        riskLevel: project.riskLevel,
      },
      highlights: project.highlights,
      bestPractices: [
        "Comprehensive stakeholder consultation",
        "Detailed feasibility study conducted",
        "Risk mitigation strategies in place",
        "Regular monitoring and evaluation framework",
        "Community participation ensured",
      ],
    };

    const blob = new Blob([JSON.stringify(demoData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.title.replace(/\s+/g, "-").toLowerCase()}-demo.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("Demo data downloaded");
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sample DPR Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore best-practice DPR examples from successful projects across Northeast India. Load any demo to see detailed analysis.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                    <project.icon className="w-8 h-8" />
                  </div>
                  <Badge className={getRiskColor(project.riskLevel)}>
                    {project.riskLevel} Risk
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <span>{project.state}</span>
                  <span>•</span>
                  <span>{project.category}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Budget & Duration */}
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Budget</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{project.budget}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600 dark:text-gray-400">Duration</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{project.duration}</div>
                  </div>
                </div>

                {/* Success Rate */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Success Probability</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{project.successRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.successRate}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {highlight}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => loadDemoProject(project)}
                    className="flex-1"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Load Demo
                  </Button>
                  <Button
                    onClick={() => downloadDemoData(project)}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Best Practices Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-4">
            DPR Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-800 dark:text-blue-400">Planning Phase</h3>
              <ul className="text-sm text-blue-700 dark:text-blue-500 space-y-1">
                <li>• Comprehensive needs assessment</li>
                <li>• Detailed feasibility study</li>
                <li>• Stakeholder consultation workshops</li>
                <li>• Environmental impact assessment</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-800 dark:text-blue-400">Execution Phase</h3>
              <ul className="text-sm text-blue-700 dark:text-blue-500 space-y-1">
                <li>• Clear milestone definitions</li>
                <li>• Regular progress monitoring</li>
                <li>• Risk mitigation strategies</li>
                <li>• Quality assurance protocols</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SampleProjects;
