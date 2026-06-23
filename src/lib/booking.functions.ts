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
    console.log("Booking request received:", data);
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

console.log("Client Email:", process.env.GOOGLE_CLIENT_EMAIL);
console.log("Private Key exists:", !!privateKey);

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: privateKey,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

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

    try {
  console.log("Creating Google Calendar event...");

  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    requestBody: event,
  });

  console.log("Google Calendar event created successfully");

  return response.data;
} catch (error: any) {
  console.error("Google Calendar Error:", error);
  console.error("Google Calendar Error Details:", error?.response?.data);

  throw error;
}
  });
