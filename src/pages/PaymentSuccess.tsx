import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Calendar, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import confetti from 'canvas-confetti';

interface PaymentVerificationResult {
  success: boolean;
  paymentStatus?: string;
  applicantName?: string;
  email?: string;
  error?: string;
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [applicantName, setApplicantName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [resuming, setResuming] = useState(false);

  const sessionId = searchParams.get('session_id');
  const applicationId = searchParams.get('application_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !applicationId) {
        setError('Missing payment information');
        setVerifying(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/verify-payment?session_id=${sessionId}&application_id=${applicationId}`
        );
        const result: PaymentVerificationResult = await response.json();

        if (result.success && result.paymentStatus === 'paid') {
          setVerified(true);
          setApplicantName(result.applicantName || '');
          setEmail(result.email || '');
          
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10B981', '#3B82F6', '#8B5CF6'],
            disableForReducedMotion: true,
            useWorker: false,
          });
        } else {
          setError(result.error || 'Payment verification failed');
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setError('Unable to verify payment. Please contact support.');
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, applicationId]);

  const handleResumePayment = async () => {
    if (!applicationId) return;
    setResuming(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: parseInt(applicationId, 10) }),
      });
      const data = await response.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Unable to resume payment. Please contact us.');
      }
    } catch {
      setError('Unable to reach the server. Please try again or contact us.');
    } finally {
      setResuming(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-apple-light">
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <Loader2 className="w-12 h-12 text-apple-blue animate-spin mb-4" />
          <p className="text-apple-grey font-medium">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-apple-light flex flex-col">
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl text-red-500">!</span>
          </div>
          <h1 className="font-serif text-3xl text-apple-text mb-4">Payment Verification Issue</h1>
          <p className="text-apple-grey max-w-md mb-3">{error}</p>
          {applicationId && (
            <p className="text-apple-grey text-sm max-w-md mb-8">
              Your application has been saved. You can retry the payment below, or contact{' '}
              <a href="mailto:info@vocalexcellence.cy" className="text-apple-blue hover:underline">
                info@vocalexcellence.cy
              </a>{' '}
              with your application ID: <strong>{applicationId}</strong>.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {applicationId && (
              <Button onClick={handleResumePayment} disabled={resuming}>
                {resuming ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : <RefreshCw className="mr-2 w-4 h-4" />}
                Retry Payment
              </Button>
            )}
            <Button asChild variant="outline">
              <Link to="/" data-testid="link-try-again">
                Go to Home <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-apple-light flex flex-col">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      
      <motion.div 
        className="flex-1 max-w-2xl mx-auto px-4 py-12 sm:py-20 text-center w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8"
        >
          <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </motion.div>

        <h1 
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-apple-text mb-3 sm:mb-4"
          data-testid="text-success-title"
        >
          Application Submitted!
        </h1>
        
        <p className="text-apple-grey text-base sm:text-lg mb-8 sm:mb-10 max-w-lg mx-auto">
          Thank you{applicantName ? `, ${applicantName.split(' ')[0]}` : ''} for applying to Vocal Excellence 2026. Your application has been received and your registration fee has been processed.
        </p>

        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-apple-border text-left"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-apple-text text-sm sm:text-base mb-1">Confirmation Email</h3>
                <p className="text-apple-grey text-xs sm:text-sm">
                  A confirmation has been sent to {email || 'your email address'} with next steps and your application reference.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-apple-border text-left"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
              </div>
              <div>
                <h3 className="font-semibold text-apple-text text-sm sm:text-base mb-1">What's Next?</h3>
                <p className="text-apple-grey text-xs sm:text-sm">
                  Faculty personally reviews every application. Decisions are released by June 1, 2026.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <Button 
          asChild 
          size="lg"
          className="bg-apple-blue text-white rounded-full px-8"
        >
          <Link to="/" data-testid="link-return-home">
            Return to Home <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </motion.div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
