import { db, pool } from "./db";
import { 
  applications, 
  contactMessages, 
  contactSubmissions,
  emailSignups,
  type InsertApplication, 
  type Application, 
  type InsertContactMessage, 
  type ContactMessage,
  type InsertContactSubmission,
  type ContactSubmission,
  type InsertEmailSignup,
  type EmailSignup
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface PaymentUpdateData {
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  paymentStatus?: string;
  paidAt?: Date;
}

export interface IStorage {
  createApplication(data: InsertApplication): Promise<Application>;
  getApplication(id: number): Promise<Application | undefined>;
  getAllApplications(): Promise<Application[]>;
  updateApplicationPayment(id: number, data: PaymentUpdateData): Promise<Application | undefined>;
  createContactMessage(data: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  createEmailSignup(data: InsertEmailSignup): Promise<EmailSignup>;
  getAllEmailSignups(): Promise<EmailSignup[]>;
  healthCheck(): Promise<{ healthy: boolean; latencyMs: number; error?: string }>;
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
    return await db.select().from(applications).orderBy(desc(applications.createdAt));
  }

  async updateApplicationPayment(id: number, data: PaymentUpdateData): Promise<Application | undefined> {
    const [application] = await db
      .update(applications)
      .set({
        ...(data.stripeSessionId && { stripeSessionId: data.stripeSessionId }),
        ...(data.stripePaymentIntentId && { stripePaymentIntentId: data.stripePaymentIntentId }),
        ...(data.paymentStatus && { paymentStatus: data.paymentStatus }),
        ...(data.paidAt && { paidAt: data.paidAt }),
      })
      .where(eq(applications.id, id))
      .returning();
    return application;
  }

  async createContactMessage(data: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(data).returning();
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(data).returning();
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async createEmailSignup(data: InsertEmailSignup): Promise<EmailSignup> {
    const [signup] = await db.insert(emailSignups).values(data).returning();
    return signup;
  }

  async getAllEmailSignups(): Promise<EmailSignup[]> {
    return await db.select().from(emailSignups).orderBy(desc(emailSignups.createdAt));
  }

  async healthCheck(): Promise<{ healthy: boolean; latencyMs: number; error?: string }> {
    const start = Date.now();
    try {
      await pool.query('SELECT 1');
      const latencyMs = Date.now() - start;
      return { healthy: true, latencyMs };
    } catch (error: any) {
      const latencyMs = Date.now() - start;
      return { healthy: false, latencyMs, error: error.message };
    }
  }
}

export const storage = new DatabaseStorage();
