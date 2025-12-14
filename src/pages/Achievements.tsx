import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, Award, Target, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";

const achievements = [
  {
    year: "2023",
    items: [
      {
        title: "National Camporama 3rd Place",
        description: "Our district achieved 3rd place overall at the National Camporama competition.",
        icon: <Trophy className="w-6 h-6" />,
        type: "National",
      },
      {
        title: "100+ Gold Medal of Achievement",
        description: "Over 100 rangers earned the prestigious Gold Medal of Achievement.",
        icon: <Medal className="w-6 h-6" />,
        type: "Individual",
      },
      {
        title: "5 New Outposts Chartered",
        description: "Expanded our reach with 5 new outposts in underserved communities.",
        icon: <Star className="w-6 h-6" />,
        type: "Growth",
      },
    ],
  },
  {
    year: "2022",
    items: [
      {
        title: "Best District Award - Central Region",
        description: "Recognized as the best performing district in the Central Region.",
        icon: <Award className="w-6 h-6" />,
        type: "Regional",
      },
      {
        title: "Commander Excellence Program",
        description: "Trained 25 new commanders through our leadership development program.",
        icon: <Target className="w-6 h-6" />,
        type: "Training",
      },
      {
        title: "500+ Active Rangers",
        description: "Reached a milestone of over 500 active rangers across all age groups.",
        icon: <Users className="w-6 h-6" />,
        type: "Membership",
      },
    ],
  },
  {
    year: "2021",
    items: [
      {
        title: "Community Impact Award",
        description: "Recognized for outstanding community service during challenging times.",
        icon: <Award className="w-6 h-6" />,
        type: "Service",
      },
      {
        title: "Virtual Camp Innovation",
        description: "Successfully launched virtual camping programs reaching 200+ rangers.",
        icon: <Star className="w-6 h-6" />,
        type: "Innovation",
      },
    ],
  },
];

const stats = [
  { number: "25+", label: "Years of Service" },
  { number: "15+", label: "Active Outposts" },
  { number: "500+", label: "Rangers Trained" },
  { number: "100+", label: "Gold Medals Awarded" },
];

export default function Achievements() {
  return (
    <>
      <Helmet>
        <title>Achievements | Royal Rangers Agona District</title>
        <meta
          name="description"
          content="Celebrate the achievements and milestones of Royal Rangers Agona District - awards, recognitions, and the impact we've made in our community."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="bg-gradient-gold py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-foreground/10 text-secondary-foreground text-sm font-semibold mb-4">
                Our Pride
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-secondary-foreground mb-6">
                Achievements & Milestones
              </h1>
              <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
                Celebrating the victories, awards, and impact of Royal Rangers Agona District 
                over the years.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-display font-black text-primary">
                    {stat.number}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {achievements.map((yearGroup, yearIndex) => (
                <motion.div
                  key={yearGroup.year}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: yearIndex * 0.1 }}
                  className="mb-12 last:mb-0"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-display font-black text-primary">
                      {yearGroup.year}
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {yearGroup.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIndex * 0.1 }}
                        className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            {item.icon}
                          </div>
                          <div>
                            <span className="inline-block px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs font-medium mb-2">
                              {item.type}
                            </span>
                            <h3 className="font-display font-bold text-foreground mb-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
