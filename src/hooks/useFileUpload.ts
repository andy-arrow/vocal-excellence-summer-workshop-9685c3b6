
import { useState } from 'react';
import { uploadFile } from '@/utils/fileUpload';
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/hooks/use-toast';

export interface FileUploadState {
  status: 'idle' | 'uploading' | 'success' | 'error';
  fileName: string;
  progress: number;
  path?: string;
}

export const useFileUpload = (fileType: string, maxSize: number = 10 * 1024 * 1024) => {
  const [uploadState, setUploadState] = useState<FileUploadState>({
    status: 'idle',
    fileName: '',
    progress: 0
  });

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Check file size
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSize / (1024 * 1024)}MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
        variant: "destructive"
      });
      return;
    }

    // Update upload state to show progress
    setUploadState({
      status: 'uploading',
      fileName: file.name,
      progress: 0
    });

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { path, error } = await uploadFile(file, user.id, fileType);
      
      if (error) throw error;

      setUploadState({
        status: 'success',
        fileName: file.name,
        progress: 100,
        path
      });

      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
        className: "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-700",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      
      setUploadState({
        status: 'error',
        fileName: file.name,
        progress: 0
      });

      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive"
      });
    }
  };

  const reset = () => {
    setUploadState({
      status: 'idle',
      fileName: '',
      progress: 0
    });
  };

  return { uploadState, handleFileUpload, reset };
};
