
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';

import { applicationSchema, ApplicationFormValues } from './schema';
import PersonalInfoSection from './PersonalInfoSection';
import MusicalBackgroundSection from './MusicalBackgroundSection';
import ProgrammeApplicationSection from './ProgrammeApplicationSection';
import SupportingMaterialsSection from './SupportingMaterialsSection';
import TermsAndConditionsSection from './TermsAndConditionsSection';
import SubmitButton from './SubmitButton';
import SubmissionSuccessMessage from './SubmissionSuccessMessage';
import { submitApplicationForm } from '@/services/formSubmissionService';

const ApplicationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
  });

  const onSubmit = async (values: ApplicationFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await submitApplicationForm(values);
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Error submitting application');
      }
      
      toast({
        title: "Application Submitted Successfully",
        description: "Your application has been received. You'll receive a confirmation email shortly.",
      });
      
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <SubmissionSuccessMessage />;
  }

  return (
    <section id="application-form" className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif font-light mb-4 text-gray-800">
            Submit Your Application
          </h2>
          <p className="text-gray-600 font-light max-w-2xl mx-auto">
            Complete all required fields below. You can save your progress and return to finish later.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <PersonalInfoSection />
            <MusicalBackgroundSection />
            <ProgrammeApplicationSection />
            <SupportingMaterialsSection />
            <TermsAndConditionsSection />
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ApplicationForm;
