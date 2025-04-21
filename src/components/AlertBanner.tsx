
import React from 'react';
import { AlertCircle, Info, Check, XCircle, X } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface AlertBannerProps {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  className?: string;
}

const AlertBanner = ({
  title,
  message,
  type = 'info',
  onClose,
  className,
}: AlertBannerProps) => {
  const getIcon = () => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-apple-blue" />;
      case 'success':
        return <Check className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getAlertClass = () => {
    switch (type) {
      case 'info':
        return 'border-blue-200 bg-blue-50 text-apple-text';
      case 'success':
        return 'border-green-200 bg-green-50 text-apple-text';
      case 'warning':
        return 'border-amber-200 bg-amber-50 text-apple-text';
      case 'error':
        return 'border-red-200 bg-red-50 text-apple-text';
      default:
        return '';
    }
  };

  return (
    <Alert className={cn('relative rounded-xl', getAlertClass(), className)}>
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">{getIcon()}</div>
        <div className="flex-1">
          <AlertTitle className="font-semibold">{title}</AlertTitle>
          <AlertDescription className="mt-1 text-apple-grey">{message}</AlertDescription>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 p-1 rounded-full hover:bg-apple-light transition-colors"
            aria-label="Close alert"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </Alert>
  );
};

export default AlertBanner;
