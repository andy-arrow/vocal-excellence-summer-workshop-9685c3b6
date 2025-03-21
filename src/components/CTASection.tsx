
import React, { useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react';

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

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

  return (
    <section id="apply" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-center bg-cover"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-navy-dark/90"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div 
              ref={(el) => (elementsRef.current[0] = el)} 
              className="reveal-on-scroll mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-semibold mb-6 text-white">
                Secure Your Place Today
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Limited spots available for our intensive summer programme. Apply now to avoid disappointment.
              </p>
              <a href="#" className="primary-button bg-white text-burgundy hover:bg-sand hover:text-burgundy-dark">
                Begin Your Application
              </a>
            </div>

            <div 
              ref={(el) => (elementsRef.current[1] = el)} 
              className="space-y-4 reveal-on-scroll"
            >
              <div className="flex items-center text-white/80">
                <Calendar className="w-5 h-5 mr-3 text-burgundy-light" />
                <span>Programme Dates: June 15 - July 30, 2025</span>
              </div>
              <div className="flex items-center text-white/80">
                <Clock className="w-5 h-5 mr-3 text-burgundy-light" />
                <span>Application Deadline: April 1, 2025</span>
              </div>
              <div className="flex items-center text-white/80">
                <MapPin className="w-5 h-5 mr-3 text-burgundy-light" />
                <span>Location: London, UK (with optional online components)</span>
              </div>
              <div className="flex items-center text-white/80">
                <DollarSign className="w-5 h-5 mr-3 text-burgundy-light" />
                <span>Scholarships and payment plans available</span>
              </div>
            </div>
          </div>

          <div 
            ref={(el) => (elementsRef.current[2] = el)} 
            className="reveal-on-scroll"
          >
            <div className="glass-card p-8 bg-white/95">
              <h3 className="text-2xl font-playfair font-semibold mb-6 text-navy-dark">
                Request Information
              </h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="vocal_type" className="block text-sm font-medium text-gray-700 mb-1">
                    Vocal Type/Range
                  </label>
                  <select 
                    id="vocal_type" 
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
                  >
                    <option value="">Select your vocal type</option>
                    <option value="soprano">Soprano</option>
                    <option value="mezzo">Mezzo-Soprano</option>
                    <option value="alto">Alto/Contralto</option>
                    <option value="tenor">Tenor</option>
                    <option value="baritone">Baritone</option>
                    <option value="bass">Bass</option>
                    <option value="other">Other/Unsure</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Level of Experience
                  </label>
                  <select 
                    id="experience" 
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">Intermediate (3-5 years)</option>
                    <option value="advanced">Advanced (6+ years)</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Questions or Comments (Optional)
                  </label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
                    placeholder="Any specific questions about the programme?"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full primary-button bg-burgundy text-white"
                >
                  Request Information
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
