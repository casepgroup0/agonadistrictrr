import { motion } from "framer-motion";
import { Heart, Users, BookOpen } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-8">
            Who We <span className="text-primary">Are</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
            Royal Rangers is a Christian mentoring program by the Assemblies of God, focused on 
            equipping boys and girls for Christ-like character and leadership through activities 
            that build spiritual, mental, physical, and social growth, guided by principles of 
            dedication, integrity, and service, fostering future godly men and women in a fun, 
            relational environment.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">Christ-like Character</h3>
              <p className="text-sm text-muted-foreground">Building spiritual foundations and godly values</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">Leadership Development</h3>
              <p className="text-sm text-muted-foreground">Preparing future leaders through mentorship</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">Holistic Growth</h3>
              <p className="text-sm text-muted-foreground">Spiritual, mental, physical, and social development</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
