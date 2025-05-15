import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { ChevronLeft, ExternalLink, Volume2, PlayCircle, BookOpen } from 'lucide-react';
import { useExitIntent } from '@/hooks/use-exit-intent';
import { VocalUpgradePopup } from '@/components/VocalUpgradePopup';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TestPage = () => {
  const navigate = useNavigate();
  
  const { 
    showExitIntent: showPopup, 
    setShowExitIntent: setShowPopup
  } = useExitIntent({
    threshold: 20,
    scrollThreshold: 50, // Show after 50% scroll
    maxDisplays: 1
  });

  const [testToast, setTestToast] = useState(false);
  
  const handleShowToast = () => {
    toast({
      title: "Test Toast Notification",
      description: "This is an example of our toast notification system",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow container max-w-5xl mx-auto px-4 py-16 mt-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </button>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <header className="mb-8">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mb-3">
              Feature Testing Page
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Vocal Academy Feature Testing</h1>
            <p className="text-slate-500 mt-2">
              Welcome to our testing environment where you can explore and experiment with our platform features.
            </p>
          </header>

          <section className="space-y-10">
            {/* Lead Magnet Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">1-Minute Vocal Upgrade Lead Magnet</h2>
              <p className="text-slate-600 mb-6">
                Our strategically designed lead magnet targets aspiring singers looking for immediate improvement. 
                It appears based on user behavior to maximize conversion without disrupting the browsing experience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-slate-600 list-disc pl-5">
                      <li>Behavioral targeting using exit intent detection</li>
                      <li>Scroll depth triggering (50% page scroll)</li>
                      <li>Mobile-responsive design</li>
                      <li>Personalized content delivery by voice type</li>
                      <li>Limited-display logic to prevent annoying users</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Lead Magnet Includes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-slate-600 list-disc pl-5">
                      <li><span className="font-medium">Audio Training:</span> 3 West-End vocal warm-ups (30-second clips)</li>
                      <li><span className="font-medium">PDF Guide:</span> "Fix Your Top 3 Pitch Problems" cheat sheet</li>
                      <li><span className="font-medium">Video Training:</span> 2-minute tutorial on beating audition nerves</li>
                      <li><span className="font-medium">Personalization:</span> Content tailored by voice type</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-green-50 border border-green-100 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Interactive Test Controls</h3>
                <p className="text-green-700 mb-4">
                  Try the popup and other interactive elements to experience the user journey.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={() => setShowPopup(true)}
                    variant="default"
                  >
                    <PlayCircle className="mr-1" />
                    Show Lead Magnet Popup
                  </Button>
                  
                  <Button 
                    onClick={handleShowToast} 
                    variant="secondary"
                  >
                    <Volume2 className="mr-1" />
                    Test Toast Notification
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Content Strategy Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Vocal Academy Content Strategy</h2>
              <p className="text-slate-600 mb-4">
                Our lead magnet is part of a comprehensive content funnel designed to attract, engage, and convert aspiring vocal performers.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-slate-50">
                  <CardHeader>
                    <CardTitle className="text-lg">Top of Funnel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Free video tutorials</li>
                      <li>• Voice type quiz</li>
                      <li>• Blog posts on vocal techniques</li>
                      <li>• Social media content snippets</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-50">
                  <CardHeader>
                    <CardTitle className="text-lg">Middle of Funnel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• 1-Minute Vocal Upgrade Kit</li>
                      <li>• Free vocal assessment</li>
                      <li>• Email course: "7 Days to Better Pitch"</li>
                      <li>• Webinar: "Audition Secrets"</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-50">
                  <CardHeader>
                    <CardTitle className="text-lg">Bottom of Funnel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Summer programme application</li>
                      <li>• Private coaching sessions</li>
                      <li>• Intensive weekend workshops</li>
                      <li>• West End audition prep course</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Conversion Optimization */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Conversion Optimization</h2>
              <p className="text-slate-600 mb-6">
                This page demonstrates our conversion optimization techniques including lead magnets, clear calls-to-action, and strategic user journey design.
              </p>
              
              <Card className="border-blue-100">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-blue-800">Implementation Notes</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-slate-600 mb-4">
                    Our implementation uses React hooks for exit intent detection, scroll position tracking, and other behavioral triggers to create a responsive and engaging user experience.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      Last updated: {new Date().toLocaleDateString()}
                    </div>
                    
                    <div>
                      <Button variant="outline" size="sm" onClick={() => window.open('https://docs.lovable.dev', '_blank')}>
                        <BookOpen className="mr-1 h-4 w-4" />
                        <span className="mr-1">View Documentation</span>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
      <ScrollToTopButton visible={true} />
      
      {/* The Vocal Upgrade Kit Popup */}
      <VocalUpgradePopup 
        open={showPopup} 
        onOpenChange={setShowPopup}
      />
    </div>
  );
};

export default TestPage;
