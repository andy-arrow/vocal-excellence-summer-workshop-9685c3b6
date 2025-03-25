
import React from 'react';
import { Circle } from 'lucide-react';

const TimelineItem = ({ date, title, description, isActive = false, isLast = false }: { 
  date: string, 
  title: string, 
  description: string, 
  isActive?: boolean,
  isLast?: boolean
}) => (
  <div className="relative">
    {/* Timeline line */}
    {!isLast && (
      <div className="absolute left-3.5 top-6 h-full w-px bg-apple-gray-light/70"></div>
    )}
    
    <div className="flex gap-6">
      {/* Date circle */}
      <div className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
        isActive 
          ? "border-apple-blue bg-apple-blue text-white" 
          : "border-apple-gray-light bg-white"
      }`}>
        <Circle size={14} className={isActive ? "fill-white" : "fill-none"} />
      </div>
      
      {/* Content */}
      <div className="pb-10">
        <p className="text-sm text-apple-gray font-medium mb-1.5">{date}</p>
        <h3 className="text-lg font-semibold text-apple-dark mb-2">{title}</h3>
        <p className="text-sm text-apple-dark/80 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const ApplicationTimeline = () => {
  return (
    <section className="py-20 bg-apple-light/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold mb-4 text-apple-dark tracking-tight">
            Application Timeline
          </h2>
          <p className="text-lg font-sans mb-10 text-apple-blue/90 font-normal max-w-2xl mx-auto">
            Key dates and deadlines for the 2025 Summer Voice Programme
          </p>
        </div>

        <div className="mt-10">
          <TimelineItem 
            date="December 1, 2024"
            title="Applications Open"
            description="Online application portal opens. Early submissions are encouraged to allow ample time for processing your materials."
            isActive={true}
          />
          
          <TimelineItem 
            date="February 15, 2025"
            title="Application Deadline"
            description="Final date to submit your complete application package, including all supporting materials and recordings."
          />
          
          <TimelineItem 
            date="March 1-31, 2025"
            title="Application Review"
            description="Our faculty panel reviews all application materials. Selected candidates may be contacted for additional information."
          />
          
          <TimelineItem 
            date="April 10, 2025"
            title="Acceptance Notifications"
            description="All applicants will be notified of their application status via email."
          />
          
          <TimelineItem 
            date="May 1, 2025"
            title="Enrollment Confirmation"
            description="Accepted students must confirm their participation and submit a non-refundable deposit to secure their place."
          />
          
          <TimelineItem 
            date="July 14, 2025"
            title="Programme Begins"
            description="Welcome orientation and first sessions at our campus facilities."
            isLast={true}
          />
        </div>

        <div className="mt-10 bg-white p-6 rounded-xl border border-apple-gray-light/30">
          <h3 className="text-lg font-semibold text-apple-dark mb-4">Important Notes</h3>
          <ul className="space-y-2 text-sm text-apple-dark/80">
            <li className="flex items-start gap-2">
              <span className="text-apple-blue font-bold">•</span>
              <span>All materials must be received by the application deadline. Incomplete applications cannot be considered.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-apple-blue font-bold">•</span>
              <span>Financial aid applications are due at the same time as the program application (February 15, 2025).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-apple-blue font-bold">•</span>
              <span>International applicants should apply early to allow ample time for visa processing if accepted.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-apple-blue font-bold">•</span>
              <span>All participants must be available for the entire programme duration (July 14-18, 2025).</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ApplicationTimeline;
