
import React from 'react';
import { CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// Testimonials images (using provided or fallback placeholders)
const testimonials = [
  {
    photo: "/lovable-uploads/5f2b13ba-7279-45da-86e2-af6b9c336634.png",
    name: "Sophia Martinez",
    voice: "Soprano",
    quote: "After the workshop, I landed my first major audition—my self-tape looked and sounded professional for the first time.",
    success: "Booked paid gigs at three regional theaters."
  },
  {
    photo: "/lovable-uploads/23077377-fca0-46d4-b7c8-83c2a2edcb19.png",
    name: "Michael Johnson",
    voice: "Tenor",
    quote: "The individual attention completely changed my technique. I felt confident—no more second-guessing.",
    success: "Signed with a new agent and got cast in a touring company."
  },
  {
    photo: "/lovable-uploads/e26c0944-dc77-4d19-8059-c61e7800b8d1.png",
    name: "Alina Petrov",
    voice: "Mezzo-soprano",
    quote: "Never imagined I'd leave with a polished video reel and deeper network—so much more than vocal tips.",
    success: "Now performing lead roles across Cyprus."
  }
];

const featuresBenefits = [
  {
    feature: "45-minute Private Lesson",
    benefit: "Leave with a polished audition piece coached by a top pro.",
    iconClass: "text-energy-purple"
  },
  {
    feature: "Pro Video Recording",
    benefit: "Take home your best performance as a high-quality audition reel.",
    iconClass: "text-energy-pink"
  },
  {
    feature: "Alexander Technique Workshops",
    benefit: "Perform with greater freedom, confidence, and less tension.",
    iconClass: "text-energy-cyan"
  },
  {
    feature: "Vocal Health Seminar (Physician-led)",
    benefit: "Learn to avoid injury and keep your voice strong for auditions.",
    iconClass: "text-energy-yellow"
  },
  {
    feature: "Industry Faculty & Peer Network",
    benefit: "Build life-changing connections with working pros and fellow singers.",
    iconClass: "text-energy-green"
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#fbfbfd]">
      <div className="max-w-[980px] mx-auto px-6 md:px-8">
        {/* 1. Story/Problem */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-[40px] md:text-[48px] font-semibold text-apple-text mb-4 tracking-tight leading-tight">
            Feeling stuck auditioning—or not landing callbacks?
          </h2>
          <div className="w-16 h-0.5 bg-apple-blue mb-6 opacity-30"></div>
          <p className="text-[21px] font-light text-apple-text max-w-2xl mx-auto mb-6">
            You know you have the talent, but the right coaching, health support, and a killer audition video reel are the missing keys.
          </p>
        </div>

        {/* 2. Agitate (Bullets) */}
        <ul className="grid md:grid-cols-2 gap-6 mb-14 max-w-3xl mx-auto text-left">
          <li className="flex items-start gap-3">
            <CheckCircle className="text-apple-blue mt-1.5 w-6 h-6" />
            <span className="text-lg text-apple-text">Stuck sending the same generic clips—no callbacks?</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-apple-blue mt-1.5 w-6 h-6" />
            <span className="text-lg text-apple-text">Unclear on how to make your voice “pop” on stage and video?</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-apple-blue mt-1.5 w-6 h-6" />
            <span className="text-lg text-apple-text">Worried your vocal health is holding you back?</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="text-apple-blue mt-1.5 w-6 h-6" />
            <span className="text-lg text-apple-text">Want to connect with industry pros—real opportunities?</span>
          </li>
        </ul>

        {/* 3. Solution & Benefit-Feature Pairing */}
        <div className="flex flex-col items-center text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-apple-blue mb-4">
            Solution: 5 Days to Your Audition Breakthrough
          </h3>
          <p className="text-[20px] text-apple-grey font-light mb-3 max-w-xl mx-auto">
            What you gain—in studio, on video, and in the industry:
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-7 mb-20">
          {featuresBenefits.map((item, idx) => (
            <motion.div
              key={item.feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl border border-[#d2d2d7] flex flex-col shadow-sm hover:shadow-lg transition-all"
            >
              <h4 className="text-lg font-semibold text-apple-text mb-2 flex items-center gap-2">
                <span className={`inline-block rounded-full w-3 h-3 ${item.iconClass} mr-2`} />
                {item.feature}
              </h4>
              <span className="text-apple-blue text-[17px] font-medium mb-1 block">
                &rarr; {item.benefit}
              </span>
            </motion.div>
          ))}
        </div>

        {/* 4. Proof/Testimonials */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-apple-text text-center mb-8">
            What Past Participants Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-[#d2d2d7] shadow-sm hover:shadow-lg p-6 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden bg-apple-light mb-4 border-4 border-apple-light">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="font-bold text-apple-text">{t.name}</div>
                <div className="uppercase text-sm tracking-wider text-apple-grey mb-2">{t.voice}</div>
                <div className="italic text-apple-grey text-md mb-2">"{t.quote}"</div>
                <span className="text-apple-blue text-sm font-medium">{t.success}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. Call to Action */}
        <motion.div
          className="mt-12 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-[28px] font-semibold text-apple-blue mb-2 text-center">
            Ready for your next big audition?
          </h3>
          <p className="text-lg text-apple-text font-light mb-7 text-center">
            The workshop is limited to 20 singers. Deadline: <span className="font-semibold">May 15</span>.
          </p>
          <a
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-4 bg-apple-blue text-white rounded-full text-lg font-medium transition-all duration-300 hover:bg-apple-blue-hover"
          >
            Reserve My Spot
            <Star className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

