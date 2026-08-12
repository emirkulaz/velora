const { Client } = require('pg');

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is required');
  }

  const parsed = new URL(url);
  const dbName = parsed.pathname.replace(/^\//, '').split('?')[0];
  parsed.pathname = '/postgres';

  const admin = new Client({ connectionString: parsed.toString() });
  await admin.connect();
  const exists = await admin.query(
    'SELECT 1 FROM pg_database WHERE datname = $1',
    [dbName],
  );
  if (exists.rowCount === 0) {
    await admin.query(`CREATE DATABASE "${dbName}"`);
    console.log('DB_CREATED');
  } else {
    console.log('DB_EXISTS');
  }
  await admin.end();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
