import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogOut, Inbox, Users, Loader2, Shield, Lock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const ADMIN_PASSWORD_KEY = 'admin_authenticated';

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('applications');
  const { toast } = useToast();

  useEffect(() => {
    const authStatus = sessionStorage.getItem(ADMIN_PASSWORD_KEY);
    setIsAuthenticated(authStatus === 'true');
    setLoading(false);
  }, []);

  const { data: applications = [], isLoading: appsLoading } = useQuery<any[]>({
    queryKey: ['/api/applications'],
    enabled: isAuthenticated,
  });

  const { data: contacts = [], isLoading: contactsLoading } = useQuery<any[]>({
    queryKey: ['/api/contact-submissions'],
    enabled: isAuthenticated,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      if (response.ok) {
        sessionStorage.setItem(ADMIN_PASSWORD_KEY, 'true');
        setIsAuthenticated(true);
        toast({
          title: 'Welcome',
          description: 'Successfully authenticated as admin.',
        });
      } else {
        toast({
          title: 'Authentication Failed',
          description: 'Invalid admin password.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to authenticate. Please try again.',
        variant: 'destructive',
      });
    }
    setPassword('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_PASSWORD_KEY);
    setIsAuthenticated(false);
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

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-900 pt-24 pb-16">
          <div className="max-w-md mx-auto px-4 sm:px-6">
            <Card className="bg-slate-800 border-violet-500/30">
              <CardHeader>
                <div className="flex items-center justify-center space-x-2">
                  <Lock className="h-6 w-6 text-violet-400" />
                  <CardTitle className="text-violet-100">Admin Login</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-violet-200">
                      Admin Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="bg-slate-700 border-violet-500/30 text-violet-100"
                      data-testid="input-admin-password"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    data-testid="button-admin-login"
                  >
                    <Shield className="mr-2 h-4 w-4" /> Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const isDataLoading = appsLoading || contactsLoading;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                Authorized Admin
              </div>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="border-violet-500 text-violet-100"
              data-testid="button-admin-logout"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>

          {isDataLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
              <span className="ml-2 text-violet-100">Loading data...</span>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                <TabsTrigger value="applications" className="text-base" data-testid="tab-applications">
                  <Users className="mr-2 h-4 w-4" /> Applications
                  <span className="ml-2 bg-violet-700 text-white text-xs py-0.5 px-2 rounded-full">
                    {applications.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="contacts" className="text-base" data-testid="tab-contacts">
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
                  applications.map((app: any) => (
                    <Card key={app.id} className="overflow-hidden bg-slate-800 border-violet-500/20" data-testid={`card-application-${app.id}`}>
                      <CardHeader className="bg-slate-700/50">
                        <div className="flex justify-between items-start gap-4 flex-wrap">
                          <CardTitle className="text-violet-50">
                            {app.firstName || app.firstname} {app.lastName || app.lastname}
                          </CardTitle>
                          <span className="text-xs text-violet-300">
                            {formatDate(app.createdAt || app.timestamp)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 text-violet-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p><strong>Email:</strong> {app.email}</p>
                            <p><strong>Phone:</strong> {app.phone}</p>
                            <p><strong>Date of Birth:</strong> {app.dateOfBirth || app.dateofbirth}</p>
                            <p><strong>Nationality:</strong> {app.nationality}</p>
                            <p><strong>Address:</strong> {app.address}, {app.city}, {app.country}, {app.postalCode || app.postalcode}</p>
                          </div>
                          <div className="space-y-2">
                            <p><strong>Vocal Range:</strong> {app.vocalRange || app.vocalrange}</p>
                            <p><strong>Years of Experience:</strong> {app.yearsOfExperience || app.yearsofexperience}</p>
                            <p><strong>Teacher Name:</strong> {app.teacherName || app.teachername || 'N/A'}</p>
                            <p><strong>Teacher Email:</strong> {app.teacherEmail || app.teacheremail || 'N/A'}</p>
                            <p><strong>Scholarship Interest:</strong> {app.scholarshipInterest || app.scholarshipinterest ? 'Yes' : 'No'}</p>
                            <p><strong>Special Needs:</strong> {app.specialNeeds || app.specialneeds || 'None'}</p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-3">
                          <div>
                            <h4 className="font-medium text-violet-200">Musical Background</h4>
                            <p className="mt-1 text-sm text-violet-300">{app.musicalBackground || app.musicalbackground}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-violet-200">Performance Experience</h4>
                            <p className="mt-1 text-sm text-violet-300">{app.performanceExperience || app.performanceexperience}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-violet-200">Reason for Applying</h4>
                            <p className="mt-1 text-sm text-violet-300">{app.reasonForApplying || app.reasonforapplying}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-violet-200">How they heard about us</h4>
                            <p className="mt-1 text-sm text-violet-300">{app.heardAboutUs || app.heardaboutus}</p>
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
                  contacts.map((contact: any) => (
                    <Card key={contact.id} className="overflow-hidden bg-slate-800 border-violet-500/20" data-testid={`card-contact-${contact.id}`}>
                      <CardHeader className="bg-slate-700/50">
                        <div className="flex justify-between items-start gap-4 flex-wrap">
                          <CardTitle className="text-violet-50">{contact.name}</CardTitle>
                          <span className="text-xs text-violet-300">
                            {formatDate(contact.createdAt || contact.timestamp)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 text-violet-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <p><strong>Email:</strong> {contact.email}</p>
                          <p><strong>Vocal Type:</strong> {contact.vocalType || contact.vocal_type}</p>
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
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
