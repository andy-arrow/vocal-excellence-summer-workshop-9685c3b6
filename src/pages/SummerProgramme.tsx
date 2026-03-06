
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
                29 June – 5 July, 2026 · Limassol, Cyprus
              </span>
            </h1>
            
            <div className="w-24 h-px bg-white/30 mx-auto"></div>
            
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed text-white/90">
              Seven days of vocal training for 12–21 year olds, coached by faculty from Juilliard and the West End — and a filmed audition to take with you.
            </p>
            
            <div className="pt-8">
              <Link 
                to="/apply" 
                className="inline-flex items-center gap-2 bg-apple-blue text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-apple-blue-hover"
              >
                Request Your Place
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
            The Vocal Excellence Workshop is a seven-day intensive designed for serious young singers aged 12–21 who are preparing for top university and conservatory auditions. Participants work with faculty from Juilliard and the West End, complete a filmed audition, and leave knowing exactly what top programmes are looking for.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <Calendar className="w-6 h-6 text-apple-blue" />,
                title: "Seven Days",
                description: "Training from 08:00–19:00 daily, with an evening showcase and final recording on the last day."
              },
              {
                icon: <Users className="w-6 h-6 text-apple-blue" />,
                title: "Thirty Places",
                description: "A small class to ensure every student receives direct coaching and individual attention."
              },
              {
                icon: <Star className="w-6 h-6 text-apple-blue" />,
                title: "Juilliard & West End Faculty",
                description: "Coaches who know exactly what top admissions panels are looking for."
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
                title: "Foundations",
                schedule: [
                  "9:00 — Welcome & Orientation",
                  "10:00 — Vocal Assessment",
                  "12:00 — Lunch",
                  "13:30 — Breath Control Masterclass",
                  "15:30 — Repertoire Selection",
                  "17:00 — Day Review & Practice Assignment"
                ]
              },
              {
                day: "DAY 2",
                title: "Performance Development",
                schedule: [
                  "9:00 — Morning Warm-up",
                  "10:00 — Individual Coaching Sessions",
                  "12:00 — Lunch",
                  "13:30 — Performance Techniques Workshop",
                  "15:30 — Group Rehearsal",
                  "17:00 — Faculty Masterclass"
                ]
              },
              {
                day: "DAY 3",
                title: "Musical Interpretation",
                schedule: [
                  "9:00 — Morning Warm-up",
                  "10:00 — Emotional Connection Workshop",
                  "12:00 — Lunch",
                  "13:30 — Individual Coaching Sessions",
                  "15:30 — Style & Genre Exploration",
                  "17:00 — Group Critique Session"
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
              <Link to="/apply">
                <Button 
                  variant="outline" 
                  className="border-apple-blue text-apple-blue hover:bg-apple-blue/5"
                >
                  Request the Full 7-Day Schedule
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <Separator className="my-16 bg-apple-border" />
        
        {/* Faculty Section */}
        <section className="mb-20">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-apple-text mb-4">
              Your Faculty
            </h2>
            <div className="w-16 h-px bg-apple-border mx-auto"></div>
            <p className="text-lg text-apple-grey max-w-2xl mt-6">
              Coaches who are active performers and teachers — and who understand what top programmes look for in a student.
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
            <Link to="/#instructors">
              <Button variant="outline" className="border-apple-blue text-apple-blue hover:bg-apple-blue/5">
                View Full Faculty Profiles
              </Button>
            </Link>
          </div>
        </section>
        
        <Separator className="my-16 bg-apple-border" />
        
        {/* Why Join */}
        <section className="mb-20">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-apple-text mb-4">
              Why Vocal Excellence?
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
                  <p className="text-apple-grey">Thirty places. Every student receives direct coaching, individual feedback, and a 45-minute private session with faculty.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-apple-light rounded-full">
                    <Users className="w-5 h-5 text-apple-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-apple-text mb-2">Faculty Who Know Admissions</h3>
                  <p className="text-apple-grey">Study alongside thirty serious young singers — and learn directly from Juilliard graduates and West End performers who understand what top programmes look for.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-apple-light rounded-full">
                    <Star className="w-5 h-5 text-apple-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-apple-text mb-2">A Filmed Audition</h3>
                  <p className="text-apple-grey">Leave with a broadcast-quality recording of your mock audition and final performance — for university video applications and portfolio submissions.</p>
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
                  <h3 className="text-lg font-bold text-apple-text mb-2">Seven Intensive Days</h3>
                  <p className="text-apple-grey">A structured seven-day format built for rapid development — from foundations to a filmed final performance.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-apple-light rounded-full">
                    <MapPin className="w-5 h-5 text-apple-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-apple-text mb-2">Limassol, Cyprus</h3>
                  <p className="text-apple-grey">A dedicated venue in Limassol — away from daily routine and designed for deep focus on your singing.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 bg-apple-light rounded-full">
                    <Calendar className="w-5 h-5 text-apple-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-apple-text mb-2">University Preparation Built In</h3>
                  <p className="text-apple-grey">Dedicated sessions on audition strategy, personal statement guidance, and exactly what top conservatories want to see.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Application Information */}
        <section className="mb-20 bg-slate-50 p-10 rounded-lg">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-slate-900 mb-4">
              How to Apply
            </h2>
            <div className="w-16 h-px bg-apple-border mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Who can apply</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Singers aged 12–21</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Classical and musical theatre voices</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Preparing for university or conservatory auditions</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">International applicants welcome</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">The process</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Five short questions — no essay required</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Optional audio upload</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Faculty reviews every application personally</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-apple-blue mt-1 mr-2 flex-shrink-0" />
                  <span className="text-slate-700">Pricing and availability shared with accepted students</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/apply" 
              className="inline-flex items-center gap-2 bg-apple-blue text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-apple-blue-hover"
            >
              Request Your Place
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </div>
      
      {/* Call to Action */}
      <section className="bg-apple-light py-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-apple-text mb-6">
            The students who get in prepare differently.
          </h2>
          <div className="w-16 h-px bg-apple-border mx-auto mb-6"></div>
          <p className="text-lg md:text-xl mb-8 text-apple-grey leading-relaxed">
            Seven days in Limassol with Juilliard and West End faculty. A filmed audition. A class of thirty. Applications open for Summer 2026.
          </p>
          <Link 
            to="/apply" 
            className="inline-flex items-center gap-2 bg-apple-blue text-white px-10 py-5 rounded-full text-lg font-medium transition-all duration-300 hover:bg-apple-blue-hover"
          >
            Request Your Place
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SummerProgramme;
