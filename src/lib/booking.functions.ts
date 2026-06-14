import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(30),
  service: z.string().trim().min(1).max(80),
  date: z.string().min(8).max(10), // YYYY-MM-DD
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Invalid time")
    .default("11:00"),
  message: z.string().trim().max(1000).optional().default(""),
});

const GATEWAY = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";

export const createBookingEvent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const connKey = process.env.GOOGLE_CALENDAR_API_KEY;
    if (!lovableKey) throw new Error("Missing LOVABLE_API_KEY");
    if (!connKey) throw new Error("Missing GOOGLE_CALENDAR_API_KEY");

    // Use chosen time (IST) for the chosen day, 45 min slot
    const start = new Date(`${data.date}T${data.time}:00+05:30`);
    const end = new Date(start.getTime() + 45 * 60 * 1000);

    const body = {
      summary: `Physio appointment — ${data.name} (${data.service})`,
      description: `Name: ${data.name}\nPhone: ${data.phone}\nService: ${data.service}\nNote: ${data.message || "—"}\n\nBooked via Physio-Fusion website.`,
      start: { dateTime: start.toISOString(), timeZone: "Asia/Kolkata" },
      end: { dateTime: end.toISOString(), timeZone: "Asia/Kolkata" },
    };

    const res = await fetch(`${GATEWAY}/calendars/primary/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": connKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Calendar create failed ${res.status}: ${text.slice(0, 300)}`);
    }
    const json = (await res.json()) as { id?: string; htmlLink?: string };
    return { id: json.id ?? "", link: json.htmlLink ?? "" };
  });
