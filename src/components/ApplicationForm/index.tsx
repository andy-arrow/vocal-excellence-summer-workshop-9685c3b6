import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2, Hourglass } from 'lucide-react';
import { generateCsrfToken } from '@/utils/security';

import { applicationSchema, ApplicationFormValues } from './schema';
import PersonalInfoSection from './PersonalInfoSection';
import MusicalBackgroundSection from './MusicalBackgroundSection';
import ProgrammeApplicationSection from './ProgrammeApplicationSection';
import SupportingMaterialsSection from './SupportingMaterialsSection';
import TermsAndConditionsSection from './TermsAndConditionsSection';
import SubmitButton from './SubmitButton';
import SubmissionSuccessMessage from './SubmissionSuccessMessage';
import { submitApplicationForm } from '@/services/formSubmissionService';
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
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const files = window.applicationFiles;
      let response;
      
      if (files && Object.values(files).some(f => f !== null)) {
        response = await submitApplicationForm(values, files);
      } else {
        response = await submitApplicationForm(values);
      }
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Submission failed');
      }
      
      toast({
        title: "Application Submitted Successfully! 🎉",
        description: "Your application has been received. You'll receive a confirmation email shortly.",
        className: "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-700",
      });
      
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-fuchsia-500/20 p-2 rounded-full"><Sparkles size={18} className="text-fuchsia-500" /></motion.div>
    },
    { 
      title: "Musical Background", 
      component: <MusicalBackgroundSection />,
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-violet-500/20 p-2 rounded-full"><Hourglass size={18} className="text-violet-500" /></motion.div>
    },
    { 
      title: "Programme", 
      component: <ProgrammeApplicationSection />,
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-indigo-500/20 p-2 rounded-full"><CheckCircle2 size={18} className="text-indigo-500" /></motion.div>
    },
    { 
      title: "Materials", 
      component: <SupportingMaterialsSection />,
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-purple-500/20 p-2 rounded-full"><CheckCircle2 size={18} className="text-purple-500" /></motion.div>
    },
    { 
      title: "Terms", 
      component: <TermsAndConditionsSection />,
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-pink-500/20 p-2 rounded-full"><CheckCircle2 size={18} className="text-pink-500" /></motion.div>
    },
  ];

  return (
    <section id="application-form" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-violet-950">
      <motion.div 
        className="max-w-4xl mx-auto px-6"
        variants={formVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div 
          className="text-center mb-12"
          variants={sectionVariants}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 font-outfit">
            Ready to Join the Workshop?
          </h2>
          <p className="text-lg text-violet-100 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Your vocal journey starts here! Complete the form below in just a few steps. Let's discover your unique voice together.
          </p>
        </motion.div>

        <motion.div 
          className="mb-10"
          variants={sectionVariants}
        >
          <div className="relative">
            <div className="h-2 bg-violet-900/40 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(activeSection / (sections.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="flex justify-between mt-1">
              {sections.map((section, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection(index)}
                  className="relative flex flex-col items-center mt-1"
                >
                  <motion.div
                    className={`w-5 h-5 rounded-full flex items-center justify-center
                    ${index <= activeSection ? 'bg-gradient-to-r from-fuchsia-500 to-violet-500' : 'bg-violet-800'}`}
                    initial={false}
                    animate={index <= activeSection ? 
                      { scale: [1, 1.2, 1], boxShadow: ['0 0 0 rgba(167, 139, 250, 0)', '0 0 15px rgba(167, 139, 250, 0.7)', '0 0 0 rgba(167, 139, 250, 0)'] } : 
                      {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {index < activeSection && (
                      <CheckCircle2 size={12} className="text-white" />
                    )}
                  </motion.div>
                  <span className={`text-xs mt-2 font-medium hidden md:block
                    ${index <= activeSection ? 'text-violet-300' : 'text-violet-500'}`}>
                    {section.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="flex md:hidden justify-center mb-8 overflow-x-auto pb-2 gap-2"
          variants={sectionVariants}
        >
          {sections.map((section, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm whitespace-nowrap ${
                activeSection === index
                  ? "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-medium"
                  : "bg-violet-900/40 text-violet-200 hover:bg-violet-800/60"
              }`}
            >
              {section.icon}
              <span>{section.title}</span>
            </motion.button>
          ))}
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/80 backdrop-blur-sm border border-violet-500/20 p-8 rounded-2xl shadow-xl"
              >
                {sections[activeSection].component}
                
                <div className="flex justify-between mt-8 pt-4 border-t border-violet-500/20">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
                    disabled={activeSection === 0}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                      activeSection === 0
                        ? "bg-slate-800/50 text-slate-500 cursor-not-allowed"
                        : "bg-slate-800 text-white hover:bg-slate-700"
                    }`}
                    aria-label="Previous section"
                  >
                    <ChevronLeft size={18} />
                    <span>Previous</span>
                  </motion.button>
                  
                  {activeSection < sections.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={() => setActiveSection(prev => Math.min(sections.length - 1, prev + 1))}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 flex items-center gap-2"
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
          className="text-center mt-8 text-sm text-violet-300/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p>Need help? Email us at <a href="mailto:help@vocalexcellence.com" className="text-fuchsia-400 hover:text-fuchsia-300 underline underline-offset-4">help@vocalexcellence.com</a></p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ApplicationForm;
