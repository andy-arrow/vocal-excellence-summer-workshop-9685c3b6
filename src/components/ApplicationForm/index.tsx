
import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users } from 'lucide-react';
import { generateCsrfToken } from '@/utils/security';
import { Link } from 'react-router-dom';

import { applicationSchema, ApplicationFormValues } from '@/components/ApplicationForm/schema';
import PersonalInfoSection from '@/components/ApplicationForm/PersonalInfoSection';
import MusicalBackgroundSection from '@/components/ApplicationForm/MusicalBackgroundSection';
import ProgrammeApplicationSection from '@/components/ApplicationForm/ProgrammeApplicationSection';
import SupportingMaterialsSection from '@/components/ApplicationForm/SupportingMaterialsSection';
import TermsAndConditionsSection from '@/components/ApplicationForm/TermsAndConditionsSection';
import SubmitButton from '@/components/ApplicationForm/SubmitButton';
import SubmissionSuccessMessage from '@/components/ApplicationForm/SubmissionSuccessMessage';
import { submitApplicationWithFiles } from '@/utils/fileUpload';

const formVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut" 
    }
  }
};

const ApplicationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [csrfToken, setCsrfToken] = useState('');
  
  useEffect(() => {
    const token = generateCsrfToken();
    setCsrfToken(token);
    
    sessionStorage.setItem('formCsrfToken', token);
    
    if (typeof window !== 'undefined') {
      console.log('ApplicationForm mount: applicationFiles state:', 
        window.applicationFiles ? Object.keys(window.applicationFiles).map(key => 
          `${key}: ${window.applicationFiles[key] ? window.applicationFiles[key].name : 'null'}`
        ) : 'Not initialized');
    }
  }, []);
  
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      vocalRange: 'soprano',
      yearsOfExperience: '',
      musicalBackground: '',
      teacherName: '',
      teacherEmail: '',
      performanceExperience: '',
      reasonForApplying: '',
      heardAboutUs: '',
      scholarshipInterest: false,
      specialNeeds: '',
      termsAgreed: false,
    },
    mode: 'onChange'
  });

  const onSubmit = useCallback(async (values: ApplicationFormValues) => {
    console.log('Form submission started with values:', values);
    setIsSubmitting(true);
    
    try {
      const files: {[key: string]: File} = {};
      
      if (typeof window !== 'undefined' && window.applicationFiles) {
        console.log('Application files before submission:', 
          Object.keys(window.applicationFiles).map(key => 
            `${key}: ${window.applicationFiles[key] ? `${window.applicationFiles[key].name} (${window.applicationFiles[key].size} bytes)` : 'null'}`
          )
        );
        
        Object.entries(window.applicationFiles).forEach(([key, file]) => {
          if (file !== null) {
            files[key] = file;
            console.log(`Added ${key} for submission: ${file.name}, ${file.size} bytes`);
          }
        });
      } else {
        console.warn('window.applicationFiles is not initialized before submission');
      }
      
      const hasFiles = Object.keys(files).length > 0;
      console.log(`Submitting form with ${hasFiles ? Object.keys(files).length : 'no'} files`);
      
      const response = await submitApplicationWithFiles(values, files);
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Submission failed');
      }
      
      if (response.fileError) {
        console.warn('Application submitted but had file processing error:', response.fileError);
        toast({
          title: "Application Submitted with Warning",
          description: `Your application data was saved, but we had trouble processing your files: ${response.fileError}. Our team will contact you for the files if needed.`,
          className: "bg-amber-600 text-white border-amber-700",
          duration: 8000,
        });
      } else {
        toast({
          title: "Application Submitted Successfully! 🎉",
          description: "Your application has been received. You'll receive a confirmation email shortly.",
          className: "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-700",
        });
      }
      
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      if (typeof window !== 'undefined' && window.applicationFiles) {
        Object.keys(window.applicationFiles).forEach(key => {
          window.applicationFiles[key] = null;
        });
        console.log('Cleared applicationFiles after successful submission');
      }
      
    } catch (error: any) {
      console.error('Error submitting application:', error);
      
      const errorDetails = [];
      if (error.message) errorDetails.push(`Error: ${error.message}`);
      if (error.details) errorDetails.push(`Details: ${error.details}`);
      if (error.code) errorDetails.push(`Error Code: ${error.code}`);
      
      toast({
        title: "Application Submission Failed",
        description: (
          <div className="space-y-2">
            <p className="font-medium text-red-200">We encountered an error while submitting your application:</p>
            {errorDetails.map((detail, index) => (
              <p key={index} className="text-sm opacity-90">{detail}</p>
            ))}
            <p className="text-sm mt-4">
              Please try again or contact our support team at{' '}
              <a href="mailto:support@vocalexcellence.com" className="underline">
                support@vocalexcellence.com
              </a>
            </p>
          </div>
        ),
        variant: "destructive",
        className: "bg-red-900 text-white border-red-700",
        duration: 10000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  if (isSubmitted) {
    return <SubmissionSuccessMessage />;
  }

  const sections = [
    { 
      title: "Personal Info", 
      component: <PersonalInfoSection />,
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-neutral-100 p-2 rounded-full"><span className="text-neutral-800 font-medium text-sm">01</span></motion.div>
    },
    { 
      title: "Musical Background", 
      component: <MusicalBackgroundSection />,
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-neutral-100 p-2 rounded-full"><span className="text-neutral-800 font-medium text-sm">02</span></motion.div>
    },
    { 
      title: "Programme", 
      component: <ProgrammeApplicationSection />,
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-neutral-100 p-2 rounded-full"><span className="text-neutral-800 font-medium text-sm">03</span></motion.div>
    },
    { 
      title: "Materials", 
      component: <SupportingMaterialsSection />,
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-neutral-100 p-2 rounded-full"><span className="text-neutral-800 font-medium text-sm">04</span></motion.div>
    },
    { 
      title: "Terms", 
      component: <TermsAndConditionsSection />,
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-neutral-100 p-2 rounded-full"><span className="text-neutral-800 font-medium text-sm">05</span></motion.div>
    },
  ];

  return (
    <section id="application-form" className="py-24 md:py-32 bg-white">
      <motion.div 
        className="max-w-3xl mx-auto px-6"
        variants={formVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div 
          className="text-center mb-16 space-y-8"
          variants={sectionVariants}
        >
          <motion.span 
            className="inline-block text-gray-600 text-sm tracking-wide uppercase mb-2 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Summer Workshop 2025
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Join the
            <span className="block mt-1 text-gray-900">
              Vocal Excellence Workshop
            </span>
          </h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Begin your journey in vocal artistry. Every voice has a story to tell — let yours be heard.
          </motion.p>

          <motion.div 
            className="pt-6 flex flex-col md:flex-row justify-center items-center gap-6 text-base text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 bg-gray-100 px-6 py-3 rounded-full">
              <Calendar className="h-5 w-5 text-gray-900" />
              <span>July 14 - 18, 2025</span>
            </div>
            <div className="h-4 w-px bg-gray-200 hidden md:block" />
            <div className="flex items-center gap-3 bg-gray-100 px-6 py-3 rounded-full">
              <MapPin className="h-5 w-5 text-gray-900" />
              <span>Limassol, Cyprus</span>
            </div>
            <div className="h-4 w-px bg-gray-200 hidden md:block" />
            <div className="flex items-center gap-3 bg-gray-100 px-6 py-3 rounded-full">
              <Users className="h-5 w-5 text-gray-900" />
              <span>20 Spots Available</span>
            </div>
          </motion.div>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 bg-white">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm"
              >
                {sections[activeSection].component}
                
                <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
                    disabled={activeSection === 0}
                    className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                      activeSection === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                    aria-label="Previous section"
                  >
                    <ChevronLeft size={18} />
                    <span>Previous</span>
                  </motion.button>
                  
                  {activeSection < sections.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setActiveSection(prev => Math.min(sections.length - 1, prev + 1))}
                      className="px-5 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
                      aria-label="Next section"
                    >
                      <span>Continue</span>
                      <ChevronRight size={18} />
                    </motion.button>
                  ) : (
                    <SubmitButton isSubmitting={isSubmitting} />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </form>
        </Form>

        <motion.div 
          className="text-center mt-8 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p>Need help? Email us at <a href="mailto:help@vocalexcellence.com" className="text-blue-600 hover:underline">help@vocalexcellence.com</a></p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ApplicationForm;
