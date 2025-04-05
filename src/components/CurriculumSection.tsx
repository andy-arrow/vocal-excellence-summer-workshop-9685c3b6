import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, Book, Mic, Users, Theater, Music, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const modules = [
  {
    title: "Vocal Technique & Health",
    description: "Master the fundamentals of healthy vocal production, breath control, resonance, and range extension.",
    icon: <Mic className="w-8 h-8 text-rose-500" />,
    highlights: [
      "Diaphragmatic breath support and control",
      "Vocal placement and balanced resonance",
      "Range extension and register blending",
      "Vocal health and sustainable practice"
    ],
    iconBg: "bg-rose-50"
  },
  {
    title: "Performance Mastery",
    description: "Develop compelling stage presence, emotional connection, and authentic performance skills.",
    icon: <Theater className="w-8 h-8 text-amber-500" />,
    highlights: [
      "Dynamic stage presence and movement",
      "Emotional connectivity to text and music",
      "Microphone technique and amplification",
      "Audience engagement and performance anxiety"
    ],
    iconBg: "bg-amber-50"
  },
  {
    title: "Repertoire Development",
    description: "Expand your repertoire across genres while receiving guidance on appropriate song selection.",
    icon: <Book className="w-8 h-8 text-blue-500" />,
    highlights: [
      "Genre-specific vocal techniques",
      "Personalized repertoire selection",
      "Language coaching and diction mastery",
      "Style interpretation and authenticity"
    ],
    iconBg: "bg-blue-50"
  },
  {
    title: "Ensemble & Collaborative Work",
    description: "Refine your skills in harmony, blend, and musical collaboration with fellow vocalists.",
    icon: <Users className="w-8 h-8 text-green-500" />,
    highlights: [
      "Harmony techniques and ear training",
      "Vocal blend and dynamic balance",
      "Collaborative performance skills",
      "Chamber music and ensemble approach"
    ],
    iconBg: "bg-green-50"
  }
];

const scheduleData = [
  { 
    day: "Monday", 
    theme: "Foundation Day",
    activities: [
      "9:00 AM: Vocal Warm-up & Technique Workshop",
      "12:00 PM: Lunch & Rest Period",
      "2:00 PM: Individual Coaching Sessions",
      "5:00 PM: Group Practice & Reflection"
    ] 
  },
  { 
    day: "Tuesday", 
    theme: "Repertoire Focus",
    activities: [
      "9:00 AM: Morning Warm-up & Resonance Work",
      "10:30 AM: Masterclass with Guest Artist",
      "2:00 PM: Repertoire Development Sessions",
      "7:00 PM: Evening Listening Session"
    ] 
  },
  { 
    day: "Wednesday", 
    theme: "Collaborative Day",
    activities: [
      "9:00 AM: Ensemble Warm-up & Blend Work",
      "11:00 AM: Chamber Music Coaching",
      "2:30 PM: Performance Workshop",
      "7:00 PM: Faculty Showcase Concert"
    ] 
  },
  { 
    day: "Thursday", 
    theme: "Performance Preparation",
    activities: [
      "9:00 AM: Technical Refinement Workshop",
      "12:00 PM: Lunch & Mental Preparation",
      "2:00 PM: Dress Rehearsal with Feedback",
      "5:00 PM: Vocal Wellness & Rest Session"
    ] 
  },
  { 
    day: "Friday", 
    theme: "Culmination Day",
    activities: [
      "9:00 AM: Final Masterclass Session",
      "11:00 AM: Performance Preparation",
      "4:00 PM: Tech Rehearsal at Venue",
      "7:30 PM: Participant Showcase Concert"
    ] 
  }
];

const CurriculumSection = () => {
  const [activeTab, setActiveTab] = useState('modules');
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  const [highlightedDay, setHighlightedDay] = useState<number | null>(null);
  
  useEffect(() => {
    // Check for reduced motion preference
    const savedPreference = localStorage.getItem('reduced-motion') === 'true';
    setHasReducedMotion(savedPreference);
    
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
    <section id="curriculum" ref={sectionRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="section-title reveal-on-scroll"
          >
            Your Summer Crescendo
          </h2>
          <p 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="section-subtitle reveal-on-scroll"
          >
            A daily rhythm designed to elevate your vocal artistry
          </p>
        </div>

        {/* Tabs with music-themed indicators */}
        <div 
          ref={(el) => (elementsRef.current[2] = el)} 
          className="flex justify-center mb-10 reveal-on-scroll"
        >
          <div className="glass-card rounded-full inline-flex p-1.5 shadow-md">
            <button 
              className={cn(
                "px-6 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-2",
                activeTab === 'modules' 
                  ? "bg-white shadow-md text-rose-600" 
                  : "text-gray-600 hover:text-rose-600"
              )}
              onClick={() => setActiveTab('modules')}
            >
              <Music size={16} />
              <span>Program Modules</span>
              {activeTab === 'modules' && !hasReducedMotion && (
                <span className="text-rose-400 animate-float ml-1">♪</span>
              )}
            </button>
            <button 
              className={cn(
                "px-6 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-2",
                activeTab === 'schedule' 
                  ? "bg-white shadow-md text-rose-600" 
                  : "text-gray-600 hover:text-rose-600"
              )}
              onClick={() => setActiveTab('schedule')}
            >
              <Calendar size={16} />
              <span>Daily Schedule</span>
              {activeTab === 'schedule' && !hasReducedMotion && (
                <span className="text-rose-400 animate-float ml-1">♫</span>
              )}
            </button>
          </div>
        </div>

        {/* Modules Tab Content */}
        <div className={cn(
          "transition-all duration-500",
          activeTab === 'modules' ? "opacity-100" : "opacity-0 absolute -z-10"
        )}>
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <div 
                key={index}
                ref={(el) => (elementsRef.current[3 + index] = el)} 
                className={cn(
                  "glass-card p-6 reveal-on-scroll transform transition-all duration-300",
                  "hover:shadow-xl hover:-translate-y-1 group"
                )}
                style={{ transitionDelay: `${(index % 3) * 100}ms` }}
              >
                <div className={cn(
                  "mb-4 w-16 h-16 rounded-full flex items-center justify-center",
                  module.iconBg
                )}>
                  {module.icon}
                  {!hasReducedMotion && (
                    <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs scale-75">
                      <span className="animate-float">♪</span>
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-serif font-medium mb-3 text-gray-800 group-hover:text-rose-600 transition-colors">
                  {module.title}
                </h3>
                <p className="text-gray-600 mb-4 font-light">{module.description}</p>
                <ul className="space-y-2.5">
                  {module.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-rose-500 mr-2 mt-0.5">♪</span>
                      <span className="text-gray-700 text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Tab Content */}
        <div className={cn(
          "transition-all duration-500",
          activeTab === 'schedule' ? "opacity-100" : "opacity-0 absolute -z-10"
        )}>
          <div 
            ref={(el) => (elementsRef.current[7] = el)} 
            className="reveal-on-scroll glass-card p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-rose-500" />
              <h3 className="text-xl font-serif font-medium text-gray-800">Your Daily Rhythm</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Each day at Vocal Excellence has its own rhythm and focus, creating a comprehensive experience that builds your vocal abilities sequentially. The program structure balances intensive learning with adequate rest periods for vocal recovery.
            </p>
            
            {/* Visual timeline */}
            <div className={cn(
              "relative h-2 bg-gray-100 rounded-full my-8 overflow-hidden",
              "before:content-[''] before:absolute before:h-full before:bg-rose-400 before:left-0 before:rounded-full",
              !hasReducedMotion && "before:animate-progress"
            )}></div>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {scheduleData.map((day, index) => (
              <div 
                key={index}
                ref={(el) => (elementsRef.current[8 + index] = el)} 
                className={cn(
                  "glass-card p-5 reveal-on-scroll transition-all duration-300",
                  "hover:shadow-xl cursor-pointer",
                  highlightedDay === index ? "ring-2 ring-rose-300 shadow-lg" : ""
                )}
                style={{ transitionDelay: `${(index % 3) * 100}ms` }}
                onMouseEnter={() => setHighlightedDay(index)}
                onMouseLeave={() => setHighlightedDay(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-rose-600">{day.day}</h3>
                  {!hasReducedMotion && highlightedDay === index && (
                    <Sparkles size={16} className="text-amber-400 animate-pulse" />
                  )}
                </div>
                <div className="rounded bg-rose-50 px-2 py-1 text-xs text-rose-700 inline-block mb-3">
                  {day.theme}
                </div>
                <ul className="space-y-2.5">
                  {day.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <span className="text-gray-400 mr-1.5 font-mono inline-block w-[1ch]">
                        {highlightedDay === index && !hasReducedMotion ? "♪" : "•"}
                      </span>
                      <span className="text-gray-700">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
