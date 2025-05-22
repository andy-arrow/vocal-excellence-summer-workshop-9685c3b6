
import React from 'react';
import { Info, FileText, Music, File } from 'lucide-react';
import { FileUploadSection } from './FileUploadSection';
import { ApplicationFileType } from '@/stores/applicationFilesStore';

interface ApplicationFiles {
  audioFile1: File | null;
  audioFile2: File | null;
  cvFile: File | null;
  recommendationFile: File | null;
}

export interface SupportingMaterialsSectionProps {
  updateFile: (fileType: string, file: File | null) => void;
  files: ApplicationFiles;
}

const SupportingMaterialsSection: React.FC<SupportingMaterialsSectionProps> = ({ 
  updateFile,
  files
}) => {
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
          label="CV / Resume (Optional)"
          description="Upload your CV or Resume in PDF format. This helps us understand your experience better."
          icon={FileText}
          fileType="cvFile"
          acceptedFormats=".pdf"
          required={false}
          iconColor="text-apple-blue"
          updateFile={(file) => updateFile('cvFile', file)}
          currentFile={files.cvFile}
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
          updateFile={(file) => updateFile('recommendationFile', file)}
          currentFile={files.recommendationFile}
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
          label="Audio Sample 1 (Optional)"
          description="Upload your first audio sample in MP3 or WAV format (max 5 minutes). This helps us understand your vocal abilities."
          icon={Music}
          fileType="audioFile1"
          acceptedFormats=".mp3,.wav"
          required={false}
          iconColor="text-purple-500"
          updateFile={(file) => updateFile('audioFile1', file)}
          currentFile={files.audioFile1}
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
          updateFile={(file) => updateFile('audioFile2', file)}
          currentFile={files.audioFile2}
        />
      </div>
    </div>
  );
};

export default SupportingMaterialsSection;
