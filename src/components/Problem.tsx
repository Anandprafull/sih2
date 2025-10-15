import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertCircle, Clock, FileQuestion, TrendingDown } from "lucide-react";

const Problem = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    {
      icon: Clock,
      title: "Slow Manual Reviews",
      description: "Traditional DPR evaluation takes weeks or months, delaying crucial development projects.",
    },
    {
      icon: FileQuestion,
      title: "Inconsistent Quality",
      description: "Quality of reviews varies drastically depending on evaluator expertise and workload.",
    },
    {
      icon: AlertCircle,
      title: "Human Error Prone",
      description: "Manual processes are susceptible to oversight, bias, and calculation mistakes.",
    },
    {
      icon: TrendingDown,
      title: "Delayed Decisions",
      description: "Decision-making bottlenecks slow down regional development initiatives.",
    },
  ];

  return (
    <section id="about" ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why the Change is <span className="text-primary">Needed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The traditional DPR evaluation process faces critical challenges that hinder efficient regional development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-card rounded-2xl" />
                <div className="relative bg-card border border-border rounded-2xl p-8 h-full transition-all group-hover:shadow-elegant">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:animate-glow-pulse">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Problem;
