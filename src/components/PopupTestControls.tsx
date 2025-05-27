
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PopupStatus {
  config: any;
  state: {
    popupShown: boolean;
    timeTriggered: boolean;
    scrollTriggered: boolean;
    exitTriggered: boolean;
    variant: string;
    shouldShow: boolean;
  };
  credentials: {
    supabaseUrl: boolean;
    supabaseKey: boolean;
    mailchimpKey: boolean;
    mailchimpList: boolean;
  };
}

export const PopupTestControls = () => {
  const [status, setStatus] = React.useState<PopupStatus | null>(null);

  const updateStatus = () => {
    if (window.VX_DEBUG) {
      setStatus(window.VX_DEBUG.getStatus());
    } else {
      console.log('VX_DEBUG not available');
    }
  };

  React.useEffect(() => {
    updateStatus();
    const interval = setInterval(updateStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleForceShow = () => {
    if (window.VX_DEBUG) {
      window.VX_DEBUG.forceShow();
      setTimeout(updateStatus, 100);
    }
  };

  const handleClearStorage = () => {
    if (window.VX_DEBUG) {
      window.VX_DEBUG.clearStorage();
      setTimeout(updateStatus, 100);
    }
  };

  const handleClosePopup = () => {
    if (window.VX_DEBUG) {
      window.VX_DEBUG.closePopup();
      setTimeout(updateStatus, 100);
    }
  };

  if (!status) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Popup Test Controls</CardTitle>
          <CardDescription>Loading popup system status...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Popup Test Controls</CardTitle>
        <CardDescription>Debug and test the email popup system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Popup Shown:</div>
          <Badge variant={status.state.popupShown ? "default" : "secondary"}>
            {status.state.popupShown ? "Yes" : "No"}
          </Badge>
          
          <div>Should Show:</div>
          <Badge variant={status.state.shouldShow ? "default" : "secondary"}>
            {status.state.shouldShow ? "Yes" : "No"}
          </Badge>
          
          <div>Variant:</div>
          <Badge variant="outline">{status.state.variant}</Badge>
          
          <div>Time Triggered:</div>
          <Badge variant={status.state.timeTriggered ? "default" : "secondary"}>
            {status.state.timeTriggered ? "Yes" : "No"}
          </Badge>
          
          <div>Scroll Triggered:</div>
          <Badge variant={status.state.scrollTriggered ? "default" : "secondary"}>
            {status.state.scrollTriggered ? "Yes" : "No"}
          </Badge>
          
          <div>Supabase:</div>
          <Badge variant={status.credentials.supabaseUrl && status.credentials.supabaseKey ? "default" : "destructive"}>
            {status.credentials.supabaseUrl && status.credentials.supabaseKey ? "OK" : "Missing"}
          </Badge>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button onClick={handleForceShow} size="sm">
            Force Show Popup
          </Button>
          <Button onClick={handleClearStorage} variant="outline" size="sm">
            Clear Storage
          </Button>
          <Button onClick={handleClosePopup} variant="outline" size="sm">
            Close Popup
          </Button>
          <Button onClick={updateStatus} variant="ghost" size="sm">
            Refresh Status
          </Button>
        </div>
        
        <div className="text-xs text-gray-500">
          <div>Time Delay: {status.config?.TIME_DELAY}ms</div>
          <div>Scroll Threshold: {(status.config?.SCROLL_THRESHOLD * 100)}%</div>
          <div>TTL: {status.config?.TTL_DAYS} days</div>
        </div>
      </CardContent>
    </Card>
  );
};

// Add to window for easy access in console
if (typeof window !== 'undefined') {
  window.PopupTestControls = PopupTestControls;
}
