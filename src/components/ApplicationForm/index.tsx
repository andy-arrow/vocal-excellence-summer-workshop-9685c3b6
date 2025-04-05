
import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

import { applicationSchema, ApplicationFormValues } from './schema';
import PersonalInfoSection from './PersonalInfoSection';
import MusicalBackgroundSection from './MusicalBackgroundSection';
import ProgrammeApplicationSection from './ProgrammeApplicationSection';
import SupportingMaterialsSection from './SupportingMaterialsSection';
import TermsAndConditionsSection from './TermsAndConditionsSection';
import SubmitButton from './SubmitButton';
import SubmissionSuccessMessage from './SubmissionSuccessMessage';
import { submitApplicationForm } from '@/services/formSubmissionService';

const formVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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
      // Add a small delay to show the animation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = await submitApplicationForm(values);
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Error submitting application');
      }
      
      toast({
        title: "Application Submitted Successfully! 🎉",
        description: "Your application has been received. You'll receive a confirmation email shortly.",
        className: "bg-green-600 text-white border-green-700",
      });
      
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again or contact us directly.",
        variant: "destructive",
        className: "bg-rose-600 text-white border-rose-700",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  if (isSubmitted) {
    return <SubmissionSuccessMessage />;
  }

  const sections = [
    { title: "Personal Info", component: <PersonalInfoSection /> },
    { title: "Musical Background", component: <MusicalBackgroundSection /> },
    { title: "Programme Application", component: <ProgrammeApplicationSection /> },
    { title: "Supporting Materials", component: <SupportingMaterialsSection /> },
    { title: "Terms & Conditions", component: <TermsAndConditionsSection /> },
  ];

  return (
    <section id="application-form" className="py-16 md:py-24">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-500">
            Apply Now
          </h2>
          <p className="text-lg text-violet-100 max-w-2xl mx-auto opacity-90">
            Elevate your vocal skills this summer. Complete the form below to reserve your spot!
          </p>
        </motion.div>

        {/* Progress Indicators */}
        <motion.div 
          className="flex justify-center mb-12 overflow-x-auto pb-2 gap-2 md:gap-4"
          variants={sectionVariants}
        >
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm md:text-base whitespace-nowrap ${
                activeSection === index
                  ? "bg-violet-600 text-white font-medium"
                  : "bg-violet-900/40 text-violet-200 hover:bg-violet-800/60"
              }`}
            >
              {section.title}
            </button>
          ))}
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
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
                  <button
                    type="button"
                    onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
                    disabled={activeSection === 0}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeSection === 0
                        ? "bg-slate-800/50 text-slate-500 cursor-not-allowed"
                        : "bg-slate-800 text-white hover:bg-slate-700"
                    }`}
                  >
                    Previous
                  </button>
                  
                  {activeSection < sections.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setActiveSection(prev => Math.min(sections.length - 1, prev + 1))}
                      className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-500 transition-all duration-300"
                    >
                      Continue
                    </button>
                  ) : (
                    <SubmitButton isSubmitting={isSubmitting} />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </form>
        </Form>
      </motion.div>
    </section>
  );
};

export default ApplicationForm;
