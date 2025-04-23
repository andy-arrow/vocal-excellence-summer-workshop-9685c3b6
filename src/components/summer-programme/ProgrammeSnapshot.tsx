
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const programDays = [
  {
    day: "DAY 1",
    title: "Technique Foundations",
    schedule: [
      "9:00 AM - Welcome & Orientation",
      "10:00 AM - Vocal Assessment",
      "12:00 PM - Lunch Break",
      "1:30 PM - Breath Control Masterclass",
      "3:30 PM - Repertoire Selection",
      "5:00 PM - Day Review & Practice Assignment"
    ]
  },
  {
    day: "DAY 2",
    title: "Performance Development",
    schedule: [
      "9:00 AM - Morning Warm-up",
      "10:00 AM - Individual Coaching",
      "12:00 PM - Lunch Break",
      "1:30 PM - Performance Techniques Workshop",
      "3:30 PM - Group Rehearsal",
      "5:00 PM - Faculty Performance"
    ]
  },
  {
    day: "DAY 3",
    title: "Musical Interpretation",
    schedule: [
      "9:00 AM - Morning Warm-up",
      "10:00 AM - Emotional Connection Workshop",
      "12:00 PM - Lunch Break",
      "1:30 PM - Individual Coaching",
      "3:30 PM - Style & Genre Exploration",
      "5:00 PM - Group Critique Session"
    ]
  }
];

const ProgrammeSnapshot = () => {
  return (
    <section className="mb-20">
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-light text-apple-text mb-4">
          Programme Schedule
        </h2>
        <div className="w-16 h-px bg-apple-border mx-auto"></div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="grid gap-8 min-w-[600px]">
          {programDays.map((day, index) => (
            <Card key={index} className="overflow-hidden border-apple-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="bg-apple-light px-6 py-4 border-b border-apple-border">
                  <h3 className="text-xl font-light text-apple-text">{day.day}: {day.title}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {day.schedule.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                        <span className="text-apple-grey">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Button 
          variant="outline" 
          className="border-apple-blue text-apple-blue hover:bg-apple-blue/5"
        >
          View Full 5-Day Schedule
        </Button>
      </div>
    </section>
  );
};

export default ProgrammeSnapshot;
