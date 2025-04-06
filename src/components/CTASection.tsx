
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, BadgeEuro, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { submitContactForm } from '@/services/formSubmissionService';

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
    <section id="apply" ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div 
              ref={(el) => (elementsRef.current[0] = el)} 
              className="reveal-on-scroll mb-8"
            >
              <div className="inline-block px-4 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-4">
                Limited Enrollment
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-light mb-6 text-gray-800">
                Secure Your Spot for <span className="text-rose-600 font-semibold">Summer 2025</span>
              </h2>
              <div className="w-20 h-px bg-rose-300 mb-6"></div>
              <p className="text-gray-600 mb-5 leading-relaxed text-lg">
                <strong className="text-rose-700">Only 20 participants</strong> will be selected to ensure personalized coaching and maximum growth during this career-defining week.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Early applicants receive priority consideration and may qualify for our exclusive early enrollment discount.
              </p>
              <a href="/apply" onClick={handleApplyClick} className="primary-button inline-block relative group overflow-hidden">
                <span className="relative z-10 font-medium tracking-wide">Begin Your Application</span>
                <span className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </a>
            </div>

            <div 
              ref={(el) => (elementsRef.current[1] = el)} 
              className="space-y-5 reveal-on-scroll p-6 bg-white shadow-lg rounded-lg border border-rose-100"
            >
              <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-4 text-rose-500" />
                <span className="font-medium">Programme Dates: July 14 - July 18, 2025</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-4 text-rose-500" />
                <span className="font-medium">Location: Limassol, Cyprus</span>
              </div>
              <div className="flex items-center text-gray-700">
                <BadgeEuro className="w-5 h-5 mr-4 text-rose-500" />
                <div>
                  <span className="font-medium">Tuition: €500</span>
                  <p className="text-sm text-rose-600 mt-1">Early application discount: Save €75 when you apply before April 30</p>
                </div>
              </div>
              <div className="flex items-center text-gray-700 pt-2 mt-2 border-t border-rose-100">
                <Clock className="w-5 h-5 mr-4 text-rose-500" />
                <div>
                  <span className="font-medium">Application Deadline: May 15, 2025</span>
                  <p className="text-sm text-rose-600 mt-1">Mark your calendar — applications close in less than 2 months</p>
                </div>
              </div>
            </div>
          </div>

          <div 
            ref={(el) => (elementsRef.current[2] = el)} 
            className="reveal-on-scroll"
          >
            <div className="glass-card p-8 border border-rose-200 shadow-xl rounded-lg">
              <h3 className="text-2xl font-serif mb-6 text-gray-800 flex items-center">
                <span className="bg-rose-100 text-rose-700 w-8 h-8 inline-flex items-center justify-center rounded-full mr-3 text-sm">1</span>
                <span>Request Information</span>
              </h3>
              <p className="text-gray-600 mb-6">
                Complete this form to receive detailed programme information, scholarship opportunities, and application tips from our team.
              </p>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full border border-rose-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full border border-rose-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="vocal_type" className="block text-sm font-medium text-gray-700 mb-1">
                    Vocal Type/Range <span className="text-rose-500">*</span>
                  </label>
                  <select 
                    id="vocal_type" 
                    className="w-full border border-rose-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all"
                    value={formData.vocal_type}
                    onChange={handleInputChange}
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Questions or Comments (Optional)
                  </label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full border border-rose-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all"
                    placeholder="Any specific questions about the programme?"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full primary-button disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                  disabled={isSubmitting || (lastSubmitTime !== null && !checkRateLimit())}
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Submitting...' : 'Get Programme Details'}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                </button>
                <p className="text-center text-xs text-gray-500 mt-2">
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
