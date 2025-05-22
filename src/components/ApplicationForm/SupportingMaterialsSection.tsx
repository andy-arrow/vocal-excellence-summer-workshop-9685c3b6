
import React from 'react';
import { FileAudio, FileText, FileQuestion } from 'lucide-react';
import { FileUploadSection } from './FileUploadSection';
import { FormSection } from '@/components/ui/form';
import { ApplicationFiles } from '@/services/applicationService';

interface SupportingMaterialsSectionProps {
  updateFile: (fileType: keyof ApplicationFiles, file: File | null) => void;
  files: ApplicationFiles;
}

const SupportingMaterialsSection: React.FC<SupportingMaterialsSectionProps> = ({ updateFile, files }) => {
  return (
    <FormSection title="Supporting Materials" description="Upload audio recordings and documents to support your application.">
      <div className="space-y-8">
        <FileUploadSection 
          label="Audio Recording 1" 
          description="Upload a recording of your singing (mp3, wav)."
          icon={FileAudio}
          fileType="audioFile1"
          acceptedFormats=".mp3,.wav"
          required={false}
          iconColor="text-blue-600"
          updateFile={(file) => updateFile('audioFile1', file)}
          currentFile={files.audioFile1}
        />
        
        <FileUploadSection 
          label="Audio Recording 2 (Optional)" 
          description="Upload a second recording to showcase a different style if desired."
          icon={FileAudio}
          fileType="audioFile2"
          acceptedFormats=".mp3,.wav"
          required={false}
          iconColor="text-blue-600"
          updateFile={(file) => updateFile('audioFile2', file)}
          currentFile={files.audioFile2}
        />
        
        <FileUploadSection 
          label="CV / Resume" 
          description="Upload your CV or musical resume in PDF format."
          icon={FileText}
          fileType="cvFile"
          acceptedFormats=".pdf"
          required={false}
          iconColor="text-red-600"
          updateFile={(file) => updateFile('cvFile', file)}
          currentFile={files.cvFile}
        />
        
        <FileUploadSection 
          label="Letter of Recommendation (Optional)" 
          description="Upload a recommendation letter from a teacher or mentor."
          icon={FileText}
          fileType="recommendationFile"
          acceptedFormats=".pdf"
          required={false}
          iconColor="text-green-600"
          updateFile={(file) => updateFile('recommendationFile', file)}
          currentFile={files.recommendationFile}
        />
      </div>
    </FormSection>
  );
};

export default SupportingMaterialsSection;
