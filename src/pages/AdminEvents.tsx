import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { Plus, Pencil, Trash2, LogOut } from "lucide-react";
import { z } from "zod";

// Input validation schema for events
const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  time: z.string().max(50, "Time must be less than 50 characters").optional().nullable(),
  location: z.string().min(1, "Location is required").max(500, "Location must be less than 500 characters"),
  description: z.string().max(5000, "Description must be less than 5000 characters").optional().nullable(),
  type: z.string().max(100, "Type must be less than 100 characters").optional().nullable(),
  attendees: z.number().min(0, "Attendees cannot be negative").max(100000, "Attendees value too large").optional().nullable(),
  is_past: z.boolean().optional().nullable(),
  highlight: z.string().max(200, "Highlight must be less than 200 characters").optional().nullable(),
});
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

export default function AdminEvents() {
  const { user, role, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    type: "general",
    attendees: 0,
    is_past: false,
    highlight: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      toast.error("Failed to fetch events");
    } else {
      setEvents(data || []);
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      type: "general",
      attendees: 0,
      is_past: false,
      highlight: "",
    });
    setEditingEvent(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data with zod schema
    const rawEventData = {
      title: formData.title.trim(),
      date: formData.date,
      time: formData.time?.trim() || null,
      location: formData.location.trim(),
      description: formData.description?.trim() || null,
      type: formData.type?.trim() || "general",
      attendees: formData.attendees || 0,
      is_past: formData.is_past,
      highlight: formData.highlight?.trim() || null,
    };

    const validationResult = eventSchema.safeParse(rawEventData);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    // Use validated raw data (preserves required field types)
    const eventData = rawEventData;

    if (editingEvent) {
      const { error } = await supabase
        .from("events")
        .update(eventData)
        .eq("id", editingEvent.id);

      if (error) {
        // Handle authorization errors gracefully
        if (error.code === "42501" || error.message?.includes("policy")) {
          toast.error("You don't have permission to update events");
        } else {
          toast.error("Failed to update event");
        }
      } else {
        toast.success("Event updated!");
        fetchEvents();
        setIsDialogOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase.from("events").insert([eventData]);

      if (error) {
        // Handle authorization errors gracefully
        if (error.code === "42501" || error.message?.includes("policy")) {
          toast.error("You don't have permission to create events");
        } else {
          toast.error("Failed to create event");
        }
      } else {
        toast.success("Event created!");
        fetchEvents();
        setIsDialogOpen(false);
        resetForm();
      }
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time || "",
      location: event.location,
      description: event.description || "",
      type: event.type || "general",
      attendees: event.attendees || 0,
      is_past: event.is_past || false,
      highlight: event.highlight || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      // Handle authorization errors gracefully
      if (error.code === "42501" || error.message?.includes("policy")) {
        toast.error("You don't have permission to delete events");
      } else {
        toast.error("Failed to delete event");
      }
    } else {
      toast.success("Event deleted!");
      fetchEvents();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin");
  };

  if (loading || isLoading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (role !== "admin") {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-4">You don't have admin privileges.</p>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Manage Events | Royal Rangers Agona District</title>
      </Helmet>
      <Layout>
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-display font-bold text-foreground">
                Manage Events
              </h1>
              <div className="flex gap-2">
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) resetForm();
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingEvent ? "Edit Event" : "Add New Event"}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date *</Label>
                          <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) =>
                              setFormData({ ...formData, date: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Input
                            id="time"
                            value={formData.time}
                            onChange={(e) =>
                              setFormData({ ...formData, time: e.target.value })
                            }
                            placeholder="9:00 AM"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                          }
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="type">Event Type</Label>
                          <Input
                            id="type"
                            value={formData.type}
                            onChange={(e) =>
                              setFormData({ ...formData, type: e.target.value })
                            }
                            placeholder="Camp, Training, etc."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="attendees">Expected Attendees</Label>
                          <Input
                            id="attendees"
                            type="number"
                            value={formData.attendees}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                attendees: parseInt(e.target.value) || 0,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch
                          id="is_past"
                          checked={formData.is_past}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, is_past: checked })
                          }
                        />
                        <Label htmlFor="is_past">Mark as past event</Label>
                      </div>
                      {formData.is_past && (
                        <div className="space-y-2">
                          <Label htmlFor="highlight">Highlight</Label>
                          <Input
                            id="highlight"
                            value={formData.highlight}
                            onChange={(e) =>
                              setFormData({ ...formData, highlight: e.target.value })
                            }
                            placeholder="e.g., 500+ Attendees"
                          />
                        </div>
                      )}
                      <Button type="submit" className="w-full">
                        {editingEvent ? "Update Event" : "Create Event"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>

            {events.length === 0 ? (
              <div className="text-center py-12 bg-muted/50 rounded-xl">
                <p className="text-muted-foreground">No events yet. Add your first event!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-card rounded-xl border border-border p-4 flex justify-between items-start gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground">{event.title}</h3>
                        {event.is_past && (
                          <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                            Past
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {event.date} • {event.location}
                      </p>
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {event.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(event)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}
