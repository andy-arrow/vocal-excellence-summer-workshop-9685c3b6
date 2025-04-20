
import React, { useState, useEffect } from 'react';

const ImageTest = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [diagnosticInfo, setDiagnosticInfo] = useState<string[]>([]);
  
  // Use URL encoded path for the image with spaces
  const originalImagePath = '/lovable-uploads/Vocal%20Excellence%20Class%201.jpg';
  
  // Verified working image URL from Unsplash
  const fallbackImageUrl = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80';
  
  // Image we're currently testing
  const [currentImagePath, setCurrentImagePath] = useState(originalImagePath);

  // Add log entry
  const addLog = (message: string) => {
    console.log(`[ImageTest] ${message}`);
    setDiagnosticInfo(prev => [...prev, message]);
  };

  // Test multiple image path formats to help diagnose the issue
  useEffect(() => {
    addLog(`Testing original path: ${originalImagePath}`);
    
    // Test various path formats to determine which works
    const pathsToTest = [
      originalImagePath,
      `/Vocal%20Excellence%20Class%201.jpg`,
      `/lovable-uploads/Vocal%20Excellence%20Class%201.jpg`,
      `Vocal%20Excellence%20Class%201.jpg`
    ];
    
    pathsToTest.forEach(path => {
      const testImg = new Image();
      testImg.onload = () => {
        addLog(`✅ SUCCESS with path: ${path}`);
        addLog(`Image dimensions: ${testImg.width}x${testImg.height}`);
      };
      testImg.onerror = () => {
        addLog(`❌ FAILED with path: ${path}`);
      };
      testImg.src = path;
    });
    
    // Continue with normal image testing
    const testImageLoad = () => {
      addLog(`Testing image load for: ${currentImagePath}`);
      
      const img = new Image();
      
      img.onload = () => {
        addLog(`✅ Image loaded successfully through JavaScript: ${currentImagePath}`);
        addLog(`Image dimensions: ${img.width}x${img.height}`);
        setIsLoaded(true);
        setHasError(false);
      };
      
      img.onerror = (e) => {
        addLog(`❌ Failed to load image through JavaScript: ${currentImagePath}`);
        addLog(`Error details: ${e instanceof Event ? 'Event object (see console)' : String(e)}`);
        setHasError(true);
      };
      
      img.src = currentImagePath;
    };

    setIsLoaded(false);
    setHasError(false);
    testImageLoad();
  }, [currentImagePath]);

  // Check CSS computed styles - helps detect any CSS conflicts
  useEffect(() => {
    setTimeout(() => {
      const backgroundElement = document.getElementById('bg-test-div');
      if (backgroundElement) {
        const styles = window.getComputedStyle(backgroundElement);
        addLog(`Background image computed style: ${styles.backgroundImage}`);
        addLog(`Background size: ${styles.backgroundSize}`);
        addLog(`Element dimensions: ${styles.width} x ${styles.height}`);
        addLog(`Visibility: ${styles.visibility}, Display: ${styles.display}, Opacity: ${styles.opacity}`);
        
        // Check for potential parent issues
        const parent = backgroundElement.parentElement;
        if (parent) {
          const parentStyles = window.getComputedStyle(parent);
          addLog(`Parent overflow: ${parentStyles.overflow}`);
          addLog(`Parent position: ${parentStyles.position}`);
        }
      }
    }, 1000);
  }, [currentImagePath]);

  // Switch between image sources for testing
  const toggleImageSource = () => {
    setCurrentImagePath(current => 
      current === originalImagePath ? fallbackImageUrl : originalImagePath
    );
    addLog(`Switched to ${currentImagePath === originalImagePath ? 'Unsplash image' : 'original image'}`);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 gap-6">
      <h2 className="text-2xl font-bold mb-2">Image Diagnostics</h2>
      
      <div className="w-full max-w-4xl p-4 bg-gray-100 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="font-mono text-sm break-all">Current image: {currentImagePath}</p>
          <button 
            onClick={() => setCurrentImagePath(current => 
              current === originalImagePath ? fallbackImageUrl : originalImagePath
            )}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Try {currentImagePath === originalImagePath ? 'Unsplash Image' : 'Original Image'}
          </button>
        </div>
        <p className="text-sm mb-2">Status: {isLoaded ? "Loaded ✅" : hasError ? "Error ❌" : "Loading..."}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Method 1: Direct IMG tag */}
        <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
          <h3 className="font-bold mb-3">Method 1: Direct IMG Tag</h3>
          <div className="relative h-60 w-full">
            {!isLoaded && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-gray-900 border-t-transparent rounded-full"></div>
              </div>
            )}
            <img 
              src={currentImagePath}
              alt="Test image" 
              className="max-w-full h-auto"
              style={{ display: isLoaded ? 'block' : 'none' }}
              onLoad={() => addLog("IMG tag loaded successfully")}
              onError={() => addLog("IMG tag failed to load")}
            />
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                <p className="text-red-500">Failed to load image</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Method 2: CSS Background Image */}
        <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
          <h3 className="font-bold mb-3">Method 2: CSS Background Image</h3>
          <div 
            id="bg-test-div"
            className="h-60 w-full rounded-lg bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${currentImagePath}')` }}
          ></div>
        </div>
        
        {/* Method 3: CSS Class */}
        <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
          <h3 className="font-bold mb-3">Method 3: CSS Class with Variable</h3>
          <div 
            className="h-60 w-full rounded-lg bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentImagePath})` }}
          ></div>
        </div>
        
        {/* Method 4: Base64 Encoded SVG as fallback */}
        <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
          <h3 className="font-bold mb-3">Method 4: Working Fallback Image</h3>
          <div className="h-60 w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
            This is a CSS gradient fallback
          </div>
        </div>
      </div>
      
      {/* Diagnostic Logs */}
      <div className="w-full max-w-4xl mt-6">
        <h3 className="font-bold mb-2">Diagnostic Logs:</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg max-h-60 overflow-y-auto font-mono text-sm">
          {diagnosticInfo.length === 0 ? (
            <p>No diagnostic information yet...</p>
          ) : (
            diagnosticInfo.map((log, index) => (
              <div key={index} className="mb-1">
                &gt; {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageTest;
