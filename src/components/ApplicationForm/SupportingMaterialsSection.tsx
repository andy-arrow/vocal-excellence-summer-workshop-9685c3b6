
import React from 'react';
import { Form } from '@/components/ui/form';
import { FileUploadSection } from './FileUploadSection';

// Make sure this interface is consistent with others
interface SupportingMaterialsSectionProps {
  files: {
    audioFile1: File | null;
    audioFile2: File | null;
    cvFile: File | null;
    recommendationFile: File | null;
    [key: string]: File | null;
  };
  updateFile: (fileType: string, file: File | null) => void;
}

const SupportingMaterialsSection: React.FC<SupportingMaterialsSectionProps> = ({ updateFile, files }) => {
  return (
    <div className="space-y-6">
      <FileUploadSection
        label="Audio File 1"
        description="Please upload your first audio file in mp3, mpeg, or wav format."
        icon={File}
        fileType="audioFile1"
        acceptedFormats=".mp3,.wav,.mpeg"
        updateFile={(file) => updateFile('audioFile1', file)}
        currentFile={files.audioFile1}
        required={false}
      />
      
      <FileUploadSection
        label="Audio File 2"
        description="Please upload your second audio file in mp3, mpeg, or wav format."
        icon={File}
        fileType="audioFile2"
        acceptedFormats=".mp3,.wav,.mpeg"
        updateFile={(file) => updateFile('audioFile2', file)}
        currentFile={files.audioFile2}
        required={false}
      />
      
      <FileUploadSection
        label="CV File"
        description="Please upload your CV in PDF format."
        icon={File}
        fileType="cvFile"
        acceptedFormats=".pdf"
        updateFile={(file) => updateFile('cvFile', file)}
        currentFile={files.cvFile}
        required={false}
      />
      
      <FileUploadSection
        label="Letter of Recommendation"
        description="Please upload your letter of recommendation in PDF format."
        icon={File}
        fileType="recommendationFile"
        acceptedFormats=".pdf"
        updateFile={(file) => updateFile('recommendationFile', file)}
        currentFile={files.recommendationFile}
        required={false}
      />
    </div>
  );
};

export default SupportingMaterialsSection;
