import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.div 
        className="max-w-[980px] mx-auto px-6 pt-48 md:pt-56 pb-16 md:pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[40px] md:text-[56px] font-semibold mb-4 tracking-tight">Terms of Use & Participation Agreement</h1>
        
        <div className="text-base text-gray-600 mb-8 space-y-1">
          <p><strong>Programme:</strong> Vocal Excellence Summer Programme ("Programme" or "Summer Intensive")</p>
          <p><strong>Dates:</strong> June 29 – July 5, 2026</p>
          <p><strong>Location:</strong> Limassol, Cyprus</p>
          <p><strong>Organizer:</strong> Vocal Excellence ("Organizer," "we," "us," or "our")</p>
        </div>
        
        <div className="text-sm text-gray-500 mb-8 space-y-1">
          <p>Effective Date: January 5, 2026</p>
          <p>Version: 4.1 (Comprehensive)</p>
        </div>

        <nav className="mb-16 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li><a href="#preamble" className="hover:text-blue-600">Preamble and Binding Effect</a></li>
            <li><a href="#eligibility" className="hover:text-blue-600">Eligibility, Admission, and Cohort</a></li>
            <li><a href="#tuition" className="hover:text-blue-600">Tuition, Fees, and Payment Terms</a></li>
            <li><a href="#inclusions" className="hover:text-blue-600">Inclusions and Exclusions</a></li>
            <li><a href="#cancellation" className="hover:text-blue-600">Cancellation, Withdrawal, and Refunds</a></li>
            <li><a href="#modifications" className="hover:text-blue-600">Programme Modifications and Force Majeure</a></li>
            <li><a href="#conduct" className="hover:text-blue-600">Code of Conduct and Disciplinary Action</a></li>
            <li><a href="#intellectual-property" className="hover:text-blue-600">Intellectual Property and Media Release</a></li>
            <li><a href="#health-safety" className="hover:text-blue-600">Health, Safety, and Liability Waiver</a></li>
            <li><a href="#privacy" className="hover:text-blue-600">Privacy and Data Protection</a></li>
            <li><a href="#governing-law" className="hover:text-blue-600">Governing Law and Jurisdiction</a></li>
          </ol>
        </nav>

        <div className="space-y-16">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="scroll-mt-24"
              id={section.id}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 tracking-tight">{section.title}</h2>
              <div 
                className="prose prose-gray max-w-none text-[17px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-slate-900 text-white rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">Acknowledgment</h2>
          <p className="text-slate-300 leading-relaxed">
            BY COMPLETING THE APPLICATION FORM OR REMITTING PAYMENT, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF USE & PARTICIPATION AGREEMENT, UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM AS A CONDITION OF YOUR PARTICIPATION IN THE VOCAL EXCELLENCE SUMMER PROGRAMME.
          </p>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

const sections = [
  {
    id: "preamble",
    title: "1. Preamble and Binding Effect",
    content: `
      <p><strong>1.1. Nature of Agreement.</strong> These Terms of Use & Participation Agreement ("Terms") constitute a legally binding contract between Vocal Excellence (a business operating under the laws of the Republic of Cyprus) and the Applicant/Participant (hereinafter "Participant," "you," or "your").</p>
      
      <p><strong>1.2. Minors.</strong> If the Participant is under the age of 18 at the start of the Programme, these Terms must be agreed to by a parent or legal guardian ("Guardian"), who agrees to be bound by them and assumes full financial and legal responsibility for the Participant.</p>
      
      <p><strong>1.3. Acceptance.</strong> By submitting an application, paying any deposit or fee, accessing the Student Portal, or participating in any Programme activity, you unconditionally acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
      
      <p><strong>1.4. Entire Agreement.</strong> These Terms, together with your formal Letter of Acceptance and Invoice, constitute the entire agreement between the parties and supersede all prior marketing materials, website descriptions, or verbal representations.</p>
    `
  },
  {
    id: "eligibility",
    title: "2. Eligibility, Admission, and Cohort",
    content: `
      <p><strong>2.1. Competitive Admission.</strong> The Programme is strictly limited to a maximum cohort of 20 participants. Admission is competitive. Submission of an application constitutes an offer to participate, not a guarantee of acceptance.</p>
      
      <p><strong>2.2. Contract Formation.</strong> A binding contract is formed only upon the satisfaction of both of the following conditions:</p>
      <ul>
        <li>(a) The Organizer issues a written Letter of Acceptance via email; AND</li>
        <li>(b) The Organizer receives the non-refundable Booking Deposit (as defined in Section 3).</li>
      </ul>
      
      <p><strong>2.3. Eligibility Criteria.</strong> You warrant that:</p>
      <ul>
        <li>You are at least 18 years of age by June 29, 2026 (or 14–17 with the mandatory Parental Consent Form on file).</li>
        <li>All information, recordings, and documentation submitted in your application are true, accurate, and current.</li>
        <li>You are in good vocal and physical health sufficient to participate in an intensive 7-day training regimen.</li>
      </ul>
      
      <p><strong>2.4. Right to Rescind.</strong> We reserve the right to rescind admission or dismiss a Participant retroactively if we discover that the application contained materially false, misleading, or fraudulent information.</p>
    `
  },
  {
    id: "tuition",
    title: "3. Tuition, Fees, and Payment Terms",
    content: `
      <p><strong>3.1. Currency.</strong> All fees are quoted and payable in Euros (€).</p>
      
      <p><strong>3.2. Tuition Rates.</strong></p>
      <ul>
        <li><strong>Early Bird Rate:</strong> €749.00 (Total Tuition). Valid only if the Booking Deposit is received on or before May 24, 2026.</li>
        <li><strong>Standard Rate:</strong> €1,499.00 (Total Tuition). Applies to all registrations finalized from May 25, 2026 onwards.</li>
      </ul>
      
      <p><strong>3.3. Payment Schedule.</strong></p>
      <ul>
        <li><strong>Booking Deposit:</strong> A non-refundable deposit of €100.00 is due immediately upon acceptance to secure your placement. This amount is credited toward your Total Tuition.</li>
        <li><strong>Balance Deadline:</strong> The remaining balance of the Tuition is strictly due by June 15, 2026.</li>
        <li><strong>Installment Plan (Early Bird Only):</strong> Participants securing the Early Bird Rate may elect to pay in three (3) monthly installments of €216.00.</li>
        <li><strong>Default:</strong> Failure to pay any installment within five (5) calendar days of its due date constitutes a material breach, allowing the Organizer to cancel your registration and retain all monies paid to date.</li>
      </ul>
      
      <p><strong>3.4. Late Payments.</strong> Any payment not received by the stated deadline may result in the forfeiture of your spot to a candidate on the Waitlist.</p>
      
      <p><strong>3.5. Banking Charges.</strong> You are responsible for all bank transfer fees, currency conversion charges, or wiring costs. The Organizer must receive the full net amount of the Tuition.</p>
    `
  },
  {
    id: "inclusions",
    title: "4. Inclusions and Exclusions",
    content: `
      <p><strong>4.1. Included in Tuition.</strong></p>
      <ul>
        <li><strong>Training:</strong> Masterclasses, Private Coaching, Collaborative Piano Sessions, Workshops (Alexander Technique, Audition Strategy).</li>
        <li><strong>Materials:</strong> Access to sheet music library (digital), handouts, and curriculum assets.</li>
        <li><strong>Media:</strong> Professional 4K video recordings of mock auditions and final showcase performances.</li>
        <li><strong>Catering:</strong> Daily lunch provided on-site (June 29 – July 5).</li>
      </ul>
      
      <p><strong>4.2. Excluded (Participant Responsibility).</strong></p>
      <ul>
        <li><strong>Accommodation:</strong> You are solely responsible for booking and paying for your own lodging.</li>
        <li><strong>Travel:</strong> All airfare, airport transfers, and local transportation to/from the venue.</li>
        <li><strong>Meals:</strong> Breakfast and dinner are not included.</li>
        <li><strong>Insurance:</strong> Travel, health, and personal property insurance.</li>
        <li><strong>Visas:</strong> All costs related to obtaining entry visas for Cyprus.</li>
      </ul>
    `
  },
  {
    id: "cancellation",
    title: "5. Cancellation, Withdrawal, and Refunds",
    content: `
      <p><strong>5.1. Strict Cancellation Policy.</strong> To withdraw, you must submit a written Notice of Cancellation to <a href="mailto:info@vocalexcellence.cy">info@vocalexcellence.cy</a>. Refund eligibility is calculated strictly based on the date and time we receive this email (Cyprus Time, EET).</p>
      
      <table class="w-full border-collapse border border-gray-300 my-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Date of Receipt of Notice</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Refund Entitlement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">On or before May 30, 2026<br/>(30+ Days Prior)</td>
            <td class="border border-gray-300 px-4 py-2">100% of Tuition Paid<br/>(Less €50.00 Administrative Fee)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">May 31 – June 14, 2026<br/>(15–29 Days Prior)</td>
            <td class="border border-gray-300 px-4 py-2">50% of Tuition Paid<br/>(Less €50.00 Administrative Fee)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">On or after June 15, 2026<br/>(0–14 Days Prior)</td>
            <td class="border border-gray-300 px-4 py-2">NO REFUND (0%)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">After Programme Start</td>
            <td class="border border-gray-300 px-4 py-2">NO REFUND (0%)</td>
          </tr>
        </tbody>
      </table>
      
      <p><strong>5.2. Administrative Fee.</strong> A deduction of €50.00 applies to all refunds to cover administrative overhead, banking transaction reversals, and re-booking costs.</p>
      
      <p><strong>5.3. No Exceptions.</strong> The cancellation policy applies regardless of the reason for withdrawal, including but not limited to: illness, injury, family emergency, work conflicts, or travel delays. We strongly recommend purchasing "Cancel for Any Reason" (CFAR) travel insurance.</p>
      
      <p><strong>5.4. Visa Denial.</strong> Inability to obtain a visa does not exempt you from the standard Cancellation Policy. It is your responsibility to apply for visas immediately upon acceptance.</p>
      
      <p><strong>5.5. EU Right of Withdrawal Exemption.</strong> Pursuant to the Consumer Rights Law of 2013 (133(I)/2013) of Cyprus and EU Directive 2011/83/EU, the statutory 14-day "Right of Withdrawal" does not apply to contracts for the provision of leisure activities or services related to leisure activities if the contract provides for a specific date or period of performance. Therefore, your booking is final upon payment.</p>
    `
  },
  {
    id: "modifications",
    title: "6. Programme Modifications and Force Majeure",
    content: `
      <p><strong>6.1. Operational Changes.</strong> The Organizer strives to deliver the schedule and faculty as advertised. However, we reserve the right to:</p>
      <ul>
        <li>Substitute faculty members due to illness, professional conflict, or emergency.</li>
        <li>Alter the daily timetable or curriculum modules.</li>
        <li>Change the venue to another suitable location within the Limassol district.</li>
      </ul>
      <p>Such changes are deemed "Minor Modifications" and do not entitle the Participant to a refund.</p>
      
      <p><strong>6.2. Force Majeure.</strong> The Organizer shall not be liable for any failure or delay in performance caused by circumstances beyond its reasonable control ("Force Majeure Event"), including but not limited to: acts of God, war, terrorism, civil unrest, pandemic, epidemic, government-imposed lockdowns, strikes, natural disasters, or interruption of utility services.</p>
      
      <p><strong>6.3. Cancellation by Organizer.</strong></p>
      <ul>
        <li><strong>(a) For Commercial Reasons:</strong> If we cancel the Programme due to insufficient enrollment, you will receive a Full Refund (100%) of all Tuition paid.</li>
        <li><strong>(b) Due to Force Majeure:</strong> If the Programme is cancelled due to a Force Majeure Event, the Organizer may, at its sole discretion, issue a credit for a future programme or a partial refund after deducting non-recoverable third-party expenses.</li>
      </ul>
      
      <p><strong>6.4. Limitation of Organizer Liability.</strong> In the event of cancellation for any reason, the Organizer's liability is strictly limited to the refund of Tuition fees paid. The Organizer is not liable for Participants' sunk costs, including non-refundable flights, accommodation, or visa fees.</p>
    `
  },
  {
    id: "conduct",
    title: "7. Code of Conduct and Disciplinary Action",
    content: `
      <p><strong>7.1. Professionalism.</strong> Participants are expected to behave as professional artists. This includes punctuality, preparation, and respectful conduct toward faculty, staff, venue personnel, and peers.</p>
      
      <p><strong>7.2. Prohibited Conduct.</strong> The Organizer reserves the right to dismiss any Participant immediately, without refund, for:</p>
      <ul>
        <li>Harassment, bullying, sexual misconduct, or discrimination of any kind.</li>
        <li>Possession, use, or distribution of illegal drugs or controlled substances.</li>
        <li>Intoxication or disorderly conduct at the venue.</li>
        <li>Theft or intentional damage to property.</li>
        <li>Unauthorized recording of other students' private sessions.</li>
        <li>Refusal to follow reasonable instructions from faculty or staff.</li>
      </ul>
      
      <p><strong>7.3. Venue Rules.</strong> You agree to abide by all rules and regulations of the host venue. You are personally liable for any damage you cause to the premises, instruments (including pianos), or equipment.</p>
    `
  },
  {
    id: "intellectual-property",
    title: "8. Intellectual Property and Media Release",
    content: `
      <p><strong>8.1. Portfolio Recordings.</strong> As part of the curriculum, we provide professional 4K video recordings of your performances.</p>
      <ul>
        <li><strong>Ownership:</strong> You retain the copyright to your musical performance.</li>
        <li><strong>License:</strong> You grant the Organizer a license to keep archival copies of these recordings.</li>
      </ul>
      
      <p><strong>8.2. Media Release.</strong> By participating, you grant Vocal Excellence (and its agents/licensees) a perpetual, worldwide, royalty-free, irrevocable license to use, reproduce, edit, and distribute photographs, video, and audio recordings of your participation ("Media") for:</p>
      <ul>
        <li>Marketing, advertising, and promotional purposes (website, social media, print).</li>
        <li>Educational archives and curriculum development.</li>
        <li>Showcasing student success.</li>
      </ul>
      
      <p><strong>8.3. Opt-Out.</strong> If you have specific privacy or safety concerns, you must submit a Media Opt-Out Request in writing prior to June 29, 2026. While we will make reasonable efforts to exclude you from featured content, we cannot guarantee exclusion from crowd shots or background footage.</p>
      
      <p><strong>8.4. Curriculum IP.</strong> All handouts, methods, arrangements, and curricular materials provided by the Organizer remain the intellectual property of Vocal Excellence or the respective faculty member. You may strictly use them for personal study; redistribution or commercial use is prohibited.</p>
    `
  },
  {
    id: "health-safety",
    title: "9. Health, Safety, and Liability Waiver",
    content: `
      <p><strong>9.1. Assumption of Risk.</strong> You acknowledge that intensive vocal and physical training (including Alexander Technique and stage movement) involves inherent risks, including vocal fatigue, muscle strain, or accidental injury. You voluntarily assume all such risks.</p>
      
      <p><strong>9.2. Vocal Health Disclaimer.</strong> The Organizer provides educational coaching, not medical treatment. We are not responsible for any vocal injury, dysphonia, or pathology that may manifest during or after the Programme. You are responsible for pacing yourself and practicing vocal hygiene.</p>
      
      <p><strong>9.3. Release of Liability.</strong> To the fullest extent permitted by Cyprus law, you hereby release, waive, and discharge Vocal Excellence, its directors, employees, faculty, and agents from any and all liability, claims, demands, or causes of action arising out of:</p>
      <ul>
        <li>Personal injury, illness, or death (unless caused by proven gross negligence).</li>
        <li>Loss, theft, or damage to personal property (including instruments, electronics, cash, or passports).</li>
      </ul>
      
      <p><strong>9.4. Medical Emergency.</strong> In the event of a medical emergency where you are incapacitated, you authorize the Organizer to secure medical treatment on your behalf. You agree to pay all costs associated with such medical care, transport, or hospitalization.</p>
    `
  },
  {
    id: "privacy",
    title: "10. Privacy and Data Protection",
    content: `
      <p><strong>10.1. Data Processing.</strong> We process your personal data in accordance with the General Data Protection Regulation (GDPR) and our <a href="/privacy">Privacy Policy</a>. We collect data necessary for the performance of this contract (application review, scheduling, communication).</p>
      
      <p><strong>10.2. Data Sharing.</strong> We may share necessary data (e.g., name, dietary requirements) with venue partners or caterers solely for operational purposes. We do not sell your data.</p>
    `
  },
  {
    id: "governing-law",
    title: "11. Governing Law and Jurisdiction",
    content: `
      <p><strong>11.1. Governing Law.</strong> These Terms shall be governed by, and construed in accordance with, the laws of the Republic of Cyprus, without regard to conflict of law principles.</p>
      
      <p><strong>11.2. Exclusive Jurisdiction.</strong> Any dispute, controversy, or claim arising out of or relating to this Agreement, including its validity, invalidity, breach, or termination, shall be subject to the exclusive jurisdiction of the District Court of Limassol, Cyprus.</p>
      
      <p><strong>11.3. Severability.</strong> If any provision of these Terms is found by a court of competent jurisdiction to be invalid or unenforceable, such provision shall be severed, and the remaining provisions shall remain in full force and effect.</p>
    `
  }
];

export default Terms;
