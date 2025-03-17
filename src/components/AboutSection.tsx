
import React, { useEffect, useRef } from 'react';
import { Music, Mic, Users, Award } from 'lucide-react';

const features = [
  {
    icon: <Mic className="w-8 h-8 text-burgundy" />,
    title: "Expert Vocal Training",
    description: "Receive personalized instruction from industry-leading vocal coaches and performers."
  },
  {
    icon: <Music className="w-8 h-8 text-burgundy" />,
    title: "Performance Opportunities",
    description: "Showcase your talents in stunning venues with professional accompaniment and guidance."
  },
  {
    icon: <Users className="w-8 h-8 text-burgundy" />,
    title: "Collaborative Environment",
    description: "Connect with like-minded vocalists and build lifelong friendships and professional networks."
  },
  {
    icon: <Award className="w-8 h-8 text-burgundy" />,
    title: "Recognized Certification",
    description: "Complete the programme with an industry-recognized certificate and portfolio materials."
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
    <section id="about" ref={sectionRef} className="section-container bg-sand-light">
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
            A transformative summer experience for passionate vocalists
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            ref={(el) => (elementsRef.current[2] = el)} 
            className="reveal-on-scroll"
          >
            <h3 className="text-2xl font-playfair font-semibold mb-4 text-navy-dark">Discover Your Full Vocal Potential</h3>
            <p className="text-gray-700 mb-6">
              The Vocal Excellence Academy Summer Programme is an intensive, immersive experience designed to transform passionate singers into confident, skilled performers. Over the course of six weeks, you'll dive deep into technique, performance, and artistry.
            </p>
            <p className="text-gray-700 mb-6">
              Our programme provides a unique blend of individual coaching, masterclasses, ensemble work, and performance opportunities—all within a supportive community of fellow vocalists and world-class instructors.
            </p>
            <p className="text-gray-700">
              Whether you're preparing for conservatory auditions, looking to strengthen your professional career, or simply want to take your singing to the next level, our programme offers the perfect balance of rigorous training and creative exploration.
            </p>
          </div>

          <div 
            ref={(el) => (elementsRef.current[3] = el)} 
            className="reveal-on-scroll"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-burgundy/10 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-navy/10 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                alt="Vocal training session" 
                className="w-full h-auto rounded-lg shadow-xl relative z-10 object-cover aspect-video"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={(el) => (elementsRef.current[4 + index] = el)} 
              className="glass-card p-6 reveal-on-scroll scale-on-hover"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-playfair font-semibold mb-2 text-navy-dark">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
