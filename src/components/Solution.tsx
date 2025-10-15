import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Gauge, BarChart, Globe } from "lucide-react";

const Solution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Brain,
      title: "NLP-based Understanding",
      description: "Advanced natural language processing extracts insights from complex DPR documents automatically.",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Gauge,
      title: "Risk & Forecast Engine",
      description: "Predictive analytics identify potential risks and forecast project outcomes with high accuracy.",
      gradient: "from-gold to-gold/80",
    },
    {
      icon: BarChart,
      title: "Smart Compliance Dashboard",
      description: "Real-time visualization of compliance metrics, budget analysis, and project health indicators.",
      gradient: "from-emerald to-emerald/80",
    },
    {
      icon: Globe,
      title: "Multilingual & Offline",
      description: "Supports multiple languages and works offline, ensuring accessibility across North-East India.",
      gradient: "from-primary-glow to-emerald",
    },
  ];

  return (
    <section id="solution" ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="bg-gradient-hero bg-clip-text text-transparent">Intelligent Platform</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powered by cutting-edge AI and machine learning technologies to transform how DPRs are evaluated.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group perspective"
              >
                <div className={`relative bg-gradient-to-br ${feature.gradient} p-[1px] rounded-2xl overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative bg-card rounded-2xl p-8 h-full backdrop-blur-sm">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6"
                    >
                      <Icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-emerald transition-all duration-500 rounded-full" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solution;
