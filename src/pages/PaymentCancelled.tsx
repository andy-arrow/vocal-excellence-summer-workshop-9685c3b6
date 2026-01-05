import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const PaymentCancelled = () => {
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get('application_id');

  return (
    <div className="min-h-screen bg-apple-light">
      <Navbar />
      
      <motion.div 
        className="max-w-2xl mx-auto px-4 py-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <XCircle className="w-12 h-12 text-amber-600" />
        </motion.div>

        <h1 
          className="font-serif text-4xl md:text-5xl text-apple-text mb-4"
          data-testid="text-cancelled-title"
        >
          Payment Cancelled
        </h1>
        
        <p className="text-apple-grey text-lg mb-6 max-w-lg mx-auto">
          Your payment was not completed. Don't worry - your application data has been saved. You can complete the payment when you're ready.
        </p>

        <div className="bg-white rounded-xl p-6 border border-apple-border text-left mb-10 max-w-md mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-apple-text mb-1">Need Help?</h3>
              <p className="text-apple-grey text-sm">
                If you experienced any issues with the payment process, please contact us at{' '}
                <a 
                  href="mailto:support@vocalexcellence.cy" 
                  className="text-apple-blue hover:underline"
                >
                  support@vocalexcellence.cy
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg"
            className="bg-apple-blue text-white rounded-full px-8"
          >
            <Link to="/apply" data-testid="link-try-again">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Return to Application
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="outline"
            size="lg"
            className="rounded-full px-8"
          >
            <Link to="/" data-testid="link-home">
              Go to Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancelled;
