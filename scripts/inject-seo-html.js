/**
 * Post-build script: injects static HTML content into per-route HTML files
 * so that Google crawlers see real page content without executing JavaScript.
 *
 * Run after `vite build`:
 *   node scripts/inject-seo-html.js
 *
 * Reads dist/index.html as a template, creates route-specific copies with:
 *  - Unique <title>, <meta description>, <link rel="canonical">, OG tags
 *  - Semantic HTML content inside <div id="root">
 *  - Shared JSON-LD structured data (inherited from template)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const BASE_URL = 'https://vocalexcellence.cy';

// ---------------------------------------------------------------------------
// Route definitions
// ---------------------------------------------------------------------------

const routes = [
  {
    path: '/',
    outFile: 'index.html',
    title: 'Vocal Excellence \u2014 Seven Days, Filmed Audition, Class of 30 | Summer 2026',
    description: "The Mediterranean\u2019s only pre-university vocal intensive. Seven days in Cyprus with Juilliard and West End faculty. Audition preparation and a filmed audition for university applications.",
    canonical: BASE_URL + '/',
    body: homepageHTML,
  },
  {
    path: '/apply',
    outFile: 'apply/index.html',
    title: 'Apply | Vocal Excellence \u2014 University Audition Preparation, Summer 2026',
    description: "Apply for the Mediterranean\u2019s only pre-university vocal intensive. Juilliard & West End faculty. Seven days. Filmed audition. Thirty places.",
    canonical: BASE_URL + '/apply',
    body: applyHTML,
  },
  {
    path: '/summer-programme',
    outFile: 'summer-programme/index.html',
    title: 'Summer Programme 2026 \u2014 Faculty, Curriculum & Schedule | Vocal Excellence',
    description: 'Seven days of vocal training for 12\u201321 year olds in Limassol, Cyprus. Coached by faculty from Juilliard and the West End, with a filmed audition to take with you.',
    canonical: BASE_URL + '/summer-programme',
    body: summerProgrammeHTML,
  },
  {
    path: '/terms',
    outFile: 'terms/index.html',
    title: 'Terms of Use & Participation Agreement | Vocal Excellence',
    description: 'Terms of use and participation agreement for the Vocal Excellence Summer Programme 2026. June 29 \u2013 July 5, Limassol, Cyprus.',
    canonical: BASE_URL + '/terms',
    body: termsHTML,
  },
  {
    path: '/privacy',
    outFile: 'privacy/index.html',
    title: 'Privacy Policy | Vocal Excellence',
    description: 'Privacy policy for Vocal Excellence. How we collect, use, and protect your personal data in compliance with GDPR.',
    canonical: BASE_URL + '/privacy',
    body: privacyHTML,
  },
];

// ---------------------------------------------------------------------------
// Static HTML content generators (semantic content only — no styling)
// ---------------------------------------------------------------------------

function homepageHTML() {
  return `
    <header>
      <nav aria-label="Main navigation">
        <a href="/" aria-label="Vocal Excellence home">
          <img src="/images/branding/logo.png" alt="Vocal Excellence Logo" width="140" height="40" />
        </a>
        <a href="/apply">Request Your Place</a>
      </nav>
    </header>

    <main>
      <section aria-label="Hero">
        <p>Summer 2026 &middot; Limassol, Cyprus</p>
        <h1>Seven Days. A Filmed Audition. Juilliard &amp; West End Faculty.</h1>
        <p>Talent gets you noticed. Preparation gets you in.</p>
        <p>June 29 &ndash; July 5, 2026 &middot; Limassol, Cyprus</p>
        <a href="/apply">Request Your Place</a>
        <p>One week. One filmed audition. Thirty places.</p>
      </section>

      <section aria-label="Trust bar">
        <p>Faculty whose credits include Juilliard, the West End, and Netflix.</p>
      </section>

      <section aria-label="About">
        <h2>Talent gets you noticed. Preparation gets you in.</h2>
        <p>You&rsquo;ve been working toward this for years. The question isn&rsquo;t whether you can do it &mdash; it&rsquo;s whether the panel will know it.</p>
        <p>Most summer workshops send you home a better singer. Vocal Excellence sends you home a better singer who knows exactly what their target programme is looking for &mdash; and has a filmed audition to show for it.</p>
        <p>The most competitive music and theatre programmes in the world receive more applications each year. The candidates who receive offers know exactly what the panel is looking for &mdash; and they&rsquo;ve rehearsed it.</p>
        <p>You won&rsquo;t just study with Juilliard graduates and West End performers &mdash; you will rehearse, record, and perform in the same conditions they trained in.</p>
        <p>We believe every serious young singer deserves to know exactly what top programmes are looking for. So we built the intensive to give them that &mdash; and a filmed audition to prove it.</p>
        <p>For classical and musical theatre singers aged 12&ndash;21 preparing for university and conservatory auditions.</p>

        <h3>What you leave with</h3>
        <ul>
          <li><strong>Technical freedom:</strong> Alexander Technique sessions that release physical tension and help your voice perform at the level you have been training for.</li>
          <li><strong>A filmed audition:</strong> A broadcast-quality video recording of your mock audition &mdash; for university video applications, portfolio submissions, and scholarship shortlists.</li>
          <li><strong>Faculty who know what panels want:</strong> Direct coaching from Juilliard graduates and West End performers who understand exactly what top university admissions panels are looking for.</li>
        </ul>
      </section>

      <section aria-label="Curriculum">
        <h2>What you walk away with</h2>
        <p>Audition-ready in seven days.</p>
        <ol>
          <li><strong>Private Mentorship:</strong> 45-minute 1-on-1 lessons tailored to your voice type with Master Teachers.</li>
          <li><strong>A broadcast-quality filmed audition:</strong> A professional video recording of your mock audition and final performance &mdash; for university video applications, portfolio submissions, and scholarship shortlists.</li>
          <li><strong>Collaborative Coaching:</strong> Dedicated sessions with professional accompanists to polish your repertoire.</li>
          <li><strong>Audition preparation:</strong> Masterclasses on what Juilliard, RADA, and top conservatories look for &mdash; and how to walk into any audition room ready.</li>
          <li><strong>Vocal Health Training:</strong> Seminars with medical specialists on protecting your voice.</li>
        </ol>

        <h2>Seven days of intensive training</h2>
        <p>Vocal technique, audition confidence, university preparation, and a filmed audition to take with you.</p>
      </section>

      <section aria-label="Instructors">
        <h2>Train With The Best</h2>
        <p>Direct access to active professionals &mdash; no assistants, no fillers.</p>
        <ul>
          <li>Private lesson with master teachers</li>
          <li>Dedicated accompanist sessions</li>
          <li>Personalized feedback and mentoring</li>
          <li>Faculty who are actively performing and teaching at the highest level</li>
        </ul>
        <ul>
          <li><img src="/attached_assets/andreas_aroditis_headshot.jpg" alt="Andreas Aroditis, Founder and Director of Vocal Excellence" width="200" height="200" /> Andreas Aroditis &mdash; Founder &amp; Director</li>
          <li><img src="/images/instructors/kate-batter.png" alt="Kate Batter, Vocal Coach at Vocal Excellence" width="200" height="200" /> Kate Batter &mdash; Vocal Coach</li>
          <li><img src="/images/instructors/carolyn-michelle-smith.png" alt="Carolyn Michelle Smith, Acting Coach at Vocal Excellence" width="200" height="200" /> Carolyn Michelle Smith &mdash; Acting Coach</li>
          <li><img src="/attached_assets/Ksenia_-_Headshot_1767558316441.jpg" alt="Ksenia Belolipetskaya, Soprano and Vocal Coach at Vocal Excellence" width="200" height="200" /> Ksenia Belolipetskaya &mdash; Soprano &amp; Vocal Coach</li>
          <li><img src="/images/instructors/aris-antoniades.png" alt="Aris Antoniades, Music Director at Vocal Excellence" width="200" height="200" /> Aris Antoniades &mdash; Music Director</li>
          <li><img src="/attached_assets/Polina_headshot_optimized.jpg" alt="Polina Panagiotou, Choreographer at Vocal Excellence" width="200" height="200" /> Polina Panagiotou &mdash; Choreographer</li>
          <li><img src="/images/instructors/emmeleia-pericleous.jpg" alt="Emmeleia Pericleous, Choir Director at Vocal Excellence" width="200" height="200" /> Emmeleia Pericleous &mdash; Choir Director</li>
        </ul>
      </section>

      <section aria-label="Call to action">
        <h2>The students who get in prepare differently.</h2>
        <p>Talent gets you noticed. Preparation gets you in.</p>
        <p>Top programmes shortlist candidates who arrive knowing exactly what the panel expects. Seven days in Limassol gives you the technique, the preparation, and the filmed audition to walk in ready.</p>
        <p>Real faculty. Real students. Real results.</p>
        <a href="/apply">Request Your Place</a>
        <p>Five short sections. No essay.</p>
        <p>Thirty places. No exceptions.</p>
      </section>
    </main>

    <footer>
      <p><strong>Vocal Excellence.</strong></p>
      <p>Vocal Excellence is seven days in Cyprus where serious young singers transform their voices and prepare for their top university auditions &mdash; coached by Juilliard-trained faculty and West End performers.</p>
      <p>The Mediterranean&rsquo;s only pre-university vocal intensive.</p>
      <p>Limassol, Cyprus.</p>
      <p>Questions? <a href="mailto:info@vocalexcellence.cy">info@vocalexcellence.cy</a> | +357 25 775 885</p>
      <nav aria-label="Footer navigation">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Use</a>
        <a href="/apply">Request Your Place</a>
      </nav>
      <p>&copy; 2026 Vocal Excellence.</p>
    </footer>
  `;
}

function applyHTML() {
  return `
    <header>
      <nav aria-label="Main navigation">
        <a href="/" aria-label="Vocal Excellence home">
          <img src="/images/branding/logo.png" alt="Vocal Excellence Logo" width="140" height="40" />
        </a>
      </nav>
    </header>

    <main>
      <section aria-label="Hero">
        <h1>Seven Days. A Voice Ready for the World&rsquo;s Top Conservatoires.</h1>
        <p>The Mediterranean&rsquo;s only pre-university vocal intensive &mdash; coached by Juilliard-trained faculty and West End performers, with a broadcast-quality filmed audition to anchor your university applications.</p>
      </section>

      <section aria-label="Application form">
        <h2>Apply to Vocal Excellence 2026</h2>
        <p>Five short sections. No essay &mdash; just a few questions and an optional audio upload.</p>
      </section>

      <section aria-label="What you will need">
        <h2>What You&rsquo;ll Need</h2>
        <p>Have these ready and you&rsquo;ll complete the form in minutes:</p>
        <ul>
          <li>Personal details (name, date of birth, nationality)</li>
          <li>Contact information (email, phone)</li>
          <li>Musical background (voice type, years of training, repertoire)</li>
          <li>Goals &mdash; which programmes you&rsquo;re working toward</li>
          <li>Optional: an audio recording of a recent performance</li>
        </ul>
      </section>

      <section aria-label="Application timeline">
        <h2>From Application to the Stage</h2>
        <p>Five steps. Thirty places. One week that changes everything.</p>
        <ol>
          <li><strong>Submit &amp; Pay Deposit:</strong> Complete the form and secure your place with a &euro;100 registration deposit.</li>
          <li><strong>Faculty Review:</strong> Our faculty personally reviews every application.</li>
          <li><strong>Receive Your Offer:</strong> Accepted applicants receive an offer with full programme details.</li>
          <li><strong>Complete Registration:</strong> Confirm your place by paying the remaining tuition balance.</li>
          <li><strong>Arrive in Limassol:</strong> Your journey begins. Day 1 in Limassol.</li>
        </ol>
      </section>

      <section aria-label="Frequently asked questions">
        <h2>Your Questions, Answered</h2>
        <dl>
          <dt>Who can apply?</dt>
          <dd>Classical and musical theatre singers aged 12&ndash;21 who are preparing for university or conservatory auditions.</dd>
          <dt>How are applications reviewed?</dt>
          <dd>Our faculty personally reviews every application. We look for commitment, potential, and a genuine desire to prepare for top programmes.</dd>
          <dt>When will I hear back?</dt>
          <dd>Once your application and registration deposit are submitted, you will receive a confirmation email with the expected decision timeline.</dd>
          <dt>What does the programme cost?</dt>
          <dd>Pricing details are shared with accepted applicants. A &euro;100 registration deposit is required at the time of application.</dd>
          <dt>Is accommodation included?</dt>
          <dd>Accommodation is not included in the programme fee. We provide a list of recommended hotels near the venue.</dd>
        </dl>
      </section>
    </main>

    <footer>
      <p><strong>Vocal Excellence.</strong></p>
      <p>The Mediterranean&rsquo;s only pre-university vocal intensive.</p>
      <p>Limassol, Cyprus.</p>
      <p>Questions? <a href="mailto:info@vocalexcellence.cy">info@vocalexcellence.cy</a> | +357 25 775 885</p>
      <nav aria-label="Footer navigation">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Use</a>
      </nav>
      <p>&copy; 2026 Vocal Excellence.</p>
    </footer>
  `;
}

function summerProgrammeHTML() {
  return `
    <header>
      <nav aria-label="Main navigation">
        <a href="/" aria-label="Vocal Excellence home">
          <img src="/images/branding/logo.png" alt="Vocal Excellence Logo" width="140" height="40" />
        </a>
        <a href="/apply">Request Your Place</a>
      </nav>
    </header>

    <main>
      <section aria-label="Hero">
        <h1>Vocal Excellence</h1>
        <p>29 June &ndash; 5 July, 2026 &middot; Limassol, Cyprus</p>
        <p>Seven days of vocal training for 12&ndash;21 year olds, coached by faculty from Juilliard and the West End &mdash; and a filmed audition to take with you.</p>
        <a href="/apply">Request Your Place</a>
      </section>

      <section aria-label="About the programme">
        <h2>About the Programme</h2>
        <p>The Vocal Excellence Workshop is a seven-day intensive designed for serious young singers aged 12&ndash;21 who are preparing for top university and conservatory auditions. Participants work with faculty from Juilliard and the West End, complete a filmed audition, and leave knowing exactly what top programmes are looking for.</p>
        <ul>
          <li><strong>Seven Days:</strong> Training from 08:00&ndash;19:00 daily, with an evening showcase and final recording on the last day.</li>
          <li><strong>Thirty Places:</strong> A small class to ensure every student receives direct coaching and individual attention.</li>
          <li><strong>Juilliard &amp; West End Faculty:</strong> Coaches who know exactly what top admissions panels are looking for.</li>
        </ul>
      </section>

      <section aria-label="Programme schedule">
        <h2>Programme Schedule</h2>
        <h3>Day 1: Foundations</h3>
        <p>Vocal assessment, Alexander Technique introduction, and individual goal setting with faculty.</p>
        <h3>Day 2: Performance Development</h3>
        <p>Private coaching sessions, repertoire selection, and audition technique workshops.</p>
        <h3>Day 3: Musical Interpretation</h3>
        <p>Collaborative coaching with accompanist, stage presence, and acting through song.</p>
      </section>

      <section aria-label="Faculty">
        <h2>Your Faculty</h2>
        <p>Coaches who are active performers and teachers &mdash; and who understand what top programmes look for in a student.</p>
        <ul>
          <li>Andreas Aroditis &mdash; Founder &amp; Director</li>
          <li>Kate Batter &mdash; Vocal Coach</li>
          <li>Carolyn Michelle Smith &mdash; Acting Coach</li>
        </ul>
      </section>

      <section aria-label="Why Vocal Excellence">
        <h2>Why Vocal Excellence?</h2>
        <ul>
          <li><strong>Individual Attention:</strong> A class of thirty ensures every student receives direct coaching.</li>
          <li><strong>Faculty Who Know Admissions:</strong> Coaches from Juilliard and the West End who understand what panels look for.</li>
          <li><strong>A Filmed Audition:</strong> A broadcast-quality video for university applications and portfolio submissions.</li>
          <li><strong>Seven Intensive Days:</strong> Full days of training from 08:00 to 19:00.</li>
          <li><strong>Limassol, Cyprus:</strong> A focused environment away from distractions.</li>
          <li><strong>University Preparation Built In:</strong> Masterclasses on what top conservatories look for in applicants.</li>
        </ul>
      </section>

      <section aria-label="How to apply">
        <h2>How to Apply</h2>
        <h3>Who can apply</h3>
        <ul>
          <li>Singers aged 12&ndash;21</li>
          <li>Classical and musical theatre voices</li>
          <li>Preparing for university or conservatory auditions</li>
          <li>International applicants welcome</li>
        </ul>
        <h3>The process</h3>
        <ul>
          <li>Five short questions &mdash; no essay required</li>
          <li>Optional audio upload</li>
          <li>Faculty reviews every application personally</li>
          <li>Pricing and availability shared with accepted students</li>
        </ul>
        <a href="/apply">Request Your Place</a>
      </section>

      <section aria-label="Call to action">
        <h2>The students who get in prepare differently.</h2>
        <p>Seven days in Limassol with Juilliard and West End faculty. A filmed audition. A class of thirty. Applications open for Summer 2026.</p>
        <a href="/apply">Request Your Place</a>
      </section>
    </main>

    <footer>
      <p><strong>Vocal Excellence.</strong></p>
      <p>The Mediterranean&rsquo;s only pre-university vocal intensive.</p>
      <p>Limassol, Cyprus.</p>
      <nav aria-label="Footer navigation">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Use</a>
        <a href="/apply">Request Your Place</a>
      </nav>
      <p>&copy; 2026 Vocal Excellence.</p>
    </footer>
  `;
}

function termsHTML() {
  return `
    <header>
      <nav aria-label="Main navigation">
        <a href="/" aria-label="Vocal Excellence home">
          <img src="/images/branding/logo.png" alt="Vocal Excellence Logo" width="140" height="40" />
        </a>
      </nav>
    </header>

    <main>
      <h1>Terms of Use &amp; Participation Agreement</h1>
      <p><strong>Programme:</strong> Vocal Excellence Summer Programme</p>
      <p><strong>Dates:</strong> June 29 &ndash; July 5, 2026</p>
      <p><strong>Location:</strong> Limassol, Cyprus</p>
      <p><strong>Organizer:</strong> Vocal Excellence</p>
      <p>Effective Date: January 5, 2026 &middot; Version: 4.1</p>

      <nav aria-label="Table of contents">
        <h2>Table of Contents</h2>
        <ol>
          <li>Preamble and Binding Effect</li>
          <li>Eligibility, Admission, and Class Size</li>
          <li>Tuition, Fees, and Payment Terms</li>
          <li>Inclusions and Exclusions</li>
          <li>Cancellation, Withdrawal, and Refunds</li>
          <li>Programme Modifications and Force Majeure</li>
          <li>Code of Conduct and Disciplinary Action</li>
          <li>Intellectual Property and Media Release</li>
          <li>Health, Safety, and Liability Waiver</li>
          <li>Privacy and Data Protection</li>
          <li>Governing Law and Jurisdiction</li>
        </ol>
      </nav>

      <section>
        <h2>1. Preamble and Binding Effect</h2>
        <p>These Terms of Use and Participation Agreement govern your participation in the Vocal Excellence Summer Programme. By submitting an application or remitting payment, you agree to be bound by these terms.</p>
      </section>
      <section>
        <h2>2. Eligibility, Admission, and Class Size</h2>
        <p>The Programme is open to singers aged 12&ndash;21. Admission is selective and based on faculty review. The class is limited to thirty participants.</p>
      </section>
      <section>
        <h2>3. Tuition, Fees, and Payment Terms</h2>
        <p>A &euro;100 registration deposit is required at the time of application. Full tuition details are provided upon acceptance.</p>
      </section>
      <section>
        <h2>4. Inclusions and Exclusions</h2>
        <p>Programme fees include all training sessions, masterclasses, accompanist sessions, and the filmed audition. Accommodation, travel, and meals are not included.</p>
      </section>
      <section>
        <h2>5. Cancellation, Withdrawal, and Refunds</h2>
        <p>Cancellation and refund policies apply as outlined in the full terms provided upon acceptance.</p>
      </section>
      <section>
        <h2>6. Programme Modifications and Force Majeure</h2>
        <p>The Organizer reserves the right to modify programme content, schedule, or faculty in the event of unforeseen circumstances.</p>
      </section>
      <section>
        <h2>7. Code of Conduct and Disciplinary Action</h2>
        <p>All participants are expected to maintain professional conduct throughout the programme.</p>
      </section>
      <section>
        <h2>8. Intellectual Property and Media Release</h2>
        <p>Participants consent to being filmed and photographed. Vocal Excellence retains the right to use recordings for promotional purposes.</p>
      </section>
      <section>
        <h2>9. Health, Safety, and Liability Waiver</h2>
        <p>Participants acknowledge the physical demands of intensive vocal training and accept responsibility for their own health and safety.</p>
      </section>
      <section>
        <h2>10. Privacy and Data Protection</h2>
        <p>Personal data is processed in accordance with our <a href="/privacy">Privacy Policy</a> and GDPR requirements.</p>
      </section>
      <section>
        <h2>11. Governing Law and Jurisdiction</h2>
        <p>These terms are governed by the laws of the Republic of Cyprus.</p>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Vocal Excellence. Limassol, Cyprus.</p>
      <nav aria-label="Footer navigation">
        <a href="/privacy">Privacy Policy</a>
        <a href="/">Home</a>
        <a href="/apply">Request Your Place</a>
      </nav>
    </footer>
  `;
}

function privacyHTML() {
  return `
    <header>
      <nav aria-label="Main navigation">
        <a href="/" aria-label="Vocal Excellence home">
          <img src="/images/branding/logo.png" alt="Vocal Excellence Logo" width="140" height="40" />
        </a>
      </nav>
    </header>

    <main>
      <h1>Privacy Policy</h1>
      <p>Effective Date: January 5, 2026</p>
      <p>Last Reviewed: January 5, 2026</p>
      <p>Version: 2.0.0</p>

      <nav aria-label="Table of contents">
        <h2>Table of Contents</h2>
        <ol>
          <li>Introduction</li>
          <li>Definitions</li>
          <li>Data Controller Information</li>
          <li>Information We Collect</li>
          <li>Legal Basis for Processing</li>
          <li>How We Use Your Information</li>
          <li>Data Retention &amp; Minimization</li>
          <li>Data Protection &amp; Security Measures</li>
          <li>Your Rights Under GDPR</li>
          <li>International Data Transfers</li>
          <li>Cookies &amp; Tracking Technologies</li>
          <li>Children&rsquo;s Privacy</li>
          <li>Third-Party Sharing</li>
          <li>Changes to This Policy</li>
          <li>Contact Information</li>
          <li>Complaints Procedure</li>
          <li>Governing Law</li>
          <li>Continuous Improvement</li>
        </ol>
      </nav>

      <section>
        <h2>1. Introduction</h2>
        <p>Vocal Excellence is committed to protecting the privacy and personal data of all applicants, participants, and website visitors. This Privacy Policy explains how we collect, use, store, and protect your personal information in compliance with the General Data Protection Regulation (GDPR).</p>
      </section>
      <section>
        <h2>2. Definitions</h2>
        <p>In this policy, &ldquo;personal data&rdquo; means any information relating to an identified or identifiable natural person, including name, email address, telephone number, and application materials.</p>
      </section>
      <section>
        <h2>3. Data Controller Information</h2>
        <p>The data controller is Vocal Excellence, based in Limassol, Cyprus. Contact: <a href="mailto:info@vocalexcellence.cy">info@vocalexcellence.cy</a>.</p>
      </section>
      <section>
        <h2>4. Information We Collect</h2>
        <p>We collect personal details provided during the application process, including name, date of birth, contact information, musical background, audio recordings, and payment information processed securely through Stripe.</p>
      </section>
      <section>
        <h2>5. Legal Basis for Processing</h2>
        <p>We process personal data on the basis of contractual necessity, legitimate interest, and consent where applicable.</p>
      </section>
      <section>
        <h2>6. How We Use Your Information</h2>
        <p>Your data is used to process applications, communicate programme details, facilitate payment, and improve our services.</p>
      </section>
      <section>
        <h2>7. Data Retention &amp; Minimization</h2>
        <p>We retain personal data only as long as necessary for the purposes outlined in this policy, and delete it securely when no longer required.</p>
      </section>
      <section>
        <h2>8. Data Protection &amp; Security Measures</h2>
        <p>We implement appropriate technical and organizational measures to protect personal data against unauthorized access, alteration, or destruction.</p>
      </section>
      <section>
        <h2>9. Your Rights Under GDPR</h2>
        <p>You have the right to access, rectify, erase, restrict processing, data portability, and object to the processing of your personal data. Contact us at <a href="mailto:info@vocalexcellence.cy">info@vocalexcellence.cy</a> to exercise these rights.</p>
      </section>
      <section>
        <h2>10. International Data Transfers</h2>
        <p>Where data is transferred outside the European Economic Area, we ensure appropriate safeguards are in place.</p>
      </section>
      <section>
        <h2>11. Cookies &amp; Tracking Technologies</h2>
        <p>We use essential cookies for site functionality and analytics cookies (Google Tag Manager) to understand how visitors use our website.</p>
      </section>
      <section>
        <h2>12. Children&rsquo;s Privacy</h2>
        <p>Applications from participants under 18 require parental or guardian consent. We take additional care to protect the data of minors.</p>
      </section>
      <section>
        <h2>13. Third-Party Sharing</h2>
        <p>We share data only with trusted service providers (Stripe for payments, Resend for email) necessary to deliver the programme. We do not sell personal data.</p>
      </section>
      <section>
        <h2>14. Changes to This Policy</h2>
        <p>We may update this policy periodically. Changes will be posted on this page with an updated effective date.</p>
      </section>
      <section>
        <h2>15. Contact Information</h2>
        <p>For privacy inquiries: <a href="mailto:info@vocalexcellence.cy">info@vocalexcellence.cy</a> | +357 25 775 885</p>
      </section>
      <section>
        <h2>16. Complaints Procedure</h2>
        <p>If you are not satisfied with our response, you have the right to lodge a complaint with the Commissioner for Personal Data Protection in Cyprus.</p>
      </section>
      <section>
        <h2>17. Governing Law</h2>
        <p>This policy is governed by the laws of the Republic of Cyprus.</p>
      </section>
      <section>
        <h2>18. Continuous Improvement</h2>
        <p>We are committed to continuously improving our data protection practices in line with evolving regulations and best practices.</p>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Vocal Excellence. Limassol, Cyprus.</p>
      <nav aria-label="Footer navigation">
        <a href="/terms">Terms of Use</a>
        <a href="/">Home</a>
        <a href="/apply">Request Your Place</a>
      </nav>
    </footer>
  `;
}

// ---------------------------------------------------------------------------
// Template manipulation
// ---------------------------------------------------------------------------

function injectIntoTemplate(template, route) {
  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`
  );

  // Add canonical link (before </head>)
  html = html.replace(
    '</head>',
    `  <link rel="canonical" href="${route.canonical}" />\n  </head>`
  );

  // Update OG tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  // Replace the spinner inside <div id="root"> with static content.
  // The closing </div> for #root is the last </div> before </body>.
  const bodyContent = typeof route.body === 'function' ? route.body() : route.body;
  html = html.replace(
    /(<div id="root">)[\s\S]*?(<\/div>\s*\n\s*<\/body>)/,
    `$1${bodyContent}\n    </div>\n  </body>`
  );

  return html;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const templatePath = path.join(DIST, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('ERROR: dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  let count = 0;

  for (const route of routes) {
    const outPath = path.join(DIST, route.outFile);
    const outDir = path.dirname(outPath);

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const result = injectIntoTemplate(template, route);
    fs.writeFileSync(outPath, result, 'utf-8');
    count++;
    console.log(`  SEO: ${route.path} -> dist/${route.outFile}`);
  }

  console.log(`\nSEO injection complete: ${count} route(s) written.\n`);
}

main();
