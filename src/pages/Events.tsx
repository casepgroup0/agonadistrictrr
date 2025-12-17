import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string | null;
  location: string;
  description: string | null;
  type: string | null;
  attendees: number | null;
  is_past: boolean | null;
  highlight: string | null;
}

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (!error && data) {
        setUpcomingEvents(data.filter((e) => !e.is_past));
        setPastEvents(data.filter((e) => e.is_past));
      }
      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  const formatEventDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "MMMM d, yyyy");
    } catch {
      return dateStr;
    }
  };

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

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading events...</p>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="text-center py-12 bg-muted/50 rounded-xl">
                <p className="text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="h-2 bg-gradient-gold" />
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
                        {event.type || "Event"}
                      </span>
                      <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {event.description || "Join us for this exciting event!"}
                      </p>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{formatEventDate(event.date)}</span>
                        </div>
                        {event.time && (
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{event.time}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{event.location}</span>
                        </div>
                        {event.attendees && event.attendees > 0 && (
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Users className="w-4 h-4 text-primary" />
                            <span>{event.attendees} Expected</span>
                          </div>
                        )}
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
            )}
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

            {pastEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No past events to display yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card/50 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">{formatEventDate(event.date)}</p>
                    <p className="text-sm text-muted-foreground mb-3">{event.location}</p>
                    {event.highlight && (
                      <span className="inline-block px-3 py-1 rounded-full bg-secondary/30 text-secondary-foreground text-xs font-semibold">
                        {event.highlight}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

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
