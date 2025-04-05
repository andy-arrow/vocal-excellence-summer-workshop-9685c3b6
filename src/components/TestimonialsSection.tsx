
import React, { useRef } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { Quote } from 'lucide-react';

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
    <section id="testimonials" className="py-16 px-6 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="section-title reveal-on-scroll"
          >
            Voices of Experience
          </h2>
          <p 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="section-subtitle reveal-on-scroll"
          >
            Hear from past participants who elevated their artistry with us
          </p>
        </div>

        <Carousel 
          className="reveal-on-scroll"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonials.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="glass-card h-full p-6 flex flex-col">
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={item.image} 
                      alt={`${item.author} at Vocal Excellence workshop`}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="mb-4">
                      <Quote className="w-6 h-6 text-rose-400 opacity-70" />
                    </div>
                    <p className="italic text-gray-700 mb-4 flex-1">"{item.quote}"</p>
                    <div>
                      <p className="font-medium text-gray-800">{item.author}</p>
                      <p className="text-sm text-gray-500">{item.institution}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-rose-200 text-rose-600 hover:bg-rose-50" />
          <CarouselNext className="border-rose-200 text-rose-600 hover:bg-rose-50" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
