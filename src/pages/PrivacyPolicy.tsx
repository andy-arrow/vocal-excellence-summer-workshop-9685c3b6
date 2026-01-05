import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.div 
        className="max-w-[980px] mx-auto px-6 py-16 md:py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[40px] md:text-[56px] font-semibold mb-8 tracking-tight">Privacy Policy</h1>
        <div className="text-sm text-gray-500 mb-8 space-y-1">
          <p>Effective Date: January 5, 2026</p>
          <p>Last Reviewed: January 5, 2026</p>
          <p>Next Review Date: January 5, 2027</p>
          <p>Version: 2.0.0</p>
        </div>

        <nav className="mb-16 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li><a href="#introduction" className="hover:text-blue-600">Introduction</a></li>
            <li><a href="#definitions" className="hover:text-blue-600">Definitions</a></li>
            <li><a href="#data-controller" className="hover:text-blue-600">Data Controller Information</a></li>
            <li><a href="#information-we-collect" className="hover:text-blue-600">Information We Collect</a></li>
            <li><a href="#legal-basis" className="hover:text-blue-600">Legal Basis for Processing</a></li>
            <li><a href="#how-we-use" className="hover:text-blue-600">How We Use Your Information</a></li>
            <li><a href="#data-retention" className="hover:text-blue-600">Data Retention & Minimization</a></li>
            <li><a href="#security" className="hover:text-blue-600">Data Protection & Security Measures</a></li>
            <li><a href="#your-rights" className="hover:text-blue-600">Your Rights Under GDPR</a></li>
            <li><a href="#international-transfers" className="hover:text-blue-600">International Data Transfers</a></li>
            <li><a href="#cookies" className="hover:text-blue-600">Cookies & Tracking Technologies</a></li>
            <li><a href="#childrens-privacy" className="hover:text-blue-600">Children's Privacy</a></li>
            <li><a href="#third-party" className="hover:text-blue-600">Third-Party Sharing</a></li>
            <li><a href="#changes" className="hover:text-blue-600">Changes to This Policy</a></li>
            <li><a href="#contact" className="hover:text-blue-600">Contact Information</a></li>
            <li><a href="#complaints" className="hover:text-blue-600">Complaints Procedure</a></li>
            <li><a href="#governing-law" className="hover:text-blue-600">Governing Law</a></li>
            <li><a href="#continuous-improvement" className="hover:text-blue-600">Continuous Improvement</a></li>
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
      </motion.div>
      <Footer />
    </div>
  );
};

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: `
      <p>This Privacy Policy ("Policy") is provided by Vocal Excellence Summer Programme, operating at Nafpliou 12, Pentadromos, 3025, Limassol, Cyprus ("we," "us," "our," or the "Controller").</p>
      <p>This Policy details how we collect, use, store, protect, and share your personal data when you visit our website at vocalexcellence.cy ("Website"), apply to our programme, or interact with our services.</p>
      <p>We are committed to protecting your personal data in strict accordance with:</p>
      <ul>
        <li>General Data Protection Regulation (EU) 2016/679 ("GDPR")</li>
        <li>The Protection of Natural Persons with Regard to the Processing of Personal Data and for the Free Movement of Such Data Law of 2018 (Law 125(I)/2018) of the Republic of Cyprus</li>
        <li>ePrivacy Directive 2002/58/EC (as transposed into Cyprus law)</li>
      </ul>
      <p><strong>Records of Processing Activities (ROPA):</strong> In compliance with GDPR Article 30, we maintain a comprehensive Record of Processing Activities (ROPA), which is available to supervisory authorities upon request.</p>
    `
  },
  {
    id: "definitions",
    title: "2. Definitions",
    content: `
      <ul>
        <li><strong>"Personal Data":</strong> Any information relating to an identified or identifiable natural person ("Data Subject").</li>
        <li><strong>"Processing":</strong> Any operation performed on personal data, such as collection, recording, organization, structuring, storage, adaptation, retrieval, use, disclosure, or destruction.</li>
        <li><strong>"Controller":</strong> The entity that determines the purposes and means of the processing of personal data (Vocal Excellence).</li>
        <li><strong>"Processor":</strong> An entity that processes personal data on behalf of the Controller.</li>
        <li><strong>"Consent":</strong> A freely given, specific, informed, and unambiguous indication of the data subject's wishes.</li>
        <li><strong>"Special Categories of Data":</strong> Personal data revealing racial or ethnic origin, political opinions, religious beliefs, trade union membership, genetic data, biometric data, or health data.</li>
      </ul>
    `
  },
  {
    id: "data-controller",
    title: "3. Data Controller Information",
    content: `
      <p><strong>Controller Name:</strong> Vocal Excellence Summer Programme</p>
      <p><strong>Registered Address:</strong> Nafpliou 12, Pentadromos, 3025, Limassol, Cyprus</p>
      <h4>Data Protection Officer (DPO):</h4>
      <ul>
        <li><strong>Name:</strong> Andreas Aroditis</li>
        <li><strong>Email:</strong> privacy@vocalexcellence.cy</li>
        <li><strong>Phone:</strong> +357 25 775 885</li>
        <li><strong>Hours:</strong> Monday–Friday, 9:00 AM – 5:00 PM EET</li>
      </ul>
    `
  },
  {
    id: "information-we-collect",
    title: "4. Information We Collect",
    content: `
      <p>We are committed to Data Minimization. We collect only personal data that is adequate, relevant, and limited to what is necessary for the purposes specified below.</p>
      
      <h4>4.1 Personal Data Categories</h4>
      <table class="w-full border-collapse border border-gray-300 my-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Category</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Data Types Collected</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2"><strong>Identity & Contact</strong></td>
            <td class="border border-gray-300 px-4 py-2">Full name, email address, postal address, telephone number, date of birth, nationality, gender, passport/ID details (for verification/visa).</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2"><strong>Application Data</strong></td>
            <td class="border border-gray-300 px-4 py-2">Vocal type/range, educational background, performance experience, audio/video recordings, personal statements, CV/résumé, references.</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2"><strong>Account Data</strong></td>
            <td class="border border-gray-300 px-4 py-2">Username, encrypted password, login records, account preferences, audit logs.</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2"><strong>Financial Data</strong></td>
            <td class="border border-gray-300 px-4 py-2">Billing address, transaction history, payment records. Note: We do not store full credit card numbers; these are handled directly by our PCI-DSS compliant payment processors.</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2"><strong>Technical Data</strong></td>
            <td class="border border-gray-300 px-4 py-2">IP address, browser type/version, time zone, OS, device info, cookie identifiers.</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2"><strong>Marketing Data</strong></td>
            <td class="border border-gray-300 px-4 py-2">Preferences for receiving communications, subscription status, open/click rates.</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2"><strong>Special Categories</strong></td>
            <td class="border border-gray-300 px-4 py-2">(Only with Explicit Consent): Health/dietary requirements (allergies), accessibility needs, photos/videos of performances.</td>
          </tr>
        </tbody>
      </table>
      
      <h4>4.2 Accuracy of Data</h4>
      <p>You are responsible for ensuring your information remains accurate. We encourage you to review and update your information regularly through your account settings or by contacting us.</p>
    `
  },
  {
    id: "legal-basis",
    title: "5. Legal Basis for Processing",
    content: `
      <p>We process your data only when we have a valid legal basis. The following table maps our processing activities to their specific GDPR legal bases:</p>
      
      <table class="w-full border-collapse border border-gray-300 my-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Processing Activity</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Legal Basis</th>
            <th class="border border-gray-300 px-4 py-2 text-left">GDPR Article</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Application Assessment</td>
            <td class="border border-gray-300 px-4 py-2">Contractual Necessity (Steps prior to contract)</td>
            <td class="border border-gray-300 px-4 py-2">Art. 6(1)(b)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Programme Delivery</td>
            <td class="border border-gray-300 px-4 py-2">Contractual Necessity</td>
            <td class="border border-gray-300 px-4 py-2">Art. 6(1)(b)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Tuition Payment</td>
            <td class="border border-gray-300 px-4 py-2">Contractual Necessity</td>
            <td class="border border-gray-300 px-4 py-2">Art. 6(1)(b)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Tax & Financial Records</td>
            <td class="border border-gray-300 px-4 py-2">Legal Obligation (Cyprus Tax Law)</td>
            <td class="border border-gray-300 px-4 py-2">Art. 6(1)(c)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Security & Fraud Prevention</td>
            <td class="border border-gray-300 px-4 py-2">Legitimate Interests</td>
            <td class="border border-gray-300 px-4 py-2">Art. 6(1)(f)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Marketing Communications</td>
            <td class="border border-gray-300 px-4 py-2">Consent</td>
            <td class="border border-gray-300 px-4 py-2">Art. 6(1)(a)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Performance Photos/Video</td>
            <td class="border border-gray-300 px-4 py-2">Explicit Consent</td>
            <td class="border border-gray-300 px-4 py-2">Art. 9(2)(a)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Health/Dietary Info</td>
            <td class="border border-gray-300 px-4 py-2">Explicit Consent</td>
            <td class="border border-gray-300 px-4 py-2">Art. 9(2)(a)</td>
          </tr>
        </tbody>
      </table>
      
      <p><strong>Legitimate Interests Assessment (LIA):</strong> Where we rely on legitimate interests (e.g., security, service improvement), we maintain documented LIAs ensuring your fundamental rights and freedoms do not override our interests.</p>
    `
  },
  {
    id: "how-we-use",
    title: "6. How We Use Your Information",
    content: `
      <p>We use your personal data for the following specific purposes:</p>
      <ul>
        <li><strong>Application Processing:</strong> Evaluating eligibility, vocal assessment, and faculty review.</li>
        <li><strong>Programme Administration:</strong> Scheduling, instructor matching, attendance, and certification.</li>
        <li><strong>Account Management:</strong> Authentication, security monitoring, and password management.</li>
        <li><strong>Financial Operations:</strong> Invoicing, refund processing, and scholarship disbursement.</li>
        <li><strong>Communications:</strong> Sending pre-arrival guides, schedules, and support responses.</li>
        <li><strong>Website Operations:</strong> Ensuring functionality, load balancing, and technical troubleshooting.</li>
        <li><strong>Marketing:</strong> Promoting future programmes (only with your opt-in).</li>
        <li><strong>Legal Compliance:</strong> Satisfying tax, accounting, and educational regulations.</li>
      </ul>
    `
  },
  {
    id: "data-retention",
    title: "7. Data Retention & Minimization",
    content: `
      <h4>7.1 Retention Schedule</h4>
      <p>We retain data only as long as necessary.</p>
      
      <table class="w-full border-collapse border border-gray-300 my-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Data Category</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Retention Period</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Successful Applicants</td>
            <td class="border border-gray-300 px-4 py-2">7 years post-completion</td>
            <td class="border border-gray-300 px-4 py-2">Tax/Legal claims limitation</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Unsuccessful Applicants</td>
            <td class="border border-gray-300 px-4 py-2">2 years from decision</td>
            <td class="border border-gray-300 px-4 py-2">Defense of legal claims</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Financial Records</td>
            <td class="border border-gray-300 px-4 py-2">7 years from transaction</td>
            <td class="border border-gray-300 px-4 py-2">Cyprus Tax Law requirements</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Account Info</td>
            <td class="border border-gray-300 px-4 py-2">Duration of active account + 2 years</td>
            <td class="border border-gray-300 px-4 py-2">Service continuity</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Marketing Data</td>
            <td class="border border-gray-300 px-4 py-2">Until consent withdrawal</td>
            <td class="border border-gray-300 px-4 py-2">User preference</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Server Logs</td>
            <td class="border border-gray-300 px-4 py-2">90 days</td>
            <td class="border border-gray-300 px-4 py-2">Security auditing</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Session Cookies</td>
            <td class="border border-gray-300 px-4 py-2">Upon browser close</td>
            <td class="border border-gray-300 px-4 py-2">Technical necessity</td>
          </tr>
        </tbody>
      </table>
      
      <h4>7.2 Data Deletion</h4>
      <p>At the end of the retention period, data is securely deleted (using industry-standard overwriting methods) or anonymized so it can no longer be associated with you.</p>
      
      <h4>7.3 Privacy by Design and Default</h4>
      <p>We implement privacy by design principles, ensuring:</p>
      <ul>
        <li>Data protection is embedded in system architecture.</li>
        <li>Default settings provide maximum privacy (e.g., marketing boxes are pre-unchecked).</li>
        <li>Regular privacy reviews are conducted during development.</li>
      </ul>
    `
  },
  {
    id: "security",
    title: "8. Data Protection & Security Measures",
    content: `
      <p>We employ a Zero Trust security model and robust technical measures to protect your data.</p>
      
      <h4>8.1 Technical Security</h4>
      <ul>
        <li><strong>Encryption:</strong> Data at rest is encrypted using AES-256. Data in transit is encrypted via TLS 1.3.</li>
        <li><strong>Access Control:</strong> Strict Role-Based Access Control (RBAC) with Multi-Factor Authentication (MFA) for all administrative access.</li>
        <li><strong>Monitoring:</strong> Automated intrusion detection systems (IDS) and immutable audit logs.</li>
        <li><strong>Vulnerability Management:</strong> Regular automated scanning and annual penetration testing.</li>
      </ul>
      
      <h4>8.2 Organizational Measures</h4>
      <ul>
        <li>Mandatory data protection training for all staff.</li>
        <li>Confidentiality non-disclosure agreements (NDAs) for all employees and contractors.</li>
        <li>Vendor risk management program for all third-party processors.</li>
      </ul>
      
      <h4>8.3 Data Protection Impact Assessments (DPIA)</h4>
      <p>We conduct DPIAs for high-risk processing activities, including the processing of special category data (health/biometrics) and new technology implementation. These are reviewed annually.</p>
      
      <h4>8.4 Data Breach Procedures</h4>
      <p>We maintain a Data Breach Register. In the event of a high-risk breach, we will:</p>
      <ul>
        <li>Notify the Office of the Commissioner for Personal Data Protection within 72 hours.</li>
        <li>Notify affected Data Subjects without undue delay if there is a high risk to their rights.</li>
        <li>Provide a clear explanation of the breach, likely consequences, and remedial measures.</li>
      </ul>
    `
  },
  {
    id: "your-rights",
    title: "9. Your Rights Under GDPR",
    content: `
      <p>You have the following rights. We will respond to all requests within 30 days.</p>
      <ul>
        <li><strong>Right to Access (Art. 15):</strong> Request a copy of your personal data.</li>
        <li><strong>Right to Rectification (Art. 16):</strong> Correct inaccurate or incomplete data.</li>
        <li><strong>Right to Erasure ("Right to be Forgotten") (Art. 17):</strong> Request deletion of data where legal grounds exist.</li>
        <li><strong>Right to Restriction (Art. 18):</strong> Suspend processing while specific issues are resolved.</li>
        <li><strong>Right to Data Portability (Art. 20):</strong> Receive your data in a CSV/JSON format.</li>
        <li><strong>Right to Object (Art. 21):</strong> Object to processing based on legitimate interests or direct marketing.</li>
        <li><strong>Automated Decision-Making (Art. 22):</strong> We do not make decisions with legal or similarly significant effects based solely on automated processing. You have the right to human intervention.</li>
      </ul>
      
      <h4>9.1 How to Exercise Your Rights</h4>
      <p>Contact our DPO at <a href="mailto:privacy@vocalexcellence.cy">privacy@vocalexcellence.cy</a>.</p>
      <ul>
        <li><strong>Verification:</strong> We may request proof of identity (e.g., passport copy) to prevent unauthorized access.</li>
        <li><strong>Fees:</strong> Requests are free of charge unless manifestly unfounded or excessive, in which case a reasonable administrative fee may apply.</li>
      </ul>
      
      <h4>9.2 Consent Withdrawal</h4>
      <p>You may withdraw consent at any time by:</p>
      <ul>
        <li>Clicking "Unsubscribe" in emails.</li>
        <li>Adjusting settings in your User Dashboard.</li>
        <li>Emailing <a href="mailto:privacy@vocalexcellence.cy">privacy@vocalexcellence.cy</a>.</li>
      </ul>
      <p>Withdrawal does not affect the lawfulness of processing based on consent before its withdrawal.</p>
    `
  },
  {
    id: "international-transfers",
    title: "10. International Data Transfers",
    content: `
      <p>We primarily store data within the European Economic Area (EEA).</p>
      
      <h4>10.1 Transfers to Third Countries</h4>
      <p>Where we transfer data to service providers outside the EEA (e.g., USA, UK), we ensure protection via:</p>
      <ul>
        <li><strong>Adequacy Decisions:</strong> (e.g., for the UK).</li>
        <li><strong>Standard Contractual Clauses (SCCs):</strong> We utilize the EU's 2021 SCCs for transfers to countries without adequacy decisions (e.g., USA).</li>
        <li><strong>Transfer Impact Assessments (TIAs):</strong> We evaluate the legal framework of the destination country to ensure your data rights are protected.</li>
      </ul>
      
      <h4>10.2 Data Processing Locations</h4>
      <ul>
        <li><strong>Web Hosting/Database:</strong> Germany (EEA)</li>
        <li><strong>Email Services:</strong> USA (Protected via SCCs & Data Privacy Framework participation)</li>
        <li><strong>Payment Processing:</strong> Global (PCI-DSS Level 1 Compliant)</li>
      </ul>
    `
  },
  {
    id: "cookies",
    title: "11. Cookies & Tracking Technologies",
    content: `
      <p>We use a Consent Management Platform (CMP) to manage cookies. No non-essential cookies are placed on your device until you explicitly accept them.</p>
      
      <h4>11.1 Cookie Categories</h4>
      <table class="w-full border-collapse border border-gray-300 my-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Type</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Purpose</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Consent Required?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Strictly Necessary</td>
            <td class="border border-gray-300 px-4 py-2">Security, login state, load balancing.</td>
            <td class="border border-gray-300 px-4 py-2">No</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Functional</td>
            <td class="border border-gray-300 px-4 py-2">Language preferences, video player settings.</td>
            <td class="border border-gray-300 px-4 py-2">Yes</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Analytics</td>
            <td class="border border-gray-300 px-4 py-2">Aggregated usage data (Google Analytics 4).</td>
            <td class="border border-gray-300 px-4 py-2">Yes</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Marketing</td>
            <td class="border border-gray-300 px-4 py-2">Retargeting and ad performance measurement.</td>
            <td class="border border-gray-300 px-4 py-2">Yes</td>
          </tr>
        </tbody>
      </table>
      
      <h4>11.2 Managing Preferences</h4>
      <p>You can modify your preferences at any time via the "Cookie Settings" link in our website footer.</p>
    `
  },
  {
    id: "childrens-privacy",
    title: "12. Children's Privacy",
    content: `
      <h4>12.1 Digital Age of Consent (Cyprus)</h4>
      <p>Under Law 125(I)/2018, the digital age of consent in Cyprus is 14 years. We do not knowingly collect data online from individuals under 14 without verifiable parental consent.</p>
      
      <h4>12.2 Programme Participation (Minors)</h4>
      <p>For applicants aged 14–17:</p>
      <ul>
        <li>Applications must be submitted with the explicit consent of a parent or legal guardian.</li>
        <li>We require a signed Parental Consent Form verifying the guardian's identity and approval.</li>
        <li>If we discover data collected from a minor without this consent, it will be immediately deleted.</li>
      </ul>
    `
  },
  {
    id: "third-party",
    title: "13. Third-Party Sharing",
    content: `
      <p>We do not sell your data. We share data only with the following distinct categories of recipients strictly for the purposes outlined in this Policy:</p>
      
      <h4>Service Providers (Processors):</h4>
      <ul>
        <li><strong>Cloud Infrastructure:</strong> (e.g., Google Cloud/AWS) – Hosting & Storage.</li>
        <li><strong>Payment Processors:</strong> (e.g., Stripe, PayPal) – Secure transaction handling.</li>
        <li><strong>Communication Tools:</strong> (e.g., SendGrid, Mailchimp) – Email delivery.</li>
      </ul>
      
      <h4>Educational Partners:</h4>
      <p>Faculty members (for application review) and venue partners (for security/access lists).</p>
      
      <h4>Legal Authorities:</h4>
      <p>When required by valid legal process (e.g., court order) or to protect our rights.</p>
    `
  },
  {
    id: "changes",
    title: "14. Changes to This Policy",
    content: `
      <p>We may update this Policy to reflect changes in law or our processing.</p>
      <ul>
        <li><strong>Notification:</strong> Material changes will be notified via email to registered users 30 days prior to taking effect.</li>
        <li><strong>Log:</strong> A history of policy versions is available upon request.</li>
      </ul>
    `
  },
  {
    id: "contact",
    title: "15. Contact Information",
    content: `
      <p>For any privacy-related inquiries, please contact our Data Protection Officer:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:privacy@vocalexcellence.cy">privacy@vocalexcellence.cy</a></li>
        <li><strong>Phone:</strong> +357 25 775 885</li>
        <li><strong>Address:</strong><br/>
          Vocal Excellence Summer Programme<br/>
          Attn: Data Protection Officer<br/>
          Nafpliou 12, Pentadromos, 3025<br/>
          Limassol, Cyprus
        </li>
      </ul>
    `
  },
  {
    id: "complaints",
    title: "16. Complaints Procedure",
    content: `
      <h4>16.1 Internal Resolution</h4>
      <p>Please contact us first. We aim to resolve all privacy complaints within 30 days.</p>
      
      <h4>16.2 Supervisory Authority</h4>
      <p>If you remain dissatisfied, you have the right to lodge a complaint with the Cyprus Supervisory Authority:</p>
      <ul>
        <li><strong>Office of the Commissioner for Personal Data Protection</strong></li>
        <li>Address: Iasonos 1, 1082 Nicosia, Cyprus</li>
        <li>Postal: P.O. Box 23378, 1682 Nicosia, Cyprus</li>
        <li>Tel: +357 22 818 456</li>
        <li>Email: <a href="mailto:commissioner@dataprotection.gov.cy">commissioner@dataprotection.gov.cy</a></li>
        <li>Website: <a href="https://www.dataprotection.gov.cy" target="_blank" rel="noopener noreferrer">www.dataprotection.gov.cy</a></li>
      </ul>
      
      <h4>16.3 Accessibility</h4>
      <p>This Policy is available in accessible formats (e.g., large print) upon request.</p>
    `
  },
  {
    id: "governing-law",
    title: "17. Governing Law",
    content: `
      <p>This Privacy Policy shall be governed by the laws of the Republic of Cyprus. Any disputes shall be subject to the exclusive jurisdiction of the courts of Limassol, Cyprus.</p>
    `
  },
  {
    id: "continuous-improvement",
    title: "18. Continuous Improvement",
    content: `
      <p>We review this Privacy Policy annually or whenever significant changes occur in our processing activities or the regulatory landscape.</p>
      <ul>
        <li><strong>Internal Compliance Officer:</strong> Andreas Aroditis</li>
        <li><strong>Date of Last Audit:</strong> January 5, 2026</li>
      </ul>
    `
  }
];

export default PrivacyPolicy;
