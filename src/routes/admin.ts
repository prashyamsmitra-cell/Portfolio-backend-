import { Router, type IRouter } from "express";
import { z } from "zod";
import { config } from "../lib/config";
import {
  clearSessionCookie,
  createSessionToken,
  getSessionCookieName,
  setSessionCookie,
  verifySessionToken,
} from "../lib/session";

const router: IRouter = Router();

const loginSchema = z.object({
  adminId: z.string().trim().min(1, "Admin ID is required."),
  password: z.string().min(1, "Password is required."),
});

router.get("/admin/session", (request, response) => {
  const token = request.cookies?.[getSessionCookieName()];
  const session = verifySessionToken(token);

  response.json({
    authenticated: Boolean(session),
    adminId: session?.adminId ?? null,
  });
});

router.post("/admin/login", (request, response) => {
  const parsed = loginSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ message: parsed.error.issues[0]?.message ?? "Invalid request." });
    return;
  }

  const { adminId, password } = parsed.data;
  if (adminId !== config.adminId || password !== config.adminPassword) {
    response.status(401).json({ message: "Invalid admin credentials." });
    return;
  }

  const token = createSessionToken(adminId);
  setSessionCookie(response, token);

  response.json({
    authenticated: true,
    adminId,
  });
});

router.post("/admin/logout", (_request, response) => {
  clearSessionCookie(response);
  response.json({ authenticated: false });
});

export default router;
