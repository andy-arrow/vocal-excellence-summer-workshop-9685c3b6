
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users, Clock, Star, ChevronRight, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SummerProgramme = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>
        <div className="relative z-10 container mx-auto px-6 py-20 text-center max-w-[1100px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight tracking-tight">
              Vocal Excellence
              <span className="block text-xl md:text-2xl font-sans font-light tracking-wide mt-4">
                29 June – 5 July, 2026 • Limassol, Cyprus
              </span>
            </h1>
            
            <div className="w-24 h-px bg-white/30 mx-auto"></div>
            
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed text-white/90">
              7 full days of exclusive vocal training with coaches from London's West End, Netflix & the world's top universities
            </p>
            
            <div className="pt-8">
              <Link 
                to="/apply" 
                className="inline-flex items-center gap-2 bg-apple-blue text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-apple-blue-hover"
              >
                Register Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto max-w-[1000px] px-6 py-20">
        
        {/* Introduction */}
        <section className="mb-20">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-apple-text mb-4">
              About the Programme
            </h2>
            <div className="w-16 h-px bg-apple-border mx-auto"></div>
          </div>
          
          <p className="text-lg text-apple-grey leading-relaxed mb-8 max-w-3xl mx-auto">
            The Vocal Excellence Workshop is a comprehensive programme designed for serious vocalists looking to refine their technique, expand their repertoire, and connect with industry professionals. Over five transformative days, participants will engage in personalized coaching, masterclasses, and performance opportunities.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <Calendar className="w-6 h-6 text-apple-blue" />,
                title: "Seven Days",
                description: "Intensive daily training from 9am to 5pm with evening showcases"
              },
              {
                icon: <Users className="w-6 h-6 text-apple-blue" />,
                title: "Limited Places",
                description: "Only 20 participants to ensure personalized attention"
              },
              {
                icon: <Star className="w-6 h-6 text-apple-blue" />,
                title: "Expert Faculty",
                description: "Learn from internationally recognized vocal coaches"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-apple-light hover:bg-apple-light-hover transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium tracking-wide mb-2 text-apple-text">
                  {item.title}
                </h3>
                <p className="text-apple-grey">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
        
        <Separator className="my-16 bg-apple-border" />
        
        {/* Programme Schedule */}
        <section className="mb-20">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-apple-text mb-4">
              Programme Schedule
            </h2>
            <div className="w-16 h-px bg-apple-border mx-auto"></div>
          </div>
          
          <div className="grid gap-8">
            {[
              {
                day: "DAY 1",
                title: "Technique Foundations",
                schedule: [
                  "9:00 AM - Welcome & Orientation",
                  "10:00 AM - Vocal Assessment",
                  "12:00 PM - Lunch Break",
                  "1:30 PM - Breath Control Masterclass",
                  "3:30 PM - Repertoire Selection",
                  "5:00 PM - Day Review & Practice Assignment"
                ]
              },
              {
                day: "DAY 2",
                title: "Performance Development",
                schedule: [
                  "9:00 AM - Morning Warm-up",
                  "10:00 AM - Individual Coaching",
                  "12:00 PM - Lunch Break",
                  "1:30 PM - Performance Techniques Workshop",
                  "3:30 PM - Group Rehearsal",
                  "5:00 PM - Faculty Performance"
                ]
              },
              {
                day: "DAY 3",
                title: "Musical Interpretation",
                schedule: [
                  "9:00 AM - Morning Warm-up",
                  "10:00 AM - Emotional Connection Workshop",
                  "12:00 PM - Lunch Break",
                  "1:30 PM - Individual Coaching",
                  "3:30 PM - Style & Genre Exploration",
                  "5:00 PM - Group Critique Session"
                ]
              }
            ].map((day, index) => (
              <Card key={index} className="overflow-hidden border-apple-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="bg-apple-light px-6 py-4 border-b border-apple-border">
                    <h3 className="text-xl font-light text-apple-text">{day.day}: {day.title}</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {day.schedule.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                          <span className="text-apple-grey">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                className="border-apple-blue text-apple-blue hover:bg-apple-blue/5"
              >
                View Full 7-Day Schedule
              </Button>
            </div>
          </div>
        </section>
        
        <Separator className="my-16 bg-apple-border" />
        
        {/* Faculty Section */}
        <section className="mb-20">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-apple-text mb-4">
              Meet Your Instructors
            </h2>
            <div className="w-16 h-px bg-apple-border mx-auto"></div>
            <p className="text-lg text-apple-grey max-w-2xl mt-6">
              Learn from our internationally acclaimed faculty of performers, directors, and educators
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Andreas Aroditis",
                role: "Founder & Director",
                image: "/images/curriculum-workshop.png"
              },
              {
                name: "Kate Batter",
                role: "Vocal Coach",
                image: "/images/instructors/kate-batter.png"
              },
              {
                name: "Carolyn Michelle Smith",
                role: "Acting Coach",
                image: "/images/instructors/carolyn-michelle-smith.png"
              }
            ].map((faculty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                  <img 
                    src={faculty.image} 
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-apple-text mb-1">
                  {faculty.name}
                </h3>
                <p className="text-sm uppercase tracking-wider text-apple-grey mb-3">
                  {faculty.role}
                </p>
                <div className="w-8 h-px bg-apple-border mx-auto"></div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" className="border-apple-blue text-apple-blue hover:bg-apple-blue/5">
              View All Faculty
            </Button>
          </div>
        </section>
        
        <Separator className="my-16 bg-apple-border" />
        
        {/* Why Join Us */}
        <section className="mb-20">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-apple-text mb-4">
              Why Join Us?
            </h2>
            <div className="w-16 h-px bg-apple-border mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-apple-light rounded-full">
                    <Music className="w-5 h-5 text-apple-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-apple-text mb-2">Individual Attention</h3>
                  <p className="text-apple-grey">Our small class size ensures you receive personalized coaching tailored to your unique voice and performance style.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-apple-light rounded-full">
                    <Users className="w-5 h-5 text-apple-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-apple-text mb-2">Professional Network</h3>
                  <p className="text-apple-grey">Connect with industry professionals and like-minded performers, building relationships that can last throughout your career.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-apple-light rounded-full">
                    <Star className="w-5 h-5 text-apple-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-apple-text mb-2">Performance Opportunities</h3>
                  <p className="text-apple-grey">Showcase your progress in our final concert, with potential opportunities for outstanding participants.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-apple-light rounded-full">
                    <Clock className="w-5 h-5 text-apple-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-apple-text mb-2">Intensive Format</h3>
                  <p className="text-apple-grey">Our immersive five-day format allows for rapid skill development and immediate application of techniques.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-apple-light rounded-full">
                    <MapPin className="w-5 h-5 text-apple-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-apple-text mb-2">Inspiring Location</h3>
                  <p className="text-apple-grey">Our Limassol, Cyprus venue provides a beautiful and inspiring setting for your artistic development.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-apple-light rounded-full">
                    <Calendar className="w-5 h-5 text-apple-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-apple-text mb-2">Comprehensive Curriculum</h3>
                  <p className="text-apple-grey">From technical fundamentals to advanced performance techniques, our curriculum covers all aspects of vocal excellence.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Application Information */}
        <section className="mb-20 bg-slate-50 p-10 rounded-lg">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-slate-900 mb-4">
              APPLICATION INFORMATION
            </h2>
            <div className="w-16 h-px bg-apple-border mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">ELIGIBILITY</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Vocalists aged 16 and above</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">All levels of experience welcome</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">All voice types and genres welcome</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">International applicants encouraged</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">FEES & DEADLINES</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700"><span className="line-through text-slate-400">Standard Rate: €1,499</span></span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">Early Bird: €749 (until May 24, 2026) - Save €750!</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Payment Plan: €100 deposit + 3 installments of €216</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Limited scholarships available</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 font-medium">
                  Early Bird Special: 50% off standard rate when you register before May 24, 2026
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/apply" 
              className="inline-flex items-center gap-2 bg-apple-blue text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-apple-blue-hover"
            >
              APPLY NOW
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </div>
      
      {/* Testimonials */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto max-w-[1000px] px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">
              WHAT PARTICIPANTS SAY
            </h2>
            <div className="w-16 h-px bg-apple-border mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "The Summer Workshop transformed my approach to performance. The individual coaching sessions were invaluable, and I left with renewed confidence and technique.",
                name: "SOPHIA MARTINEZ",
                role: "Soprano, 2024 Participant"
              },
              {
                quote: "I've attended many vocal workshops, but none as comprehensive and personalized as this one. The faculty's attention to detail and commitment to each student was exceptional.",
                name: "MICHAEL JOHNSON",
                role: "Tenor, 2024 Participant"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 p-8 rounded-lg"
              >
                <div className="text-2xl text-slate-200 mb-6">❝</div>
                <p className="text-slate-300 italic mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex flex-col">
                  <span className="font-bold text-white">{testimonial.name}</span>
                  <span className="text-sm text-slate-400">{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-apple-light py-20 px-6 rounded-3xl">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-apple-text mb-6">
            Secure Your Place
          </h2>
          <div className="w-16 h-px bg-apple-border mx-auto mb-6"></div>
          <p className="text-lg md:text-xl mb-8 text-apple-grey leading-relaxed">
            Join us this summer for an unforgettable experience that will take your vocal abilities to the next level. With only 20 places available, early application is recommended.
          </p>
          <Link 
            to="/apply" 
            className="inline-flex items-center gap-2 bg-apple-blue text-white px-10 py-5 rounded-full text-lg font-medium transition-all duration-300 hover:bg-apple-blue-hover"
          >
            Apply for Summer 2026
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <p className="text-sm text-apple-grey mt-4">
            Early Bird: €749 (50% off €1,499) until May 24, 2026
          </p>
        </div>
      </section>
    </div>
  );
};

export default SummerProgramme;
