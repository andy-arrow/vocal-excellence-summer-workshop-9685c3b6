
import React, { useEffect } from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Music4, FileText, ScrollText } from 'lucide-react';
import { FileUploadSection } from './FileUploadSection';
import { UploadStatus } from './UploadStatus';

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
    recommendationFile: null,
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
        recommendationFile: null,
      };
      console.log('SupportingMaterialsSection: Initialized window.applicationFiles', window.applicationFiles);
    }
    
    // Cleanup on unmount
    return () => {
      console.log('SupportingMaterialsSection: Component unmounted');
    };
  }, []);

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold text-violet-100 mb-4">Supporting Materials</h3>
      
      <FileUploadSection
        label="First Audition Recording (Required)"
        description="Upload your first piece (3-5 minutes) in MP3 or WAV format. This is required for your application."
        icon={Music4}
        fileType="audioFile1"
        acceptedFormats=".mp3,.wav"
        required={true}
        iconColor="text-violet-400"
      />
      
      <FileUploadSection
        label="Second Audition Recording (Required)"
        description="Upload your second contrasting piece (3-5 minutes) in MP3 or WAV format. This is required for your application."
        icon={Music4}
        fileType="audioFile2"
        acceptedFormats=".mp3,.wav"
        required={true}
        iconColor="text-violet-400"
      />
      
      <FileUploadSection
        label="CV/Resume (Required)"
        description="Upload your musical CV/Resume in PDF format. This is required for your application."
        icon={FileText}
        fileType="cvFile"
        acceptedFormats=".pdf"
        required={true}
        iconColor="text-fuchsia-400"
      />
      
      <FileUploadSection
        label="Recommendation Letter (Optional)"
        description="Upload your recommendation letter in PDF format. This is optional and can be submitted later if needed."
        icon={ScrollText}
        fileType="recommendationFile"
        acceptedFormats=".pdf"
        required={false}
        iconColor="text-pink-400"
      />
    </div>
  );
};

export default SupportingMaterialsSection;
