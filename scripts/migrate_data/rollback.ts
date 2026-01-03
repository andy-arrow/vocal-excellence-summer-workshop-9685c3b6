import { db, pool } from "../../server/db";
import { applications, contactSubmissions, emailSignups } from "../../shared/schema";

async function rollback() {
  console.log("=".repeat(60));
  console.log("Migration Rollback");
  console.log("=".repeat(60));
  console.log("\nThis will clear all migrated data from Replit DB.");
  console.log("Supabase data remains untouched.\n");
  
  const forceArg = process.argv.includes("--force");
  
  if (!forceArg) {
    console.log("Add --force to confirm rollback.");
    console.log("\nThis is a safe operation - Supabase remains your source of truth");
    console.log("until the full cutover is complete.");
    process.exit(1);
  }
  
  console.log("Rolling back...\n");
  
  try {
    const appCount = await db.delete(applications).returning();
    console.log(`  Deleted ${appCount.length} applications`);
    
    const csCount = await db.delete(contactSubmissions).returning();
    console.log(`  Deleted ${csCount.length} contact_submissions`);
    
    const esCount = await db.delete(emailSignups).returning();
    console.log(`  Deleted ${esCount.length} email_signups`);
    
    await pool.query("SELECT setval('applications_id_seq', 1, false)");
    await pool.query("SELECT setval('contact_submissions_id_seq', 1, false)");
    await pool.query("SELECT setval('email_signups_id_seq', 1, false)");
    console.log("\n  Sequences reset");
    
    console.log("\nRollback complete. Replit DB is now empty.");
    console.log("Supabase remains the active data source.");
  } catch (error: any) {
    console.error("\nRollback error:", error.message);
    process.exit(1);
  }
  
  await pool.end();
}

rollback().catch((error) => {
  console.error("Failed:", error);
  pool.end();
  process.exit(1);
});
