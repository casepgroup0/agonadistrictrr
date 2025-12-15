import { motion } from "framer-motion";
import rangerKidsLogo from "@/assets/ranger-kids-logo.png";
import discoveryRangersLogo from "@/assets/discovery-rangers-logo.png";
import adventureRangersLogo from "@/assets/adventure-rangers-logo.jpeg";
import expeditionRangersLogo from "@/assets/expedition-rangers-logo.gif";

const ageGroups = [
  {
    name: "Ranger Kids",
    ages: "5-7 years",
    logo: rangerKidsLogo,
    description: "Fun activities, games, and Bible stories that introduce young boys to adventure and faith.",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
    textColor: "text-green-600",
  },
  {
    name: "Discovery Rangers",
    ages: "8-10 years",
    logo: discoveryRangersLogo,
    description: "Hands-on learning, camping basics, and character-building activities that spark curiosity.",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600",
  },
  {
    name: "Adventure Rangers",
    ages: "11-14 years",
    logo: adventureRangersLogo,
    description: "Outdoor adventures, leadership training, and service projects that challenge and inspire.",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-600",
  },
  {
    name: "Expedition Rangers",
    ages: "15-17 years",
    logo: expeditionRangersLogo,
    description: "Advanced leadership, mentoring, and missions that prepare young men for adult life.",
    color: "from-green-600 to-emerald-700",
    bgColor: "bg-green-600/10",
    textColor: "text-green-700",
  },
];

export function AgeGroupsSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Age Groups
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-6">
            Programs for <span className="text-accent">Every Age</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our programs are designed to meet boys where they are, with age-appropriate 
            activities that foster growth, adventure, and spiritual development.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ageGroups.map((group, index) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`h-2 bg-gradient-to-r ${group.color}`} />
                <div className="p-6">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4">
                    <img 
                      src={group.logo} 
                      alt={`${group.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-1 text-center">
                    {group.name}
                  </h3>
                  <p className={`text-sm font-semibold ${group.textColor} mb-3 text-center`}>
                    {group.ages}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed text-center">
                    {group.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
