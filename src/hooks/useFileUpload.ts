
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { validateFileUpload } from '@/utils/security';
import { applicationFilesStore } from '@/stores/applicationFilesStore';

export interface UploadState {
  file: File | null;
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: number;
  error: string | null;
}

const ALLOWED_AUDIO_TYPES = ['audio/mp3', 'audio/mpeg', 'audio/wav'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf'];
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB max size

export const useFileUpload = (fileType: string) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    status: 'idle',
    progress: 0,
    error: null
  });

  // Check if there's already a file in applicationFilesStore when the hook mounts
  useEffect(() => {
    const existingFile = applicationFilesStore.getFile(fileType as any);
    if (existingFile) {
      console.log(`useFileUpload: Found existing file for ${fileType} on hook mount:`, existingFile.name);
      setUploadState({
        file: existingFile,
        status: 'success',
        progress: 100,
        error: null
      });
    }
  }, [fileType]);

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
        MAX_FILE_SIZE
      );
      
      if (validationError) {
        console.error(`useFileUpload: Validation error for ${fileType}:`, validationError);
        throw new Error(validationError);
      }
      
      // Store file in our central store
      applicationFilesStore.setFile(fileType as any, file);
      console.log(`useFileUpload: Stored file in applicationFilesStore.${fileType}:`, file.name, file.size, 'bytes', file.type);
      
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
      
      // Simulate completion after progress
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
      console.error(`useFileUpload: Error processing ${fileType}:`, error);
      
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
      
      // In case of error, clear the file from store
      applicationFilesStore.setFile(fileType as any, null);
      console.log(`useFileUpload: Cleared file from applicationFilesStore.${fileType} due to error`);
    }
  };
  
  const reset = () => {
    // Remove the file from our store
    applicationFilesStore.setFile(fileType as any, null);
    console.log(`useFileUpload: Reset file in applicationFilesStore.${fileType}`);
    
    setUploadState({
      file: null,
      status: 'idle',
      progress: 0,
      error: null
    });
  };
  
  return { uploadState, handleFileUpload, reset };
};
