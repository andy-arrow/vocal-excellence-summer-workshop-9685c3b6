import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { IStorage } from "./storage";
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

function mapSupabaseApplication(row: any): Application {
  return {
    id: row.id,
    firstName: row.firstname || row.first_name || "",
    lastName: row.lastname || row.last_name || "",
    email: row.email || "",
    phone: row.phone || "",
    whereFrom: row.wherefrom || row.where_from || null,
    age: row.age || null,
    socialMedia: row.socialmedia || row.social_media || null,
    dateOfBirth: row.dateofbirth || row.date_of_birth || null,
    nationality: row.nationality || null,
    vocalRange: row.vocalrange || row.vocal_range || null,
    yearsOfSinging: row.yearsofsinging || row.years_of_singing || null,
    musicalBackground: row.musicalbackground || row.musical_background || null,
    teacherName: row.teachername || row.teacher_name || null,
    teacherEmail: row.teacheremail || row.teacher_email || null,
    reasonForApplying: row.reasonforapplying || row.reason_for_applying || null,
    heardAboutUs: row.heardaboutus || row.heard_about_us || null,
    scholarshipInterest: row.scholarshipinterest ?? row.scholarship_interest ?? false,
    dietaryRestrictions: row.dietaryrestrictions || row.dietary_restrictions || null,
    areasOfInterest: row.areasofinterest || row.areas_of_interest || null,
    specialNeeds: row.specialneeds || row.special_needs || null,
    termsAgreed: row.termsagreed ?? row.terms_agreed ?? false,
    audioFile1Path: row.audiofile1path || row.audio_file_1_path || null,
    audioFile2Path: row.audiofile2path || row.audio_file_2_path || null,
    cvFilePath: row.cvfilepath || row.cv_file_path || null,
    recommendationFilePath: row.recommendationfilepath || row.recommendation_file_path || null,
    createdAt: row.timestamp ? new Date(row.timestamp) : (row.created_at ? new Date(row.created_at) : null),
    source: row.source || null,
  };
}

function mapSupabaseContactSubmission(row: any): ContactSubmission {
  return {
    id: row.id,
    name: row.name || "",
    email: row.email || "",
    vocalType: row.vocal_type || null,
    message: row.message || null,
    source: row.source || null,
    createdAt: row.timestamp ? new Date(row.timestamp) : (row.created_at ? new Date(row.created_at) : null),
  };
}

function mapSupabaseEmailSignup(row: any): EmailSignup {
  return {
    id: row.id,
    email: row.email || "",
    source: row.source || null,
    variant: row.variant || null,
    pagePath: row.page_path || null,
    createdAt: row.created_at ? new Date(row.created_at) : null,
  };
}

export class SupabaseStorage implements IStorage {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";

    if (!supabaseUrl || !supabaseKey) {
      console.warn("[SupabaseStorage] Missing SUPABASE_URL or SUPABASE_KEY environment variables");
    }

    this.client = createClient(supabaseUrl, supabaseKey);
  }

  async createApplication(data: InsertApplication): Promise<Application> {
    const supabaseData = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      wherefrom: data.whereFrom,
      age: data.age,
      socialmedia: data.socialMedia,
      dateofbirth: data.dateOfBirth,
      nationality: data.nationality,
      vocalrange: data.vocalRange,
      yearsofsinging: data.yearsOfSinging,
      musicalbackground: data.musicalBackground,
      teachername: data.teacherName,
      teacheremail: data.teacherEmail,
      reasonforapplying: data.reasonForApplying,
      heardaboutus: data.heardAboutUs,
      scholarshipinterest: data.scholarshipInterest,
      dietaryrestrictions: data.dietaryRestrictions,
      areasofinterest: data.areasOfInterest,
      specialneeds: data.specialNeeds,
      termsagreed: data.termsAgreed,
      audiofile1path: data.audioFile1Path,
      audiofile2path: data.audioFile2Path,
      cvfilepath: data.cvFilePath,
      recommendationfilepath: data.recommendationFilePath,
      source: data.source,
      timestamp: new Date().toISOString(),
    };

    const { data: result, error } = await this.client
      .from("applications")
      .insert(supabaseData)
      .select()
      .single();

    if (error) throw new Error(`Supabase insert error: ${error.message}`);
    return mapSupabaseApplication(result);
  }

  async getApplication(id: number): Promise<Application | undefined> {
    const { data, error } = await this.client
      .from("applications")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return undefined;
      throw new Error(`Supabase fetch error: ${error.message}`);
    }
    return data ? mapSupabaseApplication(data) : undefined;
  }

  async getAllApplications(): Promise<Application[]> {
    const { data, error } = await this.client
      .from("applications")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) throw new Error(`Supabase fetch error: ${error.message}`);
    return (data || []).map(mapSupabaseApplication);
  }

  async createContactMessage(data: InsertContactMessage): Promise<ContactMessage> {
    throw new Error("contact_messages table does not exist in Supabase - use Replit DB");
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return [];
  }

  async createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission> {
    const supabaseData = {
      name: data.name,
      email: data.email,
      vocal_type: data.vocalType,
      message: data.message,
      source: data.source,
      timestamp: new Date().toISOString(),
    };

    const { data: result, error } = await this.client
      .from("contact_submissions")
      .insert(supabaseData)
      .select()
      .single();

    if (error) throw new Error(`Supabase insert error: ${error.message}`);
    return mapSupabaseContactSubmission(result);
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    const { data, error } = await this.client
      .from("contact_submissions")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) throw new Error(`Supabase fetch error: ${error.message}`);
    return (data || []).map(mapSupabaseContactSubmission);
  }

  async createEmailSignup(data: InsertEmailSignup): Promise<EmailSignup> {
    const supabaseData = {
      email: data.email,
      source: data.source,
      variant: data.variant,
      page_path: data.pagePath,
      created_at: new Date().toISOString(),
    };

    const { data: result, error } = await this.client
      .from("email_signups")
      .insert(supabaseData)
      .select()
      .single();

    if (error) throw new Error(`Supabase insert error: ${error.message}`);
    return mapSupabaseEmailSignup(result);
  }

  async getAllEmailSignups(): Promise<EmailSignup[]> {
    const { data, error } = await this.client
      .from("email_signups")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Supabase fetch error: ${error.message}`);
    return (data || []).map(mapSupabaseEmailSignup);
  }

  async healthCheck(): Promise<{ healthy: boolean; latencyMs: number; error?: string }> {
    const start = Date.now();
    try {
      const { error } = await this.client.from("applications").select("id").limit(1);
      const latencyMs = Date.now() - start;
      if (error) {
        return { healthy: false, latencyMs, error: error.message };
      }
      return { healthy: true, latencyMs };
    } catch (error: any) {
      return { healthy: false, latencyMs: Date.now() - start, error: error.message };
    }
  }
}
