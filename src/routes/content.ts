import { Router, type IRouter } from "express";
import { z } from "zod";
import { getSiteContent, saveSiteContent } from "../lib/site-content";
import { getSessionFromRequest } from "../lib/session";

const router: IRouter = Router();

const updateSiteContentSchema = z.object({
  data: z.unknown(),
});

router.get("/site-content", async (_request, response, next) => {
  try {
    const data = await getSiteContent();
    response.json({ data });
  } catch (error) {
    next(error);
  }
});

router.put("/admin/site-content", async (request, response, next) => {
  try {
    const session = getSessionFromRequest(request);

    if (!session) {
      response.status(401).json({ message: "Authentication required." });
      return;
    }

    const parsed = updateSiteContentSchema.safeParse(request.body);

    if (!parsed.success) {
      response.status(400).json({ message: "Invalid content payload." });
      return;
    }

    await saveSiteContent(parsed.data.data);

    response.json({
      ok: true,
      updatedBy: session.adminId,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
