
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users, Music, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const SummerProgramme = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-gradient-to-b from-energy-purple/90 to-energy-pink/80 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/masterclass-singers.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-outfit font-bold leading-tight">
              Summer Intensive<br/>
              <span className="text-3xl md:text-5xl font-light">2025</span>
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
              An immersive five-day vocal training programme in the heart of Limassol, Cyprus
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-energy-cyan" />
                <span>July 15-20, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-energy-cyan" />
                <span>Limassol, Cyprus</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-energy-cyan" />
                <span>Limited to 20 Students</span>
              </div>
            </div>
            
            <div className="pt-8">
              <Link 
                to="/apply" 
                className="inline-flex items-center gap-2 bg-white text-energy-purple px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all group"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programme Features */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-16">
            Programme Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Music className="w-8 h-8 text-energy-purple" />,
                title: "Individual Training",
                description: "Daily one-on-one sessions with expert vocal coaches"
              },
              {
                icon: <Star className="w-8 h-8 text-energy-pink" />,
                title: "Master Classes",
                description: "Group sessions focusing on technique and performance"
              },
              {
                icon: <Clock className="w-8 h-8 text-energy-cyan" />,
                title: "Performance Opportunities",
                description: "Showcase your progress in our final concert"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-energy-purple/90 to-energy-pink/80 py-20 px-6 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Voice?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Join us this summer for an unforgettable experience that will take your vocal abilities to the next level.
          </p>
          <Link 
            to="/apply" 
            className="inline-flex items-center gap-2 bg-white text-energy-purple px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all group"
          >
            Start Your Application
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SummerProgramme;
