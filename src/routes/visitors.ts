import { Router, type IRouter } from "express";
import { z } from "zod";
import { persistRecruiterVisit } from "../lib/visitor-log";
import { sendRecruiterAcknowledgement } from "../lib/mailer";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const recruiterVisitSchema = z.object({
  email: z.string().trim().email("A valid email is required."),
  companyName: z.string().trim().min(2, "Company name is required."),
  reasonForVisit: z.string().trim().min(10, "Please share a short reason for your visit."),
});

router.post("/visitors/intake", async (request, response, next) => {
  try {
    const parsed = recruiterVisitSchema.safeParse(request.body);

    if (!parsed.success) {
      response
        .status(400)
        .json({ message: parsed.error.issues[0]?.message ?? "Invalid visit details." });
      return;
    }

    const visit = {
      ...parsed.data,
      visitedAt: new Date().toISOString(),
      ipAddress: request.ip,
      userAgent: request.get("user-agent") ?? "unknown",
    };

    await persistRecruiterVisit(visit);
    logger.info(visit, "Recruiter visit captured");

    let emailSent = false;
    try {
      emailSent = await sendRecruiterAcknowledgement(parsed.data);
    } catch (error) {
      logger.error({ err: error, email: parsed.data.email }, "Failed to send recruiter acknowledgement");
    }

    response.status(201).json({
      status: "logged",
      emailSent,
      message: "Visit captured successfully.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
