"use server";

import { Resend } from "resend";
import { Client } from "@notionhq/client";

export type LeadFormState = {
  success: boolean;
  error?: string;
} | null;

const REQUIRED_FIELDS = [
  "fullName",
  "phone",
  "email",
  "city",
  "industry",
  "budget",
  "timeline",
  "tier",
] as const;

const OPTIONAL_FIELDS = ["company"] as const;

const BUDGET_VALUES = ["low", "mid", "high"] as const;
const TIMELINE_VALUES = ["now", "soon", "later"] as const;

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  /* ---------- 1. Extract & validate ---------- */
  const fields = Object.fromEntries(
    [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS].map((k) => [
      k,
      (formData.get(k) as string | null)?.trim() ?? "",
    ]),
  ) as Record<
    (typeof REQUIRED_FIELDS)[number] | (typeof OPTIONAL_FIELDS)[number],
    string
  >;

  for (const key of REQUIRED_FIELDS) {
    if (!fields[key]) {
      return { success: false, error: `Missing field: ${key}` };
    }
  }

  const phoneRegex = /^\+?[\d\s\-().]{6,20}$/;
  if (!phoneRegex.test(fields.phone)) {
    return { success: false, error: "Invalid phone number" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(fields.email)) {
    return { success: false, error: "Invalid email address" };
  }

  if (!BUDGET_VALUES.includes(fields.budget as (typeof BUDGET_VALUES)[number])) {
    return { success: false, error: "Invalid budget" };
  }

  if (
    !TIMELINE_VALUES.includes(
      fields.timeline as (typeof TIMELINE_VALUES)[number],
    )
  ) {
    return { success: false, error: "Invalid timeline" };
  }

  if (formData.get("consent") !== "on") {
    return { success: false, error: "Consent required" };
  }

  /* ---------- 2. Send email via Resend ---------- */
  const resendKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (resendKey && notificationEmail) {
    try {
      const resend = new Resend(resendKey);

      const row = (label: string, value: string) =>
        `<tr><td style="padding:4px 12px;font-weight:bold">${label}</td><td style="padding:4px 12px">${value || "—"}</td></tr>`;

      await resend.emails.send({
        from:
          process.env.RESEND_FROM_EMAIL ??
          "Atlas Fold Leads <onboarding@resend.dev>",
        to: [notificationEmail],
        subject: `New audit request — ${fields.fullName}${fields.company ? `, ${fields.company}` : ""} (${fields.budget}, ${fields.timeline})`,
        html: `
          <h2>New audit request from Atlas Fold</h2>
          <table style="border-collapse:collapse">
            ${row("Name", fields.fullName)}
            ${row("Company", fields.company)}
            ${row("Email", fields.email)}
            ${row("Phone", fields.phone)}
            ${row("City", fields.city)}
            ${row("Industry", fields.industry)}
            ${row("Budget", fields.budget)}
            ${row("Timeline", fields.timeline)}
            ${row("Tier", fields.tier)}
            ${row("Consent", "yes")}
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
          Company: { rich_text: [{ text: { content: fields.company } }] },
          Email: { email: fields.email },
          Phone: { phone_number: fields.phone },
          City: { rich_text: [{ text: { content: fields.city } }] },
          Industry: { rich_text: [{ text: { content: fields.industry } }] },
          Budget: { select: { name: fields.budget } },
          Timeline: { select: { name: fields.timeline } },
          Tier: { select: { name: fields.tier } },
          Consent: { checkbox: true },
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
