
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
  iconColor = "text-[#1d1d1f]"
}) => {
  const { uploadState, handleFileUpload, reset } = useFileUpload(fileType);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`FileUploadSection: Processing file ${file.name} of type ${file.type} and size ${file.size} bytes`);
      await handleFileUpload(file);
      
      // Ensure window.applicationFiles exists
      if (typeof window !== 'undefined') {
        window.applicationFiles = window.applicationFiles || {};
        console.log(`FileUploadSection: Stored file ${fileType} in window.applicationFiles`, 
          file.name, file.size, file.type);
      }
    }
    // Reset the input value to allow uploading the same file again if needed
    e.target.value = '';
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <FormLabel className="text-[#1d1d1f] flex items-center gap-2">
          <Icon className={iconColor} size={16} />
          <span>{label}</span>
          {required && <span className="text-[#bf4800]">*</span>}
        </FormLabel>
        <span className="text-xs text-[#86868b]">
          {acceptedFormats}
        </span>
      </div>
      <p className="text-sm text-[#86868b] mb-4">{description}</p>
      
      <motion.div 
        className="relative group"
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
      >
        <Input 
          type="file" 
          accept={acceptedFormats}
          className={`file:mr-5 file:py-1 file:px-3 file:border-0 file:text-sm file:font-medium
            file:bg-[#f5f5f7] file:text-[#1d1d1f] hover:file:bg-[#e6e6e7] file:rounded-lg
            border-[#e6e6e6] hover:border-[#d2d2d7] rounded-xl transition-colors
            ${uploadState.status !== 'idle' ? 'opacity-60 pointer-events-none' : ''}
          `}
          disabled={uploadState.status !== 'idle'}
          onChange={handleFileChange}
        />
      </motion.div>
      
      <UploadStatus 
        uploadState={uploadState}
        onRemove={reset}
      />
    </div>
  );
};
