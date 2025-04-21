
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const instructors = [
  {
    name: "Andreas Aroditis",
    role: "Founder & Director",
    bio: "Andreas Aroditis has earned recognition from The New York Times and Opera Today for his versatile performances at prestigious international venues. A Juilliard graduate with numerous lead roles in opera and musical theater, he has collaborated with respected artists and orchestras.",
    image: "/lovable-uploads/a10cf0f4-c46f-4599-b410-6e1c715c92d5.png",
    socials: {
      instagram: "https://www.instagram.com/andreasaroditis/",
      linkedin: "https://www.linkedin.com/in/andreasaroditis/"
    }
  },
  {
    name: "Carolyn Michelle-Smith",
    role: "Acting Coach",
    bio: "Carolyn Michelle-Smith is an actress, producer, and educator known for her roles in House of Cards, Luke Cage, Russian Doll, and The Chi. A Juilliard graduate, she has performed on Broadway and with renowned theater companies.",
    image: "/lovable-uploads/5f2b13ba-7279-45da-86e2-af6b9c336634.png",
    socials: {
      instagram: "https://www.instagram.com/that_carolynmichelle?igsh=MWluZGpwb2pqMm4yeQ==",
      linkedin: "https://www.linkedin.com/in/carolyn-michelle-smith-12435451"
    }
  },
  {
    name: "Kate Batter",
    role: "Vocal Coach",
    bio: "Kate Batter is a highly experienced vocal coach, performer, and founder of Sing Wimbledon. With over 20 years of teaching experience, she specializes in vocal technique, musicality, and acting through song, working with beginners and professionals alike.",
    image: "/lovable-uploads/e26c0944-dc77-4d19-8059-c61e7800b8d1.png",
    socials: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    name: "Aris Antoniades",
    role: "Composer",
    bio: "Praised for his ability to immerse audiences in \"a world of sound\" (The National Herald, NYC), Aris Antoniades is a Cypriot composer, arranger, and music director whose work spans symphonic, jazz, theatrical, and cinematic mediums.",
    image: "/lovable-uploads/23077377-fca0-46d4-b7c8-83c2a2edcb19.png",
    socials: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    name: "Emmelia Pericleous",
    role: "Choir Director",
    bio: "Choir Conductor and Musicologist who graduated at the top of her master's class from the prestigious Sorbonne University. She directs choirs at three Paris conservatoires, combining classical and contemporary approaches while bridging Cypriot and French musical traditions.",
    image: "/lovable-uploads/c503aee8-1c6f-4045-bcd9-46e1da3dc853.png",
    socials: {
      instagram: "#",
      linkedin: "#"
    }
  }
];

const InstructorsSection = () => {
  const [activeBio, setActiveBio] = useState<number | null>(null);
  const [hoveredInstructor, setHoveredInstructor] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const intersectionRef = useRef<HTMLDivElement>(null);

  const toggleBio = (index: number) => {
    setActiveBio(activeBio === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (intersectionRef.current) {
      observer.observe(intersectionRef.current);
    }

    const instructorElements = document.querySelectorAll('.instructor-card');
    instructorElements.forEach((el) => observer.observe(el));

    return () => {
      if (intersectionRef.current) {
        observer.unobserve(intersectionRef.current);
      }
      instructorElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="faculty" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <div 
          ref={intersectionRef}
          className="text-center mb-16 md:mb-20 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-apple-text mb-5">
            World-Class Faculty
          </h2>
          <p className="text-lg md:text-xl text-apple-grey font-light max-w-2xl mx-auto leading-relaxed">
            Learn from industry-leading vocal professionals with international performance careers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {instructors.map((instructor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="instructor-card relative"
              onMouseEnter={() => setHoveredInstructor(index)}
              onMouseLeave={() => setHoveredInstructor(null)}
            >
              <div className={cn(
                "group overflow-hidden rounded-2xl border border-apple-border/10",
                "transition-all duration-500 ease-out bg-white",
                "hover:shadow-xl hover:shadow-black/[0.03]",
                "h-full flex flex-col"
              )}>
                <div className="relative aspect-square overflow-hidden">
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10",
                    "transition-opacity duration-300",
                    hoveredInstructor === index ? "opacity-60" : "opacity-0"
                  )} />
                  
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className={cn(
                      "w-full h-full object-cover object-center",
                      "transform transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                      hoveredInstructor === index ? "scale-105" : "scale-100"
                    )}
                  />
                  
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 p-5 z-20",
                    "transform transition-transform duration-500 ease-out",
                    hoveredInstructor === index ? "translate-y-0" : "translate-y-full opacity-0"
                  )}>
                    <div className="flex space-x-3">
                      {instructor.socials.instagram && instructor.socials.instagram !== "#" && (
                        <a 
                          href={instructor.socials.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm text-apple-text hover:bg-white transition-colors"
                        >
                          <Instagram size={18} />
                        </a>
                      )}
                      {instructor.socials.linkedin && instructor.socials.linkedin !== "#" && (
                        <a 
                          href={instructor.socials.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm text-apple-text hover:bg-white transition-colors"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-medium text-apple-text">{instructor.name}</h3>
                  <p className="text-apple-blue text-sm font-medium mb-4">{instructor.role}</p>
                  
                  <div className="text-apple-grey text-sm flex-grow">
                    <AnimatePresence mode="wait">
                      {activeBio === index ? (
                        <motion.div
                          key={`bio-expanded-${index}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="leading-relaxed mb-4">{instructor.bio}</p>
                          <button 
                            onClick={() => toggleBio(index)}
                            className="text-apple-blue text-sm font-medium flex items-center hover:text-apple-blue-hover focus:outline-none focus:ring-2 focus:ring-apple-blue/20 rounded-md -ml-1 px-1"
                          >
                            Read less <ChevronUp className="ml-1 h-4 w-4" />
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`bio-collapsed-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="line-clamp-2 leading-relaxed mb-4">{instructor.bio}</p>
                          <button 
                            onClick={() => toggleBio(index)}
                            className="text-apple-blue text-sm font-medium flex items-center hover:text-apple-blue-hover focus:outline-none focus:ring-2 focus:ring-apple-blue/20 rounded-md -ml-1 px-1"
                          >
                            Read more <ChevronDown className="ml-1 h-4 w-4" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
