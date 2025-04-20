
import React, { useState } from 'react';

const ImageTest = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imagePath = '/lovable-uploads/07191bfc-9a89-4851-b4f3-1e146e44ae27.png';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Image Test Component</h2>
      
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <p className="font-mono text-sm break-all mb-2">Image path: {imagePath}</p>
        <p className="text-sm">Status: {isLoaded ? "Loaded ✅" : hasError ? "Error ❌" : "Loading..."}</p>
      </div>
      
      <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg mb-6">
        <img 
          src={imagePath}
          alt="Test image" 
          className="max-w-full h-auto"
          style={{ display: isLoaded ? 'block' : 'none' }}
          onLoad={() => {
            console.log('Image loaded successfully in test component');
            setIsLoaded(true);
          }}
          onError={(e) => {
            console.error('Failed to load image in test component:', e);
            setHasError(true);
          }}
        />
        {!isLoaded && !hasError && (
          <div className="h-60 w-full flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-gray-900 border-t-transparent rounded-full"></div>
          </div>
        )}
        {hasError && (
          <div className="h-60 w-full flex items-center justify-center bg-red-50">
            <p className="text-red-500">Failed to load image. Check console for details.</p>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold mb-2">As Background Test:</h3>
        <div 
          className="h-60 w-full rounded-lg bg-cover bg-center bg-no-repeat border border-gray-300"
          style={{ backgroundImage: `url('${imagePath}')` }}
        ></div>
      </div>
    </div>
  );
};

export default ImageTest;
