
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

import { applicationSchema, ApplicationFormValues } from './schema';
import PersonalInfoSection from './PersonalInfoSection';
import MusicalBackgroundSection from './MusicalBackgroundSection';
import ProgrammeApplicationSection from './ProgrammeApplicationSection';
import SupportingMaterialsSection from './SupportingMaterialsSection';

const ApplicationForm = () => {
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

  const onSubmit = (values: ApplicationFormValues) => {
    console.log(values);
    toast({
      title: "Application Submitted",
      description: "We've received your application. You'll hear from us shortly!",
    });
  };

  return (
    <section id="application-form" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold mb-4 text-apple-dark tracking-tight">
            Application Form
          </h2>
          <p className="text-lg font-sans mb-10 text-apple-blue/90 font-normal max-w-2xl mx-auto">
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
                    <FormLabel>
                      I agree to the <a href="#" className="text-apple-blue underline">Terms and Conditions</a> and <a href="#" className="text-apple-blue underline">Privacy Policy</a>. I confirm that all information provided is accurate and complete.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <div className="flex justify-center pt-4">
              <Button type="submit" className="primary-button py-6 px-8 text-base">
                Submit Application
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ApplicationForm;
