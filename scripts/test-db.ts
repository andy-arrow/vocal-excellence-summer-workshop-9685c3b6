import { db, pool } from "../server/db";
import { 
  applications, 
  contactMessages, 
  contactSubmissions, 
  emailSignups 
} from "../shared/schema";
import { eq } from "drizzle-orm";

async function runTests() {
  console.log("Starting database verification tests...\n");
  let passed = 0;
  let failed = 0;

  async function test(name: string, fn: () => Promise<void>) {
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (error: any) {
      console.log(`[FAIL] ${name}: ${error.message}`);
      failed++;
    }
  }

  await test("Database connectivity", async () => {
    const result = await pool.query("SELECT 1 as test");
    if (result.rows[0].test !== 1) {
      throw new Error("Unexpected result from SELECT 1");
    }
  });

  await test("Applications table exists", async () => {
    await db.select().from(applications).limit(1);
  });

  await test("Contact messages table exists", async () => {
    await db.select().from(contactMessages).limit(1);
  });

  await test("Contact submissions table exists", async () => {
    await db.select().from(contactSubmissions).limit(1);
  });

  await test("Email signups table exists", async () => {
    await db.select().from(emailSignups).limit(1);
  });

  await test("CRUD cycle - email_signups (with rollback)", async () => {
    const testEmail = `test-${Date.now()}@example.com`;
    
    const [created] = await db.insert(emailSignups).values({
      email: testEmail,
      source: "test",
      variant: "test_variant",
      pagePath: "/test",
    }).returning();

    if (!created.id) {
      throw new Error("Failed to create email signup");
    }

    const [fetched] = await db.select().from(emailSignups).where(eq(emailSignups.id, created.id));
    if (fetched.email !== testEmail) {
      throw new Error("Email mismatch on fetch");
    }

    await db.delete(emailSignups).where(eq(emailSignups.id, created.id));

    const [deleted] = await db.select().from(emailSignups).where(eq(emailSignups.id, created.id));
    if (deleted) {
      throw new Error("Record was not deleted");
    }
  });

  await test("CRUD cycle - contact_submissions (with rollback)", async () => {
    const testEmail = `contact-${Date.now()}@example.com`;
    
    const [created] = await db.insert(contactSubmissions).values({
      name: "Test User",
      email: testEmail,
      vocalType: "Soprano",
      message: "Test message",
      source: "test",
    }).returning();

    if (!created.id) {
      throw new Error("Failed to create contact submission");
    }

    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, created.id));
  });

  console.log("\n" + "=".repeat(50));
  console.log(`Tests completed: ${passed} passed, ${failed} failed`);
  console.log("=".repeat(50));

  await pool.end();

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((error) => {
  console.error("Test runner error:", error);
  process.exit(1);
});
