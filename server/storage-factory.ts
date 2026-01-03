import { DatabaseStorage, IStorage } from "./storage";
import { SupabaseStorage } from "./storage-supabase";
import type {
  Application,
  InsertApplication,
  ContactMessage,
  InsertContactMessage,
  ContactSubmission,
  InsertContactSubmission,
  EmailSignup,
  InsertEmailSignup,
} from "@shared/schema";

export type DataBackend = "replit" | "supabase";

function getDataBackend(): DataBackend {
  const backend = (process.env.DATA_BACKEND || "replit").toLowerCase();
  if (backend === "supabase") {
    return "supabase";
  }
  return "replit";
}

class HybridStorage implements IStorage {
  private primary: IStorage;
  private replitDb: DatabaseStorage;
  private backendName: DataBackend;

  constructor(backend: DataBackend) {
    this.backendName = backend;
    this.replitDb = new DatabaseStorage();
    
    if (backend === "supabase") {
      this.primary = new SupabaseStorage();
    } else {
      this.primary = this.replitDb;
    }
  }

  async createApplication(data: InsertApplication): Promise<Application> {
    return this.primary.createApplication(data);
  }

  async getApplication(id: number): Promise<Application | undefined> {
    return this.primary.getApplication(id);
  }

  async getAllApplications(): Promise<Application[]> {
    return this.primary.getAllApplications();
  }

  async createContactMessage(data: InsertContactMessage): Promise<ContactMessage> {
    return this.replitDb.createContactMessage(data);
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return this.replitDb.getAllContactMessages();
  }

  async createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission> {
    return this.primary.createContactSubmission(data);
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return this.primary.getAllContactSubmissions();
  }

  async createEmailSignup(data: InsertEmailSignup): Promise<EmailSignup> {
    return this.primary.createEmailSignup(data);
  }

  async getAllEmailSignups(): Promise<EmailSignup[]> {
    return this.primary.getAllEmailSignups();
  }

  async healthCheck(): Promise<{ healthy: boolean; latencyMs: number; error?: string }> {
    return this.primary.healthCheck();
  }
}

let cachedStorage: IStorage | null = null;
let cachedBackend: DataBackend | null = null;

export function getStorage(): IStorage {
  const backend = getDataBackend();
  
  if (cachedStorage && cachedBackend === backend) {
    return cachedStorage;
  }
  
  console.log(`[StorageFactory] Creating HybridStorage with primary backend: ${backend}`);
  cachedStorage = new HybridStorage(backend);
  cachedBackend = backend;
  return cachedStorage;
}

export function getBackendInfo(): { backend: DataBackend; description: string } {
  const backend = getDataBackend();
  return {
    backend,
    description: backend === "replit" 
      ? "Replit PostgreSQL (Drizzle ORM)" 
      : "Supabase PostgreSQL (REST API) + Replit for contact_messages",
  };
}

export function logBackendSelection(): void {
  const info = getBackendInfo();
  console.log(`[DataBackend] Active backend: ${info.backend} (${info.description})`);
  if (info.backend === "supabase") {
    console.log(`[DataBackend] Note: contact_messages always uses Replit DB (table doesn't exist in Supabase)`);
  }
}
