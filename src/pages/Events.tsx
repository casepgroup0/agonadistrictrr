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

// Sample events for 2026
const sampleUpcomingEvents: Event[] = [
  {
    id: "1",
    title: "District Ranger Camp 2026",
    date: "2026-04-10",
    time: "8:00 AM - 5:00 PM",
    location: "Swedru Campsite, Agona District",
    description: "Annual district camping experience with outdoor activities, survival skills, and spiritual development for all ranger groups.",
    type: "Camp",
    attendees: 150,
    is_past: false,
    highlight: null,
  },
  {
    id: "2",
    title: "Easter Rally 2026",
    date: "2026-04-05",
    time: "9:00 AM - 2:00 PM",
    location: "Agona Swedru Central Park",
    description: "District-wide Easter celebration with games, worship, and fellowship for all Royal Rangers and families.",
    type: "Rally",
    attendees: 200,
    is_past: false,
    highlight: null,
  },
  {
    id: "3",
    title: "Commander Training Seminar",
    date: "2026-02-15",
    time: "9:00 AM - 4:00 PM",
    location: "District Headquarters, Agona Swedru",
    description: "Leadership training for outpost commanders and senior guides on effective ranger ministry.",
    type: "Training",
    attendees: 40,
    is_past: false,
    highlight: null,
  },
  {
    id: "4",
    title: "Outpost Visitation - Nyakrom",
    date: "2026-03-08",
    time: "10:00 AM - 1:00 PM",
    location: "Nyakrom Assembly of God Church",
    description: "District leadership visit to Nyakrom outpost for inspection, encouragement, and support.",
    type: "Visitation",
    attendees: 25,
    is_past: false,
    highlight: null,
  },
  {
    id: "5",
    title: "Junior Training Camp",
    date: "2026-06-20",
    time: "8:00 AM - 5:00 PM",
    location: "Agona Nsaba Camp Grounds",
    description: "Specialized training camp for Ranger Kids and Discovery Rangers with age-appropriate activities.",
    type: "Camp",
    attendees: 80,
    is_past: false,
    highlight: null,
  },
];

const samplePastEvents: Event[] = [
  {
    id: "6",
    title: "Christmas Outreach 2025",
    date: "2025-12-20",
    time: null,
    location: "Various Communities, Agona District",
    description: "Rangers spread Christmas joy through community service and gift distribution.",
    type: "Outreach",
    attendees: 120,
    is_past: true,
    highlight: "120 families reached",
  },
  {
    id: "7",
    title: "District Awards Night 2025",
    date: "2025-11-15",
    time: null,
    location: "Agona Swedru Community Center",
    description: "Annual ceremony celebrating ranger achievements and advancement.",
    type: "Ceremony",
    attendees: 180,
    is_past: true,
    highlight: "45 rangers advanced",
  },
  {
    id: "8",
    title: "Leadership Summit 2025",
    date: "2025-10-05",
    time: null,
    location: "District Headquarters",
    description: "Strategic planning and leadership development for district commanders.",
    type: "Summit",
    attendees: 35,
    is_past: true,
    highlight: "New vision launched",
  },
  {
    id: "9",
    title: "National Camporee 2025",
    date: "2025-08-10",
    time: null,
    location: "Kumasi, Ashanti Region",
    description: "National gathering of Royal Rangers from across Ghana.",
    type: "Camporee",
    attendees: 60,
    is_past: true,
    highlight: "3 Gold Medals won",
  },
];

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

      if (!error && data && data.length > 0) {
        setUpcomingEvents(data.filter((e) => !e.is_past));
        setPastEvents(data.filter((e) => e.is_past));
      } else {
        // Use sample events if no database events found
        setUpcomingEvents(sampleUpcomingEvents);
        setPastEvents(samplePastEvents);
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
