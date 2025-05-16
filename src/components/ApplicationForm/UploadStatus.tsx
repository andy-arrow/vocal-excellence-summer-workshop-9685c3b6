
import React from 'react';
import { Check, XCircle, Loader2, FileTextIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadState } from '@/hooks/useFileUpload';

interface UploadStatusProps {
  uploadState: UploadState;
  onRemove: () => void;
}

export const UploadStatus: React.FC<UploadStatusProps> = ({ uploadState, onRemove }) => {
  if (uploadState.status === 'idle') {
    return null;
  }

  return (
    <div className="mt-4">
      {uploadState.status === 'uploading' && (
        <div className="bg-[#f5f5f7] p-4 rounded-xl flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-[#0066cc] animate-spin" />
          <div className="flex-grow">
            <p className="text-sm font-medium text-[#1d1d1f]">Preparing {uploadState.file?.name}</p>
            <div className="w-full bg-[#e6e6e6] h-1.5 rounded-full mt-2">
              <div 
                className="h-full bg-[#0066cc] rounded-full transition-all duration-300" 
                style={{ width: `${uploadState.progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
      
      {uploadState.status === 'success' && (
        <div className="bg-[#f2f7f2] border border-[#d1e7dd] p-4 rounded-xl flex items-center gap-3">
          <div className="bg-[#d1e7dd] p-1.5 rounded-full">
            <Check className="w-4 h-4 text-[#0f5132]" />
          </div>
          <div className="flex-grow">
            <p className="text-sm font-medium text-[#0f5132]">File ready for submission</p>
            <p className="text-xs text-[#486958] mt-1 flex items-center gap-1.5">
              <FileTextIcon className="w-3.5 h-3.5" />
              {uploadState.file?.name} ({Math.round(uploadState.file?.size / 1024)} KB)
            </p>
          </div>
          <Button 
            onClick={onRemove}
            variant="ghost" 
            size="sm"
            className="text-[#0f5132] hover:text-[#0a3622] hover:bg-[#d1e7dd]/50"
          >
            Remove
          </Button>
        </div>
      )}
      
      {uploadState.status === 'error' && (
        <div className="bg-[#fff5f5] border border-[#f8d7da] p-4 rounded-xl flex items-center gap-3">
          <XCircle className="w-5 h-5 text-[#842029]" />
          <div className="flex-grow">
            <p className="text-sm font-medium text-[#842029]">Upload failed</p>
            <p className="text-xs text-[#842029]/80 mt-1">{uploadState.error}</p>
          </div>
          <Button 
            onClick={onRemove}
            variant="ghost" 
            size="sm"
            className="text-[#842029] hover:text-[#5c1620] hover:bg-[#f8d7da]/50"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};
