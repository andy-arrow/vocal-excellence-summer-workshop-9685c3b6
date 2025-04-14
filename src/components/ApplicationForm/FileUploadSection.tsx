
import React from 'react';
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
  iconColor = "text-indigo-400"
}) => {
  const { uploadState, handleFileUpload, reset } = useFileUpload(fileType);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`FileUploadSection: Processing file ${file.name} of type ${file.type} and size ${file.size} bytes`);
      await handleFileUpload(file);
      
      // Ensure window.applicationFiles is initialized
      if (typeof window !== 'undefined') {
        if (!window.applicationFiles) {
          window.applicationFiles = {
            audioFile1: null,
            audioFile2: null,
            cvFile: null,
            recommendationFile: null,
          };
        }
        
        // Store the file in the global object
        window.applicationFiles[fileType] = file;
        console.log(`Stored file in window.applicationFiles.${fileType}:`, file.name);
      }
    }
    e.target.value = '';
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <FormLabel className="text-white flex items-center gap-2">
          <Icon className={iconColor} size={16} />
          <span>{label}</span>
          {required && <span className="text-rose-400">*</span>}
        </FormLabel>
        <span className="text-xs text-slate-400">
          {acceptedFormats}
        </span>
      </div>
      <p className="text-sm text-slate-300 mb-4">{description}</p>
      
      <motion.div 
        className="relative group"
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
      >
        <Input 
          type="file" 
          accept={acceptedFormats}
          className={`file:mr-5 file:py-1 file:px-3 file:border-0 file:text-sm file:font-medium file:bg-violet-600 file:text-white hover:file:cursor-pointer hover:file:bg-violet-500 file:rounded
            ${uploadState.status !== 'idle' ? 'opacity-60 pointer-events-none' : ''}
          `}
          disabled={uploadState.status !== 'idle'}
          onChange={handleFileChange}
        />
        <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-fuchsia-500/5 to-violet-500/5 transition-opacity"></div>
      </motion.div>
      
      <UploadStatus 
        uploadState={uploadState}
        onRemove={reset}
      />
    </div>
  );
};
