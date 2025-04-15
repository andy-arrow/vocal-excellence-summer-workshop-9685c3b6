
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.div 
        className="max-w-4xl mx-auto px-6 py-16 md:py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none">
          <div className="mb-8 text-sm text-gray-600">
            <p>Effective Date: April 15, 2025</p>
            <p>Last Updated: April 15, 2025</p>
            <p>Version: 1.0</p>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

const sections = [
  {
    title: "1. INTRODUCTION",
    content: `
      <p>This Privacy Policy ("Policy") is provided by Vocal Excellence Summer Programme, operating at Nafpliou 12, Pentadromos, 3025, Limassol, Cyprus ("we," "us," "our," or the "Controller").</p>
      <p>This Policy details how we collect, use, store, protect, and share your personal data when you:</p>
      <ul>
        <li>Visit our website at vocalexcellence.cy ("Website")</li>
        <li>Apply to our programme</li>
        <li>Create an account or log in</li>
        <li>Participate in our summer programme</li>
        <li>Contact us for information</li>
        <li>Subscribe to communications from us</li>
      </ul>
      <p>We respect your privacy and are committed to protecting your personal data in accordance with the General Data Protection Regulation (EU) 2016/679 ("GDPR"), the Cyprus Law providing for the Protection of Natural Persons with regard to the Processing of Personal Data and for the Free Movement of such Data of 2018 (Law 125(I)/2018), and other applicable data protection legislation.</p>
    `
  },
  {
    title: "2. DEFINITIONS",
    content: `
      <p>For clarity within this Policy:</p>
      <ul>
        <li><strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person ("Data Subject"); an identifiable natural person is one who can be identified, directly or indirectly.</li>
        <li><strong>"Processing"</strong> means any operation or set of operations which is performed on personal data or on sets of personal data.</li>
        <li><strong>"Data Controller"</strong> or "Controller" means the natural or legal person, public authority, agency, or other body which, alone or jointly with others, determines the purposes and means of the processing of personal data.</li>
        <li><strong>"Data Processor"</strong> or "Processor" means a natural or legal person, public authority, agency, or other body which processes personal data on behalf of the controller.</li>
        <li><strong>"Data Subject"</strong> means an identified or identifiable natural person to whom the personal data relates.</li>
        <li><strong>"Consent"</strong> of the data subject means any freely given, specific, informed, and unambiguous indication of the data subject's wishes.</li>
      </ul>
    `
  },
  {
    title: "3. DATA CONTROLLER INFORMATION",
    content: `
      <p><strong>Controller Name:</strong> Vocal Excellence Summer Programme</p>
      <p><strong>Registered Address:</strong> Nafpliou 12, Pentadromos, 3025, Limassol, Cyprus</p>
      <p><strong>Contact Information:</strong></p>
      <ul>
        <li>Email: info@vocalexcellence.cy</li>
        <li>Phone: +357 25 775 885</li>
      </ul>
      <p><strong>Data Protection Officer (DPO):</strong></p>
      <ul>
        <li>Name: Andreas Aroditis</li>
        <li>Email: info@vocalexcellence.cy</li>
        <li>Phone: +357 25 775 885</li>
      </ul>
    `
  },
  {
    title: "4. INFORMATION WE COLLECT",
    content: `
      <h3>4.1 Personal Data Categories</h3>
      <p>We collect and process the following categories of personal data:</p>
      
      <h4>4.1.1 Identity and Contact Information</h4>
      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Postal address</li>
        <li>Telephone number</li>
        <li>Date of birth</li>
        <li>Nationality</li>
        <li>Gender</li>
        <li>Passport/ID information (for verification purposes)</li>
        <li>Emergency contact information</li>
      </ul>
      
      <h4>4.1.2 Application Information</h4>
      <ul>
        <li>Vocal type/range</li>
        <li>Educational background</li>
        <li>Performance experience</li>
        <li>Professional affiliations</li>
        <li>Audio/video recordings</li>
        <li>Personal statements</li>
        <li>References</li>
        <li>Curriculum vitae/résumé</li>
        <li>Educational transcripts</li>
        <li>Performance portfolios</li>
      </ul>
      
      <h4>4.1.3 Account Information</h4>
      <ul>
        <li>Username</li>
        <li>Password (stored in encrypted form)</li>
        <li>Account preferences</li>
        <li>Login records</li>
        <li>Account activity</li>
      </ul>
      
      <h4>4.1.4 Financial Information</h4>
      <ul>
        <li>Payment card details (processed securely through our payment processors)</li>
        <li>Bank account information (for refunds or scholarship disbursements)</li>
        <li>Billing address</li>
        <li>Transaction history</li>
        <li>Payment records</li>
      </ul>
      
      <h4>4.1.5 Communication Data</h4>
      <ul>
        <li>Email communications</li>
        <li>Support requests</li>
        <li>Feedback provided</li>
        <li>Survey responses</li>
        <li>Programme evaluations</li>
        <li>Inquiries and correspondence</li>
      </ul>
      
      <h4>4.1.6 Technical Data</h4>
      <ul>
        <li>IP address</li>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Device information</li>
        <li>Time zone setting</li>
        <li>Location data</li>
        <li>Website usage statistics</li>
        <li>Cookie identifiers</li>
      </ul>
      
      <h4>4.1.7 Marketing and Preferences</h4>
      <ul>
        <li>Marketing preferences</li>
        <li>Subscription preferences</li>
        <li>Communication preferences</li>
        <li>Areas of interest</li>
      </ul>
      
      <h4>4.1.8 Special Categories of Personal Data</h4>
      <p>With your explicit consent, we may collect:</p>
      <ul>
        <li>Health information relevant to programme participation</li>
        <li>Dietary requirements</li>
        <li>Accessibility needs</li>
        <li>Photographs and video recordings of performances</li>
      </ul>
      
      <h3>4.2 Sources of Personal Data</h3>
      <p>We collect personal data from the following sources:</p>
      
      <h4>4.2.1 Direct Sources</h4>
      <ul>
        <li>Information you provide when completing our application forms</li>
        <li>Information you provide when creating an account</li>
        <li>Your communications with us</li>
        <li>Documents you submit</li>
        <li>Forms you complete</li>
        <li>Surveys you respond to</li>
      </ul>
      
      <h4>4.2.2 Automated Sources</h4>
      <ul>
        <li>Cookies</li>
        <li>Server logs</li>
        <li>Analytics tools</li>
        <li>Authentication systems</li>
      </ul>
      
      <h4>4.2.3 Third-Party Sources</h4>
      <ul>
        <li>References</li>
        <li>Recommenders</li>
        <li>Educational institutions</li>
        <li>Social media platforms (where you have linked your account)</li>
        <li>Payment processors</li>
        <li>Identity verification services</li>
      </ul>
    `
  },
  {
    title: "5. LEGAL BASIS FOR PROCESSING",
    content: `
      <p>We process your personal data on the following legal bases:</p>
      
      <h3>5.1 Contractual Necessity</h3>
      <p>We process your personal data to fulfill our contractual obligations to you, including:</p>
      <ul>
        <li>Processing your application</li>
        <li>Providing the summer programme services</li>
        <li>Managing your account</li>
        <li>Processing payments</li>
        <li>Issuing certificates of participation</li>
      </ul>
      
      <h3>5.2 Legitimate Interests</h3>
      <p>We process your personal data based on our legitimate interests, which include:</p>
      <ul>
        <li>Improving our services</li>
        <li>Ensuring the security of our Website and services</li>
        <li>Preventing fraud</li>
        <li>Analyzing usage patterns to enhance user experience</li>
        <li>Marketing our services to individuals who have expressed interest</li>
      </ul>
      
      <h3>5.3 Legal Obligation</h3>
      <p>We process your personal data to comply with legal obligations, including:</p>
      <ul>
        <li>Tax and accounting requirements</li>
        <li>Record-keeping obligations</li>
        <li>Responding to lawful requests from authorities</li>
        <li>Compliance with educational regulations</li>
      </ul>
      
      <h3>5.4 Consent</h3>
      <p>We process your personal data based on your consent for:</p>
      <ul>
        <li>Sending marketing communications</li>
        <li>Using your testimonials or feedback</li>
        <li>Publishing photographs or recordings of performances</li>
        <li>Processing special categories of personal data</li>
        <li>Sharing your information with faculty members</li>
      </ul>
      <p>You may withdraw your consent at any time by contacting us at info@vocalexcellence.cy or using the unsubscribe mechanism in our communications.</p>
    `
  },
  {
    title: "6. HOW WE USE YOUR INFORMATION",
    content: `
      <p>We use your personal data for the following specific purposes:</p>
      
      <h3>6.1 Application Processing</h3>
      <ul>
        <li>Evaluating your eligibility for the programme</li>
        <li>Assessing your vocal abilities and experience</li>
        <li>Making admission decisions</li>
        <li>Communicating application status</li>
        <li>Facilitating faculty review of applications</li>
      </ul>
      
      <h3>6.2 Programme Administration</h3>
      <ul>
        <li>Creating participant profiles</li>
        <li>Organizing classes and performances</li>
        <li>Matching participants with appropriate instructors</li>
        <li>Scheduling individual coaching sessions</li>
        <li>Issuing completion certificates</li>
        <li>Maintaining attendance records</li>
        <li>Facilitating performances and showcases</li>
      </ul>
      
      <h3>6.3 Account Management</h3>
      <ul>
        <li>Creating and maintaining your user account</li>
        <li>Authentication and access control</li>
        <li>Password reset functionality</li>
        <li>Account security monitoring</li>
        <li>Managing your preferences</li>
      </ul>
      
      <h3>6.4 Financial Operations</h3>
      <ul>
        <li>Processing tuition payments</li>
        <li>Issuing refunds when applicable</li>
        <li>Processing scholarship applications</li>
        <li>Financial record-keeping</li>
        <li>Generating invoices and receipts</li>
      </ul>
      
      <h3>6.5 Communications</h3>
      <ul>
        <li>Sending programme updates and information</li>
        <li>Responding to inquiries</li>
        <li>Providing support</li>
        <li>Sending pre-arrival information</li>
        <li>Distributing schedules and programme materials</li>
        <li>Follow-up communications after programme completion</li>
      </ul>
      
      <h3>6.6 Website Operations</h3>
      <ul>
        <li>Providing access to website features</li>
        <li>Maintaining website functionality</li>
        <li>Analyzing website performance</li>
        <li>Improving user experience</li>
        <li>Troubleshooting technical issues</li>
      </ul>
      
      <h3>6.7 Marketing and Promotion</h3>
      <ul>
        <li>Sending promotional materials about future programmes</li>
        <li>Informing you about related opportunities</li>
        <li>Inviting you to events</li>
        <li>Sharing news and updates about the programme</li>
        <li>Alumni communications</li>
      </ul>
      
      <h3>6.8 Analysis and Improvement</h3>
      <ul>
        <li>Analyzing application trends</li>
        <li>Evaluating programme effectiveness</li>
        <li>Gathering feedback for improvement</li>
        <li>Conducting research to enhance vocal pedagogy</li>
        <li>Developing new programme offerings</li>
      </ul>
      
      <h3>6.9 Legal Compliance</h3>
      <ul>
        <li>Maintaining records required by law</li>
        <li>Responding to legal requests</li>
        <li>Protecting our legal rights</li>
        <li>Ensuring compliance with educational regulations</li>
        <li>Fulfilling tax and accounting obligations</li>
      </ul>
    `
  },
  {
    title: "7. DATA RETENTION",
    content: `
      <h3>7.1 Retention Periods</h3>
      <p>We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. Specific retention periods are:</p>
      
      <h4>7.1.1 Application Data</h4>
      <ul>
        <li>Successful applicants: 7 years after programme completion</li>
        <li>Unsuccessful applicants: 2 years from application decision</li>
        <li>Incomplete applications: 1 year from last activity</li>
      </ul>
      
      <h4>7.1.2 Account Information</h4>
      <ul>
        <li>Active accounts: Duration of the account plus 2 years after last activity</li>
        <li>Closed accounts: 1 year after closure for technical and legal purposes</li>
      </ul>
      
      <h4>7.1.3 Financial Records</h4>
      <ul>
        <li>Payment information: 7 years after transaction (as required by tax laws)</li>
        <li>Payment card information: Not stored beyond processing (handled by secure payment processors)</li>
      </ul>
      
      <h4>7.1.4 Communications</h4>
      <ul>
        <li>General correspondence: 3 years after last communication</li>
        <li>Support requests: 2 years after resolution</li>
      </ul>
      
      <h4>7.1.5 Marketing Data</h4>
      <ul>
        <li>Until consent withdrawal or 3 years after last interaction, whichever comes first</li>
      </ul>
      
      <h4>7.1.6 Website Usage Data</h4>
      <ul>
        <li>Analytics data: 26 months</li>
        <li>Server logs: 90 days</li>
      </ul>
      
      <h3>7.2 Criteria for Determining Retention Periods</h3>
      <p>In determining appropriate retention periods, we consider:</p>
      <ul>
        <li>The amount, nature, and sensitivity of the personal data</li>
        <li>The potential risk of harm from unauthorized use or disclosure</li>
        <li>The purposes for which we process the data</li>
        <li>Whether we can achieve those purposes through other means</li>
        <li>Applicable legal, regulatory, tax, accounting, or other requirements</li>
      </ul>
      
      <h3>7.3 Data Deletion and Anonymization</h3>
      <p>At the end of the retention period, we will:</p>
      <ul>
        <li>Securely delete the data; or</li>
        <li>Anonymize the data (so that it can no longer be associated with you)</li>
      </ul>
    `
  },
  {
    title: "8. DATA PROTECTION AND SECURITY MEASURES",
    content: `
      <p>We have implemented appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
      
      <h3>8.1 Technical Measures</h3>
      <ul>
        <li>Data encryption in transit and at rest</li>
        <li>Secure Sockets Layer (SSL) technology on our Website</li>
        <li>Firewalls and intrusion detection systems</li>
        <li>Server security updates and patches</li>
        <li>Anti-virus and anti-malware protection</li>
        <li>Multi-factor authentication for administrative access</li>
        <li>Regular security testing and vulnerability assessments</li>
        <li>Regular data backups</li>
        <li>Access logging and monitoring</li>
      </ul>
      
      <h3>8.2 Organizational Measures</h3>
      <ul>
        <li>Staff data protection training</li>
        <li>Confidentiality obligations for staff and contractors</li>
        <li>Role-based access controls</li>
        <li>Data protection impact assessments for new processes</li>
        <li>Incident response procedures</li>
        <li>Data processing agreements with service providers</li>
        <li>Regular review of security practices</li>
        <li>Physical security measures for premises</li>
        <li>Data minimization practices</li>
        <li>Formal information security policies</li>
      </ul>
      
      <h3>8.3 Payment Processing Security</h3>
      <p>We do not directly store payment card details. All payment processing is conducted through PCI-DSS compliant payment service providers.</p>
      
      <h3>8.4 Data Breach Procedures</h3>
      <p>In the event of a personal data breach, we will:</p>
      <ul>
        <li>Notify the relevant supervisory authority without undue delay and not later than 72 hours after becoming aware of the breach, where feasible</li>
        <li>Notify affected data subjects without undue delay when the breach is likely to result in a high risk to their rights and freedoms</li>
        <li>Document all breaches, including facts, effects, and remedial action taken</li>
      </ul>
    `
  },
  {
    title: "9. YOUR RIGHTS UNDER GDPR",
    content: `
      <p>Under the GDPR, you have the following rights regarding your personal data:</p>
      
      <h3>9.1 Right to Access (Article 15)</h3>
      <p>You have the right to obtain confirmation as to whether we process your personal data and, where we do, access to that personal data and related information.</p>
      
      <h3>9.2 Right to Rectification (Article 16)</h3>
      <p>You have the right to obtain the rectification of inaccurate personal data without undue delay.</p>
      
      <h3>9.3 Right to Erasure (Article 17)</h3>
      <p>You have the right to obtain the erasure of your personal data without undue delay in certain circumstances.</p>
      
      <h3>9.4 Right to Restriction of Processing (Article 18)</h3>
      <p>You have the right to restrict processing when certain conditions apply.</p>
      
      <h3>9.5 Right to Data Portability (Article 20)</h3>
      <p>You have the right to receive your personal data in a structured, commonly used, machine-readable format.</p>
      
      <h3>9.6 Right to Object (Article 21)</h3>
      <p>You have the right to object to processing based on legitimate interests, public interest tasks, direct marketing, or research purposes.</p>
      
      <h3>9.7 Rights Related to Automated Decision-Making (Article 22)</h3>
      <p>You have the right not to be subject to a decision based solely on automated processing, including profiling, with certain exceptions.</p>
      
      <h3>9.8 Right to Withdraw Consent</h3>
      <p>Where processing is based on consent, you have the right to withdraw that consent at any time.</p>
      
      <h3>9.9 How to Exercise Your Rights</h3>
      <p>To exercise any of these rights, please contact us at:</p>
      <ul>
        <li>Email: info@vocalexcellence.cy</li>
        <li>Postal Address: Nafpliou 12, Pentadromos, 3025, Limassol, Cyprus</li>
        <li>Phone: +357 25 775 885</li>
      </ul>
    `
  },
  {
    title: "10. INTERNATIONAL DATA TRANSFERS",
    content: `
      <p>We primarily store and process your personal data within the European Economic Area (EEA). However, some of our service providers may be based outside the EEA, which may involve a transfer of your personal data outside the EEA.</p>
      
      <h3>10.1 Transfer Safeguards</h3>
      <p>Whenever we transfer your personal data outside the EEA, we ensure a similar degree of protection by implementing at least one of the following safeguards:</p>
      <ul>
        <li>Transfers to countries with adequate protection</li>
        <li>EU-US Data Privacy Framework where applicable</li>
        <li>Standard Contractual Clauses</li>
        <li>Supplementary measures as recommended by the European Data Protection Board</li>
        <li>Explicit consent (in limited circumstances)</li>
      </ul>
      
      <h3>10.2 Service Providers Outside the EEA</h3>
      <p>We may use service providers based in the following non-EEA locations:</p>
      <ul>
        <li>United States (for cloud storage, email services, and payment processing)</li>
        <li>United Kingdom (for application processing and educational services)</li>
      </ul>
    `
  },
  {
    title: "11. COOKIES AND TRACKING TECHNOLOGIES",
    content: `
      <h3>11.1 What Are Cookies</h3>
      <p>Cookies are small text files placed on your device when you visit our Website. They allow us to recognize your device and store information about your preferences or past actions.</p>
      
      <h3>11.2 Types of Cookies We Use</h3>
      <h4>11.2.1 Strictly Necessary Cookies</h4>
      <p>These cookies are essential for enabling user movement around our Website and providing access to features such as secure areas.</p>
      
      <h4>11.2.2 Functionality Cookies</h4>
      <p>These cookies allow our Website to remember choices you make and provide enhanced, personalized features.</p>
      
      <h4>11.2.3 Performance and Analytics Cookies</h4>
      <p>These cookies collect information about how visitors use our Website, such as which pages they visit most often and if they receive error messages.</p>
      
      <h4>11.2.4 Targeting and Advertising Cookies</h4>
      <p>These cookies record your visit to our Website, the pages you have visited, and the links you have followed.</p>
      
      <h3>11.3 Cookie Consent and Control</h3>
      <p>When you first visit our Website, you will be presented with a cookie banner that allows you to accept or decline non-essential cookies.</p>
      <p>You can change your cookie preferences at any time by clicking on the "Cookie Settings" link in the footer of our Website.</p>
    `
  },
  {
    title: "12. CHILDREN'S PRIVACY",
    content: `
      <h3>12.1 Age Restrictions</h3>
      <p>Our Website and services are not directed to individuals under the age of 16. We do not knowingly collect personal data from children under 16.</p>
      
      <h3>12.2 Applications from Minors</h3>
      <p>If you are between the ages of 16 and 18, you may apply to our programme only with verifiable parental consent.</p>
      
      <h3>12.3 Removal of Children's Data</h3>
      <p>If we learn that we have collected personal data from a child under 16 without verification of parental consent, we will take steps to delete that information as quickly as possible.</p>
    `
  },
  {
    title: "13. THIRD-PARTY SHARING",
    content: `
      <h3>13.1 Categories of Recipients</h3>
      <p>We may share your personal data with various categories of recipients including service providers, faculty and instructors, educational institutions, event venues, and legal authorities when necessary.</p>
      
      <h3>13.2 No Sale of Personal Data</h3>
      <p>We do not sell, rent, or lease your personal data to third parties.</p>
      
      <h3>13.3 Business Transfers</h3>
      <p>In the event of a merger, acquisition, reorganization, bankruptcy, or other sale of all or a portion of our assets, any personal data owned or controlled by us may be among the assets transferred to third parties.</p>
    `
  },
  {
    title: "14. CHANGES TO THIS POLICY",
    content: `
      <h3>14.1 Policy Updates</h3>
      <p>We may update this Privacy Policy from time to time in response to changing legal, technical, or business developments.</p>
      
      <h3>14.2 Notification of Changes</h3>
      <p>For significant changes to this Privacy Policy, we will display a prominent notice on our Website and send email notifications to registered users.</p>
      
      <h3>14.3 Review of Changes</h3>
      <p>We encourage you to periodically review this Privacy Policy to stay informed about how we protect your personal data.</p>
      
      <h3>14.4 Historical Versions</h3>
      <p>Historical versions of this Privacy Policy are available upon request by contacting info@vocalexcellence.cy.</p>
    `
  },
  {
    title: "15. CONTACT INFORMATION",
    content: `
      <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us using the following information:</p>
      
      <p><strong>Data Protection Officer</strong><br />
      Andreas Aroditis<br />
      Vocal Excellence Summer Programme<br />
      Nafpliou 12, Pentadromos, 3025<br />
      Limassol, Cyprus</p>
      
      <p>Email: info@vocalexcellence.cy<br />
      Phone: +357 25 775 885</p>
      
      <p>We are committed to addressing your concerns and resolving any disputes regarding our data practices promptly and thoroughly.</p>
    `
  },
  {
    title: "16. COMPLAINTS PROCEDURE",
    content: `
      <h3>16.1 Internal Complaint Process</h3>
      <p>We encourage you to contact us first with any complaints about our data processing. We will investigate and attempt to resolve complaints and disputes within 30 days.</p>
      
      <h3>16.2 Supervisory Authority</h3>
      <p>You have the right to lodge a complaint with a supervisory authority if you believe that our processing of your personal data infringes data protection laws. The relevant supervisory authority in Cyprus is:</p>
      
      <p>Commissioner for Personal Data Protection<br />
      1 Iasonos Street, 1082 Nicosia<br />
      P.O. Box 23378, 1682 Nicosia<br />
      Cyprus</p>
      
      <p>Phone: +357 22 818 456<br />
      Fax: +357 22 304 565<br />
      Email: commissioner@dataprotection.gov.cy<br />
      Website: www.dataprotection.gov.cy</p>
      
      <h3>16.3 Alternative Dispute Resolution</h3>
      <p>As an alternative to judicial proceedings, you may seek resolution through an alternative dispute resolution entity or other out-of-court mechanism, where available.</p>
    `
  },
  {
    title: "17. GOVERNING LAW",
    content: `
      <p>This Privacy Policy shall be governed by and construed in accordance with the laws of Cyprus, without regard to its conflict of law provisions.</p>
      <p>Any disputes relating to this Privacy Policy shall be subject to the exclusive jurisdiction of the courts of Cyprus, except where prohibited by applicable data protection laws.</p>
      <p>By using our Website and services, you acknowledge that you have read and understood this Privacy Policy.</p>
      <div class="mt-8 text-gray-700">
        <p>Vocal Excellence Summer Programme</p>
        <p>Nafpliou 12, Pentadromos, 3025</p>
        <p>Limassol, Cyprus</p>
        <p>Email: info@vocalexcellence.cy</p>
        <p>Phone: +357 25 775 885</p>
      </div>
    `
  }
];

export default PrivacyPolicy;
