import nodemailer from "nodemailer";
import { config } from "./config";
import { logger } from "./logger";

type RecruiterMailInput = {
  email: string;
  companyName: string;
  reasonForVisit: string;
};

const transporter = config.smtp
  ? nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    })
  : null;

export async function sendRecruiterAcknowledgement(input: RecruiterMailInput) {
  if (!transporter || !config.smtp) {
    logger.warn(
      { email: input.email, companyName: input.companyName },
      "SMTP is not configured; acknowledgement email skipped",
    );
    return false;
  }

  await transporter.sendMail({
    from: config.smtp.from,
    to: input.email,
    subject: `Thanks for visiting Prashyam's portfolio`,
    text: [
      `Hi,`,
      ``,
      `Thanks for visiting my portfolio application.`,
      `I noticed you stopped by from ${input.companyName}.`,
      `Your note: ${input.reasonForVisit}`,
      ``,
      `I appreciate the time and interest.`,
      `If you'd like to continue the conversation, feel free to reply to this message.`,
      ``,
      `Best,`,
      `Prashyam`,
    ].join("\n"),
  });

  return true;
}
