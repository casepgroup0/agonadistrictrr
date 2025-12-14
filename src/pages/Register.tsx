import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Shield, Users, Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const registrationOptions = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Register a Ranger",
    description: "Enroll your son in Royal Rangers and give him the gift of adventure, leadership, and spiritual growth.",
    features: [
      "Age-appropriate programs (5-17 years)",
      "Weekly meetings and activities",
      "Camps and outdoor adventures",
      "Merit badges and awards",
    ],
    cta: "Register Now",
    color: "primary",
  },
  {
    icon: <Building className="w-8 h-8" />,
    title: "Start an Outpost",
    description: "Bring Royal Rangers to your church and community. We'll help you get started with training and resources.",
    features: [
      "Full training for commanders",
      "Curriculum and resources",
      "District support and fellowship",
      "National network connection",
    ],
    cta: "Apply to Start",
    color: "accent",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Become a Commander",
    description: "Volunteer as a leader and make a lasting impact on the lives of boys in your community.",
    features: [
      "Leadership training courses",
      "Background check and approval",
      "Ongoing support and resources",
      "Fellowship with other leaders",
    ],
    cta: "Apply to Serve",
    color: "secondary",
  },
];

export default function Register() {
  return (
    <>
      <Helmet>
        <title>Join Us | Royal Rangers Agona District</title>
        <meta
          name="description"
          content="Register your child, start an outpost, or become a commander with Royal Rangers Agona District. Join our adventure today!"
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
                Join the Adventure
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-secondary-foreground mb-6">
                Get Involved
              </h1>
              <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
                There are many ways to be part of Royal Rangers Agona District. 
                Choose the path that's right for you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Registration Options */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {registrationOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all group"
                >
                  <div
                    className={`h-2 ${
                      option.color === "primary"
                        ? "bg-gradient-hero"
                        : option.color === "accent"
                        ? "bg-gradient-royal"
                        : "bg-gradient-gold"
                    }`}
                  />
                  <div className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                        option.color === "primary"
                          ? "bg-primary/10 text-primary"
                          : option.color === "accent"
                          ? "bg-accent/10 text-accent"
                          : "bg-secondary/30 text-secondary-foreground"
                      }`}
                    >
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-3">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">{option.description}</p>

                    <ul className="space-y-3 mb-8">
                      {option.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-secondary-foreground" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={option.color === "primary" ? "default" : option.color === "accent" ? "royal" : "gold"}
                      className="w-full"
                      asChild
                    >
                      <Link to="/contact">
                        {option.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-display font-black text-foreground mb-6">
                Registration Coming Soon
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We're working on an online registration system to make it easier for you to join 
                Royal Rangers. In the meantime, please contact us directly and we'll help you 
                get started.
              </p>
              <Button variant="default" size="lg" asChild>
                <Link to="/contact">
                  Contact Us to Register
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
