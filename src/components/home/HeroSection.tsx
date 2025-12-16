import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, Award, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

import heroSlide1 from "@/assets/hero-slide-1.jpeg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpeg";
import heroSlide4 from "@/assets/hero-slide-4.jpeg";
import heroSlide5 from "@/assets/hero-slide-5.jpeg";
import heroSlide6 from "@/assets/hero-slide-6.jpg";

const heroImages = [heroSlide1, heroSlide2, heroSlide3, heroSlide4, heroSlide5, heroSlide6];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={heroImages[currentSlide]}
            alt={`Royal Rangers Agona District - Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-secondary w-6" : "bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Building Champions for Life
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-primary-foreground leading-tight mb-6">
              Royal Rangers
              <span className="block text-secondary">Agona District</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Empowering young men and boys to become Christlike servant leaders through 
              adventure, mentoring, and spiritual growth in Ghana's Central Region.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="gold" size="lg" asChild>
                <Link to="/register">
                  Join Royal Rangers
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline-light" size="lg" asChild>
                <Link to="/events">Upcoming Events</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={<Users className="w-8 h-8" />}
                number="500+"
                label="Active Rangers"
                delay={0.4}
              />
              <StatCard
                icon={<Award className="w-8 h-8" />}
                number="15+"
                label="Outposts"
                delay={0.5}
              />
              <StatCard
                icon={<Calendar className="w-8 h-8" />}
                number="25+"
                label="Years Active"
                delay={0.6}
              />
              <StatCard
                icon={<Award className="w-8 h-8" />}
                number="100+"
                label="Gold Medals"
                delay={0.7}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  number,
  label,
  delay,
}: {
  icon: React.ReactNode;
  number: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-card/10 backdrop-blur-md border border-card/20 rounded-2xl p-6 text-center hover:bg-card/15 transition-all"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/20 text-secondary mb-3">
        {icon}
      </div>
      <p className="text-3xl font-display font-black text-card">{number}</p>
      <p className="text-sm text-card/70">{label}</p>
    </motion.div>
  );
}
