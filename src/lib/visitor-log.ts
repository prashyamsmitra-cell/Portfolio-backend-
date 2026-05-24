import { getDb } from "./database";

type RecruiterVisitEntry = {
  email: string;
  companyName: string;
  reasonForVisit: string;
  visitedAt: string;
  ipAddress: string | undefined;
  userAgent: string;
};

let schemaReady: Promise<void> | null = null;

async function ensureSchema() {
  await getDb().query(`
    CREATE TABLE IF NOT EXISTS recruiter_visits (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      company_name TEXT NOT NULL,
      reason_for_visit TEXT NOT NULL,
      visited_at TIMESTAMPTZ NOT NULL,
      ip_address TEXT,
      user_agent TEXT NOT NULL
    )
  `);
}

function getSchemaReadyPromise() {
  if (!schemaReady) {
    schemaReady = ensureSchema();
  }

  return schemaReady;
}

export async function persistRecruiterVisit(entry: RecruiterVisitEntry) {
  await getSchemaReadyPromise();
  await getDb().query(
    `
      INSERT INTO recruiter_visits (
        email,
        company_name,
        reason_for_visit,
        visited_at,
        ip_address,
        user_agent
      )
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [
      entry.email,
      entry.companyName,
      entry.reasonForVisit,
      entry.visitedAt,
      entry.ipAddress ?? null,
      entry.userAgent,
    ],
  );
}
