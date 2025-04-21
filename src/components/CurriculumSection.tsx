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
      "08:00–09:00: Group Welcome & Warm-Up",
      "09:00–09:45: Alexander Technique Group Session",
      "09:45–11:45: Vocal Masterclass (Fundamentals)",
      "11:45–13:00: Individual Coaching Sessions",
      "13:00–14:30: Lunch Break",
      "14:30–16:30: Acting Workshop (Scene Work)",
      "16:30–18:30: Choir Practice",
      "18:30–19:00: Daily Reflection"
    ] 
  },
  { 
    day: "Tuesday", 
    theme: "Repertoire Focus (08:00–19:00)",
    activities: [
      "08:00–09:00: Group Check-In & Goal Setting",
      "09:00–09:45: Alexander Technique Group Session",
      "09:45–11:45: Vocal Masterclass (Repertoire)",
      "11:45–13:00: Repertoire Coaching",
      "13:00–14:30: Lunch Break",
      "14:30–16:30: Acting Workshop (Text Analysis)",
      "16:30–18:30: Ensemble Work",
      "18:30–19:00: Progress Review"
    ] 
  },
  { 
    day: "Wednesday", 
    theme: "Performance Technique (08:00–19:00)",
    activities: [
      "08:00–09:00: Group Warm-Up",
      "09:00–09:45: Alexander Technique Group Session",
      "09:45–11:45: Stage Presence Masterclass",
      "11:45–13:00: Individual Coaching Sessions",
      "13:00–14:30: Lunch Break",
      "14:30–16:30: Stage Movement Workshop",
      "16:30–18:30: Mock Audition Preparation",
      "18:30–19:00: Feedback Session"
    ] 
  },
  { 
    day: "Thursday", 
    theme: "Vocal Health & Industry (08:00–19:00)",
    activities: [
      "08:00–09:00: Group Warm-Up",
      "09:00–10:30: Vocal Health Seminar (Medical Professional)",
      "10:45–12:15: Industry Panel Discussion",
      "12:15–13:45: Networking Lunch",
      "13:45–15:45: Career Strategy Workshop",
      "16:00–18:00: Professional Recording Session",
      "18:00–19:00: Q&A with Industry Professionals"
    ] 
  },
  { 
    day: "Friday", 
    theme: "Showcase Day (08:00–21:00)",
    activities: [
      "08:00–09:00: Final Group Warm-Up",
      "09:00–10:30: Technical Rehearsal",
      "10:45–12:45: Dress Rehearsal",
      "12:45–14:15: Light Lunch & Rest Period",
      "14:15–16:15: Final Preparations",
      "16:30–18:30: Professional Showcase Performance",
      "19:00–21:00: Closing Reception & Networking"
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
      <Card className="mb-6 bg-white/80 backdrop-blur-sm border border-apple-border">
        <CardHeader className="flex flex-row items-center gap-3 pb-2 pt-4">
          <Clock className="w-5 h-5 md:w-6 md:h-6 text-apple-blue" />
          <CardTitle className="text-lg md:text-xl font-serif font-medium text-apple-text">
            Your Week at a Glance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <p className="text-apple-grey mb-3 text-sm md:text-base">
            Each day is carefully structured to maximize your learning and development, with a balance of technical training, performance practice, and industry insight.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {scheduleData.map((day, index) => (
          <Collapsible
            key={`day-${index}`}
            open={expandedDay === day.day}
            onOpenChange={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
            className="border border-apple-border rounded-xl bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300"
          >
            <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between">
              <div className="flex flex-col items-start text-left">
                <h3 className="text-base md:text-lg font-medium text-apple-blue">{day.day}</h3>
                <div className="text-sm text-apple-grey mt-1">
                  {day.theme}
                </div>
              </div>
              <div className="text-apple-blue flex-shrink-0">
                {expandedDay === day.day ? (
                  <ChevronUp size={isMobile ? 18 : 20} />
                ) : (
                  <ChevronDown size={isMobile ? 18 : 20} />
                )}
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="px-4 pb-4 pt-1">
              <ul className="space-y-2.5 text-sm md:text-base">
                {day.activities.map((activity, idx) => (
                  <li key={`activity-${index}-${idx}`} className="flex items-start">
                    <span className="text-apple-blue mr-2 mt-1.5 flex-shrink-0 text-xs">•</span>
                    <span className="text-apple-text">{activity}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
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
          <h2 className="didot-heading text-3xl md:text-4xl font-light text-gray-800 mb-2">
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
                    <span className="didot-heading font-medium">Program Modules</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="schedule">
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar size={isMobile ? 16 : 18} />
                    <span className="didot-heading font-medium">Daily Schedule</span>
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
