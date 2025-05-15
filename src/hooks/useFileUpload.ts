
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
    console.log(`useFileUpload: Starting upload for ${fileType}: ${file.name}, ${file.size} bytes, ${file.type}`);
    
    setUploadState({
      file,
      status: 'uploading',
      progress: 0,
      error: null
    });
    
    try {
      const isAudio = fileType.includes('audio');
      const allowedTypes = isAudio ? ALLOWED_AUDIO_TYPES : ALLOWED_DOCUMENT_TYPES;
      
      console.log(`useFileUpload: Validating ${fileType}, isAudio: ${isAudio}, file type: ${file.type}`);
      
      const validationError = validateFileUpload(
        file, 
        allowedTypes,
        Number.MAX_VALUE // Remove size limit for testing
      );
      
      if (validationError) {
        console.error(`useFileUpload: Validation error for ${fileType}:`, validationError);
        throw new Error(validationError);
      }
      
      // Initialize window.applicationFiles if it doesn't exist
      if (typeof window !== 'undefined') {
        if (!window.applicationFiles) {
          window.applicationFiles = {
            audioFile1: null,
            audioFile2: null,
            cvFile: null,
            recommendationFile: null
          };
          console.log('useFileUpload: Created missing window.applicationFiles object');
        }
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
        // Store the file
        window.applicationFiles[fileType] = file;
        console.log(`useFileUpload: Stored file in window.applicationFiles.${fileType}:`, file.name, file.size, 'bytes', file.type);
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
      console.error(`useFileUpload: Error processing ${fileType}:`, error);
      
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
      
      // In case of error, clear the file from applicationFiles
      if (typeof window !== 'undefined' && window.applicationFiles) {
        window.applicationFiles[fileType] = null;
        console.log(`useFileUpload: Cleared file from window.applicationFiles.${fileType} due to error`);
      }
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
