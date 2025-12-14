import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    alt: "Rangers camping adventure",
    category: "Camps",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800",
    alt: "Leadership training session",
    category: "Training",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800",
    alt: "Outdoor activities",
    category: "Activities",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=800",
    alt: "Community service",
    category: "Service",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1504652517000-ae1068478c59?w=800",
    alt: "Award ceremony",
    category: "Events",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    alt: "Bible study session",
    category: "Training",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=800",
    alt: "Nature exploration",
    category: "Activities",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
    alt: "Group photo",
    category: "Events",
  },
];

const categories = ["All", "Camps", "Training", "Activities", "Service", "Events"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const handlePrev = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    setSelectedImage(filteredImages[prevIndex].id);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
    const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(filteredImages[nextIndex].id);
  };

  return (
    <>
      <Helmet>
        <title>Gallery | Royal Rangers Agona District</title>
        <meta
          name="description"
          content="View photos and videos from Royal Rangers Agona District events, camps, training sessions, and community activities."
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
                Our Memories
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-accent-foreground mb-6">
                Photo Gallery
              </h1>
              <p className="text-lg text-accent-foreground/80 max-w-2xl mx-auto">
                Explore moments from our camps, events, training sessions, and community activities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 bg-muted/50 sticky top-16 md:top-20 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-square relative group cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => setSelectedImage(image.id)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-end">
                      <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="inline-block px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-semibold">
                          {image.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-card/20 text-card hover:bg-card/40 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </button>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/20 text-card hover:bg-card/40 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/20 text-card hover:bg-card/40 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={galleryImages.find((img) => img.id === selectedImage)?.src}
                alt={galleryImages.find((img) => img.id === selectedImage)?.alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>
    </>
  );
}
