import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, DollarSign, Award, Users } from "lucide-react";

const Impact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    {
      icon: TrendingUp,
      value: "60%",
      label: "Faster DPR Evaluation",
      description: "Reducing review time from weeks to hours",
      color: "text-primary",
      bgGradient: "from-primary/20 to-primary/5",
    },
    {
      icon: DollarSign,
      value: "30%",
      label: "Reduction in Cost Overruns",
      description: "Better budget forecasting and risk management",
      color: "text-gold",
      bgGradient: "from-gold/20 to-gold/5",
    },
    {
      icon: Award,
      value: "99%",
      label: "Compliance Accuracy",
      description: "Ensuring all regulations are met consistently",
      color: "text-emerald",
      bgGradient: "from-emerald/20 to-emerald/5",
    },
    {
      icon: Users,
      value: "100%",
      label: "Transparent Prioritization",
      description: "Data-driven decision making for all stakeholders",
      color: "text-primary-glow",
      bgGradient: "from-primary-glow/20 to-primary-glow/5",
    },
  ];

  return (
    <section id="impact" ref={ref} className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-foreground/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Empowering <span className="bg-gradient-gold bg-clip-text text-transparent">North-East India</span>
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Measurable impact driving regional growth and development through AI-powered innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-primary-foreground/10 backdrop-blur-md rounded-2xl" />
                  <div className="relative bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-8 h-full transition-all group-hover:bg-primary-foreground/10 group-hover:shadow-glow">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${metric.bgGradient} flex items-center justify-center mb-6 group-hover:shadow-lg`}
                    >
                      <Icon className={`w-8 h-8 ${metric.color}`} />
                    </motion.div>

                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className="text-5xl font-bold text-primary-foreground mb-3"
                    >
                      {metric.value}
                    </motion.div>

                    <h3 className="text-xl font-bold text-primary-foreground mb-3">
                      {metric.label}
                    </h3>

                    <p className="text-primary-foreground/80 text-sm">
                      {metric.description}
                    </p>

                    <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-gold to-primary-foreground transition-all duration-500 rounded-full" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center max-w-4xl mx-auto"
        >
          <div className="bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 rounded-2xl p-8">
            <p className="text-2xl md:text-3xl font-semibold text-primary-foreground leading-relaxed">
              "Transforming how India's North-Eastern region evaluates and implements development projects through the power of{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
              ."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
