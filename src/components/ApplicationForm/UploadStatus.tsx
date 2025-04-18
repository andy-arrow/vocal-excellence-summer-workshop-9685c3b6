
import React from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadState } from '@/hooks/useFileUpload';

interface UploadStatusProps {
  uploadState: UploadState;
  onRemove: () => void;
}

export const UploadStatus: React.FC<UploadStatusProps> = ({ uploadState, onRemove }) => {
  if (uploadState.status === 'idle') return null;

  const fileName = uploadState.file?.name || 'File';

  if (uploadState.status === 'uploading') {
    return (
      <motion.div 
        className="mt-2 bg-gray-100 rounded-xl p-3 flex items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex-1 mr-3">
          <div className="flex justify-between text-xs text-gray-800 font-medium mb-1">
            <span className="truncate max-w-[150px]">{fileName}</span>
            <span>{Math.round(uploadState.progress)}%</span>
          </div>
          <div className="h-1.5 bg-gray-300 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-700 rounded-full"
              animate={{ width: `${uploadState.progress}%` }}
            />
          </div>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Upload size={16} className="text-blue-700" />
        </motion.div>
      </motion.div>
    );
  }

  if (uploadState.status === 'success') {
    return (
      <motion.div 
        className="mt-2 bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center">
          <CheckCircle size={16} className="text-green-700 mr-2" />
          <span className="text-sm text-gray-900 font-medium truncate max-w-[200px]">{fileName}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0 text-gray-700 hover:text-gray-900"
          onClick={onRemove}
        >
          <X size={14} />
          <span className="sr-only">Remove file</span>
        </Button>
      </motion.div>
    );
  }

  if (uploadState.status === 'error') {
    return (
      <motion.div 
        className="mt-2 bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center">
          <AlertCircle size={16} className="text-red-700 mr-2" />
          <span className="text-sm text-gray-900 font-medium">Upload failed. Please try again.</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0 text-gray-700 hover:text-gray-900"
          onClick={onRemove}
        >
          <X size={14} />
          <span className="sr-only">Dismiss</span>
        </Button>
      </motion.div>
    );
  }

  return null;
};
