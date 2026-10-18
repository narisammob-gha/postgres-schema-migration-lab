
import pg from "pg";

const { Client } = pg;
const mode = process.argv[2];

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

try {
  await client.connect();

  const tableResult = await client.query(`
    SELECT to_regclass('public.customers') AS table_name
  `);

  const columnResult = await client.query(`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'customers'
        AND column_name = 'status'
    ) AS status_exists
  `);

  const tableExists = tableResult.rows[0].table_name !== null;
  const statusExists = columnResult.rows[0].status_exists;

  if (
    mode === "after-up" &&
    (!tableExists || !statusExists)
  ) {
    throw new Error(
      "Expected customers table and status column"
    );
  }

  if (
    mode === "after-down" &&
    (!tableExists || statusExists)
  ) {
    throw new Error(
      "Expected customers table without status column"
    );
  }

  console.log(`Schema validation passed: ${mode}`);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await client.end();
}
