
import React from 'react';
import { Check, Calendar, Clock, Music, Mic, Award, BookOpen, Globe, Heart } from 'lucide-react';

const RequirementCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex gap-5 p-6 rounded-xl">
    <div className="shrink-0 mt-1">
      <div className="w-10 h-10 bg-apple-blue/10 rounded-full flex items-center justify-center text-apple-blue">
        <Icon size={20} />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-apple-dark mb-2">{title}</h3>
      <p className="text-sm text-apple-dark/80 leading-relaxed">{description}</p>
    </div>
  </div>
);

const ApplicationRequirements = () => {
  return (
    <section id="requirements" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold mb-4 text-apple-dark tracking-tight">
            Programme Requirements
          </h2>
          <p className="text-lg md:text-xl font-sans mb-10 text-apple-blue/90 font-normal max-w-2xl mx-auto">
            To ensure all participants benefit fully from our intensive programme, we look for the following qualifications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <RequirementCard 
            icon={Music}
            title="Vocal Proficiency"
            description="Applicants should have at least 2 years of vocal training or equivalent experience. All voice types and genres are welcome."
          />
          
          <RequirementCard 
            icon={BookOpen}
            title="Music Theory Knowledge"
            description="Basic understanding of music theory is required. Applicants should be able to read musical notation and understand fundamental concepts."
          />
          
          <RequirementCard 
            icon={Calendar}
            title="Availability"
            description="Full attendance for the entire programme duration (June 15 - July 30, 2025) is mandatory. Participants must commit to all classes and performances."
          />
          
          <RequirementCard 
            icon={Award}
            title="Performance Experience"
            description="Previous performance experience (recitals, choirs, musicals, etc.) is highly recommended but not mandatory for all applicants."
          />
          
          <RequirementCard 
            icon={Heart}
            title="Passion & Dedication"
            description="We look for students who demonstrate genuine passion for vocal arts and commitment to developing their craft."
          />
          
          <RequirementCard 
            icon={Globe}
            title="Language Proficiency"
            description="Classes will be conducted in English. Non-native speakers should have sufficient proficiency to follow instruction and participate fully."
          />
        </div>

        <div className="mt-16 bg-apple-gray-light/30 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-apple-dark mb-4">Application Materials</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="text-apple-blue mt-1 shrink-0" size={18} />
              <p className="text-apple-dark/80">
                <span className="font-medium">Audition Recording</span>: Two contrasting pieces (3-5 minutes each) showcasing your range and technical ability
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="text-apple-blue mt-1 shrink-0" size={18} />
              <p className="text-apple-dark/80">
                <span className="font-medium">Personal Statement</span>: 500-word essay explaining your musical background, goals, and why you want to join the programme
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="text-apple-blue mt-1 shrink-0" size={18} />
              <p className="text-apple-dark/80">
                <span className="font-medium">Recommendation Letter</span>: One letter from a vocal instructor, music teacher, or mentor familiar with your abilities
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="text-apple-blue mt-1 shrink-0" size={18} />
              <p className="text-apple-dark/80">
                <span className="font-medium">Music CV/Resume</span>: A document outlining your musical education, performances, and relevant experience
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="text-apple-blue mt-1 shrink-0" size={18} />
              <p className="text-apple-dark/80">
                <span className="font-medium">Application Form</span>: Complete personal information, contact details, and programme-specific questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationRequirements;
