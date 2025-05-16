
import { useState } from 'react';
import { applicationFilesStore } from '@/stores/applicationFilesStore';
import { toast } from '@/hooks/use-toast';

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

  // Check if there's already a file in the store
  const existingFile = applicationFilesStore.getFile(fileType as any);
  if (existingFile && uploadState.status === 'idle' && !uploadState.file) {
    setUploadState({
      file: existingFile,
      status: 'success',
      error: null,
      progress: 100,
    });
  }

  const handleFileUpload = async (file: File) => {
    try {
      // Validate file size and type
      const maxSizeMB = 50;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      
      if (file.size > maxSizeBytes) {
        setUploadState({
          file: null,
          status: 'error',
          error: `File size exceeds the ${maxSizeMB}MB limit`,
          progress: 0,
        });
        
        toast({
          title: "File too large",
          description: `Maximum file size is ${maxSizeMB}MB. Please upload a smaller file.`,
          variant: "destructive",
        });
        
        return;
      }
      
      // Audio files validation
      if (fileType.includes('audio')) {
        const validAudioTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav'];
        if (!validAudioTypes.includes(file.type)) {
          setUploadState({
            file: null,
            status: 'error',
            error: 'Invalid audio format. Please upload MP3 or WAV files only.',
            progress: 0,
          });
          
          toast({
            title: "Invalid audio format",
            description: "Please upload MP3 or WAV files only.",
            variant: "destructive",
          });
          
          return;
        }
      }
      
      // Document validation
      if (fileType.includes('cv') || fileType.includes('recommendation')) {
        if (file.type !== 'application/pdf') {
          setUploadState({
            file: null,
            status: 'error',
            error: 'Invalid document format. Please upload PDF files only.',
            progress: 0,
          });
          
          toast({
            title: "Invalid document format",
            description: "Please upload PDF files only.",
            variant: "destructive",
          });
          
          return;
        }
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
      
      // We're not actually uploading to Supabase here - we're just storing in memory
      // This file will be uploaded when the form is submitted
      setTimeout(() => {
        clearInterval(progressInterval);
        
        // Store the file in our application files store
        applicationFilesStore.setFile(fileType as any, file);
        
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
    applicationFilesStore.setFile(fileType as any, null);
    
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
