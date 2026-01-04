import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Hourglass, AlertCircle } from 'lucide-react';
import { generateCsrfToken } from '@/utils/security';
import { applicationFilesStore } from '@/stores/applicationFilesStore';
import { useAnalytics } from '@/hooks/use-analytics';

import { applicationSchema, ApplicationFormValues } from '@/components/ApplicationForm/schema';
import { submitApplicationWithFiles } from '@/utils/fileUpload';
import ApplicationProgressIndicator from './ApplicationForm/ApplicationProgressIndicator';

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
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [submissionAttempts, setSubmissionAttempts] = useState(0);
  const { trackForm, trackAppError } = useAnalytics();
  
  // Generate CSRF token for form security
  useEffect(() => {
    const token = generateCsrfToken();
    setCsrfToken(token);
    sessionStorage.setItem('formCsrfToken', token);
    
    console.log('ApplicationForm: Component mounted, CSRF token generated');
    
    return () => {
      console.log('ApplicationForm: Component unmounted');
    };
  }, []);
  
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      whereFrom: '',
      age: undefined,
      socialMedia: '',
      dateOfBirth: '',
      nationality: '',
      vocalRange: 'soprano',
      yearsOfSinging: '',
      musicalBackground: '',
      teacherName: '',
      teacherEmail: '',
      reasonForApplying: '',
      heardAboutUs: '',
      scholarshipInterest: false,
      dietaryRestrictions: {
        type: 'none',
        details: ''
      },
      areasOfInterest: '',
      specialNeeds: '',
      termsAgreed: false,
    },
    mode: 'onChange'
  });

  const validateFiles = useCallback((): boolean => {
    // All files are now optional, so no validation errors
    return true;
  }, []);
  
  const clearValidationErrors = () => {
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const onSubmit = useCallback(async (values: ApplicationFormValues) => {
    console.log('Form submission started with values:', values);
    clearValidationErrors();
    setIsSubmitting(true);
    
    // Track form submission attempt
    setSubmissionAttempts(prev => prev + 1);
    trackForm('application', 'submit', true);
    
    try {
      // Validate form data
      if (!values.firstName || !values.lastName || !values.email) {
        throw new Error('Please complete all required fields before submitting');
      }
      
      // Explicitly check terms agreement
      if (!values.termsAgreed) {
        throw new Error('You must agree to the terms and conditions to continue');
      }
      
      // No file validation needed as all files are optional now
      
      // Collect files from our store
      const files = applicationFilesStore.getFiles();
      const filesToSubmit: {[key: string]: File} = {};
      
      // Add all non-null files to the submission
      Object.entries(files).forEach(([key, file]) => {
        if (file !== null) {
          filesToSubmit[key] = file;
          console.log(`Added ${key} for submission: ${file.name}, ${file.size} bytes`);
        }
      });
      
      const hasFiles = Object.keys(filesToSubmit).length > 0;
      console.log(`Submitting form with ${hasFiles ? Object.keys(filesToSubmit).length : 'no'} files`);
      
      // Attempt submission with retry logic
      let attempts = 0;
      const maxAttempts = 2; // Initial attempt + 2 retries
      let lastError = null;
      
      while (attempts <= maxAttempts) {
        try {
          console.log(`Submission attempt ${attempts + 1} of ${maxAttempts + 1}`);
          
          // Submit the application with files
          const response = await submitApplicationWithFiles(values, filesToSubmit);
          
          if (!response.success) {
            throw new Error(response.error?.message || 'Submission failed');
          }
          
          if (response.fileError) {
            console.warn('Application submitted but had file processing error:', response.fileError);
            toast({
              title: "Application Submitted with Warning",
              description: `Your application data was saved, but we had trouble processing your files. Our team will contact you for the files if needed.`,
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
          
          // Track successful form submission
          trackForm('application', 'success', true);
          
          setIsSubmitted(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          
          // Clear applicationFiles after successful submission
          applicationFilesStore.clearFiles();
          
          // Success! Break out of retry loop
          break;
          
        } catch (error: any) {
          console.error(`Submission attempt ${attempts + 1} failed:`, error);
          lastError = error;
          
          // Track the error
          trackAppError('form_submission_error', error.message || 'Unknown error', {
            attempt: attempts + 1,
            totalAttempts: submissionAttempts
          });
          
          if (attempts < maxAttempts) {
            // Wait before retrying with exponential backoff
            const backoffTime = Math.pow(2, attempts) * 1000;
            console.log(`Retrying in ${backoffTime}ms...`);
            await new Promise(resolve => setTimeout(resolve, backoffTime));
            attempts++;
          } else {
            // All attempts failed
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
            
            // Track the final failure
            trackForm('application', 'failure', false);
            
            throw error;
          }
        }
      }
    } catch (error: any) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateFiles, validationErrors, submissionAttempts, trackForm, trackAppError]);

  const handleNextSection = () => {
    if (activeSection < sections.length - 1) {
      clearValidationErrors();
      setActiveSection(activeSection + 1);
      
      // Keep the analytics tracking
      trackForm('application', `section_${activeSection + 2}`, true);
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 0) {
      clearValidationErrors();
      setActiveSection(activeSection - 1);
      
      // Keep the analytics tracking
      trackForm('application', `section_${activeSection}`, true);
    }
  };

  if (isSubmitted) {
    return (
      <Suspense fallback={<SectionLoader />}>
        <SubmissionSuccessMessage />
      </Suspense>
    );
  }

  // Get files from store for passing to SupportingMaterialsSection
  const files = applicationFilesStore.getFiles();
  
  // Create updateFile function for SupportingMaterialsSection
  const updateFile = (fileType: string, file: File | null) => {
    if (fileType === 'audioFile1' || fileType === 'audioFile2' || 
        fileType === 'cvFile' || fileType === 'recommendationFile') {
      applicationFilesStore.setFile(fileType as 'audioFile1' | 'audioFile2' | 'cvFile' | 'recommendationFile', file);
    }
  };

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
          <SupportingMaterialsSection 
            updateFile={updateFile}
            files={files}
          />
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
    <section className="py-8 md:py-16" id="application-form">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12 space-y-4 md:space-y-5">
          <span className="inline-block text-[#666666] text-xs md:text-sm tracking-wide uppercase font-medium">
            Summer Workshop 2026
          </span>
          
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f]">
            Apply Now
          </h2>
          
          <p className="text-base md:text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
            Begin your journey in vocal artistry. Complete one section at a time.
          </p>

          <ApplicationProgressIndicator 
            steps={sections.map(s => s.title)} 
            currentStep={activeSection} 
            onStepClick={setActiveSection}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            
            {validationErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4 mb-4 text-red-800">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm md:text-base">Please fix the following issues:</h4>
                    <ul className="mt-2 text-xs md:text-sm space-y-1 list-disc list-inside">
                      {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            <div
              key={`section-${activeSection}`}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-[#e5e5e5] shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                {sections[activeSection].icon}
                <h3 className="text-lg md:text-xl font-semibold text-[#1d1d1f]">{sections[activeSection].title}</h3>
              </div>
              
              {sections[activeSection].component}
              
              <div className="flex justify-between mt-6 md:mt-8 pt-4 border-t border-[#e5e5e5]">
                <button
                  type="button"
                  onClick={handlePrevSection}
                  disabled={activeSection === 0}
                  className={`px-4 md:px-5 py-2 rounded-lg text-sm md:text-base ${activeSection === 0 ? 'text-[#999999] cursor-not-allowed' : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'}`}
                >
                  Back
                </button>
                
                {activeSection < sections.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextSection}
                    className="px-4 md:px-5 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue-hover text-sm md:text-base"
                  >
                    Continue
                  </button>
                ) : (
                  <Suspense fallback={<div className="text-sm">Loading...</div>}>
                    <SubmitButton isSubmitting={isSubmitting} />
                  </Suspense>
                )}
              </div>
            </div>
          </form>
        </Form>

        <div className="text-center mt-6 md:mt-8 text-xs md:text-sm text-[#666666]">
          <p>Need help? Email us at <a href="mailto:info@vocalexcellence.cy" className="text-apple-blue hover:underline">info@vocalexcellence.cy</a></p>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
