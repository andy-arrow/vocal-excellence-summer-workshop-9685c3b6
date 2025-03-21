
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const SupportingMaterialsSection = () => {
  return (
    <div className="bg-apple-gray-light/20 p-8 rounded-xl">
      <h3 className="text-xl font-semibold text-apple-dark mb-6">Supporting Materials Upload</h3>
      
      <div className="space-y-6">
        <div>
          <FormLabel className="block mb-2">Audition Recordings</FormLabel>
          <p className="text-sm text-apple-dark/70 mb-3">
            Upload two contrasting pieces (3-5 minutes each) in MP3 or WAV format.
          </p>
          <Input type="file" accept=".mp3,.wav" className="mb-3" />
          <Input type="file" accept=".mp3,.wav" />
        </div>
        
        <div>
          <FormLabel className="block mb-2">Musical CV/Resume</FormLabel>
          <p className="text-sm text-apple-dark/70 mb-3">
            Upload in PDF format (max 2MB).
          </p>
          <Input type="file" accept=".pdf" />
        </div>
        
        <div>
          <FormLabel className="block mb-2">Recommendation Letter</FormLabel>
          <p className="text-sm text-apple-dark/70 mb-3">
            Upload in PDF format (max 2MB). If your recommender prefers to send directly, they can email it to admissions@vocalexcellence.com
          </p>
          <Input type="file" accept=".pdf" />
        </div>
      </div>
    </div>
  );
};

export default SupportingMaterialsSection;
