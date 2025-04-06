
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, Inbox, Users, Loader2 } from 'lucide-react';

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('applications');
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
      
      if (data.session) {
        fetchData();
      }
    };

    getSession();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setLoading(false);
        
        if (session) {
          fetchData();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch applications
      const { data: appData, error: appError } = await supabase
        .from('applications')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (appError) throw appError;
      setApplications(appData || []);
      
      // Fetch contacts
      const { data: contactData, error: contactError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (contactError) throw contactError;
      setContacts(contactData || []);
      
    } catch (error: any) {
      toast({
        title: 'Error fetching data',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
        <span className="ml-2 text-violet-100">Loading...</span>
      </div>
    );
  }
  
  // Redirect if not logged in
  if (!session) {
    return <Navigate to="/auth" />;
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="border-violet-500 text-violet-100"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="applications" className="text-base">
                <Users className="mr-2 h-4 w-4" /> Applications
                <span className="ml-2 bg-violet-700 text-white text-xs py-0.5 px-2 rounded-full">
                  {applications.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="contacts" className="text-base">
                <Inbox className="mr-2 h-4 w-4" /> Contact Forms
                <span className="ml-2 bg-violet-700 text-white text-xs py-0.5 px-2 rounded-full">
                  {contacts.length}
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications" className="space-y-6">
              {applications.length === 0 ? (
                <Card>
                  <CardContent className="py-10 text-center text-slate-400">
                    No applications submitted yet.
                  </CardContent>
                </Card>
              ) : (
                applications.map((app) => (
                  <Card key={app.id} className="overflow-hidden bg-slate-800 border-violet-500/20">
                    <CardHeader className="bg-slate-700/50">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-violet-50">
                          {app.firstname} {app.lastname}
                        </CardTitle>
                        <span className="text-xs text-violet-300">
                          {formatDate(app.timestamp)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 text-violet-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p><strong>Email:</strong> {app.email}</p>
                          <p><strong>Phone:</strong> {app.phone}</p>
                          <p><strong>Date of Birth:</strong> {app.dateofbirth}</p>
                          <p><strong>Nationality:</strong> {app.nationality}</p>
                          <p><strong>Address:</strong> {app.address}, {app.city}, {app.country}, {app.postalcode}</p>
                        </div>
                        <div className="space-y-2">
                          <p><strong>Vocal Range:</strong> {app.vocalrange}</p>
                          <p><strong>Years of Experience:</strong> {app.yearsofexperience}</p>
                          <p><strong>Teacher Name:</strong> {app.teachername || 'N/A'}</p>
                          <p><strong>Teacher Email:</strong> {app.teacheremail || 'N/A'}</p>
                          <p><strong>Scholarship Interest:</strong> {app.scholarshipinterest ? 'Yes' : 'No'}</p>
                          <p><strong>Special Needs:</strong> {app.specialneeds || 'None'}</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div>
                          <h4 className="font-medium text-violet-200">Musical Background</h4>
                          <p className="mt-1 text-sm text-violet-300">{app.musicalbackground}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-violet-200">Performance Experience</h4>
                          <p className="mt-1 text-sm text-violet-300">{app.performanceexperience}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-violet-200">Reason for Applying</h4>
                          <p className="mt-1 text-sm text-violet-300">{app.reasonforapplying}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-violet-200">How they heard about us</h4>
                          <p className="mt-1 text-sm text-violet-300">{app.heardaboutus}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="contacts" className="space-y-6">
              {contacts.length === 0 ? (
                <Card>
                  <CardContent className="py-10 text-center text-slate-400">
                    No contact submissions yet.
                  </CardContent>
                </Card>
              ) : (
                contacts.map((contact) => (
                  <Card key={contact.id} className="overflow-hidden bg-slate-800 border-violet-500/20">
                    <CardHeader className="bg-slate-700/50">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-violet-50">{contact.name}</CardTitle>
                        <span className="text-xs text-violet-300">
                          {formatDate(contact.timestamp)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 text-violet-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <p><strong>Email:</strong> {contact.email}</p>
                        <p><strong>Vocal Type:</strong> {contact.vocal_type}</p>
                      </div>
                      {contact.message && (
                        <div>
                          <h4 className="font-medium text-violet-200">Message</h4>
                          <p className="mt-1 text-sm text-violet-300">{contact.message}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
