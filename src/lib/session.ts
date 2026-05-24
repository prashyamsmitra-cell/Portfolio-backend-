import crypto from "node:crypto";
import type { CookieOptions, Response } from "express";
import { config, isProduction } from "./config";

const COOKIE_NAME = "prashyam_portfolio_admin";
const MS_PER_HOUR = 60 * 60 * 1000;

type SessionPayload = {
  adminId: string;
  exp: number;
};

function encode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return crypto
    .createHmac("sha256", config.adminSessionSecret)
    .update(value)
    .digest("base64url");
}

export function createSessionToken(adminId: string) {
  const payload: SessionPayload = {
    adminId,
    exp: Date.now() + config.adminSessionTtlHours * MS_PER_HOUR,
  };

  const encodedPayload = encode(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  if (signature.length !== expectedSignature.length) return null;

  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );

  if (!isValid) return null;

  try {
    const payload = JSON.parse(decode(encodedPayload)) as SessionPayload;
    if (payload.exp <= Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getSessionCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: config.adminCookieSameSite,
    secure: isProduction,
    path: "/",
    maxAge: config.adminSessionTtlHours * MS_PER_HOUR,
  };
}

export function setSessionCookie(response: Response, token: string) {
  response.cookie(COOKIE_NAME, token, getSessionCookieOptions());
}

export function clearSessionCookie(response: Response) {
  response.clearCookie(COOKIE_NAME, getSessionCookieOptions());
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}
