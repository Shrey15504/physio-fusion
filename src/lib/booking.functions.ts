import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { google } from "googleapis";

const schema = z.object({
  ...
});

export const createBookingEvent = createServerFn({
  ...
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

          return `${String(dt.getHours()).padStart(2, "0")}:${String(
            dt.getMinutes()
          ).padStart(2, "0")}`;
        })
        .filter(Boolean) ?? []
    );
  });
