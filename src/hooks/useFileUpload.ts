
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { validateFileUpload } from '@/utils/security';

export interface UploadState {
  file: File | null;
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: number;
  error: string | null;
}

const ALLOWED_AUDIO_TYPES = ['audio/mp3', 'audio/mpeg', 'audio/wav'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf'];
const MAX_AUDIO_SIZE_MB = 10;
const MAX_DOCUMENT_SIZE_MB = 2;

export const useFileUpload = (fileType: string) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    status: 'idle',
    progress: 0,
    error: null
  });

  const handleFileUpload = async (file: File) => {
    // Reset the state
    setUploadState({
      file,
      status: 'uploading',
      progress: 0,
      error: null
    });
    
    try {
      // Determine file category for validation
      const isAudio = fileType.includes('audio');
      const allowedTypes = isAudio ? ALLOWED_AUDIO_TYPES : ALLOWED_DOCUMENT_TYPES;
      const maxSizeMB = isAudio ? MAX_AUDIO_SIZE_MB : MAX_DOCUMENT_SIZE_MB;
      
      // Validate file type and size
      const validationError = validateFileUpload(
        file, 
        allowedTypes, 
        maxSizeMB
      );
      
      if (validationError) {
        throw new Error(validationError);
      }
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadState(prev => {
          if (prev.progress >= 90) {
            clearInterval(interval);
            return prev;
          }
          return { ...prev, progress: prev.progress + 10 };
        });
      }, 300);
      
      // Store the file in the global applicationFiles object
      if (typeof window !== 'undefined') {
        window.applicationFiles[fileType] = file;
      }
      
      // Simulate upload completion
      setTimeout(() => {
        clearInterval(interval);
        setUploadState({
          file,
          status: 'success',
          progress: 100,
          error: null
        });
        
        toast({
          title: "File uploaded successfully",
          description: `${file.name} is ready to be submitted with your application.`,
          className: "bg-green-600 text-white border-green-700",
        });
      }, 2000);
      
    } catch (error: any) {
      setUploadState({
        file: null,
        status: 'error',
        progress: 0,
        error: error.message
      });
      
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
        className: "bg-rose-600 text-white border-rose-700",
      });
    }
  };
  
  const reset = () => {
    // Remove file from global applicationFiles
    if (typeof window !== 'undefined' && window.applicationFiles) {
      window.applicationFiles[fileType] = null;
    }
    
    setUploadState({
      file: null,
      status: 'idle',
      progress: 0,
      error: null
    });
  };
  
  return { uploadState, handleFileUpload, reset };
};
