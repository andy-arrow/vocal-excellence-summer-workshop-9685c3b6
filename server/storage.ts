import { db } from "./db";
import { applications, contactMessages, type InsertApplication, type Application, type InsertContactMessage, type ContactMessage } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createApplication(data: InsertApplication): Promise<Application>;
  getApplication(id: number): Promise<Application | undefined>;
  getAllApplications(): Promise<Application[]>;
  createContactMessage(data: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async createApplication(data: InsertApplication): Promise<Application> {
    const [application] = await db.insert(applications).values(data).returning();
    return application;
  }

  async getApplication(id: number): Promise<Application | undefined> {
    const [application] = await db.select().from(applications).where(eq(applications.id, id));
    return application;
  }

  async getAllApplications(): Promise<Application[]> {
    return await db.select().from(applications);
  }

  async createContactMessage(data: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(data).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
