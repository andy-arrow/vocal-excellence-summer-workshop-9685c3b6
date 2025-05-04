
/// <reference types="vite/client" />

// Add FingerprintJS global type definition
interface Window {
  FingerprintJS?: {
    load: () => Promise<{
      get: () => Promise<{ visitorId: string }>
    }>
  }
}
