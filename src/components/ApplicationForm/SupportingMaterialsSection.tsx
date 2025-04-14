import React, { useState, useCallback } from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { FileMusic, FileText, CheckCircle, Upload, AlertCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { uploadFile } from '@/utils/fileUpload';
import { supabase } from "@/integrations/supabase/client";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB for videos/PDFs

interface FileUploadState {
  status: 'idle' | 'uploading' | 'success' | 'error';
  fileName: string;
  progress: number;
  path?: string;
}

const SupportingMaterialsSection = () => {
  const [fileUploads, setFileUploads] = useState({
    recording1: { status: 'idle', fileName: '', progress: 0 } as FileUploadState,
    recording2: { status: 'idle', fileName: '', progress: 0 } as FileUploadState,
    cv: { status: 'idle', fileName: '', progress: 0 } as FileUploadState,
    recommendation1: { status: 'idle', fileName: '', progress: 0 } as FileUploadState,
    recommendation2: { status: 'idle', fileName: '', progress: 0 } as FileUploadState,
    headshot: { status: 'idle', fileName: '', progress: 0 } as FileUploadState
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof typeof fileUploads) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: `Maximum file size is 10MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
        variant: "destructive"
      });
      e.target.value = '';
      return;
    }

    // Update upload state to show progress
    setFileUploads(prev => ({
      ...prev,
      [fileType]: {
        status: 'uploading',
        fileName: file.name,
        progress: 0
      }
    }));

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Upload the file
      const { path, error } = await uploadFile(file, user.id, fileType);
      
      if (error) throw error;

      // Update state to show success
      setFileUploads(prev => ({
        ...prev,
        [fileType]: {
          status: 'success',
          fileName: file.name,
          progress: 100,
          path
        }
      }));

      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
        className: "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-700",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      
      // Update state to show error
      setFileUploads(prev => ({
        ...prev,
        [fileType]: {
          status: 'error',
          fileName: file.name,
          progress: 0
        }
      }));

      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive"
      });
    }

    // Reset the input
    e.target.value = '';
  };

  const removeFile = (fileType: keyof typeof fileUploads) => {
    setFileUploads(prev => ({
      ...prev,
      [fileType]: { status: 'idle', fileName: '', progress: 0 }
    }));
  };

  const renderUploadState = (fileType: keyof typeof fileUploads) => {
    const uploadState = fileUploads[fileType];
    
    if (uploadState.status === 'idle') {
      return null;
    }
    
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
            onClick={() => removeFile(fileType)}
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
            onClick={() => removeFile(fileType)}
          >
            <X size={14} />
            <span className="sr-only">Dismiss</span>
          </Button>
        </motion.div>
      );
    }
    
    return null;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-violet-500/10 rounded-xl p-6 md:p-8">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Upload className="text-indigo-400" size={18} />
        <span>Supporting Materials</span>
      </h3>
      
      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <FormLabel className="text-white flex items-center gap-2">
              <FileMusic className="text-fuchsia-400" size={16} />
              <span>Performance Recordings</span>
              <span className="text-rose-400">*</span>
            </FormLabel>
            <span className="text-xs text-slate-400">MP3, WAV, or MP4, max 10MB each</span>
          </div>
          <p className="text-sm text-slate-300 mb-4">
            Upload two contrasting pieces that demonstrate your vocal range and technical proficiency (5 minutes max each).
          </p>
          
          <div className="mb-4">
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
            >
              <Input 
                type="file" 
                accept=".mp3,.wav,.mp4" 
                className={`file:mr-5 file:py-1 file:px-3 file:border-0 file:text-sm file:font-medium file:bg-violet-600 file:text-white hover:file:cursor-pointer hover:file:bg-violet-500 file:rounded
                  ${fileUploads.recording1.status !== 'idle' ? 'opacity-60 pointer-events-none' : ''}
                `}
                disabled={fileUploads.recording1.status !== 'idle'}
                onChange={(e) => handleFileChange(e, 'recording1')}
              />
              <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-fuchsia-500/5 to-violet-500/5 transition-opacity"></div>
            </motion.div>
            {renderUploadState('recording1')}
          </div>
          
          <div className="mb-4">
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
            >
              <Input 
                type="file" 
                accept=".mp3,.wav,.mp4" 
                className={`file:mr-5 file:py-1 file:px-3 file:border-0 file:text-sm file:font-medium file:bg-violet-600 file:text-white hover:file:cursor-pointer hover:file:bg-violet-500 file:rounded
                  ${fileUploads.recording2.status !== 'idle' ? 'opacity-60 pointer-events-none' : ''}
                `}
                disabled={fileUploads.recording2.status !== 'idle'}
                onChange={(e) => handleFileChange(e, 'recording2')}
              />
              <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-fuchsia-500/5 to-violet-500/5 transition-opacity"></div>
            </motion.div>
            {renderUploadState('recording2')}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <FormLabel className="text-white flex items-center gap-2">
              <FileText className="text-violet-400" size={16} />
              <span>Curriculum Vitae/Resume</span>
              <span className="text-rose-400">*</span>
            </FormLabel>
            <span className="text-xs text-slate-400">PDF format, max 10MB</span>
          </div>
          <p className="text-sm text-slate-300 mb-4">
            Upload your CV highlighting your performance history, education, and vocal training.
          </p>
          
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            <Input 
              type="file" 
              accept=".pdf" 
              className={`file:mr-5 file:py-1 file:px-3 file:border-0 file:text-sm file:font-medium file:bg-violet-600 file:text-white hover:file:cursor-pointer hover:file:bg-violet-500 file:rounded
                ${fileUploads.cv.status !== 'idle' ? 'opacity-60 pointer-events-none' : ''}
              `}
              disabled={fileUploads.cv.status !== 'idle'}
              onChange={(e) => handleFileChange(e, 'cv')}
            />
            <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-fuchsia-500/5 to-violet-500/5 transition-opacity"></div>
          </motion.div>
          {renderUploadState('cv')}
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <FormLabel className="text-white flex items-center gap-2">
              <FileText className="text-indigo-400" size={16} />
              <span>Recommendation Letters</span>
              <span className="text-rose-400">*</span>
            </FormLabel>
            <span className="text-xs text-slate-400">PDF format, max 10MB each</span>
          </div>
          <p className="text-sm text-slate-300 mb-4">
            Upload two letters from vocal teachers or music professionals who can speak to your abilities and potential.
            If your recommender prefers to send directly, they can email it to admissions@vocalexcellence.com
          </p>
          
          <div className="mb-4">
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
            >
              <Input 
                type="file" 
                accept=".pdf" 
                className={`file:mr-5 file:py-1 file:px-3 file:border-0 file:text-sm file:font-medium file:bg-violet-600 file:text-white hover:file:cursor-pointer hover:file:bg-violet-500 file:rounded
                  ${fileUploads.recommendation1.status !== 'idle' ? 'opacity-60 pointer-events-none' : ''}
                `}
                disabled={fileUploads.recommendation1.status !== 'idle'}
                onChange={(e) => handleFileChange(e, 'recommendation1')}
              />
              <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-fuchsia-500/5 to-violet-500/5 transition-opacity"></div>
            </motion.div>
            {renderUploadState('recommendation1')}
          </div>
          
          <div>
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
            >
              <Input 
                type="file" 
                accept=".pdf" 
                className={`file:mr-5 file:py-1 file:px-3 file:border-0 file:text-sm file:font-medium file:bg-violet-600 file:text-white hover:file:cursor-pointer hover:file:bg-violet-500 file:rounded
                  ${fileUploads.recommendation2.status !== 'idle' ? 'opacity-60 pointer-events-none' : ''}
                `}
                disabled={fileUploads.recommendation2.status !== 'idle'}
                onChange={(e) => handleFileChange(e, 'recommendation2')}
              />
              <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-fuchsia-500/5 to-violet-500/5 transition-opacity"></div>
            </motion.div>
            {renderUploadState('recommendation2')}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <FormLabel className="text-white flex items-center gap-2">
              <FileText className="text-purple-400" size={16} />
              <span>Headshot</span>
              <span className="text-slate-400 text-xs ml-2">(Optional)</span>
            </FormLabel>
            <span className="text-xs text-slate-400">JPEG or PNG, max 10MB</span>
          </div>
          <p className="text-sm text-slate-300 mb-4">
            Professional headshot for our records. This may be used in program materials if you are selected.
          </p>
          
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            <Input 
              type="file" 
              accept=".jpg,.jpeg,.png" 
              className={`file:mr-5 file:py-1 file:px-3 file:border-0 file:text-sm file:font-medium file:bg-violet-600 file:text-white hover:file:cursor-pointer hover:file:bg-violet-500 file:rounded
                ${fileUploads.headshot.status !== 'idle' ? 'opacity-60 pointer-events-none' : ''}
              `}
              disabled={fileUploads.headshot.status !== 'idle'}
              onChange={(e) => handleFileChange(e, 'headshot')}
            />
            <div className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-fuchsia-500/5 to-violet-500/5 transition-opacity"></div>
          </motion.div>
          {renderUploadState('headshot')}
        </div>
        
        <div className="mt-6 bg-violet-900/20 border border-violet-500/20 rounded-lg p-4 text-sm text-violet-300">
          <div className="flex items-start gap-2">
            <AlertCircle size={16} className="text-violet-400 mt-0.5 flex-shrink-0" />
            <div>
              All materials must be uploaded before submitting your application. If you encounter any issues with file uploads, please contact technical support at <a href="mailto:tech@vocalexcellence.com" className="text-fuchsia-400 hover:underline">tech@vocalexcellence.com</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportingMaterialsSection;
