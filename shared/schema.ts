import { pgTable, text, serial, boolean, timestamp, jsonb, index } from "drizzle-orm/pg-core";

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  whereFrom: text("where_from"),
  age: text("age"),
  socialMedia: text("social_media"),
  dateOfBirth: text("date_of_birth"),
  nationality: text("nationality"),
  vocalRange: text("vocal_range"),
  yearsOfSinging: text("years_of_singing"),
  musicalBackground: text("musical_background"),
  teacherName: text("teacher_name"),
  teacherEmail: text("teacher_email"),
  reasonForApplying: text("reason_for_applying"),
  heardAboutUs: text("heard_about_us"),
  scholarshipInterest: boolean("scholarship_interest").default(false),
  dietaryRestrictions: jsonb("dietary_restrictions"),
  areasOfInterest: text("areas_of_interest"),
  specialNeeds: text("special_needs"),
  termsAgreed: boolean("terms_agreed").default(false),
  audioFile1Path: text("audio_file_1_path"),
  audioFile2Path: text("audio_file_2_path"),
  cvFilePath: text("cv_file_path"),
  recommendationFilePath: text("recommendation_file_path"),
  createdAt: timestamp("created_at").defaultNow(),
  source: text("source"),
  paymentStatus: text("payment_status").default("pending"),
  stripeSessionId: text("stripe_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  paidAt: timestamp("paid_at"),
  emailsSentAt: timestamp("emails_sent_at"),
}, (table) => ({
  emailIdx: index("applications_email_idx").on(table.email),
  createdAtIdx: index("applications_created_at_idx").on(table.createdAt),
}));

export type InsertApplication = typeof applications.$inferInsert;
export type Application = typeof applications.$inferSelect;

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  emailIdx: index("contact_messages_email_idx").on(table.email),
  createdAtIdx: index("contact_messages_created_at_idx").on(table.createdAt),
}));

export type InsertContactMessage = typeof contactMessages.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  vocalType: text("vocal_type"),
  message: text("message"),
  source: text("source"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  createdAtIdx: index("contact_submissions_created_at_idx").on(table.createdAt),
  emailIdx: index("contact_submissions_email_idx").on(table.email),
}));

export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const emailSignups = pgTable("email_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  source: text("source"),
  variant: text("variant"),
  pagePath: text("page_path"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  emailIdx: index("email_signups_email_idx").on(table.email),
  createdAtIdx: index("email_signups_created_at_idx").on(table.createdAt),
}));

export type InsertEmailSignup = typeof emailSignups.$inferInsert;
export type EmailSignup = typeof emailSignups.$inferSelect;
