import React from 'react';
import { Form } from '@/components/ui/form';
import FileUploadSection from './FileUploadSection';

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
    <Form>
      <div className="space-y-6">
        <FileUploadSection
          title="Audio File 1"
          fileType="audioFile1"
          acceptedTypes={['audio/mp3', 'audio/mpeg', 'audio/wav']}
          onFileChange={file => updateFile('audioFile1', file)}
          existingFile={files.audioFile1}
          description="Please upload your first audio file in mp3, mpeg, or wav format."
        />
        
        <FileUploadSection
          title="Audio File 2"
          fileType="audioFile2"
          acceptedTypes={['audio/mp3', 'audio/mpeg', 'audio/wav']}
          onFileChange={file => updateFile('audioFile2', file)}
          existingFile={files.audioFile2}
          description="Please upload your second audio file in mp3, mpeg, or wav format."
        />
        
        <FileUploadSection
          title="CV File"
          fileType="cvFile"
          acceptedTypes={['application/pdf']}
          onFileChange={file => updateFile('cvFile', file)}
          existingFile={files.cvFile}
          description="Please upload your CV in PDF format."
        />
        
        <FileUploadSection
          title="Letter of Recommendation"
          fileType="recommendationFile"
          acceptedTypes={['application/pdf']}
          onFileChange={file => updateFile('recommendationFile', file)}
          existingFile={files.recommendationFile}
          description="Please upload your letter of recommendation in PDF format."
        />
      </div>
    </Form>
  );
};

export default SupportingMaterialsSection;
