
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, Book, Mic, Users, Theater, Music, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    theme: "Foundation Day (08:00–19:00)",
    activities: [
      "08:00–09:00: Group Welcome & Warm-Up – Icebreakers, daily goals, and vocal warm-ups.",
      "09:00–09:45: Alexander Technique Group Session – Posture, breathwork, and physical awareness.",
      "09:45–11:45: Vocal Masterclass (Fundamentals) – Core techniques: resonance, articulation, and support.",
      "11:45–13:00: Individual Coaching/Free Studio Time – Book private 45-minute voice lessons in advance.",
      "13:00–14:30: Lunch Break – Catered options available; dietary restrictions accommodated.",
      "14:30–16:30: Acting Workshop (Scene Work) – Character analysis and emotional authenticity.",
      "16:30–18:30: Choir Practice – Blend, dynamics, and repertoire introduction.",
      "18:30–19:00: Reflection & Wind-Down – Stretching, journaling, or informal peer feedback."
    ] 
  },
  { 
    day: "Tuesday", 
    theme: "Repertoire Focus (08:00–19:00)",
    activities: [
      "08:00–09:00: Group Check-In & Goal Setting – Share progress and challenges.",
      "09:00–09:45: Alexander Technique Group Session – Movement efficiency and tension release.",
      "09:45–11:45: Vocal Masterclass (Repertoire) – Guest artist-led session on interpretation and style.",
      "11:45–13:00: Repertoire Coaching/Free Studio Time – Polish assigned pieces or seek feedback.",
      "13:00–14:30: Lunch Break.",
      "14:30–16:30: Acting Workshop (Improv & Text Analysis) – Spontaneity and subtext exploration.",
      "16:30–18:30: Choir Practice – Refining harmonies and transitions.",
      "18:30–19:00: Wrap-Up & Peer Feedback – Share takeaways from the day."
    ] 
  },
  { 
    day: "Wednesday", 
    theme: "Collaborative Day (08:00–19:00)",
    activities: [
      "08:00–09:00: Group Energizer & Vocal Warm-Ups – Collaborative games and stretches.",
      "09:00–09:45: Alexander Technique Group Session – Spatial awareness and ensemble alignment.",
      "09:45–11:45: Acting Masterclass (Collaborative Performance) – Partner work and staging.",
      "11:45–13:00: Ensemble Rehearsal/Free Studio Time – Focus on group pieces or solos.",
      "13:00–14:30: Lunch Break.",
      "14:30–16:30: Acting Workshop (Physical Theatre) – Body language and nonverbal storytelling.",
      "16:30–18:30: Choir Practice – Run ensemble piece with staging.",
      "18:30–19:00: Group Reflection – Discuss challenges and breakthroughs."
    ] 
  },
  { 
    day: "Thursday", 
    theme: "Performance Prep (08:00–19:00)",
    activities: [
      "08:00–09:00: Group Check-In & Vocal Warm-Ups – Mental and vocal readiness.",
      "09:00–09:45: Alexander Technique Group Session – Confidence-building for stage presence.",
      "09:45–11:45: Vocal Masterclass (Performance Techniques) – Audition skills and audience engagement.",
      "11:45–13:00: Performance Coaching/Free Studio Time – Final polish for solos.",
      "13:00–14:30: Lunch Break.",
      "14:30–16:30: Acting Workshop (Monologues) – Emotional vulnerability and projection.",
      "16:30–18:30: Choir Practice – Full run-through with accompanist.",
      "18:30–19:00: Mindful Cool-Down – Guided relaxation and visualization."
    ] 
  },
  { 
    day: "Friday", 
    theme: "Culmination Day (08:00–21:00)",
    activities: [
      "08:00–09:00: Group Pep Talk & Warm-Up – Address nerves and celebrate progress.",
      "09:00–09:45: Alexander Technique Group Session – Centering and focus exercises.",
      "09:45–11:45: Final Rehearsals – Individual run-throughs with faculty feedback.",
      "11:45–13:00: Ensemble Rehearsal/Free Studio Time – Coordinate transitions and cues.",
      "13:00–14:30: Lunch Break – Light meal provided to avoid fatigue.",
      "14:30–16:30: Acting Workshop (Final Adjustments) – Sharpening delivery and timing.",
      "16:30–18:30: Choir Dress Rehearsal – Full tech run in performance space.",
      "18:30–19:00: Accompanist Sessions – 25-minute slots per student (schedule in advance).",
      "19:00–21:00: Showcase Concert – Featuring solos and ensemble piece. Reception to follow."
    ] 
  }
];

const logisticsData = [
  "Private Lessons: Book your 45-minute voice lesson during free studio time via the sign-up sheet.",
  "Studio Access: Available 07:00–21:00 daily; reserve slots for ensemble rehearsals.",
  "Accompanist: Available for Friday rehearsals only; sheet music must be submitted 48 hours in advance.",
  "Concert Logistics: Semi-formal attire, tech rehearsal Friday 16:30–18:30 (mandatory), limited to 2 guests per participant (RSVP required).",
  "Materials: Bring a notebook, water bottle, and performance scores daily."
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
          <Tabs 
            defaultValue="modules" 
            className="w-full" 
            onValueChange={(value) => setActiveTab(value)}
          >
            <div className="flex justify-center">
              <TabsList className="glass-card bg-transparent shadow-md">
                <TabsTrigger 
                  value="modules"
                  className="data-[state=active]:bg-white data-[state=active]:text-rose-600"
                >
                  <Music size={16} className="mr-2" />
                  Program Modules
                  {activeTab === 'modules' && !hasReducedMotion && (
                    <span className="text-rose-400 animate-float ml-1">♪</span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule"
                  className="data-[state=active]:bg-white data-[state=active]:text-rose-600"
                >
                  <Calendar size={16} className="mr-2" />
                  Daily Schedule
                  {activeTab === 'schedule' && !hasReducedMotion && (
                    <span className="text-rose-400 animate-float ml-1">♫</span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Modules Tab Content */}
            <TabsContent value="modules" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {modules.map((module, index) => (
                  <Card 
                    key={index}
                    ref={(el) => (elementsRef.current[3 + index] = el)} 
                    className={cn(
                      "glass-card reveal-on-scroll transform transition-all duration-300",
                      "hover:shadow-xl hover:-translate-y-1 group"
                    )}
                    style={{ transitionDelay: `${(index % 3) * 100}ms` }}
                  >
                    <CardHeader>
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
                      <CardTitle className="text-xl font-serif font-medium text-gray-800 group-hover:text-rose-600 transition-colors">
                        {module.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 font-light">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2.5">
                        {module.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-rose-500 mr-2 mt-0.5">♪</span>
                            <span className="text-gray-700 text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Schedule Tab Content */}
            <TabsContent value="schedule" className="mt-6">
              <Card 
                ref={(el) => (elementsRef.current[7] = el)} 
                className="reveal-on-scroll glass-card mb-8"
              >
                <CardHeader className="flex flex-row items-center gap-3">
                  <Clock className="w-6 h-6 text-rose-500" />
                  <CardTitle className="text-xl font-serif font-medium text-gray-800">
                    Your Daily Rhythm
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Each day at Vocal Excellence has its own rhythm and focus, creating a comprehensive experience that builds your vocal abilities sequentially. The program structure balances intensive learning with adequate rest periods for vocal recovery.
                  </p>
                  
                  {/* Visual timeline */}
                  <div className={cn(
                    "relative h-2 bg-gray-100 rounded-full my-8 overflow-hidden",
                    "before:content-[''] before:absolute before:h-full before:bg-rose-400 before:left-0 before:rounded-full",
                    !hasReducedMotion && "before:animate-progress"
                  )}></div>
                </CardContent>
              </Card>

              <Accordion type="single" collapsible className="mb-8">
                {scheduleData.map((day, index) => (
                  <AccordionItem 
                    key={index}
                    value={`day-${index}`}
                    className={cn(
                      "glass-card mb-4 overflow-hidden border-0",
                      "data-[state=open]:shadow-md"
                    )}
                  >
                    <AccordionTrigger 
                      className="px-6 py-4 hover:no-underline"
                      onMouseEnter={() => setHighlightedDay(index)}
                      onMouseLeave={() => setHighlightedDay(null)}
                    >
                      <div className="flex flex-col items-start text-left">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-rose-600">{day.day}</h3>
                          {!hasReducedMotion && highlightedDay === index && (
                            <Sparkles size={16} className="text-amber-400 animate-pulse ml-2" />
                          )}
                        </div>
                        <div className="rounded bg-rose-50 px-2 py-1 text-xs text-rose-700 inline-block mt-1">
                          {day.theme}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <ul className="space-y-3 mt-2">
                        {day.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-rose-500 mr-2 mt-0.5">•</span>
                            <span className="text-gray-700">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-xl font-serif font-medium text-gray-800">
                    Key Logistics & Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {logisticsData.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-rose-500 mr-2 mt-0.5">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
