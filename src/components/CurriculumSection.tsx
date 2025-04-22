import React, { useState } from 'react';
import { Mic, Calendar, ChevronUp, ChevronDown, GraduationCap, Award, Headphones, Clock } from 'lucide-react';
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
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import CurriculumScheduleTable from "./CurriculumScheduleTable";
import HousingInfoPanel from "./HousingInfoPanel";
import CurriculumDownloadModal from "./CurriculumDownloadModal";

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

const facultyMembers = [
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

function ModulesContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {modules.map((module, index) => (
        <motion.div
          key={`module-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="group overflow-hidden bg-white/80 backdrop-blur-xl border border-apple-border/10 rounded-3xl hover:shadow-2xl transition-all duration-500">
            <CardHeader className="pb-2 pt-6 md:pt-8">
              <div className={cn(
                "mb-4 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center",
                "bg-apple-light group-hover:bg-apple-blue/10 transition-colors duration-500"
              )}>
                {module.icon}
              </div>
              <CardTitle className="text-xl md:text-2xl font-medium text-apple-text group-hover:text-apple-blue transition-colors duration-500">
                {module.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <p className="text-apple-grey text-base mb-4 font-light">{module.description}</p>
              <ul className="space-y-3">
                {module.highlights.map((highlight, idx) => (
                  <motion.li
                    key={`highlight-${index}-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (index * 0.1) + (idx * 0.05) }}
                    className="flex items-start group/item"
                  >
                    <span className="text-apple-blue mr-3 mt-1.5 flex-shrink-0 text-sm">•</span>
                    <span className="text-apple-text/90 group-hover/item:text-apple-text transition-colors duration-300">
                      {highlight}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function ScheduleContent() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="flex-1 min-w-0">
        <Card className="mb-8 bg-white/80 backdrop-blur-xl border border-apple-border/10 rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-4 pt-6 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-apple-light flex items-center justify-center">
              <Clock className="w-5 h-5 text-apple-blue" />
            </div>
            <CardTitle className="text-xl md:text-2xl font-medium text-apple-text">
              Typical Week: Session & Block Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-6">
            <p className="text-apple-grey text-base font-light">
              Every day offers focused training blocks to maximize your progress and community connections.
            </p>
          </CardContent>
        </Card>
        <CurriculumScheduleTable />
        <div className="py-6 flex justify-center">
          <button
            className="bg-apple-blue hover:bg-apple-blue-hover text-white px-6 py-3 rounded-full font-medium shadow transition"
            onClick={() => setModalOpen(true)}
          >
            Download Curriculum + Travel Tips (PDF)
          </button>
        </div>
        <CurriculumDownloadModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
      <div className="lg:w-[340px] flex-shrink-0">
        <HousingInfoPanel />
      </div>
    </div>
  );
}

const CurriculumSection = () => {
  const [activeTab, setActiveTab] = useState('modules');
  const isMobile = useIsMobile();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <section id="curriculum" className="py-20 md:py-24 px-6 md:px-8 bg-gradient-to-b from-white to-apple-light/50">
      <div className="max-w-[980px] mx-auto">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-medium text-apple-text mb-4">
            Your Summer Crescendo
          </h2>
          <p className="text-lg md:text-xl text-apple-grey font-light max-w-2xl mx-auto">
            A daily rhythm designed to elevate your vocal artistry
          </p>
        </motion.div>

        <div className="mb-4">
          <Tabs 
            value={activeTab} 
            onValueChange={handleTabChange} 
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white/80 backdrop-blur-sm rounded-xl border border-apple-border/10 p-1 shadow-sm">
                <TabsTrigger 
                  value="modules"
                  className="min-w-[180px] rounded-lg px-8 py-3 text-base font-medium transition-all data-[state=active]:bg-apple-blue data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Mic size={isMobile ? 16 : 18} className="opacity-80" />
                    <span>Program Modules</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule"
                  className="min-w-[180px] rounded-lg px-8 py-3 text-base font-medium transition-all data-[state=active]:bg-apple-blue data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar size={isMobile ? 16 : 18} className="opacity-80" />
                    <span>Daily Schedule</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'modules' && <ModulesContent />}
                {activeTab === 'schedule' && <ScheduleContent />}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
