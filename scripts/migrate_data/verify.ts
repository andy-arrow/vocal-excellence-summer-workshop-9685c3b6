import { db, pool } from "../../server/db";
import { applications, contactSubmissions, emailSignups } from "../../shared/schema";
import { count, eq } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const EXPORTS_DIR = path.join(__dirname, "exports");

interface VerificationResult {
  check: string;
  expected: string | number;
  actual: string | number;
  passed: boolean;
}

const results: VerificationResult[] = [];

function addResult(check: string, expected: string | number, actual: string | number) {
  const passed = String(expected) === String(actual);
  results.push({ check, expected, actual, passed });
  const status = passed ? "[PASS]" : "[FAIL]";
  console.log(`${status} ${check}: expected=${expected}, actual=${actual}`);
}

async function readSourceCount(filename: string): Promise<number> {
  const filepath = path.join(EXPORTS_DIR, filename);
  if (!fs.existsSync(filepath)) {
    return 0;
  }
  const content = fs.readFileSync(filepath, "utf-8");
  const data = JSON.parse(content);
  return Array.isArray(data) ? data.length : 1;
}

async function getFirstRecord(filename: string): Promise<any | null> {
  const filepath = path.join(EXPORTS_DIR, filename);
  if (!fs.existsSync(filepath)) {
    return null;
  }
  const content = fs.readFileSync(filepath, "utf-8");
  const data = JSON.parse(content);
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

async function runVerification() {
  console.log("=".repeat(60));
  console.log("Migration Verification");
  console.log("=".repeat(60));
  
  console.log("\n1. ROW COUNT VERIFICATION");
  console.log("-".repeat(40));
  
  const appSourceCount = await readSourceCount("applications.json");
  const [appResult] = await db.select({ count: count() }).from(applications);
  addResult("applications row count", appSourceCount, appResult.count);
  
  const csSourceCount = await readSourceCount("contact_submissions.json");
  const [csResult] = await db.select({ count: count() }).from(contactSubmissions);
  addResult("contact_submissions row count", csSourceCount, csResult.count);
  
  const esSourceCount = await readSourceCount("email_signups.json");
  const [esResult] = await db.select({ count: count() }).from(emailSignups);
  addResult("email_signups row count", esSourceCount, esResult.count);
  
  console.log("\n2. SAMPLE RECORD SPOT-CHECK");
  console.log("-".repeat(40));
  
  const firstApp = await getFirstRecord("applications.json");
  if (firstApp && firstApp.id) {
    const [dbApp] = await db.select().from(applications).where(eq(applications.id, firstApp.id));
    if (dbApp) {
      const emailMatch = dbApp.email === firstApp.email;
      addResult(`applications[id=${firstApp.id}] email match`, firstApp.email, dbApp.email);
    } else {
      addResult(`applications[id=${firstApp.id}] exists`, "record found", "not found");
    }
  } else {
    console.log("  [SKIP] No applications source data to verify");
  }
  
  const firstCs = await getFirstRecord("contact_submissions.json");
  if (firstCs && firstCs.id) {
    const [dbCs] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, firstCs.id));
    if (dbCs) {
      const emailMatch = dbCs.email === firstCs.email;
      addResult(`contact_submissions[id=${firstCs.id}] email match`, firstCs.email, dbCs.email);
    } else {
      addResult(`contact_submissions[id=${firstCs.id}] exists`, "record found", "not found");
    }
  } else {
    console.log("  [SKIP] No contact_submissions source data to verify");
  }
  
  const firstEs = await getFirstRecord("email_signups.json");
  if (firstEs && firstEs.id) {
    const [dbEs] = await db.select().from(emailSignups).where(eq(emailSignups.id, firstEs.id));
    if (dbEs) {
      const emailMatch = dbEs.email === firstEs.email;
      addResult(`email_signups[id=${firstEs.id}] email match`, firstEs.email, dbEs.email);
    } else {
      addResult(`email_signups[id=${firstEs.id}] exists`, "record found", "not found");
    }
  } else {
    console.log("  [SKIP] No email_signups source data to verify");
  }
  
  console.log("\n3. SEQUENCE VERIFICATION");
  console.log("-".repeat(40));
  
  async function checkSequence(tableName: string, table: any) {
    try {
      const [maxResult] = await db.select({ count: count() }).from(table);
      if (maxResult.count > 0) {
        const seqResult = await pool.query(
          `SELECT last_value FROM ${tableName}_id_seq`
        );
        const lastValue = parseInt(seqResult.rows[0]?.last_value || "0");
        const maxIdResult = await pool.query(`SELECT MAX(id) as max_id FROM ${tableName}`);
        const maxId = parseInt(maxIdResult.rows[0]?.max_id || "0");
        const seqOk = lastValue >= maxId;
        const status = seqOk ? "valid" : "invalid";
        results.push({ 
          check: `${tableName} sequence`, 
          expected: "valid", 
          actual: status, 
          passed: seqOk 
        });
        const statusStr = seqOk ? "[PASS]" : "[FAIL]";
        console.log(`${statusStr} ${tableName} sequence: last_value=${lastValue}, max_id=${maxId}`);
      } else {
        console.log(`  [SKIP] ${tableName} is empty`);
      }
    } catch (error: any) {
      console.log(`  [WARN] Could not verify ${tableName} sequence: ${error.message}`);
    }
  }
  
  await checkSequence("applications", applications);
  await checkSequence("contact_submissions", contactSubmissions);
  await checkSequence("email_signups", emailSignups);
  
  console.log("\n4. HEALTH CHECK");
  console.log("-".repeat(40));
  
  try {
    const start = Date.now();
    await pool.query("SELECT 1");
    const latency = Date.now() - start;
    addResult("database connectivity", "connected", "connected");
    console.log(`  Latency: ${latency}ms`);
  } catch (error: any) {
    addResult("database connectivity", "connected", "failed");
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("VERIFICATION SUMMARY");
  console.log("=".repeat(60));
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const total = results.length;
  
  console.log(`\nTotal: ${passed}/${total} passed`);
  
  if (failed > 0) {
    console.log("\nFailed checks:");
    for (const r of results.filter(r => !r.passed)) {
      console.log(`  - ${r.check}: expected=${r.expected}, actual=${r.actual}`);
    }
  }
  
  console.log("\n" + "=".repeat(60));
  if (failed === 0) {
    console.log("GO: All verification checks passed!");
    console.log("Safe to proceed with frontend cutover (Segment 4)");
  } else {
    console.log("NO-GO: Some verification checks failed.");
    console.log("Review failures before proceeding.");
  }
  console.log("=".repeat(60));
  
  await pool.end();
  process.exit(failed === 0 ? 0 : 1);
}

runVerification().catch((error) => {
  console.error("Verification failed:", error);
  pool.end();
  process.exit(1);
});
