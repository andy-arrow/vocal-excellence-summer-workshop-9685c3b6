
import React, { useEffect, useRef } from 'react';
import { Music, Mic, Users, Award } from 'lucide-react';

const features = [
  {
    icon: <Mic className="w-5 h-5 text-rose-500" />,
    title: "Expert Faculty",
    description: "Study with internationally renowned vocal pedagogues and performing artists."
  },
  {
    icon: <Music className="w-5 h-5 text-rose-500" />,
    title: "Performance Focus",
    description: "Develop your artistry through masterclasses and culminating performances."
  },
  {
    icon: <Users className="w-5 h-5 text-rose-500" />,
    title: "Collaborative Environment",
    description: "Connect with fellow singers in a supportive atmosphere for artistic growth."
  },
  {
    icon: <Award className="w-5 h-5 text-rose-500" />,
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
    <section id="about" ref={sectionRef} className="py-20 music-pattern-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <h2 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="section-title reveal-on-scroll"
          >
            About The Programme
          </h2>
          <p 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="section-subtitle reveal-on-scroll"
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
              The Vocal Excellence Summer Workshop is an intensive 5-day vocal training experience designed for serious singers looking to transform their technique and performance skills under the guidance of world-class faculty.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With a curriculum that balances technical development, artistic expression, and performance practice, you'll experience noticeable growth in just five days. Our small group format ensures you receive ample individual attention while building connections with like-minded artists.
            </p>
            <blockquote className="decorative-quote pl-6 border-l-2 border-rose-200 my-8">
              "Finding your authentic voice is a journey of technical mastery and artistic discovery."
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                ref={(el) => (elementsRef.current[4 + index] = el)} 
                className="reveal-on-scroll glass-card p-5 shadow-md hover:shadow-lg transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-rose-100 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
