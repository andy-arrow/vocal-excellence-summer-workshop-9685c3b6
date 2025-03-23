
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const SupportingMaterialsSection = () => {
  return (
    <div className="bg-apple-gray-light/20 p-8 rounded-xl">
      <h3 className="text-xl font-semibold text-apple-dark mb-6">Supporting Materials Upload</h3>
      
      <div className="space-y-6">
        <div>
          <FormLabel className="block mb-2">Repertoire Recordings</FormLabel>
          <p className="text-sm text-apple-dark/70 mb-3">
            Upload two contrasting pieces that demonstrate your vocal range and technical proficiency (5 minutes max each) in MP3 or WAV format.
          </p>
          <Input type="file" accept=".mp3,.wav" className="mb-3" />
          <Input type="file" accept=".mp3,.wav" />
        </div>
        
        <div>
          <FormLabel className="block mb-2">Curriculum Vitae/Resume</FormLabel>
          <p className="text-sm text-apple-dark/70 mb-3">
            Upload your CV highlighting your performance history, education, and vocal training (PDF format, max 2MB).
          </p>
          <Input type="file" accept=".pdf" />
        </div>
        
        <div>
          <FormLabel className="block mb-2">Recommendation Letters</FormLabel>
          <p className="text-sm text-apple-dark/70 mb-3">
            Upload two letters from vocal teachers or music professionals who can speak to your abilities and potential (PDF format, max 2MB each).
          </p>
          <Input type="file" accept=".pdf" className="mb-3" />
          <Input type="file" accept=".pdf" />
        </div>
        
        <div>
          <FormLabel className="block mb-2">Headshot (Optional)</FormLabel>
          <p className="text-sm text-apple-dark/70 mb-3">
            Professional headshot for our records (JPEG or PNG format, max 2MB).
          </p>
          <Input type="file" accept=".jpg,.jpeg,.png" />
        </div>
      </div>
    </div>
  );
};

export default SupportingMaterialsSection;
