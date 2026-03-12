
/**
 * Application Files Store
 * 
 * A central store for managing application files across components
 * to ensure consistent access and prevent race conditions.
 */

// Define the allowed file types 
export type ApplicationFileType = 'audioFile1' | 'audioFile2' | 'cvFile' | 'recommendationFile';

// File store interface
interface ApplicationFilesStore {
  [key: string]: File | null;
  audioFile1: File | null;
  audioFile2: File | null;
  cvFile: File | null;
  recommendationFile: File | null;
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
    if (typeof window !== 'undefined') {
      if (!window.applicationFiles) {
        window.applicationFiles = { ...initialStore };
      } else {
        const requiredKeys = ['audioFile1', 'audioFile2', 'cvFile', 'recommendationFile'];
        requiredKeys.forEach(key => {
          if (!(key in window.applicationFiles)) {
            window.applicationFiles[key] = null;
          }
        });

        Object.entries(window.applicationFiles).forEach(([key, file]) => {
          if (this.isValidFileType(key) && file instanceof File) {
            this.files[key as ApplicationFileType] = file;
          }
        });
      }
    }
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
  }

  /**
   * Clear all files in the store
   */
  public clearFiles(): void {
    Object.keys(this.files).forEach(key => {
      if (this.isValidFileType(key)) {
        this.files[key as ApplicationFileType] = null;
      }
    });
    this.syncWithWindowObject();
    this.notifySubscribers();
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
