
import React, { useEffect } from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Music, FileText, File, Info } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Supporting Materials</h3>
        <div className="flex items-center text-sm text-gray-800 gap-1.5 font-medium">
          <Info className="w-4 h-4" />
          <span>MP3, WAV, or PDF files only</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 border border-gray-300 shadow-sm">
        <FileUploadSection
          label="First Audition Recording"
          description="Upload your first piece (3-5 minutes) in MP3 or WAV format."
          icon={Music}
          fileType="audioFile1"
          acceptedFormats=".mp3,.wav"
          required={true}
          iconColor="text-gray-900"
        />
      </div>
      
      <div className="bg-white rounded-xl p-4 border border-gray-300 shadow-sm">
        <FileUploadSection
          label="Second Audition Recording"
          description="Upload your second contrasting piece (3-5 minutes) in MP3 or WAV format."
          icon={Music}
          fileType="audioFile2"
          acceptedFormats=".mp3,.wav"
          required={true}
          iconColor="text-gray-900"
        />
      </div>
      
      <div className="bg-white rounded-xl p-4 border border-gray-300 shadow-sm">
        <FileUploadSection
          label="CV/Resume"
          description="Upload your musical CV/Resume in PDF format."
          icon={FileText}
          fileType="cvFile"
          acceptedFormats=".pdf"
          required={true}
          iconColor="text-gray-900"
        />
      </div>
      
      <div className="bg-white rounded-xl p-4 border border-gray-300 shadow-sm">
        <FileUploadSection
          label="Recommendation Letter (Optional)"
          description="Upload your recommendation letter in PDF format. This is optional."
          icon={File}
          fileType="recommendationFile"
          acceptedFormats=".pdf"
          required={false}
          iconColor="text-gray-900"
        />
      </div>
    </div>
  );
};

export default SupportingMaterialsSection;
