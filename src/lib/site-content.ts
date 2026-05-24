import { getDb } from "./database";

const SITE_CONTENT_KEY = "primary";
const DEFAULT_GITHUB_URL = "https://github.com/prashyamsmitra-cell";

type ThemeName = "mint" | "cyber" | "nova" | "arctic" | "matrix";

type Project = {
  id: string;
  name: string;
  position: number;
  problem: string;
  architecture: string[];
  stack: string[];
  decisions: string[];
  live_url: string | null;
  github_url: string | null;
};

type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: number;
  credential_url: string;
  position: number;
};

type Social = {
  id: string;
  platform: string;
  url: string;
  position: number;
};

type HeroContent = {
  heading: string;
  subheading: string;
  philosophy: string;
};

type AboutContent = {
  bio: string[];
  philosophyItems: { color: string; title: string; body: string }[];
  skillGroups: { category: string; items: string[] }[];
};

export type SiteContent = {
  theme: ThemeName;
  hero: HeroContent;
  projects: Project[];
  certifications: Certification[];
  socials: Social[];
  brandText: string;
  about: AboutContent;
  copyrightName: string;
};

const DEFAULT_SITE_CONTENT: SiteContent = {
  theme: "mint",
  brandText: "eng@portfolio:~$",
  copyrightName: "Systems Engineer",
  hero: {
    heading: "I design and build real-world scalable systems, not just UI applications.",
    subheading:
      "Backend systems engineer specializing in distributed architecture, high-throughput APIs, and infrastructure automation.",
    philosophy: "Build for failure. Measure everything. Optimize last.",
  },
  about: {
    bio: [
      "I'm a Senior Backend Systems Engineer with a deep focus on designing and operating robust, high-performance distributed systems. While others argue over UI frameworks, I'm analyzing query plans, tuning indexes, and configuring load balancers to ensure the application stays up when the traffic spikes.",
      "My career has been defined by solving hard technical problems at scale. Whether it's building a rate-limiter that can handle 10k requests per second, designing an event-sourced architecture for healthcare data, or optimizing an AI vector search pipeline to run in milliseconds, I thrive where complexity meets execution.",
    ],
    philosophyItems: [
      {
        color: "primary",
        title: "Build for Failure",
        body: "Networks drop. Disks fill up. Third-party APIs go down. I design systems that degrade gracefully rather than failing catastrophically. Circuit breakers, retries with exponential backoff, and robust dead-letter queues are defaults, not afterthoughts.",
      },
      {
        color: "accent",
        title: "Measure Everything",
        body: "You can't fix what you can't see. Comprehensive telemetry, structured logging, and APM tracing form the bedrock of any system I touch. If a service doesn't emit metrics, it doesn't go to production.",
      },
      {
        color: "success",
        title: "Boring is Beautiful",
        body: "I prefer proven, robust technologies over the latest hype cycle. I choose PostgreSQL over niche NoSQL databases unless there is a strict operational requirement. Innovation should happen in the product, not the underlying infrastructure.",
      },
    ],
    skillGroups: [
      { category: "Languages", items: ["TypeScript", "Python", "Go", "Rust"] },
      { category: "Databases", items: ["PostgreSQL", "Redis", "MongoDB", "pgvector"] },
      { category: "Infrastructure", items: ["Kubernetes", "Docker", "Terraform", "AWS", "GCP"] },
      { category: "Async Systems", items: ["Bull", "Celery", "RabbitMQ", "Kafka"] },
      { category: "Realtime", items: ["WebSockets", "Server-Sent Events", "Supabase Realtime"] },
      { category: "AI / ML", items: ["OpenAI API", "LangChain", "pgvector", "embeddings pipelines"] },
    ],
  },
  projects: [
    { id: "1", name: "CareSync", position: 1, problem: "Healthcare providers needed real-time patient data sync across clinics with zero downtime.", architecture: ["Event-driven microservices", "PostgreSQL with CQRS", "Redis pub/sub for real-time", "Kubernetes deployment"], stack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Kubernetes", "gRPC"], decisions: ["Chose event sourcing for audit trail compliance", "Used saga pattern for distributed transactions", "Implemented circuit breakers for clinic connectivity"], live_url: null, github_url: "#" },
    { id: "2", name: "VMS (Vendor Management System)", position: 2, problem: "Enterprise needed automated vendor onboarding with multi-stage approval workflows and SLA tracking.", architecture: ["Monolithic with modular boundaries", "Bull queue for async workflows", "PostgreSQL row-level security", "REST + WebSocket hybrid"], stack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Bull", "WebSockets"], decisions: ["Kept monolith for team velocity", "Implemented finite state machine for approval stages", "Used materialized views for SLA dashboard"], live_url: null, github_url: "#" },
    { id: "3", name: "CV Analyzer", position: 3, problem: "HR teams spending 6+ hours manually screening hundreds of CVs per job posting.", architecture: ["FastAPI backend", "Async PDF extraction pipeline", "OpenAI embeddings for semantic matching", "PostgreSQL pgvector"], stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "OpenAI", "Celery", "Redis"], decisions: ["Chose pgvector over Pinecone to keep infra simple", "Used semantic chunking for better extraction", "Implemented streaming responses for real-time feedback"], live_url: null, github_url: "#" },
    { id: "4", name: "URL Shortener at Scale", position: 4, problem: "Build a URL shortener handling 10k+ RPS with sub-10ms redirect latency.", architecture: ["Distributed ID generation (Snowflake)", "Multi-tier caching (L1 in-process, L2 Redis)", "Read replicas for analytics", "CDN edge caching"], stack: ["Go", "Redis", "PostgreSQL", "Nginx", "Prometheus", "Grafana"], decisions: ["Used base62 encoding for short URLs", "Implemented bloom filter to avoid DB lookups for non-existent keys", "Separated read/write paths from day one"], live_url: null, github_url: "#" },
    { id: "5", name: "Review App Platform", position: 5, problem: "Dev teams needed isolated preview environments per PR without manual DevOps overhead.", architecture: ["GitHub webhooks trigger provisioning", "Docker + Kubernetes namespaces per PR", "Nginx ingress with dynamic subdomains", "Cleanup via TTL + webhook events"], stack: ["Node.js", "TypeScript", "Kubernetes", "Docker", "Nginx", "GitHub Actions"], decisions: ["Used namespace isolation over separate clusters for cost", "Implemented resource quotas to prevent runaway costs", "Chose Helm for templating over raw manifests"], live_url: null, github_url: "#" },
  ],
  certifications: [
    { id: "1", name: "AWS Solutions Architect - Associate", issuer: "Amazon Web Services", year: 2023, credential_url: "#", position: 1 },
    { id: "2", name: "Certified Kubernetes Administrator (CKA)", issuer: "CNCF", year: 2023, credential_url: "#", position: 2 },
    { id: "3", name: "HashiCorp Terraform Associate", issuer: "HashiCorp", year: 2024, credential_url: "#", position: 3 },
    { id: "4", name: "Google Cloud Professional Data Engineer", issuer: "Google Cloud", year: 2024, credential_url: "#", position: 4 },
  ],
  socials: [
    { id: "1", platform: "GitHub", url: DEFAULT_GITHUB_URL, position: 1 },
    { id: "2", platform: "LinkedIn", url: "", position: 2 },
  ],
};

let schemaReady: Promise<void> | null = null;

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asStringArray(value: unknown, fallback: string[] = []): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : fallback;
}

function normalizeExternalUrl(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed || trimmed === "#") {
    return null;
  }

  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed.replace(/^\/+/, "")}`;
}

function sanitizeProject(value: unknown, fallback: Project): Project {
  const project = asRecord(value);

  return {
    id: asString(project.id, fallback.id),
    name: asString(project.name, fallback.name),
    position: asNumber(project.position, fallback.position),
    problem: asString(project.problem, fallback.problem),
    architecture: asStringArray(project.architecture, fallback.architecture),
    stack: asStringArray(project.stack, fallback.stack),
    decisions: asStringArray(project.decisions, fallback.decisions),
    live_url: normalizeExternalUrl(project.live_url),
    github_url: normalizeExternalUrl(project.github_url) ?? "",
  };
}

function sanitizeCertification(value: unknown, fallback: Certification): Certification {
  const certification = asRecord(value);

  return {
    id: asString(certification.id, fallback.id),
    name: asString(certification.name, fallback.name),
    issuer: asString(certification.issuer, fallback.issuer),
    year: asNumber(certification.year, fallback.year),
    credential_url: normalizeExternalUrl(certification.credential_url) ?? "",
    position: asNumber(certification.position, fallback.position),
  };
}

function sanitizeSocial(value: unknown, fallback: Social): Social {
  const social = asRecord(value);
  const platform = asString(social.platform, fallback.platform);

  return {
    id: asString(social.id, fallback.id),
    platform,
    url: normalizeExternalUrl(social.url) ?? (platform === "GitHub" ? DEFAULT_GITHUB_URL : ""),
    position: asNumber(social.position, fallback.position),
  };
}

function sanitizeAbout(value: unknown): AboutContent {
  const about = asRecord(value);
  const philosophyItemsInput = Array.isArray(about.philosophyItems) ? about.philosophyItems : DEFAULT_SITE_CONTENT.about.philosophyItems;
  const skillGroupsInput = Array.isArray(about.skillGroups) ? about.skillGroups : DEFAULT_SITE_CONTENT.about.skillGroups;

  return {
    bio: asStringArray(about.bio, DEFAULT_SITE_CONTENT.about.bio),
    philosophyItems: philosophyItemsInput.map((item, index) => {
      const next = asRecord(item);
      const fallback = DEFAULT_SITE_CONTENT.about.philosophyItems[index] ?? DEFAULT_SITE_CONTENT.about.philosophyItems[0];

      return {
        color: asString(next.color, fallback.color),
        title: asString(next.title, fallback.title),
        body: asString(next.body, fallback.body),
      };
    }),
    skillGroups: skillGroupsInput.map((group, index) => {
      const next = asRecord(group);
      const fallback = DEFAULT_SITE_CONTENT.about.skillGroups[index] ?? DEFAULT_SITE_CONTENT.about.skillGroups[0];

      return {
        category: asString(next.category, fallback.category),
        items: asStringArray(next.items, fallback.items),
      };
    }),
  };
}

export function sanitizeSiteContent(value: unknown): SiteContent {
  const input = asRecord(value);
  const projectsInput = Array.isArray(input.projects) ? input.projects : DEFAULT_SITE_CONTENT.projects;
  const certificationsInput = Array.isArray(input.certifications) ? input.certifications : DEFAULT_SITE_CONTENT.certifications;
  const socialsInput = Array.isArray(input.socials) ? input.socials : DEFAULT_SITE_CONTENT.socials;

  return {
    theme: (asString(input.theme, DEFAULT_SITE_CONTENT.theme) as ThemeName) || DEFAULT_SITE_CONTENT.theme,
    brandText: asString(input.brandText, DEFAULT_SITE_CONTENT.brandText),
    copyrightName: asString(input.copyrightName, DEFAULT_SITE_CONTENT.copyrightName),
    hero: {
      heading: asString(asRecord(input.hero).heading, DEFAULT_SITE_CONTENT.hero.heading),
      subheading: asString(asRecord(input.hero).subheading, DEFAULT_SITE_CONTENT.hero.subheading),
      philosophy: asString(asRecord(input.hero).philosophy, DEFAULT_SITE_CONTENT.hero.philosophy),
    },
    about: sanitizeAbout(input.about),
    projects: projectsInput.map((project, index) =>
      sanitizeProject(project, DEFAULT_SITE_CONTENT.projects[index] ?? DEFAULT_SITE_CONTENT.projects[0]),
    ),
    certifications: certificationsInput.map((certification, index) =>
      sanitizeCertification(certification, DEFAULT_SITE_CONTENT.certifications[index] ?? DEFAULT_SITE_CONTENT.certifications[0]),
    ),
    socials: socialsInput.map((social, index) =>
      sanitizeSocial(social, DEFAULT_SITE_CONTENT.socials[index] ?? DEFAULT_SITE_CONTENT.socials[0]),
    ),
  };
}

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

  return sanitizeSiteContent(result.rows[0]?.data ?? DEFAULT_SITE_CONTENT);
}

export async function saveSiteContent(data: unknown) {
  await getSchemaReadyPromise();

  const sanitized = sanitizeSiteContent(data);

  await getDb().query(
    `
      INSERT INTO site_content (id, data, updated_at)
      VALUES ($1, $2::jsonb, NOW())
      ON CONFLICT (id)
      DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
    `,
    [SITE_CONTENT_KEY, JSON.stringify(sanitized)],
  );
}
