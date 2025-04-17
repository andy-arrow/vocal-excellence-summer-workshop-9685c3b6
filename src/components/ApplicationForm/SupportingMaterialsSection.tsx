
import React, { useEffect } from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Music, FileText, File } from 'lucide-react';
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
      <h3 className="text-xl font-semibold text-[#1d1d1f] mb-4">Supporting Materials</h3>
      
      <FileUploadSection
        label="First Audition Recording (Required)"
        description="Upload your first piece (3-5 minutes) in MP3 or WAV format."
        icon={Music}
        fileType="audioFile1"
        acceptedFormats=".mp3,.wav"
        required={true}
        iconColor="text-[#1d1d1f]"
      />
      
      <FileUploadSection
        label="Second Audition Recording (Required)"
        description="Upload your second contrasting piece (3-5 minutes) in MP3 or WAV format."
        icon={Music}
        fileType="audioFile2"
        acceptedFormats=".mp3,.wav"
        required={true}
        iconColor="text-[#1d1d1f]"
      />
      
      <FileUploadSection
        label="CV/Resume (Required)"
        description="Upload your musical CV/Resume in PDF format."
        icon={FileText}
        fileType="cvFile"
        acceptedFormats=".pdf"
        required={true}
        iconColor="text-[#1d1d1f]"
      />
      
      <FileUploadSection
        label="Recommendation Letter (Optional)"
        description="Upload your recommendation letter in PDF format. This is optional."
        icon={File}
        fileType="recommendationFile"
        acceptedFormats=".pdf"
        required={false}
        iconColor="text-[#1d1d1f]"
      />
    </div>
  );
};

export default SupportingMaterialsSection;
