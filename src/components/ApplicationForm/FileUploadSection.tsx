
import { useState, useRef, useEffect } from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, Check, X, FileText, Music, AlertCircle } from 'lucide-react';
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

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const truncateFilename = (name: string, maxLength: number = 35): string => {
  if (name.length <= maxLength) return name;
  const extension = name.split('.').pop() || '';
  const baseName = name.slice(0, name.length - extension.length - 1);
  const truncatedBase = baseName.slice(0, maxLength - extension.length - 4);
  return `${truncatedBase}...${extension}`;
};

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

  useEffect(() => {
    if (currentFile && status !== 'ready') {
      setStatus('ready');
      setError(null);
    } else if (!currentFile && status === 'ready') {
      setStatus('idle');
    }
  }, [currentFile, status]);

  const isAudioFile = acceptedFormats.includes('mp3') || acceptedFormats.includes('wav');
  const FileTypeIcon = isAudioFile ? Music : FileText;

  const validateAndUploadFile = (file: File) => {
    try {
      const formatPatterns = acceptedFormats.split(',').map(format => format.trim().replace('.', ''));
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
      
      if (!formatPatterns.some(format => fileExtension === format)) {
        setError(`Please upload a ${acceptedFormats} file`);
        setStatus('error');
        return;
      }
      
      if (file.size > 15 * 1024 * 1024) {
        setError('File size must be under 15 MB');
        setStatus('error');
        return;
      }
      
      updateFile(file);
      setStatus('ready');
      setError(null);
      
    } catch (err) {
      console.error(`Error processing file ${file.name}:`, err);
      setError('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    validateAndUploadFile(file);
    
    if (inputRef.current) {
      inputRef.current.value = '';
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndUploadFile(file);
    }
  };

  return (
    <div className="mb-5 sm:mb-6 last:mb-0">
      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
        <FormLabel className="text-[#1d1d1f] text-sm sm:text-base flex items-center gap-1.5 sm:gap-2 font-medium">
          <Icon className={`${iconColor} w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0`} />
          <span>{label}</span>
          {required && <span className="text-[#bf4800] ml-1">*</span>}
        </FormLabel>
        <span className="text-[10px] sm:text-xs text-[#86868b] font-medium bg-[#f5f5f7] px-1.5 sm:px-2 py-0.5 rounded">
          {acceptedFormats}
        </span>
      </div>
      
      <p className="text-xs sm:text-sm text-[#86868b] mb-2.5 sm:mb-3 leading-relaxed">
        {description}
      </p>
      
      <AnimatePresence mode="wait">
        {status === 'idle' ? (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="relative"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <label 
              htmlFor={`file-${label.replace(/\s+/g, '-').toLowerCase()}`}
              className="
                flex flex-col items-center justify-center
                border-2 border-dashed border-[#d2d2d7] 
                rounded-lg sm:rounded-xl p-4 sm:p-6 cursor-pointer
                hover:border-[#0066cc] hover:bg-[#f5f5f7]/50
                transition-all duration-200 ease-out
                group
              "
              data-testid={`upload-area-${label.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="
                  w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5f5f7] 
                  flex items-center justify-center flex-shrink-0
                  group-hover:bg-[#e8f0fe] group-hover:text-[#0066cc]
                  transition-colors duration-200
                ">
                  <FileTypeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#86868b] group-hover:text-[#0066cc]" />
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-medium text-[#1d1d1f]">
                    Choose file or drag here
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#86868b] mt-0.5">
                    Max size: 15 MB
                  </p>
                </div>
              </div>
              <Input 
                id={`file-${label.replace(/\s+/g, '-').toLowerCase()}`}
                ref={inputRef}
                type="file" 
                accept={acceptedFormats}
                onChange={handleFileChange}
                className="sr-only"
                aria-label={`Upload ${label}`}
                data-testid={`input-file-${label.replace(/\s+/g, '-').toLowerCase()}`}
              />
            </label>
          </motion.div>
        ) : status === 'ready' && currentFile ? (
          <motion.div 
            key="ready"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
            className="
              bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5]
              border border-[#86efac] 
              p-3 sm:p-4 rounded-lg sm:rounded-xl 
              flex items-center gap-2.5 sm:gap-3
              shadow-sm
            "
            data-testid={`file-ready-${label.replace(/\s+/g, '-').toLowerCase()}`}
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#22c55e] flex items-center justify-center shadow-sm">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-[#166534] truncate" title={currentFile.name}>
                {truncateFilename(currentFile.name, 25)}
              </p>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 flex-wrap">
                <span className="text-[10px] sm:text-xs text-[#16a34a] font-medium">
                  {formatFileSize(currentFile.size)}
                </span>
                <span className="text-[#86efac] hidden sm:inline">|</span>
                <span className="text-[10px] sm:text-xs text-[#16a34a] flex items-center gap-1">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  Ready
                </span>
              </div>
            </div>
            <Button 
              onClick={handleRemoveFile}
              variant="ghost" 
              size="sm"
              className="flex-shrink-0 text-[#166534] hover:text-[#14532d] hover:bg-[#dcfce7] font-medium text-xs sm:text-sm px-2 sm:px-3"
              data-testid={`button-remove-${label.replace(/\s+/g, '-').toLowerCase()}`}
            >
              Remove
            </Button>
          </motion.div>
        ) : status === 'error' ? (
          <motion.div 
            key="error"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="
              bg-gradient-to-r from-[#fef2f2] to-[#fff1f2]
              border border-[#fca5a5] 
              p-3 sm:p-4 rounded-lg sm:rounded-xl 
              flex items-center gap-2.5 sm:gap-3
            "
            data-testid={`file-error-${label.replace(/\s+/g, '-').toLowerCase()}`}
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#ef4444] flex items-center justify-center">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-[#991b1b]">Upload failed</p>
              <p className="text-[10px] sm:text-xs text-[#b91c1c] mt-0.5 truncate">{error || 'Something went wrong'}</p>
            </div>
            <Button 
              onClick={handleRemoveFile}
              variant="ghost" 
              size="sm"
              className="flex-shrink-0 text-[#991b1b] hover:text-[#7f1d1d] hover:bg-[#fee2e2] font-medium text-xs sm:text-sm px-2 sm:px-3"
              data-testid={`button-retry-${label.replace(/\s+/g, '-').toLowerCase()}`}
            >
              Retry
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
