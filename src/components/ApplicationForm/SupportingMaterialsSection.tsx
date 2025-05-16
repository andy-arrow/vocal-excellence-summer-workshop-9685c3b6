
import React, { useEffect } from 'react';
import { Info, FileText, Music, File } from 'lucide-react';
import { FileUploadSection } from './FileUploadSection';

// Declare global window interface extension
declare global {
  interface Window {
    applicationFiles: {
      [key: string]: File | null;
    };
  }
}

// Initialize global applicationFiles object if it doesn't exist
if (typeof window !== 'undefined') {
  if (!window.applicationFiles) {
    window.applicationFiles = {
      audioFile1: null,
      audioFile2: null,
      cvFile: null,
      recommendationFile: null
    };
    console.log('SupportingMaterialsSection global init: Created window.applicationFiles');
  }
}

const SupportingMaterialsSection = () => {
  useEffect(() => {
    // Ensure window.applicationFiles is initialized when this component mounts
    if (typeof window !== 'undefined') {
      if (!window.applicationFiles) {
        window.applicationFiles = {
          audioFile1: null,
          audioFile2: null,
          cvFile: null,
          recommendationFile: null
        };
        console.log('SupportingMaterialsSection: Initialized window.applicationFiles');
      } else {
        // Ensure all required keys exist
        const requiredKeys = ['audioFile1', 'audioFile2', 'cvFile', 'recommendationFile'];
        let updated = false;
        
        requiredKeys.forEach(key => {
          if (!(key in window.applicationFiles)) {
            window.applicationFiles[key] = null;
            updated = true;
          }
        });
        
        if (updated) {
          console.log('SupportingMaterialsSection: Updated window.applicationFiles with missing keys');
        }
      }
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

      <div className="flex items-center justify-between mt-6">
        <h3 className="text-xl font-bold text-apple-text">Audio Samples</h3>
        <div className="flex items-center text-sm text-apple-grey gap-1.5 font-medium">
          <Info className="w-4 h-4" />
          <span>MP3/WAV files only</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 border border-apple-border shadow-sm">
        <FileUploadSection
          label="Audio Sample 1"
          description="Upload your first audio sample in MP3 or WAV format (max 5 minutes). This helps us understand your vocal abilities."
          icon={Music}
          fileType="audioFile1"
          acceptedFormats=".mp3,.wav"
          required={true}
          iconColor="text-purple-500"
        />
      </div>
      
      <div className="mt-6 bg-white rounded-xl p-4 border border-apple-border shadow-sm">
        <FileUploadSection
          label="Audio Sample 2 (Optional)"
          description="Upload an optional second audio sample in MP3 or WAV format (max 5 minutes)."
          icon={Music}
          fileType="audioFile2"
          acceptedFormats=".mp3,.wav"
          required={false}
          iconColor="text-purple-400"
        />
      </div>
    </div>
  );
};

export default SupportingMaterialsSection;
