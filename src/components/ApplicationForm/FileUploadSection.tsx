
import React, { useEffect } from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { UploadStatus } from './UploadStatus';

interface FileUploadSectionProps {
  label: string;
  description: string;
  icon: LucideIcon;
  fileType: string;
  acceptedFormats: string;
  required?: boolean;
  iconColor?: string;
}

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  label,
  description,
  icon: Icon,
  fileType,
  acceptedFormats,
  required = false,
  iconColor = "text-[#1d1d1f]"
}) => {
  const { uploadState, handleFileUpload, reset } = useFileUpload(fileType);

  // Check if a file is already uploaded when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.applicationFiles && window.applicationFiles[fileType]) {
      console.log(`FileUploadSection: Found existing file for ${fileType} on mount:`, 
        window.applicationFiles[fileType]?.name);
    }
  }, [fileType]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`FileUploadSection: Processing file ${file.name} of type ${file.type} and size ${file.size} bytes`);
      await handleFileUpload(file);
      
      // Double check that window.applicationFiles exists and the file was properly stored
      if (typeof window !== 'undefined') {
        if (!window.applicationFiles) {
          window.applicationFiles = {
            audioFile1: null,
            audioFile2: null,
            cvFile: null,
            recommendationFile: null
          };
          console.log('FileUploadSection: Had to create missing window.applicationFiles');
        }
        
        // Store the file again just to be safe
        window.applicationFiles[fileType] = file;
        
        console.log(`FileUploadSection: Verified file ${fileType} in window.applicationFiles:`, 
          window.applicationFiles[fileType]?.name || 'not found', 
          window.applicationFiles[fileType]?.size || 0, 'bytes',
          window.applicationFiles[fileType]?.type || '');
      }
    }
    // Reset the input value to allow uploading the same file again if needed
    e.target.value = '';
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <FormLabel className="text-[#1d1d1f] text-base flex items-center gap-2 font-medium">
          <Icon className={`${iconColor} w-5 h-5`} />
          <span>{label}</span>
          {required && <span className="text-[#bf4800] ml-1">*</span>}
        </FormLabel>
        <span className="text-xs text-[#86868b] font-medium">
          {acceptedFormats}
        </span>
      </div>
      
      <p className="text-sm text-[#86868b] mb-4 leading-relaxed">
        {description}
      </p>
      
      <motion.div 
        className="relative group"
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
      >
        <Input 
          type="file" 
          accept={acceptedFormats}
          className={`
            file:mr-5 file:py-2 file:px-4 
            file:border-0 file:text-sm file:font-medium
            file:bg-[#f5f5f7] file:text-[#1d1d1f] 
            hover:file:bg-[#e6e6e7] file:rounded-lg
            border-[#e6e6e6] hover:border-[#d2d2d7] 
            focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc]
            rounded-xl transition-colors text-sm
            ${uploadState.status !== 'idle' ? 'opacity-60 pointer-events-none' : ''}
          `}
          disabled={uploadState.status !== 'idle'}
          onChange={handleFileChange}
          aria-label={`Upload ${label}`}
        />
      </motion.div>
      
      <UploadStatus 
        uploadState={uploadState}
        onRemove={reset}
      />
    </div>
  );
};
