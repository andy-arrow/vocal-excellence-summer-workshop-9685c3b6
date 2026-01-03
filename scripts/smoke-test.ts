const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

interface TestResult {
  name: string;
  endpoint: string;
  method: string;
  passed: boolean;
  error?: string;
  responseTime?: number;
  data?: any;
}

const results: TestResult[] = [];

async function test(name: string, endpoint: string, method: string = "GET", body?: any): Promise<void> {
  const start = Date.now();
  try {
    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const responseTime = Date.now() - start;
    const data = await response.json();

    if (!response.ok) {
      results.push({
        name,
        endpoint,
        method,
        passed: false,
        error: `HTTP ${response.status}: ${JSON.stringify(data)}`,
        responseTime,
      });
      console.log(`[FAIL] ${name}: HTTP ${response.status}`);
      return;
    }

    results.push({
      name,
      endpoint,
      method,
      passed: true,
      responseTime,
      data,
    });
    console.log(`[PASS] ${name} (${responseTime}ms)`);
  } catch (error: any) {
    results.push({
      name,
      endpoint,
      method,
      passed: false,
      error: error.message,
      responseTime: Date.now() - start,
    });
    console.log(`[FAIL] ${name}: ${error.message}`);
  }
}

async function runSmokeTests() {
  console.log("=".repeat(60));
  console.log("Smoke Tests - API Endpoints");
  console.log(`Base URL: ${BASE_URL}`);
  console.log("=".repeat(60));
  console.log("");

  console.log("1. HEALTH CHECK");
  console.log("-".repeat(40));
  await test("Health endpoint", "/api/health");

  const healthResult = results.find(r => r.endpoint === "/api/health");
  if (healthResult?.data) {
    console.log(`   Backend: ${healthResult.data.backend}`);
    console.log(`   Description: ${healthResult.data.backendDescription}`);
  }

  console.log("\n2. READ ENDPOINTS");
  console.log("-".repeat(40));
  await test("GET applications", "/api/applications");
  await test("GET contact submissions", "/api/contact-submissions");
  await test("GET email signups", "/api/email-signups");
  await test("GET contact messages", "/api/contact-messages");

  console.log("\n3. WRITE ENDPOINTS (with test data)");
  console.log("-".repeat(40));

  const testEmailSignup = {
    email: `smoke-test-${Date.now()}@example.com`,
    source: "smoke-test",
    variant: "test",
    pagePath: "/test",
  };
  await test("POST email signup", "/api/email-signups", "POST", testEmailSignup);

  const testContact = {
    name: "Smoke Test User",
    email: `smoke-contact-${Date.now()}@example.com`,
    vocalType: "Soprano",
    message: "This is a smoke test",
    source: "smoke-test",
  };
  await test("POST contact submission", "/api/contact-submissions", "POST", testContact);

  console.log("\n" + "=".repeat(60));
  console.log("SMOKE TEST SUMMARY");
  console.log("=".repeat(60));

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const total = results.length;

  console.log(`\nTotal: ${passed}/${total} passed`);

  if (failed > 0) {
    console.log("\nFailed tests:");
    for (const r of results.filter(r => !r.passed)) {
      console.log(`  - ${r.name}: ${r.error}`);
    }
  }

  const avgResponseTime = results
    .filter(r => r.responseTime)
    .reduce((sum, r) => sum + (r.responseTime || 0), 0) / results.length;

  console.log(`\nAverage response time: ${Math.round(avgResponseTime)}ms`);

  console.log("\n" + "=".repeat(60));
  if (failed === 0) {
    console.log("All smoke tests passed!");
  } else {
    console.log("Some smoke tests failed. Review failures above.");
    process.exit(1);
  }
  console.log("=".repeat(60));
}

runSmokeTests().catch((error) => {
  console.error("Smoke test runner error:", error);
  process.exit(1);
});
