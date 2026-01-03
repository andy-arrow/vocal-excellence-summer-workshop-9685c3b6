import pg from 'pg';

const { Pool } = pg;

interface AuditResult {
  phase: string;
  step: string;
  status: 'PASS' | 'FAIL';
  details?: string;
}

const results: AuditResult[] = [];

function log(phase: string, step: string, status: 'PASS' | 'FAIL', details?: string) {
  const result: AuditResult = { phase, step, status, details };
  results.push(result);
  const icon = status === 'PASS' ? '✓' : '✗';
  console.log(`[${phase}] ${icon} ${step}${details ? `: ${details}` : ''}`);
}

async function runForensicAudit() {
  console.log('='.repeat(60));
  console.log('FORENSIC MIGRATION AUDIT - Supabase to Replit PostgreSQL');
  console.log('='.repeat(60));
  console.log();

  // Phase 2: Connection Test - Use only DATABASE_URL
  console.log('PHASE 2: DATABASE CONNECTION TEST');
  console.log('-'.repeat(40));

  if (!process.env.DATABASE_URL) {
    log('PHASE 2', 'DATABASE_URL exists', 'FAIL', 'Missing DATABASE_URL');
    printSummary();
    process.exit(1);
  }
  log('PHASE 2', 'DATABASE_URL exists', 'PASS');

  // Check for Supabase env vars (should not exist)
  if (process.env.SUPABASE_URL) {
    log('PHASE 2', 'SUPABASE_URL absent', 'FAIL', 'SUPABASE_URL still exists!');
  } else {
    log('PHASE 2', 'SUPABASE_URL absent', 'PASS');
  }

  if (process.env.SUPABASE_ANON_KEY) {
    log('PHASE 2', 'SUPABASE_ANON_KEY absent', 'FAIL', 'SUPABASE_ANON_KEY still exists!');
  } else {
    log('PHASE 2', 'SUPABASE_ANON_KEY absent', 'PASS');
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    // Test connection
    const client = await pool.connect();
    log('PHASE 2', 'Database connection', 'PASS', 'Connected successfully');

    console.log();
    console.log('PHASE 3: CRUD GAUNTLET');
    console.log('-'.repeat(40));

    const testTimestamp = Date.now();
    const testEmail = `audit_test_${testTimestamp}@forensic.test`;
    let insertedId: number | null = null;

    // Step 1: INSERT
    try {
      const insertResult = await client.query(
        `INSERT INTO contact_messages (name, email, message, created_at) 
         VALUES ($1, $2, $3, NOW()) 
         RETURNING id`,
        [`Audit Test ${testTimestamp}`, testEmail, `Forensic Audit - Test record created at ${testTimestamp}`]
      );
      insertedId = insertResult.rows[0].id;
      log('PHASE 3', 'INSERT test record', 'PASS', `ID: ${insertedId}`);
    } catch (err: any) {
      log('PHASE 3', 'INSERT test record', 'FAIL', err.message);
    }

    // Step 2: READ
    if (insertedId) {
      try {
        const readResult = await client.query(
          'SELECT * FROM contact_messages WHERE id = $1',
          [insertedId]
        );
        if (readResult.rows.length === 1 && readResult.rows[0].email === testEmail) {
          log('PHASE 3', 'READ test record', 'PASS', `Found record with email: ${testEmail}`);
        } else {
          log('PHASE 3', 'READ test record', 'FAIL', 'Record not found or mismatch');
        }
      } catch (err: any) {
        log('PHASE 3', 'READ test record', 'FAIL', err.message);
      }
    }

    // Step 3: UPDATE
    if (insertedId) {
      try {
        const updateResult = await client.query(
          'UPDATE contact_messages SET message = $1 WHERE id = $2 RETURNING message',
          ['Forensic Audit - UPDATED', insertedId]
        );
        if (updateResult.rows[0].message === 'Forensic Audit - UPDATED') {
          log('PHASE 3', 'UPDATE test record', 'PASS', 'Message updated successfully');
        } else {
          log('PHASE 3', 'UPDATE test record', 'FAIL', 'Update verification failed');
        }
      } catch (err: any) {
        log('PHASE 3', 'UPDATE test record', 'FAIL', err.message);
      }
    }

    // Step 4: DELETE
    if (insertedId) {
      try {
        const deleteResult = await client.query(
          'DELETE FROM contact_messages WHERE id = $1 RETURNING id',
          [insertedId]
        );
        if (deleteResult.rowCount === 1) {
          log('PHASE 3', 'DELETE test record', 'PASS', `Deleted ID: ${insertedId}`);
        } else {
          log('PHASE 3', 'DELETE test record', 'FAIL', 'Delete verification failed');
        }
      } catch (err: any) {
        log('PHASE 3', 'DELETE test record', 'FAIL', err.message);
      }
    }

    console.log();
    console.log('PHASE 4: DATA INTEGRITY CHECK');
    console.log('-'.repeat(40));

    // Count records in main tables
    const tables = ['applications', 'contact_messages', 'email_signups'];
    const counts: Record<string, number> = {};

    for (const table of tables) {
      try {
        const countResult = await client.query(`SELECT COUNT(*) FROM ${table}`);
        counts[table] = parseInt(countResult.rows[0].count);
        log('PHASE 4', `Count ${table}`, 'PASS', `${counts[table]} records`);
      } catch (err: any) {
        log('PHASE 4', `Count ${table}`, 'FAIL', err.message);
      }
    }

    // Check for ghost columns (supabase_id, etc.)
    try {
      const schemaResult = await client.query(`
        SELECT table_name, column_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND column_name LIKE '%supabase%'
      `);
      if (schemaResult.rows.length > 0) {
        const ghostCols = schemaResult.rows.map(r => `${r.table_name}.${r.column_name}`).join(', ');
        log('PHASE 4', 'Ghost columns check', 'FAIL', `Found: ${ghostCols}`);
      } else {
        log('PHASE 4', 'Ghost columns check', 'PASS', 'No supabase-related columns found');
      }
    } catch (err: any) {
      log('PHASE 4', 'Ghost columns check', 'FAIL', err.message);
    }

    client.release();
    await pool.end();

    printSummary(counts);

  } catch (err: any) {
    log('PHASE 2', 'Database connection', 'FAIL', err.message);
    printSummary();
    process.exit(1);
  }
}

function printSummary(counts?: Record<string, number>) {
  console.log();
  console.log('='.repeat(60));
  console.log('AUDIT SUMMARY');
  console.log('='.repeat(60));

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const total = results.length;

  console.log(`Total Tests: ${total}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log();

  if (failed === 0) {
    console.log('MIGRATION STATUS: SUCCESS');
    console.log('All forensic checks passed. Migration is complete.');
  } else {
    console.log('MIGRATION STATUS: FAILED');
    console.log('The following tests failed:');
    results.filter(r => r.status === 'FAIL').forEach(r => {
      console.log(`  - [${r.phase}] ${r.step}: ${r.details || 'No details'}`);
    });
  }

  if (counts) {
    console.log();
    console.log('DATA COUNTS:');
    Object.entries(counts).forEach(([table, count]) => {
      console.log(`  - ${table}: ${count} records`);
    });
  }

  console.log('='.repeat(60));
}

runForensicAudit().catch(console.error);
