import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const upcomingEvents = [
  {
    id: 1,
    title: "District Pow Wow 2024",
    date: "March 15-17, 2024",
    time: "8:00 AM",
    location: "Agona Swedru Camp Ground",
    description: "Annual district camping event with competitions, training, and fellowship.",
    type: "Camp",
    attendees: 250,
  },
  {
    id: 2,
    title: "Leadership Training Academy",
    date: "April 5-6, 2024",
    time: "9:00 AM",
    location: "Central Assembly Church",
    description: "Intensive training for outpost commanders and junior leaders.",
    type: "Training",
    attendees: 50,
  },
  {
    id: 3,
    title: "Community Service Day",
    date: "April 20, 2024",
    time: "7:00 AM",
    location: "Agona District",
    description: "Rangers giving back through community clean-up and service projects.",
    type: "Service",
    attendees: 120,
  },
];

const pastEvents = [
  {
    id: 4,
    title: "National Camporama 2023",
    date: "December 2023",
    location: "Accra",
    highlight: "3rd Place Overall District",
  },
  {
    id: 5,
    title: "District Rally 2023",
    date: "November 2023",
    location: "Agona Swedru",
    highlight: "500+ Attendees",
  },
  {
    id: 6,
    title: "Ranger Kids Festival",
    date: "October 2023",
    location: "Agona Nyakrom",
    highlight: "150 Kids Participated",
  },
];

export default function Events() {
  return (
    <>
      <Helmet>
        <title>Events & Camps | Royal Rangers Agona District</title>
        <meta
          name="description"
          content="Discover upcoming camps, training events, and activities for Royal Rangers Agona District. Join us for adventure and spiritual growth."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="bg-gradient-hero py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-semibold mb-4">
                Stay Connected
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-primary-foreground mb-6">
                Events & Camps
              </h1>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                Join us for exciting camps, leadership training, and community activities 
                that build character and create lasting memories.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/30 text-secondary-foreground text-sm font-semibold mb-4">
                Coming Soon
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">
                Upcoming Events
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="h-2 bg-gradient-gold" />
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
                      {event.type}
                    </span>
                    <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{event.attendees} Expected</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/register">
                        Register Now
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-semibold mb-4">
                Memories
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">
                Past Events
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <h3 className="text-lg font-display font-bold text-foreground mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">{event.date}</p>
                  <p className="text-sm text-muted-foreground mb-3">{event.location}</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary/30 text-secondary-foreground text-xs font-semibold">
                    {event.highlight}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="default" asChild>
                <Link to="/gallery">View Event Gallery</Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
