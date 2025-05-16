
/**
 * Application Files Store
 * 
 * A central store for managing application files across components
 * to ensure consistent access and prevent race conditions.
 */

// Define the allowed file types
type ApplicationFileType = 'audioFile1' | 'audioFile2' | 'cvFile' | 'recommendationFile';

// File store interface
export interface ApplicationFilesStore {
  [key: string]: File | null;
}

// Initialize the store with nulls
const initialStore: ApplicationFilesStore = {
  audioFile1: null,
  audioFile2: null,
  cvFile: null,
  recommendationFile: null
};

// Store implementation
class ApplicationFiles {
  private static instance: ApplicationFiles;
  private files: ApplicationFilesStore = { ...initialStore };
  private subscribers: Array<() => void> = [];

  private constructor() {
    // Initialize from window.applicationFiles if it exists
    if (typeof window !== 'undefined') {
      if (!window.applicationFiles) {
        window.applicationFiles = { ...initialStore };
        console.log('ApplicationFilesStore: Initialized window.applicationFiles with default structure');
      } else {
        console.log('ApplicationFilesStore: Found existing window.applicationFiles');
        
        // Make sure all required keys exist
        const requiredKeys = ['audioFile1', 'audioFile2', 'cvFile', 'recommendationFile'];
        let updated = false;
        
        requiredKeys.forEach(key => {
          if (!(key in window.applicationFiles)) {
            window.applicationFiles[key] = null;
            updated = true;
          }
        });
        
        // Copy from window object to our store
        Object.entries(window.applicationFiles).forEach(([key, file]) => {
          if (this.isValidFileType(key) && file instanceof File) {
            this.files[key] = file;
          }
        });
        
        if (updated) {
          console.log('ApplicationFilesStore: Updated window.applicationFiles with missing keys');
        }
      }
    }
    
    console.log('ApplicationFilesStore: Initialized store with', 
      Object.keys(this.files).map(key => 
        `${key}: ${this.files[key] ? `${this.files[key]?.name} (${this.files[key]?.size} bytes)` : 'null'}`
      )
    );
  }

  public static getInstance(): ApplicationFiles {
    if (!ApplicationFiles.instance) {
      ApplicationFiles.instance = new ApplicationFiles();
    }
    return ApplicationFiles.instance;
  }

  private isValidFileType(type: string): type is ApplicationFileType {
    return ['audioFile1', 'audioFile2', 'cvFile', 'recommendationFile'].includes(type);
  }

  /**
   * Get all files in the store
   */
  public getFiles(): ApplicationFilesStore {
    return { ...this.files };
  }

  /**
   * Get a specific file from the store
   */
  public getFile(type: ApplicationFileType): File | null {
    return this.files[type] || null;
  }

  /**
   * Set a file in the store
   */
  public setFile(type: ApplicationFileType, file: File | null): void {
    if (!this.isValidFileType(type)) {
      console.error(`Invalid file type: ${type}`);
      return;
    }
    
    this.files[type] = file;
    this.syncWithWindowObject();
    this.notifySubscribers();
    
    console.log(`ApplicationFilesStore: Updated ${type} to ${file ? `${file.name} (${file.size} bytes)` : 'null'}`);
  }

  /**
   * Clear all files in the store
   */
  public clearFiles(): void {
    Object.keys(this.files).forEach(key => {
      if (this.isValidFileType(key)) {
        this.files[key] = null;
      }
    });
    this.syncWithWindowObject();
    this.notifySubscribers();
    console.log('ApplicationFilesStore: Cleared all files');
  }

  /**
   * Subscribe to changes
   */
  public subscribe(callback: () => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  /**
   * Notify subscribers of changes
   */
  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback());
  }

  /**
   * Sync with window.applicationFiles object for legacy compatibility
   */
  private syncWithWindowObject(): void {
    if (typeof window !== 'undefined') {
      if (!window.applicationFiles) {
        window.applicationFiles = { ...this.files };
      } else {
        Object.entries(this.files).forEach(([key, file]) => {
          window.applicationFiles[key] = file;
        });
      }
    }
  }
}

// Export a singleton instance
export const applicationFilesStore = ApplicationFiles.getInstance();
