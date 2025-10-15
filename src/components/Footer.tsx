import { motion } from "framer-motion";
import { Github, Mail, FileText, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-foreground text-background py-12 overflow-hidden">
      {/* Animated Background Waves */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--gold))" />
              <stop offset="100%" stopColor="hsl(var(--emerald))" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z"
            fill="url(#waveGradient)"
            initial={{ d: "M0,50 Q25,30 50,50 T100,50 V100 H0 Z" }}
            animate={{ d: "M0,50 Q25,70 50,50 T100,50 V100 H0 Z" }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">AI</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">DPR Evaluation</h3>
                <p className="text-sm opacity-70">MDoNER, India</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Empowering North-East India's growth with Artificial Intelligence and data-driven decision making.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "#" },
                { label: "Dashboard", href: "#" },
                { label: "Documentation", href: "#" },
                { label: "Support", href: "#" },
              ].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <div className="space-y-3">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                <Github className="w-4 h-4" />
                GitHub Repository
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                <FileText className="w-4 h-4" />
                Terms of Service
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                <Shield className="w-4 h-4" />
                Privacy Policy
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-70">
            © 2025 Ministry of Development of North Eastern Region. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center opacity-50">
              <span className="text-xs font-bold text-primary-foreground">MDoNER</span>
            </div>
            <span className="text-xs opacity-50">Government of India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
