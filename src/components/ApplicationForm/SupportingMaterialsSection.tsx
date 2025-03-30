
import React, { useState } from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const SupportingMaterialsSection = () => {
  const [uploading, setUploading] = useState({
    recording1: false,
    recording2: false,
    cv: false,
    recommendation1: false,
    recommendation2: false,
    headshot: false
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof typeof uploading) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: `Maximum file size is 2MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
        variant: "destructive"
      });
      // Reset the input
      e.target.value = '';
      return;
    }

    // In production, you would upload the file to your server or storage service here
    setUploading(prev => ({ ...prev, [fileType]: true }));
    
    // Simulate upload delay
    setTimeout(() => {
      setUploading(prev => ({ ...prev, [fileType]: false }));
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`
      });
    }, 1000);
  };

  return (
    <div className="bg-apple-gray-light/20 p-8 rounded-xl">
      <h3 className="text-xl font-semibold text-apple-dark mb-6">Supporting Materials Upload</h3>
      
      <div className="space-y-6">
        <div>
          <FormLabel className="block mb-2">Repertoire Recordings <span className="text-red-500">*</span></FormLabel>
          <p className="text-sm text-apple-dark/70 mb-3">
            Upload two contrasting pieces that demonstrate your vocal range and technical proficiency (5 minutes max each) in MP3 or WAV format.
          </p>
          <div className="mb-3">
            <Input 
              type="file" 
              accept=".mp3,.wav" 
              className="mb-3" 
              disabled={uploading.recording1}
              onChange={(e) => handleFileChange(e, 'recording1')}
            />
            {uploading.recording1 && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
          </div>
          <div>
            <Input 
              type="file" 
              accept=".mp3,.wav" 
              disabled={uploading.recording2}
              onChange={(e) => handleFileChange(e, 'recording2')}
            />
            {uploading.recording2 && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
          </div>
        </div>
        
        <div>
          <FormLabel className="block mb-2">Curriculum Vitae/Resume <span className="text-red-500">*</span></FormLabel>
          <p className="text-sm text-apple-dark/70 mb-3">
            Upload your CV highlighting your performance history, education, and vocal training (PDF format, max 2MB).
          </p>
          <Input 
            type="file" 
            accept=".pdf" 
            disabled={uploading.cv}
            onChange={(e) => handleFileChange(e, 'cv')}
          />
          {uploading.cv && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
        </div>
        
        <div>
          <FormLabel className="block mb-2">Recommendation Letters <span className="text-red-500">*</span></FormLabel>
          <p className="text-sm text-apple-dark/70 mb-3">
            Upload two letters from vocal teachers or music professionals who can speak to your abilities and potential (PDF format, max 2MB each).
            If your recommender prefers to send directly, they can email it to info@veasummer.com
          </p>
          <div className="mb-3">
            <Input 
              type="file" 
              accept=".pdf" 
              className="mb-3" 
              disabled={uploading.recommendation1}
              onChange={(e) => handleFileChange(e, 'recommendation1')}
            />
            {uploading.recommendation1 && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
          </div>
          <div>
            <Input 
              type="file" 
              accept=".pdf" 
              disabled={uploading.recommendation2}
              onChange={(e) => handleFileChange(e, 'recommendation2')}
            />
            {uploading.recommendation2 && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
          </div>
        </div>
        
        <div>
          <FormLabel className="block mb-2">Headshot (Optional)</FormLabel>
          <p className="text-sm text-apple-dark/70 mb-3">
            Professional headshot for our records (JPEG or PNG format, max 2MB).
          </p>
          <Input 
            type="file" 
            accept=".jpg,.jpeg,.png" 
            disabled={uploading.headshot}
            onChange={(e) => handleFileChange(e, 'headshot')}
          />
          {uploading.headshot && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
        </div>
      </div>
    </div>
  );
};

export default SupportingMaterialsSection;
