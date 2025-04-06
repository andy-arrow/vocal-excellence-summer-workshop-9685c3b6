
import React, { useRef } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "The Vocal Excellence program transformed my understanding of technique. The faculty offered personalized guidance that immediately improved my performance.",
    author: "Maria C., Soprano",
    institution: "Royal Academy of Music",
    image: "/lovable-uploads/29cad38e-a84c-40f7-9ddb-3c11c159ea6d.png"
  },
  {
    quote: "The collaborative atmosphere and intensive schedule created the perfect environment for rapid growth. I left with new repertoire and lifelong connections.",
    author: "James T., Tenor",
    institution: "Juilliard School of Music",
    image: "/lovable-uploads/4e6da0c3-c667-4dd8-94e4-78ab459e4c18.png"
  },
  {
    quote: "The masterclasses were invaluable. Working with world-class faculty in such an intimate setting allowed for breakthroughs I wouldn't have achieved otherwise.",
    author: "Sophie L., Mezzo-soprano",
    institution: "Guildhall School of Music",
    image: "/lovable-uploads/5a4b7bc3-bc7e-42cc-b5bf-fd69555887e3.png"
  }
];

const TestimonialsSection = () => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  return (
    <section id="testimonials" className="py-20 px-6 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="section-title reveal-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Voices of Experience
          </motion.h2>
          <motion.p 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="section-subtitle reveal-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Hear from past participants who elevated their artistry with us
          </motion.p>
        </div>

        <motion.div 
          className="reveal-on-scroll"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto"
          >
            <CarouselContent>
              {testimonials.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <motion.div 
                    className="glass-card h-full p-6 flex flex-col rounded-2xl shadow-lg border border-rose-100 bg-gradient-to-br from-white to-rose-50/70"
                    whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(248, 113, 113, 0.1)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
                      <img 
                        src={item.image} 
                        alt={`${item.author} at Vocal Excellence workshop`}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="mb-4">
                        <Quote className="w-8 h-8 text-rose-400 opacity-70" />
                      </div>
                      <p className="italic text-gray-700 mb-6 flex-1 leading-relaxed">"{item.quote}"</p>
                      <div className="border-t border-rose-100 pt-4 mt-auto">
                        <p className="font-medium text-gray-800">{item.author}</p>
                        <p className="text-sm text-gray-500">{item.institution}</p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="static translate-y-0 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors" />
              <CarouselNext className="static translate-y-0 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
