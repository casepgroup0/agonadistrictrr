import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import frederickTurkson from "@/assets/frederick-turkson.jpeg";
import pamelaTakyiArmah from "@/assets/pamela-takyi-armah.jpeg";
import gloriaAyanful from "@/assets/gloria-ayanful.jpeg";
import cosmosAgyei from "@/assets/cosmos-agyei.jpeg";

const currentExecutives = [
  {
    name: "Ps. Isaac Bamfo",
    role: "District Commander",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Leading the district since 2020 with a passion for youth development and spiritual growth.",
    email: "commander@royalrangers-agona.org",
  },
  {
    name: "Comm. Frederick Turkson",
    role: "Deputy District Commander",
    image: frederickTurkson,
    bio: "Overseeing training programs and outpost development across the district.",
    email: "deputy@royalrangers-agona.org",
  },
  {
    name: "Comm. Gloria Ayanful",
    role: "District Secretary",
    image: gloriaAyanful,
    bio: "Managing communications and administrative operations for the district.",
    email: "secretary@royalrangers-agona.org",
  },
  {
    name: "Comm. Cosmos Agyei",
    role: "District Treasurer",
    image: cosmosAgyei,
    bio: "Ensuring financial integrity and resource management for all district activities.",
    email: "treasurer@royalrangers-agona.org",
  },
  {
    name: "Comm. Stephen Arkoh",
    role: "Training Coordinator",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    bio: "Developing and implementing leadership training programs for commanders.",
    email: "training@royalrangers-agona.org",
  },
  {
    name: "Comm. Pamela Takyi-Armah",
    role: "Events Coordinator",
    image: pamelaTakyiArmah,
    bio: "Planning and executing district camps, rallies, and special events.",
    email: "events@royalrangers-agona.org",
  },
];

const pastCommanders = [
  { name: "Comm. Jeremiah Apowre", years: "2015-2020" },
  { name: "Ps. Titus Paintsil", years: "2010-2015" },
  { name: "Comm. Francis Yawson", years: "2005-2010" },
  { name: "Comm. Priscilla Arkoh", years: "1998-2005" },
];

export default function Leadership() {
  return (
    <>
      <Helmet>
        <title>Leadership | Royal Rangers Agona District</title>
        <meta
          name="description"
          content="Meet the dedicated leaders of Royal Rangers Agona District - our district executives, commanders, and mentors guiding the next generation."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="bg-gradient-royal py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-foreground/10 text-accent-foreground text-sm font-semibold mb-4">
                Our Team
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-accent-foreground mb-6">
                District Leadership
              </h1>
              <p className="text-lg text-accent-foreground/80 max-w-2xl mx-auto">
                Meet the dedicated men and women leading Royal Rangers Agona District 
                with passion, integrity, and vision.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Current Executives */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Current Team
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">
                District Executive Council
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentExecutives.map((executive, index) => (
                <motion.div
                  key={executive.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={executive.image}
                      alt={executive.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary/30 text-secondary-foreground text-xs font-semibold mb-3">
                      {executive.role}
                    </span>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {executive.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {executive.bio}
                    </p>
                    <a
                      href={`mailto:${executive.email}`}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      {executive.email}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Commanders */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-semibold mb-4">
                Legacy
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">
                Past District Commanders
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                Honoring those who laid the foundation and built the legacy of Royal Rangers 
                in the Agona District.
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                {pastCommanders.map((commander, index) => (
                  <motion.div
                    key={commander.name}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-xl p-5 border border-border flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold">
                      {commander.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground">
                        {commander.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{commander.years}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
