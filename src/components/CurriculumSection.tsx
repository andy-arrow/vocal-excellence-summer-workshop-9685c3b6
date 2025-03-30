import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, Book, Mic, Users, Theater, Monitor } from 'lucide-react';

const modules = [
  {
    title: "Vocal Technique & Health",
    description: "Master the fundamentals of healthy vocal production, breath control, resonance, and range extension.",
    icon: <Mic className="w-8 h-8 text-burgundy" />,
    highlights: [
      "Breath support and management",
      "Vocal placement and resonance",
      "Range extension techniques",
      "Vocal health and maintenance"
    ]
  },
  {
    title: "Performance Mastery",
    description: "Develop compelling stage presence, emotional connection, and authentic performance skills.",
    icon: <Theater className="w-8 h-8 text-burgundy" />,
    highlights: [
      "Stage presence and movement",
      "Emotional connection to text",
      "Microphone technique",
      "Audience engagement strategies"
    ]
  },
  {
    title: "Repertoire Development",
    description: "Expand your repertoire across genres while receiving guidance on appropriate song selection.",
    icon: <Book className="w-8 h-8 text-burgundy" />,
    highlights: [
      "Genre-specific technique",
      "Repertoire selection guidance",
      "Language and diction coaching",
      "Style and interpretation"
    ]
  },
  {
    title: "Ensemble & Collaborative Work",
    description: "Refine your skills in harmony, blend, and musical collaboration with fellow vocalists.",
    icon: <Users className="w-8 h-8 text-burgundy" />,
    highlights: [
      "Group harmony technique",
      "Ensemble blend and balance",
      "Collaborative performance",
      "Chamber music approaches"
    ]
  },
  {
    title: "Digital Presence & Recording",
    description: "Learn essential skills for recording, online performance, and building your digital presence.",
    icon: <Monitor className="w-8 h-8 text-burgundy" />,
    highlights: [
      "Recording studio techniques",
      "Online performance platforms",
      "Digital portfolio development",
      "Social media strategy"
    ]
  }
];

const scheduleData = [
  { day: "Monday", activities: ["Morning: Technique Workshop", "Afternoon: Individual Coaching", "Evening: Practice Sessions"] },
  { day: "Tuesday", activities: ["Morning: Repertoire Study", "Afternoon: Repertoire Study", "Evening: Guest Lecture"] },
  { day: "Wednesday", activities: ["Morning: Ensemble Work", "Afternoon: Performance Class", "Evening: Masterclass"] },
  { day: "Thursday", activities: ["Morning: Technique Workshop", "Afternoon: Recording Session", "Evening: Wellness Session"] },
  { day: "Friday", activities: ["Morning: Masterclass", "Afternoon: Performance Preparation", "Evening: Weekly Showcase"] },
  { day: "Weekends", activities: ["Optional excursions", "Practice time", "Special workshops"] }
];

const CurriculumSection = () => {
  const [activeTab, setActiveTab] = useState('modules');
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
    <section id="curriculum" ref={sectionRef} className="section-container">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="section-title reveal-on-scroll"
          >
            Curriculum & Schedule
          </h2>
          <p 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="section-subtitle reveal-on-scroll"
          >
            A comprehensive approach to vocal excellence
          </p>
        </div>

        {/* Tabs */}
        <div 
          ref={(el) => (elementsRef.current[2] = el)} 
          className="flex justify-center mb-10 reveal-on-scroll"
        >
          <div className="bg-sand-light rounded-full inline-flex p-1 shadow-inner">
            <button 
              className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${activeTab === 'modules' ? 'bg-white shadow text-burgundy' : 'text-navy/70 hover:text-navy'}`}
              onClick={() => setActiveTab('modules')}
            >
              <span className="flex items-center gap-2">
                <Book size={16} />
                Programme Modules
              </span>
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${activeTab === 'schedule' ? 'bg-white shadow text-burgundy' : 'text-navy/70 hover:text-navy'}`}
              onClick={() => setActiveTab('schedule')}
            >
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                Weekly Schedule
              </span>
            </button>
          </div>
        </div>

        {/* Modules Tab Content */}
        <div className={`${activeTab === 'modules' ? 'block' : 'hidden'}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <div 
                key={index}
                ref={(el) => (elementsRef.current[3 + index] = el)} 
                className="glass-card p-6 reveal-on-scroll transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ transitionDelay: `${(index % 3) * 100}ms` }}
              >
                <div className="mb-4">{module.icon}</div>
                <h3 className="text-xl font-playfair font-semibold mb-2 text-navy-dark">{module.title}</h3>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <ul className="space-y-2">
                  {module.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-burgundy mr-2">•</span>
                      <span className="text-gray-700 text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Tab Content */}
        <div className={`${activeTab === 'schedule' ? 'block' : 'hidden'}`}>
          <div 
            ref={(el) => (elementsRef.current[8] = el)} 
            className="reveal-on-scroll glass-card p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-burgundy" />
              <h3 className="text-xl font-playfair font-semibold text-navy-dark">Daily Structure</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Each day at the Vocal Excellence Academy is carefully structured to balance intensive learning with adequate rest and reflection time. The programme runs Monday through Friday, with optional weekend activities and personal practice time.
            </p>
            <p className="text-gray-700">
              Morning sessions focus on technical skill building, while afternoons are dedicated to application and creative development. Evening sessions vary between performances, masterclasses, and collaborative projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scheduleData.map((day, index) => (
              <div 
                key={index}
                ref={(el) => (elementsRef.current[9 + index] = el)} 
                className="glass-card p-6 reveal-on-scroll transform transition-all duration-300 hover:shadow-xl"
                style={{ transitionDelay: `${(index % 3) * 100}ms` }}
              >
                <h3 className="text-lg font-playfair font-semibold mb-3 text-burgundy border-b border-sand pb-2">{day.day}</h3>
                <ul className="space-y-3">
                  {day.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-navy mr-2">•</span>
                      <span className="text-gray-700 text-sm">{activity}</span>
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
