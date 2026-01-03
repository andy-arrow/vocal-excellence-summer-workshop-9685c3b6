import { DatabaseStorage, IStorage } from "./storage";

let cachedStorage: IStorage | null = null;

export function getStorage(): IStorage {
  if (cachedStorage) {
    return cachedStorage;
  }
  
  console.log("[StorageFactory] Using Replit PostgreSQL backend");
  cachedStorage = new DatabaseStorage();
  return cachedStorage;
}

export function getBackendInfo(): { backend: string; description: string } {
  return {
    backend: "replit",
    description: "Replit PostgreSQL (Drizzle ORM)",
  };
}

export function logBackendSelection(): void {
  const info = getBackendInfo();
  console.log(`[DataBackend] Active backend: ${info.backend} (${info.description})`);
}
