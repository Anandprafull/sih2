import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Home, FileText, BarChart3, GitCompare } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Home",
      path: "/",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Analysis",
      path: "/analysis",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Projects",
      path: "/projects",
    },
    {
      icon: <GitCompare className="w-5 h-5" />,
      label: "Compare",
      path: "/compare",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe">
      <nav className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 relative ${
                active ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* Icon */}
              <div className="relative">
                {item.icon}
                {active && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                  />
                )}
              </div>

              {/* Label */}
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBottomNav;
