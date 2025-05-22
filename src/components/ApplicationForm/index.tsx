
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { applicationSchema, ApplicationFormValues } from './schema';
import { Form } from '@/components/ui/form';
import ApplicationProgressIndicator from './ApplicationProgressIndicator';
import PersonalInfoSection from './PersonalInfoSection';
import MusicalBackgroundSection from './MusicalBackgroundSection';
import SupportingMaterialsSection from './SupportingMaterialsSection';
import ProgrammeApplicationSection from './ProgrammeApplicationSection';
import TermsAndConditionsSection from './TermsAndConditionsSection';
import SubmitButton from './SubmitButton';
import SubmissionSuccessMessage from './SubmissionSuccessMessage';
import { ApplicationFiles, submitApplication } from '@/services/applicationService';
import { toast } from "@/hooks/use-toast";

// Steps in the application form
const FORM_STEPS = [
  'Personal Info',
  'Musical Background',
  'Supporting Materials',
  'Programme Application',
  'Review & Submit'
];

const ApplicationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState<ApplicationFiles>({
    audioFile1: null,
    audioFile2: null,
    cvFile: null,
    recommendationFile: null
  });

  // Initialize form with schema validation
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      whereFrom: '',
      vocalRange: undefined,
      yearsOfSinging: '',
      musicalBackground: '',
      reasonForApplying: '',
      heardAboutUs: '',
      scholarshipInterest: false,
      dietaryRestrictions: { type: 'none' },
      termsAgreed: false
    },
    mode: 'onChange'
  });

  // Handle steps navigation
  const handleNextStep = async () => {
    const fields = getFieldsForCurrentStep();
    const isValid = await form.trigger(fields as any);
    
    if (isValid) {
      setCurrentStep(Math.min(currentStep + 1, FORM_STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast({
        title: 'Please check your entries',
        description: 'Some fields need your attention before proceeding.',
        variant: 'destructive',
      });
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Determine which fields to validate based on current step
  const getFieldsForCurrentStep = (): (keyof ApplicationFormValues)[] => {
    switch (currentStep) {
      case 0: // Personal Info
        return ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'nationality', 'whereFrom'];
      case 1: // Musical Background
        return ['vocalRange', 'musicalBackground'];
      case 2: // Supporting Materials (no required fields)
        return [];
      case 3: // Programme Application
        return ['reasonForApplying', 'heardAboutUs', 'dietaryRestrictions'];
      case 4: // Review & Submit
        return ['termsAgreed'];
      default:
        return [];
    }
  };

  // Update files when they're selected via the file upload components
  const updateFile = (fileType: keyof ApplicationFiles, file: File | null) => {
    setFiles(prevFiles => ({
      ...prevFiles,
      [fileType]: file
    }));
  };

  // Handle form submission
  const onSubmit = async (data: ApplicationFormValues) => {
    try {
      setIsSubmitting(true);
      
      toast({
        title: 'Submitting Application',
        description: 'Please wait while we process your application...',
      });
      
      // Store files in window object for potential fallback methods
      if (typeof window !== 'undefined') {
        window.applicationFiles = { ...files };
      }
      
      console.log('Submitting application with data:', data);
      console.log('Files to be submitted:', files);
      
      const result = await submitApplication(data, files);
      
      if (result.success) {
        console.log('Application submitted successfully:', result.applicationId);
        setIsSubmitted(true);
        
        toast({
          title: 'Application Submitted!',
          description: 'Your application was submitted successfully.',
          className: 'bg-green-700 text-white border-green-800',
        });
        
        // Clear form data
        form.reset();
        setFiles({
          audioFile1: null,
          audioFile2: null,
          cvFile: null,
          recommendationFile: null
        });
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.error('Application submission failed:', result.error);
        toast({
          title: 'Submission Failed',
          description: result.error?.message || 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Error during submission:', error);
      toast({
        title: 'Submission Error',
        description: error.message || 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If already submitted, show success message
  if (isSubmitted) {
    return <SubmissionSuccessMessage />;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 md:px-8 md:py-12">
      <div className="mb-8">
        <ApplicationProgressIndicator 
          steps={FORM_STEPS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {currentStep === 0 && <PersonalInfoSection />}
              {currentStep === 1 && <MusicalBackgroundSection />}
              {currentStep === 2 && (
                <SupportingMaterialsSection 
                  updateFile={updateFile} 
                  files={files} 
                />
              )}
              {currentStep === 3 && <ProgrammeApplicationSection />}
              {currentStep === 4 && <TermsAndConditionsSection />}
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePreviousStep}
              disabled={currentStep === 0 || isSubmitting}
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 
                        hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentStep < FORM_STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNextStep}
                disabled={isSubmitting}
                className="px-6 py-2 bg-apple-blue text-white rounded-full 
                          hover:bg-apple-blue-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <SubmitButton isSubmitting={isSubmitting} />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
