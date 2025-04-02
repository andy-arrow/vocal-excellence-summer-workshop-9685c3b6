
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, BadgeEuro } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { submitContactForm } from '@/services/formSubmissionService';

const CTASection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    return () => {
      currentElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
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
    
    setIsSubmitting(true);
    
    try {
      // Make a real API call to submit the form data
      const response = await submitContactForm(formData);
      
      if (!response.ok) {
        throw new Error('Server responded with an error');
      }
      
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
    <section id="apply" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div 
              ref={(el) => (elementsRef.current[0] = el)} 
              className="reveal-on-scroll mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-gray-800">
                Apply for Summer 2025
              </h2>
              <div className="w-20 h-px bg-gray-300 mb-6"></div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Space is extremely limited to ensure personalized attention. Only 20 participants will be accepted for the 2025 programme.
              </p>
              <a href="/apply" onClick={handleApplyClick} className="px-8 py-3 border border-gray-800 text-gray-800 rounded-none text-sm font-light tracking-wider uppercase hover:bg-gray-800 hover:text-white transition-colors duration-300 inline-block">
                Begin Your Application
              </a>
            </div>

            <div 
              ref={(el) => (elementsRef.current[1] = el)} 
              className="space-y-4 reveal-on-scroll"
            >
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-4 text-gray-500" />
                <span className="font-light">Programme Dates: July 14 - July 18, 2025</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-4 text-gray-500" />
                <span className="font-light">Location: Limassol, Cyprus</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BadgeEuro className="w-5 h-5 mr-4 text-gray-500" />
                <span className="font-light">Tuition: €500 (Early application discount available)</span>
              </div>
            </div>
          </div>

          <div 
            ref={(el) => (elementsRef.current[2] = el)} 
            className="reveal-on-scroll"
          >
            <div className="border border-gray-200 p-8 bg-white">
              <h3 className="text-2xl font-serif font-light mb-6 text-gray-800">
                Request Information
              </h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-light text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full border border-gray-300 px-4 py-2 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-800"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full border border-gray-300 px-4 py-2 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-800"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="vocal_type" className="block text-sm font-light text-gray-700 mb-1">
                    Vocal Type/Range <span className="text-red-500">*</span>
                  </label>
                  <select 
                    id="vocal_type" 
                    className="w-full border border-gray-300 px-4 py-2 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-800"
                    value={formData.vocal_type}
                    onChange={handleInputChange}
                    required
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
                  <label htmlFor="message" className="block text-sm font-light text-gray-700 mb-1">
                    Questions or Comments (Optional)
                  </label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full border border-gray-300 px-4 py-2 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-800"
                    placeholder="Any specific questions about the programme?"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full px-8 py-3 border border-gray-800 text-gray-800 rounded-none text-sm font-light tracking-wider uppercase hover:bg-gray-800 hover:text-white transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Information'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
