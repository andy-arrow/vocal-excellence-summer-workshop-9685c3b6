
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FilePlus2, X, Check, Music, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import UploadStatus from './UploadStatus';

const acceptedAudioTypes = ".mp3,.wav,.m4a";
const acceptedDocTypes = ".pdf,.doc,.docx";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const SupportingMaterialsSection = () => {
  const { control } = useFormContext();
  
  const [files, setFiles] = useState({
    audioFile1: null,
    audioFile2: null,
    cvFile: null,
    recommendationFile: null
  });
  
  const [errors, setErrors] = useState({
    audioFile1: '',
    audioFile2: '',
    cvFile: '',
    recommendationFile: ''
  });
  
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    let errorMessage = '';
    
    if (file) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        errorMessage = `File size exceeds 10MB limit.`;
        setErrors(prev => ({...prev, [fileType]: errorMessage}));
        return;
      }
      
      // Validate file type
      const isAudioFile = fileType.includes('audio');
      const fileExtension = file.name.split('.').pop().toLowerCase();
      
      if (isAudioFile && !acceptedAudioTypes.includes(`.${fileExtension}`)) {
        errorMessage = `Please upload an MP3, WAV, or M4A file.`;
        setErrors(prev => ({...prev, [fileType]: errorMessage}));
        return;
      }
      
      if (!isAudioFile && !acceptedDocTypes.includes(`.${fileExtension}`)) {
        errorMessage = `Please upload a PDF, DOC, or DOCX file.`;
        setErrors(prev => ({...prev, [fileType]: errorMessage}));
        return;
      }
      
      // Clear any previous errors
      setErrors(prev => ({...prev, [fileType]: ''}));
      
      // Update the file state
      setFiles(prev => ({...prev, [fileType]: file}));
    }
  };
  
  const removeFile = (fileType) => {
    setFiles(prev => ({...prev, [fileType]: null}));
    setErrors(prev => ({...prev, [fileType]: ''}));
  };
  
  const getFileSizeText = (size) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1048576) return `${(size / 1024).toFixed(1)} KB`;
    else return `${(size / 1048576).toFixed(1)} MB`;
  };
  
  // Expose files to the parent component
  React.useEffect(() => {
    window.applicationFiles = files;
  }, [files]);
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold text-white mb-4">Supporting Materials</h3>
        <p className="text-violet-200 mb-6">
          Please upload the required materials to complete your application. Acceptable formats include MP3/WAV for audio and PDF for documents.
        </p>
      </motion.div>
      
      <motion.div variants={itemVariants} className="space-y-6">
        <div>
          <FormLabel className="block mb-2 text-violet-200">Audition Recordings</FormLabel>
          <p className="text-sm text-violet-300 mb-3">
            Upload two contrasting pieces (3-5 minutes each) in MP3 or WAV format.
          </p>
          
          <div className="space-y-4">
            {!files.audioFile1 ? (
              <div className="relative">
                <label htmlFor="audioFile1" className="flex items-center justify-center w-full h-24 border-2 border-dashed border-violet-400/30 rounded-lg hover:border-violet-400/50 hover:bg-violet-900/30 transition-all cursor-pointer group">
                  <div className="flex flex-col items-center space-y-2">
                    <Music className="w-6 h-6 text-violet-400 group-hover:text-violet-300" />
                    <span className="text-sm text-violet-300 group-hover:text-violet-200">Upload first piece</span>
                  </div>
                </label>
                <input 
                  id="audioFile1" 
                  type="file" 
                  accept={acceptedAudioTypes}
                  className="hidden" 
                  onChange={(e) => handleFileChange(e, 'audioFile1')}
                />
                {errors.audioFile1 && <p className="text-red-400 text-sm mt-1">{errors.audioFile1}</p>}
              </div>
            ) : (
              <UploadStatus 
                filename={files.audioFile1.name}
                filesize={getFileSizeText(files.audioFile1.size)}
                onRemove={() => removeFile('audioFile1')}
                icon={<Music className="w-4 h-4" />}
              />
            )}
            
            {!files.audioFile2 ? (
              <div className="relative">
                <label htmlFor="audioFile2" className="flex items-center justify-center w-full h-24 border-2 border-dashed border-violet-400/30 rounded-lg hover:border-violet-400/50 hover:bg-violet-900/30 transition-all cursor-pointer group">
                  <div className="flex flex-col items-center space-y-2">
                    <Music className="w-6 h-6 text-violet-400 group-hover:text-violet-300" />
                    <span className="text-sm text-violet-300 group-hover:text-violet-200">Upload second piece</span>
                  </div>
                </label>
                <input 
                  id="audioFile2" 
                  type="file" 
                  accept={acceptedAudioTypes}
                  className="hidden" 
                  onChange={(e) => handleFileChange(e, 'audioFile2')}
                />
                {errors.audioFile2 && <p className="text-red-400 text-sm mt-1">{errors.audioFile2}</p>}
              </div>
            ) : (
              <UploadStatus 
                filename={files.audioFile2.name}
                filesize={getFileSizeText(files.audioFile2.size)}
                onRemove={() => removeFile('audioFile2')}
                icon={<Music className="w-4 h-4" />}
              />
            )}
          </div>
        </div>
        
        <div>
          <FormLabel className="block mb-2 text-violet-200">Musical CV/Resume</FormLabel>
          <p className="text-sm text-violet-300 mb-3">
            Upload in PDF format (max 10MB).
          </p>
          
          {!files.cvFile ? (
            <div className="relative">
              <label htmlFor="cvFile" className="flex items-center justify-center w-full h-24 border-2 border-dashed border-violet-400/30 rounded-lg hover:border-violet-400/50 hover:bg-violet-900/30 transition-all cursor-pointer group">
                <div className="flex flex-col items-center space-y-2">
                  <FileText className="w-6 h-6 text-violet-400 group-hover:text-violet-300" />
                  <span className="text-sm text-violet-300 group-hover:text-violet-200">Upload your CV</span>
                </div>
              </label>
              <input 
                id="cvFile" 
                type="file" 
                accept={acceptedDocTypes}
                className="hidden" 
                onChange={(e) => handleFileChange(e, 'cvFile')}
              />
              {errors.cvFile && <p className="text-red-400 text-sm mt-1">{errors.cvFile}</p>}
            </div>
          ) : (
            <UploadStatus 
              filename={files.cvFile.name}
              filesize={getFileSizeText(files.cvFile.size)}
              onRemove={() => removeFile('cvFile')}
              icon={<FileText className="w-4 h-4" />}
            />
          )}
        </div>
        
        <div>
          <FormLabel className="block mb-2 text-violet-200">Recommendation Letter</FormLabel>
          <p className="text-sm text-violet-300 mb-3">
            Upload in PDF format (max 10MB). If your recommender prefers to send directly, they can email it to info@vocalexcellence.org
          </p>
          
          {!files.recommendationFile ? (
            <div className="relative">
              <label htmlFor="recommendationFile" className="flex items-center justify-center w-full h-24 border-2 border-dashed border-violet-400/30 rounded-lg hover:border-violet-400/50 hover:bg-violet-900/30 transition-all cursor-pointer group">
                <div className="flex flex-col items-center space-y-2">
                  <FileText className="w-6 h-6 text-violet-400 group-hover:text-violet-300" />
                  <span className="text-sm text-violet-300 group-hover:text-violet-200">Upload recommendation letter</span>
                </div>
              </label>
              <input 
                id="recommendationFile" 
                type="file" 
                accept={acceptedDocTypes}
                className="hidden" 
                onChange={(e) => handleFileChange(e, 'recommendationFile')}
              />
              {errors.recommendationFile && <p className="text-red-400 text-sm mt-1">{errors.recommendationFile}</p>}
            </div>
          ) : (
            <UploadStatus 
              filename={files.recommendationFile.name}
              filesize={getFileSizeText(files.recommendationFile.size)}
              onRemove={() => removeFile('recommendationFile')}
              icon={<FileText className="w-4 h-4" />}
            />
          )}
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="pt-2">
        <p className="text-sm text-violet-300 italic">
          Your files will be securely uploaded when you submit the application. No need to upload them separately.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SupportingMaterialsSection;
