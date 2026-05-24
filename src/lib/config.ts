import type { CookieOptions } from "express";

const parseNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const parseBoolean = (value: string | undefined, fallback: boolean) => {
  if (value == null) return fallback;
  return value === "true";
};

const parseSameSite = (value: string | undefined, fallback: CookieOptions["sameSite"]) => {
  if (value === "lax" || value === "strict" || value === "none") return value;
  return fallback;
};

const smtpConfigured = Boolean(
  process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.SMTP_FROM,
);

export const config = {
  port: parseNumber(process.env.PORT, 3001),
  nodeEnv: process.env.NODE_ENV ?? "development",
  corsOrigin: (process.env.CORS_ORIGIN ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  adminId: process.env.ADMIN_ID ?? "admin",
  adminPassword: process.env.ADMIN_PASSWORD ?? "change-me",
  adminSessionSecret: process.env.ADMIN_SESSION_SECRET ?? "replace-this-secret",
  adminSessionTtlHours: parseNumber(process.env.ADMIN_SESSION_TTL_HOURS, 12),
  adminCookieSameSite: parseSameSite(process.env.ADMIN_COOKIE_SAME_SITE, "lax"),
  smtp: smtpConfigured
    ? {
        host: process.env.SMTP_HOST as string,
        port: parseNumber(process.env.SMTP_PORT, 587),
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
        from: process.env.SMTP_FROM as string,
        secure: parseBoolean(process.env.SMTP_SECURE, false),
      }
    : null,
};

export const isProduction = config.nodeEnv === "production";
