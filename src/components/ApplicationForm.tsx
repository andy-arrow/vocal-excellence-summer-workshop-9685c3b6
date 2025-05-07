
import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Hourglass } from 'lucide-react';
import { generateCsrfToken } from '@/utils/security';

import { applicationSchema, ApplicationFormValues } from '@/components/ApplicationForm/schema';
import { submitApplicationWithFiles } from '@/utils/fileUpload';

const PersonalInfoSection = lazy(() => import('@/components/ApplicationForm/PersonalInfoSection'));
const MusicalBackgroundSection = lazy(() => import('@/components/ApplicationForm/MusicalBackgroundSection'));
const ProgrammeApplicationSection = lazy(() => import('@/components/ApplicationForm/ProgrammeApplicationSection'));
const SupportingMaterialsSection = lazy(() => import('@/components/ApplicationForm/SupportingMaterialsSection'));
const TermsAndConditionsSection = lazy(() => import('@/components/ApplicationForm/TermsAndConditionsSection'));
const SubmitButton = lazy(() => import('@/components/ApplicationForm/SubmitButton'));
const SubmissionSuccessMessage = lazy(() => import('@/components/ApplicationForm/SubmissionSuccessMessage'));

const SectionLoader = () => (
  <div className="py-8 flex justify-center">
    <div className="w-8 h-8 border-4 border-energy-purple/30 border-t-energy-purple rounded-full animate-spin"></div>
  </div>
);

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
    
    if (typeof window !== 'undefined' && !window.applicationFiles) {
      window.applicationFiles = {};
      console.log('Initialized window.applicationFiles');
    }
    
    return () => {
      if (typeof window !== 'undefined' && window.applicationFiles) {
        Object.keys(window.applicationFiles).forEach(key => {
          window.applicationFiles[key] = null;
        });
      }
    };
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
      yearsOfSinging: '',
      musicalBackground: '',
      teacherName: '',
      teacherEmail: '',
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
        toast.toast({
          title: "Application Submitted with Warning",
          description: `Your application data was saved, but we had trouble processing your files: ${response.fileError}. Our team will contact you for the files if needed.`,
          className: "bg-amber-600 text-white border-amber-700",
          duration: 8000,
        });
      } else {
        toast.toast({
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
      
      toast.toast({
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
    return (
      <Suspense fallback={<SectionLoader />}>
        <SubmissionSuccessMessage />
      </Suspense>
    );
  }

  const sections = [
    { 
      title: "Personal Info", 
      component: (
        <Suspense fallback={<SectionLoader />}>
          <PersonalInfoSection />
        </Suspense>
      ),
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-fuchsia-500/30 p-2 rounded-full"><Sparkles size={18} className="text-fuchsia-400" /></motion.div>
    },
    { 
      title: "Musical Background", 
      component: (
        <Suspense fallback={<SectionLoader />}>
          <MusicalBackgroundSection />
        </Suspense>
      ),
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-violet-500/30 p-2 rounded-full"><Hourglass size={18} className="text-violet-400" /></motion.div>
    },
    { 
      title: "Programme", 
      component: (
        <Suspense fallback={<SectionLoader />}>
          <ProgrammeApplicationSection />
        </Suspense>
      ),
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-indigo-500/30 p-2 rounded-full"><CheckCircle2 size={18} className="text-indigo-400" /></motion.div>
    },
    { 
      title: "Materials", 
      component: (
        <Suspense fallback={<SectionLoader />}>
          <SupportingMaterialsSection />
        </Suspense>
      ),
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-purple-500/30 p-2 rounded-full"><CheckCircle2 size={18} className="text-purple-400" /></motion.div>
    },
    { 
      title: "Terms", 
      component: (
        <Suspense fallback={<SectionLoader />}>
          <TermsAndConditionsSection />
        </Suspense>
      ),
      icon: <motion.div whileHover={{ scale: 1.1 }} className="bg-pink-500/30 p-2 rounded-full"><CheckCircle2 size={18} className="text-pink-400" /></motion.div>
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <motion.div 
        className="max-w-3xl mx-auto px-6"
        variants={formVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div 
          className="text-center mb-16 space-y-6"
          variants={sectionVariants}
        >
          <motion.span 
            className="inline-block text-apple-grey text-sm tracking-wide uppercase mb-2 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Summer Workshop 2025
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-apple-text">
            Apply Now
          </h2>
          
          <motion.p 
            className="text-lg md:text-xl text-apple-grey max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Begin your journey in vocal artistry. Every voice has a story to tell — let yours be heard.
          </motion.p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            
            <div className="space-y-6">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-white rounded-2xl p-6 md:p-8 border border-apple-border/40 hover:border-apple-border/60 transition-colors shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4 mb-6">
                    {section.icon}
                    <h3 className="text-xl font-semibold text-apple-text">{section.title}</h3>
                  </div>
                  {section.component}
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-center pt-6"
              >
                <SubmitButton isSubmitting={isSubmitting} />
              </motion.div>
            </div>
          </form>
        </Form>

        <motion.div 
          className="text-center mt-8 text-sm text-apple-grey"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p>Need help? Email us at <a href="mailto:help@vocalexcellence.com" className="text-apple-blue hover:underline">help@vocalexcellence.com</a></p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ApplicationForm;
