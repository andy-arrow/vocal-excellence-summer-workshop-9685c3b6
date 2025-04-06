
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogClose
} from "@/components/ui/dialog";
import { X, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

// Gallery images with confirmed uploaded images
const galleryImages = [
  // Masterclasses category
  {
    src: "/lovable-uploads/e26c0944-dc77-4d19-8059-c61e7800b8d1.png",
    alt: "Masterclass with professional vocal coach",
    category: "classes"
  },
  {
    src: "/lovable-uploads/23077377-fca0-46d4-b7c8-83c2a2edcb19.png",
    alt: "Group warm-up exercises in studio",
    category: "classes"
  },
  
  // Performance category
  {
    src: "/lovable-uploads/ac92b4d5-5fab-4149-b45b-6f3e43b3ec2d.png",
    alt: "Ensemble performance session",
    category: "performance"
  },
  {
    src: "/lovable-uploads/5f2b13ba-7279-45da-86e2-af6b9c336634.png",
    alt: "Final showcase performance",
    category: "performance"
  },
  
  // Coaching category
  {
    src: "/lovable-uploads/e0f8da04-eb2f-4b36-8abb-00346d1c76be.png",
    alt: "Individual coaching session",
    category: "coaching"
  }
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredImages = activeCategory 
    ? galleryImages.filter(img => img.category === activeCategory)
    : galleryImages;

  const categories = [
    { id: "classes", name: "Masterclasses" },
    { id: "performance", name: "Performances" },
    { id: "coaching", name: "Coaching" }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="gallery" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Experience the Artistry
          </h2>
          <p className="section-subtitle">
            Glimpses of our transformative summer program in action
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-wrap justify-center gap-3">
            <motion.button 
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === null ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-rose-50 text-gray-700 hover:bg-rose-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(null)}
            >
              All
            </motion.button>
            {categories.map(category => (
              <motion.button
                key={category.id}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-rose-50 text-gray-700 hover:bg-rose-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {filteredImages.length > 0 ? (
            filteredImages.map((image, index) => (
              <motion.div 
                key={index}
                className="aspect-[4/3] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer group relative"
                onClick={() => setSelectedImage(image.src)}
                variants={item}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <Camera size={16} />
                    View Larger
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No images found in this category.</p>
            </div>
          )}
        </motion.div>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-5xl p-1 bg-transparent border-none">
            <DialogClose className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-2 shadow-md">
              <X className="h-4 w-4" />
            </DialogClose>
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Enlarged view"
                className="w-full h-full object-contain rounded-md"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;
