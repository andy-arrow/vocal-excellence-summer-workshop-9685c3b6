
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Replace the hyphenated name with the corrected version
const INSTRUCTORS = [
  {
    name: "Dr. Maria Fernandez",
    title: "Vocal Technique Specialist",
    institution: "Royal Academy of Music",
    image: "/lovable-uploads/5a4b7bc3-bc7e-42cc-b5bf-fd69555887e3.png",
    bio: "Dr. Fernandez has trained some of the world's leading classical vocalists and brings 25 years of experience to our workshop."
  },
  {
    name: "Professor Thomas Chen",
    title: "Masterclass Leader",
    institution: "Juilliard School of Music",
    image: "/lovable-uploads/29cad38e-a84c-40f7-9ddb-3c11c159ea6d.png",
    bio: "An internationally acclaimed baritone who has performed at the Metropolitan Opera, La Scala, and Royal Opera House."
  },
  {
    name: "Carolyn Michelle Smith",
    title: "Performance Coach",
    institution: "London School of Performing Arts",
    image: "/lovable-uploads/ac92b4d5-5fab-4149-b45b-6f3e43b3ec2d.png", 
    bio: "Broadway performer turned educator, specializing in stage presence and dramatic interpretation for singers."
  },
  {
    name: "Dr. Jonathan Rivera",
    title: "Vocal Health Specialist",
    institution: "University College Hospital",
    image: "/lovable-uploads/e980c9b0-8cdc-423d-a726-2f677be33737.png",
    bio: "ENT physician specializing in performers' vocal health with 15 years of experience treating professional singers."
  }
];

const CustomInstructorsSection = () => {
  return (
    <section id="instructors" className="py-24 md:py-32 bg-[#f5f5f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[40px] md:text-[48px] font-medium text-apple-text mb-4 tracking-tight leading-tight">
            Learn from World-Class Faculty
          </h2>
          <div className="w-16 h-0.5 bg-apple-blue mb-6 opacity-30 mx-auto"></div>
          <p className="text-[21px] leading-[1.381] font-light text-apple-grey max-w-2xl mx-auto">
            Our instructors are active performers and educators from prestigious institutions
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {INSTRUCTORS.map((instructor, index) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#d2d2d7]",
                "hover:shadow-md transition-all duration-300"
              )}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={instructor.image} 
                  alt={instructor.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-medium mb-1">{instructor.name}</h3>
                  <p className="text-sm font-light text-white/80">{instructor.title}</p>
                  <p className="text-xs font-light text-white/70">{instructor.institution}</p>
                </div>
              </div>
              
              <div className="p-5">
                <p className="text-sm text-apple-grey">{instructor.bio}</p>
                <div className="mt-4 flex justify-end">
                  <a href="#" className="inline-flex items-center text-xs font-medium text-apple-blue group-hover:underline">
                    Full Biography
                    <ArrowUpRight className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a href="/summer-programme" className="inline-flex items-center text-lg font-medium text-apple-blue hover:underline">
            See All Workshop Leaders
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomInstructorsSection;
