
import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

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
    <section id="apply" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div 
              ref={(el) => (elementsRef.current[0] = el)} 
              className="reveal-on-scroll mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-gray-800">
                Apply for Summer 2025
              </h2>
              <div className="w-20 h-px bg-gray-300 mb-6"></div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Space is extremely limited to ensure personalized attention. Only 20 participants will be accepted for the 2025 programme.
              </p>
              <a href="/apply" className="px-8 py-3 border border-gray-800 text-gray-800 rounded-none text-sm font-light tracking-wider uppercase hover:bg-gray-800 hover:text-white transition-colors duration-300 inline-block">
                Begin Your Application
              </a>
            </div>

            <div 
              ref={(el) => (elementsRef.current[1] = el)} 
              className="space-y-4 reveal-on-scroll"
            >
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-4 text-gray-500" />
                <span className="font-light">Programme Dates: July 14 - July 18, 2025</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-4 text-gray-500" />
                <span className="font-light">Location: Limassol, Cyprus (Plevis Hall)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-5 h-5 mr-4 text-gray-500" />
                <span className="font-light">Tuition: €500 (Early application discount available)</span>
              </div>
            </div>
          </div>

          <div 
            ref={(el) => (elementsRef.current[2] = el)} 
            className="reveal-on-scroll"
          >
            <div className="border border-gray-200 p-8 bg-white">
              <h3 className="text-2xl font-serif font-light mb-6 text-gray-800">
                Request Information
              </h3>
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-light text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full border border-gray-300 px-4 py-2 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-800"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full border border-gray-300 px-4 py-2 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-800"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="vocal_type" className="block text-sm font-light text-gray-700 mb-1">
                    Vocal Type/Range
                  </label>
                  <select 
                    id="vocal_type" 
                    className="w-full border border-gray-300 px-4 py-2 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-800"
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
                  <label htmlFor="message" className="block text-sm font-light text-gray-700 mb-1">
                    Questions or Comments (Optional)
                  </label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full border border-gray-300 px-4 py-2 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-800"
                    placeholder="Any specific questions about the programme?"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full px-8 py-3 border border-gray-800 text-gray-800 rounded-none text-sm font-light tracking-wider uppercase hover:bg-gray-800 hover:text-white transition-colors duration-300"
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
