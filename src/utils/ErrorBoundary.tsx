
import React, { Component, ErrorInfo, ReactNode } from 'react';
import AlertBanner from '@/components/AlertBanner';
import { trackError } from '@/utils/monitoring';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Collect additional context for error reporting
    const errorContext = {
      componentStack: errorInfo.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    // Log the error to our monitoring service
    trackError('component_error', error, errorContext);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="p-6 max-w-xl mx-auto my-8 rounded-2xl bg-white/90 backdrop-blur shadow-lg border border-gray-100">
          <AlertBanner
            title="Something went wrong"
            message="We've been notified about this issue and are working to fix it."
            type="error"
            className="mb-6"
          />
          
          <div className="flex justify-center">
            <Button 
              onClick={this.resetErrorBoundary}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
