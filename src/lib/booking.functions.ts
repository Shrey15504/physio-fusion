import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { google } from "googleapis";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(30),
  service: z.string().trim().min(1).max(80),
  date: z.string().min(8).max(10),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .default("11:00"),
  message: z.string().trim().max(1000).optional().default(""),
});

export const createBookingEvent = createServerFn({
  method: "POST",
})
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      undefined,
      process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/calendar"]
    );

    const calendar = google.calendar({
      version: "v3",
      auth,
    });

    const start = new Date(`${data.date}T${data.time}:00+05:30`);
    const end = new Date(start.getTime() + 45 * 60 * 1000);

    const event = {
      summary: `Physio Appointment - ${data.name} (${data.service})`,
      description: `
Name: ${data.name}
Phone: ${data.phone}
Service: ${data.service}
Notes: ${data.message || "-"}
Booked via Physio-Fusion Website
      `,
      start: {
        dateTime: start.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: "Asia/Kolkata",
      },
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
    });

    return response.data;
  });
