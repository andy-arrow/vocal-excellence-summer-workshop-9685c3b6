
import React, { useState, useRef } from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { LucideIcon, Check, X, Upload, Loader2, FileTextIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadSectionProps {
  label: string;
  description: string;
  icon: LucideIcon;
  fileType: string;
  acceptedFormats: string;
  required?: boolean;
  iconColor?: string;
  updateFile: (file: File | null) => void;
  currentFile: File | null | undefined;
}

type FileStatus = 'idle' | 'ready' | 'error';

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  label,
  description,
  icon: Icon,
  fileType,
  acceptedFormats,
  required = false,
  iconColor = "text-[#1d1d1f]",
  updateFile,
  currentFile
}) => {
  const [status, setStatus] = useState<FileStatus>(currentFile ? 'ready' : 'idle');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    try {
      // Validate file
      const formatPatterns = acceptedFormats.split(',').map(format => format.trim().replace('.', ''));
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
      
      if (!formatPatterns.some(format => fileExtension === format)) {
        setError(`File must be in ${acceptedFormats} format`);
        setStatus('error');
        return;
      }
      
      // Check file size (max 15MB)
      if (file.size > 15 * 1024 * 1024) {
        setError('File must be smaller than 15MB');
        setStatus('error');
        return;
      }
      
      // File is valid
      updateFile(file);
      setStatus('ready');
      setError(null);
      
    } catch (error) {
      console.error(`Error processing file ${file.name}:`, error);
      setError('Error processing file');
      setStatus('error');
    } finally {
      // Reset input to allow selecting the same file again
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleRemoveFile = () => {
    updateFile(null);
    setStatus('idle');
    setError(null);
    
    if (inputRef.current) {
      inputRef.current.value = '';
    }
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
      
      {status === 'idle' ? (
        <motion.div 
          className="relative group"
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
        >
          <Input 
            ref={inputRef}
            type="file" 
            accept={acceptedFormats}
            onChange={handleFileChange}
            className={`
              file:mr-5 file:py-2 file:px-4 
              file:border-0 file:text-sm file:font-medium
              file:bg-[#f5f5f7] file:text-[#1d1d1f] 
              hover:file:bg-[#e6e6e7] file:rounded-lg
              border-[#e6e6e6] hover:border-[#d2d2d7] 
              focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc]
              rounded-xl transition-colors text-sm
            `}
            aria-label={`Upload ${label}`}
          />
        </motion.div>
      ) : status === 'ready' && currentFile ? (
        <div className="bg-[#f2f7f2] border border-[#d1e7dd] p-4 rounded-xl flex items-center gap-3">
          <div className="bg-[#d1e7dd] p-1.5 rounded-full">
            <Check className="w-4 h-4 text-[#0f5132]" />
          </div>
          <div className="flex-grow">
            <p className="text-sm font-medium text-[#0f5132]">File ready for submission</p>
            <p className="text-xs text-[#486958] mt-1 flex items-center gap-1.5">
              <FileTextIcon className="w-3.5 h-3.5" />
              {currentFile.name} ({Math.round(currentFile.size / 1024)} KB)
            </p>
          </div>
          <Button 
            onClick={handleRemoveFile}
            variant="ghost" 
            size="sm"
            className="text-[#0f5132] hover:text-[#0a3622] hover:bg-[#d1e7dd]/50"
          >
            Remove
          </Button>
        </div>
      ) : status === 'error' ? (
        <div className="bg-[#fff5f5] border border-[#f8d7da] p-4 rounded-xl flex items-center gap-3">
          <div className="bg-[#f8d7da] p-1.5 rounded-full">
            <X className="w-4 h-4 text-[#842029]" />
          </div>
          <div className="flex-grow">
            <p className="text-sm font-medium text-[#842029]">Upload failed</p>
            <p className="text-xs text-[#842029]/80 mt-1">{error || 'Error uploading file'}</p>
          </div>
          <Button 
            onClick={handleRemoveFile}
            variant="ghost" 
            size="sm"
            className="text-[#842029] hover:text-[#5c1620] hover:bg-[#f8d7da]/50"
          >
            Try Again
          </Button>
        </div>
      ) : null}
    </div>
  );
};
