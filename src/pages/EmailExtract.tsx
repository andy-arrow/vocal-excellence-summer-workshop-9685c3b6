import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Mail, Users, MessageSquare, Gift, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface ApplicationEmail {
  email: string;
  source?: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  type: 'application';
}

interface ContactEmail {
  email: string;
  source?: string;
  createdAt: string;
  name: string;
  vocalType: string;
  type: 'contact';
}

interface SignupEmail {
  email: string;
  source?: string;
  createdAt: string;
  variant?: string;
  pagePath?: string;
  type: 'signup';
}

type AllEmails = ApplicationEmail | ContactEmail | SignupEmail;

const EmailExtract = () => {
  const [emails, setEmails] = useState<AllEmails[]>([]);

  const { data: applications = [], isLoading: appsLoading } = useQuery<any[]>({
    queryKey: ['/api/applications'],
  });

  const { data: contacts = [], isLoading: contactsLoading } = useQuery<any[]>({
    queryKey: ['/api/contact-submissions'],
  });

  const { data: signups = [], isLoading: signupsLoading } = useQuery<any[]>({
    queryKey: ['/api/email-signups'],
  });

  const loading = appsLoading || contactsLoading || signupsLoading;

  useEffect(() => {
    if (!loading) {
      const allEmails: AllEmails[] = [
        ...(applications || []).map((app: any) => ({
          email: app.email,
          source: app.source,
          createdAt: app.createdAt,
          firstName: app.firstName,
          lastName: app.lastName,
          phone: app.phone,
          type: 'application' as const
        })),
        ...(contacts || []).map((contact: any) => ({
          email: contact.email,
          source: contact.source,
          createdAt: contact.createdAt,
          name: contact.name,
          vocalType: contact.vocalType,
          type: 'contact' as const
        })),
        ...(signups || []).map((signup: any) => ({
          email: signup.email,
          source: signup.source,
          createdAt: signup.createdAt,
          variant: signup.variant,
          pagePath: signup.pagePath,
          type: 'signup' as const
        }))
      ];

      allEmails.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      setEmails(allEmails);
    }
  }, [applications, contacts, signups, loading]);

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
      return [
        email.email,
        email.type,
        new Date(email.createdAt).toISOString(),
        email.source || '',
        email.type === 'application' ? email.firstName : 
         email.type === 'contact' ? email.name : '',
        email.type === 'application' ? email.lastName : '',
        email.type === 'application' ? email.phone : '',
        email.type === 'contact' ? email.vocalType : '',
        email.type === 'signup' ? email.variant || '' : '',
        email.type === 'signup' ? email.pagePath || '' : ''
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
    return {
      application: emails.filter(e => e.type === 'application').length,
      contact: emails.filter(e => e.type === 'contact').length,
      signup: emails.filter(e => e.type === 'signup').length
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p>Extracting all emails from database...</p>
          </div>
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
                <div className="flex items-center justify-between gap-2">
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
                <div className="flex items-center justify-between gap-2">
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
                <div className="flex items-center justify-between gap-2">
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
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm text-gray-600">Contacts</p>
                    <p className="text-2xl font-bold">{stats.contact}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center gap-4 flex-wrap">
            <p className="text-gray-600">
              Showing {emails.length} total email entries from all sources
            </p>
            <Button onClick={exportToCSV} className="flex items-center gap-2" data-testid="button-export-csv">
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
                    <tr key={index} className="border-b hover:bg-gray-50" data-testid={`row-email-${index}`}>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(email.type)}
                          <span className="capitalize text-sm">{email.type}</span>
                        </div>
                      </td>
                      <td className="p-2 font-mono text-sm">{email.email}</td>
                      <td className="p-2">
                        {email.type === 'application' ? `${email.firstName} ${email.lastName}` :
                         email.type === 'contact' ? email.name : 
                         'N/A'}
                      </td>
                      <td className="p-2 text-sm">
                        {new Date(email.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-2 text-sm">{email.source || 'N/A'}</td>
                      <td className="p-2 text-sm">
                        {email.type === 'application' ? email.phone :
                         email.type === 'contact' ? email.vocalType :
                         email.type === 'signup' ? `${email.variant || 'N/A'} | ${email.pagePath || 'N/A'}` :
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
