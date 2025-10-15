import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
  avatar: string;
  region: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Ramesh Kumar",
    role: "Project Director",
    organization: "Assam Rural Development Department",
    content: "DPR Analyzer reduced our evaluation time from 3 weeks to just 5 minutes. The AI insights are remarkably accurate and have helped us identify critical issues early.",
    rating: 5,
    avatar: "👨‍💼",
    region: "Assam",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Senior Planning Officer",
    organization: "Manipur Planning Commission",
    content: "The multilingual support is a game-changer. Our team can now review proposals in their native languages, significantly improving comprehension and decision-making.",
    rating: 5,
    avatar: "👩‍💼",
    region: "Manipur",
  },
  {
    id: 3,
    name: "Tshering Dorji",
    role: "Infrastructure Consultant",
    organization: "Sikkim Development Authority",
    content: "Risk analysis and budget optimization features have saved us lakhs in potential overruns. The PWA works perfectly even in remote areas with limited connectivity.",
    rating: 5,
    avatar: "👨‍🏫",
    region: "Sikkim",
  },
  {
    id: 4,
    name: "Lalthanzara",
    role: "Chief Engineer",
    organization: "Mizoram PWD",
    content: "Impressive accuracy in identifying compliance issues. The comparison feature helps us benchmark projects and adopt best practices across departments.",
    rating: 5,
    avatar: "👷‍♂️",
    region: "Mizoram",
  },
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Government Officials
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            across North-East India
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            onClick={goToPrevious}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-white dark:bg-gray-800 shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            onClick={goToNext}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-white dark:bg-gray-800 shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
              >
                {/* Quote Icon */}
                <Quote className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-6" />

                {/* Testimonial Content */}
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </p>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonials[currentIndex].avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {testimonials[currentIndex].organization}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      📍 {testimonials[currentIndex].region}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-blue-600 dark:bg-blue-400"
                    : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Below Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { value: "500+", label: "Projects Analyzed" },
            { value: "99.5%", label: "Accuracy Rate" },
            { value: "8", label: "NE States Covered" },
            { value: "2mins", label: "Avg. Analysis Time" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
