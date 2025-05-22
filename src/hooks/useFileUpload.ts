
import { useState, useEffect } from 'react';
import { applicationFilesStore } from '@/stores/applicationFilesStore';
import { toast } from '@/hooks/use-toast';
import { validateFileUpload } from '@/utils/security';

export type UploadState = {
  file: File | null;
  status: 'idle' | 'uploading' | 'success' | 'error';
  error: string | null;
  progress: number;
};

export const useFileUpload = (fileType: string) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    status: 'idle',
    error: null,
    progress: 0,
  });

  // Check if there's already a file in the store when the component mounts
  useEffect(() => {
    if (['audioFile1', 'audioFile2', 'cvFile', 'recommendationFile'].includes(fileType)) {
      const existingFile = applicationFilesStore.getFile(fileType as any);
      if (existingFile && uploadState.status === 'idle' && !uploadState.file) {
        console.log(`useFileUpload(${fileType}): Found existing file on mount:`, existingFile.name);
        setUploadState({
          file: existingFile,
          status: 'success',
          error: null,
          progress: 100,
        });
      }
    }
  }, [fileType, uploadState.status, uploadState.file]);

  const handleFileUpload = async (file: File) => {
    try {
      // Define accepted file types based on fileType
      const acceptedTypes = fileType.includes('audio') 
        ? ['audio/mp3', 'audio/mpeg', 'audio/wav'] 
        : ['application/pdf'];
      
      // Validate file size (50MB limit) and type
      const maxSizeBytes = 50 * 1024 * 1024;
      const validationError = validateFileUpload(file, acceptedTypes, maxSizeBytes);
      
      if (validationError) {
        setUploadState({
          file: null,
          status: 'error',
          error: validationError,
          progress: 0,
        });
        
        toast({
          title: "File validation error",
          description: validationError,
          variant: "destructive",
        });
        
        return;
      }

      // Start upload
      setUploadState({
        file,
        status: 'uploading',
        error: null,
        progress: 10,
      });
      
      // Simulate progress (in a real implementation, this would track actual upload progress)
      const progressInterval = setInterval(() => {
        setUploadState(state => ({
          ...state,
          progress: Math.min(state.progress + 15, 90)
        }));
      }, 300);
      
      // Store the file for later submission
      setTimeout(() => {
        clearInterval(progressInterval);
        
        // Store the file in our application files store
        if (['audioFile1', 'audioFile2', 'cvFile', 'recommendationFile'].includes(fileType)) {
          applicationFilesStore.setFile(fileType as any, file);
        }
        
        // Update UI state
        setUploadState({
          file,
          status: 'success',
          error: null,
          progress: 100,
        });
        
        console.log(`File ${fileType} stored: ${file.name}, ${file.size} bytes, ready for submission`);
      }, 1000);
    } catch (error) {
      console.error(`Error handling ${fileType} file upload:`, error);
      setUploadState({
        file: null,
        status: 'error',
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        progress: 0,
      });
      
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const reset = () => {
    // Clear the file from our store
    if (['audioFile1', 'audioFile2', 'cvFile', 'recommendationFile'].includes(fileType)) {
      applicationFilesStore.setFile(fileType as any, null);
    }
    
    setUploadState({
      file: null,
      status: 'idle',
      error: null,
      progress: 0,
    });
    
    console.log(`File ${fileType} removed from storage`);
  };

  return {
    uploadState,
    handleFileUpload,
    reset,
  };
};
