import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { google } from "googleapis";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(30),
  service: z.string().trim().min(1).max(80),
  date: z.string().min(8).max(10),
  time: z.string().regex(/^\d{2}:\d{2}$/).default("11:00"),
  message: z.string().trim().max(1000).optional().default(""),
});

export const createBookingEvent = createServerFn({
  method: "POST",
})
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    console.log("Booking request received:", data);

    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

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
  description:
    `Name: ${data.name}\n` +
    `Phone: ${data.phone}\n` +
    `Service: ${data.service}\n` +
    `Notes: ${data.message || "-"}\n` +
    `Booked via Physio-Fusion Website`,

  start: {
    dateTime: start.toISOString(),
    timeZone: "Asia/Kolkata",
  },

  end: {
    dateTime: end.toISOString(),
    timeZone: "Asia/Kolkata",
  },
};

    // Check if slot already exists
    const existingEvents = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    if (
      existingEvents.data.items?.some(
        (event) => event.status !== "cancelled"
      )
    ) {
      throw new Error(
        "This appointment slot is already booked. Please choose another time."
      );
    }

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
    });

    return response.data;
  });

export const getBookedSlots = createServerFn({
  method: "GET",
})
  .validator(
    z.object({
      date: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({
      version: "v3",
      auth,
    });

    const startOfDay = new Date(`${data.date}T00:00:00+05:30`);
    const endOfDay = new Date(`${data.date}T23:59:59+05:30`);

    const events = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    return (
      events.data.items
        ?.filter((event) => event.status !== "cancelled")
         .map((event) => {
          const dateTime = event.start?.dateTime;
          if (!dateTime) return null;

  const dt = new Date(dateTime);

  return dt.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
})
