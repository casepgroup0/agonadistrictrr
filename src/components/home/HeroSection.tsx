import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users, Award, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Royal Rangers Agona District" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
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
