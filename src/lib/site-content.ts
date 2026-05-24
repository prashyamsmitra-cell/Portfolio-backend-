import { getDb } from "./database";

const SITE_CONTENT_KEY = "primary";

let schemaReady: Promise<void> | null = null;

async function ensureSchema() {
  await getDb().query(`
    CREATE TABLE IF NOT EXISTS site_content (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

function getSchemaReadyPromise() {
  if (!schemaReady) {
    schemaReady = ensureSchema();
  }

  return schemaReady;
}

export async function getSiteContent() {
  await getSchemaReadyPromise();

  const result = await getDb().query<{ data: unknown }>(
    "SELECT data FROM site_content WHERE id = $1",
    [SITE_CONTENT_KEY],
  );

  return result.rows[0]?.data ?? null;
}

export async function saveSiteContent(data: unknown) {
  await getSchemaReadyPromise();

  await getDb().query(
    `
      INSERT INTO site_content (id, data, updated_at)
      VALUES ($1, $2::jsonb, NOW())
      ON CONFLICT (id)
      DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
    `,
    [SITE_CONTENT_KEY, JSON.stringify(data)],
  );
}
