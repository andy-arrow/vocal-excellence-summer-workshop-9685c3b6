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
        <div className="absolute inset-0 bg-[url('/lovable-uploads/masterclass-singers.jpg')] bg-cover bg-center grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <div className="relative z-10 container mx-auto px-6 py-20 text-center max-w-[1100px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight tracking-tight">
              SUMMER INTENSIVE
              <span className="block text-xl md:text-2xl font-sans font-light tracking-widest uppercase mt-4">
                July 15-20, 2025 • Limassol, Cyprus
              </span>
            </h1>
            
            <div className="w-24 h-1 bg-energy-pink mx-auto"></div>
            
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
              An immersive five-day vocal training programme designed to take your performance skills to the next level
            </p>
            
            <div className="pt-8">
              <Link 
                to="/apply" 
                className="inline-flex items-center gap-2 bg-energy-pink text-white px-8 py-4 rounded-md text-lg font-medium transition-all group shadow-md hover:shadow-lg hover:bg-opacity-90"
              >
                REGISTER NOW
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-[1000px] px-6 py-20">
        
        {/* Introduction */}
        <section className="mb-20">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              ABOUT THE PROGRAMME
            </h2>
            <div className="w-16 h-0.5 bg-energy-pink"></div>
          </div>
          
          <p className="text-lg text-slate-800 leading-relaxed mb-8 max-w-3xl mx-auto">
            The Vocal Excellence Summer Intensive is a comprehensive programme designed for serious vocalists looking to refine their technique, expand their repertoire, and connect with industry professionals. Over five transformative days, participants will engage in personalized coaching, masterclasses, and performance opportunities.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <Calendar className="w-6 h-6 text-energy-pink" />,
                title: "FIVE DAYS",
                description: "Intensive daily training from 9am to 5pm with evening showcases"
              },
              {
                icon: <Users className="w-6 h-6 text-energy-pink" />,
                title: "LIMITED PLACES",
                description: "Only 20 participants to ensure personalized attention"
              },
              {
                icon: <Star className="w-6 h-6 text-energy-pink" />,
                title: "EXPERT FACULTY",
                description: "Learn from internationally recognized vocal coaches"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold tracking-wide mb-2 text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-700">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
        
        <Separator className="my-16 bg-gray-200" />
        
        {/* Programme Schedule */}
        <section className="mb-20">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              PROGRAMME SCHEDULE
            </h2>
            <div className="w-16 h-0.5 bg-energy-pink"></div>
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
              <Card key={index} className="overflow-hidden border-slate-200 hover:shadow-md transition-all">
                <CardContent className="p-0">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900">{day.day}: {day.title}</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {day.schedule.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-energy-pink mt-1 mr-2 flex-shrink-0" />
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="text-center mt-8">
              <Button variant="outline" className="border-energy-pink text-energy-pink hover:bg-energy-pink/5">
                View Full 5-Day Schedule
              </Button>
            </div>
          </div>
        </section>
        
        <Separator className="my-16 bg-gray-200" />
        
        {/* Faculty Section */}
        <section className="mb-20">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              MEET THE 2025 FACULTY
            </h2>
            <div className="w-16 h-0.5 bg-energy-pink"></div>
            <p className="text-lg text-slate-700 max-w-2xl mt-6">
              Learn from our internationally acclaimed faculty of performers, directors, and educators
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Callas",
                role: "Vocal Technique",
                image: "/lovable-uploads/5a4b7bc3-bc7e-42cc-b5bf-fd69555887e3.png"
              },
              {
                name: "Luciano Pavarotti",
                role: "Performance Coach",
                image: "/lovable-uploads/29cad38e-a84c-40f7-9ddb-3c11c159ea6d.png"
              },
              {
                name: "Renée Fleming",
                role: "Repertoire Development",
                image: "/lovable-uploads/23077377-fca0-46d4-b7c8-83c2a2edcb19.png"
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
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {faculty.name}
                </h3>
                <p className="text-sm uppercase tracking-wider text-slate-600 mb-3">
                  {faculty.role}
                </p>
                <div className="w-8 h-0.5 bg-energy-pink mx-auto"></div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" className="border-energy-pink text-energy-pink hover:bg-energy-pink/5">
              View All Faculty
            </Button>
          </div>
        </section>
        
        <Separator className="my-16 bg-gray-200" />
        
        {/* Why Join Us */}
        <section className="mb-20">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              WHY JOIN US?
            </h2>
            <div className="w-16 h-0.5 bg-energy-pink"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-slate-50 rounded-full">
                    <Music className="w-5 h-5 text-energy-pink" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Individual Attention</h3>
                  <p className="text-slate-700">Our small class size ensures you receive personalized coaching tailored to your unique voice and performance style.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-slate-50 rounded-full">
                    <Users className="w-5 h-5 text-energy-pink" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Professional Network</h3>
                  <p className="text-slate-700">Connect with industry professionals and like-minded performers, building relationships that can last throughout your career.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-slate-50 rounded-full">
                    <Star className="w-5 h-5 text-energy-pink" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Performance Opportunities</h3>
                  <p className="text-slate-700">Showcase your progress in our final concert, with potential opportunities for outstanding participants.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-slate-50 rounded-full">
                    <Clock className="w-5 h-5 text-energy-pink" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Intensive Format</h3>
                  <p className="text-slate-700">Our immersive five-day format allows for rapid skill development and immediate application of techniques.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-slate-50 rounded-full">
                    <MapPin className="w-5 h-5 text-energy-pink" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Inspiring Location</h3>
                  <p className="text-slate-700">Our Limassol, Cyprus venue provides a beautiful and inspiring setting for your artistic development.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-slate-50 rounded-full">
                    <Calendar className="w-5 h-5 text-energy-pink" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Comprehensive Curriculum</h3>
                  <p className="text-slate-700">From technical fundamentals to advanced performance techniques, our curriculum covers all aspects of vocal excellence.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Application Information */}
        <section className="mb-20 bg-slate-50 p-10 rounded-lg">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              APPLICATION INFORMATION
            </h2>
            <div className="w-16 h-0.5 bg-energy-pink"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">ELIGIBILITY</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-energy-pink mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Vocalists aged 16 and above</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-energy-pink mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Minimum 2 years of formal vocal training</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-energy-pink mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">All voice types and genres welcome</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-energy-pink mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Intermediate to advanced skill level</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">FEES & DEADLINES</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-energy-pink mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Early Bird: €1,200 (until March 15, 2025)</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-energy-pink mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Regular Rate: €1,500</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-energy-pink mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Application Deadline: May 31, 2025</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-energy-pink mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Limited scholarships available</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/apply" 
              className="inline-flex items-center gap-2 bg-energy-pink text-white px-8 py-4 rounded-md text-lg font-medium transition-all group shadow-md hover:shadow-lg hover:bg-opacity-90"
            >
              APPLY NOW
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
      
      {/* Testimonials */}
      <section className="bg-black py-20 text-white">
        <div className="container mx-auto max-w-[1000px] px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              WHAT PARTICIPANTS SAY
            </h2>
            <div className="w-16 h-0.5 bg-energy-pink"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "The Summer Intensive transformed my approach to performance. The individual coaching sessions were invaluable, and I left with renewed confidence and technique.",
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
      <section className="bg-white py-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
            SECURE YOUR PLACE
          </h2>
          <div className="w-16 h-0.5 bg-energy-pink mx-auto mb-6"></div>
          <p className="text-lg md:text-xl mb-8 text-slate-700 leading-relaxed">
            Join us this summer for an unforgettable experience that will take your vocal abilities to the next level. With only 20 places available, early application is recommended.
          </p>
          <Link 
            to="/apply" 
            className="inline-flex items-center gap-2 bg-energy-pink text-white px-10 py-5 rounded-md text-lg font-medium transition-all group shadow-md hover:shadow-lg hover:bg-opacity-90"
          >
            APPLY FOR SUMMER 2025
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-slate-600 mt-4">
            Early bird pricing ends March 15, 2025
          </p>
        </div>
      </section>
    </div>
  );
};

export default SummerProgramme;
