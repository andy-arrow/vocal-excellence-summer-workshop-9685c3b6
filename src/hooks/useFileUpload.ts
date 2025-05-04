
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

export const useFileUpload = (fileType: string) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    status: 'idle',
    progress: 0,
    error: null
  });

  const handleFileUpload = async (file: File) => {
    setUploadState({
      file,
      status: 'uploading',
      progress: 0,
      error: null
    });
    
    try {
      const isAudio = fileType.includes('audio');
      const allowedTypes = isAudio ? ALLOWED_AUDIO_TYPES : ALLOWED_DOCUMENT_TYPES;
      
      const validationError = validateFileUpload(
        file, 
        allowedTypes,
        Number.MAX_VALUE // Remove size limit for testing
      );
      
      if (validationError) {
        throw new Error(validationError);
      }
      
      // Simulate upload progress for better UX
      const interval = setInterval(() => {
        setUploadState(prev => {
          if (prev.progress >= 90) {
            clearInterval(interval);
            return prev;
          }
          return { ...prev, progress: prev.progress + 10 };
        });
      }, 300);
      
      // Store file in the global object for later submission
      if (typeof window !== 'undefined') {
        // Create the object if it doesn't exist
        if (!window.applicationFiles) {
          window.applicationFiles = {
            audioFile1: null,
            audioFile2: null,
            cvFile: null,
            recommendationFile: null,
          };
        }
        
        // Store the file
        window.applicationFiles[fileType] = file;
        console.log(`useFileUpload: Stored file in window.applicationFiles.${fileType}:`, file.name, file.size, 'bytes');
        console.log('Current applicationFiles state:', Object.keys(window.applicationFiles).map(key => 
          `${key}: ${window.applicationFiles[key] ? window.applicationFiles[key].name : 'null'}`
        ));
      }
      
      // Simulate completion after progress
      setTimeout(() => {
        clearInterval(interval);
        setUploadState({
          file,
          status: 'success',
          progress: 100,
          error: null
        });
        
        toast.toast({
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
      
      toast.toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
        className: "bg-rose-600 text-white border-rose-700",
      });
    }
  };
  
  const reset = () => {
    // Remove the file from the global object when reset
    if (typeof window !== 'undefined' && window.applicationFiles) {
      window.applicationFiles[fileType] = null;
      console.log(`useFileUpload: Reset file in window.applicationFiles.${fileType}`);
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
