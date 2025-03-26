
import React from 'react';

const ApplicationTimeline = () => {
  const timelineItems = [
    {
      date: "March 1, 2025",
      title: "Applications Open",
      description: "Early application is encouraged as spaces fill quickly."
    },
    {
      date: "May 15, 2025",
      title: "Application Deadline",
      description: "All materials must be submitted by this date."
    },
    {
      date: "June 1, 2025",
      title: "Final Notifications",
      description: "All applicants will be notified of their acceptance status."
    },
    {
      date: "June 15, 2025",
      title: "Tuition Deadline",
      description: "Full payment due to secure your place."
    },
    {
      date: "July 14, 2025",
      title: "Program Begins",
      description: "Welcome reception and orientation."
    }
  ];

  return (
    <section className="py-16 md:py-20 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-light mb-8 text-gray-800">
            Application Timeline
          </h2>
          
          <div className="space-y-8">
            {timelineItems.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="w-24 flex-shrink-0 text-sm text-gray-500 font-light mt-0.5">
                  {item.date}
                </div>
                <div className="ml-6 border-l border-gray-200 pl-6 pb-2">
                  <h3 className="text-lg font-serif font-light text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationTimeline;
