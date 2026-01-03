import { db, pool } from "../../server/db";
import { applications, contactSubmissions, emailSignups } from "../../shared/schema";
import { sql } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const EXPORTS_DIR = path.join(__dirname, "exports");

interface MigrationResult {
  table: string;
  sourceCount: number;
  importedCount: number;
  success: boolean;
  error?: string;
}

const isDryRun = process.argv.includes("--dry-run");

async function readJsonFile(filename: string): Promise<any[]> {
  const filepath = path.join(EXPORTS_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.log(`  [SKIP] ${filename} not found`);
    return [];
  }
  const content = fs.readFileSync(filepath, "utf-8");
  const data = JSON.parse(content);
  return Array.isArray(data) ? data : [data];
}

function mapApplicationRecord(row: any) {
  return {
    id: row.id,
    firstName: row.first_name || row.firstName,
    lastName: row.last_name || row.lastName,
    email: row.email,
    phone: row.phone,
    whereFrom: row.where_from || row.whereFrom,
    age: row.age,
    socialMedia: row.social_media || row.socialMedia,
    dateOfBirth: row.date_of_birth || row.dateOfBirth,
    nationality: row.nationality,
    vocalRange: row.vocal_range || row.vocalRange,
    yearsOfSinging: row.years_of_singing || row.yearsOfSinging,
    musicalBackground: row.musical_background || row.musicalBackground,
    teacherName: row.teacher_name || row.teacherName,
    teacherEmail: row.teacher_email || row.teacherEmail,
    reasonForApplying: row.reason_for_applying || row.reasonForApplying,
    heardAboutUs: row.heard_about_us || row.heardAboutUs,
    scholarshipInterest: row.scholarship_interest ?? row.scholarshipInterest ?? false,
    dietaryRestrictions: row.dietary_restrictions || row.dietaryRestrictions,
    areasOfInterest: row.areas_of_interest || row.areasOfInterest,
    specialNeeds: row.special_needs || row.specialNeeds,
    termsAgreed: row.terms_agreed ?? row.termsAgreed ?? false,
    audioFile1Path: row.audio_file_1_path || row.audioFile1Path,
    audioFile2Path: row.audio_file_2_path || row.audioFile2Path,
    cvFilePath: row.cv_file_path || row.cvFilePath,
    recommendationFilePath: row.recommendation_file_path || row.recommendationFilePath,
    createdAt: row.created_at ? new Date(row.created_at) : (row.createdAt ? new Date(row.createdAt) : new Date()),
    source: row.source,
  };
}

function mapContactSubmissionRecord(row: any) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    vocalType: row.vocal_type || row.vocalType,
    message: row.message,
    source: row.source,
    createdAt: row.created_at ? new Date(row.created_at) : (row.timestamp ? new Date(row.timestamp) : new Date()),
  };
}

function mapEmailSignupRecord(row: any) {
  return {
    id: row.id,
    email: row.email,
    source: row.source,
    variant: row.variant,
    pagePath: row.page_path || row.pagePath,
    createdAt: row.created_at ? new Date(row.created_at) : new Date(),
  };
}

async function importTable<T>(
  tableName: string,
  filename: string,
  table: any,
  mapFn: (row: any) => T
): Promise<MigrationResult> {
  console.log(`\nImporting ${tableName}...`);
  
  try {
    const rows = await readJsonFile(filename);
    const sourceCount = rows.length;
    
    if (sourceCount === 0) {
      return { table: tableName, sourceCount: 0, importedCount: 0, success: true };
    }
    
    console.log(`  Source records: ${sourceCount}`);
    
    if (isDryRun) {
      console.log(`  [DRY RUN] Would import ${sourceCount} records`);
      return { table: tableName, sourceCount, importedCount: sourceCount, success: true };
    }
    
    await db.delete(table);
    console.log(`  Cleared existing data`);
    
    const mappedRows = rows.map(mapFn);
    
    const batchSize = 100;
    let importedCount = 0;
    
    for (let i = 0; i < mappedRows.length; i += batchSize) {
      const batch = mappedRows.slice(i, i + batchSize);
      await db.insert(table).values(batch as any);
      importedCount += batch.length;
      console.log(`  Imported ${importedCount}/${sourceCount}`);
    }
    
    const maxId = Math.max(...rows.map((r: any) => r.id || 0));
    if (maxId > 0) {
      const sequenceName = `${tableName}_id_seq`;
      await pool.query(`SELECT setval('${sequenceName}', $1, true)`, [maxId]);
      console.log(`  Sequence ${sequenceName} set to ${maxId}`);
    }
    
    return { table: tableName, sourceCount, importedCount, success: true };
  } catch (error: any) {
    console.error(`  [ERROR] ${error.message}`);
    return { table: tableName, sourceCount: 0, importedCount: 0, success: false, error: error.message };
  }
}

async function runMigration() {
  console.log("=".repeat(60));
  console.log("Supabase to Replit DB Migration");
  console.log(isDryRun ? "MODE: DRY RUN (no changes will be made)" : "MODE: LIVE IMPORT");
  console.log("=".repeat(60));
  
  if (!fs.existsSync(EXPORTS_DIR)) {
    console.error(`\nError: exports directory not found at ${EXPORTS_DIR}`);
    console.log("Please create it and add your JSON export files.");
    process.exit(1);
  }
  
  const files = fs.readdirSync(EXPORTS_DIR);
  console.log(`\nExport files found: ${files.length > 0 ? files.join(", ") : "none"}`);
  
  if (files.filter(f => f.endsWith(".json")).length === 0) {
    console.log("\nNo JSON files found in exports directory.");
    console.log("Please export data from Supabase and place JSON files in:");
    console.log(`  ${EXPORTS_DIR}/`);
    console.log("\nExpected files:");
    console.log("  - applications.json");
    console.log("  - contact_submissions.json");
    console.log("  - email_signups.json");
    process.exit(0);
  }
  
  const results: MigrationResult[] = [];
  
  results.push(await importTable(
    "applications",
    "applications.json",
    applications,
    mapApplicationRecord
  ));
  
  results.push(await importTable(
    "contact_submissions",
    "contact_submissions.json",
    contactSubmissions,
    mapContactSubmissionRecord
  ));
  
  results.push(await importTable(
    "email_signups",
    "email_signups.json",
    emailSignups,
    mapEmailSignupRecord
  ));
  
  console.log("\n" + "=".repeat(60));
  console.log("MIGRATION SUMMARY");
  console.log("=".repeat(60));
  
  let allSuccess = true;
  for (const result of results) {
    const status = result.success ? "OK" : "FAILED";
    console.log(`${result.table}: ${result.importedCount}/${result.sourceCount} [${status}]`);
    if (!result.success) {
      console.log(`  Error: ${result.error}`);
      allSuccess = false;
    }
  }
  
  console.log("\n" + (allSuccess ? "Migration completed successfully!" : "Migration completed with errors."));
  
  if (!isDryRun) {
    console.log("\nNext step: Run verification");
    console.log("  npx tsx scripts/migrate_data/verify.ts");
  }
  
  await pool.end();
  process.exit(allSuccess ? 0 : 1);
}

runMigration().catch((error) => {
  console.error("Migration failed:", error);
  pool.end();
  process.exit(1);
});
