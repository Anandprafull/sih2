import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ConfettiEffect from "@/components/ConfettiEffect";
import AnimatedCounter from "@/components/AnimatedCounter";
import TranslatedText from "@/components/TranslatedText";

const Hero = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        // Set session storage to indicate document uploaded
        sessionStorage.setItem("hasUploadedDoc", "true");
        // Trigger confetti
        setShowConfetti(true);
        toast({
          title: "PDF Uploaded Successfully",
          description: `${file.name} is being analyzed...`,
        });
        // Simulate processing time
        setTimeout(() => {
          navigate("/analysis");
        }, 1500);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <ConfettiEffect trigger={showConfetti} />
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-foreground rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6 px-6 py-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full"
          >
            <TranslatedText 
              text="Ministry of Development of North Eastern Region"
              className="text-primary-foreground text-sm font-medium"
              as="span"
            />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            <TranslatedText 
              text="Revolutionizing DPR Evaluation"
              as="span"
            />
            <br />
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              <TranslatedText text="with Artificial Intelligence" as="span" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto"
          >
            <TranslatedText 
              text="Automating DPR reviews for faster, smarter regional development using advanced NLP and machine learning."
            />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-glow group"
              onClick={handleUploadClick}
            >
              <Upload className="mr-2 h-5 w-5" />
              <TranslatedText text="Upload a DPR" as="span" />
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate("/analysis")}
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              <TranslatedText text="Explore Dashboard" as="span" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: 60, label: "Faster Evaluation" },
            { value: 30, label: "Cost Reduction" },
            { value: 99, label: "Accuracy Rate" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 rounded-2xl p-6"
            >
              <div className="text-4xl font-bold text-gold mb-2">
                <AnimatedCounter end={stat.value} suffix="%" duration={2000} />
              </div>
              <div className="text-primary-foreground/80">
                <TranslatedText text={stat.label} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-primary-foreground rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
