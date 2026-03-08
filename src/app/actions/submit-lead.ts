"use server";

import { Resend } from "resend";
import { Client } from "@notionhq/client";

export type LeadFormState = {
  success: boolean;
  error?: string;
} | null;

const REQUIRED_FIELDS = ["fullName", "phone", "city", "industry", "tier"] as const;

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  /* ---------- 1. Extract & validate ---------- */
  const fields = Object.fromEntries(
    REQUIRED_FIELDS.map((k) => [k, (formData.get(k) as string | null)?.trim() ?? ""]),
  );

  for (const key of REQUIRED_FIELDS) {
    if (!fields[key]) {
      return { success: false, error: `Missing field: ${key}` };
    }
  }

  const phoneRegex = /^\+?[\d\s\-().]{6,20}$/;
  if (!phoneRegex.test(fields.phone)) {
    return { success: false, error: "Invalid phone number" };
  }

  /* ---------- 2. Send email via Resend ---------- */
  const resendKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (resendKey && notificationEmail) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "AtlasFold Leads <onboarding@resend.dev>",
        to: [notificationEmail],
        subject: `New Lead — ${fields.fullName} (${fields.tier})`,
        html: `
          <h2>New lead from AtlasFold</h2>
          <table style="border-collapse:collapse">
            <tr><td style="padding:4px 12px;font-weight:bold">Name</td><td style="padding:4px 12px">${fields.fullName}</td></tr>
            <tr><td style="padding:4px 12px;font-weight:bold">Phone</td><td style="padding:4px 12px">${fields.phone}</td></tr>
            <tr><td style="padding:4px 12px;font-weight:bold">City</td><td style="padding:4px 12px">${fields.city}</td></tr>
            <tr><td style="padding:4px 12px;font-weight:bold">Industry</td><td style="padding:4px 12px">${fields.industry}</td></tr>
            <tr><td style="padding:4px 12px;font-weight:bold">Tier</td><td style="padding:4px 12px">${fields.tier}</td></tr>
          </table>
        `,
      });
    } catch (err) {
      console.error("Resend error:", err);
      // Don't fail the whole submission if email fails — still save to Notion
    }
  }

  /* ---------- 3. Save to Notion ---------- */
  const notionKey = process.env.NOTION_API_KEY;
  const notionDbId = process.env.NOTION_DATABASE_ID;

  if (notionKey && notionDbId) {
    try {
      const notion = new Client({ auth: notionKey });
      await notion.pages.create({
        parent: { database_id: notionDbId },
        properties: {
          Name: { title: [{ text: { content: fields.fullName } }] },
          Phone: { phone_number: fields.phone },
          City: { rich_text: [{ text: { content: fields.city } }] },
          Industry: { rich_text: [{ text: { content: fields.industry } }] },
          Tier: { select: { name: fields.tier } },
          "Submitted At": { date: { start: new Date().toISOString() } },
        },
      });
    } catch (err) {
      console.error("Notion error:", err);
      // Don't fail the whole submission if Notion fails — email was already sent
    }
  }

  return { success: true };
}
