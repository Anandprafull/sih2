import { useState } from "react";
import { motion, PanInfo } from "framer-motion";

interface SwipeableTabsProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
  children: React.ReactNode[];
}

const SwipeableTabs = ({ tabs, activeTab, onTabChange, children }: SwipeableTabsProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50;

    if (info.offset.x > threshold && activeTab > 0) {
      // Swiped right - go to previous tab
      onTabChange(activeTab - 1);
    } else if (info.offset.x < -threshold && activeTab < tabs.length - 1) {
      // Swiped left - go to next tab
      onTabChange(activeTab + 1);
    }

    setIsDragging(false);
  };

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabChange(index)}
            className={`relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === index
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            {tab}

            {/* Active indicator */}
            {activeTab === index && (
              <motion.div
                layoutId="swipeableTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content - Swipeable */}
      <div className="relative overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${activeTab * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex touch-pan-y"
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {children.map((child, index) => (
            <motion.div
              key={index}
              className="w-full flex-shrink-0 px-4 py-6"
              style={{ pointerEvents: activeTab === index ? "auto" : "none" }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Swipe Hint */}
      {activeTab < tabs.length - 1 && (
        <div className="md:hidden flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-600 py-2">
          <svg
            className="w-4 h-4 animate-bounce-horizontal"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>Swipe to see more</span>
        </div>
      )}
    </div>
  );
};

export default SwipeableTabs;
