import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faculty = [
  {
    name: 'Andreas Aroditis',
    bio: 'Founder & Director. Juilliard graduate. Recognised by The New York Times and Opera Today. Mentored by Plácido Domingo and Sherrill Milnes. On faculty at the University of Nicosia and European University Cyprus.',
    italics: ['The New York Times', 'Opera Today'],
  },
  {
    name: 'Kate Batter',
    bio: 'Royal Academy of Music graduate. West End performer (The Phantom of the Opera, The Sound of Music). Over 20 years of elite vocal coaching. Founder of Sing Wimbledon.',
    italics: ['The Phantom of the Opera', 'The Sound of Music'],
  },
  {
    name: 'Carolyn Michelle Smith',
    bio: 'Juilliard graduate. Broadway performer. Screen credits include House of Cards, Luke Cage, and Russian Doll. Visiting Lecturer at Cornell University.',
    italics: ['House of Cards', 'Luke Cage', 'Russian Doll'],
  },
  {
    name: 'Ksenia Belolipetskaya',
    bio: 'Award-winning lyric coloratura soprano. Performed on stages including the Grand Hall of the Moscow Conservatory and Kammeroper Schloss Rheinsberg. Founder of LYRA Music & Arts, Limassol and Paphos.',
    italics: [],
  },
  {
    name: 'Aris Antoniades',
    bio: 'Fulbright Scholar. Manhattan School of Music alumnus. Artistic Director and Principal Conductor of the TrakArt Pops Orchestra. Collaborator with Grammy-nominated artists.',
    italics: [],
  },
  {
    name: 'Polina Panagiotou',
    bio: 'Director and choreographer. Performed at Lincoln Center and the Curium Ancient Amphitheater. Founder of City Stage Centre, Limassol.',
    italics: [],
  },
  {
    name: 'Emmeleia Pericleous',
    bio: "First in her master's class at the Sorbonne. Choral director at three Paris conservatories. Nominated for Madame Figaro Woman of the Year in Music. Instructor at the Cyprus Symphony Orchestra's educational programme.",
    italics: [],
  },
];

const strands = [
  {
    title: 'Vocal Technique',
    desc: 'Private 45-minute lessons with master teachers — each session supported by one of three resident concert pianists engaged for the full seven days. Before the programme opens, nine instruments across the studio — seven upright pianos and two grands — are professionally tuned.',
  },
  {
    title: 'Performance & Stage Presence',
    desc: 'Daily Alexander Technique sessions, anxiety management training, and live mock auditions held on the stage of the Laniteio Theatre, Limassol — with full professional sound, lighting, and video documentation.',
  },
  {
    title: 'Career Infrastructure',
    desc: 'Audition strategy masterclasses and one-to-one career planning with faculty who have navigated the same processes. A professional video crew is present for all seven days. Every participant leaves with a produced, edited 4K portfolio — ready for immediate submission to universities, conservatories, and agents.',
  },
  {
    title: 'Vocal Health & Longevity',
    desc: 'A dedicated seminar led by a licensed speech pathologist — a clinical examination of the voice as an instrument, covering hygiene protocols, physical maintenance, and the long-term demands of a professional career.',
  },
];

const paidTiers = [
  {
    name: 'Presenting Partner',
    price: '€15,000',
    places: 'One place.',
    impact: "Your contribution funds ten singers' complete participation.",
    perks: [
      'Named as Presenting Partner across all programme materials — printed, filmed, and digital',
      'Your name in the primary position on the homepage, all printed materials, and all filmed content',
      'Named in 4K video content sent to universities, conservatories, and agents worldwide',
      'Full-page acknowledgment in the printed programme booklet',
      'Acknowledged in communications to our academic and professional network',
      'Reserved place at the final showcase and filmed audition day',
    ],
  },
  {
    name: 'Partner',
    price: '€7,500',
    places: 'Two places.',
    impact: "Your contribution funds five singers' complete participation.",
    perks: [
      'Your name on the website, all printed materials, and participant welcome packs',
      'Named in 4K video content distributed to universities and conservatories worldwide',
      'Acknowledged in communications to our academic and professional network',
      'Half-page acknowledgment in the printed programme booklet',
      'Two invitations to the final showcase',
    ],
  },
  {
    name: 'Associate',
    price: '€3,000',
    places: 'Three places.',
    impact: "Your contribution funds two singers' complete participation.",
    perks: [
      'Acknowledged in the programme booklet',
      'Named at the opening and closing ceremonies',
      'Acknowledged in post-programme communications',
      'One invitation to the final showcase',
    ],
  },
  {
    name: 'Advocate',
    price: '€1,500',
    places: 'Open to multiple partners.',
    impact: "Your contribution funds one singer's complete participation.",
    perks: [
      'Acknowledged in the programme booklet',
      'Named at the opening ceremony',
      'One invitation to the final showcase',
    ],
  },
  {
    name: 'Supporter',
    price: '€750',
    places: 'Open to multiple partners.',
    impact: "Your contribution funds half of one singer's place.",
    perks: [
      'Acknowledged in the programme booklet',
      'Named at the closing ceremony',
      'Acknowledged in post-programme documentation',
    ],
  },
];

const stats = [
  { value: '30', label: 'Vocalists' },
  { value: '7', label: 'Days' },
  { value: '7', label: 'Faculty' },
  { value: '1:4', label: 'Ratio' },
];

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.45 },
};

function renderBio(bio: string, italics: string[]) {
  if (italics.length === 0) return bio;
  const pattern = new RegExp(
    `(${italics.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`
  );
  return bio.split(pattern).map((part, i) =>
    italics.includes(part) ? <em key={i}>{part}</em> : part
  );
}

const Sponsors = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Sponsors — Vocal Excellence</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="bingbot" content="noindex, nofollow" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
        <meta name="description" content="" />
      </Helmet>

      <Navbar />

      {/* 1 · Hero — bg-apple-light */}
      <section className="pt-48 pb-14 md:pb-20 bg-apple-light border-b border-apple-border">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div {...fadeIn} className="text-center mb-7 sm:mb-8">
            <p className="text-[10px] sm:text-xs font-semibold text-apple-text/60 uppercase tracking-[0.28em] mb-5 sm:mb-6">
              Partnerships
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight text-apple-text leading-[1.1]">
              This is not a summer school.
            </h1>
            <div className="w-10 h-px bg-apple-blue/40 mx-auto mt-5 sm:mt-6" />
          </motion.div>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="text-sm sm:text-base md:text-lg text-charcoal leading-relaxed">
              Vocal Excellence is a seven-day residential performance intensive — the only one of its kind in the Mediterranean. It brings together a carefully selected class of thirty emerging vocalists and places them in direct daily contact with a faculty of internationally active artists.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-charcoal leading-relaxed">
              A compressed, high-intensity training environment modelled on the rehearsal culture of professional performance — where coaches and participants work in close daily proximity, separated only by years of professional experience.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-apple-text font-medium leading-relaxed pt-1 sm:pt-2">
              The founding partners of Vocal Excellence join before the programme opens. Their names appear first — because they arrived first.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2 · Stats — bg-white */}
      <section className="py-8 sm:py-10 md:py-14 bg-white border-b border-apple-border">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div
            className="grid grid-cols-4 gap-0 mb-5 sm:mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`text-center py-2 ${i < stats.length - 1 ? 'border-r border-apple-border/40' : ''}`}
              >
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light text-apple-text">{stat.value}</p>
                <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-charcoal mt-0.5 leading-snug">{stat.label}</p>
              </div>
            ))}
          </motion.div>
          <motion.p
            className="text-center text-[11px] sm:text-xs md:text-sm text-charcoal italic leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            The 2026 programme runs{' '}
            <strong className="not-italic font-semibold text-apple-text">29 June – 5 July 2026</strong>
            , Limassol, Cyprus.{' '}
            <span className="block sm:inline mt-0.5 sm:mt-0">
              Partner positions must be confirmed before{' '}
              <strong className="not-italic font-semibold text-apple-text">24 May 2026</strong>.
            </span>
          </motion.p>
        </div>
      </section>

      {/* 3 · The Programme — bg-white */}
      <section className="py-10 sm:py-12 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div {...fadeIn} className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light tracking-tight text-apple-text mb-3">
              What you are funding.
            </h2>
            <p className="text-sm sm:text-base text-charcoal leading-relaxed">
              Participants are admitted through a competitive application process — recorded audition, personal statement, and teacher recommendation. Over seven days, the selected class moves through four interconnected strands of work:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {strands.map((strand, i) => (
              <motion.div
                key={strand.title}
                className="bg-apple-light rounded-xl p-4 sm:p-5 border border-apple-border hover:border-apple-blue/20 transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: 0.07 * i }}
              >
                <h3 className="text-sm sm:text-base font-semibold text-apple-text mb-1.5">{strand.title}</h3>
                <p className="text-xs sm:text-sm text-charcoal leading-relaxed">{strand.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="border-t border-apple-border pt-6 sm:pt-8 space-y-3 sm:space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <p className="text-sm sm:text-base text-charcoal leading-relaxed">
              The 2026 faculty includes master teachers flown in from New York and London — each representing a cost of upwards of €5,000 when flights, fees, and accommodation are combined. Every one of them chose to come. The programme's ability to attract faculty of this calibre, to this location, is not incidental. It is the result of years of relationship-building at the highest levels of the international performance world.
            </p>
            <p className="text-sm sm:text-base text-charcoal leading-relaxed">
              Every participant leaves with a professionally produced 4K video portfolio — a tangible, immediately usable asset for university auditions, conservatory applications, and casting submissions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3b · The Faculty — bg-apple-light (breaks the white sequence) */}
      <section className="py-10 sm:py-12 md:py-20 bg-apple-light border-t border-apple-border">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div {...fadeIn} className="mb-6 sm:mb-8">
            <p className="text-[10px] sm:text-xs font-semibold text-apple-text/50 uppercase tracking-[0.28em] mb-3">
              2026 Faculty
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light tracking-tight text-apple-text mb-2 sm:mb-3">
              The people in the room.
            </h2>
            <p className="text-sm sm:text-base text-charcoal leading-relaxed">
              Seven working professionals, each currently active in their field.
            </p>
          </motion.div>

          <div className="md:grid md:grid-cols-2 md:gap-x-10">
            {faculty.map((member, i) => (
              <motion.div
                key={member.name}
                className="py-4 sm:py-5 border-b border-apple-border first:border-t"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.3, delay: 0.04 * i }}
              >
                <p className="text-sm sm:text-base font-semibold text-apple-text mb-0.5 sm:mb-1">
                  {member.name}
                </p>
                <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                  {renderBio(member.bio, member.italics)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · The Founding Year — bg-white */}
      <section className="py-10 sm:py-12 md:py-24 bg-white border-t border-apple-border">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light tracking-tight text-apple-text mb-5 sm:mb-6">
              The founding year.
            </h2>
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-charcoal leading-relaxed">
                This is the first edition of Vocal Excellence. There is no archive of past showcases. No alumni network yet. No decades of institutional history.
              </p>
              <p className="text-sm sm:text-base text-charcoal leading-relaxed">
                What there is: a Juilliard-trained founder who has spent years building the relationships that bring faculty of this calibre to Cyprus. A programme budget of{' '}
                <span className="font-semibold text-apple-text">€40,000–€57,000</span>
                {' '}— the lower figure delivers the programme exactly as designed; the upper allows additional faculty time and enhanced production if funding permits. No administrative overhead beyond what is operationally necessary. Every euro is directed to faculty, production, and the participants.
              </p>
              <p className="text-sm sm:text-base text-charcoal leading-relaxed">
                Beyond the faculty, the programme is delivered by a full production team: three resident concert pianists, a professional stage manager, sound engineer, lighting designer, and a 4K video crew — each contracted for the full seven days. A designated safeguarding officer is present throughout for all participants under 18.
              </p>

              {/* Pull quote — the strongest line on the page */}
              <blockquote className="border-l-2 border-apple-blue/30 pl-4 sm:pl-5 my-2 sm:my-3">
                <p className="text-base sm:text-lg md:text-xl font-serif font-light text-apple-text leading-snug">
                  The partners who join in 2026 are not sponsoring an institution.{' '}
                  They are founding one.
                </p>
              </blockquote>

              <p className="text-sm sm:text-base text-charcoal leading-relaxed">
                A young singer — selected through a competitive audition process — arrives in Limassol and works in direct daily contact with faculty from Juilliard and the West End for seven days. The master teacher who flew from New York is here because the programme could bring them. The programme could bring them because a founding partner committed before the first note was sung.
              </p>
              <p className="text-sm sm:text-base text-charcoal leading-relaxed">
                When that singer earns a place at a conservatory and presents the audition tape produced in Cyprus, they will remember two things: the week that prepared them, and the name that made it possible. The founding partners who make this trajectory possible will be recognised not for one season, but for the life of the institution they helped create.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5 · Tiers — bg-apple-light */}
      <section className="py-10 sm:py-12 md:py-24 bg-apple-light border-t border-apple-border">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div {...fadeIn} className="mb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light tracking-tight text-apple-text mb-2 sm:mb-3">
              How to partner.
            </h2>
            <p className="text-sm sm:text-base text-charcoal leading-relaxed">
              Each position is limited. Once confirmed personally with Andreas, your commitment is held for the full programme year. All positions must be secured before 24 May 2026.
            </p>
          </motion.div>

          {/* Patron */}
          <motion.div
            className="mt-8 sm:mt-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 sm:p-8 md:p-10 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-4 sm:mb-5">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-white">Patron</h3>
              <p className="text-xs sm:text-sm text-white/50 italic mt-1">One position. Private enquiries only.</p>
            </div>
            <p className="text-base sm:text-lg md:text-xl font-medium text-white mb-3 sm:mb-4 leading-snug">
              The 2026 programme exists because of one name. Yours.
            </p>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3">
              For the partner who chooses to make the entire programme possible. There is no package description here — because a conversation is more useful than a brochure.
            </p>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Write to Andreas Aroditis directly:{' '}
              <a
                href="mailto:andreas@vocalexcellence.cy?subject=Patron%20Enquiry%20%E2%80%93%20Vocal%20Excellence%202026"
                className="text-white underline underline-offset-2 decoration-white/40 hover:decoration-white/80 transition-colors break-all"
              >
                andreas@vocalexcellence.cy
              </a>
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="h-px bg-apple-border mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />

          {/* Paid tiers */}
          <div className="divide-y divide-apple-border">
            {paidTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                className="py-5 sm:py-7 first:pt-0 last:pb-0 rounded-sm hover:bg-white/60 -mx-2 px-2 transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: 0.06 * i }}
              >
                <div className="flex items-baseline justify-between gap-3 sm:gap-4 mb-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-serif font-light text-apple-text">{tier.name}</h3>
                  <span className="text-base sm:text-lg md:text-xl font-serif font-light text-apple-text flex-shrink-0">{tier.price}</span>
                </div>
                <p className="text-xs sm:text-sm text-apple-text/65 mb-3 sm:mb-4">
                  {tier.places}{' '}{tier.impact}
                </p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {tier.perks.map((perk, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-charcoal">
                      <span className="w-1 h-1 rounded-full bg-apple-text/20 flex-shrink-0 mt-2" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · CTA — bg-white */}
      <section className="py-10 sm:py-12 md:py-20 bg-white border-t border-apple-border">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div
            {...fadeIn}
            className="flex flex-col md:flex-row md:items-start gap-7 sm:gap-8 md:gap-12"
          >
            {/* Left — founder portrait */}
            <div className="flex flex-col items-center md:items-start flex-shrink-0">
              <img
                src="/attached_assets/andreas_aroditis_headshot.jpg"
                alt="Andreas Aroditis"
                loading="lazy"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full object-contain bg-black border-2 border-white shadow-md"
              />
              <p className="mt-2.5 sm:mt-3 text-sm font-semibold text-apple-text text-center md:text-left">
                Andreas Aroditis
              </p>
              <p className="text-xs text-charcoal text-center md:text-left">
                Founder &amp; Director
              </p>
            </div>

            {/* Right — message + buttons */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-light tracking-tight text-apple-text mb-3 sm:mb-4">
                What would this look like for you?
              </h2>
              <div className="space-y-3 mb-6 sm:mb-7">
                <p className="text-sm sm:text-base text-charcoal leading-relaxed">
                  Write or call Andreas directly. You will receive a personal response within 24 hours.
                </p>
                <p className="text-sm sm:text-base text-charcoal leading-relaxed">
                  Some partners choose to go further — by directly sponsoring one of our international faculty positions and becoming the reason a master teacher crossed a continent to be here. If this is of interest, raise it when you write.
                </p>
                <p className="text-xs sm:text-sm text-apple-text/40 leading-relaxed pt-1">
                  Legal and financial documentation provided upon request. References from confirmed 2026 faculty are available on request.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-2.5 sm:gap-3">
                <a
                  href="mailto:andreas@vocalexcellence.cy?subject=Partnership%20Enquiry%20%E2%80%93%20Vocal%20Excellence%202026"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full bg-apple-blue text-white text-xs sm:text-sm font-semibold uppercase tracking-widest hover:bg-apple-blue-hover transition-all duration-300 active:scale-[0.98]"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-80" />
                  Write to Andreas
                </a>
                <a
                  href="tel:+35725775885"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full border border-apple-border text-apple-text text-xs sm:text-sm font-semibold uppercase tracking-widest hover:bg-apple-light transition-all duration-300 active:scale-[0.98]"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-60" />
                  +357 25 775 885
                </a>
              </div>
              <p className="mt-3 sm:mt-4 text-xs text-charcoal text-center md:text-left">
                andreas@vocalexcellence.cy
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sponsors;
