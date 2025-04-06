
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { submitApplicationForm } from '@/services/formSubmissionService';
import { applicationSchema, type ApplicationFormValues } from './ApplicationForm/schema';
import ErrorBoundary from '@/utils/ErrorBoundary';

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

  const onSubmit = async (values: ApplicationFormValues) => {
    try {
      const response = await submitApplicationForm(values);
      
      if (response.success) {
        toast({
          title: "Application Submitted Successfully",
          description: "We've received your application. You'll hear from us shortly!",
        });
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="application-form" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold mb-4 text-apple-dark tracking-tight">
            Application Form
          </h2>
          <p className="text-lg font-sans mb-10 text-apple-blue/90 font-normal max-w-2xl mx-auto">
            Complete all required fields below to apply for the Vocal Excellence Summer Programme.
          </p>
        </div>

        <ErrorBoundary>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="bg-apple-gray-light/20 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-apple-dark mb-6">Personal Information</h3>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality</FormLabel>
                        <FormControl>
                          <Input placeholder="Your nationality" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6 mt-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal/Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Postal/Zip code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="bg-apple-gray-light/20 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-apple-dark mb-6">Musical Background</h3>
                
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="vocalRange"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Vocal Range</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid sm:grid-cols-2 gap-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="soprano" />
                              </FormControl>
                              <FormLabel className="font-normal">Soprano</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="mezzo-soprano" />
                              </FormControl>
                              <FormLabel className="font-normal">Mezzo-Soprano</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="alto" />
                              </FormControl>
                              <FormLabel className="font-normal">Alto</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="tenor" />
                              </FormControl>
                              <FormLabel className="font-normal">Tenor</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="baritone" />
                              </FormControl>
                              <FormLabel className="font-normal">Baritone</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="bass" />
                              </FormControl>
                              <FormLabel className="font-normal">Bass</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="other" />
                              </FormControl>
                              <FormLabel className="font-normal">Other/Unsure</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Vocal Training</FormLabel>
                        <FormControl>
                          <Input placeholder="Years of experience" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="musicalBackground"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Musical Background & Training</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your musical education, training, and significant learning experiences"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="teacherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current/Past Vocal Teacher</FormLabel>
                          <FormControl>
                            <Input placeholder="Teacher's name (optional)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="teacherEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teacher's Email (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Teacher's email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="performanceExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Performance Experience</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe any performances, competitions, or public appearances"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="bg-apple-gray-light/20 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-apple-dark mb-6">Programme Application</h3>
                
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="reasonForApplying"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Why do you want to join this programme?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please explain your interest in the programme and what you hope to achieve"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="heardAboutUs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How did you hear about us?</FormLabel>
                        <FormControl>
                          <Input placeholder="Social media, website, referral, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="scholarshipInterest"
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
                            I would like to be considered for a scholarship (separate application required)
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="specialNeeds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Accommodations or Accessibility Needs (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please let us know if you have any specific requirements"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="bg-apple-gray-light/20 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-apple-dark mb-6">Supporting Materials Upload</h3>
                
                <div className="space-y-6">
                  <div>
                    <FormLabel className="block mb-2">Audition Recordings</FormLabel>
                    <p className="text-sm text-apple-dark/70 mb-3">
                      Upload two contrasting pieces (3-5 minutes each) in MP3 or WAV format.
                    </p>
                    <Input type="file" accept=".mp3,.wav" className="mb-3" />
                    <Input type="file" accept=".mp3,.wav" />
                  </div>
                  
                  <div>
                    <FormLabel className="block mb-2">Musical CV/Resume</FormLabel>
                    <p className="text-sm text-apple-dark/70 mb-3">
                      Upload in PDF format (max 2MB).
                    </p>
                    <Input type="file" accept=".pdf" />
                  </div>
                  
                  <div>
                    <FormLabel className="block mb-2">Recommendation Letter</FormLabel>
                    <p className="text-sm text-apple-dark/70 mb-3">
                      Upload in PDF format (max 2MB). If your recommender prefers to send directly, they can email it to info@vocalexcellence.org
                    </p>
                    <Input type="file" accept=".pdf" />
                  </div>
                </div>
              </div>
              
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
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default ApplicationForm;
