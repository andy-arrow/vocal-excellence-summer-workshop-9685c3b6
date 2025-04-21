
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, BadgeEuro, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { submitContactForm } from '@/services/formSubmissionService';
import { FeatureCard } from '@/components/ui/feature-card';
import { motion } from 'framer-motion';

const CTASection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    vocal_type: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentElements = elementsRef.current.filter(Boolean) as HTMLElement[];
    currentElements.forEach((el) => observer.observe(el));

    // Check if there was a previous submission timestamp in localStorage
    const savedSubmitTime = localStorage.getItem('lastInfoRequestTime');
    if (savedSubmitTime) {
      setLastSubmitTime(parseInt(savedSubmitTime, 10));
    }

    return () => {
      currentElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const checkRateLimit = (): boolean => {
    if (!lastSubmitTime) return true;
    
    const now = Date.now();
    const hoursSinceLastSubmit = (now - lastSubmitTime) / (1000 * 60 * 60);
    
    // Limit to one submission per 4 hours
    return hoursSinceLastSubmit > 4;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide your name",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please provide a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.vocal_type) {
      toast({
        title: "Missing information",
        description: "Please select your vocal type",
        variant: "destructive"
      });
      return;
    }

    // Check rate limiting
    if (!checkRateLimit()) {
      toast({
        title: "Request limit reached",
        description: "Please wait before submitting another information request",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await submitContactForm(formData);
      
      if (!response.success) {
        throw new Error('Failed to submit form');
      }
      
      // Store submission time
      const now = Date.now();
      localStorage.setItem('lastInfoRequestTime', now.toString());
      setLastSubmitTime(now);
      
      setFormData({
        name: '',
        email: '',
        vocal_type: '',
        message: ''
      });
      
      toast({
        title: "Information request submitted",
        description: "Thank you for your interest. Our team will contact you shortly."
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your request. Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/apply');
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-apple-blue text-[12px] font-semibold tracking-wide uppercase mb-3">
              Limited Enrollment
            </span>
            
            <h2 className="text-[40px] md:text-[48px] font-medium text-apple-text leading-tight mb-4">
              Secure your spot for Summer&nbsp;2025
            </h2>
            
            <p className="text-[21px] text-apple-grey leading-relaxed mb-8">
              Only 20 participants will be selected to ensure personalized coaching and maximum growth during this career-defining week.
            </p>

            <div className="space-y-6 mb-12">
              <FeatureCard
                icon={Calendar}
                title="Programme Dates"
                description="July 14 - July 18, 2025"
              />
              
              <FeatureCard
                icon={MapPin}
                title="Location"
                description="Limassol, Cyprus"
              />
              
              <FeatureCard
                icon={BadgeEuro}
                title="Tuition"
                description="€999 (Save €100 when you apply before April 30)"
              />
              
              <FeatureCard
                icon={Clock}
                title="Application Deadline"
                description="May 15, 2025 - Less than 2 months remaining"
              />
            </div>

            <button
              onClick={handleApplyClick}
              className="w-full md:w-auto text-center px-8 py-4 bg-apple-blue text-white rounded-full text-[17px] font-medium 
                       hover:bg-apple-blue-hover transition-all duration-300 focus:outline-none focus:ring-2 
                       focus:ring-apple-blue focus:ring-offset-2"
            >
              Apply Now
            </button>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-apple-light rounded-3xl p-8 md:p-12"
          >
            <h3 className="text-[24px] font-medium text-apple-text mb-4">
              Request Information
            </h3>
            
            <p className="text-[17px] text-apple-grey mb-8">
              Complete this form to receive detailed programme information and application tips.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[14px] font-medium text-apple-text mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-[17px] rounded-xl border border-apple-border bg-white 
                           focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-apple-blue 
                           transition-all duration-200"
                  placeholder="Your name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[14px] font-medium text-apple-text mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-[17px] rounded-xl border border-apple-border bg-white 
                           focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-apple-blue 
                           transition-all duration-200"
                  placeholder="Your email"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="vocal_type" className="block text-[14px] font-medium text-apple-text mb-2">
                  Vocal Type/Range
                </label>
                <select
                  id="vocal_type"
                  value={formData.vocal_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-[17px] rounded-xl border border-apple-border bg-white 
                           focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-apple-blue 
                           transition-all duration-200"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select your vocal type</option>
                  <option value="soprano">Soprano</option>
                  <option value="mezzo">Mezzo-Soprano</option>
                  <option value="alto">Alto/Contralto</option>
                  <option value="tenor">Tenor</option>
                  <option value="baritone">Baritone</option>
                  <option value="bass">Bass</option>
                  <option value="other">Other/Unsure</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[14px] font-medium text-apple-text mb-2">
                  Questions or Comments (Optional)
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 text-[17px] rounded-xl border border-apple-border bg-white 
                           focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-apple-blue 
                           transition-all duration-200 resize-none"
                  placeholder="Any specific questions about the programme?"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || (lastSubmitTime !== null && !checkRateLimit())}
                className="w-full bg-apple-blue text-white rounded-full py-4 text-[17px] font-medium 
                         hover:bg-apple-blue-hover transition-all duration-300 focus:outline-none 
                         focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 disabled:opacity-50 
                         disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Get Programme Details'}
              </button>

              <p className="text-center text-[12px] text-apple-grey mt-4">
                We respect your privacy and will never share your information.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
