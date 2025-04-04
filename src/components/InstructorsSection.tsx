
import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const instructors = [
  {
    name: "Andreas Aroditis",
    title: "Founder & Artistic Director",
    bio: "Acclaimed vocalist Andreas Aroditis has earned recognition from The New York Times and Opera Today for his versatile performances at prestigious international venues. A Juilliard graduate with numerous lead roles in opera and musical theater, he has collaborated with respected artists and orchestras. Locally, he has premiered works with the Cyprus Symphony Orchestra and the TrakArt Pops Orchestra. Mentored by legends such as Plácido Domingo and Sherill Millnes, he now shapes future performers as an Instructor at the University of Nicosia and the European University while maintaining a private studio in Limassol.",
    image: "/lovable-uploads/e0f8da04-eb2f-4b36-8abb-00346d1c76be.png",
    socials: {
      instagram: "https://www.instagram.com/andreasaroditis/",
      linkedin: "https://www.linkedin.com/in/andreasaroditis/"
    }
  },
  {
    name: "Carolyn Michelle-Smith",
    title: "Acting Coach",
    bio: "Carolyn Michelle-Smith is an actress, producer, and educator known for her roles in House of Cards, Luke Cage, Russian Doll, and The Chi. A Juilliard graduate, she has performed on Broadway (Romeo and Juliet) and with renowned theater companies. She is also a Visiting Lecturer at Cornell University and Co-Director of Lena Waithe's Hillman Grad Mentorship Lab, empowering BIPOC creatives. Carolyn develops original content inspired by her heritage and operates AspireHigher Coaching Services to mentor actors. Her entrepreneurial artistry focuses on elevating diverse voices in Hollywood through acting, producing, and education.",
    image: "/lovable-uploads/5f2b13ba-7279-45da-86e2-af6b9c336634.png",
    socials: {
      instagram: "https://www.instagram.com/that_carolynmichelle?igsh=MWluZGpwb2pqMm4yeQ==",
      linkedin: "https://www.linkedin.com/in/carolyn-michelle-smith-12435451?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    }
  },
  {
    name: "Kate Batter",
    title: "Vocal Coach",
    bio: "Kate Batter is a highly experienced vocal coach, performer, and founder of Sing Wimbledon. With over 20 years of teaching experience, she specializes in vocal technique, musicality, and acting through song, working with beginners and professionals alike. A graduate of the Royal Birmingham Conservatoire and Royal Academy of Music, Kate has performed in West End productions (The Sound of Music, The Phantom of the Opera) and TV shows (Top Boy, Call the Midwife). Based in Cambridge, she offers private lessons, masterclasses, and drama school audition prep. As Musical Director of Sing Space Choir, she champions vocal excellence and confidence-building.",
    image: "/lovable-uploads/e26c0944-dc77-4d19-8059-c61e7800b8d1.png",
    socials: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    name: "Aris Antoniades",
    title: "Composer",
    bio: "Praised for his ability to immerse audiences in \"a world of sound\" (The National Herald, NYC), Aris Antoniades is a Cypriot composer, arranger, and music director whose work spans symphonic, jazz, theatrical, and cinematic mediums. Collaborating with icons like Grammy nominee Bobby Sanabria and platinum artist Alkistis Protopsalti, his creations range from orchestral works like Chiaroscuro to Afro-Cuban jazz arrangements. As Artistic Director of the TrakArt Pops Orchestra, Antoniades continues to shape Cyprus's musical landscape while pursuing a Ph.D. His music blends emotional depth with structural clarity, resonating globally across genres and cultures.",
    image: "/lovable-uploads/23077377-fca0-46d4-b7c8-83c2a2edcb19.png",
    socials: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    name: "Emmelia Pericleous",
    title: "Choir Director",
    bio: "Choir Conductor and Musicologist who graduated at the top of her master's class from the prestigious Sorbonne University. She directs choirs at three Paris conservatoires, combining classical and contemporary approaches while bridging Cypriot and French musical traditions.",
    image: "/lovable-uploads/4e6da0c3-c667-4dd8-94e4-78ab459e4c18.png",
    socials: {
      instagram: "#",
      linkedin: "#"
    }
  }
];

const InstructorsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [expandedBios, setExpandedBios] = useState<Record<number, boolean>>({});

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

  const toggleBio = (index: number) => {
    setExpandedBios(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section id="instructors" ref={sectionRef} className="section-container bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="section-title reveal-on-scroll"
          >
            World-Class Faculty
          </h2>
          <p 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="section-subtitle reveal-on-scroll"
          >
            Learn from industry-leading vocal professionals with international performance careers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <div 
              key={index}
              ref={(el) => (elementsRef.current[2 + index] = el)} 
              className="reveal-on-scroll overflow-hidden group scale-on-hover"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-md mb-5 aspect-[3/4] border border-rose-100">
                <img 
                  src={instructor.image} 
                  alt={instructor.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-rose-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-5 text-white">
                    <div className="flex space-x-4 mb-3">
                      {instructor.socials.instagram && instructor.socials.instagram !== "#" && (
                        <a href={instructor.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                          <Instagram size={18} />
                        </a>
                      )}
                      {instructor.socials.linkedin && instructor.socials.linkedin !== "#" && (
                        <a href={instructor.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                    <Button
                      variant="link"
                      className="text-white p-0 hover:text-white/90"
                      onClick={() => toggleBio(index)}
                    >
                      <span className="mr-1">Full Biography</span>
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-serif font-medium text-gray-800">{instructor.name}</h3>
              <p className="text-rose-500 mb-2 font-light">{instructor.title}</p>
              <div className="text-gray-600 text-sm">
                {expandedBios[index] ? (
                  <>
                    <p className="mb-2">{instructor.bio}</p>
                    <Button 
                      variant="link" 
                      className="text-rose-500 hover:text-rose-600 p-0 h-auto transition-colors"
                      onClick={() => toggleBio(index)}
                    >
                      Read less
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="line-clamp-4 mb-2">{instructor.bio}</p>
                    <Button 
                      variant="link" 
                      className="text-rose-500 hover:text-rose-600 p-0 h-auto transition-colors"
                      onClick={() => toggleBio(index)}
                    >
                      Read more
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div 
          ref={(el) => (elementsRef.current[7] = el)} 
          className="mt-16 text-center reveal-on-scroll"
        >
          <p className="text-gray-600 mb-6">
            During the intensive, you'll also have the opportunity to work with guest artists and industry professionals in specialized workshops and masterclasses.
          </p>
          <a href="#" className="inline-flex items-center text-rose-500 hover:text-rose-600 transition-colors">
            <span className="mr-1">View All Faculty & Guest Artists</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
