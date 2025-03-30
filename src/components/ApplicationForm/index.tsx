
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

import { applicationSchema, ApplicationFormValues } from './schema';
import PersonalInfoSection from './PersonalInfoSection';
import MusicalBackgroundSection from './MusicalBackgroundSection';
import ProgrammeApplicationSection from './ProgrammeApplicationSection';
import SupportingMaterialsSection from './SupportingMaterialsSection';

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
      // In production, this would be an API call to submit the form
      console.log('Submitting application form:', values);
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
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
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="application-form" className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Alert className="mb-6 bg-green-50 border-green-100">
            <AlertTitle className="text-green-800 text-xl font-serif font-light">Application Submitted Successfully</AlertTitle>
            <AlertDescription className="text-green-700">
              <p className="mb-4">Thank you for applying to the Vocal Excellence Academy Summer Programme 2025. We have received your application and will be in touch shortly.</p>
              <p className="mb-4">A confirmation email has been sent to the email address you provided.</p>
              <p>If you have any questions in the meantime, please contact us at admissions@vocalexcellence.com.</p>
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
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
            
            <FormField
              control={form.control}
              name="termsAgreed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-light text-gray-700">
                      I agree to the <a href="/terms" className="text-gray-800 underline">Terms and Conditions</a> and <a href="/privacy" className="text-gray-800 underline">Privacy Policy</a>. I confirm that all information provided is accurate and complete.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <div className="flex justify-center pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`px-8 py-3 border border-gray-800 text-gray-800 rounded-none text-sm font-light tracking-wider uppercase hover:bg-gray-800 hover:text-white transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ApplicationForm;
