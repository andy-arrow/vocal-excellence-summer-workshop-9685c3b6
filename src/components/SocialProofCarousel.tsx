
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, ArrowLeft, ArrowRight } from "lucide-react";

const DUMMY_INSTAGRAM_POSTS = [
  {
    id: "post1",
    image: "/lovable-uploads/masterclass-singers.jpg", 
    caption: "Amazing first day at #VocalExcellence2025! The techniques we learned today were game-changing.",
    likes: 128,
    username: "soprano_maria"
  },
  {
    id: "post2",
    image: "/lovable-uploads/ac92b4d5-5fab-4149-b45b-6f3e43b3ec2d.png",
    caption: "Learning from the best at #VocalExcellence2025 - feeling inspired and challenged!",
    likes: 86,
    username: "tenor_james"
  },
  {
    id: "post3",
    image: "/lovable-uploads/e980c9b0-8cdc-423d-a726-2f677be33737.png",
    caption: "The faculty at #VocalExcellence2025 is incredible. Can't believe I'm working with such talented mentors.",
    likes: 201,
    username: "mezzo_sophie"
  },
  {
    id: "post4",
    image: "/lovable-uploads/5f2b13ba-7279-45da-86e2-af6b9c336634.png",
    caption: "Group rehearsals at #VocalExcellence2025 are such a blast! Learning so much from my peers.",
    likes: 153,
    username: "baritone_alex"
  },
  {
    id: "post5",
    image: "/lovable-uploads/e26c0944-dc77-4d19-8059-c61e7800b8d1.png",
    caption: "The beautiful setting in Limassol makes #VocalExcellence2025 even more special. Perfect place to develop as an artist.",
    likes: 175,
    username: "alto_natalie"
  },
];

const SocialProofCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [posts, setPosts] = useState(DUMMY_INSTAGRAM_POSTS);
  
  // In a real implementation, you would fetch Instagram posts with the hashtag
  useEffect(() => {
    // Simulating fetch
    const timer = setTimeout(() => {
      console.log("Instagram posts would be fetched here in a real implementation");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === posts.length - 3 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? posts.length - 3 : prev - 1));
  };
  
  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Instagram className="w-5 h-5 text-pink-500" />
            <h3 className="text-base font-semibold tracking-wider text-pink-500 uppercase">
              #VocalExcellence2025
            </h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-2">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what past participants are saying about their experience
          </p>
        </div>
        
        <div className="relative">
          <div className="relative overflow-hidden">
            <div className="flex items-stretch gap-4 transition-transform duration-500" 
                style={{ transform: `translateX(-${currentSlide * 33.33}%)` }}>
              {posts.map((post) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="min-w-[300px] flex-1 border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img 
                      src={post.image} 
                      alt={post.caption} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                          {post.username.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <span className="font-medium text-sm">{post.username}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{post.caption}</p>
                    <div className="flex items-center text-gray-500 text-xs">
                      <span className="font-medium">{post.likes} likes</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full shadow flex items-center justify-center text-gray-700 hover:bg-white transition-colors duration-200"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full shadow flex items-center justify-center text-gray-700 hover:bg-white transition-colors duration-200"
            aria-label="Next slide"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="https://www.instagram.com/explore/tags/vocalexcellence2025/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-pink-600 hover:text-pink-800 transition-colors duration-200"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow #VocalExcellence2025 on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialProofCarousel;
