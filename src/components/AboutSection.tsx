
import React, { useEffect, useRef } from 'react';
import { Music, Mic, Users, Award } from 'lucide-react';

const features = [
  {
    icon: <Mic className="w-6 h-6 text-apple-blue" />,
    title: "Expert Faculty",
    description: "Study with internationally renowned vocal pedagogues, coaches, and performing artists from leading conservatories and opera houses."
  },
  {
    icon: <Music className="w-6 h-6 text-apple-blue" />,
    title: "Performance Focus",
    description: "Develop your artistry through masterclasses, one-on-one coaching, and culminating performances showcasing your growth."
  },
  {
    icon: <Users className="w-6 h-6 text-apple-blue" />,
    title: "Professional Network",
    description: "Connect with fellow emerging artists and industry professionals in a collaborative and supportive environment."
  },
  {
    icon: <Award className="w-6 h-6 text-apple-blue" />,
    title: "Career Development",
    description: "Gain valuable insights into the professional world of vocal performance through workshops and industry panels."
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
    <section id="about" ref={sectionRef} className="section-container bg-white">
      <div className="max-w-6xl mx-auto">
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
            An immersive experience for advanced singers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div 
            ref={(el) => (elementsRef.current[2] = el)} 
            className="reveal-on-scroll"
          >
            <h3 className="text-2xl font-sans font-semibold mb-4 text-apple-dark">Elevate Your Artistry</h3>
            <p className="text-apple-gray mb-6 leading-relaxed">
              The Summer Voice Programme is a prestigious three-week intensive designed for advanced vocal students and emerging professional singers seeking to refine their craft and advance their careers.
            </p>
            <p className="text-apple-gray mb-6 leading-relaxed">
              Immerse yourself in an environment of artistic excellence where you'll receive specialized individual attention from our distinguished faculty of internationally renowned vocalists, coaches, and directors.
            </p>
            <p className="text-apple-gray leading-relaxed">
              Each participant works closely with faculty in private voice lessons, coaching sessions, and masterclasses focused on vocal technique, repertoire development, language proficiency, and performance practice. The programme culminates in public recitals showcasing each artist's growth.
            </p>
          </div>

          <div 
            ref={(el) => (elementsRef.current[3] = el)} 
            className="reveal-on-scroll"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                alt="Vocal masterclass session" 
                className="w-full h-auto rounded-xl shadow-sm object-cover aspect-video"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={(el) => (elementsRef.current[4 + index] = el)} 
              className="p-6 reveal-on-scroll scale-on-hover border-0 rounded-xl bg-apple-light"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-sans font-medium mb-2 text-apple-dark">{feature.title}</h3>
              <p className="text-apple-gray text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
