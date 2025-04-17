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
        <h3 className="text-xl font-semibold text-[#1d1d1f]">Supporting Materials</h3>
        <div className="flex items-center text-sm text-[#86868b] gap-1.5">
          <Info className="w-4 h-4" />
          <span>MP3, WAV, or PDF files only</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 border border-[#e6e6e6] hover:border-[#d2d2d7] transition-colors">
        <FileUploadSection
          label="First Audition Recording"
          description="Upload your first piece (3-5 minutes) in MP3 or WAV format."
          icon={Music}
          fileType="audioFile1"
          acceptedFormats=".mp3,.wav"
          required={true}
          iconColor="text-[#1d1d1f]"
        />
      </div>
      
      <div className="bg-white rounded-xl p-4 border border-[#e6e6e6] hover:border-[#d2d2d7] transition-colors">
        <FileUploadSection
          label="Second Audition Recording"
          description="Upload your second contrasting piece (3-5 minutes) in MP3 or WAV format."
          icon={Music}
          fileType="audioFile2"
          acceptedFormats=".mp3,.wav"
          required={true}
          iconColor="text-[#1d1d1f]"
        />
      </div>
      
      <div className="bg-white rounded-xl p-4 border border-[#e6e6e6] hover:border-[#d2d2d7] transition-colors">
        <FileUploadSection
          label="CV/Resume"
          description="Upload your musical CV/Resume in PDF format."
          icon={FileText}
          fileType="cvFile"
          acceptedFormats=".pdf"
          required={true}
          iconColor="text-[#1d1d1f]"
        />
      </div>
      
      <div className="bg-white rounded-xl p-4 border border-[#e6e6e6] hover:border-[#d2d2d7] transition-colors">
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
    </div>
  );
};

export default SupportingMaterialsSection;
