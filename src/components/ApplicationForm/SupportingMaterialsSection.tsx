
import React, { useEffect } from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { File, Info, FileText } from 'lucide-react';
import { FileUploadSection } from './FileUploadSection';

// Declare global window interface extension
declare global {
  interface Window {
    applicationFiles: {
      [key: string]: File | null;
    };
  }
}

// Initialize global applicationFiles object
if (typeof window !== 'undefined') {
  window.applicationFiles = window.applicationFiles || {
    audioFile1: null,
    audioFile2: null,
    cvFile: null,
    recommendationFile: null
  };
}

const SupportingMaterialsSection = () => {
  useEffect(() => {
    // Ensure window.applicationFiles is initialized when this component mounts
    if (typeof window !== 'undefined') {
      window.applicationFiles = window.applicationFiles || {
        audioFile1: null,
        audioFile2: null,
        cvFile: null,
        recommendationFile: null
      };
      console.log('SupportingMaterialsSection: Initialized window.applicationFiles', window.applicationFiles);
    }
    
    // Cleanup on unmount
    return () => {
      console.log('SupportingMaterialsSection: Component unmounted');
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-apple-text">Supporting Materials</h3>
        <div className="flex items-center text-sm text-apple-grey gap-1.5 font-medium">
          <Info className="w-4 h-4" />
          <span>PDF files only</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 border border-apple-border shadow-sm">
        <FileUploadSection
          label="CV / Resume"
          description="Upload your CV or Resume in PDF format. This helps us understand your experience better."
          icon={FileText}
          fileType="cvFile"
          acceptedFormats=".pdf"
          required={true}
          iconColor="text-apple-blue"
        />
      </div>
      
      <div className="mt-6 bg-white rounded-xl p-4 border border-apple-border shadow-sm">
        <FileUploadSection
          label="Recommendation Letter (Optional)"
          description="Upload your recommendation letter in PDF format. This is optional."
          icon={File}
          fileType="recommendationFile"
          acceptedFormats=".pdf"
          required={false}
          iconColor="text-apple-text"
        />
      </div>
    </div>
  );
};

export default SupportingMaterialsSection;
