
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
            The Summer Voice Programme is designed for advanced vocal students and emerging professional singers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <RequirementCard 
            icon={Music}
            title="Advanced Vocal Proficiency"
            description="Applicants should be advanced singers, typically at the conservatory level or early-career professionals. All voice types and backgrounds are welcome."
          />
          
          <RequirementCard 
            icon={BookOpen}
            title="Music Theory & Sight-Reading"
            description="Strong music theory foundation and ability to sight-read are required, as the program involves intensive score study and ensemble work."
          />
          
          <RequirementCard 
            icon={Calendar}
            title="Full Programme Commitment"
            description="Full attendance for the entire programme duration (July 5-31, 2025) is mandatory, including all classes, coachings, and performances."
          />
          
          <RequirementCard 
            icon={Award}
            title="Performance Experience"
            description="Previous solo performance experience in recitals, operas, or other public vocal performances is required."
          />
          
          <RequirementCard 
            icon={Heart}
            title="Artistic Commitment"
            description="We seek artists who demonstrate exceptional commitment to vocal artistry and a clear vision for their development and career goals."
          />
          
          <RequirementCard 
            icon={Globe}
            title="Language Proficiency"
            description="Classes are conducted in English. Some familiarity with singing in Italian, German, and French is beneficial but not required."
          />
        </div>

        <div className="mt-16 bg-apple-gray-light/30 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-apple-dark mb-4">Application Materials</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="text-apple-blue mt-1 shrink-0" size={18} />
              <p className="text-apple-dark/80">
                <span className="font-medium">Repertoire Recordings</span>: Two contrasting pieces that demonstrate your vocal range and technical proficiency (5 minutes max each)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="text-apple-blue mt-1 shrink-0" size={18} />
              <p className="text-apple-dark/80">
                <span className="font-medium">Statement of Purpose</span>: Describing your artistic goals and what you hope to achieve during the programme
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="text-apple-blue mt-1 shrink-0" size={18} />
              <p className="text-apple-dark/80">
                <span className="font-medium">Recommendation Letters</span>: Two letters from vocal teachers or music professionals familiar with your abilities
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="text-apple-blue mt-1 shrink-0" size={18} />
              <p className="text-apple-dark/80">
                <span className="font-medium">Curriculum Vitae</span>: Detailing your performance history, education, and vocal training
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="text-apple-blue mt-1 shrink-0" size={18} />
              <p className="text-apple-dark/80">
                <span className="font-medium">Repertoire List</span>: A list of works currently in your repertoire, organized by language and genre
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationRequirements;
