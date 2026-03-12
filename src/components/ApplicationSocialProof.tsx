import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      "I came to Limassol uncertain about my technique. I left with a filmed audition that got me into the Royal Northern College of Music. The coaching was the most direct, most honest I have ever received.",
    name: "Sofia M.",
    detail: "Cyprus · RNCM, Manchester",
  },
  {
    quote:
      "In seven days I made more progress than in the previous year of lessons. The faculty pushes you — but they push you because they know exactly where you can go.",
    name: "Lena K.",
    detail: "Germany · Trinity Laban, London",
  },
  {
    quote:
      "My daughter was nervous to apply. By the final performance she was unrecognisable — in the best possible way. The filmed audition she came home with opened every door.",
    name: "Parent of Participant",
    detail: "Greece · RAM Preparatory",
  },
];

const placements = [
  "Royal Academy of Music",
  "Royal Northern College of Music",
  "Trinity Laban Conservatoire",
  "Guildhall School of Music & Drama",
  "Conservatorio di Milano",
  "Royal Conservatoire of Scotland",
];

const ApplicationSocialProof = () => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 md:p-8 border-b border-[#e5e5e5]">
        <p className="text-xs font-semibold tracking-widest text-apple-blue uppercase mb-2">
          Results
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] mb-2 md:mb-3">
          Where Our Students Go
        </h2>
        <p className="text-[#666666] text-base md:text-lg leading-relaxed">
          Vocal Excellence alumni have gone on to conservatoires across the UK, Europe, and North America. Here is what participants say.
        </p>
      </div>

      {/* Testimonials */}
      <div className="grid md:grid-cols-3 gap-px bg-[#e5e5e5]">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white p-5 md:p-6 flex flex-col gap-4">
            <Quote className="w-6 h-6 text-apple-blue flex-shrink-0 opacity-60" />
            <p className="text-[#424245] text-sm md:text-base leading-relaxed flex-1 italic">
              "{t.quote}"
            </p>
            <div>
              <p className="text-[#1d1d1f] text-sm font-semibold">{t.name}</p>
              <p className="text-[#86868b] text-xs mt-0.5">{t.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placement logos / names */}
      <div className="p-5 md:p-8 bg-[#f5f5f7]">
        <p className="text-xs font-semibold tracking-widest text-[#86868b] uppercase mb-4">
          Alumni accepted to
        </p>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {placements.map((p, i) => (
            <span
              key={i}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-[#e5e5e5] text-[#424245] text-xs md:text-sm font-medium shadow-sm"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationSocialProof;
