
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, ChevronDown, ChevronUp, Globe, FileText, Video, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const instructors = [
  {
    name: "Andreas Aroditis",
    role: "Founder & Director",
    bio: "Andreas Aroditis has earned recognition from The New York Times and Opera Today for his versatile performances at prestigious international venues. A Juilliard graduate with numerous lead roles in opera and musical theater, he has collaborated with respected artists and orchestras. Locally, he has premiered works with the Cyprus Symphony Orchestra and the TrakArt Pops Orchestra. Mentored by legends such as Plácido Domingo and Sherill Millnes, he now shapes future performers as an Instructor at the University of Nicosia and the European University while maintaining a private studio in Limassol.",
    image: "/lovable-uploads/a10cf0f4-c46f-4599-b410-6e1c715c92d5.png",
    socials: {
      instagram: "https://www.instagram.com/andreasaroditis/",
      linkedin: "https://www.linkedin.com/in/andreasaroditis/",
      website: "https://www.andreasaroditis.com/"
    }
  },
  {
    name: "Kate Batter",
    role: "Vocal Coach",
    bio: "Kate Batter is a highly experienced vocal coach, performer, and founder of Sing Wimbledon. With over 20 years of teaching experience, she specializes in vocal technique, musicality, and acting through song, working with beginners and professionals alike. A graduate of the Royal Birmingham Conservatoire and Royal Academy of Music, Kate has performed in West End productions (The Sound of Music, The Phantom of the Opera) and TV shows (Top Boy, Call the Midwife). Based in Cambridge, she offers private lessons, masterclasses, and drama school audition prep. As Musical Director of Sing Space Choir, she champions vocal excellence and confidence-building.",
    image: "/lovable-uploads/e26c0944-dc77-4d19-8059-c61e7800b8d1.png",
    socials: {
      instagram: "https://www.instagram.com/weebatter",
      linkedin: "https://www.linkedin.com/in/kate-batter-6b114118b/?originalSubdomain=uk",
      website: "https://www.singwimbledon.co.uk/"
    }
  },
  {
    name: "Carolyn Michelle Smith",
    role: "Acting Coach",
    bio: "Carolyn Michelle Smith is an actress, producer, and educator known for her roles in House of Cards, Luke Cage, Russian Doll, and The Chi. A Juilliard graduate, she has performed on Broadway (Romeo and Juliet) and with renowned theater companies. She is also a Visiting Lecturer at Cornell University and Co-Director of Lena Waithe's Hillman Grad Mentorship Lab, empowering BIPOC creatives. Carolyn develops original content inspired by her heritage and operates AspireHigher Coaching Services to mentor actors. Her entrepreneurial artistry focuses on elevating diverse voices in Hollywood through acting, producing, and education.",
    image: "/lovable-uploads/5f2b13ba-7279-45da-86e2-af6b9c336634.png",
    socials: {
      instagram: "https://www.instagram.com/that_carolynmichelle11",
      linkedin: "https://www.linkedin.com/in/carolyn-michelle-smith-1243545115",
      facultyPage: "https://pma.cornell.edu/carolyn-michelle-smith4",
      imdb: "https://www.imdb.com/name/nm18292715",
      wikipedia: "https://en.wikipedia.org/wiki/Carolyn_Michelle_Smith"
    }
  },
  {
    name: "Aris Antoniades",
    role: "Composer",
    bio: "Aris Antoniades is a Cypriot composer, arranger, and music director whose acclaimed work bridges the worlds of symphonic, jazz, theatrical, and film music. Praised for its emotional depth and structural clarity, his music has been performed by symphony orchestras, big bands, and celebrated soloists around the world. He has collaborated with iconic artists such as nine-time Grammy nominee Bobby Sanabria, legendary Greek musicians Alkistis Protopsalti and George Hatzinassios, and Broadway and West End stars in major productions. As artistic director and principal conductor of the TrakArt Pops Orchestra, he has led high-profile national concerts in Cyprus, while his compositions have been featured at international festivals, on commercial albums, and on global streaming platforms. A Fulbright Scholar with degrees from the Manhattan School of Music, Aris continues to craft imaginative, storytelling-driven music that resonates across genres and cultures.",
    image: "/lovable-uploads/23077377-fca0-46d4-b7c8-83c2a2edcb19.png",
    socials: {
      instagram: "https://www.instagram.com/aris.antoniades",
      linkedin: "https://cy.linkedin.com/in/arisantoniadescomposer",
      twitter: "https://twitter.com/ArisAntoniades19",
      wikipedia: "https://en.wikipedia.org/wiki/Aris_Antoniades"
    }
  },
  {
    name: "Emmeleia Pericleous",
    role: "Choir Director",
    bio: "Choir Director and Musicologist who graduated at the top of her master's class from the prestigious Sorbonne University, France. She directs choirs at 3 Paris Conservatoires, combining classical and contemporary approaches while bridging Cypriot and French musical traditions.",
    image: "/lovable-uploads/c503aee8-1c6f-4045-bcd9-46e1da3dc853.png",
    socials: {
      instagram: "https://www.instagram.com/itsbritneybitch394?igsh=NTk1cGY2aXUxOHBp",
      linkedin: "https://www.linkedin.com/in/emmeleia-perikleous/?originalSubdomain=fr",
      tiktok: "https://www.tiktok.com/@itsbritneybitch394?_t=ZN-8u55aN44EsA&_r=1"
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

  const renderSocialIcon = (type: string) => {
    switch (type) {
      case 'instagram':
        return <Instagram size={18} />;
      case 'linkedin':
        return <Linkedin size={18} />;
      case 'website':
        return <Globe size={18} />;
      case 'facultyPage':
        return <FileText size={18} />;
      case 'imdb':
        return <Video size={18} />;
      case 'wikipedia':
        return <BookOpen size={18} />;
      case 'twitter':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.2833 10.1151L22.0166 1H20.2L13.5333 8.88486L8.2 1H1L9.06667 13.3849L1 22.9H2.81667L9.81667 14.6151L15.4 22.9H22.6L14.2833 10.1151ZM10.6833 13.4983L9.85 12.2899L3.73333 2.89163H7.1L11.9833 10.4216L12.8167 11.63L19.2 21.5083H15.8333L10.6833 13.4983Z" fill="currentColor"/>
        </svg>;
      case 'tiktok':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.321 5.562a5.124 5.124 0 0 1-2.15-2.15 7.866 7.866 0 0 1-.789-3.412h-3.727v14.55c0 .86-.699 1.575-1.559 1.575a1.56 1.56 0 0 1-1.55-1.559 1.56 1.56 0 0 1 1.55-1.559c.15 0 .285.016.42.06v-3.727a5.28 5.28 0 0 0-.42-.016c-2.904 0-5.276 2.371-5.276 5.276 0 2.904 2.372 5.276 5.276 5.276 2.904 0 5.276-2.372 5.276-5.276V8.84a9.45 9.45 0 0 0 5.276 1.56V6.682a5.421 5.421 0 0 1-2.327-.62z" fill="currentColor"/>
        </svg>;
      default:
        return <Globe size={18} />;
    }
  };

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
          <p className="text-lg md:text-xl text-apple-grey font-light max-w-2xl mx-auto leading-relaxed mb-8">
            Learn from internationally renowned teachers from top conservatories and universities
          </p>
          
          {/* Faculty highlights - updated with exact user-requested changes */}
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            <div className="flex items-center text-apple-grey">
              <span className="w-2 h-2 bg-apple-blue rounded-full mr-3"></span>
              <span>Private lesson with master teachers</span>
            </div>
            <div className="flex items-center text-apple-grey">
              <span className="w-2 h-2 bg-apple-blue rounded-full mr-3"></span>
              <span>Dedicated private sessions with accompanists</span>
            </div>
            <div className="flex items-center text-apple-grey">
              <span className="w-2 h-2 bg-apple-blue rounded-full mr-3"></span>
              <span>Personalized feedback and mentoring</span>
            </div>
            <div className="flex items-center text-apple-grey">
              <span className="w-2 h-2 bg-apple-blue rounded-full mr-3"></span>
              <span>Active industry professionals as mentors</span>
            </div>
          </div>
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
                <div className="relative aspect-[3/4] overflow-hidden">
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
                    <div className="flex flex-wrap gap-3">
                      {Object.entries(instructor.socials).map(([platform, url]) => 
                        url !== "#" && (
                          <a 
                            key={platform}
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm text-apple-text hover:bg-white transition-colors"
                            aria-label={`${instructor.name}'s ${platform}`}
                            title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                          >
                            {renderSocialIcon(platform)}
                          </a>
                        )
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
