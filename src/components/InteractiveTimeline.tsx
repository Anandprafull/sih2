import { motion } from "framer-motion";
import { CheckCircle2, Circle, AlertCircle, Clock } from "lucide-react";
import { useState } from "react";

interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  status: "completed" | "in-progress" | "upcoming" | "delayed";
  milestone: boolean;
  details?: string;
}

const InteractiveTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const events: TimelineEvent[] = [
    {
      id: 1,
      title: "Project Initiation",
      description: "DPR proposal submitted and approved",
      date: "Jan 2024",
      status: "completed",
      milestone: true,
      details: "Budget: ₹50Cr approved. Stakeholder meetings completed. Environmental clearance obtained.",
    },
    {
      id: 2,
      title: "Land Acquisition",
      description: "Securing necessary land parcels",
      date: "Feb 2024",
      status: "completed",
      milestone: false,
      details: "15 hectares acquired. Compensation distributed to landowners. Documentation complete.",
    },
    {
      id: 3,
      title: "Design & Planning",
      description: "Architectural and engineering designs",
      date: "Mar 2024",
      status: "completed",
      milestone: true,
      details: "3D models approved. Engineering specifications finalized. Contractor bidding initiated.",
    },
    {
      id: 4,
      title: "Foundation Work",
      description: "Civil construction groundwork",
      date: "Apr 2024",
      status: "completed",
      milestone: false,
      details: "Foundation laid for 5 buildings. Soil testing passed. Underground utilities installed.",
    },
    {
      id: 5,
      title: "Structural Construction",
      description: "Building framework and walls",
      date: "May 2024",
      status: "in-progress",
      milestone: false,
      details: "60% complete. 3 buildings at roof level. On schedule for June completion.",
    },
    {
      id: 6,
      title: "Mid-Project Review",
      description: "Progress assessment and adjustments",
      date: "Jun 2024",
      status: "in-progress",
      milestone: true,
      details: "Scheduled for June 15. Budget review, timeline assessment, stakeholder feedback session.",
    },
    {
      id: 7,
      title: "Interior & Finishing",
      description: "Electrical, plumbing, and interiors",
      date: "Jul 2024",
      status: "upcoming",
      milestone: false,
      details: "Electrical wiring, plumbing installation, interior painting, flooring work.",
    },
    {
      id: 8,
      title: "Quality Inspection",
      description: "Safety and quality audits",
      date: "Aug 2024",
      status: "upcoming",
      milestone: true,
      details: "Third-party inspection, safety compliance check, quality certification process.",
    },
    {
      id: 9,
      title: "Landscaping & Amenities",
      description: "External works and facilities",
      date: "Sep 2024",
      status: "upcoming",
      milestone: false,
      details: "Garden development, parking lot construction, signage installation, external lighting.",
    },
    {
      id: 10,
      title: "Final Handover",
      description: "Project completion and inauguration",
      date: "Oct 2024",
      status: "upcoming",
      milestone: true,
      details: "Final inspection, inauguration ceremony, operational handover to authorities.",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case "in-progress":
        return <Clock className="w-6 h-6 text-blue-500 animate-pulse" />;
      case "delayed":
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900/30 border-green-500";
      case "in-progress":
        return "bg-blue-100 dark:bg-blue-900/30 border-blue-500";
      case "delayed":
        return "bg-red-100 dark:bg-red-900/30 border-red-500";
      default:
        return "bg-gray-100 dark:bg-gray-800 border-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Project Timeline
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Interactive timeline showing project milestones and progress
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700"></div>

        {/* Timeline Events */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-20"
            >
              {/* Status Icon */}
              <div className="absolute left-5 top-0 -translate-x-1/2 bg-white dark:bg-gray-900 p-1 rounded-full">
                {getStatusIcon(event.status)}
              </div>

              {/* Milestone Badge */}
              {event.milestone && (
                <div className="absolute left-14 top-0 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  MILESTONE
                </div>
              )}

              {/* Event Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedEvent(event)}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${getStatusColor(event.status)} ${
                  selectedEvent?.id === event.id ? "shadow-xl ring-4 ring-blue-500/50" : "shadow-md"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {event.title}
                  </h3>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full">
                    {event.date}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {event.description}
                </p>

                {/* Expandable Details */}
                {selectedEvent?.id === event.id && event.details && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {event.details}
                    </p>
                  </motion.div>
                )}

                {/* Status Badge */}
                <div className="mt-3 flex gap-2">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      event.status === "completed"
                        ? "bg-green-500 text-white"
                        : event.status === "in-progress"
                        ? "bg-blue-500 text-white"
                        : event.status === "delayed"
                        ? "bg-red-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {event.status.replace("-", " ").toUpperCase()}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Progress Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">
              {events.filter((e) => e.status === "completed").length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">
              {events.filter((e) => e.status === "in-progress").length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-500">
              {events.filter((e) => e.status === "upcoming").length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-500">
              {events.filter((e) => e.milestone).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Milestones</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Overall Progress</span>
            <span>{Math.round((events.filter((e) => e.status === "completed").length / events.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(events.filter((e) => e.status === "completed").length / events.length) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full relative overflow-hidden"
            >
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveTimeline;
