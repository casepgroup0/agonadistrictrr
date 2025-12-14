import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

const missionItems = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Our Mission",
    description:
      "To evangelize, equip, and empower the next generation of Christlike men and lifelong servant leaders through adventure, mentoring, and spiritual growth.",
    color: "primary",
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Our Vision",
    description:
      "To see every boy and young man in the Agona District reached, equipped, and empowered to become a Christlike servant leader in their community.",
    color: "accent",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Our Values",
    description:
      "We are committed to integrity, excellence, leadership, teamwork, and adventure. We believe in the potential of every young person to make a difference.",
    color: "secondary",
  },
];

export function MissionSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-6">
            Building <span className="text-primary">Champions</span> for Life
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Royal Rangers is a global ministry that provides Christ-centered character 
            formation and leadership development for boys and young men through fun, 
            engaging activities and mentoring relationships.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {missionItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                    item.color === "primary"
                      ? "bg-primary/10 text-primary"
                      : item.color === "accent"
                      ? "bg-accent/10 text-accent"
                      : "bg-secondary/30 text-secondary-foreground"
                  }`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
