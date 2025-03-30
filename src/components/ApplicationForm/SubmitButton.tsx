
import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  return (
    <div className="flex justify-center pt-4">
      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`px-8 py-3 border border-gray-800 text-gray-800 rounded-none text-sm font-light tracking-wider uppercase hover:bg-gray-800 hover:text-white transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </div>
  );
};

export default SubmitButton;
