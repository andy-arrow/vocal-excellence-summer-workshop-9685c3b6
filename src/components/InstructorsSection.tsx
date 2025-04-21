
import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Linkedin, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const instructors = [
  {
    name: "Andreas Aroditis",
    title: "Founder & Director",
    bio: "Andreas Aroditis has earned recognition from The New York Times and Opera Today for his versatile performances at prestigious international venues. A Juilliard graduate with numerous lead roles in opera and musical theater, he has collaborated with respected artists and orchestras. Locally, he has premiered works with the Cyprus Symphony Orchestra and the TrakArt Pops Orchestra. Mentored by legends such as Plácido Domingo and Sherill Millnes, he now shapes future performers as an Instructor at the University of Nicosia and the European University while maintaining a private studio in Limassol.",
    image: "/lovable-uploads/a10cf0f4-c46f-4599-b410-6e1c715c92d5.png",
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
    image: "/lovable-uploads/c503aee8-1c6f-4045-bcd9-46e1da3dc853.png",
    socials: {
      instagram: "#",
      linkedin: "#"
    }
  }
];

const InstructorsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeBio, setActiveBio] = useState<number | null>(null);

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
    setActiveBio(activeBio === index ? null : index);
  };

  return (
    <section id="instructors" ref={sectionRef} className="section-container bg-gradient-to-b from-rose-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="didot-heading text-4xl md:text-5xl font-light text-apple-text mb-4 reveal-on-scroll"
          >
            World-Class Faculty
          </h2>
          <div className="w-20 h-px bg-apple-blue mx-auto mb-6"></div>
          <p 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="text-lg text-apple-grey max-w-2xl mx-auto reveal-on-scroll"
          >
            Learn from industry-leading vocal professionals with international performance careers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {instructors.map((instructor, index) => (
            <div 
              key={index}
              ref={(el) => (elementsRef.current[2 + index] = el)} 
              className="reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-apple-border/20 h-full flex flex-col">
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={instructor.image} 
                    alt={instructor.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex space-x-3">
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
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-serif font-medium text-apple-text mb-1">{instructor.name}</h3>
                  <p className="text-apple-blue mb-4 font-light">{instructor.title}</p>
                  
                  <div className="text-apple-grey text-sm flex-grow">
                    {activeBio === index ? (
                      <>
                        <p className="mb-4 leading-relaxed">{instructor.bio}</p>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-apple-blue hover:text-apple-blue hover:bg-apple-light px-0 h-auto font-normal"
                          onClick={() => toggleBio(index)}
                        >
                          Read less <ChevronUp className="ml-1 h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <p className="mb-4 line-clamp-3 leading-relaxed">{instructor.bio}</p>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-apple-blue hover:text-apple-blue hover:bg-apple-light px-0 h-auto font-normal"
                          onClick={() => toggleBio(index)}
                        >
                          Read more <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    {instructor.socials.instagram && instructor.socials.instagram !== "#" && (
                      <a 
                        href={instructor.socials.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-apple-grey hover:text-apple-blue transition-colors"
                      >
                        <Instagram size={18} />
                      </a>
                    )}
                    {instructor.socials.linkedin && instructor.socials.linkedin !== "#" && (
                      <a 
                        href={instructor.socials.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-apple-grey hover:text-apple-blue transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
