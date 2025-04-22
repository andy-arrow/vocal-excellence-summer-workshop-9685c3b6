import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, ChevronDown, ChevronUp, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const instructors = [
  {
    name: "Andreas Aroditis",
    role: "Founder & Director",
    tag: "Juilliard Alum",
    bio: "Andreas Aroditis is recognized by The New York Times and Opera Today for his versatile performances internationally. His Juilliard training and mentorship by legends shape his unique teaching style. Juilliard graduate. Performed with Cyprus Symphony Orchestra and TrakArt Pops Orchestra. Instructor at University of Nicosia and European University. Private studio mentor.",
    image: "/lovable-uploads/a10cf0f4-c46f-4599-b410-6e1c715c92d5.png",
    socials: {
      instagram: "https://www.instagram.com/andreasaroditis/",
      linkedin: "https://www.linkedin.com/in/andreasaroditis/"
    }
  },
  {
    name: "Carolyn Michelle-Smith",
    role: "Acting Coach",
    tag: "Netflix Actor",
    bio: "Carolyn Michelle-Smith is an actress, producer, and educator known for Netflix, Broadway, and more. She is a Visiting Lecturer at Cornell and Co-Director of Hillman Grad Mentorship Lab. Juilliard alum. Credits in House of Cards, Luke Cage, The Chi, Russian Doll and more. Empowers BIPOC creatives through AspireHigher Coaching and develops original scripts.",
    image: "/lovable-uploads/5f2b13ba-7279-45da-86e2-af6b9c336634.png",
    socials: {
      instagram: "https://www.instagram.com/that_carolynmichelle?igsh=MWluZGpwb2pqMm4yeQ==",
      linkedin: "https://www.linkedin.com/in/carolyn-michelle-smith-12435451"
    }
  },
  {
    name: "Kate Batter",
    role: "Vocal Coach",
    tag: "West End Performer",
    bio: "Kate Batter specializes in vocal and acting technique. She founded Sing Wimbledon with two decades of teaching experience, plus West End credits in The Sound of Music and The Phantom of the Opera. Graduate of Royal Birmingham Conservatoire and Royal Academy of Music. Musical Director of Sing Space Choir and vocal coach across all levels.",
    image: "/lovable-uploads/e26c0944-dc77-4d19-8059-c61e7800b8d1.png",
    socials: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    name: "Aris Antoniades",
    role: "Composer",
    tag: "Award-Winning Composer",
    bio: "Aris Antoniades composes for symphonic, jazz, theatre, and film. Artistic Director of TrakArt Pops Orchestra, collaborator with Grammy nominee Bobby Sanabria, and platinum artist Alkistis Protopsalti. His works blend emotional depth and clarity. Cyprus's musical landscape is shaped by his commitment and craft.",
    image: "/lovable-uploads/23077377-fca0-46d4-b7c8-83c2a2edcb19.png",
    socials: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    name: "Emmelia Pericleous",
    role: "Choir Director",
    tag: "Sorbonne Graduate",
    bio: "Emmelia Pericleous, Paris-based choir director and musicologist, graduated top of her class at Sorbonne. She directs choirs at three Paris Conservatoires, bridging Cypriot and French musical traditions with classical and contemporary techniques. Renowned for innovative choral work and cross-cultural programming.",
    image: "/lovable-uploads/c503aee8-1c6f-4045-bcd9-46e1da3dc853.png",
    socials: {
      instagram: "#",
      linkedin: "#"
    }
  }
];

function bioIntro(bio: string) {
  const words = bio.split(' ');
  if(words.length <= 24) return bio;
  return words.slice(0, 24).join(' ') + '...';
}

function bioRest(bio: string) {
  const words = bio.split(' ');
  if(words.length <= 24) return '';
  return words.slice(24).join(' ');
}

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
    instructors.forEach((instructor, idx) => {
      const existing = document.getElementById(`person-ld-${idx}`);
      if (existing) existing.remove();

      const personData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": instructor.name,
        "jobTitle": instructor.role,
        "alumniOf": instructor.tag.includes('Juilliard') ? "The Juilliard School" :
                     instructor.tag.includes('Sorbonne') ? "Sorbonne University" : undefined,
        "image": window.location.origin + instructor.image,
        "description": instructor.bio,
        "sameAs": [
          ...(instructor.socials.instagram && instructor.socials.instagram !== "#" ? [instructor.socials.instagram] : []),
          ...(instructor.socials.linkedin && instructor.socials.linkedin !== "#" ? [instructor.socials.linkedin] : []),
        ],
      };
      const script = document.createElement('script');
      script.type = "application/ld+json";
      script.id = `person-ld-${idx}`;
      script.innerHTML = JSON.stringify(personData);
      document.head.appendChild(script);
    });

    const observer = new window.IntersectionObserver(
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
      instructors.forEach((_, idx) => {
        const el = document.getElementById(`person-ld-${idx}`);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <section id="faculty" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <div 
          ref={intersectionRef}
          className="text-center mb-16 md:mb-20 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 mb-5">
            Meet Our Faculty
          </h2>
          <p className="text-lg md:text-xl text-gray-700 font-light max-w-prose mx-auto leading-relaxed">
            Learn from world-class vocal and performance professionals from top programs and global stages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
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
              style={{ minHeight: 460, display: 'flex', flexDirection: 'column' }}
            >
              <div className={cn(
                "group overflow-hidden rounded-2xl border border-gray-200 bg-white flex flex-col h-full transition-all duration-500 ease-out hover:shadow-xl hover:shadow-black/[0.03]"
              )}>
                <div className="relative w-full flex justify-center items-center" style={{ height: 300 }}>
                  <span className={cn(
                    "absolute top-4 left-4 z-30 bg-blue-700 text-white text-xs px-3 py-1 rounded-full font-semibold shadow"
                  )}>
                    {instructor.tag}
                  </span>
                  <img
                    src={instructor.image}
                    alt={`Photo of ${instructor.name}`}
                    style={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 18, boxShadow: "0 2px 12px 0 rgb(0 0 0 / 3%)" }}
                    className={cn(
                      "object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                      hoveredInstructor === index ? "scale-105" : "scale-100"
                    )}
                  />
                  <div className={cn(
                    "absolute bottom-4 right-4 z-30 flex space-x-2",
                    hoveredInstructor === index ? "opacity-100" : "opacity-0 pointer-events-none",
                    "transition-opacity duration-300"
                  )}>
                    {instructor.socials.instagram && instructor.socials.instagram !== "#" && (
                      <a 
                        href={instructor.socials.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm text-gray-700 hover:bg-white transition-colors"
                        aria-label={`Instagram profile of ${instructor.name}`}
                      >
                        <Instagram size={18} />
                      </a>
                    )}
                    {instructor.socials.linkedin && instructor.socials.linkedin !== "#" && (
                      <a 
                        href={instructor.socials.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm text-gray-700 hover:bg-white transition-colors"
                        aria-label={`LinkedIn profile of ${instructor.name}`}
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-medium text-gray-800 mb-1">{instructor.name}</h3>
                  <p className="text-blue-700 text-sm font-medium mb-2">{instructor.role}</p>
                  <div className="text-gray-700 text-sm flex-grow max-w-prose">
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
                          <p className="leading-relaxed mb-4">
                            <span>{bioIntro(instructor.bio)}</span>
                            {bioRest(instructor.bio) && <span> {bioRest(instructor.bio)}</span>}
                          </p>
                          <button 
                            onClick={() => toggleBio(index)}
                            className="text-blue-700 text-sm font-medium flex items-center hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md -ml-1 px-1"
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
                          <p className="leading-relaxed mb-4">{bioIntro(instructor.bio)}</p>
                          {bioRest(instructor.bio) && (
                            <button 
                              onClick={() => toggleBio(index)}
                              className="text-blue-700 text-sm font-medium flex items-center hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md -ml-1 px-1"
                            >
                              Read more <ChevronDown className="ml-1 h-4 w-4" />
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="mailto:info@vocalexcellence.org?subject=Book%20a%2015-min%20Faculty%20Meet-and-Greet"
            className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-blue-800 shadow"
            style={{ marginTop: '2rem' }}
          >
            <Video className="w-5 h-5" />
            Book a 15-min Zoom Meet-and-Greet with a Faculty Member
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
