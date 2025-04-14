
import React from 'react';
import { FileMusic, FileText, AlertCircle } from 'lucide-react';
import { FileUploadSection } from './FileUploadSection';

const SupportingMaterialsSection = () => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-violet-500/10 rounded-xl p-6 md:p-8">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <FileText className="text-indigo-400" size={18} />
        <span>Supporting Materials</span>
      </h3>
      
      <div className="space-y-8">
        <div>
          <FileUploadSection
            label="Performance Recording 1"
            description="Upload your first contrasting piece that demonstrates your vocal range and technical proficiency (5 minutes max)."
            icon={FileMusic}
            fileType="recording1"
            acceptedFormats=".mp3,.wav,.mp4"
            required
            iconColor="text-fuchsia-400"
          />
        </div>
        
        <div>
          <FileUploadSection
            label="Performance Recording 2"
            description="Upload your second contrasting piece that demonstrates your vocal range and technical proficiency (5 minutes max)."
            icon={FileMusic}
            fileType="recording2"
            acceptedFormats=".mp3,.wav,.mp4"
            required
            iconColor="text-fuchsia-400"
          />
        </div>
        
        <div>
          <FileUploadSection
            label="Curriculum Vitae/Resume"
            description="Upload your CV highlighting your performance history, education, and vocal training."
            icon={FileText}
            fileType="cv"
            acceptedFormats=".pdf"
            required
            iconColor="text-violet-400"
          />
        </div>
        
        <div>
          <FileUploadSection
            label="Recommendation Letter 1"
            description="Upload a letter from a vocal teacher or music professional who can speak to your abilities."
            icon={FileText}
            fileType="recommendation1"
            acceptedFormats=".pdf"
            required
            iconColor="text-indigo-400"
          />
        </div>
        
        <div>
          <FileUploadSection
            label="Recommendation Letter 2"
            description="Upload a second letter from a vocal teacher or music professional."
            icon={FileText}
            fileType="recommendation2"
            acceptedFormats=".pdf"
            required
            iconColor="text-indigo-400"
          />
        </div>
        
        <div>
          <FileUploadSection
            label="Headshot"
            description="Professional headshot for our records. This may be used in program materials if you are selected."
            icon={FileText}
            fileType="headshot"
            acceptedFormats=".jpg,.jpeg,.png"
            iconColor="text-purple-400"
          />
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
