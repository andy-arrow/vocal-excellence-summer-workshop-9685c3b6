
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Mail, Users, MessageSquare, Gift } from 'lucide-react';

interface ApplicationEmail {
  email: string;
  source: string;
  timestamp: string;
  firstname: string;
  lastname: string;
  phone: string;
  type: 'application';
}

interface ContactEmail {
  email: string;
  source: string;
  timestamp: string;
  name: string;
  vocal_type: string;
  type: 'contact';
}

interface SignupEmail {
  email: string;
  source: string;
  created_at: string;
  variant: string;
  page_path: string;
  type: 'signup';
}

type AllEmails = ApplicationEmail | ContactEmail | SignupEmail;

const EmailExtract = () => {
  const [emails, setEmails] = useState<AllEmails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllEmails();
  }, []);

  const fetchAllEmails = async () => {
    try {
      setLoading(true);
      console.log('Starting comprehensive email extraction...');

      // Query applications table
      const { data: applications, error: appError } = await supabase
        .from('applications')
        .select('email, source, timestamp, firstname, lastname, phone');

      if (appError) {
        console.error('Error fetching applications:', appError);
        throw appError;
      }

      // Query contact_submissions table
      const { data: contacts, error: contactError } = await supabase
        .from('contact_submissions')
        .select('email, source, timestamp, name, vocal_type');

      if (contactError) {
        console.error('Error fetching contacts:', contactError);
        throw contactError;
      }

      // Query email_signups table
      const { data: signups, error: signupError } = await supabase
        .from('email_signups')
        .select('email, source, created_at, variant, page_path');

      if (signupError) {
        console.error('Error fetching signups:', signupError);
        throw signupError;
      }

      console.log('Applications found:', applications?.length || 0);
      console.log('Contacts found:', contacts?.length || 0);
      console.log('Signups found:', signups?.length || 0);

      // Combine all emails with type identification
      const allEmails: AllEmails[] = [
        ...(applications || []).map(app => ({
          ...app,
          type: 'application' as const
        })),
        ...(contacts || []).map(contact => ({
          ...contact,
          type: 'contact' as const
        })),
        ...(signups || []).map(signup => ({
          ...signup,
          type: 'signup' as const
        }))
      ];

      // Sort by most recent first
      allEmails.sort((a, b) => {
        const dateA = new Date(a.type === 'signup' ? a.created_at : a.timestamp);
        const dateB = new Date(b.type === 'signup' ? b.created_at : b.timestamp);
        return dateB.getTime() - dateA.getTime();
      });

      setEmails(allEmails);
      console.log('Total emails extracted:', allEmails.length);

    } catch (error: any) {
      console.error('Error fetching emails:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const csvHeaders = [
      'Email',
      'Type',
      'Date',
      'Source',
      'Name/FirstName',
      'LastName',
      'Phone',
      'VocalType',
      'Variant',
      'PagePath'
    ];

    const csvRows = emails.map(email => {
      const date = email.type === 'signup' ? email.created_at : email.timestamp;
      return [
        email.email,
        email.type,
        new Date(date).toISOString(),
        email.source || '',
        email.type === 'application' ? email.firstname : 
         email.type === 'contact' ? email.name : '',
        email.type === 'application' ? email.lastname : '',
        email.type === 'application' ? email.phone : '',
        email.type === 'contact' ? email.vocal_type : '',
        email.type === 'signup' ? email.variant || '' : '',
        email.type === 'signup' ? email.page_path || '' : ''
      ];
    });

    const csvContent = [csvHeaders, ...csvRows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all_emails_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getUniqueEmails = () => {
    const uniqueEmails = new Set(emails.map(e => e.email.toLowerCase()));
    return uniqueEmails.size;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'application': return <Users className="h-4 w-4" />;
      case 'contact': return <MessageSquare className="h-4 w-4" />;
      case 'signup': return <Gift className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const getTypeStats = () => {
    const stats = {
      application: emails.filter(e => e.type === 'application').length,
      contact: emails.filter(e => e.type === 'contact').length,
      signup: emails.filter(e => e.type === 'signup').length
    };
    return stats;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Extracting all emails from database...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">{error}</p>
              <Button onClick={fetchAllEmails} className="mt-4">
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const stats = getTypeStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Email Database</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Emails</p>
                    <p className="text-2xl font-bold">{emails.length}</p>
                  </div>
                  <Mail className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Unique Emails</p>
                    <p className="text-2xl font-bold">{getUniqueEmails()}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Applications</p>
                    <p className="text-2xl font-bold">{stats.application}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Contacts</p>
                    <p className="text-2xl font-bold">{stats.contact}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing {emails.length} total email entries from all sources
            </p>
            <Button onClick={exportToCSV} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Email Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Source</th>
                    <th className="text-left p-2">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((email, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(email.type)}
                          <span className="capitalize text-sm">{email.type}</span>
                        </div>
                      </td>
                      <td className="p-2 font-mono text-sm">{email.email}</td>
                      <td className="p-2">
                        {email.type === 'application' ? `${email.firstname} ${email.lastname}` :
                         email.type === 'contact' ? email.name : 
                         'N/A'}
                      </td>
                      <td className="p-2 text-sm">
                        {new Date(email.type === 'signup' ? email.created_at : email.timestamp).toLocaleDateString()}
                      </td>
                      <td className="p-2 text-sm">{email.source || 'N/A'}</td>
                      <td className="p-2 text-sm">
                        {email.type === 'application' ? email.phone :
                         email.type === 'contact' ? email.vocal_type :
                         email.type === 'signup' ? `${email.variant || 'N/A'} | ${email.page_path || 'N/A'}` :
                         'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailExtract;
