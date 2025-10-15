import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Upload, FileSearch, BarChart3, Lightbulb, CheckCircle } from 'lucide-react';

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      icon: Upload,
      title: 'Upload DPR',
      description: 'Submit your Detailed Project Report through our secure portal',
      details: 'Supports PDF, Word, and scanned documents. Multi-language support included.',
    },
    {
      icon: FileSearch,
      title: 'AI Parsing & Analysis',
      description: 'NLP engine extracts and analyzes critical project parameters',
      details: 'Automated extraction of budget, timeline, scope, stakeholders, and compliance data.',
    },
    {
      icon: BarChart3,
      title: 'Risk Assessment',
      description: 'Predictive models evaluate risks and forecast outcomes',
      details: 'Financial viability, timeline feasibility, compliance gaps, and risk scoring.',
    },
    {
      icon: Lightbulb,
      title: 'Insights Generation',
      description: 'AI generates actionable recommendations for decision makers',
      details: 'Prioritization scores, improvement suggestions, and approval recommendations.',
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            The Process
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-6 font-display">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From document upload to actionable insights in minutes, not weeks
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-emerald to-gold hidden md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-col`}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                <motion.div
                  onHoverStart={() => setActiveStep(index)}
                  onHoverEnd={() => setActiveStep(null)}
                  className="inline-block cursor-pointer"
                >
                  <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                    <h3 className="text-2xl font-bold text-foreground mb-3 font-display">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: activeStep === index ? 'auto' : 0,
                        opacity: activeStep === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-primary">{step.details}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                  className="mt-4 text-sm text-muted-foreground font-medium"
                >
                  Step {index + 1} of {steps.length}
                </motion.div>
              </div>

              <motion.div
                animate={{
                  scale: activeStep === index ? 1.2 : 1,
                  rotate: activeStep === index ? 360 : 0,
                }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center shadow-glow">
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </div>

                {activeStep === index && (
                  <>
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 bg-primary/30 rounded-full"
                    />
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                      className="absolute inset-0 bg-emerald/20 rounded-full"
                    />
                  </>
                )}
              </motion.div>

              <div className="flex-1" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 p-8 bg-gradient-card backdrop-blur-sm border border-primary/20 rounded-2xl shadow-elegant">
            <div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <CheckCircle className="w-12 h-12 text-emerald" />
              </motion.div>
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-foreground mb-1 font-display">
                Results in Minutes
              </p>
              <p className="text-muted-foreground">
                What used to take weeks now happens in real-time
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


export default HowItWorks;
