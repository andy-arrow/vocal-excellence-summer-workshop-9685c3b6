
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Maria Johnson",
    role: "Opera Singer",
    quote: "The Vocal Excellence Academy transformed my approach to performance. The personalized coaching and supportive environment helped me overcome technical challenges I've struggled with for years.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    rating: 5
  },
  {
    name: "Thomas Zhang",
    role: "Conservatory Student",
    quote: "As a pre-professional vocalist preparing for auditions, this programme was exactly what I needed. The faculty provided invaluable feedback and the performance opportunities gave me real-world experience.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    rating: 5
  },
  {
    name: "Aisha Patel",
    role: "Vocal Coach",
    quote: "Even as an experienced teacher, I gained new perspectives and techniques from the Vocal Excellence faculty. The programme's holistic approach to vocal development is unmatched in the industry.",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80",
    rating: 5
  },
  {
    name: "Daniel Rodriguez",
    role: "Musical Theatre Performer",
    quote: "The techniques I learned during the summer programme have been invaluable for my career in musical theatre. I'm now performing with greater ease and emotional connection than ever before.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentElements = elementsRef.current.filter(Boolean) as HTMLElement[];
    currentElements.forEach((el) => observer.observe(el));

    return () => {
      currentElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const goToNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 7000);
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  return (
    <section id="testimonials" ref={sectionRef} className="section-container relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 bg-burgundy/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-navy/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="section-title reveal-on-scroll"
          >
            Student Testimonials
          </h2>
          <p 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="section-subtitle reveal-on-scroll"
          >
            Hear from our alumni about their transformative experiences
          </p>
        </div>

        <div className="relative">
          <div
            ref={(el) => (elementsRef.current[2] = el)} 
            className="absolute -top-10 -left-8 opacity-20"
          >
            <Quote size={80} className="text-burgundy" />
          </div>

          <div 
            ref={sliderRef}
            className="relative overflow-hidden glass-card p-8 md:p-12 reveal-on-scroll"
          >
            <div 
              className="transition-transform duration-500 ease-out flex"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="min-w-full px-4"
                >
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-1">
                      <div className="aspect-square overflow-hidden rounded-full border-4 border-white shadow-xl max-w-[200px] mx-auto">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <p className="text-lg md:text-xl text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                      <div>
                        <h4 className="text-xl font-playfair font-semibold text-navy-dark">{testimonial.name}</h4>
                        <p className="text-burgundy">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button 
                onClick={goToPrevSlide}
                className="p-2 rounded-full bg-white/80 hover:bg-white text-navy-dark shadow-md transition-all duration-300 hover:scale-105"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={goToNextSlide}
                className="p-2 rounded-full bg-white/80 hover:bg-white text-navy-dark shadow-md transition-all duration-300 hover:scale-105"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setCurrentSlide(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-burgundy w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div 
          ref={(el) => (elementsRef.current[3] = el)} 
          className="mt-16 text-center reveal-on-scroll glass-card p-8"
        >
          <h3 className="text-2xl font-playfair font-semibold mb-4 text-navy-dark">Success Stories</h3>
          <p className="text-gray-700 mb-6">
            Our alumni have gone on to perform on international stages, secure prestigious conservatory placements, and build successful careers in the vocal arts. The Vocal Excellence Academy provides not just technical training, but the confidence and connections to succeed in a competitive industry.
          </p>
          <a href="#" className="inline-flex items-center text-burgundy hover:text-burgundy-light transition-colors">
            <span className="mr-1">Read More Success Stories</span>
            <span className="text-sm">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
