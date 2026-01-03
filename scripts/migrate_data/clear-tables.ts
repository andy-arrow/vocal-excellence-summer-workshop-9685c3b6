import { db, pool } from "../../server/db";
import { applications, contactSubmissions, emailSignups } from "../../shared/schema";

async function clearTables() {
  console.log("=".repeat(60));
  console.log("Clear Migration Target Tables");
  console.log("=".repeat(60));
  console.log("\nWARNING: This will delete ALL data from:");
  console.log("  - applications");
  console.log("  - contact_submissions");
  console.log("  - email_signups");
  console.log("\nThis is intended for development/testing only.\n");
  
  const forceArg = process.argv.includes("--force");
  
  if (!forceArg) {
    console.log("Add --force to confirm deletion.");
    process.exit(1);
  }
  
  console.log("Clearing tables...\n");
  
  try {
    await db.delete(applications);
    console.log("  [OK] applications cleared");
    
    await db.delete(contactSubmissions);
    console.log("  [OK] contact_submissions cleared");
    
    await db.delete(emailSignups);
    console.log("  [OK] email_signups cleared");
    
    await pool.query("SELECT setval('applications_id_seq', 1, false)");
    await pool.query("SELECT setval('contact_submissions_id_seq', 1, false)");
    await pool.query("SELECT setval('email_signups_id_seq', 1, false)");
    console.log("\n  [OK] Sequences reset to 1");
    
    console.log("\nAll tables cleared successfully.");
  } catch (error: any) {
    console.error("\nError clearing tables:", error.message);
    process.exit(1);
  }
  
  await pool.end();
}

clearTables().catch((error) => {
  console.error("Failed:", error);
  pool.end();
  process.exit(1);
});
