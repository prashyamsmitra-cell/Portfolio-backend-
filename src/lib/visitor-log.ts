import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const logDirectory = path.resolve(process.cwd(), "data");
const logFile = path.join(logDirectory, "recruiter-visits.jsonl");

export async function persistRecruiterVisit(entry: Record<string, unknown>) {
  await mkdir(logDirectory, { recursive: true });
  await appendFile(logFile, `${JSON.stringify(entry)}\n`, "utf8");
}
