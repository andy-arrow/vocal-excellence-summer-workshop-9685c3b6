
import React, { useEffect, useRef } from 'react';
import { Music, Mic, Users, Award } from 'lucide-react';

const features = [
  {
    icon: <Mic className="w-5 h-5 text-gray-700" />,
    title: "Expert Faculty",
    description: "Study with internationally renowned vocal pedagogues and performing artists."
  },
  {
    icon: <Music className="w-5 h-5 text-gray-700" />,
    title: "Performance Focus",
    description: "Develop your artistry through masterclasses and culminating performances."
  },
  {
    icon: <Users className="w-5 h-5 text-gray-700" />,
    title: "Collaborative Environment",
    description: "Connect with fellow singers in a supportive atmosphere for artistic growth."
  },
  {
    icon: <Award className="w-5 h-5 text-gray-700" />,
    title: "Career Development",
    description: "Gain valuable insights into the professional world of vocal performance."
  }
];

const AboutSection = () => {
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
    <section id="about" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <h2 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="text-3xl md:text-4xl font-serif font-light mb-4 text-gray-800 reveal-on-scroll"
          >
            About The Programme
          </h2>
          <div className="w-20 h-px bg-gray-300 mx-auto mb-6"></div>
          <p 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="text-lg md:text-xl font-sans mb-10 text-gray-600 font-light max-w-3xl mx-auto reveal-on-scroll"
          >
            An intensive vocal experience with world-class faculty
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div 
            ref={(el) => (elementsRef.current[2] = el)} 
            className="reveal-on-scroll space-y-6"
          >
            <p className="text-gray-600 leading-relaxed">
              The Vocal Excellence Summer Workshop Summer Programme is an intensive 5-day vocal training experience designed for serious singers looking to transform their technique and performance skills under the guidance of world-class faculty.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With a curriculum that balances technical development, artistic expression, and performance practice, you'll experience noticeable growth in just five days. Our small group format ensures you receive ample individual attention while building connections with like-minded artists.
            </p>
            {/* View Our Curriculum link has been removed */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                ref={(el) => (elementsRef.current[4 + index] = el)} 
                className="reveal-on-scroll border-t border-gray-200 pt-4"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-3">
                  <div className="mr-3">{feature.icon}</div>
                  <h3 className="text-base font-medium text-gray-800">{feature.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed pl-8">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
