
import React, { useEffect, useRef } from 'react';
import { Instagram, Twitter, Linkedin, ExternalLink } from 'lucide-react';

const instructors = [
  {
    name: "Andreas Aroditis",
    title: "Founder & Artistic Director",
    bio: "Internationally acclaimed vocal coach with extensive experience in opera and musical theatre, dedicated to bringing out authentic performances and technical excellence.",
    // Placeholder image maintained as I couldn't find a confirmed image of this person
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    socials: {
      twitter: "#",
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    name: "Carolyn Michelle-Smith",
    title: "Acting Coach",
    bio: "Award-winning actress and coach specializing in authentic performance techniques and theatrical expression for vocalists across multiple genres.",
    // Placeholder image maintained as I couldn't find a confirmed image of this person
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    socials: {
      twitter: "#",
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    name: "Olivia Brererton",
    title: "Vocal Coach",
    bio: "Renowned vocal technician with expertise in classical and contemporary vocal training, focusing on healthy technique and expressive performance.",
    // Placeholder image maintained as I couldn't find a confirmed image of this person
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    socials: {
      twitter: "#",
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    name: "Aris Antoniades",
    title: "Composer",
    bio: "Celebrated composer and musical director with credits across film, theatre, and concert stages, specializing in creating bespoke works for vocal performers.",
    // Placeholder image maintained as I couldn't find a confirmed image of this person
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    socials: {
      twitter: "#",
      instagram: "#",
      linkedin: "#"
    }
  }
];

const InstructorsSection = () => {
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
    <section id="instructors" ref={sectionRef} className="section-container bg-sand-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="section-title reveal-on-scroll"
          >
            World-Class Instructors
          </h2>
          <p 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="section-subtitle reveal-on-scroll"
          >
            Learn from industry-leading vocal professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <div 
              key={index}
              ref={(el) => (elementsRef.current[2 + index] = el)} 
              className="reveal-on-scroll overflow-hidden group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4 aspect-[3/4]">
                <img 
                  src={instructor.image} 
                  alt={instructor.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <div className="flex space-x-3 mb-2">
                      {instructor.socials.twitter && (
                        <a href={instructor.socials.twitter} className="text-white/80 hover:text-white transition-colors">
                          <Twitter size={18} />
                        </a>
                      )}
                      {instructor.socials.instagram && (
                        <a href={instructor.socials.instagram} className="text-white/80 hover:text-white transition-colors">
                          <Instagram size={18} />
                        </a>
                      )}
                      {instructor.socials.linkedin && (
                        <a href={instructor.socials.linkedin} className="text-white/80 hover:text-white transition-colors">
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                    <a 
                      href="#" 
                      className="inline-flex items-center text-sm text-white/90 hover:text-white transition-colors"
                    >
                      <span className="mr-1">Full Biography</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-navy-dark">{instructor.name}</h3>
              <p className="text-burgundy mb-2">{instructor.title}</p>
              <p className="text-gray-600 text-sm">{instructor.bio}</p>
            </div>
          ))}
        </div>

        <div 
          ref={(el) => (elementsRef.current[6] = el)} 
          className="mt-16 text-center reveal-on-scroll"
        >
          <p className="text-gray-700 mb-6">
            In addition to our core faculty, the programme features guest masterclasses from international performing artists and industry professionals.
          </p>
          <a href="#" className="inline-flex items-center text-burgundy hover:text-burgundy-light transition-colors">
            <span className="mr-1">View All Faculty & Guest Artists</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
