
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

  if (uploadState.status === 'uploading') {
    return (
      <motion.div 
        className="mt-2 bg-slate-800 rounded-md p-3 flex items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex-1 mr-3">
          <div className="flex justify-between text-xs text-slate-300 mb-1">
            <span className="truncate max-w-[150px]">{uploadState.fileName}</span>
            <span>{Math.round(uploadState.progress)}%</span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-500 rounded-full"
              animate={{ width: `${uploadState.progress}%` }}
            />
          </div>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Upload size={16} className="text-indigo-400" />
        </motion.div>
      </motion.div>
    );
  }

  if (uploadState.status === 'success') {
    return (
      <motion.div 
        className="mt-2 bg-green-900/20 border border-green-800/30 rounded-md p-3 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center">
          <CheckCircle size={16} className="text-green-500 mr-2" />
          <span className="text-sm text-green-300 truncate max-w-[200px]">{uploadState.fileName}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0 text-slate-400 hover:text-slate-300"
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
        className="mt-2 bg-rose-900/20 border border-rose-800/30 rounded-md p-3 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center">
          <AlertCircle size={16} className="text-rose-500 mr-2" />
          <span className="text-sm text-rose-300">Upload failed. Please try again.</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0 text-slate-400 hover:text-slate-300"
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
