import React, { useState, useRef, useEffect } from 'react';
import { GraduationCap, Mic, Award, Headphones, Video, Clock, ChevronUp, ChevronDown, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
    title: "World-Class Faculty",
    description: "Learn from internationally renowned teachers from top conservatories and universities.",
    icon: <GraduationCap className="w-8 h-8 text-apple-blue" />,
    highlights: [
      "45-minute private lesson with master teachers",
      "30-minute dedicated accompanist sessions",
      "Personalized feedback and mentoring",
      "Active industry professionals as mentors"
    ],
    iconBg: "bg-apple-light"
  },
  {
    title: "Performance Mastery",
    description: "Comprehensive approach to performance excellence and stage presence.",
    icon: <Award className="w-8 h-8 text-apple-blue" />,
    highlights: [
      "Alexander Technique workshops",
      "Stage anxiety management training",
      "Mock audition experience",
      "Professional performance recordings"
    ],
    iconBg: "bg-apple-light"
  },
  {
    title: "Professional Development",
    description: "Build your career with industry-standard preparation and connections.",
    icon: <Mic className="w-8 h-8 text-apple-blue" />,
    highlights: [
      "Audition preparation masterclasses",
      "Industry networking opportunities",
      "Professional recording portfolio",
      "Career strategy sessions"
    ],
    iconBg: "bg-apple-light"
  },
  {
    title: "Holistic Artist Care",
    description: "360° approach to vocal health and artistic development.",
    icon: <Headphones className="w-8 h-8 text-apple-blue" />,
    highlights: [
      "Vocal health seminar with medical professionals",
      "Physical wellness workshops",
      "Performance psychology coaching",
      "Long-term sustainability strategies"
    ],
    iconBg: "bg-apple-light"
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

function ModulesContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      {modules.map((module, index) => (
        <Card 
          key={`module-${index}`}
          className={cn(
            "hover:shadow-lg hover:-translate-y-1 group transition-all duration-300",
            "bg-white/80 backdrop-blur-sm border border-apple-border"
          )}
        >
          <CardHeader className="pb-2 pt-4 md:pt-5">
            <div className={cn(
              "mb-3 w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center",
              module.iconBg
            )}>
              {module.icon}
            </div>
            <CardTitle className="text-lg md:text-xl font-medium text-apple-text group-hover:text-apple-blue transition-colors">
              {module.title}
            </CardTitle>
            <CardDescription className="text-apple-grey font-light text-sm md:text-base mt-1">
              {module.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2 pb-4">
            <ul className="space-y-2 text-sm md:text-base">
              {module.highlights.map((highlight, idx) => (
                <li key={`highlight-${index}-${idx}`} className="flex items-start">
                  <span className="text-apple-blue mr-2 mt-1 flex-shrink-0">•</span>
                  <span className="text-apple-text">{highlight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ScheduleContent() {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  return (
    <>
      <Card className="mb-4 bg-white border border-gray-100 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3 pb-2 pt-4">
          <Clock className="w-5 h-5 md:w-6 md:h-6 text-rose-500" />
          <CardTitle className="text-lg md:text-xl font-serif font-medium text-gray-800">
            Your Daily Rhythm
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <p className="text-gray-700 mb-3 text-sm md:text-base">
            Each day at Vocal Excellence has its own rhythm and focus, creating a comprehensive experience that builds your vocal abilities sequentially. The program structure balances intensive learning with adequate rest periods for vocal recovery.
          </p>
          
          <div className="relative h-2 bg-gray-100 rounded-full my-4 overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-rose-400 to-rose-500 left-0 rounded-full" 
              style={{ width: '100%' }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3 mb-4">
        {scheduleData.map((day, index) => (
          <Collapsible
            key={`day-${index}`}
            open={expandedDay === day.day}
            onOpenChange={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
            className="border border-gray-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between">
              <div className="flex flex-col items-start text-left">
                <h3 className="text-base md:text-lg font-medium text-rose-600">{day.day}</h3>
                <div className="rounded bg-rose-50 px-2 py-1 text-sm text-rose-700 inline-block mt-1">
                  {day.theme}
                </div>
              </div>
              <div className="text-rose-500 flex-shrink-0">
                {expandedDay === day.day ? (
                  <ChevronUp size={isMobile ? 18 : 20} />
                ) : (
                  <ChevronDown size={isMobile ? 18 : 20} />
                )}
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="px-4 pb-3 pt-1">
              <ul className="space-y-2 text-sm">
                {day.activities.map((activity, idx) => (
                  <li key={`activity-${index}-${idx}`} className="flex items-start">
                    <span className="text-rose-500 mr-2 mt-1 flex-shrink-0">•</span>
                    <span className="text-gray-700">{activity}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      <Card className="bg-white border border-gray-100 shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-lg md:text-xl font-serif font-medium text-gray-800">
            Key Logistics & Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <ul className="space-y-2 text-sm md:text-base">
            {logisticsData.map((item, index) => (
              <li key={`logistics-${index}`} className="flex items-start">
                <span className="text-rose-500 mr-2 mt-1 flex-shrink-0">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

const CurriculumSection = () => {
  const [activeTab, setActiveTab] = useState('modules');
  const isMobile = useIsMobile();
  
  const handleTabChange = (value: string) => {
    console.log('Tab changed to:', value);
    setActiveTab(value);
  };

  const ModulesTab = React.useMemo(() => <ModulesContent />, []);
  const ScheduleTab = React.useMemo(() => <ScheduleContent />, []);

  return (
    <section id="curriculum" className="py-12 md:py-16 px-3 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Your Summer Crescendo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A daily rhythm designed to elevate your vocal artistry
          </p>
        </div>

        <div className="mb-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="flex justify-center mb-4">
              <TabsList className="shadow-md max-w-md bg-gray-50">
                <TabsTrigger value="modules">
                  <div className="flex items-center justify-center space-x-2">
                    <Mic size={isMobile ? 16 : 18} />
                    <span className="font-medium">Program Modules</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="schedule">
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar size={isMobile ? 16 : 18} />
                    <span className="font-medium">Daily Schedule</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="tab-content">
              {activeTab === 'modules' && ModulesTab}
              {activeTab === 'schedule' && ScheduleTab}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
